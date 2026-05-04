export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. AI products across intelligence, lending, trading, and learning.",
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

// New redesign-v2 types and exports
export type ProjectStatus = "live" | "beta" | "build" | "active";
export type ProjectCategory = "featured" | "lab" | "re-stack";

export interface Project {
  slug: string;
  name: string;
  type: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  color: string;
  href?: string;
}

// Featured 4 — full magazine spreads in Phase 2
export const FEATURED: Project[] = [
  {
    slug: "nexuswatch",
    name: "NexusWatch",
    type: "Geopolitical Intelligence",
    description:
      "Real-time geopolitical intelligence across 86 countries. AI risk analyst, 45+ data layers, globe visualization. Professional-grade threat monitoring built solo.",
    status: "live",
    category: "featured",
    color: "var(--color-nx)",
    href: "https://nexuswatch.io",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    type: "Multi-Agent Editorial Framework",
    description:
      "Agentic newsroom built on a 10-persona editorial board, multi-step pipeline (notes → draft → review → publish). Masthead is the productized expansion.",
    status: "beta",
    category: "featured",
    color: "var(--color-cm)",
  },
  {
    slug: "product-os",
    name: "Product OS",
    type: "Spec-as-code for PMs",
    description:
      "OSS CLI + commercial dashboard + GitHub App that turn structured product specs into reviewable, version-controlled artifacts.",
    status: "build",
    category: "featured",
    color: "var(--color-po)",
  },
  {
    slug: "zero-to-ship",
    name: "Zero to Ship",
    type: "AI Coding Course Platform",
    description:
      "16-module gamified course teaching the same shipping-first method used to build the rest of this portfolio.",
    status: "live",
    category: "featured",
    color: "var(--color-zts)",
    href: "https://zerotoship.dev",
  },
];

// Modeling Lab — practice / quant track
export const MODELING_LAB: Project[] = [
  {
    slug: "quant-engine",
    name: "Quant Engine",
    type: "Systematic Trading Platform",
    description:
      "World-class systematic trading platform — signal factory, streaming, GPU backtest, Bayesian state, paper-traded live on Alpaca.",
    status: "live",
    category: "lab",
    color: "var(--color-ml)",
  },
  {
    slug: "sports-ml",
    name: "Sports ML Pipeline",
    type: "Models for Sports Markets",
    description:
      "20+ models across 4 sports. Kelly-sized bets, model-promoted to production after backtest. From small bankroll to live wagering.",
    status: "active",
    category: "lab",
    color: "var(--color-ml)",
  },
];

// RE Stack — real-estate ventures
export const RE_STACK: Project[] = [
  {
    slug: "meridian",
    name: "Meridian Intelligence",
    type: "Non-QM Lending Intelligence",
    description:
      "Lending intelligence platform — 34 features, 433 tests, white-label-ready. Operator-layer SaaS for non-QM mortgage shops.",
    status: "active",
    category: "re-stack",
    color: "var(--color-re)",
  },
  {
    slug: "ridgecap",
    name: "RidgeCap",
    type: "CRE Data Infrastructure",
    description:
      "CRE data infrastructure — 7-table FRED schema, 15 free CRE series, parallel build. Currently in product-frozen due-diligence mode.",
    status: "build",
    category: "re-stack",
    color: "var(--color-re)",
  },
];

// Aggregate for callers that want everything
export const ALL_PROJECTS: Project[] = [...FEATURED, ...MODELING_LAB, ...RE_STACK];

