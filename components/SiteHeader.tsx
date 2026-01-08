import Link from "next/link";
import { SITE_NAME } from "@/lib/siteConfig";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold text-neutral-900 hover:text-neutral-700"
          >
            {SITE_NAME}
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/meetings"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Meetings
            </Link>
            <Link
              href="/hubs"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Hubs
            </Link>
            <Link
              href="/embed"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Embed
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

