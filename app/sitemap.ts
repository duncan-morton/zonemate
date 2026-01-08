import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { getAllScenarios } from "@/lib/scenarios";
import { getAllHubs } from "@/lib/hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/meetings`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hubs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const scenarioUrls: MetadataRoute.Sitemap = getAllScenarios().map(
    (scenario) => ({
      url: `${SITE_URL}/meetings/${scenario.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const hubUrls: MetadataRoute.Sitemap = getAllHubs().map((hub) => ({
    url: `${SITE_URL}/hubs/${hub.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...baseUrls, ...scenarioUrls, ...hubUrls];
}

