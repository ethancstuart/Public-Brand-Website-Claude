import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { getPersonJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Builder first. Data & AI domain expert. Product leader at scale. The gap between managing data and building with it is closing fast — I work on both sides.",
};

const CAREER = [
  {
    years: "2018 – 2020",
    company: "Capital Group",
    role: "Data Product Manager",
    detail: "0→1 enterprise platform",
    current: false,
  },
  {
    years: "2020 – 2022",
    company: "Sprout Mortgage",
    role: "BI & Analytics Lead",
    detail: "Built from scratch",
    current: false,
  },
  {
    years: "2022 – 2023",
    company: "Taco Bell",
    role: "Manager, BI",
    detail: "CDP · ML Models · Yum! brands",
    current: false,
  },
  {
    years: "2023 – Present",
    company: "Disney",
    role: "Product Lead, Data & AI",
    detail: "Studio-wide platform",
    current: true,
  },
];

const PHILOSOPHY = [
  {
    num: "01",
    statement: "Build to understand, not just to ship.",
    sub: "The fastest way to form a real opinion on a data product is to build one. I keep building because it makes me a better leader.",
  },
  {
    num: "02",
    statement: "Clarity is the product.",
    sub: "Most data work fails at adoption, not implementation. I obsess over the last mile — getting people to actually use what we build.",
  },
  {
    num: "03",
    statement: "The org is part of the system.",
    sub: "You can't ship a great data platform without standing up the team and operating model around it. I build both.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getPersonJsonLd()} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 56px 120px" }}>

        {/* Section label */}
        <div className="flex items-center gap-3" style={{ marginBottom: "72px" }}>
          <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
          >
            About
          </span>
        </div>

        {/* Manifesto opener */}
        <div style={{ marginBottom: "88px" }}>
          <blockquote
            className="font-serif italic relative"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              lineHeight: 1.25,
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              maxWidth: "820px",
              marginBottom: "20px",
            }}
          >
            <span
              aria-hidden
              className="font-serif italic absolute"
              style={{
                fontSize: "1.3em",
                color: "var(--accent)",
                opacity: 0.35,
                left: "-0.45em",
                top: "-0.1em",
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            The gap between managing data and actually building with it is
            closing fast. I&apos;ve spent my career working on both sides of
            that wall — and I think that&apos;s the only place worth being right
            now.
          </blockquote>
          <p
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
          >
            Ethan Stuart — Data &amp; AI Product Leader
          </p>
        </div>

        {/* Narrative + aside */}
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 300px", gap: "80px", marginBottom: "88px" }}
        >
          {/* Left: narrative */}
          <div>
            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)", marginBottom: "24px" }}
            >
              I&apos;m a <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>product leader and builder</strong> operating at the intersection
              of data, AI, and the organizations that need them. At{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>Disney Studios Technology</strong>, I
              lead product for the studio&apos;s data and AI platform — translating
              executive strategy into systems that hundreds of stakeholders
              actually use and adopt.
            </p>

            <blockquote
              style={{
                borderLeft: "2px solid var(--accent)",
                padding: "4px 0 4px 24px",
                margin: "36px 0",
              }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.5,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                  maxWidth: "500px",
                }}
              >
                &ldquo;I don&apos;t just manage the roadmap. I understand the stack,
                write the specs, and ship the products. That&apos;s becoming rarer
                at this level — and it matters.&rdquo;
              </p>
            </blockquote>

            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)", marginBottom: "24px" }}
            >
              Before Disney, I drove{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>CDP adoption across all Yum! brands</strong>{" "}
              at Taco Bell and shipped ML models that directly impacted loyalty
              and retention. At{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>Capital Group</strong>, I launched a 0→1 data
              platform that achieved full Fortune 50 enterprise adoption. Earlier,
              I built analytics functions from scratch at growth-stage companies
              — which is where I learned that the best way to understand a data
              product is to build one yourself.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--mid)" }}
            >
              That instinct drives the builder side of my work. In 2025 I&apos;ve
              shipped <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>six AI products</strong> independently —
              NexusWatch, Meridian, Quant Engine, Zero to Ship, RidgeCap, and
              Family Planner — each pushing into a different corner of what&apos;s
              possible when a product leader actually holds the tools. I write
              about this tension at{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>The Data Product Agent</strong>.
            </p>
          </div>

          {/* Right: aside */}
          <div className="flex flex-col gap-3" style={{ position: "sticky", top: "100px" }}>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: "3/4",
                background: "var(--deep)",
                border: "1px solid var(--border)",
                marginBottom: "4px",
              }}
            >
              <Image
                src="/headshot.jpg"
                alt="Ethan Stuart"
                fill
                className="object-cover object-top"
                priority
                sizes="300px"
              />
            </div>
            {[
              { label: "Currently", value: "Disney Studios Technology" },
              { label: "Domain", value: "Data & AI Platforms" },
              { label: "Education", value: "BBA Finance & Economics — LMU" },
              { label: "Newsletter", value: "The Data Product Agent" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl"
                style={{
                  padding: "14px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-lo)",
                }}
              >
                <p
                  className="font-mono uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)", marginBottom: "5px" }}
                >
                  {fact.label}
                </p>
                <p
                  className="font-sans font-bold"
                  style={{ fontSize: "13px", color: "var(--text-low)", letterSpacing: "-0.01em" }}
                >
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Career arc */}
        <div style={{ paddingTop: "64px", borderTop: "1px solid var(--border)", marginBottom: "88px" }}>
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: "40px" }}
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
            >
              Career Arc
            </span>
            <span
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, var(--border), transparent)",
              }}
            />
          </div>

          <div
            className="grid relative"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}
          >
            {/* Connecting line */}
            <div
              className="absolute"
              style={{
                top: "18px",
                left: "18px",
                right: "18px",
                height: "1px",
                background: "linear-gradient(90deg, var(--border), var(--accent), var(--border))",
                opacity: 0.4,
              }}
            />
            {CAREER.map((stop) => (
              <div key={stop.company} className="relative">
                <div
                  className="rounded-full"
                  style={{
                    width: "9px",
                    height: "9px",
                    background: stop.current ? "var(--accent)" : "var(--background)",
                    border: `1.5px solid ${stop.current ? "var(--accent)" : "var(--border)"}`,
                    boxShadow: stop.current ? "0 0 8px rgba(90,128,0,0.35)" : "none",
                    marginBottom: "16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <p
                  className="font-mono"
                  style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)", marginBottom: "5px" }}
                >
                  {stop.years}
                </p>
                <p
                  className="font-sans font-bold"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "-0.01em",
                    marginBottom: "3px",
                    color: stop.current ? "var(--foreground)" : "var(--text-low)",
                  }}
                >
                  {stop.company}
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.03em", lineHeight: 1.5 }}
                >
                  {stop.role}
                  <br />
                  {stop.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy strip */}
        <div
          className="rounded-2xl"
          style={{
            padding: "48px 56px",
            background: "var(--surface)",
            border: "1px solid var(--border-lo)",
          }}
        >
          <div className="flex items-baseline justify-between" style={{ marginBottom: "32px" }}>
            <span
              className="font-sans font-bold uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-low)" }}
            >
              How I Work
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "9px", color: "var(--accent)", opacity: 0.5 }}
            >
              03
            </span>
          </div>
          <div className="grid grid-cols-3" style={{ gap: "32px" }}>
            {PHILOSOPHY.map((item) => (
              <div key={item.num}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    color: "var(--accent)",
                    opacity: 0.5,
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  {item.num}
                </p>
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.45,
                    color: "var(--foreground)",
                    letterSpacing: "-0.01em",
                    marginBottom: "8px",
                  }}
                >
                  {item.statement}
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: "9.5px", color: "var(--muted-foreground)", lineHeight: 1.65, letterSpacing: "0.01em" }}
                >
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
