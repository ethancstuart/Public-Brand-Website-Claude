import type { Metadata } from "next";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/constants";
import { Linkedin, Mail } from "lucide-react";
import { DownloadMenu } from "@/components/download-menu";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Ethan Stuart — Operational and strategy leader who builds clarity from ambiguity.",
};

const experience = [
  {
    company: "The Walt Disney Company",
    unit: "Studio Technology",
    roles: [
      {
        title: "Senior Manager, Data & AI Products and BI Engineering",
        period: "June 2025 – Present",
        bullets: [
          "Built product organization from the ground up — 13 direct reports (6 PMs, 3 BI Engineers, 2 Technical Writers, 2 Program Managers), establishing organizational strategy, operating model, and talent development.",
          "Led enterprise platform adoption through stakeholder-by-stakeholder change management — grew from 1 to 5 studio groups (15→120 stakeholders, 500+ downstream users).",
          "Set AI strategy for Disney Studios' multi-agent system — guided team through architecture decisions (orchestration, cypher, RAG agents) and multi-modal AI integration.",
          "Launched AI chatbot saving 6.5 hours per person per week, with 3 additional chatbots in development; defining multi-agentic capabilities roadmap via Snowflake Cortex and Neo4j.",
          "Partner with CTO and President of Studio Technology on enterprise platform investment strategy.",
          "Delivered 2 ML forecasting models for studio finance; leading cross-company finance transformation initiative.",
          "Driving AI enablement across the organization — building programs to make non-engineering roles AI-native.",
        ],
      },
    ],
  },
  {
    company: "Yum Brands",
    unit: "Taco Bell",
    roles: [
      {
        title: "Portfolio Manager, Product, Data & Analytics Platform",
        period: "January 2025 – June 2025",
        bullets: [
          "Reduced platform incidents 85% and increased satisfaction 50% in 60 days — transformed service team into product organization.",
          "Led 30+ matrixed team driving enterprise platform strategy — shipped governance frameworks and Microsoft Fabric + Gen AI capabilities.",
          "Expanded from CDP to full platform portfolio after demonstrating rapid impact — led product vision for all enterprise data products serving 7,000+ operators.",
        ],
      },
      {
        title: "Staff Product Manager, Enterprise Customer Data Platform",
        period: "June 2023 – January 2025",
        bullets: [
          "Drove CDP adoption across all Yum brands (Taco Bell, KFC, Pizza Hut) — led implementation enabling 80% YoY loyalty growth.",
          "Shipped ML models for retention, lapse prediction, and CRM insights — delivered intelligence to 7,000+ operators.",
          "Transformed data team from order-takers to strategic product organization — led 14+ across product/engineering/analytics.",
        ],
      },
    ],
  },
  {
    company: "Capital Group",
    unit: null,
    roles: [
      {
        title: "Product Manager, Data Platforms & Strategic Automation",
        period: "August 2022 – June 2023",
        bullets: [
          "Launched Phoenix Fire data platform (0→1) achieving 100% enterprise adoption — transformed sales and marketing operations for all Capital Group ETFs and Mutual Funds.",
          "Supported 3 ETF launches while managing unified product roadmap across Marketing, Sales, and Compliance.",
        ],
      },
    ],
  },
  {
    company: "Sprout Mortgage",
    unit: null,
    roles: [
      {
        title: "Manager, Analytics & Product Strategy",
        period: "October 2021 – August 2022",
        bullets: [
          "Built enterprise analytics function from scratch — standardized reporting and drove 15% loan origination increase across 85 sales professionals.",
        ],
      },
    ],
  },
];

const education = {
  school: "Loyola Marymount University",
  degree: "B.B.A. in Finance and Economics",
};

const certifications = [
  "AI Fundamentals for Non-Data Scientists — University of Pennsylvania, Wharton",
  "Databricks Generative AI Fundamentals — Databricks Academy",
  "Databricks Lakehouse Fundamentals — Databricks Academy",
];

const portfolio = [
  {
    name: "DashPulse",
    url: "https://dashpulse.app",
    description:
      "Real-time intelligence dashboard built with Vite + Vanilla TypeScript. PWA with notes, alerts, and analytics.",
  },
  {
    name: "Family Planner",
    url: "https://github.com/ethancstuart/family-planner-app",
    description:
      "AI-powered family meal planner built with Next.js + Supabase + Claude API.",
  },
];

export default function ResumePage() {
  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Ethan Stuart
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Operational and strategy leader who builds clarity from ambiguity. I
              stand up teams, operating models, and platforms — then deliver value
              through them.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <DownloadMenu />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.links.email}
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Linkedin className="h-3.5 w-3.5" />
            linkedin.com/in/ethan-stuart
          </a>
        </div>
      </Section>

      {/* Experience */}
      <Section className="py-12">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-accent">
          Experience
        </h2>
        <div className="space-y-10">
          {experience.map((company) => (
            <div key={company.company}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  {company.company}
                  {company.unit && (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      | {company.unit}
                    </span>
                  )}
                </h3>
              </div>
              <div className="space-y-6">
                {company.roles.map((role) => (
                  <div key={role.title} className="border-l-2 border-border pl-6">
                    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-sm font-semibold">{role.title}</h4>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {role.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {role.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground italic">
            Previously held investment analysis and BI leadership roles at Pacific
            Urban Investors (2018–2021) and Civic Financial Services (2016–2018).
          </p>
        </div>
      </Section>

      {/* Portfolio */}
      <Section className="py-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-accent">
          Portfolio &amp; Open Source
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/30"
            >
              <h3 className="mb-1 text-sm font-semibold">{project.name}</h3>
              <p className="text-xs text-muted-foreground">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </Section>

      {/* Education & Certifications */}
      <Section className="pb-24 pt-12">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Education
            </h2>
            <p className="text-sm font-semibold">{education.school}</p>
            <p className="text-sm text-muted-foreground">{education.degree}</p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Certifications
            </h2>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-muted-foreground">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
