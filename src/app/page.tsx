import { Hero } from "@/components/hero";
import { LiveIndicators } from "@/components/live-indicators";
import { FeaturedRows } from "@/components/featured-row";
import { LabStrip } from "@/components/lab-strip";
import { Section } from "@/components/section";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-8 md:-mt-12 relative z-10">
        <LiveIndicators />
      </div>

      <Section
        label="FEATURED WORK"
        title="What I build."
        description="Four products at the core of the practice — each with its own case study, art direction, and signature motion. Click through for the full spread."
      >
        <FeaturedRows projects={FEATURED} />
      </Section>

      <LabStrip
        label="LAB · QUANT + ML PRACTICE"
        title="Modeling Lab."
        description="A working practice in models that pay rent. Production-grade systems, each shipped to live capital or live odds. Treat these as proof of method, not the headline product."
        accent="var(--color-ml)"
        vignettes={MODELING_LAB}
      />

      <LabStrip
        label="VENTURES · REAL ESTATE STACK"
        title="RE Stack."
        description="Real-estate-domain ventures — lending intelligence at the operator layer, and a CRE data infrastructure layer feeding both. Currently in product-frozen due-diligence mode."
        accent="var(--color-re)"
        vignettes={RE_STACK}
      />

      <Section
        label="FIELD NOTES"
        title="Writing."
      >
        <div className="flex justify-between items-baseline">
          <p className="text-[var(--color-paper-mid)] text-[15px] max-w-[640px] leading-relaxed">
            The Data Product Agent — long-form work on AI-native product
            building. Currently transitioning to The Composer.
          </p>
          <Link
            href="/writing"
            className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors border-b border-[var(--color-rule)] pb-0.5"
          >
            All posts →
          </Link>
        </div>
      </Section>
    </>
  );
}
