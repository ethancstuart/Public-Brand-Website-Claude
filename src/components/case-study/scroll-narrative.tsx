"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

interface Section {
  label: string;
  title: string;
  body: ReactNode;
}

interface Props {
  sections: Section[];
  accent: string;
}

export function ScrollNarrative({ sections, accent }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-32 space-y-32">
      {sections.map((s, i) => (
        <motion.section
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: DURATION.slow, ease: EASE.out, delay: i * STAGGER.fast }}
          className="grid md:grid-cols-[180px_1fr] gap-10"
        >
          <div
            className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase pt-3"
            style={{ color: accent }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-6 h-px" style={{ background: accent }} />
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-[var(--color-paper-mid)]">{s.label}</div>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-instrument)] italic text-[clamp(28px,3.6vw,52px)] tracking-[-0.015em] leading-snug mb-6">
              {s.title}
            </h2>
            <div className="text-[16px] text-[var(--color-paper-mid)] leading-[1.8] max-w-[680px] space-y-4">
              {s.body}
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
