import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `${SITE_NAME} – %s`,
  },
  description: SITE_TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
