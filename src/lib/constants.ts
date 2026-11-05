export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Product Leadership & Building",
  description:
    "Product strategy, strong teams, and useful software. I lead a product portfolio at Disney and build products of my own, including Allison’s Kitchen.",
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
  /**
   * GitHub repo name under the site owner. The register stamps each row with
   * the repo's last push date at build time, so "in development" carries a
   * date a reader can weigh. Omit it and the row simply has no stamp.
   */
  repo?: string;
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
    kind: "Household cooking and sharing",
    description:
      "A kitchen you can share: collect recipes, plan the week, and get groceries together. I’m building Allison’s Kitchen into a business, starting with what makes everyday meals easier.",
    status: "invite",
    formerly: "Stuart Pantry",
    note: "released on iOS · inviting selected households",
    href: "https://allisonskitchen.app",
    repo: "stuart-pantry",
  },
  {
    slug: "nexuswatch",
    name: "NexusWatch",
    kind: "Accountable forecasts",
    description:
      "A public forecasting ledger that records predictions and assesses them against external evidence, with visible corrections when an assessment changes.",
    status: "live",
    note: "public ledger · evidence and assessment remain an ongoing focus",
    href: "https://nexuswatch.dev",
    repo: "nexus-watch",
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
    repo: "caravan",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    kind: "AI-assisted product work",
    description:
      "Exploring how an AI-assisted product organization can structure its work.",
    status: "building",
    repo: "the-composer",
    note: "in development",
  },
  {
    slug: "product-os",
    name: "Product OS",
    kind: "Product context and decisions",
    description:
      "Keeping strategy, reasoning, and decisions connected as we build with AI. Developing through my own use, with other product teams in mind.",
    status: "building",
    repo: "product-md",
    note: "in use in my own work · still evolving before wider use",
  },
  {
    // Slug held at `zero-to-ship` deliberately: the route and its case study
    // predate the rename, and changing it would break both.
    slug: "zero-to-ship",
    name: "Prototype Studio",
    kind: "Prototyping and learning",
    description:
      "Earlier work on working sessions, guides, and agent-system setup. Public deployment currently paused.",
    status: "paused",
    formerly: "Zero to Ship",
    repo: "zero-to-shipped",
    note: "public deployment paused",
  },
];

/* ---------------------------------------------------------------------------
   Page content
   --------------------------------------------------------------------------- */

export const STRIP: { term: string; value: string; open?: boolean }[] = [
  { term: "Currently", value: "Disney Studios — Studio Technology and Operations" },
  { term: "Scope", value: "AI applications, agents & data platforms · enterprise-wide" },
  { term: "Open to", value: "Director / VP — AI Product", open: true },
  { term: "Writing", value: "The Data Product Agent" },
];

/**
 * The practice's pipeline, drawn above the method columns. It is a real
 * sequence — a spec becoming shipped software — which is why it is the one
 * place on the site that renders as one. Agent stages are marked; the rest
 * are a person or a machine.
 */
export const PIPELINE: { stage: string; body: string; agent?: boolean }[] = [
  { stage: "Spec", body: "Written in the repo, next to the code it governs." },
  { stage: "Principal PM", body: "Reviews scope, sequencing, and what is being left out.", agent: true },
  { stage: "Principal PMM", body: "Reviews the claim the product makes and who it is for.", agent: true },
  { stage: "Code", body: "Built with AI coding tools against the reviewed spec." },
  { stage: "Gates", body: "Typecheck, lint, tests, and a content smoke test." },
  { stage: "Ship", body: "Nothing is real until someone else uses it." },
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
    body: "Typechecks, linting, test suites and content smoke tests gate every deploy; cost guards and liveness checks watch the data collectors. The discipline that makes enterprise platforms trustworthy is the same discipline, just without an org to enforce it.",
  },
];

/**
 * Every figure carries its measurement method. The site's standing rule is no
 * bare numbers in copy; these are the exception precisely because none of them
 * is bare.
 */
export const RECORD: { fig: string; label: string; src: string }[] = [
  {
    fig: "~4 → ~1",
    label: "Months from spec to shipped",
    src: "Disney Studios · spec-to-ship duration, before and after the operating-model rollout",
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
    fig: "2",
    label: "Enterprise data platforms built 0 → 1, a third scaled",
    src: "Built in financial services and restaurants · scaled enterprise-wide in entertainment",
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
    role: "Sr. Manager, AI & Data Products",
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
    years: "2015 — 2021",
    org: "Pacific Urban Investors · Civic Financial · Partners Capital",
    role: "Investment analysis and BI leadership",
  },
];
