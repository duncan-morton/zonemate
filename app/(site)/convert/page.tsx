import type { Metadata } from "next";
import TimezoneConvert from "@/components/TimezoneConvert";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Timezone Converter – ${SITE_NAME}`,
  description:
    "Convert times between timezones instantly. DST-aware timezone converter with automatic daylight saving time handling.",
  alternates: {
    canonical: `${SITE_URL}/convert`,
  },
};

export default function ConvertPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">Timezone converter</h1>
      <p className="mb-8 text-lg text-neutral-600">
        Convert times between timezones with automatic DST handling. Fast,
        browser-based timezone conversion tool.
      </p>
      <TimezoneConvert />
    </main>
  );
}

