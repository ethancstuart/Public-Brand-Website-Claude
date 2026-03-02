export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Product & Technology Leader",
  description:
    "Product executive building organizations and platforms that deliver at Fortune 50 scale. Leading enterprise data, AI, and product strategy at Disney Studios Technology.",
  url: "https://ethancstuart.com",
  ogImage: "/og-image.png",
  links: {
    linkedin: "https://linkedin.com/in/ethan-stuart",
    github: "https://github.com/ethan-stuart",
    substack: "https://thedataproductagent.substack.com",
    twitter: "https://x.com/ethancstuart",
    email: "ethan.c.stuart@gmail.com",
  },
  substackFeed: "https://thedataproductagent.substack.com/feed",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Enterprise Data & AI Platform — Disney Studios",
    description:
      "Scaled platform adoption from 1 to 5 studio groups in 5 months, growing from 15 to 120+ stakeholders with 500+ downstream users. Led migration strategy, stakeholder education, and executive partnerships across a $17M platform investment.",
    tags: ["Snowflake", "AI/ML", "Product Strategy", "Enterprise Scale"],
    featured: true,
  },
  {
    title: "ML Forecasting & Conversational AI — Disney Studios",
    description:
      "Delivered ML forecasting model that transformed quarterly budget planning for a major studio banner. Launched conversational AI chatbot accelerating analytics workflows, with roadmap for multi-agentic capabilities via Snowflake Cortex and Neo4j.",
    tags: ["Machine Learning", "Conversational AI", "Neo4j", "Snowflake Cortex"],
    featured: true,
  },
  {
    title: "Enterprise Customer Data Platform — Taco Bell / Yum Brands",
    description:
      "Drove CDP adoption across all Yum brands enabling 80% YoY loyalty growth. Shipped ML models for retention, lapse prediction, and CRM insights serving 7,000+ operators through dashboards and in-store reporting.",
    tags: ["CDP", "ML/AI", "CRM", "Loyalty"],
    featured: true,
  },
  {
    title: "Phoenix Fire Data Platform — Capital Group",
    description:
      "Launched 0→1 data platform achieving 100% enterprise adoption. Transformed sales and marketing operations for all Capital Group ETFs and Mutual Funds with consolidated tools, automated workflows, and modern UI/UX.",
    tags: ["0→1 Build", "Data Platform", "Financial Services", "Governance"],
  },
  {
    title: "Product Organization Transformation — Taco Bell",
    description:
      "Reduced platform incidents 85% and increased satisfaction 50% in 60 days. Transformed service team into product organization through prioritization frameworks and transparent stakeholder communication.",
    tags: ["Product Ops", "Transformation", "Leadership", "Process Design"],
  },
  {
    title: "AI Literacy & Development Acceleration — Disney Studios",
    description:
      "Leading org-wide transformation for AI literacy and increased development velocity across software and data engineering teams. Driving adoption of AI tools like Cursor and Claude Code for non-engineering roles.",
    tags: ["AI Adoption", "Change Management", "Developer Experience", "Culture"],
  },
];

export const competencies = [
  {
    category: "Product Leadership",
    skills: [
      "Product Strategy & Roadmap",
      "Go-to-Market Execution",
      "0→1 Product Development",
      "Platform Management at Scale",
      "Executive Stakeholder Management",
      "OKRs & Metrics-Driven Decision Making",
    ],
  },
  {
    category: "Data & AI Platforms",
    skills: [
      "Enterprise Data Platform Modernization",
      "AI/ML Productization",
      "Customer Data Platforms",
      "Predictive Analytics & Segmentation",
      "Data Governance & Lineage",
      "Multi-Agentic AI Systems",
    ],
  },
  {
    category: "Technical Proficiency",
    skills: [
      "Snowflake",
      "Databricks",
      "Microsoft Fabric",
      "AWS",
      "Neo4j",
      "Power BI & Tableau",
      "SQL & Python",
    ],
  },
  {
    category: "Organizational Excellence",
    skills: [
      "Built & Scaled Product Orgs",
      "Agile & SAFe Methodologies",
      "Operational Process Optimization",
      "Matrixed Organization Management",
      "Product Operations Frameworks",
    ],
  },
] as const;
