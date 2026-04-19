"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/constants";

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

function statusColor(status: string) {
  if (status === "Live") return "var(--status-live)";
  if (status === "Building") return "var(--status-building)";
  return "var(--muted-foreground)";
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block rounded-2xl overflow-hidden transition-all duration-300"
        style={{ border: "1px solid var(--border)", background: "var(--card)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-2px)";
          el.style.borderColor = "var(--accent)";
          el.style.boxShadow = "0 8px 24px rgba(90,128,0,0.07)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Mini screenshot header */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "80px", background: "var(--deep)", borderBottom: "1px solid var(--border)" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span
                className="font-mono uppercase"
                style={{ fontSize: "8px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-low)" }}
            >
              {String(index + 2).padStart(2, "0")} / 06
            </span>
            <span
              className="flex items-center gap-1 font-mono uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.12em", color: statusColor(project.status) }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: statusColor(project.status),
                  animation: project.status === "Live" ? "pulse-dot 3s ease-in-out infinite" : undefined,
                }}
              />
              {project.status}
            </span>
          </div>

          <div
            className="font-sans font-bold mb-1"
            style={{ fontSize: "18px", color: "var(--foreground)", lineHeight: 1.2 }}
          >
            {project.title}
          </div>
          <div
            className="font-mono uppercase mb-3"
            style={{ fontSize: "9px", letterSpacing: "0.13em", color: "var(--muted-foreground)" }}
          >
            {project.type}
          </div>

          <p
            className="font-sans mb-4"
            style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--muted-foreground)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded font-mono uppercase"
                style={{
                  padding: "2px 8px",
                  background: "var(--deep)",
                  border: "1px solid var(--border)",
                  fontSize: "8px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            className="font-mono uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--accent)" }}
          >
            View case study →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
