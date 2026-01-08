import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";
import { getScenarioTitleBySlug } from "@/lib/hubs";
import { makeFaqPage } from "@/lib/seo/jsonld";

interface HubPageProps {
  title: string;
  description: string;
  scenarioSlugs: string[];
}

export default function HubPage({
  title,
  description,
  scenarioSlugs,
}: HubPageProps) {
  const faqs = [
    {
      question: "How do I find the best meeting time?",
      answer:
        "Use ZoneMate to compare timezones and see overlapping working hours. The tool suggests meeting times when all participants are available.",
    },
    {
      question: "What if there's no overlap?",
      answer:
        "If standard working hours don't overlap, consider rotating meeting times or using asynchronous communication for some participants.",
    },
  ];

  const faqJsonLd = makeFaqPage(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">{title}</h1>
      <p className="mb-8 text-lg text-neutral-600">{description}</p>

      <div className="mb-12">
        <Link
          href="/"
          className="inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
        >
          Open ZoneMate
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Common scenarios</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {scenarioSlugs.map((slug) => {
            const scenarioTitle = getScenarioTitleBySlug(slug);
            if (!scenarioTitle) return null;

            return (
              <li key={slug}>
                <Link
                  href={`/meetings/${slug}`}
                  className="block rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {scenarioTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
        <dl className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <dt className="mb-1 font-medium text-neutral-900">
                {faq.question}
              </dt>
              <dd className="text-neutral-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
      </div>
    </>
  );
}

