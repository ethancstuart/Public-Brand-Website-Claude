import { KitchenContent } from "@/components/brand/kitchen";
import { NexusWatchContent } from "@/components/brand/nexuswatch";
import { ProductOSContent } from "@/components/brand/product-os";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import { JsonLd } from "@/components/json-ld";
import { getSoftwareApplicationJsonLd } from "@/lib/jsonld";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/**
 * Meridian, RidgeCap, Quant Engine and Sports ML were deleted, and their URLs
 * are still indexed. Without this, an unknown slug renders the not-found body
 * with a 200 — a soft 404. Anything outside PROJECTS now returns a real 404.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const ApprovedContent = {
    "allisons-kitchen": KitchenContent,
    nexuswatch: NexusWatchContent,
    "product-os": ProductOSContent,
  }[slug];
  if (ApprovedContent) return <><JsonLd data={getSoftwareApplicationJsonLd(project)} /><ApprovedContent /></>;
  return (
    <div className="brand-page"><article className="wrap portfolio-index">
      <p className="section-label">More work and experiments</p>
      <h1>{project.name}</h1>
      <p className="project-deck">{project.description}</p>
      <p className="quiet-status">{project.note || "In development."}</p>
      <div className="chapter-links">
        {project.href && <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">Explore {project.name} ↗</a>}
        <Link className="text-link" href="/portfolio">All projects →</Link>
      </div>
    </article></div>
  );
}
