import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/constants";
import { Linkedin, Mail } from "lucide-react";
import { DownloadMenu } from "@/components/download-menu";
import { VariantSelector } from "@/components/variant-selector";
import { getResumeMarkdown, parseResumeMarkdown } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Ethan Stuart — Operational and strategy leader who builds clarity from ambiguity.",
};

interface Props {
  searchParams: Promise<{ variant?: string }>;
}

async function ResumeContent({ searchParams }: Props) {
  const { variant } = await searchParams;
  const md = await getResumeMarkdown(variant);
  const resume = parseResumeMarkdown(md);

  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {resume.name}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Operational and strategy leader who builds clarity from ambiguity. I
              stand up teams, operating models, and platforms — then deliver value
              through them.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <DownloadMenu variant={variant} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.links.email}
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Linkedin className="h-3.5 w-3.5" />
            linkedin.com/in/ethan-stuart
          </a>
        </div>

        <div className="mt-6">
          <VariantSelector />
        </div>
      </Section>

      {resume.sections.map((section) => (
        <Section key={section.title} className="py-12">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-accent">
            {section.title}
          </h2>
          <div className="space-y-10">
            {section.content.map((item, i) => {
              if (item.type === "company") {
                return (
                  <div key={i}>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </div>
                    <div className="space-y-6">
                      {item.roles.map((role) => (
                        <div
                          key={role.title}
                          className="border-l-2 border-border pl-6"
                        >
                          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <h4 className="text-sm font-semibold">
                              {role.title}
                            </h4>
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">
                              {role.period}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {role.bullets.map((bullet, j) => (
                              <li
                                key={j}
                                className="text-sm leading-relaxed text-muted-foreground"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (item.type === "competency") {
                return (
                  <div key={i} className="text-sm">
                    <span className="font-semibold">{item.category}: </span>
                    <span className="text-muted-foreground">{item.skills}</span>
                  </div>
                );
              }

              if (item.type === "item") {
                return (
                  <div key={i} className="text-sm">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — {item.description}
                    </span>
                  </div>
                );
              }

              if (item.type === "text") {
                return (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground italic"
                  >
                    {item.value}
                  </p>
                );
              }

              return null;
            })}
          </div>
        </Section>
      ))}
    </>
  );
}

export default function ResumePage(props: Props) {
  return (
    <Suspense
      fallback={
        <Section className="pt-24 pb-24">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-64 rounded bg-muted" />
            <div className="h-6 w-96 rounded bg-muted" />
          </div>
        </Section>
      }
    >
      <ResumeContent {...props} />
    </Suspense>
  );
}
