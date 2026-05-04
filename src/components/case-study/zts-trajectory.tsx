"use client";

import { motion } from "framer-motion";

const MILESTONES = ["IDEA", "DRAFT", "BUILD", "SHIP"];
const SIZE = 320;

export function ZTSTrajectory() {
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
            top:  `${(p.cy - 5)  / SIZE * 100}%`,
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
