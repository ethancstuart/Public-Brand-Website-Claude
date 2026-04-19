"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/constants";
import { Ticker } from "./ticker";

const PILLARS = [
  { num: "01", label: "Builder", detail: "Six AI products in production" },
  { num: "02", label: "Domain", detail: "Data & AI systems" },
  { num: "03", label: "Leadership", detail: "Product orgs at scale" },
];

const CREDENTIALS = [
  { label: "Currently", value: "Disney Studios Technology" },
  { label: "Previously", value: "Taco Bell · Capital Group" },
  { label: "Newsletter", value: "The Data Product Agent" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function statusColor(status: string) {
  if (status === "Live") return "var(--status-live)";
  if (status === "Building") return "var(--status-building)";
  return "var(--muted-foreground)";
}

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(90,128,0,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(90,128,0,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main grid */}
      <div
        className="relative mx-auto flex-1 w-full grid items-start"
        style={{
          maxWidth: "1280px",
          padding: "96px 56px 0",
          gridTemplateColumns: "1fr 360px",
          gap: "80px",
        }}
      >
        {/* Left accent rule */}
        <div
          className="absolute"
          style={{
            left: "56px",
            top: "96px",
            width: "2px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        {/* Left column */}
        <div className="flex flex-col gap-10 pl-6">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{
                  background: "var(--accent)",
                  opacity: 0.6,
                  animation: "pulse-dot 3s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "var(--muted-foreground)",
              }}
            >
              Active builder / Data &amp; AI Product Leader
            </span>
          </motion.div>

          {/* Headline — 3 lines with staggered clipup */}
          <div className="flex flex-col gap-0.5">
            <div className="overflow-hidden">
              <motion.div
                className="font-serif italic"
                style={{
                  fontSize: "clamp(36px, 4.2vw, 58px)",
                  lineHeight: 1.1,
                  color: "var(--text-mid)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                Building where
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="font-sans font-extrabold tracking-tight"
                style={{
                  fontSize: "clamp(58px, 8.5vw, 114px)",
                  lineHeight: 1.0,
                  color: "var(--foreground)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              >
                DATA &amp; AI
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="font-serif italic"
                style={{
                  fontSize: "clamp(36px, 4.2vw, 58px)",
                  lineHeight: 1.1,
                  color: "var(--accent)",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
              >
                become products.
              </motion.div>
            </div>
          </div>

          {/* Subhead */}
          <motion.p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              maxWidth: "520px",
              color: "var(--muted-foreground)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          >
            I lead data and AI products at Fortune 50 scale — and ship them
            independently as a solo founder. Six AI products in production. The
            gap between managing data and building with it is closing fast. I
            work on both sides.
          </motion.p>

          {/* Pillars */}
          <motion.div
            className="grid grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.62 }}
          >
            {PILLARS.map((p) => (
              <PillarItem key={p.num} {...p} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.74 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg font-mono uppercase transition-opacity hover:opacity-80"
              style={{
                padding: "10px 20px",
                background: "var(--foreground)",
                color: "var(--background)",
                fontSize: "10px",
                letterSpacing: "0.12em",
              }}
            >
              View the work <span style={{ fontSize: "12px" }}>↗</span>
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-lg font-mono uppercase transition-colors"
              style={{
                padding: "10px 20px",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "10px",
                letterSpacing: "0.12em",
              }}
            >
              Read writing
            </Link>
            <a
              href="https://thedataproductagent.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono uppercase transition-opacity hover:opacity-70"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--accent)",
              }}
            >
              The Data Product Agent →
            </a>
          </motion.div>
        </div>

        {/* Right column — project manifest */}
        <motion.div
          className="sticky"
          style={{ top: "96px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              Selected work
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--accent)", opacity: 0.6 }}
            >
              06
            </span>
          </div>

          <div className="flex flex-col">
            {portfolioProjects.map((project, i) => (
              <ManifestRow
                key={project.slug}
                project={project}
                index={i}
                statusColor={statusColor(project.status)}
              />
            ))}
          </div>

          {/* Credential stack */}
          <div
            className="mt-8 flex flex-col gap-2.5"
            style={{ paddingTop: "24px", borderTop: "1px solid var(--border)" }}
          >
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="flex items-baseline gap-3">
                <span
                  className="font-mono uppercase shrink-0"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--muted-foreground)",
                    width: "72px",
                  }}
                >
                  {c.label}
                </span>
                <span
                  className="font-sans font-semibold"
                  style={{ fontSize: "12px", color: "var(--text-mid)" }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="mt-16">
        <Ticker />
      </div>
    </section>
  );
}

function PillarItem({ num, label, detail }: { num: string; label: string; detail: string }) {
  return (
    <div
      className="group cursor-default transition-all duration-300"
      style={{
        borderLeft: "2px solid var(--border)",
        padding: "12px 0 12px 16px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--border)";
      }}
    >
      <div
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.15em", color: "var(--accent)", opacity: 0.6, marginBottom: "4px" }}
      >
        {num}
      </div>
      <div
        className="font-sans font-bold"
        style={{ fontSize: "13px", color: "var(--foreground)", marginBottom: "2px" }}
      >
        {label}
      </div>
      <div
        className="font-mono"
        style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
      >
        {detail}
      </div>
    </div>
  );
}

function ManifestRow({
  project,
  index,
  statusColor,
}: {
  project: { title: string; slug: string; type: string };
  index: number;
  statusColor: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex items-center gap-4 rounded-lg transition-colors duration-200"
      style={{ padding: "14px 12px", margin: "0 -12px" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--accent-soft)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span
        className="font-mono shrink-0"
        style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-low)", width: "20px" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="font-sans font-bold truncate"
          style={{ fontSize: "13px", color: "var(--foreground)" }}
        >
          {project.title}
        </div>
        <div
          className="font-mono truncate"
          style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
        >
          {project.type}
        </div>
      </div>
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: statusColor }}
      />
      <span
        className="font-mono opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ fontSize: "10px", color: "var(--accent)" }}
      >
        ↗
      </span>
    </Link>
  );
}
