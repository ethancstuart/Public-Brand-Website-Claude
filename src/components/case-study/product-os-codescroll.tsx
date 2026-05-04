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
