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
      role="presentation"
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
              fill="#000000"
              aria-hidden="true"
            >
              {label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
