# Public Brand Website

## THIS REPO IS THE SOURCE OF TRUTH

Every fact about Ethan's products — names, URLs, status, what is and isn't shipped — comes from
this file and the code in this repo. Nothing else.

**Notion is deprecated. Do not read it for facts.** Ethan stopped maintaining the Notion workspace
in mid-2026. The pages it contains are stale and actively wrong: they still carry dead product
names and dead domains. Sessions that booted from Notion wrote that stale context straight into
production — that is the documented root cause of the wrong-domain bugs fixed in this repo. If a
Notion page and this file disagree, this file wins and the Notion page is wrong. Do not "check
Notion to confirm." There is no session-start Notion protocol anymore.

If you need a fact that is not in this file, ask Ethan. Do not infer it, and do not carry it
forward from a previous session's summary.

## Verified Product Table

Last verified 2026-08-22 by curl against each domain — checking not just for HTTP 200, but that
the page actually serves Ethan's product. A 200 proves a server answered, not that it's his.

| Product | URL | Status | Notes |
|---|---|---|---|
| Allison's Kitchen (formerly Stuart Pantry) | allisonskitchen.app | INVITE | iOS build in UAT |
| NexusWatch | nexuswatch.dev | LIVE | daily email brief has real subscribers |
| Altogether (formerly Long Table, formerly Caravan; repo `caravan`) | longtable.dev | IN DEVELOPMENT | |
| The Composer | no public URL | IN DEVELOPMENT | |
| Product OS | no public URL | IN DEVELOPMENT | |
| Prototype Studio (formerly Zero to Ship) | zerotoship.app | LIVE | development dormant |

## DEAD FACTS — never reintroduce

These are wrong. If you find yourself about to write one, stop and re-read the table above.

- **nexuswatch.io** — belongs to another company (Eliciq Watch, a UK accounting SaaS). Linking it
  sends visitors to a competitor's pricing page.
- **nexuswatch.app** — does not resolve.
- **zerotoship.dev** — 404, deployment not found.
- **"eight products in flight"** — not a real count. Do not put a product count in copy.
- **Meridian Intelligence, RidgeCap, Quant Engine, Sports ML Pipeline** — dead names.
- **Any live-capital or wagering language** — no "Kelly-sized bets," no "live odds," no "bankroll,"
  no "shipped to live capital." The modeling work is research: paper-traded, walk-forward
  evaluated, no real capital deployed. `public/resume.md` is correct on this; match it.

> **Open item (2026-08-22):** four dead names above — Meridian Intelligence, RidgeCap, Quant Engine,
> Sports ML Pipeline — still ship as live portfolio entries in `src/lib/constants.ts` with routes at
> `/portfolio/<slug>`. Ethan's decision was to reframe their copy in this pass, not delete them.
> Do not delete them unilaterally and do not add new ones. Raise it with him.

## Copy Rules

- **Every figure carries its measurement method inline.** Not "40% faster" — "40% faster on the
  p50 build, measured over the last 200 CI runs." A number with no method attached gets cut.
- **No feature counts or test counts as selling points.** "34 features, 433 tests" tells a reader
  nothing and cannot be checked.
- **No unverifiable superlatives.** No "world-class," no "professional-grade," no "best-in-class."
- **If a claim can't be verified, delete it or ask.** Do not soften it, do not hedge it, do not
  keep it because it reads well. This repo has already been through two truth audits
  (`7d70bdc`, `011a652`) plus this one. A third should not be necessary.
- No exact dollar amounts or team sizes. Vague scale signals are fine ("Fortune 50",
  "cross-functional team").
- Tone: confident, not metrics-heavy. Personal brand, not corporate resume.

## Project Overview

Personal brand website for Ethan Stuart. Serves three purposes equally: career credibility,
builder narrative, and (eventually) course funnel.

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4
- Framer Motion + GSAP + Lenis (animation / smooth scroll)
- Three.js (NexusWatch globe, lazy-loaded on that route only)
- Vercel (hosting + analytics + speed insights)
- rss-parser (Substack feed)
- Playwright (route smoke tests in `tests/`)

**The resume PDF is built with Typst, not jsPDF.** jsPDF is not a dependency of this project and
never has been in the current tree — do not add it or reference it. `scripts/sync-resume.sh` shells
out to `typst compile`.

## Resume Sync — read before editing public/resume.md

`npm run build` runs `scripts/sync-resume.sh` first. That script **overwrites `public/resume.md`**
with `~/Projects/home-base/personal/resume-base.md` on every single build, and rebuilds
`public/resume.pdf` from `resume-base.typ`.

**Any edit made directly to `public/resume.md` is silently destroyed on the next build.** Edit
`~/Projects/home-base/personal/resume-base.md` instead. `public/resume.md` is a build artifact
that happens to be committed.

## Architecture

- Static-first: most pages statically generated at build time
- Substack posts fetched via RSS with 1hr revalidation
- Resume parsed from `public/resume.md` at build/request time
- Projects defined in `src/lib/constants.ts`; case studies at `/portfolio/[slug]`
- No database, no auth, no CMS

## Project Status Values

`ProjectStatus` in `src/lib/constants.ts` is `"live" | "invite" | "building" | "paused"`.
Meanings are literal — do not stretch them to flatter a project:

- **live** — a stranger can use it today
- **invite** — real users, behind a gate
- **building** — not in anyone's hands yet
- **paused** — work stopped, not abandoned

`STATUS_LABEL` in `src/components/featured-row.tsx` must stay in sync with this union.

## Key Commands

- `npm run dev` — start dev server
- `npm run build` — sync resume (OVERWRITES public/resume.md) + production build
- `npm run sync-resume` — resume sync only
- `npx tsc --noEmit` — typecheck
- `npx playwright test` — route smoke tests

## Nav Structure

Home, About, Portfolio, Writing. Resume and Contact exist but are not in the main nav.

## Conventions

- Dark theme default
- Monospace for labels/tags, sans-serif for body
- Section pattern: mono uppercase label → bold heading → muted description
- Portfolio: static screenshot previews on cards, live iframes on case study pages

## File Structure

```
src/
  app/              # Pages (about, portfolio, resume, contact, writing, api/)
  components/       # Shared components (nav, hero, footer, section, etc.)
  lib/              # Constants, resume parser, substack fetcher, JSON-LD
public/
  portfolio/        # Static preview screenshots
  resume.md         # BUILD ARTIFACT — overwritten by sync-resume.sh
  headshot.jpg
scripts/
  sync-resume.sh    # Copies resume from home-base + builds PDF via Typst
tests/              # Playwright route smoke tests
```

## Bugs & Issues Severity

- **P0 — Critical**: site down, broken contact form, crashes in core flows, or **an outbound link
  pointing at a domain that isn't Ethan's**. Drop everything.
- **P1 — High**: broken page, bad layout, broken links, false public claims.
- **P2 — Normal**: cosmetic issues, copy tweaks, minor UX degradation.

## Session Start

1. Read this file. It is the source of truth.
2. `git log --oneline -10` for recent context.
3. Ask Ethan for today's priorities.

Do not open Notion.

## Session End

- Note what changed (copy, components, portfolio projects).
- Flag stale portfolio screenshots: `Screenshot needed: [project] — [what changed]`.
- If a project was added or removed, verify `src/lib/constants.ts` and the `public/portfolio/`
  screenshot agree.
- **If you changed or added an outbound project URL, curl it and confirm the response body is
  Ethan's product.** nexuswatch.io returned a healthy 200 for months while serving another
  company's site.

## Shared Context — home-base

Part of a portfolio managed from `~/Projects/home-base`:

- `~/Projects/home-base/registry.md` — project registry
- `~/Projects/home-base/standards/quality.md` — shared quality standards
- `~/Projects/home-base/standards/design-principles.md` — design philosophy
- `~/Projects/home-base/standards/design-toolkit.md` — skills, component libraries, references
- `~/Projects/home-base/personal/CLAUDE.local.md` — who Ethan is, how he works

Use `/brand-guidelines` for brand identity. Use `/frontend-design` for new UI work.
