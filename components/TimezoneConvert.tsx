"use client";

import { useState, useEffect, useMemo } from "react";
import { TIMEZONES } from "@/lib/timezones";
import {
  getZonedDateFromLocalInput,
  formatInTimezone,
} from "@/lib/convert";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function getCurrentTimeString(): string {
  const now = new Date();
  return `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
}

function getDayLabel(targetDateISO: string): string | null {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;

  if (targetDateISO === todayStr) return null;

  const targetDate = new Date(targetDateISO + "T00:00:00");
  const todayDate = new Date(todayStr + "T00:00:00");

  const diffTime = targetDate.getTime() - todayDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1) return targetDate.toLocaleDateString(undefined, { weekday: "short" });
  return null;
}

export default function TimezoneConvert() {
  const [fromTimezone, setFromTimezone] = useState<string>("");
  const [toTimezone, setToTimezone] = useState<string>("");
  const [date, setDate] = useState<string>(getTodayDateString());
  const [time, setTime] = useState<string>(getCurrentTimeString());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const dateParam = params.get("date");
    const timeParam = params.get("time");

    if (from && TIMEZONES.some((tz) => tz.value === from)) {
      setFromTimezone(from);
    }
    if (to && TIMEZONES.some((tz) => tz.value === to)) {
      setToTimezone(to);
    }
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      setDate(dateParam);
    }
    if (timeParam && /^\d{2}:\d{2}$/.test(timeParam)) {
      setTime(timeParam);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    if (fromTimezone) params.set("from", fromTimezone);
    if (toTimezone) params.set("to", toTimezone);
    if (date) params.set("date", date);
    if (time) params.set("time", time);

    const newUrl = new URL(window.location.href);
    newUrl.search = params.toString();
    window.history.replaceState({}, "", newUrl.toString());
  }, [fromTimezone, toTimezone, date, time, isInitialized]);

  const conversionResult = useMemo(() => {
    if (!fromTimezone || !toTimezone || !date || !time) {
      return null;
    }

    const sourceDate = getZonedDateFromLocalInput(date, time, fromTimezone);
    if (!sourceDate) {
      return null;
    }

    const fromFormatted = formatInTimezone(sourceDate, fromTimezone);
    const toFormatted = formatInTimezone(sourceDate, toTimezone);

    if (!fromFormatted || !toFormatted) {
      return null;
    }

    return {
      from: fromFormatted,
      to: toFormatted,
    };
  }, [fromTimezone, toTimezone, date, time]);

  const handleSwap = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  const dayLabel = conversionResult
    ? getDayLabel(conversionResult.to.dateISO)
    : null;

  return (
    <div className="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="from-timezone"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            From timezone
          </label>
          <select
            id="from-timezone"
            value={fromTimezone}
            onChange={(e) => setFromTimezone(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          >
            <option value="">Select timezone</option>
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="to-timezone"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            To timezone
          </label>
          <div className="flex gap-2">
            <select
              id="to-timezone"
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              <option value="">Select timezone</option>
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleSwap}
              disabled={!fromTimezone || !toTimezone}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
              title="Swap timezones"
            >
              ⇄
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
      </div>

      {conversionResult ? (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Converted time</h3>
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-sm text-neutral-600">In {TIMEZONES.find((tz) => tz.value === toTimezone)?.label}:</div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-2xl font-bold text-neutral-900">
                  {conversionResult.to.time}
                </div>
                {dayLabel && (
                  <div className="text-neutral-600">{dayLabel}</div>
                )}
                <div className="text-sm text-neutral-600">
                  {conversionResult.to.utcOffset}
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-200 pt-3">
              <div className="text-xs text-neutral-500">
                From: {conversionResult.from.utcOffset} → To: {conversionResult.to.utcOffset}
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                DST handled automatically
              </div>
            </div>
          </div>
        </div>
      ) : fromTimezone && toTimezone && date && time ? (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
          Please enter a valid date and time.
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
          Select both timezones and enter a date and time to convert.
        </div>
      )}
    </div>
  );
}

