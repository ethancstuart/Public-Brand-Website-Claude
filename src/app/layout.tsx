import type { Metadata } from "next";
import { Instrument_Serif, Syne, Bricolage_Grotesque, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BottomMarquee } from "@/components/bottom-marquee";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
    template: "%s · Ethan Stuart",
  },
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. Six AI products across intelligence, lending, trading, and learning — all live.",
  metadataBase: new URL("https://ethancstuart.com"),
  openGraph: {
    title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
    description:
      "Six AI products live in 2026. Senior Manager at Disney Studios. Founder at Stuart Ventures.",
    url: "https://ethancstuart.com",
    siteName: "Ethan Stuart",
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
    <html
      lang="en"
      className={`${syne.variable} ${bricolage.variable} ${instrumentSerif.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <SmoothScrollProvider>
          <Nav />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <BottomMarquee />
          <Analytics />
          <SpeedInsights />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
