import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScenarioPage from "@/components/ScenarioPage";
import {
  getAllScenarios,
  getScenarioBySlug,
  generatePrefillQueryString,
  getRelatedScenarios,
  getCityByKey,
} from "@/lib/scenarios";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const revalidate = 86400; // 24 hours ISR

export async function generateStaticParams() {
  const scenarios = getAllScenarios();
  return scenarios.map((scenario) => ({
    slug: scenario.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    return {
      title: "Scenario not found",
    };
  }

  const cityNames = scenario.cities
    .map((key) => getCityByKey(key)?.city)
    .filter(Boolean)
    .join(", ");

  return {
    title: `${scenario.title} | ${SITE_NAME}`,
    description: `Find meeting times and timezone overlap between ${cityNames}. Free timezone comparison tool with working hours overlap.`,
    alternates: {
      canonical: `${SITE_URL}/meetings/${slug}`,
    },
  };
}

export default async function ScenarioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    notFound();
  }

  const participants = scenario.cities.map((key) => {
    const city = getCityByKey(key);
    if (!city) {
      return null;
    }
    return {
      name: city.city,
      city: city.city,
      country: city.country,
    };
  }).filter((p): p is { name: string; city: string; country: string } => p !== null);

  const prefillQueryString = generatePrefillQueryString(scenario.cities);
  const relatedScenarios = getRelatedScenarios(slug, 8);

  const cityNames = participants.map((p) => p.city).join(", ");
  const description =
    participants.length === 2
      ? `Coordinate meetings between ${cityNames}. Find overlapping working hours and suggested meeting times across timezones.`
      : `Coordinate meetings between ${cityNames}. Find overlapping working hours and suggested meeting times across multiple timezones.`;

  return (
    <ScenarioPage
      title={scenario.title}
      description={description}
      participants={participants}
      prefillQueryString={prefillQueryString}
      relatedScenarios={relatedScenarios}
    />
  );
}

