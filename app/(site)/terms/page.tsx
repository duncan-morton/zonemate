import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Terms – ${SITE_NAME}`,
  description: "Terms of service for ZoneMate timezone coordination tool",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Terms</h1>

      <div className="prose prose-neutral max-w-none">
        <ul className="space-y-4 text-neutral-700">
          <li>
            <strong>Provided "as is".</strong> ZoneMate is provided as-is without
            warranties of any kind, express or implied.
          </li>
          <li>
            <strong>No warranties.</strong> We make no guarantees about accuracy,
            availability, or fitness for a particular purpose.
          </li>
          <li>
            <strong>No liability for scheduling errors.</strong> Timezone calculations
            are for informational purposes only. We are not liable for any scheduling
            errors, missed meetings, or related consequences.
          </li>
          <li>
            <strong>Acceptable use.</strong> Use ZoneMate responsibly and in accordance
            with applicable laws and regulations.
          </li>
          <li>
            <strong>Changes over time.</strong> These terms may be updated from time to
            time. Continued use constitutes acceptance of the updated terms.
          </li>
        </ul>
      </div>
    </main>
  );
}

