"use client";

import { useState, useEffect, useCallback } from "react";
import ParticipantRow from "./ParticipantRow";

interface Participant {
  id: string;
  name: string;
  timezone: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function TimezoneCompare() {
  const [participants, setParticipants] = useState<Participant[]>(() => [
    { id: generateId(), name: "", timezone: "" },
    { id: generateId(), name: "", timezone: "" },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleNameChange = useCallback((id: string, name: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  }, []);

  const handleTimezoneChange = useCallback((id: string, timezone: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, timezone } : p))
    );
  }, []);

  const handleAddParticipant = useCallback(() => {
    if (participants.length >= 6) return;
    setParticipants((prev) => [
      ...prev,
      { id: generateId(), name: "", timezone: "" },
    ]);
  }, [participants.length]);

  const handleRemoveParticipant = useCallback(
    (id: string) => {
      if (participants.length <= 2) return;
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    },
    [participants.length]
  );

  const canAdd = participants.length < 6;
  const canRemove = participants.length > 2;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Timezone Comparison Tool</h2>
      <div className="space-y-4">
        {participants.map((participant) => (
          <ParticipantRow
            key={participant.id}
            id={participant.id}
            name={participant.name}
            timezone={participant.timezone}
            onNameChange={handleNameChange}
            onTimezoneChange={handleTimezoneChange}
            onRemove={handleRemoveParticipant}
            canRemove={canRemove}
            currentTime={currentTime}
          />
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddParticipant}
            disabled={!canAdd}
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          >
            Add participant
          </button>
        </div>
      </div>
    </div>
  );
}
