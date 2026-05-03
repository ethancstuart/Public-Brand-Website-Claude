import { Section } from "@/components/section";
import { FeaturedRows } from "@/components/featured-row";
import { LabStrip } from "@/components/lab-strip";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";

export const metadata = {
  title: "Portfolio — Ethan Stuart",
  description:
    "Six products live in 2026 — geopolitical intelligence, multi-agent editorial infrastructure, lending intelligence, AI education, systematic trading, spec-as-code tooling.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section
        label="SELECTED WORK"
        title="Six products. All live in 2026."
        description="Phase 1: row preview. Phase 2 will replace this view with a full art-directed magazine spread per featured project."
      >
        <FeaturedRows projects={FEATURED} />
      </Section>

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
