import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { portfolioProjects } from "@/lib/constants";
import { getSoftwareApplicationJsonLd } from "@/lib/jsonld";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project || !project.caseStudy) notFound();

  return (
    <>
      <JsonLd data={getSoftwareApplicationJsonLd(project)} />
      {/* Back link */}
      <Section className="pt-24 pb-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Portfolio
        </Link>
      </Section>

      {/* Header */}
      <Section className="pb-8">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Case Study
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {project.description}
        </p>
      </Section>

      {/* Tech Stack */}
      {project.stack && (
        <Section className="pb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-muted px-4 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Case Study Sections */}
      <Section className="pb-12">
        <div className="space-y-10">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Problem
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.problem}
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Approach
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.approach}
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Outcome
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.outcome}
            </p>
          </div>
        </div>
      </Section>

      {/* Key Highlights */}
      {project.highlights && (
        <Section className="pb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
            Key Highlights
          </h2>
          <ul className="space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Live Preview */}
      {project.iframeSrc && (
        <Section className="pb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
            Live Preview
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src={project.iframeSrc}
              title={`${project.title} preview`}
              className="h-full w-full"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </Section>
      )}

      {/* CTA Buttons */}
      <Section className="pb-24">
        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View Live
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View Source
            <Github className="h-3.5 w-3.5" />
          </a>
        </div>
      </Section>
    </>
  );
}
