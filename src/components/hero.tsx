"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EASE, STAGGER, DURATION } from "@/lib/motion";
import { HeroMiniGlobe } from "@/components/hero-mini-globe";
import { HeroShader } from "@/components/hero-shader";

const TYPE_ROWS = [
  { word: "ETHAN",  cls: "text-[var(--color-paper)]",      aside: "Los Angeles, CA"   },
  { word: "STUART", cls: "ghost",                          aside: null                 },
  { word: "SHIPS",  cls: "ghost-indigo",                   aside: "06 PRODUCTS LIVE"  },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end pt-32 pb-24 px-6 md:px-12">
      <HeroShader />

      <div className="absolute top-24 right-6 md:right-12 z-10">
        <HeroMiniGlobe />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.fast, ease: EASE.out }}
        className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-mid)] mb-8"
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
                delay: 0.1 + i * STAGGER.fast,
              }}
              className={`inline-block text-[clamp(72px,10vw,168px)] ${row.cls}`}
              style={{ willChange: "opacity, transform" }}
            >
              {row.word}
            </motion.span>

            {row.aside && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.base, delay: 0.4 + i * STAGGER.fast }}
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
        transition={{ duration: DURATION.base, ease: EASE.out, delay: 0.55 }}
        style={{ transformOrigin: "left" }}
        className="w-16 h-px bg-[var(--color-arctic)] mt-10 mb-7"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, delay: 0.65 }}
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
        transition={{ duration: DURATION.base, delay: 0.78 }}
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
        transition={{ duration: DURATION.base, delay: 0.9 }}
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
