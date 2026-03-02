import type { Metadata } from "next";
import { Section } from "@/components/section";
import { competencies } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product executive building organizations and platforms that deliver at Fortune 50 scale.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          About
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Building the future of
          <br />
          <span className="text-muted-foreground">product & data.</span>
        </h1>
      </Section>

      {/* Bio */}
      <Section className="pb-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a product executive who builds organizations and platforms that
              deliver at Fortune 50 scale. I believe the most impactful technology
              leaders don&apos;t just ship products — they build the teams, systems,
              and cultures that make sustained innovation possible.
            </p>
            <p>
              Currently at{" "}
              <span className="text-foreground font-medium">
                Disney Studios Technology
              </span>
              , I lead enterprise data and AI platform strategy — managing 8+
              product pods, mentoring Product Managers, and partnering directly with
              the CTO to drive a $17M platform investment. In 5 months, I scaled
              platform adoption from 1 to 5 studio groups, growing from 15 to 120+
              stakeholders with 500+ downstream users.
            </p>
            <p>
              Before Disney, I drove 80% YoY loyalty growth at{" "}
              <span className="text-foreground font-medium">Taco Bell</span>{" "}
              through CDP platform adoption across all Yum brands, achieved 100%
              enterprise adoption for a 0→1 data platform at{" "}
              <span className="text-foreground font-medium">Capital Group</span>,
              and built analytics functions from scratch at growth-stage companies.
            </p>
            <p>
              I combine deep technical expertise — Snowflake, Databricks, Azure
              Fabric, ML/AI productization — with internal go-to-market execution,
              cross-functional leadership, and the ability to align complex matrixed
              organizations around data-driven product vision.
            </p>
            <p>
              I share insights on product strategy and AI leadership through my
              publication on Substack,{" "}
              <a
                href="https://thedataproductagent.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                The Data Product Agent
              </a>
              .
            </p>

            <div className="pt-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wider">
                Leadership Philosophy
              </h3>
              <p>
                The best product organizations are built on trust, transparency, and
                velocity. I lead by establishing clear operating models, investing in
                people, and creating the conditions where product teams can move fast
                with confidence. Data is not a service function — it&apos;s a
                strategic product that drives enterprise decisions.
              </p>
            </div>
          </div>

          {/* Photo placeholder + quick facts */}
          <div className="space-y-6">
            <div className="aspect-[3/4] rounded-2xl border border-border bg-muted flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground">
                Photo
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-mono text-xs text-muted-foreground">Role</p>
                <p className="font-medium">Sr. Manager, Data & AI Products</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">Company</p>
                <p className="font-medium">The Walt Disney Company</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">Education</p>
                <p className="font-medium">
                  B.B.A. Finance & Economics — LMU
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Newsletter
                </p>
                <p className="font-medium">The Data Product Agent</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Competencies */}
      <Section className="pb-24">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Expertise
        </p>
        <h2 className="mb-10 text-3xl font-bold tracking-tight">
          Core competencies
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {competencies.map((group) => (
            <div key={group.category} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
