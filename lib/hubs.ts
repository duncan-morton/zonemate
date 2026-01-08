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

export function getAllHubs(): Hub[] {
  const allScenarios = getAllScenarios();

  const meetingTimesScenarios = allScenarios
    .slice(0, 35)
    .map((s) => s.slug);

  const usEuropeScenarios = allScenarios
    .filter(isUSEuropeScenario)
    .slice(0, 35)
    .map((s) => s.slug);

  const usAsiaScenarios = allScenarios
    .filter(isUSAsiaScenario)
    .slice(0, 35)
    .map((s) => s.slug);

  const europeAsiaScenarios = allScenarios
    .filter(isEuropeAsiaScenario)
    .slice(0, 35)
    .map((s) => s.slug);

  const threeTimezoneScenarios = allScenarios
    .filter(isThreeTimezoneScenario)
    .slice(0, 40)
    .map((s) => s.slug);

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

