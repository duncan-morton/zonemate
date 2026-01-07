export interface Participant {
  id: string;
  name: string;
  timezone: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface SuggestedWindow {
  start: Date;
  end: Date;
  label: string;
}

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;
const SLOT_INCREMENT_MINUTES = 30;
const SUGGESTION_DURATION_MINUTES = 60;

/**
 * Check if a UTC time falls within working hours (09:00-17:00) in a given timezone
 */
function isInWorkingHours(utcTime: Date, timezone: string): boolean {
  try {
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const timeStr = formatter.format(utcTime);
    const [hour, minute] = timeStr.split(":").map(Number);

    const totalMinutes = hour * 60 + minute;
    const workStartMinutes = WORK_START_HOUR * 60;
    const workEndMinutes = WORK_END_HOUR * 60;

    return totalMinutes >= workStartMinutes && totalMinutes < workEndMinutes;
  } catch (error) {
    return false;
  }
}

/**
 * Get all 30-minute slots in the next 24 hours (from now) that overlap with working hours
 * for all participants (slots are in UTC, representing actual times)
 */
export function calculateOverlapSlots(
  participants: Participant[],
  now: Date
): TimeSlot[] {
  const participantsWithTimezone = participants.filter((p) => p.timezone);
  if (participantsWithTimezone.length === 0) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const slotsPerDay = (24 * 60) / SLOT_INCREMENT_MINUTES;

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  for (let i = 0; i < slotsPerDay; i++) {
    const slotStartMinutes = i * SLOT_INCREMENT_MINUTES;
    const slotStartHour = Math.floor(slotStartMinutes / 60);
    const slotStartMinute = slotStartMinutes % 60;

    const slotStart = new Date(startOfDay);
    slotStart.setHours(slotStartHour, slotStartMinute, 0, 0);

    if (slotStart.getTime() < now.getTime()) {
      continue;
    }

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_INCREMENT_MINUTES);

    if (slotEnd.getTime() > startOfDay.getTime() + 24 * 60 * 60 * 1000) {
      break;
    }

    const midSlot = new Date(slotStart);
    midSlot.setMinutes(midSlot.getMinutes() + SLOT_INCREMENT_MINUTES / 2);

    let allInWorkingHours = true;

    for (const participant of participantsWithTimezone) {
      if (
        !isInWorkingHours(slotStart, participant.timezone) ||
        !isInWorkingHours(midSlot, participant.timezone)
      ) {
        allInWorkingHours = false;
        break;
      }
    }

    if (allInWorkingHours) {
      slots.push({
        start: new Date(slotStart),
        end: new Date(slotEnd),
      });
    }
  }

  return slots;
}

/**
 * Get overlap segments for visualization (0-24 hours as percentages)
 * Segments represent the overlap in a 24-hour bar starting from midnight UTC
 */
export function getOverlapSegments(
  participants: Participant[],
  now: Date
): Array<{ start: number; end: number }> {
  const participantsWithTimezone = participants.filter((p) => p.timezone);
  if (participantsWithTimezone.length === 0) {
    return [];
  }

  const segments: Array<{ start: number; end: number }> = [];
  const hoursInDay = 24;
  const slotsPerHour = 60 / SLOT_INCREMENT_MINUTES;
  const totalSlots = hoursInDay * slotsPerHour;

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  let currentSegment: { start: number; end: number } | null = null;

  for (let i = 0; i < totalSlots; i++) {
    const slotStartMinutes = i * SLOT_INCREMENT_MINUTES;
    const slotStartHour = Math.floor(slotStartMinutes / 60);
    const slotStartMinute = slotStartMinutes % 60;

    const slotStart = new Date(startOfDay);
    slotStart.setHours(slotStartHour, slotStartMinute, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_INCREMENT_MINUTES);

    const midSlot = new Date(slotStart);
    midSlot.setMinutes(midSlot.getMinutes() + SLOT_INCREMENT_MINUTES / 2);

    let allInWorkingHours = true;

    for (const participant of participantsWithTimezone) {
      if (
        !isInWorkingHours(slotStart, participant.timezone) ||
        !isInWorkingHours(midSlot, participant.timezone)
      ) {
        allInWorkingHours = false;
        break;
      }
    }

    const segmentStart = (slotStartHour + slotStartMinute / 60) / hoursInDay;
    const segmentEnd = (slotEnd.getHours() + slotEnd.getMinutes() / 60) / hoursInDay;

    if (allInWorkingHours) {
      if (currentSegment === null) {
        currentSegment = {
          start: segmentStart * 100,
          end: segmentEnd * 100,
        };
      } else {
        currentSegment.end = segmentEnd * 100;
      }
    } else {
      if (currentSegment !== null) {
        segments.push(currentSegment);
        currentSegment = null;
      }
    }
  }

  if (currentSegment !== null) {
    segments.push(currentSegment);
  }

  return segments;
}


/**
 * Get top 3 suggested meeting windows (60-minute slots)
 * Converted to user's local timezone for display
 */
export function getSuggestedWindows(
  participants: Participant[],
  now: Date,
  userTimezone?: string
): SuggestedWindow[] {
  const slots = calculateOverlapSlots(participants, now);
  if (slots.length === 0) {
    return [];
  }

  const sixtyMinuteSlots: TimeSlot[] = [];
  const slotsNeeded = SUGGESTION_DURATION_MINUTES / SLOT_INCREMENT_MINUTES;

  for (let i = 0; i <= slots.length - slotsNeeded; i++) {
    const consecutiveSlots = slots.slice(i, i + slotsNeeded);

    if (consecutiveSlots.length === slotsNeeded) {
      const firstSlot = consecutiveSlots[0];
      const lastSlot = consecutiveSlots[slotsNeeded - 1];

      const expectedEnd = new Date(firstSlot.start);
      expectedEnd.setMinutes(expectedEnd.getMinutes() + SUGGESTION_DURATION_MINUTES);

      if (Math.abs(expectedEnd.getTime() - lastSlot.end.getTime()) < 60000) {
        sixtyMinuteSlots.push({
          start: new Date(firstSlot.start),
          end: expectedEnd,
        });
      }
    }
  }

  const futureSlots = sixtyMinuteSlots.filter(
    (slot) => slot.start.getTime() >= now.getTime()
  );

  if (futureSlots.length === 0) {
    return [];
  }

  const sortedSlots = futureSlots.sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  const suggestions: SuggestedWindow[] = [];
  const userTz = userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  for (const slot of sortedSlots) {
    if (suggestions.length >= 3) break;

    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);

    const startFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: userTz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const endFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: userTz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dateFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: userTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const startStr = startFormatter.format(slotStart);
    const endStr = endFormatter.format(slotEnd);

    const today = new Date();
    const todayStr = dateFormatter.format(today);
    const slotDateStr = dateFormatter.format(slotStart);

    const isToday = todayStr === slotDateStr;
    const label = isToday ? "Today" : "Tomorrow";

    const isOverlapping = suggestions.some((existing) => {
      const existingStart = existing.start.getTime();
      const existingEnd = existing.end.getTime();
      const slotStartTime = slotStart.getTime();
      const slotEndTime = slotEnd.getTime();

      return (
        (slotStartTime >= existingStart && slotStartTime < existingEnd) ||
        (slotEndTime > existingStart && slotEndTime <= existingEnd) ||
        (slotStartTime <= existingStart && slotEndTime >= existingEnd)
      );
    });

    if (!isOverlapping) {
      suggestions.push({
        start: slotStart,
        end: slotEnd,
        label: `${label} ${startStr}–${endStr}`,
      });
    }
  }

  return suggestions;
}

