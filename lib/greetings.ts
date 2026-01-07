export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

export type Language = "EN" | "FR" | "ES" | "DE" | "PT" | "JA" | "HI";

const GREETINGS: Record<Language, Record<TimeOfDay, string>> = {
  EN: {
    Morning: "Good morning",
    Afternoon: "Good afternoon",
    Evening: "Good evening",
    Night: "Good night",
  },
  FR: {
    Morning: "Bonjour",
    Afternoon: "Bon après-midi",
    Evening: "Bonsoir",
    Night: "Bonne nuit",
  },
  ES: {
    Morning: "Buenos días",
    Afternoon: "Buenas tardes",
    Evening: "Buenas tardes",
    Night: "Buenas noches",
  },
  DE: {
    Morning: "Guten Morgen",
    Afternoon: "Guten Tag",
    Evening: "Guten Abend",
    Night: "Gute Nacht",
  },
  PT: {
    Morning: "Bom dia",
    Afternoon: "Boa tarde",
    Evening: "Boa noite",
    Night: "Boa noite",
  },
  JA: {
    Morning: "Ohayō gozaimasu",
    Afternoon: "Konnichiwa",
    Evening: "Konbanwa",
    Night: "Oyasuminasai",
  },
  HI: {
    Morning: "सुप्रभात",
    Afternoon: "नमस्ते",
    Evening: "शुभ संध्या",
    Night: "शुभ रात्रि",
  },
};

const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "EN", label: "English (EN)" },
  { value: "FR", label: "French (FR)" },
  { value: "ES", label: "Spanish (ES)" },
  { value: "DE", label: "German (DE)" },
  { value: "PT", label: "Portuguese (PT)" },
  { value: "JA", label: "Japanese (JA)" },
  { value: "HI", label: "Hindi (HI)" },
];

/**
 * Get time-of-day category based on hour (0-23)
 */
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) {
    return "Morning";
  }
  if (hour >= 12 && hour < 17) {
    return "Afternoon";
  }
  if (hour >= 17 && hour < 22) {
    return "Evening";
  }
  return "Night";
}

/**
 * Get greeting for a given language and time-of-day
 */
export function getGreeting(language: Language, timeOfDay: TimeOfDay): string {
  return GREETINGS[language]?.[timeOfDay] || GREETINGS.EN[timeOfDay];
}

/**
 * Get time-of-day category from a date in a specific timezone
 */
export function getTimeOfDayForTimezone(
  date: Date,
  timezone: string
): TimeOfDay | null {
  try {
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    });

    const hourStr = formatter.format(date);
    const hour = parseInt(hourStr.split(":")[0], 10);

    if (isNaN(hour)) {
      return null;
    }

    return getTimeOfDay(hour);
  } catch (error) {
    return null;
  }
}

/**
 * Get language options for select dropdown
 */
export function getLanguageOptions() {
  return LANGUAGE_OPTIONS;
}

