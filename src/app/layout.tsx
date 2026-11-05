import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/nav";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/constants";
import "./globals.css";
import "./brand-fonts.css";
import "./brand.css";
import { JsonLd } from "@/components/json-ld";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: "%s · Ethan Stuart",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="site-skip" href="#main">Skip to content</a>
        <JsonLd data={getPersonJsonLd()} />
        <JsonLd data={getWebSiteJsonLd()} />
        <CommandPalette />
        <Nav />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        {process.env.VERCEL && <Analytics />}
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
