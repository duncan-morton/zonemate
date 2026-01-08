import type { Metadata } from "next";
import Link from "next/link";
import { getAllHubs } from "@/lib/hubs";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Meeting time and timezone coordination guides",
  description: `Guides and resources for coordinating meetings across time zones using ${SITE_NAME}.`,
  alternates: {
    canonical: `${SITE_URL}/hubs`,
  },
};

export default function HubsIndexPage() {
  const allHubs = getAllHubs();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">
        Meeting time and timezone coordination guides
      </h1>
      <p className="mb-12 text-lg text-neutral-600">
        Practical guides for scheduling meetings across different time zones and
        regions.
      </p>

      <ul className="space-y-6">
        {allHubs.map((hub) => (
          <li key={hub.slug}>
            <Link
              href={`/hubs/${hub.slug}`}
              className="block rounded-lg border border-neutral-200 bg-white p-6 hover:border-neutral-300 hover:shadow-sm"
            >
              <h2 className="mb-2 text-2xl font-semibold">{hub.title}</h2>
              <p className="text-neutral-600">{hub.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

