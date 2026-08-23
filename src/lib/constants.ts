export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Data & AI Product Leadership",
  description:
    "I run an AI-native product organization at Disney, and the same operating model runs a one-person software practice. Every product is built independently and carries a literal status.",
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

/* ---------------------------------------------------------------------------
   Products
   --------------------------------------------------------------------------- */

/**
 * Status is literal, not aspirational. `live` means a stranger can use it
 * today; `invite` means real users behind a gate; `building` means it is not
 * yet in anyone's hands; `paused` means it exists but is not being worked on.
 */
export type ProjectStatus = "live" | "invite" | "building" | "paused";

export interface Project {
  slug: string;
  name: string;
  /** What kind of thing it is — sits under the name in the register. */
  kind: string;
  description: string;
  status: ProjectStatus;
  /** Prior names, so a rename reads as history rather than a separate product. */
  formerly?: string;
  /** Where it actually stands today, in the register's own words. */
  note?: string;
  href?: string;
}

export const STATUS: Record<
  ProjectStatus,
  { label: string; legend: string; varName: string }
> = {
  live: {
    label: "Live",
    legend: "Live — open to anyone",
    varName: "var(--live)",
  },
  invite: {
    label: "Invite",
    legend: "Invite — real users, gated",
    varName: "var(--invite)",
  },
  building: {
    label: "In Development",
    legend: "In development",
    varName: "var(--building)",
  },
  paused: {
    label: "Paused",
    legend: "Paused",
    varName: "var(--quiet)",
  },
};

export const PROJECTS: Project[] = [
  {
    slug: "allisons-kitchen",
    name: "Allison's Kitchen",
    kind: "Household Kitchen Software",
    description:
      "Built for one household first — mine. Capture a recipe from anywhere: a link, a photo, a video you paused. Plan the week once, then cook from a clean screen. Now opening to other families a few at a time, with the iOS build in UAT.",
    status: "invite",
    formerly: "Stuart Pantry",
    note: "web in invite · iOS in UAT",
    href: "https://allisonskitchen.app",
  },
  {
    slug: "nexuswatch",
    name: "NexusWatch",
    kind: "Geopolitical Intelligence",
    description:
      "Real-time threat monitoring — 45+ live data layers across 86 countries, spanning conflict, disasters, infrastructure, and environment, with an LLM risk analyst over a normalized event pipeline and an MCP server for agent access. A daily brief goes out to subscribers. Open source.",
    status: "live",
    note: "open to anyone · daily email brief with real subscribers",
    href: "https://nexuswatch.dev",
  },
  {
    slug: "altogether",
    name: "Altogether",
    kind: "Multi-Household Trip Planning",
    description:
      "One household is a calendar; three is the problem. Households submit availability and budget privately, and Otto — the AI co-planner — finds the windows that actually work and prices them per household.",
    status: "building",
    formerly: "Long Table, formerly Caravan",
    note: "waitlist open, not yet in users' hands",
    href: "https://longtable.dev",
  },
  {
    slug: "gridiron",
    name: "Gridiron",
    kind: "Forecasting & Evaluation",
    description:
      "A forecasting and calibration testbed scored against public closing lines. Feature engineering, a backtest harness, and calibration scoring — the question it exists to answer is whether a model's stated confidence holds up against the sternest public benchmark available.",
    status: "building",
    note: "not yet in anyone's hands",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    kind: "Multi-Agent Editorial Framework",
    description:
      "An agentic newsroom: a ten-persona editorial board gating an explicit state machine that carries a piece from notes through draft, review, and publish.",
    status: "building",
  },
  {
    slug: "product-os",
    name: "Product OS",
    kind: "Spec-as-code for PMs",
    description:
      "CLI, GitHub App, and dashboard that turn product specs into reviewable, version-controlled artifacts. Specs move through pull requests like the code they describe — the same discipline that runs the practice itself.",
    status: "building",
  },
  {
    // Slug held at `zero-to-ship` deliberately: the route and its case study
    // predate the rename, and changing it would break both.
    slug: "zero-to-ship",
    name: "Prototype Studio",
    kind: "AI Prototyping Platform",
    description:
      "Working sessions, guides, and agent-system setup for PMs, analysts, and BI engineers who want to ship with AI coding tools. Started as a structured course and became a services-and-setup practice instead — the pivot is the more honest story. Usable today; active development is on hold.",
    status: "live",
    formerly: "Zero to Ship",
    href: "https://zerotoship.app",
  },
];

/* ---------------------------------------------------------------------------
   Page content
   --------------------------------------------------------------------------- */

export const STRIP: { term: string; value: string; open?: boolean }[] = [
  { term: "Currently", value: "Disney Studios — Studio Technology and Operations" },
  { term: "Scope", value: "Data & AI product org · enterprise-wide" },
  { term: "Open to", value: "Director / VP — AI Product", open: true },
  { term: "Writing", value: "The Data Product Agent" },
];

export const METHOD: { n: string; title: string; body: string }[] = [
  {
    n: "Roles, not prompts",
    title: "The org chart is made of agents.",
    body: "A principal PM and a principal PMM review every spec before it becomes code. They hold standards, not context — which is why the output stays consistent across sessions that share no memory.",
  },
  {
    n: "Specs under version control",
    title: "Decisions are artifacts, not recollections.",
    body: "PRDs, decision logs, and conventions live in the repo with the code they govern, validated on commit. When a decision gets revisited, the reasoning is still there.",
  },
  {
    n: "Shipping as the forcing function",
    title: "Nothing is real until someone else uses it.",
    body: "Test coverage, error budgets, and row-level security on personal projects — because the discipline that makes enterprise platforms trustworthy is the same discipline, just without the org to enforce it.",
  },
];

/**
 * Every figure carries its measurement method. The site's standing rule is no
 * bare numbers in copy; these are the exception precisely because none of them
 * is bare.
 */
export const RECORD: { fig: string; label: string; src: string }[] = [
  {
    fig: "4 → 1",
    label: "Months from spec to shipped",
    src: "Disney Studios · before and after the AI-native operating model",
  },
  {
    fig: "100%",
    label: "Weekly active PM adoption of AI coding tools",
    src: "Telemetry-tracked, not self-reported",
  },
  {
    fig: "80%",
    label: "YoY loyalty growth on the Yum CDP",
    src: "Marketing-mix-model attributed",
  },
  {
    fig: "3",
    label: "Enterprise data platforms built 0 → 1",
    src: "Financial services · restaurants · entertainment",
  },
];

export const TRACK: {
  years: string;
  org: string;
  role: string;
  now?: boolean;
}[] = [
  {
    years: "2025 — now",
    org: "Disney Studios",
    role: "Sr. Manager, Data & AI Products and Analytics Engineering",
    now: true,
  },
  {
    years: "2023 — 2025",
    org: "Yum Brands · Taco Bell",
    role: "Staff PM, Enterprise CDP → Portfolio Manager, Data & Analytics Platform",
  },
  {
    years: "2022 — 2023",
    org: "Capital Group",
    role: "Product Manager, Data Platforms & Strategic Automation",
  },
  {
    years: "2021 — 2022",
    org: "Sprout Mortgage",
    role: "Manager, Analytics & Product Strategy",
  },
  {
    years: "2016 — 2021",
    org: "Pacific Urban Investors · Civic Financial",
    role: "Investment analysis and BI leadership",
  },
];
