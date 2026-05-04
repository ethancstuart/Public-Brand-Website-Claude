import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ALL_PROJECTS, FEATURED } from "@/lib/constants";
import { MagazineSpread } from "@/components/magazine-spread";
import { ScrollNarrative } from "@/components/case-study/scroll-narrative";
import { NexusWatchGlobe } from "@/components/case-study/nexuswatch-globe";
import { ComposerTypeweave } from "@/components/case-study/composer-typeweave";
import { ProductOSCodeScroll } from "@/components/case-study/product-os-codescroll";
import { ZTSTrajectory } from "@/components/case-study/zts-trajectory";

interface Params { slug: string; }

export async function generateStaticParams(): Promise<Params[]> {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Ethan Stuart`,
    description: project.description,
  };
}

interface Narrative {
  manifesto: ReactNode;
  lede: ReactNode;
  tags: string[];
  sections: { label: string; title: string; body: ReactNode }[];
}

function getNarrative(slug: string): Narrative {
  switch (slug) {
    case "nexuswatch":
      return {
        manifesto: "Real-time geopolitical intelligence — built solo, run continuously, sized to compete with platform vendors.",
        tags: ["86 Countries", "45+ Layers", "AI Risk Analyst", "Globe Visualization", "Built Solo"],
        lede: <>NexusWatch is a global threat-monitoring platform with an AI risk analyst, 45+ data layers across politics, conflict, climate, and economics, and a real-time globe visualization. Production-grade output from a one-person engineering org.</>,
        sections: [
          { label: "PROBLEM", title: "Geopolitical risk is fragmented across 86 country feeds.", body: <p>Enterprise customers paid six-figures to vendor platforms with stale data, opaque scoring, and zero AI-native analysis. The signal exists in public sources — what was missing was the orchestration.</p> },
          { label: "SYSTEM", title: "AI analyst on top of an event pipeline.", body: <p>Crisis cron pulls structured event data from 45+ sources, normalizes into a unified schema, scores each event on a country-confidence axis, and feeds an LLM analyst that produces narrative explanations on demand. The globe is the index; the analyst is the product.</p> },
          { label: "WHAT'S LIVE", title: "v2 API, Discord bot, trust layer, public globe.", body: <p>Public site at nexuswatch.io, v2 API in private beta, Discord bot for live alerts, verification trust layer surfacing source provenance, and a developing crisis-response forecasting module. 86 countries with continuous monitoring.</p> },
        ],
      };
    case "the-composer":
      return {
        manifesto: "An agentic editorial framework — the operator's newsroom, run by ten personas, built around context engineering as the scarce resource.",
        tags: ["Multi-Agent", "10 Personas", "Editorial Pipeline", "Masthead Expansion"],
        lede: <>The Composer is an agentic editorial framework: a 10-persona board reviews drafts, a multi-step pipeline takes notes through interview → draft → review → approve, and the operator stays on direction-setting work. Masthead is the productized expansion that turns this into a multi-tenant editorial OS.</>,
        sections: [
          { label: "PROBLEM", title: "Drafting in public is a quality risk.", body: <p>Newsletters that publish raw operator thinking have a quality ceiling — readers stop forwarding. Persona-based review preserves the voice while raising the floor.</p> },
          { label: "SYSTEM", title: "Notes → Structured → Interview → Draft → Editor → Reader → Approved.", body: <p>An explicit state machine. Each transition gates on a persona pass/fail. Two consecutive editor failures escalate to the operator. Rejected drafts return to interview, not to notes — preserving the operator&apos;s previous thinking work.</p> },
          { label: "BOARD", title: "Strategist, Architect, Editor, Journalist, Peer, Revenue Partner, PM Reader, Founder Reader, Chief of Staff, CDO.", body: <p>Each persona is an LLM agent with a system prompt anchored to a real editorial archetype. They evaluate the draft from a single, narrow lens — rigor of argument, narrative arc, voice authenticity, conversion mechanism, design judgment.</p> },
          { label: "MASTHEAD", title: "The product layer on top.", body: <p>Multi-tenant Turborepo build: Clerk auth, Neon Postgres + RLS, direct Anthropic SDK, Vercel AI SDK for streaming UI. Free tier ships council reviews; paid tier opens the pipeline editor + agent customization + analytics.</p> },
        ],
      };
    case "product-os":
      return {
        manifesto: "Spec-as-code for product teams — the way Terraform and Helm did it for infrastructure, applied to the messy work of writing, reviewing, and shipping product specs.",
        tags: ["OSS CLI", "Dashboard", "GitHub App", "2027 Show HN"],
        lede: <>Product OS treats product specs as version-controlled, reviewable artifacts that live in your repository. OSS CLI for spec authoring + linting; commercial dashboard for review + analytics; GitHub App that runs spec checks on PRs.</>,
        sections: [
          { label: "PROBLEM", title: "Specs decay the moment they leave the doc.", body: <p>Notion-and-Google-Docs specs are read once, then go stale as the product changes. Engineering specs live in code; product specs deserve the same treatment.</p> },
          { label: "SYSTEM", title: "CLI + GitHub App + Dashboard.", body: <p>Authors use the CLI to scaffold and lint specs. The GitHub App runs spec checks on PRs (do test cases match the requirements? are owners assigned?). The dashboard surfaces spec coverage and review velocity across teams.</p> },
          { label: "ROADMAP", title: "OSS first, commercial layer second.", body: <p>Show HN target: September 2026. Free OSS CLI builds adoption. Commercial dashboard + GitHub App enter when the OSS user base hits a meaningful threshold.</p> },
        ],
      };
    case "zero-to-ship":
      return {
        manifesto: "An AI coding course built around the actual method — gamified, shipping-first, modeled on the work that builds the rest of this portfolio.",
        tags: ["16 Modules", "Gamified", "AI-First", "Shipping-First"],
        lede: <>Zero to Ship is a 16-module course teaching the AI-native shipping method — exactly the method used to build NexusWatch, The Composer, Product OS, Meridian, and the rest. Outcomes-anchored, gamified progression, real shipping projects.</>,
        sections: [
          { label: "PROBLEM", title: "Tutorials don&apos;t teach shipping.", body: <p>Most AI coding content is &quot;build a chatbot in 30 minutes.&quot; That&apos;s not what shipping looks like. Shipping is shape-of-the-problem, scaffolding decisions, deploy choices, and what you cut to make a deadline.</p> },
          { label: "SYSTEM", title: "16 modules, shipping projects, AI-first throughout.", body: <p>Each module has a real outcome: a working artifact, deployed, with a real user (even if that&apos;s the student). AI is woven into every module — pair-programming, spec generation, code review — not isolated to a single &quot;now use AI&quot; lesson.</p> },
          { label: "WHO IT'S FOR", title: "Developers who want to ship more, not learn more.", body: <p>Targets working engineers and PM-engineers who already know how to code but feel slow shipping. Output: a portfolio of real artifacts at the end.</p> },
        ],
      };
    default:
      return { manifesto: "", lede: null, tags: [], sections: [] };
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const featuredIndex = FEATURED.findIndex((p) => p.slug === slug);
  const isFeatured = featuredIndex >= 0;

  if (!isFeatured) {
    return (
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-32">
        <div
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: project.color }}
        >
          {project.category.toUpperCase()} · {project.status.toUpperCase()}
        </div>
        <h1 className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(48px,7vw,128px)] tracking-[-0.05em] leading-[0.95]">
          {project.name}
        </h1>
        <p className="text-[16px] text-[var(--color-paper-mid)] leading-relaxed max-w-[640px] mt-6">
          {project.description}
        </p>
      </section>
    );
  }

  const motionFor: Record<string, ReactNode> = {
    "nexuswatch":   <NexusWatchGlobe size={320} density={42} />,
    "the-composer": <ComposerTypeweave text="DRAFT · REVIEW · APPROVE · PUBLISH" />,
    "product-os":   <ProductOSCodeScroll />,
    "zero-to-ship": <ZTSTrajectory />,
  };

  const narrative = getNarrative(project.slug);

  return (
    <>
      <MagazineSpread
        project={project}
        index={featuredIndex}
        total={FEATURED.length}
        motionCanvas={motionFor[project.slug]}
        manifesto={narrative.manifesto}
        lede={narrative.lede}
        tags={narrative.tags}
      />
      <ScrollNarrative sections={narrative.sections} accent={project.color} />
    </>
  );
}
