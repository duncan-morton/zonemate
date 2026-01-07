import { TIMEZONES } from "@/lib/timezones";
import type { Language } from "@/lib/greetings";

export interface ParticipantData {
  name: string;
  timezone: string;
  language: Language;
}

const VALID_LANGUAGES: Set<Language> = new Set([
  "EN",
  "FR",
  "ES",
  "DE",
  "PT",
  "JA",
  "HI",
]);

const VALID_TIMEZONES: Set<string> = new Set(TIMEZONES.map((tz) => tz.value));

/**
 * Validate a participant data object
 */
function validateParticipant(data: {
  name: string;
  timezone: string;
  language: string;
}): ParticipantData | null {
  if (!data.timezone || !VALID_TIMEZONES.has(data.timezone)) {
    return null;
  }

  if (!data.language || !VALID_LANGUAGES.has(data.language as Language)) {
    return null;
  }

  return {
    name: (data.name || "").trim(),
    timezone: data.timezone,
    language: data.language as Language,
  };
}

/**
 * Encode participants array to URL query string format
 * Format: name1|timezone1|lang1;name2|timezone2|lang2
 */
export function encodeParticipants(
  participants: ParticipantData[]
): string {
  if (participants.length === 0) {
    return "";
  }

  const encoded = participants
    .filter((p) => p.timezone)
    .slice(0, 6)
    .map((p) => {
      const name = encodeURIComponent(p.name || "");
      const timezone = encodeURIComponent(p.timezone);
      const language = encodeURIComponent(p.language);
      return `${name}|${timezone}|${language}`;
    })
    .join(";");

  return encoded;
}

/**
 * Decode URL query string to participants array
 */
export function decodeParticipants(encoded: string): ParticipantData[] {
  if (!encoded || typeof encoded !== "string") {
    return [];
  }

  try {
    const participants: ParticipantData[] = [];
    const parts = encoded.split(";");

    for (const part of parts) {
      if (participants.length >= 6) break;

      const fields = part.split("|");
      if (fields.length !== 3) continue;

      const [nameEncoded, timezoneEncoded, languageEncoded] = fields;

      try {
        const name = decodeURIComponent(nameEncoded);
        const timezone = decodeURIComponent(timezoneEncoded);
        const language = decodeURIComponent(languageEncoded);

        const participant = validateParticipant({
          name,
          timezone,
          language,
        });

        if (participant) {
          participants.push(participant);
        }
      } catch (error) {
        continue;
      }
    }

    if (participants.length < 2) {
      return [];
    }

    return participants;
  } catch (error) {
    return [];
  }
}

/**
 * Get participants from URL query parameter
 */
export function getParticipantsFromURL(): ParticipantData[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("p");

    if (!encoded) {
      return [];
    }

    return decodeParticipants(encoded);
  } catch (error) {
    return [];
  }
}

/**
 * Update URL with participants using history.replaceState
 */
export function updateURLWithParticipants(
  participants: ParticipantData[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const encoded = encodeParticipants(participants);
    const url = new URL(window.location.href);

    if (encoded) {
      url.searchParams.set("p", encoded);
    } else {
      url.searchParams.delete("p");
    }

    window.history.replaceState({}, "", url.toString());
  } catch (error) {
    // Silently fail if URL update fails
  }
}

