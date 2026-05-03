import type { Metadata } from "next";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/constants";
import { getResumeMarkdown, parseResumeMarkdown } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume — Ethan Stuart",
  description:
    "Senior Manager · Disney Studios — Fortune 50 scale · Founder · Stuart Ventures",
};

export default async function ResumePage() {
  const md = await getResumeMarkdown();
  const resume = parseResumeMarkdown(md);

  return (
    <Section label="RESUME">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-10 gap-6 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(40px,6vw,80px)] tracking-[-0.04em] leading-none">
            {resume.name}
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)] mt-3">
            Senior Manager · Disney Studios — Fortune 50 scale · Founder · Stuart Ventures
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-[var(--color-paper-mid)] font-[family-name:var(--font-dm-mono)]">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="transition-colors hover:text-[var(--color-arctic)]"
            >
              {siteConfig.links.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-arctic)]"
            >
              linkedin.com/in/ethan-stuart
            </a>
          </div>
        </div>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-arctic)] text-[var(--color-arctic)] hover:bg-[var(--color-arctic)] hover:text-[var(--color-bg)] font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase transition-colors rounded-sm"
        >
          Download PDF <span aria-hidden="true">↓</span>
        </a>
      </div>

      {/* Sections */}
      <div className="space-y-14 mt-14">
        {resume.sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-arctic)] mb-6 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[var(--color-arctic)] opacity-50" />
              {section.title}
            </h2>

            <div className="space-y-10">
              {section.content.map((item, i) => {
                if (item.type === "company") {
                  return (
                    <div key={i}>
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-[17px] tracking-[-0.01em] mb-4">
                        {item.name}
                      </h3>
                      <div className="space-y-6">
                        {item.roles.map((role) => (
                          <div
                            key={role.title}
                            className="border-l-2 border-[var(--color-paper-low)] pl-6"
                          >
                            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                              <h4 className="font-[family-name:var(--font-syne)] font-semibold text-[14px] tracking-[-0.005em]">
                                {role.title}
                              </h4>
                              <span className="shrink-0 font-[family-name:var(--font-dm-mono)] text-[11px] text-[var(--color-paper-mid)]">
                                {role.period}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {role.bullets.map((bullet, j) => (
                                <li
                                  key={j}
                                  className="text-[14px] leading-[1.7] text-[var(--color-paper-mid)]"
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
                    <div key={i} className="text-[14px]">
                      <span className="font-[family-name:var(--font-syne)] font-semibold">
                        {item.category}:{" "}
                      </span>
                      <span className="text-[var(--color-paper-mid)]">
                        {item.skills}
                      </span>
                    </div>
                  );
                }

                if (item.type === "item") {
                  return (
                    <div key={i} className="text-[14px]">
                      <span className="font-[family-name:var(--font-syne)] font-semibold">
                        {item.label}
                      </span>
                      <span className="text-[var(--color-paper-mid)]">
                        {" "}— {item.description}
                      </span>
                    </div>
                  );
                }

                if (item.type === "text") {
                  return (
                    <p
                      key={i}
                      className="text-[14px] leading-[1.7] text-[var(--color-paper-mid)] italic"
                    >
                      {item.value}
                    </p>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
