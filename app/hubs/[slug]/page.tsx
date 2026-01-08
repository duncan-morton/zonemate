import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPage from "@/components/HubPage";
import { getAllHubs, getHubBySlug } from "@/lib/hubs";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import { makeBreadcrumbList } from "@/lib/seo/jsonld";

export const revalidate = 86400; // 24 hours ISR

export async function generateStaticParams() {
  const hubs = getAllHubs();
  return hubs.map((hub) => ({
    slug: hub.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHubBySlug(slug);

  if (!hub) {
    return {
      title: "Hub not found",
    };
  }

  return {
    title: `${hub.title} | ${SITE_NAME}`,
    description: hub.description,
    alternates: {
      canonical: `${SITE_URL}/hubs/${slug}`,
    },
  };
}

export default async function HubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = getHubBySlug(slug);

  if (!hub) {
    notFound();
  }

  const breadcrumbJsonLd = makeBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Hubs", url: `${SITE_URL}/hubs` },
    { name: hub.title, url: `${SITE_URL}/hubs/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HubPage
        title={hub.title}
        description={hub.description}
        scenarioSlugs={hub.scenarioSlugs}
      />
    </>
  );
}

