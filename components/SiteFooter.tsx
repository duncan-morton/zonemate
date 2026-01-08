import Link from "next/link";
import { SITE_NAME } from "@/lib/siteConfig";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-600">
            © {currentYear} {SITE_NAME}
          </p>
          <nav className="flex flex-wrap items-center gap-6">
            <Link
              href="/convert"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Convert
            </Link>
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
          </nav>
        </div>
      </div>
    </footer>
  );
}

