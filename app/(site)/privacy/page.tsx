import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Privacy policy – ${SITE_NAME}`,
  description: "Privacy policy for ZoneMate timezone coordination tool",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Privacy policy</h1>

      <div className="prose prose-neutral max-w-none">
        <ul className="space-y-4 text-neutral-700">
          <li>
            <strong>The tool runs in the browser.</strong> All timezone calculations
            happen locally in your browser. No data is sent to servers for processing.
          </li>
          <li>
            <strong>No uploads.</strong> Timezone data and participant information
            stay in your browser session. Nothing is stored on our servers.
          </li>
          <li>
            <strong>No cookies for tracking.</strong> We do not use cookies to track
            users or collect personal information.
          </li>
          <li>
            <strong>Vercel Analytics.</strong> We use Vercel Analytics for aggregate
            analytics. This does not collect personal data or create user profiles.
          </li>
          <li>
            <strong>No personal data is sold.</strong> We do not sell, rent, or share
            personal information with third parties.
          </li>
          <li>
            <strong>Contact.</strong> Contact information coming soon.
          </li>
        </ul>
      </div>
    </main>
  );
}

