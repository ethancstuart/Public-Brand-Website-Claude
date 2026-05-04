"use client";

import { useEffect, useRef } from "react";

interface Options {
  min?: number;
  max?: number;
}

/**
 * Returns a ref + applies a scroll-driven CSS variable `--wght` on the element.
 * Animates from `min` (off-screen below) to `max` (centered) and back to `min` (off-screen above).
 * Disabled under prefers-reduced-motion (locks at max).
 */
export function useScrollWeight<T extends HTMLElement>(options: Options = {}) {
  const { min = 400, max = 800 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--wght", String(max));
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const normalized = 1 - Math.min(distance / (vh * 1.0), 1);
      const eased = normalized * normalized * (3 - 2 * normalized);
      const wght = min + (max - min) * eased;
      el.style.setProperty("--wght", wght.toFixed(0));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [min, max]);

  return ref;
}
