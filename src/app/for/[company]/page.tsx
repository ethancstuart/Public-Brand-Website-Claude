import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import {
  siteConfig,
  projects,
  portfolioProjects,
  targetRoles,
} from "@/lib/constants";
import { ArrowRight, Mail } from "lucide-react";

interface Props {
  params: Promise<{ company: string }>;
}

export async function generateStaticParams() {
  return targetRoles.map((role) => ({ company: role.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;
  const role = targetRoles.find((r) => r.slug === company);
  if (!role) return {};
  return {
    title: `${role.roleTitle} — ${role.company}`,
    description: role.pitch,
    robots: { index: false, follow: false },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { company } = await params;
  const role = targetRoles.find((r) => r.slug === company);
  if (!role) notFound();

  const relevantProjects = role.relevantProjectIndices
    .map((i) => projects[i])
    .filter(Boolean);

  return (
    <>
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          For {role.company}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {role.roleTitle}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {role.pitch}
        </p>
      </Section>

      {/* Relevant Work */}
      {relevantProjects.length > 0 && (
        <Section className="pb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-accent">
            Relevant Experience
          </h2>
          <div className="space-y-4">
            {relevantProjects.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <h3 className="mb-2 text-base font-semibold">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Portfolio */}
      <Section className="pb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-accent">
          What I Build
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolioProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30"
            >
              <h3 className="mb-1 text-base font-semibold group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Let&apos;s talk
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            I&apos;d love to discuss how my experience aligns with this role.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <Link
              href={`/resume?variant=${role.resumeVariant}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              View Resume
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
