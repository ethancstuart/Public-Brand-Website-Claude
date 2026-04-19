# Personal Brand Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full redesign of ethancstuart.com — cream palette, new typography, split-layout hero, 6 updated portfolio projects, rewritten About and Portfolio pages.

**Architecture:** Design tokens flow from globals.css → all components. New fonts (Instrument Serif + Syne + JetBrains Mono) replace Inter. No dark mode. Hero is a split layout with left column content and right project manifest. New components: Ticker, FeaturedProjectCard. Existing: Hero, Nav, PortfolioCard, About page, Portfolio page fully rewritten.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, next/font/google

---

### Task 1: Update globals.css — cream palette, font variables, animation keyframes

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --font-sans: var(--font-syne);
  --font-serif: var(--font-instrument-serif);
  --font-mono: var(--font-jetbrains-mono);
}

:root {
  --background:        #f2ede3;
  --surface:           #ede8de;
  --deep:              #e4dfd4;
  --foreground:        #131110;
  --text-mid:          rgba(19,17,16,0.5);
  --text-low:          rgba(19,17,16,0.28);
  --muted:             #ede8de;
  --muted-foreground:  #9a9288;
  --mid:               #706860;
  --border:            rgba(19,17,16,0.07);
  --border-lo:         rgba(19,17,16,0.05);
  --accent:            #5a8000;
  --accent-foreground: #ffffff;
  --accent-soft:       rgba(90,128,0,0.07);
  --accent-mid:        rgba(90,128,0,0.15);
  --card:              #ede8de;
  --card-foreground:   #131110;
  --status-live:       #5a8000;
  --status-building:   #d4900c;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-syne), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--accent);
  color: var(--accent-foreground);
}

@keyframes clipup {
  from { transform: translateY(108%); }
  to   { transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.prose {
  --tw-prose-body: var(--muted-foreground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--accent);
  --tw-prose-bold: var(--foreground);
  --tw-prose-quotes: var(--muted-foreground);
  --tw-prose-quote-borders: var(--border);
  --tw-prose-code: var(--foreground);
  --tw-prose-pre-bg: var(--muted);
  --tw-prose-pre-code: var(--foreground);
  --tw-prose-hr: var(--border);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit`
Expected: No errors (CSS changes don't affect TS)

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/app/globals.css
git commit -m "feat: replace design tokens with cream palette, add animation keyframes"
```

---

### Task 2: Update layout.tsx — Instrument Serif + Syne fonts, remove ThemeProvider

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from "next";
import { Instrument_Serif, Syne, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
      <body
        className={`${instrumentSerif.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Instrument Serif + Syne fonts, remove ThemeProvider"
```

---

### Task 3: Update constants.ts — 6 projects, type field, status types

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Replace constants.ts with updated siteConfig, updated interface, and 6 projects**

```typescript
export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. Six AI products in production.",
  url: "https://ethancstuart.com",
  ogImage: "https://ethancstuart.com/opengraph-image",
  links: {
    linkedin: "https://linkedin.com/in/ethan-stuart",
    github: "https://github.com/ethancstuart",
    substack: "https://thedataproductagent.substack.com",
    email: "ethan.c.stuart@gmail.com",
    twitter: "https://x.com/ethancstuart",
  },
  substackFeed: "https://thedataproductagent.substack.com/feed",
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/writing", label: "Writing" },
];

export interface PortfolioProject {
  title: string;
  slug: string;
  type: string;
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  iframeSrc: string;
  image?: string;
  status: "Live" | "Building" | "Open Source";
  featured?: boolean;
  highlights?: string[];
  stack?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "NexusWatch",
    slug: "nexuswatch",
    type: "Geopolitical Intelligence Platform",
    description:
      "Real-time global intelligence platform tracking 86 countries across 45+ live data layers — conflict zones, earthquakes, wildfires, flight disruptions, cyber incidents, ship tracking, and more. Bloomberg terminal meets geopolitical situational awareness.",
    tags: ["TypeScript", "MapLibre GL", "Vite", "Supabase", "Claude AI"],
    liveUrl: "https://nexuswatch.io",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/nexuswatch-preview.png",
    status: "Live",
    featured: true,
    highlights: [
      "86 countries, 45+ real-time data layers on a single interactive globe",
      "AI-powered geopolitical analysis and tension index scoring",
      "Conflict zones, natural disasters, cyber incidents, and ship tracking — live",
    ],
    stack: ["TypeScript", "Vite", "MapLibre GL", "Supabase", "Claude AI"],
    caseStudy: {
      problem:
        "Geopolitical intelligence is either locked behind Bloomberg terminals costing $25K/year or buried in news feeds that require hours to parse. There's no product that gives a solo analyst, researcher, or enterprise team a live, structured view of global risk at a glance.",
      approach:
        "Built a MapLibre GL globe as the primary interface — every data layer toggled on top of a single interactive map. Engineered 45+ live data feeds (GDELT, USGS, FlightAware, AIS ship tracking, CISA cyber alerts, undersea cable databases) into a unified event stream. Layered an AI analyst (Claude) on top that synthesizes tension patterns into a daily intelligence brief.",
      outcome:
        "Live at nexuswatch.io — 86 countries, 45+ data layers, live geopolitical scoring, and an AI analyst accessible without an enterprise contract. Designed for researchers, journalists, analysts, and operators who need situational awareness, not a Bloomberg subscription.",
    },
  },
  {
    title: "Meridian Intelligence",
    slug: "meridian",
    type: "Non-QM Lending Intelligence OS",
    description:
      "Institutional lending intelligence platform for mortgage brokers. Matches deals to 15+ real non-QM lenders in real time, runs automated scenario analysis, and surfaces the rate and terms a deal can actually get — before a broker makes a single call.",
    tags: ["Next.js", "Supabase", "TypeScript", "Claude AI"],
    liveUrl: "https://meridian.finance",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/meridian-preview.png",
    status: "Live",
    featured: false,
    highlights: [
      "15+ live lender integrations with real-time program matching",
      "20+ intelligence modules: scenario analysis, rate comparison, deal scoring",
      "Built for brokers — surfaces deal viability before the first lender call",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "Claude AI", "PostgreSQL"],
    caseStudy: {
      problem:
        "Non-QM mortgage brokers spend hours calling lenders, manually comparing program guidelines, and building scenario spreadsheets — before they know if a deal will close. There's no intelligence layer between the deal and the lender universe.",
      approach:
        "Built a full lending OS: 15+ lender integrations with real program data (not scraped, not stale), a scenario engine that computes rate/terms across the universe in real time, and an AI analyst that scores deal viability and flags fit/gap issues. Designed for the broker workflow, not the lender.",
      outcome:
        "Live at meridian.finance — 20+ intelligence modules, 15+ lenders, 433+ tests passing. Pricing from free to enterprise. Built by a solo founder who learned non-QM lending from scratch to get the domain right.",
    },
  },
  {
    title: "Zero to Ship",
    slug: "ai-coding-course",
    type: "AI-Native Learning Platform",
    description:
      "Gamified learning platform teaching PMs, analysts, and operators to build and ship real products using AI coding tools. 16 hands-on modules — each ending with something deployed, not a slide deck.",
    tags: ["Next.js", "Supabase", "Stripe", "Framer Motion"],
    liveUrl: "https://zerotoship.app",
    sourceUrl: "https://github.com/ethancstuart/zero-to-shipped",
    iframeSrc: "",
    image: "/portfolio/zerotoship-preview.png",
    status: "Live",
    featured: false,
    highlights: [
      "Built for operators, not engineers — every module ships something real",
      "Gamification: XP, 20+ badges, leaderboard, skill tree, certificates",
      "The platform was built with the same AI-first workflow it teaches",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Shiki", "Framer Motion"],
    caseStudy: {
      problem:
        "PMs, analysts, and operators are surrounded by AI coding tools — but have no structured path from zero to a shipped, deployed product. Most tutorials stop at hello world. The gap between 'I tried Cursor' and 'I shipped something real' is where most people stall.",
      approach:
        "Designed around the user outcome: every module ends with something deployed. Built full gamification (XP, badges, streaks, leaderboard, skill tree, certificates), Stripe checkout with founding coupon, 5 email nurture sequences, and public profiles. The platform itself was built using the same AI-assisted workflow it teaches.",
      outcome:
        "Live at zerotoship.app — 16-module gamified platform, Stripe live, founding member pricing. Proves the thesis that the gap between product thinking and product building is closing fast.",
    },
  },
  {
    title: "RidgeCap",
    slug: "ridgecap",
    type: "CRE Debt Intelligence",
    description:
      "Capital source matching and deal underwriting platform for commercial real estate brokers. AI-powered lender matching, geospatial market intelligence, portfolio stress testing, and pipeline management — purpose-built for CRE debt professionals.",
    tags: ["Next.js", "Supabase", "TypeScript", "FRED API"],
    liveUrl: "https://ridgecap.app",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/ridgecap-preview.png",
    status: "Building",
    featured: false,
    highlights: [
      "AI capital source matching across the CRE lender universe",
      "Geospatial market intelligence and deal underwriting engine",
      "Portfolio stress testing with live FRED macro data integration",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "FRED API", "PostgreSQL"],
    caseStudy: {
      problem:
        "CRE brokers manage deal pipelines across dozens of lenders, property types, and markets using spreadsheets and memory. There's no intelligence layer that matches deals to capital sources, stress-tests portfolios against macro scenarios, or gives brokers a unified view of their book.",
      approach:
        "Built a full CRE debt OS: AI capital source matching using property type, LTV, geography, and deal structure; an underwriting engine with DSCR/LTV analysis; geospatial intelligence via FRED CRE market data (15 free series, 7 tables); and a pipeline management layer. Designed around the broker workflow.",
      outcome:
        "In active development — CRE market data infrastructure shipped, AI matching and underwriting engine complete. Target pricing Scout→$1,200→$2,500→$5,000/mo. Paused pending NexusWatch traction milestone.",
    },
  },
  {
    title: "Quant Engine",
    slug: "quant-engine",
    type: "Systematic Trading Platform",
    description:
      "Institutional-grade systematic trading platform. Signal factory generating 10,000+ candidate signals, GPU-accelerated backtesting, Bayesian self-learning loop, and a 9-multiplier position sizing chain. Running live on Alpaca.",
    tags: ["Python", "PyTorch", "FastAPI", "Alpaca"],
    liveUrl: "",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/quant-engine-preview.png",
    status: "Live",
    featured: false,
    highlights: [
      "Signal factory: 10,000+ candidate signals with Benjamini-Hochberg multiple testing correction",
      "GPU-accelerated backtesting via PyTorch — 100,000 parallel simulations",
      "Bayesian feedback loop with Thompson Sampling meta-learner for dynamic strategy allocation",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "Alpaca", "LightGBM", "statsmodels"],
    caseStudy: {
      problem:
        "Institutional-grade systematic trading is locked behind hedge fund infrastructure — expensive, opaque, and inaccessible to solo operators. The edge is in signal quality, risk management, and self-learning, not in trading terminal access.",
      approach:
        "Built five pillars: a signal factory (10,000+ candidates, walk-forward validation, Benjamini-Hochberg filtering), GPU-accelerated backtesting (PyTorch, 100K parallel simulations), real-time streaming (WebSocket + Alpaca), a 9-multiplier position sizing chain (vol, regime, FOMC, GEX, correlation), and a Bayesian self-learning loop with Thompson Sampling. NexusWatch feeds geopolitical risk directly into the sizing model.",
      outcome:
        "Running live on Alpaca with a paper portfolio. 666 tests, 170+ modules, ~50K LOC. Path: 30-day Sharpe estimate → 6-month GO/NO-GO for real capital. NexusWatch API productization adds $500–2K/mo per subscriber as a parallel revenue stream.",
    },
  },
  {
    title: "Family Planner",
    slug: "family-planner",
    type: "AI-Powered Home App",
    description:
      "AI-powered family organization app built with Lovable. Recipe import from TikTok, YouTube, and blogs, drag-and-drop meal planning, and smart grocery lists — a live proof point that the gap between product thinking and product building is closing fast.",
    tags: ["Lovable", "Supabase", "Claude API", "TypeScript"],
    liveUrl: "https://family-planner-app-rosy.vercel.app",
    sourceUrl: "https://github.com/ethancstuart/family-planner-app",
    iframeSrc: "",
    image: "/portfolio/family-planner-preview.png",
    status: "Open Source",
    featured: false,
    highlights: [
      "Built with Lovable — AI-native development from idea to shipped in days",
      "AI recipe import from TikTok, YouTube, Instagram, and blogs",
      "Open source: MIT licensed, full-stack with auth and real-time sync",
    ],
    stack: ["Lovable", "Supabase", "Claude API", "TypeScript"],
    caseStudy: {
      problem:
        "My family needed a better way to save recipes from TikTok and YouTube and plan meals from them. But this was also an experiment: with AI-native tools, is it faster to build exactly what you need than to evaluate and compromise with existing apps?",
      approach:
        "Treated this as a real build-vs-buy decision. Built using Lovable for the app shell, Claude API for intelligent recipe extraction from any URL or photo, and Supabase for the backend. The goal was to test how fast a product leader with AI tools can go from idea to shipped product.",
      outcome:
        "Shipped a fully functional family platform in a fraction of the time traditional development would require. Open source under MIT — and a proof point that AI-native building changes the calculus on build-vs-buy decisions for product leaders.",
    },
  },
];

export const competencies = [
  {
    category: "Product Leadership",
    skills: [
      "Product Strategy & Roadmap",
      "Go-to-Market Execution",
      "0→1 Product Development",
      "Platform Management at Scale",
      "Executive Stakeholder Management",
      "OKRs & Metrics-Driven Decision Making",
    ],
  },
  {
    category: "Data & AI Platforms",
    skills: [
      "Enterprise Data Platform Modernization",
      "AI/ML Productization",
      "Customer Data Platforms",
      "Predictive Analytics & Segmentation",
      "Data Governance & Lineage",
      "Multi-Agentic AI Systems",
    ],
  },
  {
    category: "Technical Proficiency",
    skills: [
      "Snowflake",
      "Databricks",
      "Microsoft Fabric",
      "AWS",
      "Neo4j",
      "Power BI & Tableau",
      "SQL & Python",
    ],
  },
  {
    category: "Organizational Excellence",
    skills: [
      "Built & Scaled Product Orgs",
      "Agile & SAFe Methodologies",
      "Operational Process Optimization",
      "Matrixed Organization Management",
      "Product Operations Frameworks",
    ],
  },
] as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (the `type` field is new — verify portfolio/[slug] page doesn't error on missing field)

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: replace portfolio data with 6 projects (NexusWatch featured, remove DashPulse)"
```

---

### Task 4: Update Nav component — cream glass, availability dot, JetBrains Mono links

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Replace nav.tsx**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";

export function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 z-50 w-full"
      style={{
        height: "64px",
        background: "rgba(242,237,227,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-lo)",
      }}
    >
      <nav
        className="mx-auto flex h-full items-center justify-between"
        style={{ maxWidth: "1280px", padding: "0 56px" }}
      >
        <Link
          href="/"
          className="font-serif italic transition-opacity hover:opacity-70"
          style={{ fontSize: "19px", color: "var(--foreground)" }}
        >
          Ethan Stuart
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: pathname === link.href ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden items-center gap-2 md:flex transition-opacity hover:opacity-70"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--accent)",
                opacity: 0.6,
                animation: "pulse-dot 3s ease-in-out infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Open to conversation
          </span>
        </Link>

        {/* Mobile: just logo + contact dot */}
        <Link
          href="/contact"
          className="flex items-center gap-2 md:hidden"
          aria-label="Contact"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--accent)",
                opacity: 0.6,
                animation: "pulse-dot 3s ease-in-out infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </span>
        </Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: update nav with cream glass, availability dot, remove ThemeToggle"
```

---

### Task 5: Create Ticker component — marquee strip

**Files:**
- Create: `src/components/ticker.tsx`

- [ ] **Step 1: Create ticker.tsx**

```tsx
const TICKER_ITEMS = [
  "Data Platforms",
  "AI Systems",
  "Product Leadership",
  "NexusWatch",
  "Meridian Intelligence",
  "Zero to Ship",
  "Quant Engine",
  "RidgeCap",
  "Disney Studios Technology",
  "The Data Product Agent",
];

export function Ticker() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        height: "36px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="flex h-full items-center"
        style={{
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {TICKER_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--muted-foreground)",
                    padding: "0 32px",
                  }}
                >
                  {item}
                </span>
                {i < TICKER_ITEMS.length - 1 && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "9px",
                      color: "var(--accent)",
                      opacity: 0.4,
                    }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ticker.tsx
git commit -m "feat: add Ticker marquee component"
```

---

### Task 6: Rewrite Hero component — split layout, clipup anims, pillars, project manifest

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1: Replace hero.tsx entirely**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/constants";
import { Ticker } from "./ticker";

const PILLARS = [
  { num: "01", label: "Builder", detail: "Six AI products in production" },
  { num: "02", label: "Domain", detail: "Data & AI systems" },
  { num: "03", label: "Leadership", detail: "Product orgs at scale" },
];

const CREDENTIALS = [
  { label: "Currently", value: "Disney Studios Technology" },
  { label: "Previously", value: "Taco Bell · Capital Group" },
  { label: "Newsletter", value: "The Data Product Agent" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function statusColor(status: string) {
  if (status === "Live") return "var(--status-live)";
  if (status === "Building") return "var(--status-building)";
  return "var(--muted-foreground)";
}

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(90,128,0,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(90,128,0,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main grid */}
      <div
        className="relative mx-auto flex-1 w-full grid items-start"
        style={{
          maxWidth: "1280px",
          padding: "96px 56px 0",
          gridTemplateColumns: "1fr 360px",
          gap: "80px",
        }}
      >
        {/* Left accent rule */}
        <div
          className="absolute"
          style={{
            left: "56px",
            top: "96px",
            width: "2px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        {/* Left column */}
        <div className="flex flex-col gap-10 pl-6">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{
                  background: "var(--accent)",
                  opacity: 0.6,
                  animation: "pulse-dot 3s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "var(--muted-foreground)",
              }}
            >
              Active builder / Data &amp; AI Product Leader
            </span>
          </motion.div>

          {/* Headline — 3 lines with staggered clipup */}
          <div className="flex flex-col gap-0.5">
            <div className="overflow-hidden">
              <motion.div
                className="font-serif italic"
                style={{
                  fontSize: "clamp(36px, 4.2vw, 58px)",
                  lineHeight: 1.1,
                  color: "var(--text-mid)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                Building where
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="font-sans font-extrabold tracking-tight"
                style={{
                  fontSize: "clamp(58px, 8.5vw, 114px)",
                  lineHeight: 1.0,
                  color: "var(--foreground)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              >
                DATA &amp; AI
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="font-serif italic"
                style={{
                  fontSize: "clamp(36px, 4.2vw, 58px)",
                  lineHeight: 1.1,
                  color: "var(--accent)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
              >
                become products.
              </motion.div>
            </div>
          </div>

          {/* Subhead */}
          <motion.p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              maxWidth: "520px",
              color: "var(--muted-foreground)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          >
            I lead data and AI products at Fortune 50 scale — and ship them
            independently as a solo founder. Six AI products in production. The
            gap between managing data and building with it is closing fast. I
            work on both sides.
          </motion.p>

          {/* Pillars */}
          <motion.div
            className="grid grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.62 }}
          >
            {PILLARS.map((p) => (
              <PillarItem key={p.num} {...p} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.74 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg font-mono uppercase transition-opacity hover:opacity-80"
              style={{
                padding: "10px 20px",
                background: "var(--foreground)",
                color: "var(--background)",
                fontSize: "10px",
                letterSpacing: "0.12em",
              }}
            >
              View the work <span style={{ fontSize: "12px" }}>↗</span>
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-lg font-mono uppercase transition-colors"
              style={{
                padding: "10px 20px",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "10px",
                letterSpacing: "0.12em",
              }}
            >
              Read writing
            </Link>
            <a
              href="https://thedataproductagent.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono uppercase transition-opacity hover:opacity-70"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--accent)",
              }}
            >
              The Data Product Agent →
            </a>
          </motion.div>
        </div>

        {/* Right column — project manifest */}
        <motion.div
          className="sticky"
          style={{ top: "96px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              Selected work
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--accent)", opacity: 0.6 }}
            >
              06
            </span>
          </div>

          <div className="flex flex-col">
            {portfolioProjects.map((project, i) => (
              <ManifestRow
                key={project.slug}
                project={project}
                index={i}
                statusColor={statusColor(project.status)}
              />
            ))}
          </div>

          {/* Credential stack */}
          <div
            className="mt-8 flex flex-col gap-2.5"
            style={{ paddingTop: "24px", borderTop: "1px solid var(--border)" }}
          >
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="flex items-baseline gap-3">
                <span
                  className="font-mono uppercase shrink-0"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--muted-foreground)",
                    width: "72px",
                  }}
                >
                  {c.label}
                </span>
                <span
                  className="font-sans font-semibold"
                  style={{ fontSize: "12px", color: "var(--text-mid)" }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="mt-16">
        <Ticker />
      </div>
    </section>
  );
}

function PillarItem({ num, label, detail }: { num: string; label: string; detail: string }) {
  return (
    <div
      className="group cursor-default transition-all duration-300"
      style={{
        borderLeft: "2px solid var(--border)",
        padding: "12px 0 12px 16px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--border)";
      }}
    >
      <div
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.15em", color: "var(--accent)", opacity: 0.6, marginBottom: "4px" }}
      >
        {num}
      </div>
      <div
        className="font-sans font-bold"
        style={{ fontSize: "13px", color: "var(--foreground)", marginBottom: "2px" }}
      >
        {label}
      </div>
      <div
        className="font-mono"
        style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
      >
        {detail}
      </div>
    </div>
  );
}

function ManifestRow({
  project,
  index,
  statusColor,
}: {
  project: { title: string; slug: string; type: string };
  index: number;
  statusColor: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex items-center gap-4 rounded-lg transition-colors duration-200"
      style={{ padding: "14px 12px", margin: "0 -12px" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--accent-soft)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span
        className="font-mono shrink-0"
        style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-low)", width: "20px" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="font-sans font-bold truncate"
          style={{ fontSize: "13px", color: "var(--foreground)" }}
        >
          {project.title}
        </div>
        <div
          className="font-mono truncate"
          style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
        >
          {project.type}
        </div>
      </div>
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: statusColor }}
      />
      <span
        className="font-mono opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ fontSize: "10px", color: "var(--accent)" }}
      >
        ↗
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat: rewrite Hero as split layout with clipup animations, project manifest, ticker"
```

---

### Task 7: Update home page (page.tsx) — lightweight below-fold sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { getSubstackPosts } from "@/lib/substack";
import { getWebSiteJsonLd } from "@/lib/jsonld";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getSubstackPosts(3);

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <Hero />

      {/* About preview */}
      <section
        className="mx-auto w-full"
        style={{
          maxWidth: "1280px",
          padding: "100px 56px 120px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
          >
            About
          </span>
        </div>
        <p
          className="font-serif italic"
          style={{
            fontSize: "clamp(22px, 3vw, 36px)",
            lineHeight: 1.3,
            maxWidth: "680px",
            color: "var(--foreground)",
            marginBottom: "28px",
          }}
        >
          The gap between managing data and actually building with it is closing
          fast. I&apos;ve spent my career working on both sides of that wall.
        </p>
        <Link
          href="/about"
          className="font-mono uppercase transition-opacity hover:opacity-70"
          style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
        >
          Read more →
        </Link>
      </section>

      {/* Writing preview */}
      {posts.length > 0 && (
        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
            padding: "100px 56px 120px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
              <span
                className="font-mono uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
              >
                Latest Writing
              </span>
            </div>
            <Link
              href="/writing"
              className="font-mono uppercase transition-opacity hover:opacity-70"
              style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.link} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      <SubscribeCTA />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: simplify home page to Hero + about preview + writing preview"
```

---

### Task 8: Create FeaturedProjectCard component — NexusWatch 2-col card

**Files:**
- Create: `src/components/featured-project-card.tsx`

- [ ] **Step 1: Create featured-project-card.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/constants";

interface FeaturedProjectCardProps {
  project: PortfolioProject;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block rounded-2xl transition-all duration-300"
        style={{
          border: "1px solid var(--border)",
          background: "var(--card)",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--accent)";
          el.style.boxShadow = "0 8px 32px rgba(90,128,0,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 380px" }}
        >
          {/* Left: content */}
          <div style={{ padding: "48px" }}>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full font-mono uppercase"
                style={{
                  padding: "4px 12px",
                  background: "var(--accent-soft)",
                  border: "1px solid var(--accent-mid)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)", animation: "pulse-dot 3s ease-in-out infinite" }}
                />
                Live
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
              >
                01 / 06
              </span>
            </div>

            <div
              className="font-sans font-extrabold tracking-tight"
              style={{ fontSize: "38px", lineHeight: 1.1, color: "var(--foreground)", marginBottom: "8px" }}
            >
              {project.title}
            </div>
            <div
              className="font-mono uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
            >
              {project.type}
            </div>

            <p
              className="font-sans"
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--muted-foreground)",
                maxWidth: "480px",
                marginBottom: "24px",
              }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full font-mono"
                  style={{
                    padding: "3px 10px",
                    background: "var(--deep)",
                    border: "1px solid var(--border)",
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg font-mono uppercase"
                  style={{
                    padding: "8px 16px",
                    background: "var(--foreground)",
                    color: "var(--background)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                  }}
                >
                  View live ↗
                </span>
              )}
              <span
                className="font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--accent)" }}
              >
                Case study →
              </span>
            </div>
          </div>

          {/* Right: screenshot */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              background: "var(--deep)",
              borderLeft: "1px solid var(--border)",
              minHeight: "420px",
            }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="380px"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
                >
                  Screenshot pending
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/featured-project-card.tsx
git commit -m "feat: add FeaturedProjectCard component for NexusWatch"
```

---

### Task 9: Rewrite PortfolioCard — mini screenshot header + editorial body

**Files:**
- Modify: `src/components/portfolio-card.tsx`

- [ ] **Step 1: Replace portfolio-card.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/constants";

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

function statusColor(status: string) {
  if (status === "Live") return "var(--status-live)";
  if (status === "Building") return "var(--status-building)";
  return "var(--muted-foreground)";
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block rounded-2xl overflow-hidden transition-all duration-300"
        style={{ border: "1px solid var(--border)", background: "var(--card)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-2px)";
          el.style.borderColor = "var(--accent)";
          el.style.boxShadow = "0 8px 24px rgba(90,128,0,0.07)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Mini screenshot header */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "80px", background: "var(--deep)", borderBottom: "1px solid var(--border)" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span
                className="font-mono uppercase"
                style={{ fontSize: "8px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-low)" }}
            >
              {String(index + 2).padStart(2, "0")} / 06
            </span>
            <span
              className="flex items-center gap-1 font-mono uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.12em", color: statusColor(project.status) }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: statusColor(project.status),
                  animation: project.status === "Live" ? "pulse-dot 3s ease-in-out infinite" : undefined,
                }}
              />
              {project.status}
            </span>
          </div>

          <div
            className="font-sans font-bold mb-1"
            style={{ fontSize: "18px", color: "var(--foreground)", lineHeight: 1.2 }}
          >
            {project.title}
          </div>
          <div
            className="font-mono uppercase mb-3"
            style={{ fontSize: "9px", letterSpacing: "0.13em", color: "var(--muted-foreground)" }}
          >
            {project.type}
          </div>

          <p
            className="font-sans mb-4"
            style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--muted-foreground)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded font-mono uppercase"
                style={{
                  padding: "2px 8px",
                  background: "var(--deep)",
                  border: "1px solid var(--border)",
                  fontSize: "8px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            className="font-mono uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--accent)" }}
          >
            View case study →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio-card.tsx
git commit -m "feat: rewrite PortfolioCard with mini screenshot header and editorial body"
```

---

### Task 10: Rewrite Portfolio page — FeaturedProjectCard + 2-col editorial grid

**Files:**
- Modify: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Replace portfolio/page.tsx**

```tsx
import type { Metadata } from "next";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { PortfolioCard } from "@/components/portfolio-card";
import { portfolioProjects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Six AI products in production — geopolitical intelligence, lending OS, trading systems, and more.",
};

export default function PortfolioPage() {
  const featured = portfolioProjects.find((p) => p.featured);
  const rest = portfolioProjects.filter((p) => !p.featured);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 56px 120px" }}>
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
            <span
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
            >
              Selected Work
            </span>
          </div>
          <h1
            className="font-sans font-extrabold tracking-tight"
            style={{ fontSize: "36px", color: "var(--foreground)", lineHeight: 1.1 }}
          >
            Six products.{" "}
            <span className="font-serif italic font-normal" style={{ color: "var(--muted-foreground)" }}>
              All live in 2025.
            </span>
          </h1>
        </div>
        <a
          href="https://github.com/ethancstuart"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden font-mono uppercase transition-opacity hover:opacity-70 md:inline-flex items-center gap-1"
          style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
        >
          GitHub ↗
        </a>
      </div>

      {/* Featured card */}
      {featured && (
        <div className="mb-8">
          <FeaturedProjectCard project={featured} />
        </div>
      )}

      {/* 2-column editorial grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((project, i) => (
          <PortfolioCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: rewrite portfolio page with featured NexusWatch card and editorial grid"
```

---

### Task 11: Rewrite About page — manifesto, narrative+aside, career arc, philosophy strip

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Replace about/page.tsx**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { getPersonJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Builder first. Data & AI domain expert. Product leader at scale. The gap between managing data and building with it is closing fast — I work on both sides.",
};

const CAREER = [
  {
    years: "2018 – 2020",
    company: "Capital Group",
    role: "Data Product Manager",
    detail: "0→1 enterprise platform",
    current: false,
  },
  {
    years: "2020 – 2022",
    company: "Sprout Mortgage",
    role: "BI & Analytics Lead",
    detail: "Built from scratch",
    current: false,
  },
  {
    years: "2022 – 2023",
    company: "Taco Bell",
    role: "Manager, BI",
    detail: "CDP · ML Models · Yum! brands",
    current: false,
  },
  {
    years: "2023 – Present",
    company: "Disney",
    role: "Product Lead, Data & AI",
    detail: "Studio-wide platform",
    current: true,
  },
];

const PHILOSOPHY = [
  {
    num: "01",
    statement: "Build to understand, not just to ship.",
    sub: "The fastest way to form a real opinion on a data product is to build one. I keep building because it makes me a better leader.",
  },
  {
    num: "02",
    statement: "Clarity is the product.",
    sub: "Most data work fails at adoption, not implementation. I obsess over the last mile — getting people to actually use what we build.",
  },
  {
    num: "03",
    statement: "The org is part of the system.",
    sub: "You can't ship a great data platform without standing up the team and operating model around it. I build both.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getPersonJsonLd()} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 56px 120px" }}>

        {/* Section label */}
        <div className="flex items-center gap-3" style={{ marginBottom: "72px" }}>
          <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
          >
            About
          </span>
        </div>

        {/* Manifesto opener */}
        <div style={{ marginBottom: "88px" }}>
          <blockquote
            className="font-serif italic relative"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              lineHeight: 1.25,
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              maxWidth: "820px",
              marginBottom: "20px",
            }}
          >
            <span
              aria-hidden
              className="font-serif italic absolute"
              style={{
                fontSize: "1.3em",
                color: "var(--accent)",
                opacity: 0.35,
                left: "-0.45em",
                top: "-0.1em",
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            The gap between managing data and actually building with it is
            closing fast. I&apos;ve spent my career working on both sides of
            that wall — and I think that&apos;s the only place worth being right
            now.
          </blockquote>
          <p
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
          >
            Ethan Stuart — Data &amp; AI Product Leader
          </p>
        </div>

        {/* Narrative + aside */}
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 300px", gap: "80px", marginBottom: "88px" }}
        >
          {/* Left: narrative */}
          <div>
            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)", marginBottom: "24px" }}
            >
              I&apos;m a <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>product leader and builder</strong> operating at the intersection
              of data, AI, and the organizations that need them. At{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>Disney Studios Technology</strong>, I
              lead product for the studio&apos;s data and AI platform — translating
              executive strategy into systems that hundreds of stakeholders
              actually use and adopt.
            </p>

            <blockquote
              style={{
                borderLeft: "2px solid var(--accent)",
                padding: "4px 0 4px 24px",
                margin: "36px 0",
              }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.5,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                  maxWidth: "500px",
                }}
              >
                &ldquo;I don&apos;t just manage the roadmap. I understand the stack,
                write the specs, and ship the products. That&apos;s becoming rarer
                at this level — and it matters.&rdquo;
              </p>
            </blockquote>

            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)", marginBottom: "24px" }}
            >
              Before Disney, I drove{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>CDP adoption across all Yum! brands</strong>{" "}
              at Taco Bell and shipped ML models that directly impacted loyalty
              and retention. At{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>Capital Group</strong>, I launched a 0→1 data
              platform that achieved full Fortune 50 enterprise adoption. Earlier,
              I built analytics functions from scratch at growth-stage companies
              — which is where I learned that the best way to understand a data
              product is to build one yourself.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)" }}
            >
              That instinct drives the builder side of my work. In 2025 I&apos;ve
              shipped <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>six AI products</strong> independently —
              NexusWatch, Meridian, Quant Engine, Zero to Ship, RidgeCap, and
              Family Planner — each pushing into a different corner of what&apos;s
              possible when a product leader actually holds the tools. I write
              about this tension at{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>The Data Product Agent</strong>.
            </p>
          </div>

          {/* Right: aside */}
          <div className="flex flex-col gap-3" style={{ position: "sticky", top: "100px" }}>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: "3/4",
                background: "var(--deep)",
                border: "1px solid var(--border)",
                marginBottom: "4px",
              }}
            >
              <Image
                src="/headshot.jpg"
                alt="Ethan Stuart"
                fill
                className="object-cover object-top"
                priority
                sizes="300px"
              />
            </div>
            {[
              { label: "Currently", value: "Disney Studios Technology" },
              { label: "Domain", value: "Data & AI Platforms" },
              { label: "Education", value: "BBA Finance & Economics — LMU" },
              { label: "Newsletter", value: "The Data Product Agent" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl"
                style={{
                  padding: "14px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-lo)",
                }}
              >
                <p
                  className="font-mono uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)", marginBottom: "5px" }}
                >
                  {fact.label}
                </p>
                <p
                  className="font-sans font-bold"
                  style={{ fontSize: "13px", color: "var(--text-low)", letterSpacing: "-0.01em" }}
                >
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Career arc */}
        <div style={{ paddingTop: "64px", borderTop: "1px solid var(--border)", marginBottom: "88px" }}>
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: "40px" }}
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
            >
              Career Arc
            </span>
            <span
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, var(--border), transparent)",
              }}
            />
          </div>

          <div
            className="grid relative"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}
          >
            {/* Connecting line */}
            <div
              className="absolute"
              style={{
                top: "18px",
                left: "18px",
                right: "18px",
                height: "1px",
                background: "linear-gradient(90deg, var(--border), var(--accent), var(--border))",
                opacity: 0.4,
              }}
            />
            {CAREER.map((stop) => (
              <div key={stop.company} className="relative">
                <div
                  className="rounded-full"
                  style={{
                    width: "9px",
                    height: "9px",
                    background: stop.current ? "var(--accent)" : "var(--background)",
                    border: `1.5px solid ${stop.current ? "var(--accent)" : "var(--border)"}`,
                    boxShadow: stop.current ? "0 0 8px rgba(90,128,0,0.35)" : "none",
                    marginBottom: "16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <p
                  className="font-mono"
                  style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)", marginBottom: "5px" }}
                >
                  {stop.years}
                </p>
                <p
                  className="font-sans font-bold"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "-0.01em",
                    marginBottom: "3px",
                    color: stop.current ? "var(--foreground)" : "var(--text-low)",
                  }}
                >
                  {stop.company}
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.03em", lineHeight: 1.5 }}
                >
                  {stop.role}
                  <br />
                  {stop.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy strip */}
        <div
          className="rounded-2xl"
          style={{
            padding: "48px 56px",
            background: "var(--surface)",
            border: "1px solid var(--border-lo)",
          }}
        >
          <div className="flex items-baseline justify-between" style={{ marginBottom: "32px" }}>
            <span
              className="font-sans font-bold uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-low)" }}
            >
              How I Work
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "9px", color: "var(--accent)", opacity: 0.5 }}
            >
              03
            </span>
          </div>
          <div className="grid grid-cols-3" style={{ gap: "32px" }}>
            {PHILOSOPHY.map((item) => (
              <div key={item.num}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    color: "var(--accent)",
                    opacity: 0.5,
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  {item.num}
                </p>
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.45,
                    color: "var(--foreground)",
                    letterSpacing: "-0.01em",
                    marginBottom: "8px",
                  }}
                >
                  {item.statement}
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: "9.5px", color: "var(--muted-foreground)", lineHeight: 1.65, letterSpacing: "0.01em" }}
                >
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: rewrite About page with manifesto, narrative+aside, career arc, philosophy strip"
```

---

### Task 12: Update Footer — 2-row cream layout

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Replace footer.tsx**

```tsx
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", padding: "40px 56px" }}
      >
        {/* Row 1: logo + nav + social */}
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <Link
            href="/"
            className="font-serif italic transition-opacity hover:opacity-70"
            style={{ fontSize: "18px", color: "var(--foreground)" }}
          >
            Ethan Stuart
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono uppercase transition-opacity hover:opacity-70"
                style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {[
              { href: siteConfig.links.github, label: "GitHub" },
              { href: siteConfig.links.twitter, label: "X" },
              { href: siteConfig.links.linkedin, label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase transition-opacity hover:opacity-70"
                style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

        {/* Row 2: copyright */}
        <div className="flex items-center justify-between">
          <p
            className="font-mono"
            style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
          >
            &copy; {new Date().getFullYear()} Ethan Stuart
          </p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase transition-opacity hover:opacity-70"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--accent)" }}
            >
              The Data Product Agent →
            </a>
            <p
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
            >
              Built with Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: update Footer with cream 2-row layout"
```

---

### Task 13: Remove ThemeToggle component + clean up imports

**Files:**
- Delete: `src/components/theme-toggle.tsx`
- Verify nav.tsx no longer references ThemeToggle (done in Task 4)
- Verify layout.tsx no longer references ThemeProvider (done in Task 2)

- [ ] **Step 1: Delete theme-toggle.tsx**

```bash
rm /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/components/theme-toggle.tsx
```

- [ ] **Step 2: Verify no remaining imports of theme-toggle or ThemeToggle**

```bash
grep -r "theme-toggle\|ThemeToggle\|ThemeProvider\|next-themes" /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/
```

Expected: No results

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove ThemeToggle component (cream is single theme)"
```

---

### Task 14: Update Section component — wider max-width to match new design system

**Files:**
- Modify: `src/components/section.tsx`

- [ ] **Step 1: Update section.tsx max-width**

The `Section` component uses `max-w-5xl` (80rem = 1280px is correct but `max-w-5xl` is 64rem/1024px in Tailwind). Update to match the 1280px grid used everywhere else.

```tsx
"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-auto w-full ${className}`}
      style={{ maxWidth: "1280px", paddingLeft: "56px", paddingRight: "56px" }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/section.tsx
git commit -m "feat: update Section to 1280px max-width matching new design grid"
```

---

### Task 15: Final build verification

**Files:** No changes — verification only

- [ ] **Step 1: Run full TypeScript check**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit
```

Expected: Zero errors

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes successfully. Check output for any missing image warnings (expected for new projects without screenshots yet).

- [ ] **Step 3: Start dev server and verify key pages render**

```bash
npm run dev
```

Open and verify:
- `http://localhost:3000` — Hero split layout, cream background, ticker visible
- `http://localhost:3000/about` — Manifesto, narrative+aside, career arc, philosophy strip
- `http://localhost:3000/portfolio` — NexusWatch featured card + 5-card grid
- `http://localhost:3000/writing` — Posts render with new design tokens (cream bg, Syne font)

- [ ] **Step 4: Screenshot placeholders**

For projects without screenshots in `public/portfolio/`, the card shows a fallback. Take screenshots and place at:
- `public/portfolio/nexuswatch-preview.png`
- `public/portfolio/meridian-preview.png`
- `public/portfolio/ridgecap-preview.png`
- `public/portfolio/quant-engine-preview.png`
- `public/portfolio/zerotoship-preview.png` (update existing)
- `public/portfolio/family-planner-preview.png` (existing, may keep)

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "feat: complete personal brand redesign — cream palette, new typography, 6 portfolio projects"
git push
```

---

## Self-Review

**Spec coverage check:**
- ✅ Cream palette tokens (#f2ede3, #5a8000 accent) — Task 1
- ✅ Instrument Serif + Syne 800 + JetBrains Mono — Task 2
- ✅ Remove DashPulse, add NexusWatch/Meridian/RidgeCap/Quant Engine — Task 3
- ✅ Nav: cream glass, availability dot, no ThemeToggle — Task 4
- ✅ Ticker: marquee 28s — Task 5
- ✅ Hero: split layout, clipup anims, pillars bar, project manifest — Task 6
- ✅ Home page: Hero + about preview + writing preview — Task 7
- ✅ FeaturedProjectCard: NexusWatch 2-col — Task 8
- ✅ PortfolioCard: mini screenshot + editorial body — Task 9
- ✅ Portfolio page: featured + 2-col grid — Task 10
- ✅ About: manifesto + narrative+aside + career arc + philosophy — Task 11
- ✅ Footer: 2-row cream — Task 12
- ✅ Remove ThemeToggle — Task 13
- ✅ Section max-width aligned — Task 14

**Gaps:**
- Writing page: no explicit update needed — cream tokens apply automatically from globals.css. Section component update (Task 14) applies the correct max-width.
- `PortfolioCard` index prop in Task 9 uses `index + 2` for the card number display (01 is NexusWatch featured). This is a hardcoded offset — acceptable since order is fixed.
- NexusWatch `liveUrl` is set to `https://nexuswatch.io` — verify this is correct before pushing.

**Type consistency check:**
- `PortfolioProject.type` added in Task 3, used in Tasks 6, 8, 9 — consistent
- `PortfolioProject.status` typed as `"Live" | "Building" | "Open Source"` — used in Tasks 6, 9 — consistent
- `statusColor()` helper defined independently in Hero (Task 6) and PortfolioCard (Task 9) — acceptable duplication for component isolation
