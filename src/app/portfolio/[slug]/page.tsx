import { Section } from "@/components/section";
import { ALL_PROJECTS } from "@/lib/constants";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Section label={`PROJECT · ${project.name.toUpperCase()}`} title={project.name}>
      <p className="text-[15px] text-[var(--color-paper-mid)] max-w-[640px] leading-relaxed">
        {project.description}
      </p>
      <p className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] mt-12">
        Full case study coming in Phase 2 — magazine spread + signature motion.
      </p>
    </Section>
  );
}
