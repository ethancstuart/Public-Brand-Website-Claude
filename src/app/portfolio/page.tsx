import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { LabStrip } from "@/components/lab-strip";
import { MagazineSpread } from "@/components/magazine-spread";
import { NexusWatchGlobe } from "@/components/case-study/nexuswatch-globe";
import { ComposerTypeweave } from "@/components/case-study/composer-typeweave";
import { ProductOSCodeScroll } from "@/components/case-study/product-os-codescroll";
import { ZTSTrajectory } from "@/components/case-study/zts-trajectory";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Portfolio — Ethan Stuart",
  description:
    "Six products live in 2026 — geopolitical intelligence, multi-agent editorial infrastructure, lending intelligence, AI education, systematic trading, spec-as-code tooling.",
};

const MOTION_FOR: Record<string, ReactNode> = {
  "nexuswatch":   <NexusWatchGlobe size={260} density={32} />,
  "the-composer": <ComposerTypeweave text="DRAFT · REVIEW · APPROVE" />,
  "product-os":   <ProductOSCodeScroll />,
  "zero-to-ship": <ZTSTrajectory />,
};

const SHORT_LEDE: Record<string, string> = {
  "nexuswatch":   "Real-time geopolitical intelligence with an AI risk analyst, 45+ data layers, and live country-by-country monitoring.",
  "the-composer": "Agentic editorial framework — 10-persona board, structured pipeline, productized via Masthead.",
  "product-os":   "Spec-as-code for PMs. OSS CLI + GitHub App + dashboard — Show HN target September 2026.",
  "zero-to-ship": "AI coding course platform. 16 modules, shipping-first, gamified.",
};

const SHORT_MANIFESTO: Record<string, string> = {
  "nexuswatch":   "Threat monitoring at platform scale — built solo.",
  "the-composer": "An operator's newsroom, run by personas.",
  "product-os":   "Specs that live in your repo, reviewed like code.",
  "zero-to-ship": "Teach the actual method — outcomes, not tutorials.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section
        label="SELECTED WORK"
        title="Six products. All live in 2026."
        description="Four featured products as full magazine spreads. Two thematic sections — Modeling Lab + RE Stack — for the rest of the portfolio."
      >
        <Link
          href="#nexuswatch"
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
        >
          Scroll to first featured ↓
        </Link>
      </Section>

      {FEATURED.map((p, i) => (
        <MagazineSpread
          key={p.slug}
          project={p}
          index={i}
          total={FEATURED.length}
          motionCanvas={MOTION_FOR[p.slug]}
          manifesto={SHORT_MANIFESTO[p.slug]}
          lede={SHORT_LEDE[p.slug]}
        />
      ))}

      <LabStrip
        label="LAB · QUANT + ML PRACTICE"
        title="Modeling Lab."
        description="Production-grade modeling work — quant + sports markets — that pays rent and proves method."
        accent="var(--color-ml)"
        vignettes={MODELING_LAB}
      />

      <LabStrip
        label="VENTURES · REAL ESTATE STACK"
        title="RE Stack."
        description="Real-estate-domain ventures: lending intelligence + CRE data infrastructure."
        accent="var(--color-re)"
        vignettes={RE_STACK}
      />
    </>
  );
}
