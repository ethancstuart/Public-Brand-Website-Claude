"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--muted)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
            Product & Technology Leader
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Building clarity
            <br />
            <span className="text-muted-foreground">from ambiguity.</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I lead product for data and AI platforms — turning enterprise data
            into products teams actually use. Currently at{" "}
            <span className="text-foreground font-medium">Disney Studios Technology</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            About Me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <BookOpen className="h-4 w-4" />
            Read Writing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
