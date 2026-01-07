import type { Metadata } from "next";
import Link from "next/link";
import TimezoneCompare from "@/components/TimezoneCompare";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Compare",
    description: "Timezone comparison tool",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default function EmbedComparePage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <TimezoneCompare />
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-700"
          >
            Powered by {SITE_NAME}
          </Link>
        </div>
      </div>
    </div>
  );
}

