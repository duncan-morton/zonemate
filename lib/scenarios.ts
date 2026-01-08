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
  amsterdam: {
    city: "Amsterdam",
    country: "Netherlands",
    tz: "Europe/Amsterdam",
    lang: "EN",
  },
  madrid: {
    city: "Madrid",
    country: "Spain",
    tz: "Europe/Madrid",
    lang: "ES",
  },
  rome: {
    city: "Rome",
    country: "Italy",
    tz: "Europe/Rome",
    lang: "EN",
  },
  zurich: {
    city: "Zurich",
    country: "Switzerland",
    tz: "Europe/Zurich",
    lang: "DE",
  },
  stockholm: {
    city: "Stockholm",
    country: "Sweden",
    tz: "Europe/Stockholm",
    lang: "EN",
  },
  warsaw: {
    city: "Warsaw",
    country: "Poland",
    tz: "Europe/Warsaw",
    lang: "EN",
  },
  dublin: {
    city: "Dublin",
    country: "Ireland",
    tz: "Europe/Dublin",
    lang: "EN",
  },
  lisbon: {
    city: "Lisbon",
    country: "Portugal",
    tz: "Europe/Lisbon",
    lang: "PT",
  },
  denver: {
    city: "Denver",
    country: "USA",
    tz: "America/Denver",
    lang: "EN",
  },
  phoenix: {
    city: "Phoenix",
    country: "USA",
    tz: "America/Phoenix",
    lang: "EN",
  },
  vancouver: {
    city: "Vancouver",
    country: "Canada",
    tz: "America/Vancouver",
    lang: "EN",
  },
  "mexico-city": {
    city: "Mexico City",
    country: "Mexico",
    tz: "America/Mexico_City",
    lang: "ES",
  },
  "sao-paulo": {
    city: "São Paulo",
    country: "Brazil",
    tz: "America/Sao_Paulo",
    lang: "PT",
  },
  "buenos-aires": {
    city: "Buenos Aires",
    country: "Argentina",
    tz: "America/Buenos_Aires",
    lang: "ES",
  },
  "hong-kong": {
    city: "Hong Kong",
    country: "Hong Kong",
    tz: "Asia/Hong_Kong",
    lang: "EN",
  },
  seoul: {
    city: "Seoul",
    country: "South Korea",
    tz: "Asia/Seoul",
    lang: "EN",
  },
  shanghai: {
    city: "Shanghai",
    country: "China",
    tz: "Asia/Shanghai",
    lang: "EN",
  },
  bangkok: {
    city: "Bangkok",
    country: "Thailand",
    tz: "Asia/Bangkok",
    lang: "EN",
  },
  jakarta: {
    city: "Jakarta",
    country: "Indonesia",
    tz: "Asia/Jakarta",
    lang: "EN",
  },
  manila: {
    city: "Manila",
    country: "Philippines",
    tz: "Asia/Manila",
    lang: "EN",
  },
  "kuala-lumpur": {
    city: "Kuala Lumpur",
    country: "Malaysia",
    tz: "Asia/Kuala_Lumpur",
    lang: "EN",
  },
  johannesburg: {
    city: "Johannesburg",
    country: "South Africa",
    tz: "Africa/Johannesburg",
    lang: "EN",
  },
  nairobi: {
    city: "Nairobi",
    country: "Kenya",
    tz: "Africa/Nairobi",
    lang: "EN",
  },
  melbourne: {
    city: "Melbourne",
    country: "Australia",
    tz: "Australia/Melbourne",
    lang: "EN",
  },
  auckland: {
    city: "Auckland",
    country: "New Zealand",
    tz: "Pacific/Auckland",
    lang: "EN",
  },
};

const BASE_TWO_CITY_SCENARIOS: Array<[string, string]> = [
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

const BASE_THREE_CITY_SCENARIOS: Array<[string, string, string]> = [
  ["london", "new-york", "tokyo"],
  ["london", "new-york", "sydney"],
  ["london", "new-york", "singapore"],
  ["london", "berlin", "tokyo"],
  ["new-york", "tokyo", "sydney"],
  ["san-francisco", "singapore", "tokyo"],
  ["london", "paris", "berlin"],
  ["new-york", "toronto", "chicago"],
];

function generateAdditionalTwoCityScenarios(): Array<[string, string]> {
  const topCities = [
    "london",
    "new-york",
    "san-francisco",
    "tokyo",
    "singapore",
    "sydney",
    "berlin",
    "paris",
    "dubai",
    "mumbai",
    "hong-kong",
    "seoul",
    "shanghai",
    "amsterdam",
    "madrid",
  ];

  const additionalPairs: Array<[string, string]> = [];
  const seenSlugs = new Set<string>();

  for (const scenario of BASE_TWO_CITY_SCENARIOS) {
    const slug = createScenarioSlug(scenario);
    seenSlugs.add(slug);
  }

  const newCities = [
    "amsterdam",
    "madrid",
    "rome",
    "zurich",
    "stockholm",
    "warsaw",
    "dublin",
    "lisbon",
    "denver",
    "phoenix",
    "vancouver",
    "mexico-city",
    "sao-paulo",
    "buenos-aires",
    "hong-kong",
    "seoul",
    "shanghai",
    "bangkok",
    "jakarta",
    "manila",
    "kuala-lumpur",
    "johannesburg",
    "nairobi",
    "melbourne",
    "auckland",
  ];

  const europeCities = [
    "london",
    "berlin",
    "paris",
    "amsterdam",
    "madrid",
    "rome",
    "zurich",
    "stockholm",
    "warsaw",
    "dublin",
    "lisbon",
  ];

  const usCities = [
    "new-york",
    "san-francisco",
    "chicago",
    "los-angeles",
    "denver",
    "phoenix",
  ];

  const asiaCities = [
    "tokyo",
    "singapore",
    "hong-kong",
    "seoul",
    "shanghai",
    "bangkok",
    "jakarta",
    "manila",
    "kuala-lumpur",
    "mumbai",
    "dubai",
  ];

  const latamCities = ["mexico-city", "sao-paulo", "buenos-aires"];

  const generatePairs = (
    cityList1: string[],
    cityList2: string[],
    maxPairs: number
  ) => {
    let count = 0;
    for (const city1 of cityList1) {
      if (count >= maxPairs || !CITIES[city1]) continue;
      for (const city2 of cityList2) {
        if (count >= maxPairs) break;
        if (city1 === city2 || !CITIES[city2]) continue;

        const sorted = [city1, city2].sort() as [string, string];
        const slug = createScenarioSlug(sorted);

        if (!seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          additionalPairs.push(sorted);
          count++;
        }
      }
    }
  };

  generatePairs(["london"], topCities.slice(1, 16), 50);
  generatePairs(["new-york"], topCities.slice(2, 17), 50);
  generatePairs(["san-francisco"], topCities.slice(3, 15), 40);
  generatePairs(usCities, europeCities, 100);
  generatePairs(usCities, asiaCities, 100);
  generatePairs(europeCities, asiaCities, 80);
  generatePairs(["london"], europeCities.slice(3), 30);
  generatePairs(["new-york"], usCities.slice(4), 20);
  generatePairs(usCities.slice(0, 2), latamCities, 15);

  const explicitPairs: Array<[string, string]> = [
    ["amsterdam", "london"],
    ["london", "madrid"],
    ["london", "rome"],
    ["london", "zurich"],
    ["london", "stockholm"],
    ["london", "warsaw"],
    ["dublin", "london"],
    ["lisbon", "london"],
    ["hong-kong", "london"],
    ["london", "seoul"],
    ["amsterdam", "new-york"],
    ["madrid", "new-york"],
    ["hong-kong", "new-york"],
    ["new-york", "seoul"],
    ["new-york", "shanghai"],
    ["denver", "new-york"],
    ["new-york", "vancouver"],
    ["mexico-city", "new-york"],
    ["new-york", "sao-paulo"],
    ["hong-kong", "san-francisco"],
    ["san-francisco", "shanghai"],
    ["san-francisco", "seoul"],
    ["san-francisco", "vancouver"],
    ["hong-kong", "tokyo"],
    ["seoul", "tokyo"],
    ["shanghai", "tokyo"],
    ["bangkok", "tokyo"],
    ["hong-kong", "singapore"],
    ["jakarta", "singapore"],
    ["manila", "singapore"],
    ["kuala-lumpur", "singapore"],
    ["hong-kong", "sydney"],
    ["auckland", "sydney"],
    ["melbourne", "sydney"],
    ["dubai", "hong-kong"],
    ["dubai", "singapore"],
    ["mumbai", "singapore"],
    ["hong-kong", "mumbai"],
    ["johannesburg", "london"],
    ["johannesburg", "new-york"],
    ["london", "nairobi"],
    ["dubai", "nairobi"],
  ];

  for (const pair of explicitPairs) {
    const sorted = [...pair].sort() as [string, string];
    const slug = createScenarioSlug(sorted);
    if (!seenSlugs.has(slug) && CITIES[sorted[0]] && CITIES[sorted[1]]) {
      seenSlugs.add(slug);
      additionalPairs.push(sorted);
    }
  }

  const deduplicated: Array<[string, string]> = [];
  const finalSeen = new Set<string>();

  for (const pair of additionalPairs) {
    if (!CITIES[pair[0]] || !CITIES[pair[1]]) continue;
    const slug = createScenarioSlug(pair);
    if (!finalSeen.has(slug)) {
      finalSeen.add(slug);
      deduplicated.push(pair);
    }
  }

  return deduplicated.slice(0, 300);
}

function generateAdditionalThreeCityScenarios(): Array<[string, string, string]> {
  const additional: Array<[string, string, string]> = [];
  const seenSlugs = new Set<string>();

  for (const scenario of BASE_THREE_CITY_SCENARIOS) {
    const slug = createScenarioSlug(scenario);
    seenSlugs.add(slug);
  }

  const commonTriads = [
    ["london", "new-york", "hong-kong"],
    ["london", "new-york", "singapore"],
    ["london", "new-york", "tokyo"],
    ["london", "new-york", "sydney"],
    ["london", "new-york", "dubai"],
    ["london", "new-york", "mumbai"],
    ["london", "new-york", "amsterdam"],
    ["london", "new-york", "madrid"],
    ["london", "paris", "amsterdam"],
    ["london", "berlin", "amsterdam"],
    ["london", "paris", "madrid"],
    ["london", "paris", "rome"],
    ["london", "berlin", "zurich"],
    ["new-york", "london", "tokyo"],
    ["new-york", "london", "singapore"],
    ["new-york", "san-francisco", "tokyo"],
    ["new-york", "san-francisco", "hong-kong"],
    ["new-york", "san-francisco", "singapore"],
    ["new-york", "san-francisco", "london"],
    ["san-francisco", "new-york", "tokyo"],
    ["san-francisco", "new-york", "hong-kong"],
    ["san-francisco", "tokyo", "singapore"],
    ["san-francisco", "tokyo", "hong-kong"],
    ["tokyo", "singapore", "hong-kong"],
    ["tokyo", "singapore", "sydney"],
    ["tokyo", "hong-kong", "seoul"],
    ["tokyo", "hong-kong", "shanghai"],
    ["singapore", "hong-kong", "sydney"],
    ["london", "amsterdam", "stockholm"],
    ["london", "dublin", "paris"],
    ["paris", "amsterdam", "zurich"],
    ["berlin", "amsterdam", "stockholm"],
    ["mexico-city", "new-york", "sao-paulo"],
    ["mexico-city", "new-york", "buenos-aires"],
    ["sao-paulo", "new-york", "london"],
    ["dubai", "london", "singapore"],
    ["dubai", "singapore", "hong-kong"],
    ["johannesburg", "london", "dubai"],
    ["sydney", "melbourne", "auckland"],
    ["tokyo", "seoul", "shanghai"],
    ["hong-kong", "singapore", "jakarta"],
    ["london", "warsaw", "stockholm"],
    ["new-york", "toronto", "vancouver"],
    ["san-francisco", "toronto", "vancouver"],
  ];

  for (const triad of commonTriads) {
    if (!CITIES[triad[0]] || !CITIES[triad[1]] || !CITIES[triad[2]]) continue;
    const sorted = [...triad].sort() as [string, string, string];
    const slug = createScenarioSlug(sorted);
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      additional.push(sorted);
    }
  }

  return additional.slice(0, 70);
}

const TWO_CITY_SCENARIOS = [
  ...BASE_TWO_CITY_SCENARIOS,
  ...generateAdditionalTwoCityScenarios(),
];

const THREE_CITY_SCENARIOS = [
  ...BASE_THREE_CITY_SCENARIOS,
  ...generateAdditionalThreeCityScenarios(),
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

