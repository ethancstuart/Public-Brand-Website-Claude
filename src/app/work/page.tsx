import type { Metadata } from "next";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects and case studies across enterprise data, AI, and product leadership.",
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Work
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Selected projects
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          A collection of work spanning enterprise data platforms, AI/ML
          productization, and product organization building at Fortune 50
          companies.
        </p>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
