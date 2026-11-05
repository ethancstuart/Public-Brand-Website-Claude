import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
export const metadata: Metadata = { title: "What I’m building", description: "Allison’s Kitchen, NexusWatch, Product OS, and other work.", alternates: { canonical: "/portfolio" } };
const featured = ["allisons-kitchen", "nexuswatch", "product-os"];
export default function PortfolioPage() {
  return <div className="brand-page"><div className="wrap portfolio-index">
    <p className="section-label">Selected work</p><h1>What I’m building.</h1>
    <p className="project-deck">Kitchen is a business I’m working to establish. NexusWatch and Product OS give me room to explore other problems I care about.</p>
    <div className="portfolio-list">{featured.map(slug => { const project = PROJECTS.find(p => p.slug === slug)!; return <article key={slug}>
      <p className="section-label">{project.kind}</p><h2><Link href={`/portfolio/${slug}`}>{project.name} →</Link></h2>
      <p>{project.description}</p><p className="quiet-status">{project.note}</p>
    </article>; })}</div>
    <details className="more-work"><summary>More work and experiments</summary><div className="more-work-body">{PROJECTS.filter(p => !featured.includes(p.slug)).map(project => <article key={project.slug}><h3><Link href={`/portfolio/${project.slug}`}>{project.name}</Link></h3><p>{project.description}</p></article>)}</div></details>
  </div></div>;
}
