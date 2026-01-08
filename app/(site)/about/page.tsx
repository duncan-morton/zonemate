import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `About – ${SITE_NAME}`,
  description: `About ${SITE_NAME} - timezone coordination tools for global teams`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">About {SITE_NAME}</h1>

      <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
        <p>
          {SITE_NAME} is built for global teams to coordinate meetings and schedule
          work across different time zones. The tool helps teams find overlap hours,
          convert times between locations, and understand timezone differences
          efficiently.
        </p>
        <p>
          All calculations run locally in your browser. No data is sent to servers. The
          tool is fast, free, and respects your privacy. No cookies, no tracking, no data
          collection.
        </p>
        <p>
          ZoneMate can also be embedded on your website or documentation using our embed
          widget.
        </p>
      </div>
    </main>
  );
}

