"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE, DURATION } from "@/lib/motion";
import type { Project } from "@/lib/constants";
import { useScrollWeight } from "@/components/use-scroll-weight";

interface Props {
  project: Project;
  index: number;
  total: number;
  reverse?: boolean;
  motionCanvas?: ReactNode;
  manifesto: ReactNode;
  lede: ReactNode;
  tags?: string[];
}

export function MagazineSpread({
  project, index, total, reverse, motionCanvas, manifesto, lede, tags,
}: Props) {
  const isReversed = reverse ?? (index % 2 === 1);
  const titleRef = useScrollWeight<HTMLHeadingElement>({ min: 500, max: 800 });

  const colorBlock = (
    <div
      className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between p-10 md:p-16 overflow-hidden"
      style={{ background: project.color }}
    >
      <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[rgba(0,0,0,0.9)]">
        Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <div className="relative flex-1 my-8 flex items-center justify-center">
        {motionCanvas}
      </div>

      <div className="font-[family-name:var(--font-instrument)] italic text-[clamp(20px,2.4vw,32px)] leading-snug text-[rgba(0,0,0,0.85)] max-w-[480px]">
        {manifesto}
      </div>
    </div>
  );

  const contentBlock = (
    <div className="min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between p-10 md:p-16 bg-[var(--color-bg)]">
      <div>
        <div
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: project.color }}
        >
          {project.status.toUpperCase()} · 2026
        </div>
        <motion.h2
          ref={titleRef}
          layoutId={`project-name-${project.slug}`}
          className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(48px,6vw,96px)] tracking-[-0.05em] leading-[0.95] mb-6"
          style={{ fontVariationSettings: '"wght" var(--wght, 800)' } as React.CSSProperties}
        >
          {project.name}
        </motion.h2>
        <div className="text-[16px] text-[var(--color-paper-mid)] leading-relaxed max-w-[520px]">
          {lede}
        </div>
      </div>

      <div className="mt-12">
        {tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t) => (
              <span
                key={t}
                className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.16em] uppercase px-3 py-1.5 border border-[var(--color-rule)] rounded-full text-[var(--color-paper-mid)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase border-b pb-1 transition-colors"
            style={{ color: project.color, borderColor: project.color }}
          >
            Visit {project.name} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)]">
            In active development
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.section
      id={project.slug}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: DURATION.base, ease: EASE.out }}
      className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--color-rule)]"
    >
      {isReversed ? (
        <>
          {contentBlock}
          {colorBlock}
        </>
      ) : (
        <>
          {colorBlock}
          {contentBlock}
        </>
      )}
    </motion.section>
  );
}
