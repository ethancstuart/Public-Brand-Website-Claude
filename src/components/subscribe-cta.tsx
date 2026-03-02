"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function SubscribeCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16">
        {/* Subtle accent gradient */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative">
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
            Newsletter
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Data Product Agent
          </h2>
          <p className="mb-8 max-w-lg text-muted-foreground">
            Insights on AI product strategy, data platform leadership, and building
            high-velocity product organizations at enterprise scale. Published on
            Substack.
          </p>
          <a
            href={siteConfig.links.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:opacity-90"
          >
            Subscribe on Substack
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
