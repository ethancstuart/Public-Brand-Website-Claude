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

Last verified **2026-08-22** by curl against each domain — checking not just for HTTP 200, but that
the response body actually serves Ethan's product. A 200 proves a server answered, not that it's
his.

| Product | Slug | URL | Status |
|---|---|---|---|
| Allison's Kitchen (formerly Stuart Pantry) | `allisons-kitchen` | allisonskitchen.app | INVITE — iOS build in UAT |
| NexusWatch | `nexuswatch` | nexuswatch.dev | LIVE — daily brief has real subscribers |
| Altogether (formerly Long Table, formerly Caravan; repo `caravan`) | `altogether` | longtable.dev | IN DEVELOPMENT |
| The Composer | `the-composer` | no public URL | IN DEVELOPMENT |
| Product OS | `product-os` | no public URL | IN DEVELOPMENT |
| Prototype Studio (formerly Zero to Ship) | `zero-to-ship` | zerotoship.app | LIVE — development dormant |

**The `zero-to-ship` slug is permanent.** The route and its case study predate the rename to
Prototype Studio, and changing it breaks both. There is a comment at the definition in
`constants.ts`; do not "tidy" it.

Order in `PROJECTS` is deliberate and is the order they render. Allison's Kitchen leads, and owns
its origin: built for one household first — Ethan's own — then opened to other families a few at a
time. That is the credibility, not something to soften.

## DEAD FACTS — never reintroduce

These are wrong. If you find yourself about to write one, stop and re-read the table above.

- **nexuswatch.io** — belongs to another company (Eliciq Watch, a UK accounting SaaS). Linking it
  sends visitors to a competitor's pricing page. It returns a healthy 200.
- **nexuswatch.app** — does not resolve.
- **zerotoship.dev** — 404, deployment not found.
- **"eight products in flight"** — not a real count. Do not put a product count in copy.
- **Meridian Intelligence, RidgeCap, Quant Engine, Sports ML Pipeline** — deleted 2026-08-22 on
  Ethan's instruction: constants, routes, and case studies all removed. Their URLs shipped to
  production and are indexed, so `next.config.ts` holds permanent redirects to `/portfolio`. Do not
  re-add the products, and do not remove the redirects.
- **Any live-capital or wagering language** — no "Kelly-sized bets," no "live odds," no "bankroll,"
  no "shipped to live capital." The modeling work was research: paper-traded, walk-forward
  evaluated, no real capital deployed. `public/resume.md` is correct on this; match it.
- **Prototype Studio as a course.** It was a sixteen-module gamified course; it now sells working
  sessions, guides, and agent-system setup. The pivot is the story — do not describe it as a course
  in the present tense.

## Copy Rules

- **Every figure carries its measurement method inline.** Not "40% faster" — "40% faster on the
  p50 build, measured over the last 200 CI runs." A number with no method attached gets cut.
- **No feature counts or test counts as selling points.** "34 features, 433 tests" tells a reader
  nothing and cannot be checked.
- **No unverifiable superlatives.** No "world-class," no "professional-grade," no "best-in-class."
- **If a claim can't be verified, delete it or ask.** Do not soften it, do not hedge it, do not
  keep it because it reads well. This repo has been through three truth audits (`7d70bdc`,
  `011a652`, and the v3 register redesign). A fourth should not be necessary.
- No exact counts, dollar amounts, or team sizes. Vague scale signals are fine ("Fortune 50",
  "cross-functional team", "five studio groups").
- Tone: confident, not metrics-heavy. Personal brand, not corporate resume.

### The one numbers exception

The **Operating Record** on `/` and `/about` may carry exact figures — *precisely because each one
carries its measurement method inline* ("Jira cycle-time, 6-month rolling"; "Marketing-mix-model
attributed"). The rule exists to stop unverifiable boasting, not to stop evidence: a figure with
its method attached invites the check.

A bare figure anywhere else is still out. If you cannot name how it was measured in the same
breath, it does not go in. `/resume` is also exempt — it renders `public/resume.md`, which has its
own detail level.

## Project Overview

Personal brand website for Ethan Stuart. Serves three purposes equally: career credibility,
builder narrative, and services funnel. The audience is committees hiring a Director/VP of AI
Product — the site must read as "ships infrastructure," not "designs portfolios."

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4
- **No animation library.** Motion is near-zero by design. Framer Motion, GSAP, Lenis, Three.js and
  OGL were all removed in the v3 register redesign — do not reinstall them to "add polish."
- Vercel (hosting + analytics + speed insights)
- rss-parser (Substack feed), sanitize-html (Substack article bodies)
- Playwright (route smoke tests in `tests/`)

**The resume PDF is built with Typst, not jsPDF.** jsPDF is not a dependency of this project and
never has been in the current tree — do not add it or reference it.

## Resume Sync — read before editing public/resume.md

`npm run build` runs `scripts/sync-resume.sh` first. That script **overwrites `public/resume.md`**
with `~/Projects/home-base/personal/resume-base.md` on every single build, and rebuilds
`public/resume.pdf` from `resume-base.typ` via `typst compile`.

**Any edit made directly to `public/resume.md` is silently destroyed on the next build.** Edit
`~/Projects/home-base/personal/resume-base.md` instead. `public/resume.md` is a build artifact
that happens to be committed.

`public/resume.md` is also the source of truth for career history — the `TRACK` array in
`constants.ts` must match it. It has been wrong before: the pre-v3 about page had the wrong Sprout
Mortgage and Capital Group titles and started the record in 2018 rather than 2016.

## Architecture

- Static-first: most pages statically generated at build time
- Substack posts fetched via RSS with 1hr revalidation
- Resume parsed from `public/resume.md` at build/request time
- Products in `src/lib/constants.ts` (`PROJECTS`); case-study prose in `src/lib/case-studies.ts`,
  rendered at `/portfolio/[slug]`
- `portfolio/[slug]` sets `dynamicParams = false`. **Do not remove it.** Without it an unknown slug
  renders the not-found body with a **200** — a soft 404, which is worse than either a real 404 or
  a redirect, because search engines keep the URL indexed and read the site as answering.
- No database, no auth, no CMS

## Project Status Values

`ProjectStatus` in `src/lib/constants.ts` is `"live" | "invite" | "building" | "paused"`.
Meanings are literal — do not stretch them to flatter a project:

- **live** — a stranger can use it today
- **invite** — real users, behind a gate
- **building** — not in anyone's hands yet
- **paused** — work stopped, not abandoned

An unflattering status is the point, not a bug. Labels and colours live in the `STATUS` record in
`constants.ts` — the single place they are defined.

## Key Commands

- `npm run dev` — start dev server
- `npm run build` — sync resume (OVERWRITES `public/resume.md`) + production build
- `npm run sync-resume` — resume sync only
- `npm run lint` — eslint
- `npx tsc --noEmit` — typecheck
- `npx playwright test` — route smoke tests (desktop + iPhone 14)

## Nav Structure

Home, About, Portfolio, Writing. Resume and Contact exist but are not in the main nav.
Home also carries in-page anchors: `#work`, `#method`, `#record`, `#track`, `#contact`.

## Conventions — the register

- **A register, not a gallery.** Rules and rows, tabular alignment, `.tnum` on anything numeric. No
  cards, no decorative 01/02/03 numbering — the projects are not a sequence.
- **Type**: IBM Plex Sans (body/UI), IBM Plex Mono (labels/status/metadata), Newsreader (display and
  judgment lines). Do not reintroduce Syne, Bricolage Grotesque, Instrument Serif, or DM Mono.
- **Colour**: blue-biased neutrals. Ground `#FBFBF9` light / `#101318` dark, following the viewer's
  system preference (`data-theme` overrides). One accent: `#23478C` / `#86A9E5`. Status colours are
  semantic and separate. Never colour a product by identity — the nine-accent per-project scheme is
  gone.
- **Near-zero motion.** The restraint is the argument. Nothing animates on scroll.
- **Layout primitives** live in `globals.css`: `.wrap`, `.ledger`, `.cols` + `.cols-3`/`.cols-4`,
  `.eyebrow`, `.cta`. Use them rather than re-deriving dividers per component.
- **Renames are history, not new products.** Use `formerly?` so the alias trail shows. Never a
  second entry for a renamed product, and never a changed slug.
- The register carries **no screenshots**. Products are described in prose and linked live.

## File Structure

```
src/
  app/              # Pages (about, portfolio, resume, contact, writing)
  components/       # nav, footer, section, register, blocks, post-card,
                    # subscribe-cta, live-indicators, json-ld
  lib/              # constants, case-studies, resume parser, substack, jsonld
public/
  resume.md         # BUILD ARTIFACT — overwritten by sync-resume.sh
  resume.pdf        # BUILD ARTIFACT — built from Typst
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

- Note what changed (copy, components, products).
- If a product was added, removed, or renamed, verify `src/lib/constants.ts` and
  `src/lib/case-studies.ts` agree, and that any rename kept its slug and gained a `formerly` entry.
- **If you changed or added an outbound project URL, curl it and confirm the response body is
  Ethan's product.** nexuswatch.io returned a healthy 200 for months while serving another
  company's site. A dead or wrong link in the register is a P0.
- Run `npm run lint`, `npx tsc --noEmit`, and `npx playwright test` before claiming done.

## Shared Context — home-base

Part of a portfolio managed from `~/Projects/home-base`:

- `~/Projects/home-base/registry.md` — project registry
- `~/Projects/home-base/standards/quality.md` — shared quality standards
- `~/Projects/home-base/standards/design-principles.md` — design philosophy
- `~/Projects/home-base/standards/design-toolkit.md` — skills, component libraries, references
- `~/Projects/home-base/personal/CLAUDE.local.md` — who Ethan is, how he works

Use `/brand-guidelines` for brand identity. Use `/frontend-design` for new UI work.
