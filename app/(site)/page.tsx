import type { Metadata } from "next";
import TimezoneCompare from "@/components/TimezoneCompare";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SITE_NAME} – Timezone and overlap tool for multiple locations`,
    description:
      "Timezone and overlap tools for coordinating across locations. Compare timezones and find the best meeting times.",
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">
        Timezone and overlap tool for multiple locations
      </h1>
      <p className="mb-8 text-lg text-neutral-600">
        {SITE_TAGLINE}
      </p>
      <TimezoneCompare />
    </main>
  );
}

