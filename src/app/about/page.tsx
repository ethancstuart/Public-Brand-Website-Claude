import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Manager, Data Products and BI Engineering at Disney Studios — and the operator of a one-person software practice running the same model.",
};

const PHILOSOPHY = [
  {
    line: "Build to understand, not just to ship.",
    body: "Shipping is the forcing function. Understanding is the compounding asset. The products exist because building them is how the thinking gets tested.",
  },
  {
    line: "Clarity is the product.",
    body: "Most product debt is decision debt. Make the decision, write down why, move. The decision log is worth more than the roadmap.",
  },
  {
    line: "The org is part of the system.",
    body: "Technical decisions are organizational decisions in disguise. An architecture nobody can operate is not an architecture.",
  },
];

const SIDEBAR = [
  {
    term: "Currently",
    value: "Senior Manager, Data Products and BI Engineering — Disney Studios",
  },
  { term: "Open to", value: "Director / VP — AI Product Leadership", open: true },
  { term: "Domain", value: "Data & AI — enterprise and solo, in parallel" },
  { term: "Writing", value: "The Data Product Agent" },
  { term: "Based", value: "Los Angeles" },
];

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="pb-[clamp(28px,4vw,44px)] pt-[clamp(44px,6vw,78px)]">
        <span className="eyebrow mb-5 block">About</span>
        <h1 className="max-w-[24ch] font-display text-[clamp(27px,3.8vw,44px)] leading-[1.16] tracking-[-0.017em]">
          The gap between managing data and actually building with it is closing
          fast. I&apos;ve spent my career on{" "}
          <em className="italic text-accent">both sides of that wall</em>.
        </h1>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-x-14 gap-y-10 border-t border-rule-strong pt-10 max-[860px]:grid-cols-1">
        <div className="max-w-[var(--measure)] space-y-4 text-[16.5px] leading-[1.75] text-ink-soft">
          <p>
            <strong className="font-medium text-ink">
              Senior Manager, Data Products and BI Engineering at Disney
              Studios.
            </strong>{" "}
            I lead a matrixed data and AI product engineering organization —
            FTEs, contractors, and SOW resources across ten product pods — that
            runs enterprise-wide across the studios. I brief executives monthly,
            and co-lead enterprise AI task forces across product, program, and
            data.
          </p>
          <p className="border-l-2 border-rule-strong pl-5 font-display text-[20px] leading-[1.4] tracking-[-0.01em] text-ink">
            Most product leaders manage. I run AI-native product teams and I ship
            real software. The combination is the point.
          </p>
          <p>
            In parallel, a one-person software practice spanning household
            software, geopolitical intelligence, multi-household trip planning,
            multi-agent editorial infrastructure, forecasting and calibration,
            spec-as-code tooling, and AI prototyping. Every one carries a literal
            status, and some of those statuses are unflattering on purpose.
          </p>
          <p>
            AI is what makes the combination possible. I am not working twice as
            hard — I am working differently, and the operating model is the same
            in both places.
          </p>
        </div>

        <aside className="self-start">
          <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-[2px] border border-rule-strong">
            <Image
              src="/headshot.jpg"
              alt="Ethan Stuart"
              fill
              sizes="(max-width: 860px) 90vw, 300px"
              className="object-cover"
              priority
            />
          </div>
          <dl className="ledger border-t-rule">
            {SIDEBAR.map((s) => (
              <div key={s.term} className="py-3">
                <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.13em] text-ink-faint">
                  {s.term}
                </dt>
                <dd
                  className={`m-0 text-[13.5px] leading-[1.45] ${
                    s.open ? "font-medium text-accent" : ""
                  }`}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <Section title="How I work" aside="Standing positions">
        <div className="cols cols-3">
          {PHILOSOPHY.map((p) => (
            <div key={p.line}>
              <h3 className="mb-2.5 font-display text-[20px] leading-[1.28] tracking-[-0.012em]">
                {p.line}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-rule-strong py-10">
        <span className="eyebrow">Contact</span>
        <p className="my-3.5 max-w-[30ch] font-display text-[21px] leading-[1.35] tracking-[-0.01em]">
          Open to Director and VP roles in AI product leadership.
        </p>
        <a href={`mailto:${siteConfig.links.email}`} className="cta">
          {siteConfig.links.email}
        </a>
      </section>
    </div>
  );
}
