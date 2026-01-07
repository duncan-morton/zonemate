import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Embed ${SITE_NAME}`,
    description: `Embed ${SITE_NAME} widgets on your site`,
    alternates: {
      canonical: `${SITE_URL}/embed`,
    },
  };
}

export default function EmbedPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">Embed {SITE_NAME} on your site</h1>
      <p className="mb-8 text-lg text-neutral-600">
        Add embeddable timezone widgets to your website with {SITE_NAME}.
      </p>
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
        <p className="mb-4 text-sm text-neutral-500">Example embed:</p>
        <div className="rounded border border-neutral-300 bg-white p-4">
          <iframe
            src={`${SITE_URL}/embed/compare`}
            className="h-96 w-full border-0"
            title={`${SITE_NAME} Compare Tool`}
          />
        </div>
      </div>
    </main>
  );
}

