import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { getAllScenarios } from "@/lib/scenarios";
import { getAllHubs } from "@/lib/hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = SITE_URL.trim();

  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/convert`.trim(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/meetings`.trim(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hubs`.trim(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const scenarioUrls: MetadataRoute.Sitemap = getAllScenarios().map(
    (scenario) => ({
      url: `${baseUrl}/meetings/${scenario.slug.trim()}`.trim(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const hubUrls: MetadataRoute.Sitemap = getAllHubs().map((hub) => ({
    url: `${baseUrl}/hubs/${hub.slug.trim()}`.trim(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...baseUrls, ...scenarioUrls, ...hubUrls];
}

