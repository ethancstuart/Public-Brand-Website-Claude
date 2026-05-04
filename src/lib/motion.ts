// Shared easing + stagger constants for the redesign.
// Used by Hero, FeaturedRow, page-section reveals, GSAP timelines.

export const EASE = {
  // Apple-style fast-start / soft-landing
  out:     [0.16, 1, 0.3, 1] as const,
  // Symmetrical for transitions
  inOut:   [0.45, 0, 0.55, 1] as const,
  // GSAP-compatible cubic-bezier strings
  outCSS:   "cubic-bezier(0.16, 1, 0.3, 1)",
  inOutCSS: "cubic-bezier(0.45, 0, 0.55, 1)",
};

export const STAGGER = {
  fast: 0.08,
  base: 0.12,
  slow: 0.16,
};

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.0,
};
