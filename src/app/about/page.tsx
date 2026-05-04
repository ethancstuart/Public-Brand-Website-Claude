import { Section } from "@/components/section";

const CAREER = [
  { years: "2018 – 2020", org: "Capital Group",   role: "Analyst" },
  { years: "2020 – 2022", org: "Sprout",          role: "PM" },
  { years: "2022 – 2023", org: "Taco Bell",       role: "Senior Manager" },
  { years: "2023 – Now",  org: "Disney Studios",  role: "Senior Manager", current: true },
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
            "
          </span>
          The gap between managing data and actually building with it is closing fast.
          I&apos;ve spent my career working on both sides of that wall — and I think
          that&apos;s the only place worth being right now.
        </blockquote>
      </Section>

      <Section>
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-6 text-[16px] leading-[1.8] text-[rgba(216,212,204,0.78)] max-w-[640px]">
            <p>
              Senior Manager at Disney — serving Disney Studios at Fortune 50 scale,
              leading across product, finance, and operations. Co-lead of three AI
              task forces spanning product, program management, and data.
            </p>
            <p className="font-[family-name:var(--font-instrument)] italic text-[20px] border-l-2 border-[var(--color-arctic)] pl-5 text-[rgba(216,212,204,0.85)]">
              I joined Disney and within six months was recognized as a senior leader
              on the team. That&apos;s not a timeline I planned — it&apos;s how I work.
            </p>
            <p>
              In parallel: Stuart Ventures. Six production-grade software products
              built solo. Geopolitical intelligence, multi-agent editorial
              infrastructure, lending intelligence, AI education, systematic trading,
              spec-as-code tooling. <em className="font-[family-name:var(--font-instrument)] not-italic [&]:italic">All shipping. All real.</em>
            </p>
            <p>
              AI is what makes the combination possible — I&apos;m not working twice
              as hard, I&apos;m working differently.
            </p>
          </div>

          <aside className="md:sticky md:top-24 self-start space-y-3 font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-paper-mid)]">
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Currently</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Senior Manager · Disney Studios</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Domain</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Data &amp; AI — enterprise + solo</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Education</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Quant + Operations Research</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Newsletter</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">The Data Product Agent</div>
            </div>
          </aside>
        </div>
      </Section>

      <Section label="CAREER ARC" title="Where I've worked.">
        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {CAREER.map((c) => (
            <li key={c.org} className="border-t border-[var(--color-rule)] pt-5">
              <div
                className={`inline-flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase mb-2 ${
                  c.current ? "text-[var(--color-arctic)]" : "text-[var(--color-paper-low)]"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    c.current ? "bg-[var(--color-arctic)]" : "border border-[var(--color-paper-low)]"
                  }`}
                  style={c.current ? { boxShadow: "0 0 8px var(--color-arctic)" } : {}}
                />
                {c.years}
              </div>
              <div className={`font-[family-name:var(--font-syne)] font-extrabold text-[20px] leading-tight ${c.current ? "text-[var(--color-paper)]" : "text-[rgba(216,212,204,0.6)]"}`}>
                {c.org}
              </div>
              <div className="text-[13px] text-[var(--color-paper-mid)] mt-1">{c.role}</div>
            </li>
          ))}
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
