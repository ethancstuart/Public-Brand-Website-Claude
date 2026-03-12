import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { competencies } from "@/lib/constants";
import { getPersonJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product executive building organizations and platforms that deliver at Fortune 50 scale.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getPersonJsonLd()} />
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
              I&apos;m an operational and strategy leader who builds clarity from
              ambiguity. I stand up teams, operating models, and platforms — then
              deliver value through them.
            </p>
            <p>
              At{" "}
              <span className="text-foreground font-medium">
                Disney Studios Technology
              </span>
              , I built a product organization from the ground up and lead
              enterprise data and AI platform strategy, partnering directly with
              the CTO on investment priorities. I set AI strategy for the
              studio&apos;s multi-agent systems, launched conversational AI
              tools, and am delivering ML forecasting models while leading a
              cross-company finance transformation.
            </p>
            <p>
              At{" "}
              <span className="text-foreground font-medium">Taco Bell</span>, I
              drove CDP adoption across all Yum brands and shipped ML models for
              retention and CRM insights. At{" "}
              <span className="text-foreground font-medium">Capital Group</span>
              , I launched a 0→1 data platform that achieved full enterprise
              adoption. Earlier in my career I built analytics functions from
              scratch at growth-stage companies.
            </p>
            <p>
              I also build my own products —{" "}
              <a
                href="https://dashpulse.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                DashPulse
              </a>{" "}
              is a real-time dashboard I shipped with vanilla TypeScript, and
              I&apos;m currently building an AI coding course for non-engineers.
              I write about AI strategy on{" "}
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
                with confidence. I operate as the translation layer between executive
                priorities and team capacity — shielding my team from reactive
                pressure while maintaining strategic alignment.
              </p>
            </div>
          </div>

          {/* Photo placeholder + quick facts */}
          <div className="space-y-6">
            <div className="aspect-[3/4] relative overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src="/headshot.jpg"
                alt="Ethan Stuart"
                fill
                className="object-cover object-top"
                priority
                sizes="320px"
              />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-mono text-xs text-muted-foreground">Role</p>
                <p className="font-medium">Sr. Manager, Data & AI Products & BI Engineering</p>
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
