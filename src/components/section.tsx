import { ReactNode } from "react";

interface SectionProps {
  label?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ label, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 ${className}`}>
      {(label || title || description) && (
        <header className="mb-12">
          {label && (
            <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-mid)] mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[var(--color-paper-low)]" />
              {label}
            </div>
          )}
          {title && (
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(32px,4.5vw,56px)] tracking-[-0.025em] leading-[1.05]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[15px] text-[var(--color-paper-mid)] max-w-[720px] leading-relaxed mt-4">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
