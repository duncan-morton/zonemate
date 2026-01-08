import type { Metadata } from "next";
import Link from "next/link";
import { getAllScenarios } from "@/lib/scenarios";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Meeting time and timezone overlap scenarios",
  description: `Find meeting times and timezone overlap for common city combinations using ${SITE_NAME}.`,
  alternates: {
    canonical: `${SITE_URL}/meetings`,
  },
};

export default function MeetingsIndexPage() {
  const allScenarios = getAllScenarios();
  const twoCityScenarios = allScenarios.filter((s) => s.cities.length === 2);
  const threeCityScenarios = allScenarios.filter((s) => s.cities.length === 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">
        Meeting time and timezone overlap scenarios
      </h1>
      <p className="mb-12 text-lg text-neutral-600">
        Find the best meeting times for common city combinations. Each scenario
        page includes a pre-filled timezone comparison tool.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Two-city scenarios</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {twoCityScenarios.map((scenario) => (
            <li key={scenario.slug}>
              <Link
                href={`/meetings/${scenario.slug}`}
                className="block rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
              >
                {scenario.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Three-city scenarios</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {threeCityScenarios.map((scenario) => (
            <li key={scenario.slug}>
              <Link
                href={`/meetings/${scenario.slug}`}
                className="block rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
              >
                {scenario.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

