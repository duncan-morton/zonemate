import type { Language } from "@/lib/greetings";

export interface City {
  city: string;
  country: string;
  tz: string;
  lang: Language;
}

export interface Scenario {
  slug: string;
  cities: string[];
  title: string;
}

export const CITIES: Record<string, City> = {
  london: {
    city: "London",
    country: "UK",
    tz: "Europe/London",
    lang: "EN",
  },
  "new-york": {
    city: "New York",
    country: "USA",
    tz: "America/New_York",
    lang: "EN",
  },
  berlin: {
    city: "Berlin",
    country: "Germany",
    tz: "Europe/Berlin",
    lang: "DE",
  },
  paris: {
    city: "Paris",
    country: "France",
    tz: "Europe/Paris",
    lang: "FR",
  },
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    tz: "Asia/Tokyo",
    lang: "JA",
  },
  mumbai: {
    city: "Mumbai",
    country: "India",
    tz: "Asia/Kolkata",
    lang: "HI",
  },
  singapore: {
    city: "Singapore",
    country: "Singapore",
    tz: "Asia/Singapore",
    lang: "EN",
  },
  sydney: {
    city: "Sydney",
    country: "Australia",
    tz: "Australia/Sydney",
    lang: "EN",
  },
  "san-francisco": {
    city: "San Francisco",
    country: "USA",
    tz: "America/Los_Angeles",
    lang: "EN",
  },
  toronto: {
    city: "Toronto",
    country: "Canada",
    tz: "America/Toronto",
    lang: "EN",
  },
  dubai: {
    city: "Dubai",
    country: "UAE",
    tz: "Asia/Dubai",
    lang: "EN",
  },
  chicago: {
    city: "Chicago",
    country: "USA",
    tz: "America/Chicago",
    lang: "EN",
  },
  "los-angeles": {
    city: "Los Angeles",
    country: "USA",
    tz: "America/Los_Angeles",
    lang: "EN",
  },
};

const TWO_CITY_SCENARIOS: Array<[string, string]> = [
  ["london", "new-york"],
  ["london", "berlin"],
  ["london", "paris"],
  ["london", "tokyo"],
  ["london", "sydney"],
  ["london", "singapore"],
  ["new-york", "berlin"],
  ["new-york", "tokyo"],
  ["new-york", "sydney"],
  ["new-york", "singapore"],
  ["new-york", "san-francisco"],
  ["berlin", "tokyo"],
  ["berlin", "sydney"],
  ["paris", "new-york"],
  ["paris", "tokyo"],
  ["tokyo", "sydney"],
  ["tokyo", "singapore"],
  ["singapore", "sydney"],
  ["san-francisco", "singapore"],
  ["san-francisco", "tokyo"],
  ["toronto", "london"],
  ["toronto", "new-york"],
  ["dubai", "london"],
  ["dubai", "new-york"],
  ["mumbai", "london"],
  ["mumbai", "new-york"],
];

const THREE_CITY_SCENARIOS: Array<[string, string, string]> = [
  ["london", "new-york", "tokyo"],
  ["london", "new-york", "sydney"],
  ["london", "new-york", "singapore"],
  ["london", "berlin", "tokyo"],
  ["new-york", "tokyo", "sydney"],
  ["san-francisco", "singapore", "tokyo"],
  ["london", "paris", "berlin"],
  ["new-york", "toronto", "chicago"],
];

function createScenarioSlug(cityKeys: string[]): string {
  return cityKeys.join("-");
}

function createScenarioTitle(cityKeys: string[]): string {
  const cityNames = cityKeys.map((key) => CITIES[key]?.city || key);
  if (cityNames.length === 2) {
    return `Meeting time between ${cityNames[0]} and ${cityNames[1]}`;
  }
  if (cityNames.length === 3) {
    return `Meeting time between ${cityNames[0]}, ${cityNames[1]}, and ${cityNames[2]}`;
  }
  return `Meeting time between ${cityNames.join(", ")}`;
}

export function getAllScenarios(): Scenario[] {
  const scenarios: Scenario[] = [];

  for (const [city1, city2] of TWO_CITY_SCENARIOS) {
    const slug = createScenarioSlug([city1, city2]);
    const title = createScenarioTitle([city1, city2]);
    scenarios.push({
      slug,
      cities: [city1, city2],
      title,
    });
  }

  for (const [city1, city2, city3] of THREE_CITY_SCENARIOS) {
    const slug = createScenarioSlug([city1, city2, city3]);
    const title = createScenarioTitle([city1, city2, city3]);
    scenarios.push({
      slug,
      cities: [city1, city2, city3],
      title,
    });
  }

  return scenarios;
}

export function getScenarioBySlug(slug: string): Scenario | null {
  const allScenarios = getAllScenarios();
  return allScenarios.find((s) => s.slug === slug) || null;
}

export function generatePrefillQueryString(cityKeys: string[]): string {
  const participants = cityKeys
    .map((key) => {
      const city = CITIES[key];
      if (!city) return null;

      const name = encodeURIComponent(city.city);
      const timezone = encodeURIComponent(city.tz);
      const language = encodeURIComponent(city.lang);

      return `${name}|${timezone}|${language}`;
    })
    .filter((p): p is string => p !== null);

  return `p=${participants.join(";")}`;
}

export function getRelatedScenarios(
  currentSlug: string,
  limit: number = 8
): Array<{ slug: string; title: string }> {
  const allScenarios = getAllScenarios();
  const current = allScenarios.find((s) => s.slug === currentSlug);

  if (!current) {
    return [];
  }

  const currentCities = new Set(current.cities);
  const related = allScenarios
    .filter((s) => {
      if (s.slug === currentSlug) return false;

      const sharedCities = s.cities.filter((c) => currentCities.has(c));
      return sharedCities.length > 0;
    })
    .slice(0, limit)
    .map((s) => ({
      slug: s.slug,
      title: s.title,
    }));

  return related;
}

export function getCityByKey(key: string): City | null {
  return CITIES[key] || null;
}

