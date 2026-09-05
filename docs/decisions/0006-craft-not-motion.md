# 0006 — Interaction craft, not motion

**Date:** 2026-09-05 · **Status:** accepted

## Context
Ethan asked whether shadcn and animation repos could make the site "wow — like a
graphic/product/UX designer made this." Decision 0001 had removed exactly that
motion layer, and the synthetic review validated the restraint.

## Decision
Do not reverse 0001. Instead: a **craft pass with zero dependencies** — the
"designer-made" signal comes from precision, not animation.

Added: ⌘K command palette (register-styled, whole-site navigation, keyboard
complete); theme toggle (system → light → dark, persisted, no-FOUC inline
script); one 180ms route-entrance opacity fade via template.tsx; ::selection in
accent; kbd styling; scroll-margin under the sticky masthead; 120ms
hover/focus transitions. Plus the review's flow fixes: footer links to the
orphaned /resume and /contact, /about de-duplicated (Method, Operating Record
and Track now live only on /), case-study spacing, excerpt hygiene.

## Rejected
- **shadcn wholesale** — it is the generic look of AI-built sites in 2026; the
  register is distinctive precisely because it is not that, and the site has no
  dialogs/forms/dropdowns for it to solve.
- **Animation libraries** (framer-motion, GSAP) — would reverse 0001 and re-ship
  the "designs portfolios" signal the redesign exists to avoid.

## Consequences
- Total motion budget: one 180ms fade per navigation + ≤150ms state transitions.
  All zeroed by prefers-reduced-motion. Nothing ever animates on scroll.
- The palette is the one "wow" allowed to grow: new pages/products must be added
  to its ENTRIES list (command-palette.tsx) or they are unreachable by keyboard.
- If a future ask sounds like "make it more animated", read 0001 and this file
  first, then put the fork to Ethan rather than acting on the ask literally.
