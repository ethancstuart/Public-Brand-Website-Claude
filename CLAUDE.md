# Public Brand Website

## Project Overview
Personal brand website for Ethan Stuart. Serves three purposes equally: career credibility, builder narrative, and services funnel. The audience is committees hiring a Director/VP of AI Product — the register must read as "ships infrastructure," not "designs portfolios." Tone is confident but not metrics-heavy — personal brand, not corporate resume.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- No animation library. Motion is near-zero by design (redesign-v3-register).
- Vercel (hosting + analytics + speed insights)
- rss-parser (Substack feed)

## Architecture
- Static-first: most pages are statically generated at build time
- Substack posts fetched via RSS with 1hr revalidation
- Resume parsed from markdown (public/resume.md) at build/request time
- Six products defined in `src/lib/constants.ts` (PROJECTS); case-study prose in `src/lib/case-studies.ts`, rendered via portfolio/[slug]
- No database, no auth, no CMS

## Key Commands
- `npm run dev` — start dev server
- `npm run build` — sync resume + production build
- `npm run sync-resume` — copy resume from home-base to public/

## Nav Structure
Home, About, Portfolio, Writing (4 links in nav)
Resume and Contact exist but are not in the main nav. Home also carries in-page anchors: #work, #method, #record, #track, #contact.

## Conventions — the register
- **A register, not a gallery.** Rules and rows, tabular alignment, `.tnum` on anything numeric. No cards, no decorative 01/02/03 numbering — the projects are not a sequence.
- **Type**: IBM Plex Sans (body/UI), IBM Plex Mono (labels/status/metadata), Newsreader (display and judgment lines). Do not reintroduce Syne, Bricolage Grotesque, Instrument Serif, or DM Mono.
- **Colour**: blue-biased neutrals. Ground `#FBFBF9` light / `#101318` dark, following the viewer's system preference (`data-theme` overrides). One accent: `#23478C` / `#86A9E5`. Status colours are semantic and separate — live, invite, building, paused. Never colour a product by identity.
- **Near-zero motion.** The restraint is the argument. Nothing animates on scroll.
- **Layout primitives** live in globals.css: `.wrap`, `.ledger`, `.cols` + `.cols-3`/`.cols-4`, `.eyebrow`, `.cta`. Use them rather than re-deriving dividers per component.
- **Status is literal.** `live` = a stranger can use it today. `invite` = real users behind a gate. `building` = not yet in anyone's hands. `paused` = exists, not being worked on. Never inflate a status; an unflattering one is the point.
- **Renames are history, not new products.** Use `formerly?` on the project so the alias trail shows. Never change an existing slug — `zero-to-ship` stays `zero-to-ship` even though the product is now Prototype Studio, because the route and its case study depend on it.

### Numbers in copy
No exact counts, dollar amounts, or percentages in public copy. Vague scale signals are fine ("cross-functional team", "Fortune 50", "five studio groups").

**One standing exception:** the Operating Record on `/` and `/about`. Those figures may be exact *because each one carries its measurement method inline* ("Jira cycle-time, 6-month rolling"; "MMM-attributed"). A figure that cannot be sourced does not go there — and does not go anywhere else either.

## File Structure
```
src/
  app/              # Pages (about, portfolio, resume, contact, writing, api/)
  components/       # nav, footer, section, register, blocks, post-card, live-indicators
  lib/              # Constants, case studies, resume parser, substack fetcher, JSON-LD
public/
  resume.md         # Resume source (synced from home-base)
  headshot.jpg
scripts/
  sync-resume.sh    # Copies resume from home-base
```

## Notion Context
This project is tracked in Notion under Personal Brand → ethancstuart.com.
- **ethancstuart.com page:** `33945c2d-baf4-8175-b1ed-f03743e147e5`
- **Technical Architecture:** `33945c2d-baf4-8167-a50d-cd87ced86e91`
- **Bugs & Issues:** `33945c2d-baf4-81f6-9752-d09e5b5982df`
- **Personal Brand section:** `33945c2d-baf4-81c6-beba-d4baa85436ab`
- **Career Hub:** `33945c2d-baf4-814e-a4d4-d54b9e9f84f0`
- **Target Roles & Companies:** `33945c2d-baf4-8199-9ef7-e2a39d5a9847`
- **Portfolio Narrative:** `33945c2d-baf4-81b7-b4eb-ec364beae923`
- **Session Brief (global):** `33945c2d-baf4-81df-bdcf-f10616ef92cf`
- **Weekly Execution Brief (global):** `33945c2d-baf4-81d6-8e6e-e401346c03d1`
- **Prompt Library (global):** `33945c2d-baf4-81dc-9f20-c8f04a134c5f`

### Bugs & Issues Severity
- **P0 — Critical**: site down, broken auth, broken contact form, crashes in core flows. Drop everything and fix immediately.
- **P1 — High**: broken page, bad layout, broken links. Fix in current session before starting new work.
- **P2 — Normal**: cosmetic issues, copy tweaks, minor UX degradation. Fix in order when capacity allows.
Always label new bugs with their severity tier.

### Session start — read in this order:
1. **Weekly Execution Brief** — read the most recent week entry for priority context.
   - **Staleness check**: if the most recent entry is more than 7 days old or the page is empty, flag this immediately and ask Ethan for today's priorities before proceeding.
2. **Session Brief** — check for a same-day brief. Overrides the weekly brief if present.
3. **Bugs & Issues** — check for any OPEN items. P0 blocks all other work. P1 blocks new features unless brief says otherwise.
4. **ethancstuart.com page** — read to understand current site priorities and copy rules.
5. Then begin work.

### Session end — always:
- Note what was changed this session (copy, components, portfolio projects).
- If a product was added, removed, or renamed, verify `src/lib/constants.ts` and `src/lib/case-studies.ts` agree, and that any rename kept its slug and gained a `formerly` entry.
- Re-verify any project URL that changed. The register links to live products; a 404 in the register is a P1.

Site serves three purposes: career credibility, builder narrative, services funnel. All copy: no exact counts or dollar amounts, except the sourced Operating Record.

## Shared Context — home-base
This project is part of a portfolio managed from ~/Projects/home-base.
Before planning features or making architectural decisions, reference:
- `~/Projects/home-base/registry.md` — project registry and cross-project alignment
- `~/Projects/home-base/standards/quality.md` — shared quality standards
- `~/Projects/home-base/standards/design-principles.md` — shared design philosophy
- `~/Projects/home-base/standards/design-toolkit.md` — skills, component libraries, and design references
- `~/Projects/home-base/personal/CLAUDE.local.md` — who Ethan is, how he works

When designing UI, consult the design toolkit before building components from scratch.
Use `/brand-guidelines` to auto-apply this project's brand identity.
Use `/frontend-design` for intentional aesthetic direction on new UI work.

## Important Notes
- No exact numbers, team sizes, or dollar amounts in site copy — except the sourced Operating Record (see Conventions)
- Resume synced from home-base via scripts/sync-resume.sh. `public/resume.md` is the source of truth for career history — the Track in constants.ts must match it.
- The register carries no screenshots. Products are described in prose and linked live.
- Prototype Studio (formerly Zero to Ship) sells working sessions, guides, and agent-system setup — it is no longer a course. Do not describe it as one.
