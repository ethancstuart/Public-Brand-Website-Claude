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

**Canonical Disney facts — corrected 2026-08-23. Do not restore the older figures.**

| Fact | Current value | Superseded value — never restore |
|---|---|---|
| Group name | Studio Technology **and Operations** | "Studio Technology" |
| Org | matrixed **50+ person** data and AI product engineering organization | "45-person org" |
| Reach | **1,000+ downstream users** | "500+ downstream users" |
| Delivery speed | time from spec to shipped went from **roughly four months to about one** | "~50%", and any Jira citation |
| Expansion | multiplied platform stakeholders ~10x, brought on 10+ new partner groups, took the platform enterprise-wide | "1 to 5 studio groups" |

**"5 studio groups" is removed everywhere and must not come back.** It read as though Ethan
onboards studios, which he does not — the platform is enterprise-wide. "5 disciplines" is a
different fact and is correct.

**Never cite Jira** as a source, on the site or in the resume. The four-months-to-one framing is
the figure, and it needs no tooling citation.

| Product | Slug | URL | Status |
|---|---|---|---|
| Allison's Kitchen (formerly Stuart Pantry) | `allisons-kitchen` | allisonskitchen.app | INVITE — iOS build in UAT |
| NexusWatch | `nexuswatch` | nexuswatch.dev | LIVE — daily brief has real subscribers |
| Altogether (formerly Long Table, formerly Caravan; repo `caravan`) | `altogether` | longtable.dev | IN DEVELOPMENT |
| Gridiron | `gridiron` | no public URL | IN DEVELOPMENT |
| The Composer | `the-composer` | no public URL | IN DEVELOPMENT |
| Product OS | `product-os` | no public URL | IN DEVELOPMENT |
| Prototype Studio (formerly Zero to Ship) | `zero-to-ship` | zerotoship.app | LIVE — development dormant |

**The `zero-to-ship` slug is permanent.** The route and its case study predate the rename to
Prototype Studio, and changing it breaks both. There is a comment at the definition in
`constants.ts`; do not "tidy" it.

Order in `PROJECTS` is deliberate and is the order they render. Allison's Kitchen leads, and owns
its origin: built for one household first — Ethan's own — then opened to other families a few at a
time. That is the credibility, not something to soften.

**Gridiron is a NEW entry, not a rename.** It has no `formerly`, and the `/portfolio/quant-engine`
redirect stays pointed at `/portfolio` rather than at Gridiron.

### Gridiron and the trading platform are two different things — do not reconcile them

`public/resume.md` describes a **paper-traded systematic trading research platform** (walk-forward
evaluation, SEC EDGAR insider-signal modeling, no capital deployed) under "Personal AI/ML work".
That is a **separate project** and is **deliberately not on the site**.

Gridiron is the **sports forecasting** work: a forecasting and calibration testbed scored against
public closing lines.

They are not the same product, neither is a rename of the other, and the asymmetry is intentional —
the trading platform appears only on the resume, Gridiron only on the site. A future session will
be tempted to "reconcile" the two because both are quantitative modelling. **Do not.** Ask Ethan
before moving either one across.

The Composer's board is **ten personas** — an exact, deliberate count, restored after being
softened once. `resume-base.md` in home-base was corrected to match on 2026-08-23; the site was the
accurate side.

## DEAD FACTS — never reintroduce

These are wrong. If you find yourself about to write one, stop and re-read the table above.

- **nexuswatch.io** — belongs to another company (Eliciq Watch, a UK accounting SaaS). Linking it
  sends visitors to a competitor's pricing page. It returns a healthy 200.
- **nexuswatch.app** — does not resolve.
- **zerotoship.dev** — 404, deployment not found.
- **"eight products in flight"** — not a real count, and the reason no product count appears
  anywhere in copy. Not "six products", not "seven" — the register shows however many rows exist
  and a reader can count them. A count in copy is a fact that silently rots every time the
  portfolio changes, and it has been wrong at least twice. Copy was rewritten on 2026-08-23 to
  remove the last of them when Gridiron was added.
- **Meridian Intelligence, RidgeCap, Quant Engine, Sports ML Pipeline** — deleted 2026-08-22 on
  Ethan's instruction: constants, routes, and case studies all removed. Their URLs shipped to
  production and are indexed, so `next.config.ts` holds permanent redirects to `/portfolio`. Do not
  re-add the products, and do not remove the redirects.
- **Any live-capital or wagering language** — no "Kelly-sized bets," no "live odds," no "bankroll,"
  no "staking," no "shipped to live capital." This applies to Gridiron's copy and case study in
  particular. Gridiron is a forecasting and calibration testbed scored against public closing
  lines; describe it in those terms and no others.
- **Masthead** — dropped as a planned product on 2026-08-23. It was the multi-tenant
  productization of The Composer. Removed from the register, the case study, and metadata; the
  resume never mentioned it. Do not reintroduce it.
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
  "cross-functional team", "enterprise-wide").
- Tone: confident, not metrics-heavy. Personal brand, not corporate resume.

### Numbers exceptions — the rule targets UNVERIFIABLE claims, not specific ones

The no-exact-counts rule exists to stop unverifiable boasting. It does **not** exist to make the
site vague. Two categories of figure are explicitly allowed, and **must not be softened**:

**1. Sourced figures — the Operating Record** on `/` and `/about`. These may be exact precisely
because each carries its measurement method inline ("before and after the AI-native operating model";
"Marketing-mix-model attributed"). A figure with its method attached invites the check.

**2. Independently checkable product figures.** A number a reader can confirm for themselves in
under a minute, from a link already on the page, is evidence rather than a boast. NexusWatch's
"45+ live data layers across 86 countries" is the canonical case: the register links to
nexuswatch.dev, and the product's own metadata states "45+ live data layers on a 3D globe, 86
countries scored". Anyone can open it and count.

These were softened once, to "global country coverage", by misreading the rule as "no specifics
anywhere". That was wrong and Ethan reversed it. **Do not soften them again.** Specificity that
survives checking is the point of the whole page.

The test to apply: *can a reader verify this, and how?* If the answer is a measurement method or a
link, the figure stays exact. If the answer is "you'd have to take my word for it", cut it — do not
hedge it, do not round it, cut it.

A bare figure with neither method nor a way to check is still out. `/resume` is exempt — it renders
`public/resume.md`, which has its own detail level.

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

### Caching — why `/` is static and must stay that way

`src/app/page.tsx` declares `export const revalidate = false`, and `getLatestCommit()` uses
`cache: "force-cache"`. Both are deliberate.

A single fetch carrying `next: { revalidate }` anywhere in the home page tree promotes the whole
route from a static deployment artifact into a time-based ISR entry, which can then be served
**stale-while-revalidate across a deploy** — showing visitors the previous release behind a
perfectly healthy 200. This happened: `getLatestCommit()` had `revalidate: 600`, and `/` served the
pre-redesign home page after the redesign shipped. The build output announces it (`○ /  10m`), so
**read the Revalidate column after every build**; `/` must show no value there.

`/writing` and `/writing/[slug]` keep 1h ISR on purpose — their content is the Substack feed, which
changes independently of deploys. The tradeoff is that a *design* change to those two pages can be
masked for up to an hour. The smoke test covers them, so a stale one gets caught.

Query strings do **not** bust the cache for a prerendered route. Manual cache-busted checks will
happily show you the same page forever. Correctness comes from the page being static, not from
cache trickery.

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
- `npx playwright test` — route + content tests (chromium and, for the iPhone 14 project, **webkit**)
- `npm run smoke [url]` — content smoke test against a running site, defaults to localhost:3000

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

## Figma — projection of code, never a source

A Figma library of this design system exists: **"Register — Design System"**
(figma.com/design/kI3fVPePZ7fDxSMjKLBeyN). It is **generated FROM
`src/app/globals.css`** — 16 variables (13 colour with Light/Dark modes, 3 font;
`var()` code syntax throughout), 13 text styles including `prose/*` for the
Substack article rendering, and 6 components (StatusPill, CTALink, StripCell,
RecordFigure, TrackRow, RegisterRow), each description carrying its code path.

**This is the only Figma file for the site system.** A second file
(`NDE23DMCaOUG5buwVI8Eny`) briefly mirrored the same tokens; its unique content —
the `prose/*` styles and font variables — was merged here on 2026-08-23 and it is
retired. Do not maintain two. A separate file, `EK0jpuOsvP8QCs5y8swV3t`, holds the
three Substack **publication** values (accent `#059669`, background/cover
`#FAFAFA`) — that one is additive, not a mirror, and does not overlap.

Body and `prose` styles are Plex Sans **Light**: the CSS declares weight 350, but
the site loads statics 300/400/500/600, so font-matching resolves DOWN to 300.
Verified in-browser. Do not "correct" it to Regular.

Rules: code is canonical; when tokens change here, regenerate the Figma
variables — never edit them by hand, and never "sync" a Figma value back into
code. Known projection limits are documented on the file's Getting Started page
(weight 350→Regular, clamp() built at desktop max, --measure/--pad code-only).
Use the file for exploring future changes and for product design work — not as
a mirror to keep current for its own sake.

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
- Run `npm run lint`, `npx tsc --noEmit`, `npx playwright test`, and `npm run smoke` before
  claiming done. **A 200 is not evidence that your build shipped** — assert on response bodies.
  `scripts/smoke.sh` fetches each page individually on purpose: passing several URLs to one curl
  concatenates the responses, and a string missing from one page is masked by another.
- CI does this for you. `.github/workflows/verify.yml` gates every PR and push;
  `smoke-production.yml` runs the content smoke against the live domain after each production
  deploy and once daily.

## Shared Context — home-base

Part of a portfolio managed from `~/Projects/home-base`:

- `~/Projects/home-base/registry.md` — project registry
- `~/Projects/home-base/standards/quality.md` — shared quality standards
- `~/Projects/home-base/standards/design-principles.md` — design philosophy
- `~/Projects/home-base/standards/design-toolkit.md` — skills, component libraries, references
- `~/Projects/home-base/personal/CLAUDE.local.md` — who Ethan is, how he works

Use `/brand-guidelines` for brand identity. Use `/frontend-design` for new UI work.
