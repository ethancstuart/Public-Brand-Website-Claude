import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/case-studies";
import { StatusPill } from "@/components/register";
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

  const study = CASE_STUDIES[slug];
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="wrap">
      <JsonLd data={getSoftwareApplicationJsonLd(project)} />

      <div className="border-b border-rule py-3">
        <Link
          href="/portfolio"
          className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-ink-faint no-underline hover:text-accent"
        >
          ← Selected work
        </Link>
      </div>

      <article>
        <header className="pb-[clamp(30px,4vw,46px)] pt-[clamp(44px,6vw,78px)]">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow">{project.kind}</span>
            <StatusPill status={project.status} />
          </div>

          <h1 className="mb-2 max-w-[18ch] font-display text-[clamp(30px,4.4vw,52px)] leading-[1.12] tracking-[-0.018em]">
            {project.name}
          </h1>

          {project.formerly && (
            <p className="mb-6 font-mono text-[11px] tracking-[0.04em] text-ink-faint">
              formerly {project.formerly}
            </p>
          )}

          {study && (
            <p className="max-w-[58ch] text-[17.5px] leading-[1.6] text-ink-soft">
              {study.lede}
            </p>
          )}

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta mt-6"
            >
              {project.href.replace(/^https?:\/\//, "")} ↗
            </a>
          )}
        </header>

        {study && (
          <>
            <dl className="cols cols-4">
              {study.facts.map((f) => (
                <div key={f.term}>
                  <dt className="mb-[7px] font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-faint">
                    {f.term}
                  </dt>
                  <dd className="m-0 text-[14px] leading-[1.45]">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="ledger mt-[clamp(24px,3.5vw,44px)]">
              {study.sections.map((s) => (
                <section
                  key={s.label}
                  className="grid grid-cols-[150px_minmax(0,1fr)] gap-x-8 py-8 max-[720px]:grid-cols-1 max-[720px]:gap-y-3"
                >
                  <span className="eyebrow pt-1">{s.label}</span>
                  <div>
                    <h2 className="mb-3.5 max-w-[26ch] font-display text-[clamp(20px,2.2vw,26px)] leading-[1.25] tracking-[-0.012em]">
                      {s.title}
                    </h2>
                    <div className="max-w-[var(--measure)] space-y-3.5 text-[15.5px] leading-[1.68] text-ink-soft">
                      {s.body.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        {!study && (
          <p className="max-w-[var(--measure)] py-8 text-[15.5px] leading-[1.68] text-ink-soft">
            {project.description}
          </p>
        )}
      </article>

      <nav className="flex flex-wrap items-baseline justify-between gap-4 border-t border-rule-strong py-8">
        <span className="eyebrow">Next</span>
        <Link
          href={`/portfolio/${next.slug}`}
          className="font-display text-[21px] leading-[1.3] tracking-[-0.01em] no-underline hover:text-accent"
        >
          {next.name} →
        </Link>
      </nav>
    </div>
  );
}
