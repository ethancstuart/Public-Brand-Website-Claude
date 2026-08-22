import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Register, Legend } from "@/components/register";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Six products, built independently. Each carries a literal status: live, invite, or in development. Nothing here is aspirational.",
};

export default function PortfolioPage() {
  return (
    <div className="wrap">
      <div className="pb-[clamp(28px,4vw,44px)] pt-[clamp(44px,6vw,78px)]">
        <span className="eyebrow mb-5 block">Selected work</span>
        <h1 className="mb-5 max-w-[20ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.14] tracking-[-0.017em]">
          Six products. Each one has a status, and the status is literal.
        </h1>
        <p className="max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          All of it built outside the day job, using the same operating model
          that runs the org inside it.{" "}
          <strong className="font-medium text-ink">Live</strong> means a stranger
          can use it today.{" "}
          <strong className="font-medium text-ink">Invite</strong> means real
          users behind a gate.{" "}
          <strong className="font-medium text-ink">In Development</strong> means
          it is not yet in anyone&apos;s hands, and says so rather than implying
          otherwise.
        </p>
      </div>

      <Section aside="Status as of August 2026" title="The register">
        <Legend />
        <Register projects={PROJECTS} />
        <p className="mt-6 font-mono text-[10.5px] leading-[1.6] tracking-[0.04em] text-ink-faint">
          Names in the trail are prior names for the same product, not separate
          products. Select a name for the full case study.
        </p>
      </Section>
    </div>
  );
}
