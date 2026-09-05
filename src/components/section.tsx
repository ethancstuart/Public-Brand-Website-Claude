import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

interface SectionProps {
  /** Serif heading, left of the rule. */
  title?: string;
  /** Mono caption set flush right against the heading. */
  aside?: string;
  /** One paragraph under the heading, before the content. */
  note?: ReactNode;
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  aside,
  note,
  id,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`wrap py-[clamp(50px,6.5vw,82px)] ${className}`}>
      {(title || aside) && (
        <Reveal className="flex flex-wrap items-baseline justify-between gap-5 mb-2">
          {title && (
            <h2 className="font-display text-[clamp(23px,2.7vw,32px)] leading-[1.2] tracking-[-0.012em]">
              {title}
            </h2>
          )}
          {aside && <span className="eyebrow">{aside}</span>}
        </Reveal>
      )}
      {note && (
        <Reveal delay={0.08}>
          <p className="mt-2.5 mb-8 text-[15px] text-ink-soft max-w-[var(--measure)]">
            {note}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}

/** Mono uppercase label. Used for eyebrows, asides, and metadata throughout. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}
