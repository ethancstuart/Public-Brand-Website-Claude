# Personal Brand Redesign v2 — Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply final SOTD-grade polish (WebGL shader hero, variable-font scroll weight, custom cursor, GSAP master timeline + Lenis scroll integration), clean up known issues from Phases 1–2, then ship the redesign to production by merging `redesign-v2` → `main`. After this phase, `ethancstuart.com` serves the new dark/kinetic site.

**Architecture:** Build on Phase 2 foundation. Add OGL for the shader hero (lighter than Three.js — keeps home-page bundle reasonable). Wire Lenis ↔ GSAP ScrollTrigger so scroll-driven animations stay in sync with smooth scroll. Variable-font weight is driven by a single scroll-progress CSS custom property updated by GSAP. Custom cursor mounts only on `/portfolio/[slug]` routes and is disabled on touch devices + reduced-motion.

**Tech Stack additions:** `ogl` (~10KB gzip — WebGL shader hero), `gsap/ScrollTrigger` (already part of GSAP package installed in Phase 1). No other new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md` §7 motion stack rows 3, 5, 6 (WebGL shader, variable-font weight, GSAP master timeline). Phase 2 close-out Appendix D for the carry-over list.

**Production cutover:** This phase ends with a PR from `redesign-v2` → `main` and an explicit user-confirmed merge. Until that merge, production is untouched. The merge IS the production ship.

**Verification approach:** Same — `npx tsc --noEmit`, `npm run build`, dev visual check, Playwright smoke test (now strict, no resource-error filters), Lighthouse audit. Add a mobile responsive sweep (375px viewport in dev tools) for Phase 3.

**Files in scope (this phase):**
```
NEW:
  src/components/hero-shader.tsx
  src/lib/shaders/hero.glsl.ts          (or inline string in hero-shader.tsx)
  src/components/use-scroll-weight.ts   (variable-font hook)
  src/components/cursor.tsx              (custom cursor for case studies)
  public/portfolio/<real screenshot files as available>

MODIFY:
  src/components/hero.tsx                 (mount HeroShader, trim motion delays)
  src/components/case-study/zts-trajectory.tsx   (SVG text → HTML overlay)
  src/components/magazine-spread.tsx     (variable-font axis on display headline + GSAP integration hooks)
  src/components/smooth-scroll-provider.tsx       (Lenis ↔ GSAP ScrollTrigger bridge)
  src/app/portfolio/[slug]/page.tsx      (mount Cursor on case studies)
  src/app/page.tsx                       (Hero LCP polish)
  tests/redesign-v2-routes.spec.ts       (strict mode, mobile viewport sweep)
  package.json                           (ogl)
```

---

### Task 1: Install OGL

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npm install ogl
```

- [ ] **Step 2: Sanity build**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add package.json package-lock.json
git commit -m "chore(redesign-v2): install ogl for phase 3 shader hero"
git push
```

---

### Task 2: Build WebGL shader hero

**Files:**
- Create: `src/components/hero-shader.tsx`
- Modify: `src/components/hero.tsx` (replace the placeholder gradient with `<HeroShader />`)

- [ ] **Step 1: Create the shader component**

Write `src/components/hero-shader.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

// Simplex-ish smooth noise
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  vec2 m = uMouse;

  // Distance from cursor with falloff
  float d = distance(uv, m);
  float infl = exp(-d * 6.0);

  // Animated noise field
  float n1 = snoise(uv * 1.6 + vec2(uTime * 0.04, uTime * 0.03));
  float n2 = snoise(uv * 2.8 - vec2(uTime * 0.05, uTime * 0.07));
  float field = (n1 * 0.65 + n2 * 0.35) * 0.5 + 0.5;

  // Color stops: paper -> arctic -> indigo
  vec3 paper  = vec3(0.847, 0.831, 0.800);   // #d8d4cc
  vec3 arctic = vec3(0.557, 0.812, 0.910);   // #8ecfe8
  vec3 indigo = vec3(0.545, 0.447, 0.847);   // #8b72d8

  vec3 col = mix(arctic, indigo, field);
  col = mix(col, paper, smoothstep(0.65, 1.0, field));

  // Cursor brightens locally
  col += infl * 0.18;

  // Vignette toward bg
  float vig = smoothstep(1.4, 0.4, distance(uv, vec2(0.5, 0.5)));
  vec3 bg = vec3(0.024, 0.024, 0.031);
  col = mix(bg, col, vig * 0.55);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroShader() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      const mount = mountRef.current;
      if (!mount) return;

      const renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
      const gl = renderer.gl;
      gl.clearColor(0.024, 0.024, 0.031, 1);
      mount.appendChild(gl.canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: [0.5, 0.5] },
          uResolution: { value: [1, 1] },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let mouseX = 0.5, mouseY = 0.5;
      const onMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = 1 - (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onMove);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(mount);

      const start = performance.now();
      const tick = () => {
        if (visible) {
          program.uniforms.uTime.value = (performance.now() - start) / 1000;
          program.uniforms.uMouse.value[0] += (mouseX - program.uniforms.uMouse.value[0]) * 0.05;
          program.uniforms.uMouse.value[1] += (mouseY - program.uniforms.uMouse.value[1]) * 0.05;
          renderer.render({ scene: mesh });
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        if (mount.contains(gl.canvas)) mount.removeChild(gl.canvas);
      };
    })();

    return () => { cleanup?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.55 }}
    />
  );
}
```

- [ ] **Step 2: Mount in Hero, replace placeholder gradient**

In `src/components/hero.tsx`:
- Add import: `import { HeroShader } from "@/components/hero-shader";`
- Replace the placeholder gradient `<div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25" style={...} />` with `<HeroShader />`

- [ ] **Step 3: Verify build + visual**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit
npm run build 2>&1 | tail -10
```

In dev: home page hero now has a flowing mesh-gradient WebGL shader behind the kinetic type. Cursor distorts the gradient field locally.

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/hero-shader.tsx src/components/hero.tsx
git commit -m "feat(redesign-v2): WebGL shader hero — OGL mesh-gradient + cursor distortion"
git push
```

---

### Task 3: Hero LCP polish

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1: Trim motion delays**

The Phase 1 hero has motion delays up to 1.45s on the CTA row, which became the LCP. Reduce delays so the LCP element (the kinetic SHIPS row or the sub-tagline paragraph — whichever Lighthouse identifies) paints faster.

Edit the `delay` values in `src/components/hero.tsx`:
- Eyebrow context line: `delay: 0` (was implicit)
- Headline rows: keep stagger but cut `0.2 + i * STAGGER.slow` → `0.1 + i * STAGGER.fast` (reduces total stagger from ~0.68s to ~0.34s)
- Rule scaleX: `delay: 0.55` (was `1.0`)
- Tagline: `delay: 0.65` (was `1.15`)
- Sub-tagline: `delay: 0.78` (was `1.3`)
- CTA row: `delay: 0.9` (was `1.45`)

Add `style={{ willChange: "opacity, transform" }}` only on the kinetic word spans (the LCP candidates) to hint the browser to start paint preparation.

- [ ] **Step 2: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/hero.tsx
git commit -m "perf(redesign-v2): trim hero motion delays for faster LCP"
git push
```

---

### Task 4: Variable-font scroll-weight hook

**Files:**
- Create: `src/components/use-scroll-weight.ts`

- [ ] **Step 1: Create the hook**

Write `src/components/use-scroll-weight.ts`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Options {
  min?: number;       // wght axis min, default 400
  max?: number;       // wght axis max, default 800
}

/**
 * Returns a ref + applies a scroll-driven CSS variable `--wght` on the element.
 * Works with `font-variation-settings: "wght" var(--wght);` in CSS.
 *
 * Animates from `min` (off-screen below) to `max` (centered) and back to `min` (off-screen above)
 * — so the headline "breathes" in weight as it passes through the viewport center.
 *
 * Disabled under prefers-reduced-motion.
 */
export function useScrollWeight<T extends HTMLElement>(options: Options = {}) {
  const { min = 400, max = 800 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--wght", String(max));
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 1.0 when element center aligns with viewport center; 0.0 when 1.5x viewport away
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const normalized = 1 - Math.min(distance / (vh * 1.0), 1);
      const eased = normalized * normalized * (3 - 2 * normalized); // smoothstep
      const wght = min + (max - min) * eased;
      el.style.setProperty("--wght", wght.toFixed(0));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [min, max]);

  return ref;
}
```

- [ ] **Step 2: Apply in MagazineSpread**

In `src/components/magazine-spread.tsx`, import the hook and apply to the project name `<motion.h2>`:

```tsx
import { useScrollWeight } from "@/components/use-scroll-weight";

// inside MagazineSpread:
const titleRef = useScrollWeight<HTMLHeadingElement>({ min: 500, max: 800 });

// on the motion.h2:
<motion.h2
  ref={titleRef}
  layoutId={`project-name-${project.slug}`}
  className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(48px,6vw,96px)] tracking-[-0.05em] leading-[0.95] mb-6"
  style={{ fontVariationSettings: 'var(--wght-axis, "wght" 800)', "--wght-axis": '"wght" var(--wght, 800)' } as React.CSSProperties}
>
  {project.name}
</motion.h2>
```

(The `--wght-axis` indirection is to make the CSS readable. The hook updates `--wght`; CSS resolves to `font-variation-settings: "wght" 600` etc. as you scroll.)

- [ ] **Step 3: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/use-scroll-weight.ts src/components/magazine-spread.tsx
git commit -m "feat(redesign-v2): variable-font scroll-weight on case-study display headlines"
git push
```

In dev: scroll a case-study page — the project name visibly breathes in weight as it crosses the viewport.

---

### Task 5: Lenis ↔ GSAP ScrollTrigger bridge

**Files:**
- Modify: `src/components/smooth-scroll-provider.tsx`

- [ ] **Step 1: Wire Lenis to drive GSAP ScrollTrigger updates**

GSAP ScrollTrigger reads scroll values from native scroll by default, which conflicts with Lenis's smooth scroll (Lenis intercepts the scroll, ScrollTrigger doesn't see the new positions). The fix: drive ScrollTrigger's `update` from Lenis's `scroll` event, and use a custom scroller proxy.

Update `src/components/smooth-scroll-provider.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/smooth-scroll-provider.tsx
git commit -m "feat(redesign-v2): bridge Lenis to GSAP ScrollTrigger ticker"
git push
```

---

### Task 6: GSAP master timeline — magazine-spread parallax

**Files:**
- Modify: `src/components/magazine-spread.tsx`

- [ ] **Step 1: Add scroll-tied parallax to color block + content block**

When the spread enters and traverses the viewport, the color block and content block move at slightly different rates, creating depth. The motion canvas inside the color block also gets a slight parallax.

Add a useEffect inside the MagazineSpread component (after the existing layout) using GSAP ScrollTrigger:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "@/lib/motion";
import { useScrollWeight } from "@/components/use-scroll-weight";
import type { Project } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ... existing Props interface

export function MagazineSpread({ project, index, total, reverse, motionCanvas, manifesto, lede, tags }: Props) {
  // ... existing reverse logic
  const sectionRef = useRef<HTMLElement | null>(null);
  const colorBlockRef = useRef<HTMLDivElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useScrollWeight<HTMLHeadingElement>({ min: 500, max: 800 });

  useEffect(() => {
    if (!sectionRef.current || !colorBlockRef.current || !contentBlockRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        colorBlockRef.current,
        { y: 24 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        contentBlockRef.current,
        { y: -12 },
        {
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ... rest of component, with ref={sectionRef} on the motion.section
  // ref={colorBlockRef} on the colorBlock div
  // ref={contentBlockRef} on the contentBlock div
  // ref={titleRef} on the motion.h2
}
```

(Implementer: integrate refs into the existing JSX without breaking the alternation logic. Each block already has its own JSX expression — attach refs to the outer div.)

- [ ] **Step 2: Verify + commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit && npm run build 2>&1 | tail -5
git add src/components/magazine-spread.tsx
git commit -m "feat(redesign-v2): GSAP scroll-tied parallax on magazine spreads"
git push
```

---

### Task 7: Custom cursor on case-study pages

**Files:**
- Create: `src/components/cursor.tsx`
- Modify: `src/app/portfolio/[slug]/page.tsx` (mount only on featured case studies)

- [ ] **Step 1: Create the cursor component**

Write `src/components/cursor.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor({ accent }: { accent: string }) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef  = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch   = window.matchMedia("(hover: none)").matches;
    if (reduced || touch) return;
    setEnabled(true);

    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let dx = rx, dy = ry;
    let raf = 0;

    const onMove = (e: PointerEvent) => { dx = e.clientX; dy = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor-attract]");
      if (interactive && ringRef.current) {
        ringRef.current.style.transform += " scale(1.6)";
      }
    };
    const onOut = () => {
      // simple reset; the lerp loop will repaint
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${dx - 3}px, ${dy - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-transform duration-200"
        style={{
          width: 36, height: 36,
          border: `1.5px solid ${accent}`,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{ width: 6, height: 6, background: accent }}
      />
      <style jsx global>{`
        html.custom-cursor, html.custom-cursor * { cursor: none !important; }
        html.custom-cursor a, html.custom-cursor button { cursor: none !important; }
      `}</style>
    </>
  );
}
```

- [ ] **Step 2: Mount in case-study page (featured only)**

In `src/app/portfolio/[slug]/page.tsx`, ABOVE the `<MagazineSpread>` in the featured branch:

```tsx
import { Cursor } from "@/components/cursor";
// ...
return (
  <>
    <Cursor accent={project.color} />
    <MagazineSpread ... />
    <ScrollNarrative ... />
  </>
);
```

The non-featured branch (Modeling Lab + RE Stack) does NOT mount Cursor — keep system cursor on those pages.

- [ ] **Step 3: Verify + visual check**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

In dev: visit `/portfolio/nexuswatch`. Default cursor should be hidden, replaced by an accent-colored ring + dot. Hover over a link or button — ring scales up. Other routes (home, about, /portfolio, modeling lab pages) keep system cursor.

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/cursor.tsx src/app/portfolio/[slug]/page.tsx
git commit -m "feat(redesign-v2): custom cursor on featured case-study pages"
git push
```

---

### Task 8: Fix ZTS A11y false-positive (SVG text → HTML overlay)

**Files:**
- Modify: `src/components/case-study/zts-trajectory.tsx`

- [ ] **Step 1: Replace SVG `<text>` labels with HTML `<span>` overlays**

The axe-core scanner can't reliably read `fill` attribute on SVG `<text>` inside `aria-hidden` containers. Move the labels to absolutely-positioned HTML spans on top of an SVG that contains only the path + circles:

```tsx
"use client";

import { motion } from "framer-motion";

const MILESTONES = ["IDEA", "DRAFT", "BUILD", "SHIP"];
const SIZE = 320;

export function ZTSTrajectory() {
  // Compute milestone positions in SVG coordinates
  const positions = MILESTONES.map((label, i) => {
    const t = i / (MILESTONES.length - 1);
    const cx = 20 + t * 280;
    const cy = 280 - t * 240 - 16 * Math.sin(t * Math.PI);
    return { label, cx, cy, t };
  });

  return (
    <div
      className="relative"
      style={{ width: SIZE, height: SIZE }}
      aria-hidden="true"
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="overflow-visible absolute inset-0"
        role="presentation"
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
        {positions.map((p) => (
          <motion.circle
            key={p.label}
            cx={p.cx}
            cy={p.cy}
            r={6}
            fill="#000"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + p.t * 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {positions.map((p) => (
        <span
          key={p.label}
          className="absolute font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em]"
          style={{
            left: `${(p.cx + 12) / SIZE * 100}%`,
            top:  `${(p.cy + 4)  / SIZE * 100}%`,
            color: "#000",
            opacity: 0,
            animation: `zts-label-fade 0.5s ease ${0.4 + p.t * 1.0}s forwards`,
          }}
        >
          {p.label}
        </span>
      ))}

      <style jsx>{`
        @keyframes zts-label-fade {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
npx tsc --noEmit && npm run build 2>&1 | tail -5
```

Visual check: trajectory animation still plays; milestone labels still appear; nothing visually changed.

- [ ] **Step 3: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add src/components/case-study/zts-trajectory.tsx
git commit -m "a11y(redesign-v2): ZTS trajectory uses HTML overlay for labels (axe-core compatibility)"
git push
```

---

### Task 9: Reinstate strict Playwright + add mobile viewport sweep

**Files:**
- Modify: `tests/redesign-v2-routes.spec.ts`
- Modify: `playwright.config.ts`

- [ ] **Step 1: Remove the resource-error filter**

In `tests/redesign-v2-routes.spec.ts`, find the line(s) that filter "Failed to load resource" console errors. Remove the filter — strict mode should fail on any console error.

The test should be back to the simple form:

```typescript
import { test, expect } from "@playwright/test";

const ROUTES: { path: string; expectText: string }[] = [
  // ... existing 14 routes
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

- [ ] **Step 2: Add a mobile viewport project**

In `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
    { name: "mobile",   use: devices["iPhone 14"] },
  ],
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Run and address failures**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
lsof -iTCP:3000 -sTCP:LISTEN -t | xargs kill 2>/dev/null
sleep 2
npx playwright test 2>&1 | tail -40
```

If routes fail because of:
- 404 image references in components (e.g., a `<img src="/portfolio/foo.png" />` where the file doesn't exist) — either commit a placeholder image OR remove the broken reference
- Hydration warnings — investigate and fix (often `suppressHydrationWarning` already handles it)
- Mobile-specific layout breaks — reorder content / fix overflow / stack elements

Fix issues until **all 28 tests pass** (14 routes × 2 viewports).

- [ ] **Step 4: Commit**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add tests/redesign-v2-routes.spec.ts playwright.config.ts
git add -A  # any image / layout fixes
git commit -m "test(redesign-v2): strict Playwright + mobile viewport sweep"
git push
```

---

### Task 10: Real screenshots for case-study pages

**Files:**
- Add: any real screenshot files to `public/portfolio/`
- Modify: case-study components that reference screenshots (if any inline references exist)

- [ ] **Step 1: Audit references**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
grep -rn "portfolio/.*\.png\|portfolio/.*\.jpg\|portfolio/.*\.webp" src/ public/
ls public/portfolio/
```

Identify which screenshots are referenced. Currently the case studies are mostly motion-driven (no big inline screenshots), so this may be a no-op.

- [ ] **Step 2: If real screenshots are available, commit them**

For each `public/portfolio/<slug>-preview.png` referenced but missing, either:
- Replace with a real screenshot (operator captures and drops it in)
- Remove the reference from the consuming component

If operator hasn't provided real screenshots for Phase 3, document this as a deferred item and skip.

- [ ] **Step 3: Commit (only if files added)**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add public/portfolio/
git commit -m "feat(redesign-v2): add real product screenshots for case studies"
git push
```

If no screenshots added, skip the commit and note in the report.

---

### Task 11: Investigate Best Practices score gap

**Files:** TBD by Lighthouse output

- [ ] **Step 1: Run Lighthouse with verbose Best Practices**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
lsof -iTCP:3000 -sTCP:LISTEN -t | xargs kill 2>/dev/null
sleep 2
rm -rf .next && npm run build 2>&1 | tail -5
nohup npm start > /tmp/next.log 2>&1 & echo $! > /tmp/next-pid
sleep 6
npx lighthouse http://localhost:3000/ --quiet --only-categories=best-practices --output=json --output-path=/tmp/lh-bp.json --chrome-flags="--headless --no-sandbox" 2>&1 | tail -3
node -e "
const d = require('/tmp/lh-bp.json');
const audits = d.categories['best-practices'].auditRefs;
for (const ref of audits) {
  const a = d.audits[ref.id];
  if (a.score !== null && a.score < 1) console.log(ref.id, '→', a.score, '—', a.title);
}
"
kill \$(cat /tmp/next-pid) 2>/dev/null
```

- [ ] **Step 2: Address the failing audits**

Common BP issues:
- Browser console errors / warnings (e.g. deprecated APIs)
- Missing CSP headers (set in `next.config.js`)
- Image without explicit dimensions
- HTTPS-related issues (localhost is fine; only prod matters here)

If a fix is straightforward (e.g. add `width` + `height` to an image), apply it. If complex (CSP), document and defer.

- [ ] **Step 3: Re-audit**

Re-run Lighthouse to confirm BP improved. Target: 100, accept ≥ 96.

- [ ] **Step 4: Commit any fixes**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add -A
git commit -m "perf(redesign-v2): close Best Practices gap — <specifics>"
git push
```

(Skip the commit if no fixes were applied.)

---

### Task 12: Final Lighthouse + Playwright pass

**Files:** none modified — verification only

- [ ] **Step 1: Stop dev server, build production**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
lsof -iTCP:3000 -sTCP:LISTEN -t | xargs kill 2>/dev/null
sleep 2
rm -rf .next && npm run build 2>&1 | tail -5
nohup npm start > /tmp/next.log 2>&1 & echo $! > /tmp/next-pid
sleep 6
```

- [ ] **Step 2: Lighthouse on the full route set**

Audit home + portfolio + 4 case studies + about + writing + resume + contact (10 routes total). Final Phase 3 targets:
- Performance ≥ 85 home/portfolio, ≥ 80 case studies (Three.js)
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
for route in "" "about" "portfolio" "portfolio/nexuswatch" "portfolio/the-composer" "portfolio/product-os" "portfolio/zero-to-ship" "writing" "resume" "contact"; do
  url="http://localhost:3000/$route"
  out="/tmp/lh-final-$(echo "$route" | sed 's|/|-|g' | sed 's/^$/home/').json"
  echo "=== $url ==="
  npx lighthouse "$url" --quiet --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox" --output=json --output-path="$out" 2>&1 | tail -2
done

for f in /tmp/lh-final-*.json; do
  echo "--- $f ---"
  node -e "const d=require('$f');for(const k of Object.keys(d.categories)){console.log(k.padEnd(18), Math.round(d.categories[k].score*100));}"
done
```

- [ ] **Step 3: Stop server, run Playwright**

```bash
kill $(cat /tmp/next-pid) 2>/dev/null
sleep 2
npx playwright test 2>&1 | tail -30
```

All 28 tests (14 routes × 2 viewports) must pass.

- [ ] **Step 4: Record results in a deferred note**

Don't commit anything from this task itself. Capture the scores and Playwright result for the close-out commit (Task 13).

---

### Task 13: Production cutover — open PR + USER GATE before merge

**Files:** none modified locally — git operations + GitHub PR

**This task SHIPS the redesign to production. It MUST NOT auto-merge — the operator must explicitly confirm "ship it" before the merge step runs.**

- [ ] **Step 1: Open the PR**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
gh pr create \
  --base main \
  --head redesign-v2 \
  --title "Personal brand redesign v2 — graphic-design portfolio (dark/kinetic)" \
  --body "$(cat <<'EOF'
## Summary

Full rebuild of ethancstuart.com in the dark/kinetic graphic-design portfolio direction. Replaces the cream/olive April 19 redesign.

- 8 routes restyled: `/`, `/about`, `/portfolio`, `/portfolio/[slug]` (8 case studies), `/writing`, `/writing/[slug]`, `/resume`, `/contact`
- 4 featured products with full magazine-spread case studies (NexusWatch, The Composer, Product OS, Zero to Ship)
- Per-project signature motion: NexusWatch (Three.js globe), Composer (variable-weight type-weave), Product OS (canvas code-scroll), Zero to Ship (SVG trajectory)
- WebGL shader hero (OGL) with cursor-reactive mesh gradient
- Variable-font scroll-weight on case-study display headlines
- GSAP master timeline + Lenis smooth-scroll bridge
- Custom cursor on featured case-study pages
- Live indicators: latest GitHub commit + latest Substack post
- Shared-element page transitions (Framer Motion `layoutId`)
- Modeling Lab + RE Stack thematic sections

## Verification
- TypeScript strict: clean
- Production build: clean, all routes prerendered
- Playwright: 28/28 (14 routes × 2 viewports including mobile)
- Lighthouse Phase 3 final scores recorded in spec Appendix E

## Rollout
Merge → Vercel auto-deploys to production at ethancstuart.com. Cream/olive build is sunset.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 2: STOP — operator review gate**

After the PR opens, **STOP**. Print the PR URL. Tell the operator:

> "PR opened: <URL>. Production goes live with this merge. Do you want to ship it? (Reply 'yes ship it' to merge, or list any concerns.)"

Do **NOT** proceed to step 3 without explicit operator confirmation.

- [ ] **Step 3 (operator-gated): Merge to main**

ONLY after operator says "yes ship it" or equivalent:

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
gh pr merge --merge --delete-branch=false   # keep redesign-v2 around for reference
git checkout main
git pull
```

- [ ] **Step 4: Verify production deployed**

Wait ~90s for Vercel to deploy from `main`, then:

```bash
sleep 90
vercel ls public-brand-website-claude 2>&1 | head -5
curl -sL "https://ethancstuart.com/" -o /tmp/live-after.html
grep -oE "ETHAN STUART SHIPS|DATA & AI|FEATURED WORK" /tmp/live-after.html | head -5
```

If the new markers are present in the live HTML, production is on the new design. If still serving cream/olive, check Vercel deployment status (may need a few more minutes).

- [ ] **Step 5: Tag and append final spec note**

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git tag redesign-v2-shipped -m "Redesign v2 shipped to production — dark/kinetic graphic-design portfolio"
git push --tags
```

Append Appendix E to `docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md`:

```markdown

## Appendix E — Phase 3 close-out + production ship (DATE)

Phase 3 shipped to production at ethancstuart.com on DATE. Tag: `redesign-v2-shipped`. The cream/olive April 19 build is sunset; the new dark/kinetic graphic-design portfolio is live.

### Phase 3 deliverables
- WebGL shader hero (OGL mesh-gradient + cursor distortion)
- Variable-font scroll-weight on case-study headlines (Bricolage wght axis)
- Lenis ↔ GSAP ScrollTrigger bridge
- GSAP scroll-tied parallax on magazine spreads
- Custom cursor on featured case-study pages
- ZTS A11y SVG → HTML overlay fix
- Hero LCP polish (motion delays trimmed)
- Strict Playwright + mobile viewport sweep (28/28 tests)

### Final Lighthouse scores

(fill in actuals from Task 12)

### What's deferred / future-considered

- Future polish that could land in a v3 iteration: per-project case-study deeper interactions, marketing-funnel landing pages for individual products, course-platform integration, real-time NexusWatch-data widget on home, audio/sound-design pass.

The redesign is shipped.
```

Commit and push:

```bash
cd /Users/ethanstuart/Projects/Public-Brand-Website-Claude
git add docs/superpowers/specs/2026-05-03-personal-brand-redesign-v2-design.md
git commit -m "docs(redesign-v2): phase 3 close-out — appendix E with production ship + final scores"
git push
git push --tags
```

## Report
- Status: DONE | DONE_WITH_CONCERNS | BLOCKED
- PR URL
- Whether operator confirmed merge (yes/no/concerns raised)
- Production live with new design (yes/no)
- Final Lighthouse scores
- Tag created (yes/no)
- Concerns

---

## Self-Review

Spec coverage check:
- §7 row 3 (WebGL shader hero) → Tasks 1, 2 ✓
- §7 row 5 (variable-font scroll weight) → Task 4 ✓
- §7 row 6 (GSAP master timeline + Lenis) → Tasks 5, 6 ✓
- Custom cursor (deferred from Phase 1/2) → Task 7 ✓
- Hero LCP polish (Phase 1 carry-over) → Task 3 ✓
- ZTS A11y false-positive cleanup (Phase 2 carry-over) → Task 8 ✓
- Strict Playwright + mobile audit (Phase 2 carry-over) → Task 9 ✓
- Real screenshots → Task 10 (operator-dependent) ✓
- Best Practices score push → Task 11 ✓
- Final Lighthouse + Playwright pass → Task 12 ✓
- Production ship → Task 13 ✓ (gated on explicit operator approval)

No placeholders. The merge step is explicitly user-gated — that's the right level of caution for a production-affecting action.

After Phase 3 ships, this is the entire 3-week redesign delivered to production.
