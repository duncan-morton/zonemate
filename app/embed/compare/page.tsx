import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Compare",
    description: "Timezone comparison tool",
    alternates: {
      canonical: `${SITE_URL}/embed/compare`,
    },
  };
}

export default function EmbedComparePage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-neutral-600">Placeholder tool container</p>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Powered by {SITE_NAME}
          </Link>
        </div>
      </div>
    </div>
  );
}

