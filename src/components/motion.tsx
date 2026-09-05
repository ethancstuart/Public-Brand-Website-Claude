"use client";

/**
 * The register's motion vocabulary — decision 0007. Four primitives, one
 * easing, consistent durations. Everything is entrance choreography: elements
 * rise into place once and then hold still. Nothing loops, nothing parallaxes,
 * and useReducedMotion renders it all static.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A 1px rule that draws itself from the left as it enters view. */
export function DrawRule({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced)
    return <div className={className} style={{ height: 1, background: "var(--rule-strong)" }} />;
  return (
    <motion.div
      className={className}
      style={{ height: 1, background: "var(--rule-strong)", transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

/**
 * Figures that count up when they enter view. "100%" and "~4 → ~1" both work:
 * every number in the string animates from 0; everything else stays put.
 */
export function CountUp({
  value,
  className,
  duration = 1.1,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [text, setText] = useState(() => value.replace(/\d+/g, "0"));

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, 1, {
      duration,
      ease: EASE,
      onUpdate(p) {
        setText(value.replace(/\d+/g, (m) => String(Math.round(Number(m) * p))));
      },
      onComplete() {
        setText(value);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {reduced ? value : text}
    </span>
  );
}

/** Hero-only: rises with a blur that resolves — the page "focusing". */
export function FocusIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
