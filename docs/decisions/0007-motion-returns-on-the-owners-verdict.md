# 0007 — Motion returns, on the owner's verdict

**Date:** 2026-09-05 · **Status:** accepted · **Supersedes:** 0006 (partially), amends 0001

## Context
Ethan asked for an animated, designer-grade experience. Per 0006's own process,
the fork was put to him; he chose the dependency-free craft pass, saw it live,
and rejected it: "just a scrollable, straight, regular-ass website — not at all
what I want." That is the owner's verdict after seeing both options — the
process 0001 and 0006 existed to guarantee. The reversal is knowing, not drift.

## Decision
Install `motion` (one dependency) and give the register **entrance
choreography**: a hero that focuses in (rise + blur resolve, 3-stage cascade),
section rules that draw themselves, ledger rows that stagger in, Operating
Record figures that count up. One easing (cubic-bezier(0.22,1,0.36,1)),
durations 0.6–1.1s, all once-only via whileInView.

## What survives from 0001/0006
- **Nothing loops, nothing parallaxes, nothing is scroll-*tied*** — elements
  animate once on entering view and then hold still. This is choreography, not
  the v2 scroll-performance layer; GSAP/Lenis/scroll-jacking stay dead.
- shadcn stays rejected (0006's reasoning stands).
- prefers-reduced-motion renders everything static — every primitive checks it.
- The ⌘K palette, theme toggle, and craft details all remain.

## Consequences
- The motion vocabulary lives in ONE file, src/components/motion.tsx (Reveal,
  DrawRule, CountUp, FocusIn). New animation goes through these primitives or
  it doesn't go in — no bespoke variants per page.
- CLAUDE.md's "no animation library" line is superseded; the guard is now
  "one library, four primitives, entrance-only".
- If the twenty-second-scan evidence degrades (real recruiters/committees),
  0001's argument gets re-litigated with data, not taste.
