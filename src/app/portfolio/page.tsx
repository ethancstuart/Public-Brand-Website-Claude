import type { Metadata } from "next";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { PortfolioCard } from "@/components/portfolio-card";
import { portfolioProjects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Six AI products in production — geopolitical intelligence, lending OS, trading systems, and more.",
};

export default function PortfolioPage() {
  const featured = portfolioProjects.find((p) => p.featured);
  const rest = portfolioProjects.filter((p) => !p.featured);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 56px 120px" }}>
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
            <span
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
            >
              Selected Work
            </span>
          </div>
          <h1
            className="font-sans font-extrabold tracking-tight"
            style={{ fontSize: "36px", color: "var(--foreground)", lineHeight: 1.1 }}
          >
            Six products.{" "}
            <span className="font-serif italic font-normal" style={{ color: "var(--muted-foreground)" }}>
              All live in 2025.
            </span>
          </h1>
        </div>
        <a
          href="https://github.com/ethancstuart"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden font-mono uppercase transition-opacity hover:opacity-70 md:inline-flex items-center gap-1"
          style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
        >
          GitHub ↗
        </a>
      </div>

      {/* Featured card */}
      {featured && (
        <div className="mb-8">
          <FeaturedProjectCard project={featured} />
        </div>
      )}

      {/* 2-column editorial grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((project, i) => (
          <PortfolioCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
