# 0001 — A register, not a gallery

**Date:** 2026-08-22 · **Status:** accepted

## Context
The redesign-v2 treatment signalled *creative technologist*: WebGL hero, GSAP
scroll-tied parallax, custom cursor, per-project accent colours. The audience is
committees hiring a Director/VP of AI Product. The v2 spec itself warned motion
must read as "ships infrastructure, not designs portfolios" — it shipped the opposite.

## Decision
Replace it with a **register**: rules and rows, tabular alignment, one accent,
semantic status colours, near-zero motion. Delete the motion layer entirely —
framer-motion, GSAP, Lenis, Three.js, OGL — rather than tune it down.

## Why
Restraint is the argument. A page that performs is evidence of taste; a page that
is legible under a twenty-second scan is evidence of judgment. Committees have
twenty seconds.

## Consequences
- No animation library is installed. Do not add one to "add polish."
- Nine per-project accent colours are gone; colour now encodes **state**, never identity.
- Verified after the fact: a simulated speed-screening recruiter recovered job,
  level, intent and differentiator from the first screenful alone.
