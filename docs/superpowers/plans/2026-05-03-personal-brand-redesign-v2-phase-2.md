# Personal Brand Redesign v2 — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Phase 1 portfolio stubs with full art-directed magazine-spread case-study pages, add per-project signature motion (Tier 1 swing #1), wire live demonstrative elements (Tier 1 swing #2), implement shared-element page transitions (Tier 2 swing #4), and clean up Phase 1 carry-overs. Branch stays on `redesign-v2`; production untouched until Phase 3 close-out.

**Architecture:** Build on the Phase 1 foundation. Magazine-spread layout via a new reusable `<MagazineSpread>` component. Each featured project gets its own signature-motion component (canvas/SVG/Three.js depending on the project) loaded inside its case-study page. Three.js lazy-loaded only on `/portfolio/nexuswatch` to keep the rest of the site lightweight. Live elements use server-side fetch + ISR for the GitHub commit / Substack pulls and a small client component for the mini-globe. Shared-element transitions via Framer Motion `layoutId`.

**Tech Stack additions:** Three.js (^0.180+, lazy-loaded), no other new dependencies. Existing Lenis + GSAP + Framer Motion + Bricolage variable from Phase 1.

**Spec:** `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md` §5.9 (portfolio + magazine spreads), §5.10 (case study art direction), §6 (per-project signature motion + scroll narratives), §7 (motion stack rows 1, 2, 4).

**Phase 1 carry-overs addressed in this phase:**
1. `src/app/sitemap.ts` — migrate from legacy `portfolioProjects` to `ALL_PROJECTS`
2. `src/lib/jsonld.ts` — migrate `PortfolioProject` → `Project`
3. `src/components/subscribe-cta.tsx` — restyle in dark theme (still imported by writing pages)
4. `src/lib/constants.ts` — remove legacy `portfolioProjects` + `PortfolioProject` after migrations land

**Resolved scope decisions for this phase:**
- Custom cursor: STILL deferred to Phase 3 (kept here as an option flag, not implemented)
- WebGL shader hero, variable-font scroll weight, GSAP master timeline: ALL Phase 3
- Mini-globe in Hero corner: Phase 2 — but lightweight SVG/Canvas, NOT Three.js (Three.js stays case-study-only)

**Verification approach:** Same as Phase 1 — `npx tsc --noEmit`, `npm run build`, run dev server and click through, Playwright smoke test, Lighthouse audit. No component test suite exists; build + visual + smoke is the bar.

**Files in scope (this phase):**
```
NEW:
  src/components/magazine-spread.tsx
  src/components/case-study/nexuswatch-globe.tsx
  src/components/case-study/composer-typeweave.tsx
  src/components/case-study/product-os-codescroll.tsx
  src/components/case-study/zts-trajectory.tsx
  src/components/case-study/scroll-narrative.tsx
  src/components/hero-mini-globe.tsx
  src/components/live-indicators.tsx
  src/lib/github.ts                       (latest commit fetcher)
  public/portfolio/nexuswatch-globe.png   (placeholder if no real screenshot yet)
  public/portfolio/composer-builddeck.png
  public/portfolio/product-os-cli.png
  public/portfolio/zts-modules.png

MODIFY:
  src/app/sitemap.ts
  src/lib/jsonld.ts
  src/lib/constants.ts                    (remove legacy after migrations)
  src/components/subscribe-cta.tsx
  src/components/featured-row.tsx         (add layoutId for shared-element morph)
  src/components/hero.tsx                 (mount mini-globe + live indicators)
  src/app/portfolio/page.tsx              (full magazine spreads inline)
  src/app/portfolio/[slug]/page.tsx       (full case studies)
  tests/redesign-v2-routes.spec.ts        (add 4 case-study routes)
  package.json                            (three lazy-loaded only)
```

---

### Task 1: Carry-over — migrate sitemap.ts to ALL_PROJECTS

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Read current sitemap**

```bash
cat /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/app/sitemap.ts
```

- [ ] **Step 2: Replace the project-route generation**

Find the loop that uses `portfolioProjects` and replace it with `ALL_PROJECTS`. Pattern:

```typescript
import type { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/lib/constants";

const BASE = "https://ethancstuart.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: new Date() },
    { url: `${BASE}/about`,         lastModified: new Date() },
    { url: `${BASE}/portfolio`,     lastModified: new Date() },
    { url: `${BASE}/writing`,       lastModified: new Date() },
    { url: `${BASE}/resume`,        lastModified: new Date() },
    { url: `${BASE}/contact`,       lastModified: new Date() },
  ];

  const projectRoutes: MetadataRoute.Sitemap = ALL_PROJECTS.map((p) => ({
    url: `${BASE}/portfolio/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
```

Adapt to existing patterns if the file already returns `Sitemap` differently.

- [ ] **Step 3: Verify build**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/app/sitemap.ts
git commit -m "fix(redesign-v2): sitemap uses ALL_PROJECTS — adds new case-study slugs"
git push
```

---

### Task 2: Carry-over — migrate jsonld.ts from PortfolioProject → Project

**Files:**
- Modify: `src/lib/jsonld.ts`

- [ ] **Step 1: Read current jsonld**

```bash
cat /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/lib/jsonld.ts
```

- [ ] **Step 2: Replace `PortfolioProject` references with the new `Project` type**

The new `Project` shape (from `src/lib/constants.ts`):
```typescript
interface Project {
  slug: string;
  name: string;
  type: string;          // formerly might have been "tagline" or "category"
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  color: string;
  href?: string;         // formerly might have been "liveUrl" or "url"
}
```

In `getSoftwareApplicationJsonLd` (or whatever the function is named), update the parameter type from `PortfolioProject` to `Project`. Map old fields to new:
- `project.name` stays
- `project.description` stays
- `project.tagline` (if used) → `project.type`
- `project.liveUrl` (if used) → `project.href`
- `project.tech` (if used) — DROP if not in new shape, or hardcode a placeholder

If the old jsonld returned things that don't have a clean migration (e.g., screenshots), use `null` or omit those fields.

- [ ] **Step 3: Update callers**

Search for callers of the changed function:
```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
grep -rn "getSoftwareApplicationJsonLd\|getPortfolioJsonLd" src/
```

Update them to pass the new `Project` shape (likely they already do from `ALL_PROJECTS`).

- [ ] **Step 4: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/lib/jsonld.ts
git add src/components/jsonld.tsx 2>/dev/null  # if updates spilled into the component
git commit -m "fix(redesign-v2): migrate jsonld from PortfolioProject to Project"
git push
```

---

### Task 3: Carry-over — restyle subscribe-cta in dark theme

**Files:**
- Modify: `src/components/subscribe-cta.tsx`

- [ ] **Step 1: Read current subscribe-cta**

```bash
cat /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/components/subscribe-cta.tsx
```

- [ ] **Step 2: Restyle the existing component**

Preserve the existing form / mailto / Substack-link logic. Only change the visual shell. Use this pattern (adapt to actual props):

```tsx
import Link from "next/link";

export function SubscribeCta() {
  return (
    <aside className="border-t border-[var(--color-rule)] mt-16 pt-12">
      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-low)] mb-2">
            Subscribe
          </div>
          <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-[24px] tracking-[-0.02em] leading-tight">
            The Data Product Agent.
          </h3>
          <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-2 max-w-[480px]">
            Long-form work on AI-native product building. Currently transitioning to The Composer.
          </p>
        </div>
        <Link
          href="https://thedataproductagent.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-arctic)] text-[var(--color-arctic)] hover:bg-[var(--color-arctic)] hover:text-[var(--color-bg)] font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase transition-colors rounded-sm whitespace-nowrap"
        >
          Subscribe ↗
        </Link>
      </div>
    </aside>
  );
}
```

If the current component takes props (className, variant), preserve them.

- [ ] **Step 3: Verify + visual check**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

Open `/writing` and `/writing/[slug]` in dev — the subscribe CTA should now blend with dark theme.

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/subscribe-cta.tsx
git commit -m "feat(redesign-v2): restyle SubscribeCta in dark theme"
git push
```

---

### Task 4: Carry-over — remove legacy portfolioProjects + PortfolioProject

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Verify no remaining usages**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
grep -rn "portfolioProjects\|PortfolioProject" src/
```

Should return only the constants.ts definition itself, OR be empty after Tasks 1+2 migrations. If anything still references these outside constants.ts, fix that reference first (it's an unmigrated caller).

- [ ] **Step 2: Remove the legacy export**

In `src/lib/constants.ts`, delete:
- the `PortfolioProject` interface
- the `portfolioProjects` array

KEEP everything else (Project, ProjectStatus, ProjectCategory, FEATURED, MODELING_LAB, RE_STACK, ALL_PROJECTS, siteConfig).

- [ ] **Step 3: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/lib/constants.ts
git commit -m "chore(redesign-v2): remove legacy portfolioProjects + PortfolioProject"
git push
```

---

### Task 5: Build MagazineSpread component

**Files:**
- Create: `src/components/magazine-spread.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE, DURATION } from "@/lib/motion";
import type { Project } from "@/lib/constants";

interface Props {
  project: Project;
  index: number;            // 0-based — drives "01 / 04" + reverse alternation
  total: number;
  reverse?: boolean;        // override alternation if needed
  motionCanvas?: ReactNode; // signature motion goes in the color block
  manifesto: ReactNode;     // 3-4 lines of italic-serif manifesto
  lede: ReactNode;          // problem/system/outcome lede on the dark side
  tags?: string[];
}

export function MagazineSpread({
  project, index, total, reverse, motionCanvas, manifesto, lede, tags,
}: Props) {
  const isReversed = reverse ?? (index % 2 === 1);

  const colorBlock = (
    <div
      className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between p-10 md:p-16 overflow-hidden"
      style={{ background: project.color }}
    >
      <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[rgba(0,0,0,0.55)]">
        Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Signature motion canvas — passed in by case-study page */}
      <div className="relative flex-1 my-8 flex items-center justify-center">
        {motionCanvas}
      </div>

      <div className="font-[family-name:var(--font-instrument)] italic text-[clamp(20px,2.4vw,32px)] leading-snug text-[rgba(0,0,0,0.85)] max-w-[480px]">
        {manifesto}
      </div>
    </div>
  );

  const contentBlock = (
    <div className="min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between p-10 md:p-16 bg-[var(--color-bg)]">
      <div>
        <div
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: project.color }}
        >
          {project.status.toUpperCase()} · 2026
        </div>
        <h2
          className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(48px,6vw,96px)] tracking-[-0.05em] leading-[0.95] mb-6"
        >
          {project.name}
        </h2>
        <div className="text-[16px] text-[var(--color-paper-mid)] leading-relaxed max-w-[520px]">
          {lede}
        </div>
      </div>

      <div className="mt-12">
        {tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t) => (
              <span
                key={t}
                className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.16em] uppercase px-3 py-1.5 border border-[var(--color-rule)] rounded-full text-[var(--color-paper-mid)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase border-b pb-1 transition-colors"
            style={{ color: project.color, borderColor: project.color }}
          >
            Visit {project.name} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-low)]"
          >
            In active development
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.section
      id={project.slug}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: DURATION.base, ease: EASE.out }}
      className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--color-rule)]"
    >
      {isReversed ? (
        <>
          {contentBlock}
          {colorBlock}
        </>
      ) : (
        <>
          {colorBlock}
          {contentBlock}
        </>
      )}
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify TS + build**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/magazine-spread.tsx
git commit -m "feat(redesign-v2): add MagazineSpread component for case-study layouts"
git push
```

---

### Task 6: Build ScrollNarrative component (shared by case studies)

**Files:**
- Create: `src/components/case-study/scroll-narrative.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

interface Section {
  label: string;          // e.g. "PROBLEM"
  title: string;           // big italic title
  body: ReactNode;
}

interface Props {
  sections: Section[];
  accent: string;          // CSS var ref
}

export function ScrollNarrative({ sections, accent }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-32 space-y-32">
      {sections.map((s, i) => (
        <motion.section
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: DURATION.slow, ease: EASE.out, delay: i * STAGGER.fast }}
          className="grid md:grid-cols-[180px_1fr] gap-10"
        >
          <div
            className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase pt-3"
            style={{ color: accent }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-6 h-px" style={{ background: accent }} />
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-[var(--color-paper-mid)]">{s.label}</div>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-instrument)] italic text-[clamp(28px,3.6vw,52px)] tracking-[-0.015em] leading-snug mb-6">
              {s.title}
            </h2>
            <div className="text-[16px] text-[var(--color-paper-mid)] leading-[1.8] max-w-[680px] space-y-4">
              {s.body}
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/case-study/scroll-narrative.tsx
git commit -m "feat(redesign-v2): add ScrollNarrative component for case-study sections"
git push
```

---

### Task 7: NexusWatch globe (signature motion + lazy Three.js)

**Files:**
- Create: `src/components/case-study/nexuswatch-globe.tsx`
- Modify: `package.json`

- [ ] **Step 1: Install Three.js**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npm install three
npm install -D @types/three
```

- [ ] **Step 2: Create the globe component**

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  size?: number;       // px, default 320
  density?: number;    // pulse-dot count, default 36
}

export function NexusWatchGlobe({ size = 320, density = 36 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const mount = mountRef.current;
      if (!mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Wireframe sphere
      const sphereGeo = new THREE.SphereGeometry(1, 32, 24);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x8ecfe8,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      scene.add(sphere);

      // Pulse dots distributed on sphere surface
      const dotGeometry = new THREE.SphereGeometry(0.018, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x8ecfe8 });
      const dots: { mesh: THREE.Mesh; phase: number }[] = [];
      for (let i = 0; i < density; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        const dot = new THREE.Mesh(dotGeometry, dotMat.clone());
        dot.position.set(x, y, z);
        scene.add(dot);
        dots.push({ mesh: dot, phase: Math.random() * Math.PI * 2 });
      }

      let raf = 0;
      const start = performance.now();
      const tick = () => {
        const t = (performance.now() - start) / 1000;
        if (!reduced) sphere.rotation.y = t * 0.15;
        for (const d of dots) {
          const m = d.mesh.material as THREE.MeshBasicMaterial;
          m.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + d.phase));
          m.transparent = true;
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        renderer.dispose();
        sphereGeo.dispose();
        sphereMat.dispose();
        dotGeometry.dispose();
        for (const d of dots) (d.mesh.material as THREE.Material).dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    })();

    return () => { cleanup?.(); };
  }, [size, density]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/case-study/nexuswatch-globe.tsx package.json package-lock.json
git commit -m "feat(redesign-v2): add NexusWatch signature motion — Three.js wireframe globe + pulse dots"
git push
```

---

### Task 8: Composer typewrite motion

**Files:**
- Create: `src/components/case-study/composer-typeweave.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  text?: string;
  loop?: boolean;
}

const DEFAULT = "DRAFT REVIEW APPROVE PUBLISH";

export function ComposerTypeweave({ text = DEFAULT, loop = true }: Props) {
  const letters = text.split("");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!loop) return;
    const id = setInterval(() => setCycle((c) => c + 1), text.length * 80 + 2400);
    return () => clearInterval(id);
  }, [loop, text.length]);

  return (
    <div className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(32px,5vw,80px)] leading-none tracking-[-0.04em] text-[rgba(0,0,0,0.85)]">
      {letters.map((char, i) => (
        <motion.span
          key={`${cycle}-${i}`}
          initial={{ opacity: 0, y: 14, fontVariationSettings: '"wght" 300' }}
          animate={{ opacity: 1, y: 0, fontVariationSettings: '"wght" 800' }}
          transition={{
            duration: 0.42,
            delay: i * 0.06 + Math.random() * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: char === " " ? "0.18em" : 0 }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/case-study/composer-typeweave.tsx
git commit -m "feat(redesign-v2): add Composer signature motion — letter-by-letter type-weave w/ variable axis"
git push
```

---

### Task 9: Product OS code-scroll motion

**Files:**
- Create: `src/components/case-study/product-os-codescroll.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "spec:",
  "  name: Product OS",
  "  status: build",
  "  routes:",
  "    - /api/specs",
  "    - /dashboard",
  "rules:",
  "  - all-changes-tracked",
  "  - changes-must-be-reviewed",
  "  - audit: enabled",
  "owners: [@ethanstuart]",
  "version: 0.1.0",
  "",
];

export function ProductOSCodeScroll() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 320;
    const H = 320;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(0,0,0,0.85)";
      ctx.font = '12px "DM Mono", ui-monospace, monospace';
      const lineH = 18;
      const total = LINES.length * lineH;

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < LINES.length; i++) {
          const y = i * lineH - offset + pass * total;
          if (y > -lineH && y < H + lineH) {
            ctx.fillText(LINES[i], 14, y);
          }
        }
      }
      if (!reduced) offset = (offset + 0.4) % total;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="rounded-md" />;
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/case-study/product-os-codescroll.tsx
git commit -m "feat(redesign-v2): add Product OS signature motion — code-scroll canvas"
git push
```

---

### Task 10: Zero to Ship trajectory motion

**Files:**
- Create: `src/components/case-study/zts-trajectory.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "framer-motion";

const MILESTONES = ["IDEA", "DRAFT", "BUILD", "SHIP"];

export function ZTSTrajectory() {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      aria-hidden="true"
      className="overflow-visible"
    >
      <motion.path
        d="M 20 280 Q 80 180 160 160 T 300 40"
        fill="none"
        stroke="rgba(0,0,0,0.6)"
        strokeWidth="1.5"
        strokeDasharray="2 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {MILESTONES.map((label, i) => {
        const t = i / (MILESTONES.length - 1);
        const cx = 20 + t * 280;
        const cy = 280 - t * 240 - 16 * Math.sin(t * Math.PI);
        return (
          <motion.g
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + t * 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle cx={cx} cy={cy} r={6} fill="rgba(0,0,0,0.85)" />
            <text
              x={cx + 12}
              y={cy + 4}
              fontFamily="DM Mono, monospace"
              fontSize="10"
              fontWeight="500"
              letterSpacing="0.18em"
              fill="rgba(0,0,0,0.75)"
            >
              {label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/case-study/zts-trajectory.tsx
git commit -m "feat(redesign-v2): add Zero to Ship signature motion — trajectory arc + milestones"
git push
```

---

### Task 11: NexusWatch case-study page

**Files:**
- Modify: `src/app/portfolio/[slug]/page.tsx` — replace stub with full case-study switch

- [ ] **Step 1: Replace `[slug]/page.tsx` with a switch-on-slug renderer**

```tsx
import { notFound } from "next/navigation";
import { ALL_PROJECTS, FEATURED } from "@/lib/constants";
import { MagazineSpread } from "@/components/magazine-spread";
import { ScrollNarrative } from "@/components/case-study/scroll-narrative";
import { NexusWatchGlobe } from "@/components/case-study/nexuswatch-globe";
import { ComposerTypeweave } from "@/components/case-study/composer-typeweave";
import { ProductOSCodeScroll } from "@/components/case-study/product-os-codescroll";
import { ZTSTrajectory } from "@/components/case-study/zts-trajectory";

interface Params { slug: string; }

export async function generateStaticParams(): Promise<Params[]> {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Ethan Stuart`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const featuredIndex = FEATURED.findIndex((p) => p.slug === slug);
  const isFeatured = featuredIndex >= 0;

  if (!isFeatured) {
    // Modeling Lab + RE Stack vignettes get a slimmer page (Phase 2 keeps it minimal)
    return (
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-32">
        <div
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: project.color }}
        >
          {project.category.toUpperCase()} · {project.status.toUpperCase()}
        </div>
        <h1 className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(48px,7vw,128px)] tracking-[-0.05em] leading-[0.95]">
          {project.name}
        </h1>
        <p className="text-[16px] text-[var(--color-paper-mid)] leading-relaxed max-w-[640px] mt-6">
          {project.description}
        </p>
      </section>
    );
  }

  // Featured case-study layout
  const motionFor: Record<string, JSX.Element> = {
    "nexuswatch":     <NexusWatchGlobe size={320} density={42} />,
    "the-composer":   <ComposerTypeweave text="DRAFT · REVIEW · APPROVE · PUBLISH" />,
    "product-os":     <ProductOSCodeScroll />,
    "zero-to-ship":   <ZTSTrajectory />,
  };

  const NARRATIVES = getNarrative(project.slug);

  return (
    <>
      <MagazineSpread
        project={project}
        index={featuredIndex}
        total={FEATURED.length}
        motionCanvas={motionFor[project.slug]}
        manifesto={NARRATIVES.manifesto}
        lede={NARRATIVES.lede}
        tags={NARRATIVES.tags}
      />
      <ScrollNarrative sections={NARRATIVES.sections} accent={project.color} />
    </>
  );
}

function getNarrative(slug: string) {
  switch (slug) {
    case "nexuswatch":
      return {
        manifesto: "Real-time geopolitical intelligence — built solo, run continuously, sized to compete with platform vendors.",
        tags: ["86 Countries", "45+ Layers", "AI Risk Analyst", "Globe Visualization", "Built Solo"],
        lede: <>NexusWatch is a global threat-monitoring platform with an AI risk analyst, 45+ data layers across politics, conflict, climate, and economics, and a real-time globe visualization. Production-grade output from a one-person engineering org.</>,
        sections: [
          { label: "PROBLEM", title: "Geopolitical risk is fragmented across 86 country feeds.", body: <p>Enterprise customers paid six-figures to vendor platforms with stale data, opaque scoring, and zero AI-native analysis. The signal exists in public sources — what was missing was the orchestration.</p> },
          { label: "SYSTEM", title: "AI analyst on top of an event pipeline.", body: <p>Crisis cron pulls structured event data from 45+ sources, normalizes into a unified schema, scores each event on a country-confidence axis, and feeds an LLM analyst that produces narrative explanations on demand. The globe is the index; the analyst is the product.</p> },
          { label: "WHAT'S LIVE", title: "v2 API, Discord bot, trust layer, public globe.", body: <p>Public site at nexuswatch.io, v2 API in private beta, Discord bot for live alerts, verification trust layer surfacing source provenance, and a developing crisis-response forecasting module. 86 countries with continuous monitoring.</p> },
        ],
      };
    case "the-composer":
      return {
        manifesto: "An agentic editorial framework — the operator's newsroom, run by ten personas, built around context engineering as the scarce resource.",
        tags: ["Multi-Agent", "10 Personas", "Editorial Pipeline", "Masthead Expansion"],
        lede: <>The Composer is an agentic editorial framework: a 10-persona board reviews drafts, a multi-step pipeline takes notes through interview → draft → review → approve, and the operator stays on direction-setting work. Masthead is the productized expansion that turns this into a multi-tenant editorial OS.</>,
        sections: [
          { label: "PROBLEM", title: "Drafting in public is a quality risk.", body: <p>Newsletters that publish raw operator thinking have a quality ceiling — readers stop forwarding. Persona-based review preserves the voice while raising the floor.</p> },
          { label: "SYSTEM", title: "Notes → Structured → Interview → Draft → Editor → Reader → Approved.", body: <p>An explicit state machine. Each transition gates on a persona pass/fail. Two consecutive editor failures escalate to the operator. Rejected drafts return to interview, not to notes — preserving the operator's previous thinking work.</p> },
          { label: "BOARD", title: "Strategist, Architect, Editor, Journalist, Peer, Revenue Partner, PM Reader, Founder Reader, Chief of Staff, CDO.", body: <p>Each persona is an LLM agent with a system prompt anchored to a real editorial archetype. They evaluate the draft from a single, narrow lens — rigor of argument, narrative arc, voice authenticity, conversion mechanism, design judgment.</p> },
          { label: "MASTHEAD", title: "The product layer on top.", body: <p>Multi-tenant Turborepo build: Clerk auth, Neon Postgres + RLS, direct Anthropic SDK, Vercel AI SDK for streaming UI. Free tier ships council reviews; paid tier opens the pipeline editor + agent customization + analytics.</p> },
        ],
      };
    case "product-os":
      return {
        manifesto: "Spec-as-code for product teams — the way Terraform and Helm did it for infrastructure, applied to the messy work of writing, reviewing, and shipping product specs.",
        tags: ["OSS CLI", "Dashboard", "GitHub App", "2027 Show HN"],
        lede: <>Product OS treats product specs as version-controlled, reviewable artifacts that live in your repository. OSS CLI for spec authoring + linting; commercial dashboard for review + analytics; GitHub App that runs spec checks on PRs.</>,
        sections: [
          { label: "PROBLEM", title: "Specs decay the moment they leave the doc.", body: <p>Notion-and-Google-Docs specs are read once, then go stale as the product changes. Engineering specs live in code; product specs deserve the same treatment.</p> },
          { label: "SYSTEM", title: "CLI + GitHub App + Dashboard.", body: <p>Authors use the CLI to scaffold and lint specs. The GitHub App runs spec checks on PRs (do test cases match the requirements? are owners assigned?). The dashboard surfaces spec coverage and review velocity across teams.</p> },
          { label: "ROADMAP", title: "OSS first, commercial layer second.", body: <p>Show HN target: September 2026. Free OSS CLI builds adoption. Commercial dashboard + GitHub App enter when the OSS user base hits a meaningful threshold.</p> },
        ],
      };
    case "zero-to-ship":
      return {
        manifesto: "An AI coding course built around the actual method — gamified, shipping-first, modeled on the work that builds the rest of this portfolio.",
        tags: ["16 Modules", "Gamified", "AI-First", "Shipping-First"],
        lede: <>Zero to Ship is a 16-module course teaching the AI-native shipping method — exactly the method used to build NexusWatch, The Composer, Product OS, Meridian, and the rest. Outcomes-anchored, gamified progression, real shipping projects.</>,
        sections: [
          { label: "PROBLEM", title: "Tutorials don't teach shipping.", body: <p>Most AI coding content is "build a chatbot in 30 minutes." That's not what shipping looks like. Shipping is shape-of-the-problem, scaffolding decisions, deploy choices, and what you cut to make a deadline.</p> },
          { label: "SYSTEM", title: "16 modules, shipping projects, AI-first throughout.", body: <p>Each module has a real outcome: a working artifact, deployed, with a real user (even if that's the student). AI is woven into every module — pair-programming, spec generation, code review — not isolated to a single "now use AI" lesson.</p> },
          { label: "WHO IT'S FOR", title: "Developers who want to ship more, not learn more.", body: <p>Targets working engineers and PM-engineers who already know how to code but feel slow shipping. Output: a portfolio of real artifacts at the end.</p> },
        ],
      };
    default:
      return { manifesto: "", lede: null, tags: [], sections: [] };
  }
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -10
git add src/app/portfolio/[slug]/page.tsx
git commit -m "feat(redesign-v2): full case-study pages — magazine spread + scroll narrative + signature motion"
git push
```

This single task replaces the stub with all 4 case studies because the renderer is data-driven on slug. Each case study uses the matching signature-motion component built in Tasks 7–10.

---

### Task 12: Update /portfolio page to render featured spreads inline

**Files:**
- Modify: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Read current portfolio**

```bash
cat /Users/ethanstuart/Projects/Public-Brand-Website-Claude/src/app/portfolio/page.tsx
```

- [ ] **Step 2: Replace with inline spreads**

The /portfolio page should now show all 4 featured projects as full magazine spreads (not just rows), then the Lab + RE strips.

```tsx
import { Section } from "@/components/section";
import { LabStrip } from "@/components/lab-strip";
import { MagazineSpread } from "@/components/magazine-spread";
import { ScrollNarrative } from "@/components/case-study/scroll-narrative";
import { NexusWatchGlobe } from "@/components/case-study/nexuswatch-globe";
import { ComposerTypeweave } from "@/components/case-study/composer-typeweave";
import { ProductOSCodeScroll } from "@/components/case-study/product-os-codescroll";
import { ZTSTrajectory } from "@/components/case-study/zts-trajectory";
import { FEATURED, MODELING_LAB, RE_STACK } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Portfolio — Ethan Stuart",
  description:
    "Six products live in 2026 — geopolitical intelligence, multi-agent editorial infrastructure, lending intelligence, AI education, systematic trading, spec-as-code tooling.",
};

const MOTION_FOR: Record<string, JSX.Element> = {
  "nexuswatch":     <NexusWatchGlobe size={260} density={32} />,
  "the-composer":   <ComposerTypeweave text="DRAFT · REVIEW · APPROVE" />,
  "product-os":     <ProductOSCodeScroll />,
  "zero-to-ship":   <ZTSTrajectory />,
};

const SHORT_LEDE: Record<string, string> = {
  "nexuswatch":     "Real-time geopolitical intelligence with an AI risk analyst, 45+ data layers, and live country-by-country monitoring.",
  "the-composer":   "Agentic editorial framework — 10-persona board, structured pipeline, productized via Masthead.",
  "product-os":     "Spec-as-code for PMs. OSS CLI + GitHub App + dashboard — Show HN target September 2026.",
  "zero-to-ship":   "AI coding course platform. 16 modules, shipping-first, gamified.",
};

const SHORT_MANIFESTO: Record<string, string> = {
  "nexuswatch":     "Threat monitoring at platform scale — built solo.",
  "the-composer":   "An operator's newsroom, run by personas.",
  "product-os":     "Specs that live in your repo, reviewed like code.",
  "zero-to-ship":   "Teach the actual method — outcomes, not tutorials.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section
        label="SELECTED WORK"
        title="Six products. All live in 2026."
        description="Four featured products as full magazine spreads. Two thematic sections — Modeling Lab + RE Stack — for the rest of the portfolio."
      >
        <Link
          href="#nexuswatch"
          className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
        >
          Scroll to first featured ↓
        </Link>
      </Section>

      {FEATURED.map((p, i) => (
        <MagazineSpread
          key={p.slug}
          project={p}
          index={i}
          total={FEATURED.length}
          motionCanvas={MOTION_FOR[p.slug]}
          manifesto={SHORT_MANIFESTO[p.slug]}
          lede={SHORT_LEDE[p.slug]}
        />
      ))}

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

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -10
git add src/app/portfolio/page.tsx
git commit -m "feat(redesign-v2): /portfolio shows full magazine spreads inline"
git push
```

---

### Task 13: Build mini-globe for Hero corner

**Files:**
- Create: `src/components/hero-mini-globe.tsx`

- [ ] **Step 1: Create lightweight CSS-only mini-globe (no Three.js for the home page)**

```tsx
"use client";

import { useEffect, useState } from "react";

export function HeroMiniGlobe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // 12 fixed pulse positions on the visible hemisphere
  const dots = [
    { top: "22%", left: "50%", delay: 0   },
    { top: "30%", left: "30%", delay: 0.4 },
    { top: "40%", left: "68%", delay: 0.9 },
    { top: "55%", left: "42%", delay: 1.6 },
    { top: "62%", left: "60%", delay: 2.1 },
    { top: "48%", left: "20%", delay: 2.6 },
    { top: "70%", left: "30%", delay: 3.1 },
    { top: "35%", left: "78%", delay: 3.6 },
    { top: "50%", left: "82%", delay: 4.1 },
    { top: "78%", left: "55%", delay: 4.6 },
    { top: "25%", left: "62%", delay: 5.1 },
    { top: "65%", left: "75%", delay: 5.6 },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-20 h-20 rounded-full border border-[rgba(142,207,232,0.4)]"
      style={{
        background: "radial-gradient(circle at 35% 35%, rgba(142,207,232,0.15), transparent 60%)",
      }}
    >
      {/* meridian lines */}
      <div className="absolute inset-1 rounded-full border border-[rgba(142,207,232,0.15)]" />
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: "rgba(142,207,232,0.18)" }}
      />
      <div
        className="absolute inset-y-0 left-1/2 w-px"
        style={{ background: "rgba(142,207,232,0.18)" }}
      />
      {/* pulse dots */}
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-arctic)]"
          style={{
            top: d.top,
            left: d.left,
            transform: "translate(-50%, -50%)",
            animation: reduced ? undefined : `pulse-dot 6s ease-in-out ${d.delay}s infinite`,
            boxShadow: "0 0 6px var(--color-arctic)",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.2; }
          15%      { opacity: 1; }
          50%      { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/hero-mini-globe.tsx
git commit -m "feat(redesign-v2): add HeroMiniGlobe — CSS-only pulse-dot widget for hero corner"
git push
```

---

### Task 14: Build live-indicators (latest commit + latest Substack post)

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/components/live-indicators.tsx`

- [ ] **Step 1: Build GitHub fetcher**

Write `src/lib/github.ts`:

```typescript
// Fetches the most recent public commit timestamp from a GitHub user.
// Uses the public events API — no auth needed for low rate. ISR'd at the consumer.

export interface LatestCommit {
  repo: string;
  message: string;
  date: string;          // ISO
  url: string;
}

const USER = "ethancstuart";

export async function getLatestCommit(): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/events/public?per_page=30`,
      { next: { revalidate: 600 }, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return null;
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo: { name: string };
      payload?: { commits?: Array<{ message: string; sha: string; url: string }> };
    }>;
    const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length);
    const commit = push?.payload?.commits?.[push.payload.commits.length - 1];
    if (!push || !commit) return null;
    return {
      repo: push.repo.name,
      message: commit.message.split("\n")[0].slice(0, 80),
      date: push.created_at,
      url: `https://github.com/${push.repo.name}/commit/${commit.sha}`,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Build LiveIndicators server component**

Write `src/components/live-indicators.tsx`:

```tsx
import { getLatestCommit } from "@/lib/github";
import { getSubstackPosts } from "@/lib/substack";

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export async function LiveIndicators() {
  const [commit, posts] = await Promise.all([
    getLatestCommit(),
    getSubstackPosts().catch(() => []),
  ]);
  const post = posts?.[0];

  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase">
      {commit && (
        <li className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-arctic)]"
            style={{ boxShadow: "0 0 6px var(--color-arctic)" }}
          />
          <span className="text-[var(--color-paper-mid)]">Currently shipping:</span>
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-paper)] hover:text-[var(--color-arctic)] transition-colors lowercase tracking-[0.04em]"
          >
            {commit.repo.split("/").slice(-1)[0]} · {timeAgo(commit.date)}
          </a>
        </li>
      )}
      {post && (
        <li className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-indigo)]"
            style={{ boxShadow: "0 0 6px var(--color-indigo)" }}
          />
          <span className="text-[var(--color-paper-mid)]">Now writing:</span>
          <a
            href={`/writing/${post.slug}`}
            className="text-[var(--color-paper)] hover:text-[var(--color-indigo)] transition-colors lowercase tracking-[0.04em]"
          >
            {post.title.slice(0, 48)}{post.title.length > 48 ? "…" : ""}
          </a>
        </li>
      )}
    </ul>
  );
}
```

(Adapt to actual `getSubstackPosts` signature if different. If `slug` isn't on the post object, use `post.guid` or a hash.)

- [ ] **Step 3: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/lib/github.ts src/components/live-indicators.tsx
git commit -m "feat(redesign-v2): add LiveIndicators — latest commit + latest Substack post"
git push
```

---

### Task 15: Mount HeroMiniGlobe + LiveIndicators in Hero

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/app/page.tsx` (add `<LiveIndicators />` inline since it's a server component)

- [ ] **Step 1: Update Hero to include the mini-globe in the top-right**

The Hero is a client component (uses framer-motion). Add the mini-globe as a corner widget. Patch the Hero JSX:

Find the placeholder gradient div (`<div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25" .../>`) and after it, ADD:

```tsx
<div className="absolute top-24 right-6 md:right-12 z-10">
  <HeroMiniGlobe />
</div>
```

Add the import at the top:
```tsx
import { HeroMiniGlobe } from "@/components/hero-mini-globe";
```

- [ ] **Step 2: Mount LiveIndicators on the home page**

LiveIndicators is an async server component, so it can't go inside Hero (client). Mount it on the home page, just below the Hero:

In `src/app/page.tsx`, add the import:
```tsx
import { LiveIndicators } from "@/components/live-indicators";
```

And insert below `<Hero />`:
```tsx
<Hero />

<div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-8 md:-mt-12 relative z-10">
  <LiveIndicators />
</div>

<Section ...>
```

- [ ] **Step 3: Verify + visual check**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -10
```

In dev: home page shows mini-globe in top-right of hero, and "currently shipping" + "now writing" indicators just below the hero CTA row.

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat(redesign-v2): mount HeroMiniGlobe + LiveIndicators on home"
git push
```

---

### Task 16: Add layoutId to FeaturedRow for shared-element transitions

**Files:**
- Modify: `src/components/featured-row.tsx`

- [ ] **Step 1: Add motion.layoutId hooks**

The shared-element morph between `/` (or `/portfolio`) → `/portfolio/[slug]` only works if both surfaces wrap the shared element with the same `layoutId`. Update `FeaturedRows`:

In `src/components/featured-row.tsx`, change the project name `<div>` to a `<motion.div>` with `layoutId={`project-name-${p.slug}`}`:

```tsx
import { motion, LayoutGroup } from "framer-motion";

// ... inside the FeaturedRows function, wrap the entire <ul> with <LayoutGroup>:
return (
  <LayoutGroup>
    <ul className="border-t border-[var(--color-rule)]">
      {projects.map((p, i) => (
        <motion.li ...>
          <Link ...>
            <div className="grid ...">
              <motion.div
                layoutId={`project-name-${p.slug}`}
                className="font-[family-name:var(--font-syne)] font-extrabold ..."
              >
                {p.name}
              </motion.div>
              {/* rest of the row */}
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  </LayoutGroup>
);
```

The case-study page (`/portfolio/[slug]`) uses MagazineSpread, which renders `project.name` as an `<h2>`. To pair the morph, wrap that `<h2>` with `motion.h2` and the same `layoutId`:

In `src/components/magazine-spread.tsx`, change:
```tsx
<h2 className="font-[family-name:var(--font-bricolage)] ...">
  {project.name}
</h2>
```
to:
```tsx
<motion.h2
  layoutId={`project-name-${project.slug}`}
  className="font-[family-name:var(--font-bricolage)] ..."
>
  {project.name}
</motion.h2>
```

(Add `motion` import if not already there.)

NOTE: Framer Motion shared-element transitions require the destination component to mount BEFORE the origin unmounts. In Next.js App Router this works for client-side route transitions (Link clicks), but not for hard reloads. Acceptable for Phase 2.

- [ ] **Step 2: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npx tsc --noEmit && npm run build 2>&1 | tail -5
```

In dev: click a featured row → the project name should morph (size/font/position change) instead of cutting. May not be perfectly smooth without GSAP timeline (Phase 3); acceptable.

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/featured-row.tsx src/components/magazine-spread.tsx
git commit -m "feat(redesign-v2): shared-element page transitions — project name morph between row and spread"
git push
```

---

### Task 17: Update Playwright smoke test for case-study routes

**Files:**
- Modify: `tests/redesign-v2-routes.spec.ts`

- [ ] **Step 1: Add case-study routes**

Append to the ROUTES array:

```typescript
{ path: "/portfolio/nexuswatch",   expectText: "NexusWatch" },
{ path: "/portfolio/the-composer", expectText: "Composer"   },
{ path: "/portfolio/product-os",   expectText: "Product OS" },
{ path: "/portfolio/zero-to-ship", expectText: "Zero to Ship" },
{ path: "/portfolio/quant-engine", expectText: "Quant Engine" },
{ path: "/portfolio/sports-ml",    expectText: "Sports ML"  },
{ path: "/portfolio/meridian",     expectText: "Meridian"   },
{ path: "/portfolio/ridgecap",     expectText: "RidgeCap"   },
```

- [ ] **Step 2: Run + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx playwright test tests/redesign-v2-routes.spec.ts --project=chromium 2>&1 | tail -30
```

All 14 routes should pass. If any fail, check the page rendered correctly and that the expected text actually appears.

```bash
git add tests/redesign-v2-routes.spec.ts
git commit -m "test(redesign-v2): playwright smoke test covers all 8 case-study routes"
git push
```

---

### Task 18: Lighthouse audit Phase 2 routes

**Files:** none modified

- [ ] **Step 1: Build + serve**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
rm -rf .next && npm run build 2>&1 | tail -10
nohup npm start > /tmp/next-prod-p2.log 2>&1 &
echo $! > /tmp/next-pid
sleep 6
```

- [ ] **Step 2: Run Lighthouse on home + 4 case-study pages**

```bash
PORT=3000
for route in "" "portfolio" "portfolio/nexuswatch" "portfolio/the-composer" "portfolio/product-os" "portfolio/zero-to-ship"; do
  url="http://localhost:$PORT/$route"
  out="/tmp/lh-p2-$(echo "$route" | tr '/' '-' || echo home).json"
  echo "=== $url ==="
  npx lighthouse "$url" --quiet --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox" --output=json --output-path="$out" 2>&1 | tail -3
done

for f in /tmp/lh-p2-*.json; do
  echo "--- $f ---"
  node -e "const d=require('$f');for(const k of Object.keys(d.categories)){console.log(k.padEnd(18), Math.round(d.categories[k].score*100));}"
done
```

Phase 2 targets (lower than spec final because case-study heavy motion):
- Performance ≥ 80 on case-study pages, ≥ 85 on home/portfolio
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

- [ ] **Step 3: Stop server, commit any fixes**

```bash
kill $(cat /tmp/next-pid) 2>/dev/null
```

If a category fails materially, address it. Common Phase 2 issues:
- Three.js bundle on `/portfolio/nexuswatch` may push Performance below target. Confirm Three.js is dynamically imported and not bundled into other routes (verify with `npm run build` route summary — non-NX routes should NOT show Three.js in their dependencies).
- `aria-hidden` on motion canvases is correct (decorative).
- Color contrast: same `paper-low` watch as Phase 1.

If fixes needed:
```bash
git add -A
git commit -m "perf(redesign-v2): Phase 2 Lighthouse fixes — <specifics>"
git push
```

---

### Task 19: Phase 2 close-out

**Files:**
- Modify: `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md` (append Appendix D)

- [ ] **Step 1: Tag**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git tag redesign-v2-phase-2 -m "Phase 2 complete — magazine spreads, signature motion, live elements, shared transitions"
git push --tags
```

- [ ] **Step 2: Append Appendix D to spec**

Add at the bottom of `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md`:

```markdown

## Appendix D — Phase 2 close-out (DATE)

Phase 2 shipped to `redesign-v2` branch, tagged `redesign-v2-phase-2`. All 4 featured products now have full case-study pages with magazine-spread layout + per-project signature motion:

- **NexusWatch** — Three.js wireframe globe with 42 pulse dots (`src/components/case-study/nexuswatch-globe.tsx`). Lazy-loaded; ~150kb gzip on this route only.
- **The Composer** — Letter-by-letter type-weave using Bricolage Grotesque variable axis (`src/components/case-study/composer-typeweave.tsx`).
- **Product OS** — Canvas-rendered code-scroll resolving into spec block (`src/components/case-study/product-os-codescroll.tsx`).
- **Zero to Ship** — SVG trajectory arc with milestone dots (`src/components/case-study/zts-trajectory.tsx`).

Plus:
- `<MagazineSpread>` reusable component for per-project layouts
- `<ScrollNarrative>` shared component for problem/system/outcome sections
- `<HeroMiniGlobe>` CSS-only pulse-dot globe in hero corner
- `<LiveIndicators>` server component pulling latest GitHub commit + latest Substack post
- Shared-element transitions on project name (Framer `layoutId`)
- /portfolio renders all 4 spreads inline

Phase 1 carry-overs RESOLVED:
- Sitemap now uses `ALL_PROJECTS` (all 8 case-study routes indexed)
- jsonld migrated from `PortfolioProject` → `Project`
- SubscribeCta restyled in dark theme
- Legacy `portfolioProjects` + `PortfolioProject` removed from constants.ts

### Lighthouse — Phase 2 scores

(fill in actuals from Task 18)

### Phase 3 carry-overs (open issues for the next plan)

1. **WebGL shader hero** — replace placeholder gradient on `/` with OGL mesh-gradient + cursor distortion
2. **Variable-font scroll weight** — drive Bricolage `wght` axis on case-study display headlines from scroll position via GSAP ScrollTrigger
3. **GSAP master timeline** — promote case-study sections to scroll-tied independent tracks (type / image / color on different ScrollTriggers)
4. **Custom cursor** — phantom-style magnetic cursor on case-study tiles + project name hovers (decision: enabled on case-study pages only)
5. **Hero LCP optimization** — investigate trimming framer-motion delay on the hero's last paragraph; consider `will-change: opacity`
6. **Real screenshots** — replace any placeholder PNGs in `public/portfolio/` with high-res actual product screenshots once available
7. **A11y contrast** — final pass on `paper-low` opacity tokens in fact-card metadata + portfolio card metadata
8. **GitHub commit indicator** — currently uses public events API (no auth, low rate); if we hit rate limits, switch to a small Vercel cron writing latest commit to a file
9. **Mobile responsive audit** — case-study spreads are designed desktop-first; verify mobile reading order
10. **Page transition orchestration polish** — Framer `layoutId` morphs are functional but rough; Phase 3 GSAP timeline should make them cinematic

Phase 3 plan to be written next.
```

Replace `(fill in actuals from Task 18)` with the actual Lighthouse scores recorded in Task 18.

- [ ] **Step 3: Commit close-out**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md
git commit -m "docs(redesign-v2): phase 2 close-out — appendix D with Lighthouse + Phase 3 carry-overs"
git push
```

- [ ] **Step 4: Final verification**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git log --oneline redesign-v2-phase-1..HEAD | head -25
git tag --list 'redesign-v2*'
```

Should show ~19 new commits since Phase 1 close, and both `redesign-v2-phase-1` and `redesign-v2-phase-2` tags.

---

## Self-Review

Spec coverage check:
- §5.9 magazine spreads → Tasks 5, 12 ✓
- §5.10 case-study art direction → Tasks 6 (ScrollNarrative), 11 (4 case studies) ✓
- §6 per-project signature motion → Tasks 7, 8, 9, 10 ✓
- §7 motion stack: row 1 (signature motion) → Tasks 7-10 ✓ ; row 2 (live elements) → Tasks 13, 14, 15 ✓ ; row 4 (shared-element transitions) → Task 16 ✓
- Phase 1 carry-overs (sitemap, jsonld, subscribe-cta, legacy types) → Tasks 1, 2, 3, 4 ✓

Phase 3 deferred items (intentionally NOT in this plan):
- WebGL shader hero (row 3)
- Variable-font scroll weight (row 5)
- GSAP master timeline (row 6)
- Custom cursor

No placeholders. Type names consistent. All file paths absolute or anchored to project root.
