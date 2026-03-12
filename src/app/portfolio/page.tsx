import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PortfolioCard } from "@/components/portfolio-card";
import { portfolioProjects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects I've built — not just managed. Live demos and source code.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Portfolio
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          I don&apos;t just manage products —<br />
          <span className="text-muted-foreground">I build them.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Side projects I&apos;ve shipped end-to-end. Full-stack, AI-powered,
          and deployed — not mockups or prototypes.
        </p>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {portfolioProjects.map((project, i) => (
            <PortfolioCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
