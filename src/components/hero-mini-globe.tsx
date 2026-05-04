"use client";

import { useEffect, useState } from "react";

export function HeroMiniGlobe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
      <div className="absolute inset-1 rounded-full border border-[rgba(142,207,232,0.15)]" />
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: "rgba(142,207,232,0.18)" }}
      />
      <div
        className="absolute inset-y-0 left-1/2 w-px"
        style={{ background: "rgba(142,207,232,0.18)" }}
      />
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
