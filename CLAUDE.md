# Public Brand Website

## Project Overview
Personal brand website for Ethan Stuart. Serves three purposes equally: career credibility, builder narrative, and (eventually) course funnel. Tone is confident but not metrics-heavy — personal brand, not corporate resume.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion (animations)
- Vercel (hosting + analytics + speed insights)
- jsPDF (resume PDF generation)
- rss-parser (Substack feed)

## Architecture
- Static-first: most pages are statically generated at build time
- Substack posts fetched via RSS with 1hr revalidation
- Resume parsed from markdown (public/resume.md) at build/request time
- Portfolio projects defined in constants.ts with case study pages via [slug]
- No database, no auth, no CMS

## Key Commands
- `npm run dev` — start dev server
- `npm run build` — sync resume + production build
- `npm run sync-resume` — copy resume from home-base to public/

## Nav Structure
Home, About, Portfolio, Writing (4 links in nav)
Resume and Contact exist but are not in the main nav.

## Conventions
- No exact counts, dollar amounts, or percentages in public copy — but vague scale signals are OK (e.g., "cross-functional team", "hundreds of stakeholders", "Fortune 50")
- Dark theme default
- Monospace for labels/tags, sans-serif for body
- Section pattern: mono uppercase label → bold heading → muted description
- Portfolio projects: static screenshot previews on cards, live iframes on case study pages

## File Structure
```
src/
  app/              # Pages (about, portfolio, resume, contact, writing, api/)
  components/       # Shared components (nav, hero, footer, section, etc.)
  lib/              # Constants, resume parser, substack fetcher, JSON-LD
public/
  portfolio/        # Static preview screenshots
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
- Flag any portfolio screenshots that are now stale due to changes made. Format: `Screenshot needed: [project] — [what changed]`. Add to Bugs & Issues as P2.
- If a new portfolio project was added or removed, verify src/lib/constants.ts is updated and the public/portfolio/ screenshot exists.

Site serves three purposes: career credibility, builder narrative, course funnel. All copy: no exact counts or dollar amounts.

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
- No exact numbers, team sizes, or dollar amounts in site copy — vague scale signals are OK
- Resume synced from home-base via scripts/sync-resume.sh
- Portfolio screenshots in public/portfolio/ — retake when apps change significantly
- Course represented as portfolio project until ready for its own page
