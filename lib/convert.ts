export interface ConvertedTime {
  time: string;
  dateISO: string;
  weekday: string;
  utcOffset: string;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function getUTCOffset(date: Date, timezone: string): number {
  try {
    const utcTimeStr = date.toISOString().substring(11, 16);
    const [utcHours, utcMins] = utcTimeStr.split(":").map(Number);

    const tzFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const tzTimeStr = tzFormatter.format(date);
    const [tzHours, tzMins] = tzTimeStr.split(":").map(Number);

    const utcTotalMins = utcHours * 60 + utcMins;
    const tzTotalMins = tzHours * 60 + tzMins;

    let diffMins = tzTotalMins - utcTotalMins;
    if (diffMins > 720) diffMins -= 1440;
    if (diffMins < -720) diffMins += 1440;

    return Math.round(diffMins / 60);
  } catch (error) {
    return 0;
  }
}

function formatUTCOffset(offsetHours: number): string {
  if (offsetHours === 0) return "UTC+0";
  if (offsetHours > 0) return `UTC+${offsetHours}`;
  return `UTC${offsetHours}`;
}

/**
 * Get a Date object representing a date/time in a specific timezone
 * This interprets the date/time string as being in the specified timezone
 */
export function getZonedDateFromLocalInput(
  dateStr: string,
  timeStr: string,
  timezone: string
): Date | null {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      isNaN(hours) ||
      isNaN(minutes)
    ) {
      return null;
    }

    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    let candidateDate = new Date(Date.UTC(year, month - 1, day, 12, 0));
    let offset = getUTCOffset(candidateDate, timezone);
    candidateDate = new Date(
      Date.UTC(year, month - 1, day, hours - offset, minutes)
    );

    for (let i = 0; i < 10; i++) {
      const parts = formatter.formatToParts(candidateDate);
      const formattedYear = parseInt(
        parts.find((p) => p.type === "year")?.value || "0"
      );
      const formattedMonth = parseInt(
        parts.find((p) => p.type === "month")?.value || "0"
      );
      const formattedDay = parseInt(
        parts.find((p) => p.type === "day")?.value || "0"
      );
      const formattedHour = parseInt(
        parts.find((p) => p.type === "hour")?.value || "0"
      );
      const formattedMinute = parseInt(
        parts.find((p) => p.type === "minute")?.value || "0"
      );

      if (
        formattedYear === year &&
        formattedMonth === month &&
        formattedDay === day &&
        formattedHour === hours &&
        formattedMinute === minutes
      ) {
        return candidateDate;
      }

      const newOffset = getUTCOffset(candidateDate, timezone);
      const diffHour = hours - formattedHour;
      const diffMinute = minutes - formattedMinute;
      const diffDay = day - formattedDay;
      const totalDiffMinutes = diffDay * 1440 + diffHour * 60 + diffMinute;

      candidateDate = new Date(
        candidateDate.getTime() + totalDiffMinutes * 60 * 1000
      );

      if (newOffset === offset && i > 2) {
        break;
      }
      offset = newOffset;
    }

    return candidateDate;
  } catch (error) {
    return null;
  }
}

/**
 * Format a Date in a specific timezone
 */
export function formatInTimezone(
  date: Date,
  timezone: string
): ConvertedTime | null {
  try {
    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      weekday: "short",
    });

    const datePartsFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const time = timeFormatter.format(date);
    const weekday = weekdayFormatter.format(date);
    const parts = datePartsFormatter.formatToParts(date);
    const year = parseInt(parts.find((p) => p.type === "year")?.value || "0", 10);
    const month = parseInt(parts.find((p) => p.type === "month")?.value || "0", 10);
    const day = parseInt(parts.find((p) => p.type === "day")?.value || "0", 10);

    const dateISOFormatted = `${year}-${pad2(month)}-${pad2(day)}`;

    const offsetHours = getUTCOffset(date, timezone);
    const utcOffset = formatUTCOffset(offsetHours);

    return {
      time,
      dateISO: dateISOFormatted,
      weekday,
      utcOffset,
    };
  } catch (error) {
    return null;
  }
}

