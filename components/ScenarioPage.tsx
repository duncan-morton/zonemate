"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TimezoneCompare from "@/components/TimezoneCompare";
import MonetizationSlot from "@/components/MonetizationSlot";
import { SITE_URL } from "@/lib/siteConfig";

interface ScenarioPageProps {
  title: string;
  description: string;
  participants: Array<{ name: string; city: string; country: string }>;
  prefillQueryString: string;
  relatedScenarios: Array<{ slug: string; title: string }>;
}

export default function ScenarioPage({
  title,
  description,
  participants,
  prefillQueryString,
  relatedScenarios,
}: ScenarioPageProps) {
  const toolUrl = `${SITE_URL}/?${prefillQueryString}`;
  const [isUrlSet, setIsUrlSet] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentSearch = window.location.search;
      if (!currentSearch.includes("p=")) {
        const newUrl = new URL(window.location.href);
        newUrl.search = prefillQueryString;
        window.history.replaceState({}, "", newUrl.toString());
      }
      setIsUrlSet(true);
    }
  }, [prefillQueryString]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <p className="mb-8 text-lg text-neutral-600">{description}</p>

      <div className="mb-8">
        <Link
          href={toolUrl}
          className="inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
        >
          Open in ZoneMate
        </Link>
      </div>

      <div className="mb-12 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        {isUrlSet && <TimezoneCompare />}
      </div>

      <MonetizationSlot />

      {relatedScenarios.length > 0 && (
        <div className="border-t border-neutral-200 pt-8">
          <h2 className="mb-4 text-xl font-semibold">Related scenarios</h2>
          <ul className="space-y-2">
            {relatedScenarios.map((scenario) => (
              <li key={scenario.slug}>
                <Link
                  href={`/meetings/${scenario.slug}`}
                  className="text-neutral-700 hover:text-neutral-900 hover:underline"
                >
                  {scenario.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

