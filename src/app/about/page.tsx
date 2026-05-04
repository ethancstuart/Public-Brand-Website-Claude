import Image from "next/image";
import { Section } from "@/components/section";

const CAREER = [
  { years: "2018 – 2020", org: "Capital Group",   role: "Analyst" },
  { years: "2020 – 2022", org: "Sprout",          role: "PM" },
  { years: "2022 – 2023", org: "Taco Bell",       role: "Senior Manager" },
  { years: "2023 – Now",  org: "Disney Studios",  role: "Senior Manager", current: true },
  { years: "Now →",       org: "Director / VP",   role: "AI Product Leadership", forward: true },
];

const PHILOSOPHY = [
  {
    n: "01",
    line: "Build to understand, not just to ship.",
    body: "Shipping is the forcing function. Understanding is the compounding asset.",
  },
  {
    n: "02",
    line: "Clarity is the product.",
    body: "Most product debt is decision debt. Make the decision, document it, move.",
  },
  {
    n: "03",
    line: "The org is part of the system.",
    body: "Technical decisions are organizational decisions in disguise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section label="ABOUT">
        <blockquote className="font-[family-name:var(--font-instrument)] italic text-[clamp(28px,3.6vw,48px)] leading-snug max-w-[820px] tracking-[-0.015em] relative">
          <span aria-hidden="true" className="absolute -left-7 -top-3 text-[var(--color-arctic)] text-[64px] leading-none">
            &ldquo;
          </span>
          The gap between managing data and actually building with it is closing fast.
          I&apos;ve spent my career working on both sides of that wall — and I think
          that&apos;s the only place worth being right now.
        </blockquote>
        <p className="font-[family-name:var(--font-instrument)] italic text-[clamp(18px,2vw,24px)] leading-snug text-[var(--color-paper-mid)] max-w-[720px] mt-8 border-l-2 border-[var(--color-indigo)] pl-5">
          Most product leaders manage. I run AI-native product teams <em className="not-italic font-[family-name:var(--font-syne)] font-bold tracking-tight text-[var(--color-paper)]">and</em> I ship real software. The combination is the point.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-6 text-[16px] leading-[1.8] text-[rgba(216,212,204,0.78)] max-w-[640px]">
            <p>
              Senior Manager at Disney Studios — running a 22+ person team building data
              and AI products at Fortune 50 scale, contributing to enterprise finance
              transformation work, and co-leading three enterprise AI task forces
              spanning product, program management, and data.
            </p>
            <p className="font-[family-name:var(--font-instrument)] italic text-[20px] border-l-2 border-[var(--color-arctic)] pl-5 text-[rgba(216,212,204,0.85)]">
              I joined Disney and within six months was recognized as a senior leader
              on the team. That&apos;s not a timeline I planned — it&apos;s how I work.
            </p>
            <p>
              In parallel: Stuart Ventures. Eight production-grade software products
              built solo. Geopolitical intelligence, multi-agent editorial infrastructure,
              spec-as-code tooling, AI education, systematic trading, lending intelligence,
              CRE data infrastructure. <em className="font-[family-name:var(--font-instrument)] not-italic [&]:italic">All shipping. All real.</em>
            </p>
            <p>
              AI is what makes the combination possible — I&apos;m not working twice
              as hard, I&apos;m working differently.
            </p>
          </div>

          <aside className="md:sticky md:top-24 self-start space-y-4 font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-paper-mid)]">
            <div
              className="relative aspect-square w-full overflow-hidden border-2 border-[var(--color-arctic)]"
              style={{ borderRadius: "2px" }}
            >
              <Image
                src="/headshot.jpg"
                alt="Ethan Stuart"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover"
                priority
              />
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Currently</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Senior Manager · Disney Studios — 22+ person team</div>
            </div>
            <div
              className="border-2 p-4 rounded-md"
              style={{ borderColor: "var(--color-indigo)" }}
            >
              <div className="text-[var(--color-paper-low)] mb-1" style={{ color: "var(--color-indigo)" }}>Open to</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Director / VP — AI Product Leadership</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Domain</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Data &amp; AI — enterprise + solo</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Newsletter</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">The Data Product Agent</div>
            </div>
          </aside>
        </div>
      </Section>

      <Section label="CAREER ARC" title="Where I've worked.">
        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
          {CAREER.map((c) => {
            const accent = c.forward ? "var(--color-indigo)" : c.current ? "var(--color-arctic)" : undefined;
            return (
              <li
                key={c.org}
                className="border-t pt-5"
                style={{
                  borderTopColor: c.forward ? "var(--color-indigo)" : "var(--color-rule)",
                  borderTopStyle: c.forward ? "dashed" : "solid",
                  borderTopWidth: "1px",
                }}
              >
                <div
                  className={`inline-flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase mb-2 ${
                    c.current || c.forward ? "" : "text-[var(--color-paper-low)]"
                  }`}
                  style={accent ? { color: accent } : undefined}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={
                      c.current
                        ? { background: "var(--color-arctic)", boxShadow: "0 0 8px var(--color-arctic)" }
                        : c.forward
                        ? { background: "transparent", border: "1px dashed var(--color-indigo)" }
                        : { background: "transparent", border: "1px solid var(--color-paper-low)" }
                    }
                  />
                  {c.years}
                </div>
                <div
                  className={`font-[family-name:var(--font-syne)] font-extrabold text-[20px] leading-tight ${
                    c.current
                      ? "text-[var(--color-paper)]"
                      : c.forward
                      ? ""
                      : "text-[rgba(216,212,204,0.6)]"
                  }`}
                  style={c.forward ? { color: "var(--color-paper)" } : undefined}
                >
                  {c.org}
                </div>
                <div className="text-[13px] text-[var(--color-paper-mid)] mt-1">{c.role}</div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section label="PHILOSOPHY" title="How I work.">
        <div className="bg-[var(--color-surface)] border border-[var(--color-rule)] rounded-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {PHILOSOPHY.map((p) => (
            <div key={p.n}>
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] text-[var(--color-paper-low)] mb-3">
                {p.n}
              </div>
              <div className="font-[family-name:var(--font-instrument)] italic text-[18px] leading-snug mb-3">
                {p.line}
              </div>
              <div className="font-[family-name:var(--font-dm-mono)] text-[11px] tracking-[0.04em] text-[var(--color-paper-mid)] leading-relaxed">
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
