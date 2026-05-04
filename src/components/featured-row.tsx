"use client";

import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import type { Project } from "@/lib/constants";

const STATUS_LABEL: Record<Project["status"], string> = {
  live:   "LIVE",
  beta:   "BETA",
  build:  "BUILD",
  active: "ACTIVE",
};

interface Props {
  projects: Project[];
}

export function FeaturedRows({ projects }: Props) {
  return (
    <LayoutGroup>
      <ul className="border-t border-[var(--color-rule)]">
      {projects.map((p, i) => (
        <motion.li
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATION.base, ease: EASE.out, delay: i * STAGGER.fast }}
          className="border-b border-[var(--color-rule)] group"
        >
          <Link
            href={`/portfolio/${p.slug}`}
            className="block transition-[padding,background] duration-200 group-hover:pl-6"
            style={
              { "--accent": p.color } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-[40px_1fr_auto_24px] md:grid-cols-[60px_1fr_auto_40px] items-center gap-4 md:gap-8 py-7 md:py-9 group-hover:bg-[color:var(--accent)]/[0.06]">
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] text-[var(--color-paper-dim)]">
                0{i + 1}
              </div>

              <div>
                <motion.div
                  layoutId={`project-name-${p.slug}`}
                  className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(28px,3.6vw,48px)] tracking-[-0.025em] leading-tight transition-colors group-hover:text-[color:var(--accent)]"
                >
                  {p.name}
                </motion.div>
                <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] mt-2">
                  {p.type}
                </div>
              </div>

              <div className="flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent)]">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                />
                {STATUS_LABEL[p.status]}
              </div>

              <div className="text-[var(--color-paper-low)] group-hover:text-[color:var(--accent)] transition-colors text-right">
                ↗
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
      </ul>
    </LayoutGroup>
  );
}
