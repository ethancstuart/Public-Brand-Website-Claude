---
name: brand-guidelines
description: >
  Auto-apply Ethan Stuart's shipped Register design system to all UI work. Trigger when
  building pages, sections, components, or any visual element for ethancstuart.com.
  Blue-biased neutrals, one accent, semantic status colours, near-zero motion.
---

# Register — brand guidelines for ethancstuart.com

**`src/app/globals.css` is the source of truth.** This file summarises it. If the two
ever disagree, globals.css wins and this file is stale — fix it.

The audience is committees hiring a Director/VP of AI Product. The site must read as
*"ships infrastructure"*, not *"designs portfolios"*. Restraint is the argument.

> This skill previously described a retired identity (`#3B82F6` blue on `#0A0A0A`
> dark-default, Inter/JetBrains Mono). That system is **gone** — replaced by the Register
> in the v3 redesign. Do not build from it, and do not restore it from memory or from any
> older document.

## Colour — use the CSS variables, never literals

Blue-biased neutrals. Light is the default ground; dark follows the viewer's system
preference and is overridable with `data-theme`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ground` | `#FBFBF9` | `#101318` | page background |
| `--ground-sunk` | `#F2F2EF` | `#171B21` | row hover, inset blocks |
| `--ink` | `#14181F` | `#E6E9EE` | primary text |
| `--ink-soft` | `#4A5260` | `#A2ABBA` | prose, descriptions |
| `--ink-faint` | `#646B77` | `#7F8795` | eyebrows, metadata |
| `--rule` | `#DFDFDA` | `#262B33` | row dividers |
| `--rule-strong` | `#C3C4C0` | `#39404B` | section top rules |
| `--accent` | `#23478C` | `#86A9E5` | the ONLY accent |
| `--accent-soft` | `#EDF1F9` | `#1A2130` | accent-tinted surfaces |

**Status colours are semantic and separate from the accent** — `--live` `--invite`
`--building` `--quiet`. They describe state, never identity. **Never colour a product by
who it is.** The retired nine-accent per-project scheme is gone for good.

Every foreground/ground pair clears WCAG AA (4.5:1) in both modes. `--ink-faint` sits at
5.18:1 light / 5.14:1 dark and was raised specifically to clear it — do not lighten it.

## Type

- **IBM Plex Sans** — body and UI. Body is `font-weight: 350`, which resolves to the
  loaded **300** static (no 350 face exists). Design at Light.
- **IBM Plex Mono** — labels, status, metadata. `.eyebrow`: 11px/500, `0.13em`, uppercase.
- **Newsreader** — display and judgment lines only.

Never reintroduce Syne, Bricolage Grotesque, Instrument Serif, or DM Mono.

## Layout — a register, not a gallery

- Rules and rows, tabular alignment, `.tnum` on anything numeric. **No cards.**
- **No decorative 01/02/03 numbering** — the projects are not a sequence.
- Reuse the primitives in globals.css: `.wrap`, `.ledger`, `.cols` + `.cols-3`/`.cols-4`,
  `.eyebrow`, `.cta`. Do not re-derive dividers per component.
- **Near-zero motion.** Nothing animates on scroll. No animation library is installed —
  do not add one to "add polish".

## Copy

- Status is literal: `live` = a stranger can use it today. An unflattering status is the
  point, not a bug.
- Renames are history — use `formerly`, never a second entry, and never change a slug.
- No product counts. No exact counts or team sizes, with two exceptions: the Operating
  Record (each figure carries its measurement method inline) and figures a reader can
  verify from a link already on the page. See CLAUDE.md → "Numbers exceptions".

## Reference

Figma: **Register — Design System**, `kI3fVPePZ7fDxSMjKLBeyN` — a regenerable projection
of globals.css, never a source. Full conventions live in this repo's `CLAUDE.md`.
