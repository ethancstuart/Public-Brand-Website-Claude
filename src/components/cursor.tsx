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
    let scale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => { dx = e.clientX; dy = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor-attract]");
      scale = interactive ? 1.6 : 1;
    };
    const onOut = () => { scale = 1; };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    let curScale = 1;
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      curScale += (scale - curScale) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${curScale.toFixed(3)})`;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${dx - 3}px, ${dy - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
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
      `}</style>
    </>
  );
}
