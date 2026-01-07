import type { Metadata } from "next";
import EmbedCodeBox from "@/components/EmbedCodeBox";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Embed ${SITE_NAME}`,
    description: `Embed ${SITE_NAME} widgets on your site`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

const DEFAULT_EMBED_CODE = `<iframe
  src="https://zonemate.io/embed/compare"
  width="860"
  height="640"
  style="border: 1px solid #e5e7eb; border-radius: 12px;"
  loading="lazy"
  referrerpolicy="no-referrer"
></iframe>`;

const PREFILLED_EMBED_CODE = `<iframe
  src="https://zonemate.io/embed/compare?p=London%20Team|Europe/London|EN;NYC%20Team|America/New_York|EN"
  width="860"
  height="640"
  style="border: 1px solid #e5e7eb; border-radius: 12px;"
  loading="lazy"
  referrerpolicy="no-referrer"
></iframe>`;

export default function EmbedPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">
        Free timezone overlap widget you can embed on your site
      </h1>
      <p className="mb-12 text-lg text-neutral-600">
        Free, privacy-first, no cookies. Add a timezone comparison tool to your
        website in seconds.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Live preview</h2>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <iframe
            src={`${SITE_URL}/embed/compare`}
            width="860"
            height="640"
            style={{ border: "1px solid #e5e7eb", borderRadius: "12px", width: "100%", maxWidth: "860px" }}
            loading="lazy"
            referrerPolicy="no-referrer"
            title={`${SITE_NAME} Compare Tool`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Copy embed code</h2>
        <EmbedCodeBox code={DEFAULT_EMBED_CODE} />
        <p className="mt-3 text-sm text-neutral-600">
          Paste this code anywhere on your site. The widget will load
          automatically.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Optional: prefill participants
        </h2>
        <p className="mb-4 text-neutral-600">
          You can prefill the widget with specific participants by adding{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm">
            ?p=
          </code>{" "}
          to the iframe src URL. Use the same format as the shareable URL.
        </p>
        <EmbedCodeBox code={PREFILLED_EMBED_CODE} label="Example with prefilled participants" />
      </section>
    </main>
  );
}

