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
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </div>
  );
}
