export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Product & Technology Leader",
  description:
    "Operational and strategy leader who builds clarity from ambiguity. Leading enterprise data, AI, and product strategy at Disney Studios Technology.",
  url: "https://ethancstuart.com",
  ogImage: "/opengraph-image",
  links: {
    linkedin: "https://linkedin.com/in/ethan-stuart",
    github: "https://github.com/ethan-stuart",
    substack: "https://thedataproductagent.substack.com",
    email: "ethan.c.stuart@gmail.com",
    twitter: "https://x.com/ethancstuart",
  },
  substackFeed: "https://thedataproductagent.substack.com/feed",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/writing", label: "Writing" },
];

export interface PortfolioProject {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  iframeSrc: string;
  image?: string;
  highlights?: string[];
  stack?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "DashPulse",
    slug: "dashpulse",
    description:
      "Real-time intelligence dashboard built with vanilla TypeScript. PWA with notes, alerts, and analytics — no frameworks, no dependencies.",
    tags: ["Vite", "TypeScript", "PWA", "Vercel Edge Functions"],
    liveUrl: "https://dashpulse.app",
    sourceUrl: "https://github.com/ethancstuart/dashboard",
    iframeSrc: "https://dashpulse.app/#/embed",
    image: "/portfolio/dashpulse-preview.png",
    highlights: [
      "Zero framework dependencies — pure TypeScript",
      "PWA with offline support and installable",
      "Real-time data via Vercel Edge Functions",
    ],
    stack: [
      "Vite",
      "TypeScript",
      "Vercel Edge Functions",
      "Service Workers",
      "IndexedDB",
    ],
    caseStudy: {
      problem:
        "Product leaders need a lightweight, always-available dashboard to track key metrics without the overhead of enterprise BI tools. Existing solutions require complex setups, vendor lock-in, or heavy frameworks.",
      approach:
        "Built a zero-dependency real-time dashboard using vanilla TypeScript and Vite. Implemented PWA capabilities for offline access, used Vercel Edge Functions for low-latency data fetching, and designed a clean, responsive UI that works across devices. Focused on performance — no React, no Vue, just raw TypeScript with modern browser APIs.",
      outcome:
        "Shipped a fully functional PWA dashboard with sub-second load times, offline support, and real-time updates. The project demonstrates that modern web apps don't need heavy frameworks — and serves as a proof point for the builder narrative.",
    },
  },
  {
    title: "Family Planner",
    slug: "family-planner",
    description:
      "AI-powered family meal planner that generates personalized weekly menus, grocery lists, and recipes using Claude API. Built with Next.js, Supabase, and Tailwind.",
    tags: ["Next.js", "Supabase", "Claude API", "Tailwind CSS"],
    liveUrl: "https://family-planner-app-rosy.vercel.app",
    sourceUrl: "https://github.com/ethancstuart/family-planner-app",
    iframeSrc: "https://family-planner-app-rosy.vercel.app/embed",
    image: "/portfolio/family-planner-preview.png",
    highlights: [
      "AI-generated meal plans tailored to family preferences",
      "Full-stack with auth, database, and real-time sync",
      "Built end-to-end in a weekend",
    ],
    stack: [
      "Next.js",
      "React",
      "Supabase",
      "Claude API",
      "Tailwind CSS",
      "TypeScript",
    ],
    caseStudy: {
      problem:
        "Weekly meal planning is tedious and repetitive. Families struggle to balance nutrition, preferences, and budget while keeping meals interesting. Existing apps are either too simple or overly complex.",
      approach:
        "Built a full-stack application using Next.js and Supabase for auth and data persistence. Integrated Claude API to generate personalized meal plans based on family size, dietary restrictions, and cuisine preferences. Designed the UX to feel conversational — users describe what they want, and the AI handles the rest.",
      outcome:
        "Delivered a working product that generates complete weekly meal plans with recipes and grocery lists in seconds. Demonstrates full-stack AI integration — from prompt engineering to database design to deployment.",
    },
  },
  {
    title: "Zero to Ship",
    slug: "ai-coding-course",
    description:
      "A gamified learning platform that teaches PMs, Project Managers, Business Analysts, and BI Engineers to build and ship real products using AI coding tools. 16 hands-on modules, each ending with something deployed.",
    tags: ["Course", "AI Tools", "Claude", "Cursor"],
    liveUrl: "https://zerotoship.app",
    sourceUrl: "https://github.com/ethancstuart/zero-to-shipped",
    iframeSrc: "",
    highlights: [
      "Designed for PMs, analysts, and operators — not engineers",
      "Hands-on: students ship real apps, not toy examples",
      "Built with the same AI-first workflow the course teaches",
    ],
    caseStudy: {
      problem:
        "AI coding tools have made it possible for non-engineers to build real software, but there's no structured path from zero to shipped product. Most tutorials stop at hello world.",
      approach:
        "Designed a project-based curriculum where students build and deploy real web applications using Claude, Cursor, and modern frameworks. Each module is a working project — not slides. The platform itself was built with the same AI-assisted workflow it teaches.",
      outcome:
        "Shipped a 16-module gamified learning platform where students build and deploy real products using AI coding tools. Live at zerotoship.app — a proof point that non-engineers can go from zero to shipped product.",
    },
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
