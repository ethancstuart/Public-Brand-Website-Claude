export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. AI products across geopolitical intelligence, multi-agent editorial infrastructure, spec-as-code tooling, AI education, applied modeling research, lending intelligence, and CRE data infrastructure.",
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

// Status meanings are literal — see CLAUDE.md:
//   live     = a stranger can use it today
//   invite   = real users, behind a gate
//   building = not in anyone's hands yet
//   paused   = work stopped, not abandoned
export type ProjectStatus = "live" | "invite" | "building" | "paused";
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
      "Real-time geopolitical intelligence across 86 countries. AI risk analyst, 45+ data layers, globe visualization. Threat monitoring built solo, with a daily email brief going out to real subscribers.",
    status: "live",
    category: "featured",
    color: "var(--color-nx)",
    href: "https://nexuswatch.dev",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    type: "Multi-Agent Editorial Framework",
    description:
      "Agentic newsroom built on a 10-persona editorial board, multi-step pipeline (notes → draft → review → publish). Masthead is the productized expansion.",
    status: "building",
    category: "featured",
    color: "var(--color-cm)",
  },
  {
    slug: "product-os",
    name: "Product OS",
    type: "Spec-as-code for PMs",
    description:
      "OSS CLI + commercial dashboard + GitHub App that turn structured product specs into reviewable, version-controlled artifacts.",
    status: "building",
    category: "featured",
    color: "var(--color-po)",
  },
  {
    slug: "zero-to-ship",
    name: "Prototype Studio",
    type: "AI Prototyping Platform",
    description:
      "AI prototyping platform for PMs, analysts, and builders who want to ship — sessions, guides, and agent-system setup teaching the same method used to build the rest of this portfolio.",
    status: "live",
    category: "featured",
    color: "var(--color-zts)",
    href: "https://zerotoship.app",
  },
];

// Modeling Lab — research practice. No capital deployed, no wagers placed.
export const MODELING_LAB: Project[] = [
  {
    slug: "quant-engine",
    name: "Quant Engine",
    type: "Systematic Trading Research",
    description:
      "Systematic trading research platform — signal factory, streaming, GPU backtest, Bayesian state. Paper-traded on Alpaca with walk-forward evaluation. No real capital deployed.",
    status: "building",
    category: "lab",
    color: "var(--color-ml)",
  },
  {
    slug: "sports-ml",
    name: "Sports ML Pipeline",
    type: "Models for Sports Markets",
    description:
      "20+ models across 4 sports. Candidates are promoted only after walk-forward evaluation on out-of-sample data. Research only — nothing staked.",
    status: "building",
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
      "Lending intelligence platform — white-label-ready operator-layer SaaS for non-QM mortgage shops.",
    status: "paused",
    category: "re-stack",
    color: "var(--color-re)",
  },
  {
    slug: "ridgecap",
    name: "RidgeCap",
    type: "CRE Data Infrastructure",
    description:
      "CRE data infrastructure — 7-table FRED schema, 15 free CRE series, parallel build. Currently in product-frozen due-diligence mode.",
    status: "paused",
    category: "re-stack",
    color: "var(--color-re)",
  },
];

// Aggregate for callers that want everything
export const ALL_PROJECTS: Project[] = [...FEATURED, ...MODELING_LAB, ...RE_STACK];
