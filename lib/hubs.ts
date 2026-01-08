import { getAllScenarios } from "@/lib/scenarios";

export interface Hub {
  slug: string;
  title: string;
  description: string;
  scenarioSlugs: string[];
}

const US_CITIES = new Set([
  "new-york",
  "san-francisco",
  "chicago",
  "los-angeles",
  "denver",
  "phoenix",
]);

const EUROPE_CITIES = new Set([
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
]);

const ASIA_CITIES = new Set([
  "tokyo",
  "singapore",
  "sydney",
  "mumbai",
  "dubai",
  "hong-kong",
  "seoul",
  "shanghai",
  "bangkok",
  "jakarta",
  "manila",
  "kuala-lumpur",
  "melbourne",
  "auckland",
]);

function isUSEuropeScenario(scenario: { cities: string[] }): boolean {
  const hasUS = scenario.cities.some((c) => US_CITIES.has(c));
  const hasEurope = scenario.cities.some((c) => EUROPE_CITIES.has(c));
  return hasUS && hasEurope && scenario.cities.length === 2;
}

function isUSAsiaScenario(scenario: { cities: string[] }): boolean {
  const hasUS = scenario.cities.some((c) => US_CITIES.has(c));
  const hasAsia = scenario.cities.some((c) => ASIA_CITIES.has(c));
  return hasUS && hasAsia && scenario.cities.length === 2;
}

function isEuropeAsiaScenario(scenario: { cities: string[] }): boolean {
  const hasEurope = scenario.cities.some((c) => EUROPE_CITIES.has(c));
  const hasAsia = scenario.cities.some((c) => ASIA_CITIES.has(c));
  return hasEurope && hasAsia && scenario.cities.length === 2;
}

function isThreeTimezoneScenario(scenario: { cities: string[] }): boolean {
  return scenario.cities.length === 3;
}

const UK_CITIES = new Set(["london", "dublin"]);

const US_WEST_COAST_CITIES = new Set([
  "san-francisco",
  "los-angeles",
  "vancouver",
]);

const APAC_CITIES = new Set([
  "singapore",
  "tokyo",
  "sydney",
  "hong-kong",
  "seoul",
  "shanghai",
  "manila",
  "bangkok",
  "jakarta",
  "kuala-lumpur",
  "melbourne",
  "auckland",
]);

function isUKUSScenario(scenario: { cities: string[] }): boolean {
  const hasUK = scenario.cities.some((c) => UK_CITIES.has(c));
  const hasUS = scenario.cities.some((c) => US_CITIES.has(c));
  return hasUK && hasUS && scenario.cities.length === 2;
}

function isUKAsiaScenario(scenario: { cities: string[] }): boolean {
  const hasUK = scenario.cities.some((c) => UK_CITIES.has(c));
  const hasAsia = scenario.cities.some((c) => ASIA_CITIES.has(c));
  return hasUK && hasAsia && scenario.cities.length === 2;
}

function isUSWestCoastScenario(scenario: { cities: string[] }): boolean {
  const hasWestCoast = scenario.cities.some((c) =>
    US_WEST_COAST_CITIES.has(c)
  );
  return hasWestCoast && scenario.cities.length === 2;
}

function isAPACScenario(scenario: { cities: string[] }): boolean {
  const apacCount = scenario.cities.filter((c) => APAC_CITIES.has(c)).length;
  return apacCount >= 2 && scenario.cities.length >= 2;
}

const MAJOR_CITIES = new Set([
  "london",
  "new-york",
  "san-francisco",
  "tokyo",
  "singapore",
  "sydney",
  "dubai",
  "mumbai",
  "berlin",
  "paris",
  "toronto",
]);

function scoreScenario(scenario: { cities: string[] }): number {
  let score = 0;
  for (const city of scenario.cities) {
    if (MAJOR_CITIES.has(city)) {
      score += 10;
    }
  }
  return score;
}

function selectBestScenarios(
  scenarios: Array<{ slug: string; cities: string[] }>,
  max: number
): string[] {
  return scenarios
    .map((s) => ({
      ...s,
      score: scoreScenario(s),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, max)
    .map((s) => s.slug);
}

export function getAllHubs(): Hub[] {
  const allScenarios = getAllScenarios();

  const meetingTimesScenarios = selectBestScenarios(
    allScenarios.slice(0, 100),
    35
  );

  const usEuropeScenarios = selectBestScenarios(
    allScenarios.filter(isUSEuropeScenario),
    40
  );

  const usAsiaScenarios = selectBestScenarios(
    allScenarios.filter(isUSAsiaScenario),
    40
  );

  const europeAsiaScenarios = selectBestScenarios(
    allScenarios.filter(isEuropeAsiaScenario),
    40
  );

  const threeTimezoneScenarios = selectBestScenarios(
    allScenarios.filter(isThreeTimezoneScenario),
    40
  );

  const ukUSScenarios = selectBestScenarios(
    allScenarios.filter(isUKUSScenario),
    40
  );

  const ukAsiaScenarios = selectBestScenarios(
    allScenarios.filter(isUKAsiaScenario),
    40
  );

  const usWestCoastScenarios = selectBestScenarios(
    allScenarios.filter(isUSWestCoastScenario),
    40
  );

  const apacScenarios = selectBestScenarios(
    allScenarios.filter(isAPACScenario),
    40
  );

  return [
    {
      slug: "meeting-times",
      title: "Meeting times across time zones",
      description:
        "How to find overlap hours and schedule meetings across locations",
      scenarioSlugs: meetingTimesScenarios,
    },
    {
      slug: "us-europe-meetings",
      title: "US–Europe meeting times",
      description:
        "Common overlap challenges between US and European teams",
      scenarioSlugs: usEuropeScenarios,
    },
    {
      slug: "us-asia-meetings",
      title: "US–Asia meeting times",
      description: "Scheduling meetings across large time differences",
      scenarioSlugs: usAsiaScenarios,
    },
    {
      slug: "europe-asia-meetings",
      title: "Europe–Asia meeting times",
      description: "Coordinating meetings between Europe and Asia",
      scenarioSlugs: europeAsiaScenarios,
    },
    {
      slug: "three-timezone-meetings",
      title: "Meetings across three time zones",
      description: "Scheduling meetings involving three or more regions",
      scenarioSlugs: threeTimezoneScenarios,
    },
    {
      slug: "uk-us-meetings",
      title: "UK–US meeting times",
      description: "Scheduling meetings between UK and US teams across time zones.",
      scenarioSlugs: ukUSScenarios,
    },
    {
      slug: "uk-asia-meetings",
      title: "UK–Asia meeting times",
      description: "Finding overlap hours between UK and Asian teams.",
      scenarioSlugs: ukAsiaScenarios,
    },
    {
      slug: "us-west-coast-meetings",
      title: "US West Coast meeting times",
      description:
        "Meeting times and overlap for teams on the US West Coast and global counterparts.",
      scenarioSlugs: usWestCoastScenarios,
    },
    {
      slug: "apac-meetings",
      title: "APAC meeting times",
      description: "Meeting coordination across major Asia-Pacific time zones.",
      scenarioSlugs: apacScenarios,
    },
  ];
}

export function getHubBySlug(slug: string): Hub | null {
  const allHubs = getAllHubs();
  return allHubs.find((h) => h.slug === slug) || null;
}

export function getScenarioTitleBySlug(slug: string): string | null {
  const allScenarios = getAllScenarios();
  const scenario = allScenarios.find((s) => s.slug === slug);
  return scenario?.title || null;
}

