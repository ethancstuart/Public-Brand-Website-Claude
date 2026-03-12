"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/constants";

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-8"
    >
      <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight">
        {project.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mb-5 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {/* iframe preview */}
      {project.iframeSrc && (
        <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-xl border border-border">
          {!iframeLoaded && !iframeError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">
                Preview unavailable —{" "}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  view live
                </a>
              </p>
            </div>
          ) : (
            <iframe
              src={project.iframeSrc}
              title={`${project.title} preview`}
              className={`h-full w-full transition-opacity duration-500 ${
                iframeLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
            />
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View Live
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View Source
            <Github className="h-3.5 w-3.5" />
          </a>
        )}
        {project.caseStudy && (
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Case Study
            <BookOpen className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
