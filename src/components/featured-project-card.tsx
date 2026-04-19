"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/constants";

interface FeaturedProjectCardProps {
  project: PortfolioProject;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block rounded-2xl transition-all duration-300"
        style={{
          border: "1px solid var(--border)",
          background: "var(--card)",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--accent)";
          el.style.boxShadow = "0 8px 32px rgba(90,128,0,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 380px" }}
        >
          {/* Left: content */}
          <div style={{ padding: "48px" }}>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full font-mono uppercase"
                style={{
                  padding: "4px 12px",
                  background: "var(--accent-soft)",
                  border: "1px solid var(--accent-mid)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)", animation: "pulse-dot 3s ease-in-out infinite" }}
                />
                Live
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
              >
                01 / 06
              </span>
            </div>

            <div
              className="font-sans font-extrabold tracking-tight"
              style={{ fontSize: "38px", lineHeight: 1.1, color: "var(--foreground)", marginBottom: "8px" }}
            >
              {project.title}
            </div>
            <div
              className="font-mono uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
            >
              {project.type}
            </div>

            <p
              className="font-sans"
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--muted-foreground)",
                maxWidth: "480px",
                marginBottom: "24px",
              }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full font-mono"
                  style={{
                    padding: "3px 10px",
                    background: "var(--deep)",
                    border: "1px solid var(--border)",
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg font-mono uppercase"
                  style={{
                    padding: "8px 16px",
                    background: "var(--foreground)",
                    color: "var(--background)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                  }}
                >
                  View live ↗
                </span>
              )}
              <span
                className="font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--accent)" }}
              >
                Case study →
              </span>
            </div>
          </div>

          {/* Right: screenshot */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              background: "var(--deep)",
              borderLeft: "1px solid var(--border)",
              minHeight: "420px",
            }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="380px"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
                >
                  Screenshot pending
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
