"use client";

import { motion } from "framer-motion";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import type { Project } from "@/lib/constants";

interface Props {
  label: string;
  title: string;
  description: string;
  accent: string;
  vignettes: Project[];
}

export function LabStrip({ label, title, description, accent, vignettes }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
      <header className="mb-12 max-w-[820px]">
        <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3 flex items-center gap-3" style={{ color: accent }}>
          <span className="inline-block w-6 h-px" style={{ background: accent }} />
          {label}
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(32px,4.5vw,56px)] tracking-[-0.025em] leading-[1.05]">
          {title}
        </h2>
        <p className="text-[15px] text-[var(--color-paper-mid)] leading-relaxed mt-4">
          {description}
        </p>
      </header>

      <div
        className={`grid gap-6 ${
          vignettes.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {vignettes.map((v, i) => (
          <motion.article
            key={v.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.base, ease: EASE.out, delay: i * STAGGER.fast }}
            className="border border-[var(--color-rule)] rounded-md p-7 hover:-translate-y-0.5 transition-transform"
            style={{ borderColor: "var(--color-rule)" }}
          >
            <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase mb-4" style={{ color: accent }}>
              0{i + 1} / {String(vignettes.length).padStart(2, "0")}
            </div>
            <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-[24px] leading-tight tracking-[-0.02em]">
              {v.name}
            </h3>
            <div className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] mt-2">
              {v.type}
            </div>
            <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-4">
              {v.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
