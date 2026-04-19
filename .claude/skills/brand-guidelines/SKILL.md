---
name: brand-guidelines
description: >
  Auto-apply Ethan Stuart's personal brand identity to all UI work. Trigger when building
  pages, sections, components, or any visual element. Ensures consistent blue accent,
  confident-but-approachable tone, and portfolio cohesion.
---

# Ethan Stuart Brand Website Guidelines

You are building UI for **ethancstuart.com** — Ethan's personal brand website.
Three functions: career credibility, builder narrative, and course funnel. Apply without exception.

## Brand Personality
- **Confident but not metrics-heavy** — personal brand, not corporate resume
- "Product & Technology Leader" focused on enterprise data/AI
- "Turning complex data into products people actually use"
- Builder narrative: shows portfolio progression, not just claims
- **No exact counts, dollar amounts, or percentages in public copy** — vague scale signals OK

## Colors

### Dark Mode (Default)
| Token | Value | Use |
|-------|-------|-----|
| Background | `#0A0A0A` | Page background |
| Foreground | `#FAFAFA` | Primary text |
| Card | `#141414` | Card backgrounds |
| Accent | `#3B82F6` | Interactive elements (BLUE) |
| Accent Foreground | `#FFFFFF` | Text on accent |
| Muted | `#171717` | Secondary backgrounds |
| Muted Foreground | `#A3A3A3` | Secondary text |
| Border | `#262626` | Borders |

### Light Mode
| Token | Value | Use |
|-------|-------|-----|
| Background | `#FAFAFA` | Page background |
| Foreground | `#0A0A0A` | Primary text |
| Card | `#FFFFFF` | Card backgrounds |
| Accent | `#2563EB` | Interactive elements |
| Muted Foreground | `#737373` | Secondary text |
| Border | `#E5E5E5` | Borders |

## Typography
| Role | Font | Notes |
|------|------|-------|
| Body / Headings | **Inter** | Primary sans-serif, bold for headings |
| Labels / Tags / Navigation | **JetBrains Mono** | Uppercase, small, monospace |

- Hero headings: 5xl-7xl (56-84px), `line-height: 1.08`
- Section headings: 2xl-3xl
- Body: 16-18px
- Labels: 12-14px monospace, uppercase

## Section Pattern (Mandatory)
1. Monospace uppercase label (e.g., "PRODUCT & TECHNOLOGY LEADER")
2. Bold heading (h1-h6)
3. Muted description text

## Component Rules
- Cards: border-based (`border border-border`), no heavy shadows
- Header: `backdrop-blur-xl` frosted glass effect, `border-b border-border/50`
- Buttons: primary (solid dark bg + light text), secondary (border variant)
- Tags/labels: monospace, uppercase, muted background
- Navigation: smooth underline animation via Framer Motion spring (`stiffness: 350, damping: 30`)

## Motion
- Entry animations: fade + slight vertical translate
- Hover feedback: color transitions, subtle icon movement (0.5px)
- Scroll-triggered reveal with viewport tracking
- Spring physics for nav indicators
- **Disable transitions on theme switch**

## Technical Context
- Framework: Next.js 16 + React 19 + Tailwind v4
- Theme: next-themes, class-based (default: dark)
- Animation: Framer Motion
- Content: Substack RSS feed, resume PDF generation (jsPDF)
- Analytics: Vercel Analytics + Speed Insights

## Never Do
- Include exact metrics, dollar amounts, or percentages in public copy
- Use shadows instead of borders
- Break the monospace-label → heading → description section pattern
- Use any accent other than blue
- Make the tone boastful or metrics-heavy — confident and understated
