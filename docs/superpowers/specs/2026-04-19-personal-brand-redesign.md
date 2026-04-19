# ethancstuart.com — Full Redesign Spec
**Date:** 2026-04-19  
**Status:** Approved for implementation

---

## 1. Overview & Goals

Complete visual and content overhaul of ethancstuart.com. The current site positions Ethan primarily as a corporate product executive with side projects. The redesigned site presents a unified identity: **builder first, Data & AI domain expert, product leader at scale**.

### Primary Goals
- Establish the "Unified Thesis": Fortune 50 AI product leadership + solo founder building 6 live AI products
- Update all projects (remove DashPulse/old Family Planner, add NexusWatch, Meridian, RidgeCap, Quant Engine, updated Family Planner)
- Deliver a visually distinctive, premium design that stands out from generic "AI startup site" aesthetics
- Feel welcoming and professional, not intense or hacker-coded

### Audience
1. Potential employers / VP+ opportunities — career credibility anchor
2. Potential users of Ethan's products — builder credibility
3. Newsletter audience / thought leadership — The Data Product Agent

---

## 2. Positioning & Narrative

### The Unified Thesis
*"I build AI systems at Fortune 50 scale and ship them as a solo founder. The gap between managing data and actually building with it is closing fast. I work on both sides of that wall."*

### Identity Hierarchy
1. **Builder** — ships real AI products in production (primary identity)
2. **Data & AI** — the domain; enterprise platforms and solo AI systems
3. **Product Leadership** — stands up teams, operating models, platforms at scale

### Headline (locked)
```
Building where      ← Instrument Serif italic, muted
DATA & AI           ← Syne 800, full weight, near-black
become products.    ← Instrument Serif italic, olive-green accent
```

---

## 3. Design System

### Color Palette
```
Background:   #f2ede3  (warm cream/parchment — primary)
Surface:      #ede8de  (slightly deeper cream — cards, aside)
Deep:         #e4dfd4  (screenshot areas, image placeholders)
Text:         #131110  (near-black, warm undertone)
Text Mid:     rgba(19,17,16,0.5)
Text Low:     rgba(19,17,16,0.28)
Muted:        #9a9288
Mid:          #706860
Accent:       #5a8000  (olive-green — primary accent)
Accent Soft:  rgba(90,128,0,0.07)
Accent Mid:   rgba(90,128,0,0.15)
Border:       rgba(19,17,16,0.07)
Border Lo:    rgba(19,17,16,0.05)
```

**Status colors:**
- Live: `#5a8000` (accent green, matches olive)
- Building: `#d4900c` (amber)

### Typography
```
Display serif:   Instrument Serif — italic weight only, used for qualifiers and emotional lines
Display sans:    Syne 800 — all primary headlines and section titles
Body:            Syne 400/600 — body copy, descriptions, subheads
Labels/mono:     JetBrains Mono 400/500 — all labels, tags, status text, nav links, numbers
```

**Type scale:**
- Hero headline line 2 (domain): clamp(58px, 8.5vw, 114px), Syne 800
- Hero headline lines 1 & 3: clamp(36px, 4.2vw, 58px), Instrument Serif italic
- Section titles: 36px Syne 800
- Feature card name: 38px Syne 800
- Card names: 18px Syne 800
- Body copy: 15–16px Syne 400, line-height 1.8
- Labels: 9–11px JetBrains Mono, letter-spacing 0.1–0.2em, uppercase
- Tags: 8–9px JetBrains Mono

### Animation Principles
- **Entrance**: `clipup` (translateY from 108% to 0) for headlines; `fadeUp` (opacity + translateY) for everything else
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, soft landing
- **Stagger**: 0.12s between sequential elements
- **Hover**: translateY(-2px) on cards, border-color transitions, opacity reveals on arrows
- **Live dots**: `pulse` keyframe on status indicators, 3s infinite
- **Ticker**: `marquee` keyframe, 28s linear infinite (slow enough to read)
- **No**: floating blobs, scanlines, particle systems — removed for professionalism

### Spacing
- Page max-width: 1280px
- Page horizontal padding: 56px
- Section vertical padding: 100px top / 120px bottom
- Card internal padding: 20–48px depending on size
- Split layout column gap: 80px

### Ambient Glow (subtle)
Very faint radial gradients in olive-green at top-right and bottom-left corners. Opacity 0.04–0.05. Not visible on first glance — provides depth without atmosphere.

---

## 4. Site Structure

### Navigation
```
Logo (Instrument Serif italic "Ethan Stuart") | About · Work · Writing | [pulse dot] "Open to conversation"
```
- Fixed, 64px height
- Background: rgba(242,237,227,0.92) with backdrop-blur(20px)
- No mobile hamburger needed for MVP — collapse links on small screens
- No "Contact" in main nav — replaced with the open/available dot indicator

### Pages
1. **/** — Home (hero + about preview + portfolio preview + writing preview)
2. **/about** — Full about page
3. **/portfolio** — Full portfolio listing  
4. **/portfolio/[slug]** — Individual case study (keep existing structure)
5. **/writing** — Writing index (Substack feed, existing)
6. **/writing/[slug]** — Article page (existing)
7. **/resume** — Resume page (existing, not in main nav)
8. **/contact** — Contact page (existing, not in main nav)

---

## 5. Section Designs

### 5.1 Hero (Home Page)

**Layout:** Full-viewport split — left content (flex col, space-between), right project manifest

**Left column:**
1. Eyebrow pill: `[pulse dot] Active builder / Data & AI Product Leader`
2. Headline (3 lines with staggered clipup animation):
   - Line 1: *"Building where"* — Instrument Serif italic, text-mid color
   - Line 2: **"DATA & AI"** — Syne 800, full text color
   - Line 3: *"become products."* — Instrument Serif italic, accent green
3. Subhead: 15px Syne, muted color, max-width 520px
4. Pillars bar: 3 columns, left-border divider style
   - 01 — Builder: "Six AI products in production"
   - 02 — Domain: "Data & AI systems"
   - 03 — Leadership: "Product orgs at scale"
   - Hover: border-color shifts to accent, top accent line slides in
5. CTA row: `[View the work ↗]` `[Read writing]` `The Data Product Agent →`

**Right column (360px):**
- Header: "Selected work" + count "06"
- 6 project rows, each: number / name + type / status dot / hidden arrow (reveals on hover)
- Full-width hover highlight in accent-soft
- Bottom: credential stack (Currently / Previously / Newsletter)

**Bottom:** Ticker strip (36px, 28s marquee) — scrolling list of: Data Platforms · AI Systems · Product Leadership · NexusWatch · Meridian Intelligence · Zero to Ship · Quant Engine · RidgeCap · Disney Studios Technology · The Data Product Agent

**Left column accent:** 2px vertical rule on far left, gradient from accent to transparent, 48px tall from top of content

### 5.2 About Page

**Structure:**
1. **Section label** — `[line] ABOUT` in JetBrains Mono
2. **Manifesto opener** — Large Instrument Serif italic quote, max-width 820px, decorative opening quote mark in accent
   > *"The gap between managing data and actually building with it is closing fast. I've spent my career working on both sides of that wall — and I think that's the only place worth being right now."*
3. **Narrative + Aside grid** (1fr + 300px):
   - Left: 3 paragraphs of story copy + 1 pull quote (border-left accent, Instrument Serif italic 20px)
   - Right (sticky): Headshot photo + 4 fact cards (Currently / Domain / Education / Newsletter)
4. **Career Arc** — horizontal timeline with 4 stops:
   - Capital Group 2018–2020 → Sprout 2020–2022 → Taco Bell 2022–2023 → Disney 2023–Present (lit in accent)
   - Connected line behind dots, gradient from border to accent
5. **Philosophy Strip** — slightly deeper cream surface, border-radius 16px
   - 3 principles in Instrument Serif italic (17px) + JetBrains Mono explanation
   - 01: "Build to understand, not just to ship."
   - 02: "Clarity is the product."
   - 03: "The org is part of the system."

**Copy note:** No exact dollar amounts, team sizes, or percentages. Vague scale signals OK ("Fortune 50", "hundreds of stakeholders", "six products").

### 5.3 Portfolio Page

**Section header:**
- Label: `[line] SELECTED WORK`
- Title: `Six products.` + `*All live in 2025.*` (Instrument Serif italic muted)
- Right: "View all case studies ↗" link

**Featured card (NexusWatch):**
- 2-column grid: content left (1fr) + screenshot right (380px)
- Content: status pill, number "01 / 06", big name (38px Syne 800), type, description, tech tags, CTAs
- Screenshot: browser chrome mockup with faux screenshot elements; use real screenshot when available
- Hover: border-color to accent, box-shadow lifts, arrow reveals

**2-column editorial grid (remaining 5 projects):**
- Meridian, Zero to Ship, RidgeCap, Quant Engine, Family Planner
- Each card: mini screenshot header (80px) + body (number, status dot, name 18px, type, description, tags)
- Hover: translateY(-2px), border-color shift, arrow reveals
- Family Planner: include as 5th card; if odd number, span full width or use 3-col on last row

**Project data to update in constants.ts:**
| Remove | Add/Update |
|--------|-----------|
| DashPulse | NexusWatch |
| Family Planner (old) | Meridian |
| — | RidgeCap |
| — | Quant Engine |
| — | Family Planner (Lovable version) |
| Zero to Ship | Zero to Ship (updated copy) |

### 5.4 Writing Page
Keep existing structure (Substack RSS feed). Apply new design system: cream background, updated typography tokens, section label pattern.

### 5.5 Footer
- Simple 2-row footer on cream surface with slightly deeper border-top
- Row 1: Logo (Instrument Serif italic) + nav links + social links (GitHub, Twitter/X, LinkedIn)
- Row 2: JetBrains Mono small — © Ethan Stuart · The Data Product Agent → · Built with Next.js

---

## 6. Component Inventory

### New / Heavily Modified
- `Hero` — full rewrite: split layout, new typography, pillars, project manifest, ticker
- `Nav` — update: remove Contact CTA, add availability dot, apply cream theme
- `Section` — update: cream backgrounds, new border tokens
- `PortfolioCard` — rewrite: mini screenshot header + editorial body
- `FeaturedProjectCard` — new: large 2-col card for NexusWatch
- `Ticker` — new: marquee strip component
- `CareerArc` — new: horizontal timeline for About page
- `PhilosophyStrip` — new: 3-principle card block
- `ManifestoOpener` — new: large italic quote with decorative mark
- `PullQuote` — new: border-left accent quote block

### Keep / Minor Updates
- `PostCard` — apply new type tokens
- `SubscribeCTA` — apply new cream surface style
- `Footer` — light update
- `ThemeToggle` — remove (cream is the single theme; no toggle needed)
- `JsonLd`, `SeoHead` — no change

---

## 7. globals.css Token Updates

```css
:root {
  --background:       #f2ede3;
  --foreground:       #131110;
  --muted:            #ede8de;
  --muted-foreground: #9a9288;
  --border:           rgba(19,17,16,0.07);
  --accent:           #5a8000;
  --accent-foreground:#ffffff;
  --card:             #ede8de;
  --card-foreground:  #131110;
}
/* Dark mode: retain existing dark tokens for potential future use */
```

Font imports: Add `Instrument Serif` and `Syne` via `next/font/google`. Replace Inter. Keep JetBrains Mono.

---

## 8. Content Updates Required

### Projects (constants.ts)
- **Remove:** DashPulse, Family Planner (old version)
- **Add:** NexusWatch, Meridian, RidgeCap, Quant Engine
- **Update:** Zero to Ship (copy refresh), Family Planner (Lovable version URL + description)

### About Page Copy
- Update Disney description to reflect current role
- Remove DashPulse reference, replace with NexusWatch + Meridian
- Add "six products live in 2025" framing

### Portfolio Screenshots
- Take new screenshots for all 6 projects
- Place in `public/portfolio/` following existing naming convention
- P2 bug: flag any stale screenshots post-implementation

### Resume
- Sync from home-base via `scripts/sync-resume.sh` before final build

---

## 9. Implementation Notes

### Tech Stack (unchanged)
Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, Vercel

### Tailwind v4 Notes
- Use `@theme inline` block in globals.css for token updates
- CSS variable names must match Tailwind convention

### Framer Motion
- Use `motion.div` with `initial/animate/transition` for hero entrance animations
- Use `viewport` prop for below-fold section reveals
- Keep bundle impact low: import only used features

### Performance
- `next/font/google` for Instrument Serif, Syne, JetBrains Mono (subsetting automatic)
- All portfolio screenshots: WebP format, sized to display dimensions
- Featured card screenshot: lazy-loaded, sized 380×400px

### No New Dependencies
All animation and design achievable with Framer Motion (already installed) + Tailwind + CSS custom properties. No new packages needed.

---

## 10. Out of Scope

- Dark mode toggle (cream is the single theme)
- Contact form redesign
- New Substack integration (keep existing RSS)
- Mobile-specific designs (responsive via existing Tailwind breakpoints)
- New pages (resume, API routes unchanged)
