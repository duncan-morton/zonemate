import type { Metadata } from "next";
import Link from "next/link";
import TimezoneConvert from "@/components/TimezoneConvert";
import MonetizationSlot from "@/components/MonetizationSlot";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import { makeBreadcrumbList } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: `Timezone Converter – ${SITE_NAME}`,
  description:
    "Convert times between timezones instantly. DST-aware timezone converter with automatic daylight saving time handling.",
  alternates: {
    canonical: `${SITE_URL}/convert`,
  },
};

export default function ConvertPage() {
  const breadcrumbList = makeBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Convert", url: `${SITE_URL}/convert` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Timezone converter</h1>
        <p className="mb-8 text-lg text-neutral-600">
          Convert times between timezones with automatic DST handling. Fast,
          browser-based timezone conversion tool.
        </p>
        <TimezoneConvert />
        <MonetizationSlot />
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="mb-3 text-sm font-semibold text-neutral-900">
            Related tools
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
            <Link
              href="/meetings"
              className="hover:text-neutral-900 hover:underline"
            >
              Find overlap meeting times
            </Link>
            <Link
              href="/embed"
              className="hover:text-neutral-900 hover:underline"
            >
              Embed ZoneMate on your site
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

