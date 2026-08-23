import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { getResumeMarkdown, parseResumeMarkdown } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Senior Manager, Data & AI Products and Analytics Engineering at Disney Studios. Full career record.",
};

export default async function ResumePage() {
  const md = await getResumeMarkdown();
  const resume = parseResumeMarkdown(md);

  return (
    <div className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-[clamp(28px,4vw,44px)] pt-[clamp(44px,6vw,78px)]">
        <div>
          <span className="eyebrow mb-4 block">Resume</span>
          <h1 className="font-display text-[clamp(30px,4.4vw,48px)] leading-[1.1] tracking-[-0.02em]">
            {resume.name}
          </h1>
          <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.55] text-ink-soft">
            Senior Manager, Data &amp; AI Products and Analytics Engineering —
            Disney Studios
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-ink-soft no-underline hover:text-accent"
            >
              {siteConfig.links.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft no-underline hover:text-accent"
            >
              linkedin.com/in/ethan-stuart
            </a>
          </div>
        </div>
        <a href="/resume.pdf" className="cta">
          Download PDF ↓
        </a>
      </div>

      <div className="ledger border-t-rule-strong">
        {resume.sections.map((section) => (
          <section
            key={section.title}
            className="grid grid-cols-[170px_minmax(0,1fr)] gap-x-8 py-9 max-[760px]:grid-cols-1 max-[760px]:gap-y-4"
          >
            <h2 className="eyebrow pt-1">{section.title}</h2>

            <div className="space-y-9">
              {section.content.map((item, i) => {
                if (item.type === "company") {
                  return (
                    <div key={i}>
                      <h3 className="mb-4 font-display text-[21px] leading-[1.25] tracking-[-0.012em]">
                        {item.name}
                      </h3>
                      <div className="space-y-6">
                        {item.roles.map((role) => (
                          <div key={role.title}>
                            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                              <h4 className="text-[15px] font-medium tracking-[-0.005em]">
                                {role.title}
                              </h4>
                              <span className="tnum shrink-0 font-mono text-[11px] text-ink-faint">
                                {role.period}
                              </span>
                            </div>
                            {role.scope && (
                              <p className="mb-3 border-l-2 border-accent bg-ground-sunk py-2 pl-3 pr-3 font-mono text-[11.5px] leading-[1.65] text-ink-faint">
                                {role.scope}
                              </p>
                            )}
                            <ul className="space-y-2">
                              {role.bullets.map((bullet, j) => (
                                <li
                                  key={j}
                                  className="max-w-[var(--measure)] border-l border-rule pl-4 text-[14.5px] leading-[1.65] text-ink-soft"
                                >
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.type === "competency") {
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[minmax(140px,1fr)_minmax(0,2.4fr)] gap-x-6 gap-y-1 text-[14.5px] max-[600px]:grid-cols-1"
                    >
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-ink-faint">
                        {item.category}
                      </span>
                      <span className="text-ink-soft">{item.skills}</span>
                    </div>
                  );
                }

                if (item.type === "item") {
                  return (
                    <div key={i} className="text-[14.5px] leading-[1.65]">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-ink-soft"> — {item.description}</span>
                    </div>
                  );
                }

                if (item.type === "text") {
                  return (
                    <p
                      key={i}
                      className="max-w-[var(--measure)] text-[14.5px] leading-[1.65] text-ink-soft"
                    >
                      {item.value}
                    </p>
                  );
                }

                return null;
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="h-[clamp(44px,6vw,72px)]" />
    </div>
  );
}
