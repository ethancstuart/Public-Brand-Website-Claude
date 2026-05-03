# Personal Brand Redesign v2 — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ethancstuart.com on a new branch in the dark/kinetic foundation direction (site-v7) — full design-system swap, all 8 routes restyled, kinetic hero with placeholder gradient, no advanced motion yet. Branch is shippable on its own; Phase 2/3 build on top.

**Architecture:** Long-lived branch `redesign-v2`. Replace Tailwind + globals tokens. Wire 4 new fonts. Add Lenis smooth-scroll provider at root. Rewrite shell (Nav, Footer, BottomMarquee, Section). Rewrite Hero. Build FeaturedRow + LabStrip components. Restyle existing pages route-by-route. Cream theme remains on `main`; nothing ships to production until Phase 3 completes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, next/font/google (Syne, Bricolage Grotesque variable, Instrument Serif, DM Mono), Lenis (smooth scroll), GSAP + @gsap/react (entrance animations), Framer Motion 12 (already installed).

**Spec:** `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md` — sections referenced as §N below.

**Resolved open items (locked here, override §11 of spec):**
- Hero copy: keep "ETHAN STUART SHIPS" kinetic hero; "Building where DATA & AI become products." goes on About page as manifesto opener
- Custom cursor: deferred to Phase 2 (case-study pages only)
- Arb Engine: NOT included in v1; Modeling Lab launches with Quant Engine + Sports ML Pipeline (2 vignettes)
- Case-study v1 status: Phase 2 concern (this plan stops at home + thematic strips)
- Rollout: long-lived `redesign-v2` branch, no feature flag, no merge until Phase 3 ships

**Files in scope (this phase):**
```
NEW:
  src/components/bottom-marquee.tsx
  src/components/lab-strip.tsx
  src/components/featured-row.tsx
  src/components/smooth-scroll-provider.tsx
  src/lib/motion.ts

MODIFY:
  src/app/globals.css
  src/app/layout.tsx
  src/app/page.tsx
  src/app/about/page.tsx
  src/app/portfolio/page.tsx          (Phase-1 stub — full magazine spreads come in Phase 2)
  src/app/writing/page.tsx
  src/app/writing/[slug]/page.tsx
  src/app/resume/page.tsx
  src/app/contact/page.tsx
  src/components/nav.tsx
  src/components/hero.tsx
  src/components/footer.tsx
  src/components/section.tsx
  src/components/post-card.tsx
  src/components/portfolio-card.tsx   (becomes Phase-1 row preview; full magazine spread in Phase 2)
  src/lib/constants.ts
  package.json

DELETE:
  src/components/featured-project-card.tsx   (replaced by featured-row.tsx)
  src/components/ticker.tsx                  (replaced by bottom-marquee.tsx)
```

**Verification approach:** This codebase has no component test suite. Each task verifies via:
1. `npx tsc --noEmit` (TypeScript strict — must be clean)
2. `npm run build` (must succeed — exposes Next.js / Tailwind / font issues)
3. `npm run dev` and visit the relevant route — verify visually
4. Commit only after all three pass

A Playwright smoke test for route rendering ships at the end (Task 24) as the closing safety net.

---

### Task 1: Create the long-lived feature branch

**Files:** none yet (git operation only)

- [ ] **Step 1: Confirm clean working tree on main**

```bash
git status
```
Expected: `nothing to commit, working tree clean` (or only the previously committed Phase 1 plan + spec on `main`).

- [ ] **Step 2: Create + switch to redesign branch**

```bash
git checkout -b redesign-v2
git push -u origin redesign-v2
```
Expected: branch created locally and pushed; output shows `Branch 'redesign-v2' set up to track 'origin/redesign-v2'`.

- [ ] **Step 3: Confirm Vercel preview will not auto-promote**

In `~/Projects/Public-Brand-Website-Claude/.vercel/project.json`, the project ID is `prj_5rcjTWosM58uzZ1Qlqnw0Pv9Uhba`. Vercel only promotes `main` → production. The `redesign-v2` branch will get a unique preview URL on every push but will NOT touch `ethancstuart.com`. No action required — just confirm.

```bash
vercel inspect $(vercel ls public-brand-website-claude 2>/dev/null | grep -m1 'Production' | awk '{print $4}') 2>&1 | grep '^  alias\|^    ╶'
```
Expected: `ethancstuart.com` listed only on the production deployment built from `main`.

---

### Task 2: Install Phase 1 dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Lenis + GSAP**

```bash
npm install lenis gsap @gsap/react
```
Expected: `package.json` and `package-lock.json` updated; no peer-dependency warnings against React 19 / Next 16.

- [ ] **Step 2: Verify the lockfile change**

```bash
git diff package.json | head -20
```
Expected diff (versions may be newer):
```diff
+    "@gsap/react": "^2.1.x",
+    "gsap": "^3.13.x",
+    "lenis": "^1.x.x",
```

- [ ] **Step 3: Run a sanity build**

```bash
npm run build
```
Expected: build succeeds. (No code uses these libraries yet — this just verifies install didn't break anything.)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(redesign-v2): install lenis + gsap for phase 1 motion"
git push
```

---

### Task 3: Replace design tokens in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Read the current globals.css**

```bash
cat src/app/globals.css
```
Note the current cream tokens (`--background: #f2ede3` etc.) — these are about to be replaced.

- [ ] **Step 2: Replace the file contents entirely**

Write `src/app/globals.css` with this exact body (Tailwind v4 syntax — uses `@theme` directive):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme inline {
  --color-bg:        #060608;
  --color-surface:   #0c0c10;
  --color-paper:     #d8d4cc;
  --color-paper-mid: rgba(216, 212, 204, 0.55);
  --color-paper-dim: rgba(216, 212, 204, 0.28);
  --color-paper-low: rgba(216, 212, 204, 0.14);
  --color-rule:      rgba(216, 212, 204, 0.07);

  /* Brand accents */
  --color-arctic:  #8ecfe8;
  --color-indigo:  #8b72d8;

  /* Per-project colors */
  --color-nx:   #8ecfe8;
  --color-cm:   #8b72d8;
  --color-po:   #d4a76a;
  --color-zts:  #78c4a0;
  --color-ml:   #b85aa0;
  --color-re:   #c8a84a;

  /* Signal accent — reserved for high-stakes CTA */
  --color-signal: #ff5320;

  /* Typography */
  --font-display: var(--font-syne), ui-sans-serif, system-ui, sans-serif;
  --font-display-alt: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-italic: var(--font-instrument), ui-serif, serif;
  --font-mono:   var(--font-dm-mono), ui-monospace, monospace;
  --font-body:   ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

:root {
  color-scheme: dark;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html, body {
  background: var(--color-bg);
  color: var(--color-paper);
  font-family: var(--font-body);
}

body {
  overflow-x: hidden;
}

/* Phantom-style gradient ribbons (utility classes consumed by Hero/case-study heroes) */
.ribbon-1 {
  background: linear-gradient(90deg, var(--color-arctic), var(--color-indigo));
}
.ribbon-2 {
  background: linear-gradient(90deg, var(--color-indigo), #d97a3c);
}
.ribbon-3 {
  background: linear-gradient(110deg, var(--color-arctic) 0%, var(--color-indigo) 50%, #d97a3c 100%);
}

/* Ghost letterform utility — used by kinetic hero */
.ghost {
  -webkit-text-stroke: 1.5px var(--color-paper-mid);
  color: transparent;
}
.ghost-arctic {
  -webkit-text-stroke: 1.5px var(--color-arctic);
  color: transparent;
}
.ghost-indigo {
  -webkit-text-stroke: 1.5px var(--color-indigo);
  color: transparent;
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds. Tailwind v4 may warn if any old utility class no longer resolves — that's fine, those are about to be replaced in subsequent tasks.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(redesign-v2): swap design tokens to dark + kinetic palette"
git push
```

---

### Task 4: Wire fonts via next/font/google

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read the current layout.tsx**

```bash
cat src/app/layout.tsx
```
Note current font wiring (Instrument Serif + Syne + JetBrains Mono).

- [ ] **Step 2: Replace font imports in layout.tsx**

Edit the imports at the top of `src/app/layout.tsx`:

```typescript
import { Instrument_Serif, Syne, Bricolage_Grotesque, DM_Mono } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],   // variable width axis (weight axis is default)
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});
```

Then update the `<html>` and `<body>` tags:

```tsx
<html
  lang="en"
  className={`${syne.variable} ${bricolage.variable} ${instrumentSerif.variable} ${dmMono.variable}`}
  suppressHydrationWarning
>
  <body className="antialiased">
    {/* existing children */}
  </body>
</html>
```

Remove any `next-themes` ThemeProvider usage if present — single dark theme only.

- [ ] **Step 3: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```
Expected: clean TS, successful build.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(redesign-v2): wire syne + bricolage variable + instrument serif + dm mono"
git push
```

---

### Task 5: Add Lenis smooth-scroll provider

**Files:**
- Create: `src/components/smooth-scroll-provider.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/motion.ts`

- [ ] **Step 1: Create motion constants**

Write `src/lib/motion.ts`:

```typescript
// Shared easing + stagger constants for the redesign.
// Used by Hero, FeaturedRow, page-section reveals, GSAP timelines.

export const EASE = {
  // Apple-style fast-start / soft-landing
  out:     [0.16, 1, 0.3, 1] as const,
  // Symmetrical for transitions
  inOut:   [0.45, 0, 0.55, 1] as const,
  // GSAP-compatible cubic-bezier strings
  outCSS:   "cubic-bezier(0.16, 1, 0.3, 1)",
  inOutCSS: "cubic-bezier(0.45, 0, 0.55, 1)",
};

export const STAGGER = {
  fast: 0.08,
  base: 0.12,
  slow: 0.16,
};

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.0,
};
```

- [ ] **Step 2: Create the smooth-scroll provider**

Write `src/components/smooth-scroll-provider.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a single Lenis instance for the whole document and bridges
 * its rAF loop. Disables itself when the user has prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Mount the provider in layout.tsx**

Edit `src/app/layout.tsx`. Import and wrap children:

```tsx
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
// ...

<body className="antialiased">
  <SmoothScrollProvider>
    {/* existing nav / children / footer */}
  </SmoothScrollProvider>
</body>
```

- [ ] **Step 4: Verify build + dev**

```bash
npm run build 2>&1 | tail -10
```
Expected: build succeeds.

```bash
npm run dev
```
Then in a browser at http://localhost:3000, scroll the page — wheel scrolling should feel smoother (eased momentum). Stop the dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/components/smooth-scroll-provider.tsx src/lib/motion.ts src/app/layout.tsx
git commit -m "feat(redesign-v2): mount Lenis smooth-scroll provider + motion constants"
git push
```

---

### Task 6: Rewrite Nav

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Read the current nav**

```bash
cat src/components/nav.tsx
```
Identify the current link list and CTA so the new version preserves the same routes.

- [ ] **Step 2: Replace the file with the new dark/kinetic Nav**

Write `src/components/nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/writing",   label: "Writing" },
  { href: "/about",     label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-colors ${
        scrolled
          ? "bg-[rgba(6,6,8,0.92)] backdrop-blur-md border-b border-[var(--color-rule)]"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] font-extrabold text-[11px] tracking-[0.22em] text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
      >
        ETHAN STUART
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-arctic)] opacity-50 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-arctic)]" />
        </span>
        <span className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)]">
          Open to conversation
        </span>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 4: Build + visual check**

```bash
npm run build 2>&1 | tail -5 && npm run dev
```
Visit `http://localhost:3000`. The nav should appear at the top, transparent, then add a backdrop on scroll. The "Open to conversation" pill should pulse arctic blue. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat(redesign-v2): rewrite Nav — dark, ES wordmark, open-to-conversation pulse"
git push
```

---

### Task 7: Rewrite Footer

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Replace footer.tsx**

Write `src/components/footer.tsx`:

```tsx
import Link from "next/link";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/ethancstuart", label: "LinkedIn" },
  { href: "https://thedataproductagent.substack.com",  label: "Substack" },
  { href: "https://github.com/ethancstuart",           label: "GitHub"   },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] mt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between gap-6 flex-wrap">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] font-extrabold text-[11px] tracking-[0.22em] text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
        >
          ES
        </Link>

        <ul className="flex gap-6">
          {SOCIALS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.12em] uppercase text-[rgba(216,212,204,0.08)]">
          © 2026 Ethan Stuart · Built with Next.js
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat(redesign-v2): rewrite Footer — dark single row"
git push
```

---

### Task 8: Build BottomMarquee

**Files:**
- Create: `src/components/bottom-marquee.tsx`
- Delete: `src/components/ticker.tsx` (cream version no longer used)
- Modify: `src/app/layout.tsx` (mount the marquee globally)

- [ ] **Step 1: Create the BottomMarquee component**

Write `src/components/bottom-marquee.tsx`:

```tsx
const ITEMS = [
  { text: "NexusWatch — Geopolitical Intelligence", color: "var(--color-arctic)" },
  { text: "·" },
  { text: "The Composer — Multi-Agent Editorial", color: "var(--color-indigo)" },
  { text: "·" },
  { text: "Product OS — Spec-as-code" },
  { text: "·" },
  { text: "Zero to Ship — AI Course Platform" },
  { text: "·" },
  { text: "Senior Manager · Disney — Stuart Ventures" },
  { text: "·" },
];

// Doubled for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export function BottomMarquee() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-rule)] py-2.5 overflow-hidden bg-[rgba(6,6,8,0.9)] backdrop-blur-md"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.2em] uppercase px-10"
            style={{ color: item.color ?? "rgba(216,212,204,0.14)" }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Mount the marquee in layout.tsx**

In `src/app/layout.tsx`, inside the `SmoothScrollProvider`, after `{children}` and before `</SmoothScrollProvider>`:

```tsx
<SmoothScrollProvider>
  <Nav />
  {children}
  <Footer />
  <BottomMarquee />
</SmoothScrollProvider>
```

(Add the `Nav`, `Footer`, `BottomMarquee` imports at the top of the file.)

- [ ] **Step 3: Delete the old ticker**

```bash
git rm src/components/ticker.tsx
```
If any page imports it, those imports will break — fix in subsequent tasks. (Most likely the cream Hero used it; that hero is replaced in Task 9.)

- [ ] **Step 4: Build + visual check**

```bash
npm run build 2>&1 | tail -10
```
If there are unresolved `ticker` imports, comment them out in their files and note the file in your task notes — they will be replaced in Task 9 / Task 11.

```bash
npm run dev
```
At `http://localhost:3000`, the bottom marquee should scroll continuously left.

- [ ] **Step 5: Commit**

```bash
git add src/components/bottom-marquee.tsx src/app/layout.tsx
git rm src/components/ticker.tsx 2>/dev/null
git commit -m "feat(redesign-v2): add BottomMarquee, replace cream Ticker"
git push
```

---

### Task 9: Rewrite Hero (kinetic, no shader yet)

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1: Replace hero.tsx**

Write `src/components/hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EASE, STAGGER, DURATION } from "@/lib/motion";

const TYPE_ROWS = [
  { word: "ETHAN",  cls: "text-[var(--color-paper)]",      aside: "Los Angeles, CA"   },
  { word: "STUART", cls: "ghost",                          aside: null                 },
  { word: "SHIPS",  cls: "ghost-indigo",                   aside: "06 PRODUCTS LIVE"  },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end pt-32 pb-24 px-6 md:px-12">
      {/* Placeholder gradient background — real WebGL shader lands in Phase 3 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 18% 30%, rgba(142,207,232,0.35), transparent 45%), radial-gradient(ellipse at 80% 78%, rgba(139,114,216,0.4), transparent 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.fast, ease: EASE.out }}
        className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-dim)] mb-8"
      >
        12 Years · Disney Studios — Fortune 50 Scale · Founder Stuart Ventures
      </motion.div>

      <div className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.92] tracking-[-0.045em]">
        {TYPE_ROWS.map((row, i) => (
          <div
            key={row.word}
            className="flex items-baseline gap-6 md:gap-12 overflow-hidden"
          >
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: DURATION.slow,
                ease: EASE.out,
                delay: 0.2 + i * STAGGER.slow,
              }}
              className={`inline-block text-[clamp(72px,10vw,168px)] ${row.cls}`}
            >
              {row.word}
            </motion.span>

            {row.aside && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.base, delay: 0.6 + i * STAGGER.slow }}
                className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-dim)] whitespace-nowrap"
              >
                {row.aside}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.out, delay: 1.0 }}
        style={{ transformOrigin: "left" }}
        className="w-16 h-px bg-[var(--color-arctic)] mt-10 mb-7"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, delay: 1.15 }}
        className="font-[family-name:var(--font-syne)] text-[18px] text-[rgba(216,212,204,0.78)] max-w-[460px] leading-snug"
      >
        I&apos;ve always built.
        <br />
        <em className="font-[family-name:var(--font-instrument)] not-italic [&]:italic text-[rgba(216,212,204,0.6)]">
          The scale just changes.
        </em>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, delay: 1.3 }}
        className="text-[14px] text-[var(--color-paper-mid)] max-w-[520px] leading-relaxed mt-5"
      >
        <em className="font-[family-name:var(--font-instrument)] [&]:italic">
          Building where data &amp; AI become products.
        </em>{" "}
        AI is why one person can now ship what teams used to.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, delay: 1.45 }}
        className="flex items-center gap-8 mt-10"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-paper-mid)] hover:border-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-bg)] font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase transition-colors rounded-sm"
        >
          See the Work <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/writing"
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
        >
          Read writing
        </Link>
        <Link
          href="/contact"
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
        >
          Get in touch
        </Link>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```
Expected: clean. (If imports of the old hero break in `src/app/page.tsx`, that's expected — page.tsx is rewritten in Task 14.)

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat(redesign-v2): rewrite Hero — kinetic ETHAN STUART SHIPS, ghost letterforms"
git push
```

---

### Task 10: Update Section component for dark theme

**Files:**
- Modify: `src/components/section.tsx`

- [ ] **Step 1: Read current section.tsx**

```bash
cat src/components/section.tsx
```
Note its current API (likely `label`, `title`, `description`, `children`).

- [ ] **Step 2: Replace section.tsx**

Write `src/components/section.tsx`. Preserve the existing prop API so callers don't break:

```tsx
import { ReactNode } from "react";

interface SectionProps {
  label?: string;       // mono uppercase eyebrow
  title?: string;       // big display title
  description?: string; // body lede
  children: ReactNode;
  className?: string;
}

export function Section({ label, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 ${className}`}>
      {(label || title || description) && (
        <header className="mb-12">
          {label && (
            <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-dim)] mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[var(--color-paper-low)]" />
              {label}
            </div>
          )}
          {title && (
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(32px,4.5vw,56px)] tracking-[-0.025em] leading-[1.05]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[15px] text-[var(--color-paper-mid)] max-w-[720px] leading-relaxed mt-4">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/section.tsx
git commit -m "feat(redesign-v2): restyle Section component for dark theme"
git push
```

---

### Task 11: Update constants.ts with new project list

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Read current constants**

```bash
cat src/lib/constants.ts
```
Note the current project shape (slug, name, description, etc.).

- [ ] **Step 2: Replace the file**

Write `src/lib/constants.ts`. Preserve the existing project shape; add a `color` field and a `category` field. If existing fields exist beyond what's shown here (e.g., `tech`, `links`), retain them.

```typescript
export type ProjectStatus = "live" | "beta" | "build" | "active";
export type ProjectCategory = "featured" | "lab" | "re-stack";

export interface Project {
  slug: string;
  name: string;
  type: string;          // short type label e.g. "Geopolitical Intelligence"
  description: string;   // 1-2 sentence preview
  status: ProjectStatus;
  category: ProjectCategory;
  color: string;         // CSS var ref e.g. "var(--color-nx)"
  href?: string;         // external link (visit the live product)
}

// Featured 4 — full magazine spreads in Phase 2
export const FEATURED: Project[] = [
  {
    slug: "nexuswatch",
    name: "NexusWatch",
    type: "Geopolitical Intelligence",
    description:
      "Real-time geopolitical intelligence across 86 countries. AI risk analyst, 45+ data layers, globe visualization. Professional-grade threat monitoring built solo.",
    status: "live",
    category: "featured",
    color: "var(--color-nx)",
    href: "https://nexuswatch.io",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    type: "Multi-Agent Editorial Framework",
    description:
      "Agentic newsroom built on a 10-persona editorial board, multi-step pipeline (notes → draft → review → publish). Masthead is the productized expansion.",
    status: "beta",
    category: "featured",
    color: "var(--color-cm)",
  },
  {
    slug: "product-os",
    name: "Product OS",
    type: "Spec-as-code for PMs",
    description:
      "OSS CLI + commercial dashboard + GitHub App that turn structured product specs into reviewable, version-controlled artifacts.",
    status: "build",
    category: "featured",
    color: "var(--color-po)",
  },
  {
    slug: "zero-to-ship",
    name: "Zero to Ship",
    type: "AI Coding Course Platform",
    description:
      "16-module gamified course teaching the same shipping-first method used to build the rest of this portfolio.",
    status: "live",
    category: "featured",
    color: "var(--color-zts)",
    href: "https://zerotoship.dev",
  },
];

// Modeling Lab — practice / quant track
export const MODELING_LAB: Project[] = [
  {
    slug: "quant-engine",
    name: "Quant Engine",
    type: "Systematic Trading Platform",
    description:
      "World-class systematic trading platform — signal factory, streaming, GPU backtest, Bayesian state, paper-traded live on Alpaca.",
    status: "live",
    category: "lab",
    color: "var(--color-ml)",
  },
  {
    slug: "sports-ml",
    name: "Sports ML Pipeline",
    type: "Models for Sports Markets",
    description:
      "20+ models across 4 sports. Kelly-sized bets, model-promoted to production after backtest. From small bankroll to live wagering.",
    status: "active",
    category: "lab",
    color: "var(--color-ml)",
  },
];

// RE Stack — real-estate ventures
export const RE_STACK: Project[] = [
  {
    slug: "meridian",
    name: "Meridian Intelligence",
    type: "Non-QM Lending Intelligence",
    description:
      "Lending intelligence platform — 34 features, 433 tests, white-label-ready. Operator-layer SaaS for non-QM mortgage shops.",
    status: "active",
    category: "re-stack",
    color: "var(--color-re)",
  },
  {
    slug: "ridgecap",
    name: "RidgeCap",
    type: "CRE Data Infrastructure",
    description:
      "CRE data infrastructure — 7-table FRED schema, 15 free CRE series, parallel build. Currently in product-frozen due-diligence mode.",
    status: "build",
    category: "re-stack",
    color: "var(--color-re)",
  },
];

// Aggregate for callers that want everything (e.g., sitemap)
export const ALL_PROJECTS: Project[] = [...FEATURED, ...MODELING_LAB, ...RE_STACK];
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: clean. If any other file imports the old project shape and the import breaks, this will surface — fix those imports in the consuming file (likely `src/app/portfolio/page.tsx`, fixed in Task 16).

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat(redesign-v2): redefine project lists — featured 4, modeling lab, re stack"
git push
```

---

### Task 12: Build FeaturedRow component

**Files:**
- Create: `src/components/featured-row.tsx`
- Delete: `src/components/featured-project-card.tsx` (cream version)

- [ ] **Step 1: Create FeaturedRow**

Write `src/components/featured-row.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import type { Project } from "@/lib/constants";

const STATUS_LABEL: Record<Project["status"], string> = {
  live:   "LIVE",
  beta:   "BETA",
  build:  "BUILD",
  active: "ACTIVE",
};

interface Props {
  projects: Project[];
}

export function FeaturedRows({ projects }: Props) {
  return (
    <ul className="border-t border-[var(--color-rule)]">
      {projects.map((p, i) => (
        <motion.li
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATION.base, ease: EASE.out, delay: i * STAGGER.fast }}
          className="border-b border-[var(--color-rule)] group"
        >
          <Link
            href={`/portfolio/${p.slug}`}
            className="block transition-[padding,background] duration-200 group-hover:pl-6"
            style={
              { "--accent": p.color } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-[40px_1fr_auto_24px] md:grid-cols-[60px_1fr_auto_40px] items-center gap-4 md:gap-8 py-7 md:py-9 group-hover:bg-[color:var(--accent)]/[0.06]">
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] text-[var(--color-paper-dim)]">
                0{i + 1}
              </div>

              <div>
                <div
                  className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(28px,3.6vw,48px)] tracking-[-0.025em] leading-tight transition-colors group-hover:text-[color:var(--accent)]"
                >
                  {p.name}
                </div>
                <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] mt-2">
                  {p.type}
                </div>
              </div>

              <div className="flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent)]">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                />
                {STATUS_LABEL[p.status]}
              </div>

              <div className="text-[var(--color-paper-low)] group-hover:text-[color:var(--accent)] transition-colors text-right">
                ↗
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Delete the old featured-project-card.tsx**

```bash
git rm src/components/featured-project-card.tsx
```
If anything still imports it, those imports break — fix in the consuming file. Most likely only `src/app/portfolio/page.tsx` imports it (rewritten in Task 16).

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
If a stale import surfaces, comment it out and note for the next task.

- [ ] **Step 4: Commit**

```bash
git add src/components/featured-row.tsx
git rm src/components/featured-project-card.tsx 2>/dev/null
git commit -m "feat(redesign-v2): add FeaturedRows component, remove cream featured-project-card"
git push
```

---

### Task 13: Build LabStrip component (used for both Modeling Lab + RE Stack)

**Files:**
- Create: `src/components/lab-strip.tsx`

- [ ] **Step 1: Create LabStrip**

Write `src/components/lab-strip.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import type { Project } from "@/lib/constants";

interface Props {
  label: string;        // e.g. "LAB · QUANT + ML PRACTICE"
  title: string;        // e.g. "Modeling Lab."
  description: string;  // lede paragraph
  accent: string;       // CSS var ref
  vignettes: Project[]; // 2-3 entries
}

export function LabStrip({ label, title, description, accent, vignettes }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
      <header className="mb-12 max-w-[820px]">
        <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3 flex items-center gap-3" style={{ color: accent }}>
          <span className="inline-block w-6 h-px" style={{ background: accent }} />
          {label}
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(32px,4.5vw,56px)] tracking-[-0.025em] leading-[1.05]">
          {title}
        </h2>
        <p className="text-[15px] text-[var(--color-paper-mid)] leading-relaxed mt-4">
          {description}
        </p>
      </header>

      <div
        className={`grid gap-6 ${
          vignettes.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {vignettes.map((v, i) => (
          <motion.article
            key={v.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.base, ease: EASE.out, delay: i * STAGGER.fast }}
            className="border border-[var(--color-rule)] rounded-md p-7 hover:-translate-y-0.5 transition-transform"
            style={{ borderColor: "var(--color-rule)" }}
          >
            <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase mb-4" style={{ color: accent }}>
              0{i + 1} / {String(vignettes.length).padStart(2, "0")}
            </div>
            <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-[24px] leading-tight tracking-[-0.02em]">
              {v.name}
            </h3>
            <div className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] mt-2">
              {v.type}
            </div>
            <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-4">
              {v.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/lab-strip.tsx
git commit -m "feat(redesign-v2): add LabStrip — used for Modeling Lab + RE Stack"
git push
```

---

### Task 14: Rewrite home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Write `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { FeaturedRows } from "@/components/featured-row";
import { LabStrip } from "@/components/lab-strip";
import { Section } from "@/components/section";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        label="FEATURED WORK"
        title="What I build."
        description="Four products at the core of the practice — each with its own case study, art direction, and signature motion. Click through for the full spread."
      >
        <FeaturedRows projects={FEATURED} />
      </Section>

      <LabStrip
        label="LAB · QUANT + ML PRACTICE"
        title="Modeling Lab."
        description="A working practice in models that pay rent. Production-grade systems, each shipped to live capital or live odds. Treat these as proof of method, not the headline product."
        accent="var(--color-ml)"
        vignettes={MODELING_LAB}
      />

      <LabStrip
        label="VENTURES · REAL ESTATE STACK"
        title="RE Stack."
        description="Real-estate-domain ventures — lending intelligence at the operator layer, and a CRE data infrastructure layer feeding both. Currently in product-frozen due-diligence mode."
        accent="var(--color-re)"
        vignettes={RE_STACK}
      />

      <Section
        label="FIELD NOTES"
        title="Writing."
      >
        <div className="flex justify-between items-baseline">
          <p className="text-[var(--color-paper-mid)] text-[15px] max-w-[640px] leading-relaxed">
            The Data Product Agent — long-form work on AI-native product
            building. Currently transitioning to The Composer.
          </p>
          <Link
            href="/writing"
            className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors border-b border-[var(--color-rule)] pb-0.5"
          >
            All posts →
          </Link>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```
Expected: clean. If any old import remains (e.g., `Ticker`, `FeaturedProjectCard`), this will fail — remove the offending lines.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```
At `http://localhost:3000`:
- Hero kinetic animation plays on load (ETHAN STUART SHIPS rises from below)
- 4 featured rows render with hover-color (each in its project color)
- Modeling Lab + RE Stack sections render with the magenta + amber accents
- Bottom marquee scrolls

Stop dev.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(redesign-v2): rewrite home — kinetic hero + featured rows + lab/re strips"
git push
```

---

### Task 15: Restyle About page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Read current about/page.tsx**

```bash
cat src/app/about/page.tsx
```
Carry over the same content (manifesto + narrative + career arc + philosophy) — only the styling changes.

- [ ] **Step 2: Replace about/page.tsx**

Write `src/app/about/page.tsx`. The component is self-contained for Phase 1 — career arc and philosophy are inlined here; if they grow we extract in a future task.

```tsx
import { Section } from "@/components/section";

const CAREER = [
  { years: "2018 – 2020", org: "Capital Group",   role: "Analyst" },
  { years: "2020 – 2022", org: "Sprout",          role: "PM" },
  { years: "2022 – 2023", org: "Taco Bell",       role: "Senior Manager" },
  { years: "2023 – Now",  org: "Disney Studios",  role: "Senior Manager", current: true },
];

const PHILOSOPHY = [
  {
    n: "01",
    line: "Build to understand, not just to ship.",
    body: "Shipping is the forcing function. Understanding is the compounding asset.",
  },
  {
    n: "02",
    line: "Clarity is the product.",
    body: "Most product debt is decision debt. Make the decision, document it, move.",
  },
  {
    n: "03",
    line: "The org is part of the system.",
    body: "Technical decisions are organizational decisions in disguise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section label="ABOUT">
        <blockquote className="font-[family-name:var(--font-instrument)] italic text-[clamp(28px,3.6vw,48px)] leading-snug max-w-[820px] tracking-[-0.015em] relative">
          <span aria-hidden="true" className="absolute -left-7 -top-3 text-[var(--color-arctic)] text-[64px] leading-none">
            “
          </span>
          The gap between managing data and actually building with it is closing fast.
          I&apos;ve spent my career working on both sides of that wall — and I think
          that&apos;s the only place worth being right now.
        </blockquote>
      </Section>

      <Section>
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-6 text-[16px] leading-[1.8] text-[rgba(216,212,204,0.78)] max-w-[640px]">
            <p>
              Senior Manager at Disney — serving Disney Studios at Fortune 50 scale,
              leading across product, finance, and operations. Co-lead of three AI
              task forces spanning product, program management, and data.
            </p>
            <p className="font-[family-name:var(--font-instrument)] italic text-[20px] border-l-2 border-[var(--color-arctic)] pl-5 text-[rgba(216,212,204,0.85)]">
              I joined Disney and within six months was recognized as a senior leader
              on the team. That&apos;s not a timeline I planned — it&apos;s how I work.
            </p>
            <p>
              In parallel: Stuart Ventures. Six production-grade software products
              built solo. Geopolitical intelligence, multi-agent editorial
              infrastructure, lending intelligence, AI education, systematic trading,
              spec-as-code tooling. <em className="font-[family-name:var(--font-instrument)] not-italic [&]:italic">All shipping. All real.</em>
            </p>
            <p>
              AI is what makes the combination possible — I&apos;m not working twice
              as hard, I&apos;m working differently.
            </p>
          </div>

          <aside className="md:sticky md:top-24 self-start space-y-3 font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-paper-mid)]">
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Currently</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Senior Manager · Disney Studios</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Domain</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Data &amp; AI — enterprise + solo</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Education</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">Quant + Operations Research</div>
            </div>
            <div className="border border-[var(--color-rule)] p-4 rounded-md">
              <div className="text-[var(--color-paper-low)] mb-1">Newsletter</div>
              <div className="text-[var(--color-paper)] tracking-[0.1em]">The Data Product Agent</div>
            </div>
          </aside>
        </div>
      </Section>

      <Section label="CAREER ARC" title="Where I've worked.">
        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {CAREER.map((c) => (
            <li key={c.org} className="border-t border-[var(--color-rule)] pt-5">
              <div
                className={`inline-flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase mb-2 ${
                  c.current ? "text-[var(--color-arctic)]" : "text-[var(--color-paper-low)]"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    c.current ? "bg-[var(--color-arctic)]" : "border border-[var(--color-paper-low)]"
                  }`}
                  style={c.current ? { boxShadow: "0 0 8px var(--color-arctic)" } : {}}
                />
                {c.years}
              </div>
              <div className={`font-[family-name:var(--font-syne)] font-extrabold text-[20px] leading-tight ${c.current ? "text-[var(--color-paper)]" : "text-[rgba(216,212,204,0.6)]"}`}>
                {c.org}
              </div>
              <div className="text-[13px] text-[var(--color-paper-mid)] mt-1">{c.role}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="PHILOSOPHY" title="How I work.">
        <div className="bg-[var(--color-surface)] border border-[var(--color-rule)] rounded-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {PHILOSOPHY.map((p) => (
            <div key={p.n}>
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] text-[var(--color-paper-low)] mb-3">
                {p.n}
              </div>
              <div className="font-[family-name:var(--font-instrument)] italic text-[18px] leading-snug mb-3">
                {p.line}
              </div>
              <div className="font-[family-name:var(--font-dm-mono)] text-[11px] tracking-[0.04em] text-[var(--color-paper-mid)] leading-relaxed">
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```
Visit http://localhost:3000/about. Verify: manifesto opener, narrative + sticky aside on desktop, career arc with Disney lit arctic, philosophy strip on surface.

- [ ] **Step 5: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat(redesign-v2): restyle About — manifesto + narrative + career arc + philosophy"
git push
```

---

### Task 16: Restyle Portfolio page (Phase 1 stub — full magazine spreads in Phase 2)

**Files:**
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/components/portfolio-card.tsx` (or delete + replace inline)

- [ ] **Step 1: Read current portfolio/page.tsx**

```bash
cat src/app/portfolio/page.tsx
```

- [ ] **Step 2: Replace portfolio/page.tsx with the Phase-1 stub**

This is intentionally a stub — Phase 2 replaces this with full magazine spreads per featured project. For now it shows the same FeaturedRows + LabStrip as the home page, but takes the full viewport.

Write `src/app/portfolio/page.tsx`:

```tsx
import { Section } from "@/components/section";
import { FeaturedRows } from "@/components/featured-row";
import { LabStrip } from "@/components/lab-strip";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";

export const metadata = {
  title: "Portfolio — Ethan Stuart",
  description:
    "Six products live in 2026 — geopolitical intelligence, multi-agent editorial infrastructure, lending intelligence, AI education, systematic trading, spec-as-code tooling.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section
        label="SELECTED WORK"
        title="Six products. All live in 2026."
        description="Phase 1: row preview. Phase 2 will replace this view with a full art-directed magazine spread per featured project."
      >
        <FeaturedRows projects={FEATURED} />
      </Section>

      <LabStrip
        label="LAB · QUANT + ML PRACTICE"
        title="Modeling Lab."
        description="Production-grade modeling work — quant + sports markets — that pays rent and proves method."
        accent="var(--color-ml)"
        vignettes={MODELING_LAB}
      />

      <LabStrip
        label="VENTURES · REAL ESTATE STACK"
        title="RE Stack."
        description="Real-estate-domain ventures: lending intelligence + CRE data infrastructure."
        accent="var(--color-re)"
        vignettes={RE_STACK}
      />
    </>
  );
}
```

- [ ] **Step 3: Update portfolio-card.tsx (or delete if not referenced)**

Check if anything still uses `portfolio-card.tsx`:

```bash
grep -rn "portfolio-card" src/
```

If only referenced in deleted/replaced files, delete it:

```bash
git rm src/components/portfolio-card.tsx
```

If still imported elsewhere, leave it for now and note for Phase 2 cleanup.

- [ ] **Step 4: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Visual check**

```bash
npm run dev
```
Visit http://localhost:3000/portfolio. Should look very similar to the home page sections — that's expected for Phase 1.

- [ ] **Step 6: Commit**

```bash
git add src/app/portfolio/page.tsx
git rm src/components/portfolio-card.tsx 2>/dev/null
git commit -m "feat(redesign-v2): portfolio Phase-1 stub — full spreads come in Phase 2"
git push
```

---

### Task 17: Restyle Writing index + post reader

**Files:**
- Modify: `src/app/writing/page.tsx`
- Modify: `src/app/writing/[slug]/page.tsx`
- Modify: `src/components/post-card.tsx`

- [ ] **Step 1: Restyle PostCard for the row format**

Write `src/components/post-card.tsx`:

```tsx
import Link from "next/link";

export interface PostCardProps {
  slug: string;
  title: string;
  date: string;       // formatted display date
  excerpt?: string;
}

export function PostCard({ slug, title, date, excerpt }: PostCardProps) {
  return (
    <li className="border-b border-[var(--color-rule)] group">
      <Link
        href={`/writing/${slug}`}
        className="block py-6 transition-[padding] duration-200 group-hover:pl-4"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-[18px] md:text-[22px] tracking-[-0.01em] text-[var(--color-paper-mid)] group-hover:text-[var(--color-paper)] transition-colors leading-snug">
            {title}
          </h3>
          <time className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] flex-shrink-0">
            {date}
          </time>
        </div>
        {excerpt && (
          <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-3 max-w-[760px]">
            {excerpt}
          </p>
        )}
      </Link>
    </li>
  );
}
```

- [ ] **Step 2: Restyle Writing index**

Read current `src/app/writing/page.tsx` first to understand how posts are fetched (likely from RSS via `rss-parser`):

```bash
cat src/app/writing/page.tsx
```

Update the JSX to use the new layout while preserving the data-fetch logic. Wrap the `PostCard` list in a `<Section>` with a label and title:

```tsx
import { Section } from "@/components/section";
import { PostCard } from "@/components/post-card";
// keep existing imports / fetcher

// In the page export:
return (
  <Section label="WRITING" title="Field notes.">
    <ul className="border-t border-[var(--color-rule)]">
      {posts.map((p) => (
        <PostCard
          key={p.slug ?? p.guid}
          slug={p.slug ?? p.guid}
          title={p.title}
          date={p.dateLabel ?? new Date(p.pubDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          excerpt={p.contentSnippet?.slice(0, 220)}
        />
      ))}
    </ul>
  </Section>
);
```

(Adapt to the actual prop names used by the existing fetcher.)

- [ ] **Step 3: Restyle Writing/[slug] reader**

Read current `src/app/writing/[slug]/page.tsx`:

```bash
cat src/app/writing/[slug]/page.tsx
```

Update the article body container and typography. The key style block:

```tsx
<article className="max-w-[720px] mx-auto px-6 md:px-12 py-24">
  <header className="mb-12 border-b border-[var(--color-rule)] pb-8">
    <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] mb-3">
      {dateLabel} · {category ?? "Field Note"}
    </div>
    <h1 className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(36px,5vw,56px)] tracking-[-0.04em] leading-[1.05]">
      {post.title}
    </h1>
    {post.subtitle && (
      <p className="text-[18px] text-[var(--color-paper-mid)] mt-4 leading-relaxed">
        {post.subtitle}
      </p>
    )}
  </header>

  <div
    className="prose prose-invert prose-lg max-w-none
               prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-[rgba(216,212,204,0.85)]
               prose-headings:font-[family-name:var(--font-syne)]
               prose-blockquote:border-l-2 prose-blockquote:border-[var(--color-indigo)]
               prose-blockquote:font-[family-name:var(--font-instrument)] prose-blockquote:italic
               prose-blockquote:text-[20px] prose-blockquote:not-italic prose-blockquote:[&]:italic
               prose-a:text-[var(--color-arctic)] prose-a:no-underline hover:prose-a:underline"
    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
  />
</article>
```

(Preserve the existing data fetch / sanitize-html / RSS pipeline — only the JSX shell changes.)

- [ ] **Step 4: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Visual check**

```bash
npm run dev
```
- `/writing`: dark page, post rows with hover padding-shift
- `/writing/[any-slug]`: dark article reader, Bricolage headline, Inter body, indigo blockquote left-border

- [ ] **Step 6: Commit**

```bash
git add src/components/post-card.tsx src/app/writing/page.tsx src/app/writing/[slug]/page.tsx
git commit -m "feat(redesign-v2): restyle writing index + post reader"
git push
```

---

### Task 18: Restyle Resume page

**Files:**
- Modify: `src/app/resume/page.tsx`

- [ ] **Step 1: Read current resume/page.tsx**

```bash
cat src/app/resume/page.tsx
```
Note how the resume markdown is parsed and rendered (likely a parser in `src/lib/`).

- [ ] **Step 2: Replace the JSX shell**

Preserve the data layer. Update the layout shell:

```tsx
import { Section } from "@/components/section";
// keep existing data imports / parser

export default async function ResumePage() {
  const resume = await getResume(); // existing
  return (
    <Section label="RESUME">
      <div className="flex items-baseline justify-between mb-10 gap-6 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(40px,6vw,80px)] tracking-[-0.04em] leading-none">
            Ethan Stuart
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] mt-3">
            Senior Manager · Disney Studios — Fortune 50 scale · Founder · Stuart Ventures
          </p>
        </div>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-arctic)] text-[var(--color-arctic)] hover:bg-[var(--color-arctic)] hover:text-[var(--color-bg)] font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase transition-colors rounded-sm"
        >
          Download PDF <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div
        className="prose prose-invert prose-lg max-w-none
                   prose-headings:font-[family-name:var(--font-syne)]
                   prose-h2:text-[var(--color-arctic)]
                   prose-p:text-[15px] prose-p:leading-[1.7]
                   prose-li:text-[15px]
                   prose-a:text-[var(--color-arctic)] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: resume.html }}
      />
    </Section>
  );
}
```

(Adapt prop names to match the existing parser output.)

- [ ] **Step 3: Verify TS + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```
Visit http://localhost:3000/resume. Verify: big Syne name, arctic Download PDF button, dark prose body, arctic h2 headings.

- [ ] **Step 5: Commit**

```bash
git add src/app/resume/page.tsx
git commit -m "feat(redesign-v2): restyle Resume page — Syne name, arctic CTA, dark prose"
git push
```

---

### Task 19: Restyle Contact page

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Replace contact/page.tsx**

Write `src/app/contact/page.tsx`:

```tsx
import { Section } from "@/components/section";

const CHANNELS = [
  { label: "Email",     href: "mailto:ethan.c.stuart@gmail.com", value: "ethan.c.stuart@gmail.com" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/ethancstuart", value: "/in/ethancstuart" },
  { label: "Substack",  href: "https://thedataproductagent.substack.com", value: "thedataproductagent" },
  { label: "GitHub",    href: "https://github.com/ethancstuart", value: "ethancstuart" },
];

export const metadata = {
  title: "Contact — Ethan Stuart",
};

export default function ContactPage() {
  return (
    <Section
      label="CONTACT"
      title="Open to conversation."
      description="Currently open to VP+ data & AI product leadership conversations. Also reachable for builder collaboration, advisory, and friend-of-friend introductions."
    >
      <ul className="border-t border-[var(--color-rule)] max-w-[720px]">
        {CHANNELS.map((c) => (
          <li key={c.label} className="border-b border-[var(--color-rule)] group">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid grid-cols-[120px_1fr_24px] items-center gap-6 py-6 transition-[padding] duration-200 group-hover:pl-4"
            >
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-low)]">
                {c.label}
              </div>
              <div className="font-[family-name:var(--font-syne)] text-[18px] text-[var(--color-paper-mid)] group-hover:text-[var(--color-arctic)] transition-colors">
                {c.value}
              </div>
              <div className="text-[var(--color-paper-low)] group-hover:text-[var(--color-arctic)] text-right">
                ↗
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 2: Verify TS + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(redesign-v2): restyle Contact page — open to conversation row list"
git push
```

---

### Task 20: Update root metadata (page title + OG)

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/opengraph-image.tsx` (if applicable)

- [ ] **Step 1: Update site metadata in layout.tsx**

In `src/app/layout.tsx`, replace the `metadata` export:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
    template: "%s · Ethan Stuart",
  },
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. Six AI products across intelligence, lending, trading, and learning — all live.",
  metadataBase: new URL("https://ethancstuart.com"),
  openGraph: {
    title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
    description:
      "Six AI products live in 2026. Senior Manager at Disney Studios. Founder at Stuart Ventures.",
    url: "https://ethancstuart.com",
    siteName: "Ethan Stuart",
    type: "website",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Verify TS + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(redesign-v2): refresh root metadata — six products framing"
git push
```

---

### Task 21: Sweep stale imports + dead components

**Files:** various — discovery-driven

- [ ] **Step 1: Search for orphaned components**

```bash
ls src/components/
```
Compare against components actually imported across `src/`:

```bash
for f in src/components/*.tsx; do
  name=$(basename "$f" .tsx)
  count=$(grep -rln "from \"@/components/$name\"" src/ | grep -v "$f" | wc -l | tr -d ' ')
  echo "$name: $count imports"
done
```

Any component with `0 imports` that wasn't kept intentionally (e.g., `download-menu.tsx` if no longer used) should be deleted.

- [ ] **Step 2: Delete orphans**

For each orphan identified, delete with:
```bash
git rm src/components/<name>.tsx
```

(Likely candidates given Phase 1 scope: `download-menu.tsx` if it was cream-only; `subscribe-cta.tsx` if not used in writing redesign — check first.)

- [ ] **Step 3: Verify TS + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add -A src/components/
git commit -m "chore(redesign-v2): remove orphaned cream components"
git push
```

(Skip the commit if no orphans were removed.)

---

### Task 22: Add Playwright route smoke test

**Files:**
- Create: `tests/redesign-v2-routes.spec.ts`
- Modify: `playwright.config.ts` (if it doesn't exist, create it)

- [ ] **Step 1: Check Playwright is set up**

```bash
ls playwright.config.ts 2>/dev/null && echo "exists" || echo "missing"
```

If missing, create `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 2: Create the smoke test**

Write `tests/redesign-v2-routes.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

const ROUTES: { path: string; expectText: string }[] = [
  { path: "/",          expectText: "ETHAN" },
  { path: "/about",     expectText: "ABOUT" },
  { path: "/portfolio", expectText: "SELECTED WORK" },
  { path: "/writing",   expectText: "Field notes" },
  { path: "/resume",    expectText: "Ethan Stuart" },
  { path: "/contact",   expectText: "Open to conversation" },
];

for (const { path, expectText } of ROUTES) {
  test(`route ${path} renders without errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(page.getByText(expectText, { exact: false }).first()).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}
```

- [ ] **Step 3: Run the smoke test**

```bash
npx playwright install chromium
npx playwright test tests/redesign-v2-routes.spec.ts
```
Expected: all 6 routes pass. If a route fails, fix the underlying issue in that page.

- [ ] **Step 4: Commit**

```bash
git add tests/redesign-v2-routes.spec.ts playwright.config.ts
git commit -m "test(redesign-v2): playwright route smoke test for all 6 pages"
git push
```

---

### Task 23: Lighthouse + production-build sanity

**Files:** none modified — this is a verification task

- [ ] **Step 1: Run a clean production build**

```bash
rm -rf .next && npm run build 2>&1 | tee /tmp/build-output.log | tail -40
```
Expected: build completes; route summary shows all routes prerendered.

- [ ] **Step 2: Start production server**

```bash
npm start &
echo $! > /tmp/next-pid
sleep 4
```

- [ ] **Step 3: Run Lighthouse on home + about + portfolio**

```bash
npx lighthouse http://localhost:3000/          --quiet --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=/tmp/lh-home.json
npx lighthouse http://localhost:3000/about     --quiet --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=/tmp/lh-about.json
npx lighthouse http://localhost:3000/portfolio --quiet --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=/tmp/lh-portfolio.json

for f in /tmp/lh-home.json /tmp/lh-about.json /tmp/lh-portfolio.json; do
  echo "=== $f ==="
  node -e "const d=require('$f');for(const k of Object.keys(d.categories)){console.log(k, Math.round(d.categories[k].score*100));}"
done
```
Phase 1 target (lower than spec final because shader + signature motion not yet present):
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

If any score is below target, identify the failing audit (e.g., `lighthouse --view` against the JSON) and address before moving on.

- [ ] **Step 4: Stop the prod server**

```bash
kill $(cat /tmp/next-pid)
```

- [ ] **Step 5: Commit any fixes**

If Lighthouse surfaced issues you fixed (e.g., missing `alt` text, missing meta description), commit those:

```bash
git add -A
git commit -m "perf(redesign-v2): Lighthouse fixes — <specifics>"
git push
```
(Skip if no fixes were needed.)

---

### Task 24: Phase 1 close-out — verify deploy preview + open Phase 2

**Files:** none modified

- [ ] **Step 1: Confirm the latest push deployed to Vercel preview**

```bash
vercel ls public-brand-website-claude 2>&1 | head -10
```
Find the most recent `redesign-v2` deployment URL (not Production).

- [ ] **Step 2: Visit the preview URL**

Open the preview URL from step 1 in a browser. Click through:
- Home (kinetic hero, featured rows, lab strips, marquee)
- About (manifesto, narrative, career arc, philosophy)
- Portfolio (rows + lab strips, clearly labeled as Phase-1 stub)
- Writing (post rows)
- Writing/[any post] (article reader)
- Resume (Syne name, arctic CTA, dark prose)
- Contact (channel rows)

Confirm every page is dark/kinetic. Confirm no console errors. Confirm the bottom marquee scrolls everywhere.

- [ ] **Step 3: Confirm production is untouched**

In a separate browser tab, visit https://ethancstuart.com — should still be the cream/olive site. Confirm no regression.

- [ ] **Step 4: Tag the Phase 1 close-out commit**

```bash
git tag redesign-v2-phase-1 -m "Phase 1 complete — dark/kinetic foundation"
git push --tags
```

- [ ] **Step 5: Append Phase-1 close-out note to spec**

Add a note at the bottom of `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md`:

```markdown

## Appendix C — Phase 1 close-out (YYYY-MM-DD)

Phase 1 shipped to `redesign-v2` branch tag `redesign-v2-phase-1`. All 8 routes restyled. Kinetic hero in place (placeholder gradient — shader Phase 3). Featured rows, Modeling Lab, RE Stack home strips live. Bottom marquee fixed. Lighthouse scores: <fill in actuals from Task 23>.

Phase 2 plan to be written next.
```

Commit:

```bash
git add docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md
git commit -m "docs(redesign-v2): phase 1 close-out note"
git push
```

---

## Self-Review

Spec coverage check:
- §3 Color tokens → Task 3 ✓
- §3 Typography → Task 4 ✓
- §4 Pages structure → Tasks 14–19 ✓ (case-study `[slug]` pages deferred to Phase 2 per scope decision in plan header)
- §4 Navigation → Task 6 ✓
- §5.1 Hero → Task 9 ✓ (placeholder gradient; shader is Phase 3)
- §5.2 Featured Work → Task 12 + Task 14 ✓
- §5.3 Modeling Lab strip → Task 13 + Task 14 ✓
- §5.4 RE Stack strip → Task 13 + Task 14 ✓
- §5.5 Writing teaser → Task 14 ✓
- §5.6 Footer → Task 7 ✓
- §5.7 Bottom marquee → Task 8 ✓
- §5.8 About page → Task 15 ✓
- §5.9 Portfolio page → Task 16 (Phase 1 stub; full magazine spreads in Phase 2)
- §5.10 Per-project case studies → DEFERRED to Phase 2 ✓ (acknowledged in plan header)
- §5.11 Writing index → Task 17 ✓
- §5.12 Writing/[slug] → Task 17 ✓
- §5.13 Resume → Task 18 ✓
- §5.14 Contact → Task 19 ✓
- §7 Motion stack — Phase 1 covers Lenis (Task 5) only. Per-project signature motion, live elements, WebGL shader hero, shared-element transitions, variable-font scroll weight, GSAP master timeline → all Phase 2/3
- §8 Tech stack additions — Lenis, GSAP installed (Task 2). OGL, Three.js install in later phases.
- §9.1–9.5 Project list + copy guardrails → Task 11
- §11 Open items — resolved in plan header

Phase-1 gaps (intentional, deferred to Phase 2/3):
- Per-project case-study pages
- WebGL shader hero
- Mini-globe + live indicators
- Shared-element page transitions
- Variable-font scroll weight
- GSAP master timeline on magazine spreads
- Custom cursor

All non-deferred items have a task. No placeholders. Type names consistent (`Project`, `ProjectStatus`, `ProjectCategory`).

---

Plan complete and saved to `docs/superpowers/plans/2026-05-03-personal-brand-redesign-v2-phase-1.md`.

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best for a 24-task plan with frequent commits.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints. Best if you want to watch / steer in real time.

Which approach?
