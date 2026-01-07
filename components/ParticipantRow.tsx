"use client";

import { useMemo } from "react";
import { TIMEZONES } from "@/lib/timezones";

interface ParticipantRowProps {
  id: string;
  name: string;
  timezone: string;
  onNameChange: (id: string, name: string) => void;
  onTimezoneChange: (id: string, timezone: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  currentTime: Date;
}

export default function ParticipantRow({
  id,
  name,
  timezone,
  onNameChange,
  onTimezoneChange,
  onRemove,
  canRemove,
  currentTime,
}: ParticipantRowProps) {
  const timeDisplay = useMemo(() => {
    if (!timezone) {
      return null;
    }

    try {
      const timeFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const dayFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        weekday: "short",
      });

      const dateFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const localTime = timeFormatter.format(currentTime);
      const localDay = dayFormatter.format(currentTime);
      const localDateStr = dateFormatter.format(currentTime);

      const today = new Date();
      const todayFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const todayDateStr = todayFormatter.format(today);

      const isToday = localDateStr === todayDateStr;
      const dayLabel = isToday ? null : localDay;

      const utcFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const utcTimeStr = utcFormatter.format(currentTime);
      const [utcHours, utcMins] = utcTimeStr.split(":").map(Number);
      const [localHours, localMins] = localTime.split(":").map(Number);

      const utcTotalMins = utcHours * 60 + utcMins;
      const localTotalMins = localHours * 60 + localMins;

      let diffMins = localTotalMins - utcTotalMins;
      if (diffMins > 720) diffMins -= 1440;
      if (diffMins < -720) diffMins += 1440;

      const offsetHours = Math.floor(diffMins / 60);
      const offsetMins = Math.abs(diffMins % 60);

      let offsetStr: string;
      if (offsetMins === 0) {
        offsetStr = `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`;
      } else {
        const sign = offsetHours >= 0 ? "+" : "-";
        const absHours = Math.abs(offsetHours);
        offsetStr = `UTC${sign}${absHours}:${String(offsetMins).padStart(2, "0")}`;
      }

      return {
        localTime,
        dayLabel,
        utcOffset: offsetStr,
      };
    } catch (error) {
      return null;
    }
  }, [timezone, currentTime]);

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label htmlFor={`name-${id}`} className="mb-1 block text-sm font-medium text-neutral-700">
            Name
          </label>
          <input
            id={`name-${id}`}
            type="text"
            value={name}
            onChange={(e) => onNameChange(id, e.target.value)}
            placeholder="Duncan"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor={`timezone-${id}`} className="mb-1 block text-sm font-medium text-neutral-700">
            Timezone
          </label>
          <select
            id={`timezone-${id}`}
            value={timezone}
            onChange={(e) => onTimezoneChange(id, e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          >
            <option value="">Select a timezone</option>
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
        {canRemove && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => onRemove(id)}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      {timezone && timeDisplay && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="text-lg font-semibold text-neutral-900">
            {timeDisplay.localTime}
          </div>
          {timeDisplay.dayLabel && (
            <div className="text-neutral-600">{timeDisplay.dayLabel}</div>
          )}
          <div className="text-neutral-600">{timeDisplay.utcOffset}</div>
        </div>
      )}
    </div>
  );
}

