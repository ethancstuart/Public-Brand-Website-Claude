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
- No specific metrics/numbers in public copy (outcome-focused, not metrics-heavy)
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

## Shared Context — home-base
This project is part of a portfolio managed from ~/Projects/home-base.
Before planning features or making architectural decisions, reference:
- `~/Projects/home-base/registry.md` — project registry and cross-project alignment
- `~/Projects/home-base/standards/quality.md` — shared quality standards
- `~/Projects/home-base/standards/design-principles.md` — shared design philosophy
- `~/Projects/home-base/personal/CLAUDE.local.md` — who Ethan is, how he works

## Important Notes
- No specific numbers, team sizes, or dollar amounts in site copy
- Resume synced from home-base via scripts/sync-resume.sh
- Portfolio screenshots in public/portfolio/ — retake when apps change significantly
- Course represented as portfolio project until ready for its own page
