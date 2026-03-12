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
    twitter: "https://x.com/ethancstuart",
    email: "ethan.c.stuart@gmail.com",
  },
  substackFeed: "https://thedataproductagent.substack.com/feed",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function getNavLinks() {
  const links = [...navLinks];
  if (courseConfig.enabled) {
    links.splice(links.length - 1, 0, { href: "/course", label: "Course" });
  }
  return links;
}

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

export interface PortfolioProject {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  iframeSrc: string;
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
    iframeSrc: "https://dashpulse.app",
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
    liveUrl: "https://github.com/ethancstuart/family-planner-app",
    sourceUrl: "https://github.com/ethancstuart/family-planner-app",
    iframeSrc: "",
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
];

export const courseConfig = {
  title: "AI Coding for Non-Engineers",
  subtitle:
    "Learn to build real products with AI — no engineering background required.",
  enabled: false,
  tiers: [
    {
      name: "Self-Paced",
      price: 149,
      description: "Full course access at your own pace",
      features: [
        "All course modules and materials",
        "Lifetime access to updates",
        "Community Discord access",
        "Project templates and starter code",
      ],
      variantId: "self-paced",
      highlighted: false,
    },
    {
      name: "Cohort",
      price: 399,
      description: "Live cohort with direct support and accountability",
      features: [
        "Everything in Self-Paced",
        "4-week live cohort sessions",
        "Direct Q&A with instructor",
        "Code review on your projects",
        "Certificate of completion",
      ],
      variantId: "cohort",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: 999,
      description: "Team training with custom curriculum",
      features: [
        "Everything in Cohort",
        "Custom modules for your team",
        "Private Slack channel",
        "1-on-1 consulting sessions",
        "Team progress dashboard",
      ],
      variantId: "enterprise",
      highlighted: false,
    },
  ],
  modules: [
    {
      title: "Foundations",
      description:
        "Set up your development environment and understand how AI coding tools work.",
    },
    {
      title: "Your First App",
      description:
        "Build and deploy a real web application using AI assistants — from zero to live.",
    },
    {
      title: "APIs & Data",
      description:
        "Connect to external services, work with databases, and handle real-world data.",
    },
    {
      title: "AI Integration",
      description:
        "Add AI capabilities to your apps — chatbots, content generation, and intelligent features.",
    },
    {
      title: "Authentication & Users",
      description:
        "Add user accounts, protect routes, and manage permissions in your applications.",
    },
    {
      title: "Ship It",
      description:
        "Deploy to production, set up monitoring, and launch your product to the world.",
    },
  ],
  faq: [
    {
      question: "Do I need any coding experience?",
      answer:
        "No. This course is designed for product managers, data analysts, designers, and anyone who wants to build software without a traditional engineering background. AI tools have changed the game.",
    },
    {
      question: "What tools will I use?",
      answer:
        "You'll use Claude, Cursor, and modern frameworks like Next.js and Supabase. We'll set everything up together in Module 1.",
    },
    {
      question: "How long does the course take?",
      answer:
        "The self-paced version takes most students 4-6 weeks at 5-10 hours per week. The cohort runs on a fixed 4-week schedule with live sessions.",
    },
    {
      question: "What will I build?",
      answer:
        "You'll build at least 2 real, deployed web applications — not toy examples. Past students have shipped internal tools, customer-facing apps, and side projects that landed them new roles.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes. If you're not satisfied within 14 days of purchase, email me for a full refund — no questions asked.",
    },
  ],
} as const;

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

export interface TargetRole {
  slug: string;
  company: string;
  roleTitle: string;
  resumeVariant: string;
  relevantProjectIndices: number[];
  pitch: string;
}

export const targetRoles: TargetRole[] = [
  {
    slug: "cisco",
    company: "Cisco",
    roleTitle: "Director, AI Product Strategy",
    resumeVariant: "ai-product",
    relevantProjectIndices: [0, 1, 5],
    pitch:
      "I build AI platforms at enterprise scale. At Disney Studios, I set AI strategy for multi-agent systems, launched AI chatbots saving 6.5 hours per person per week, and drove org-wide AI enablement. I bring the same operational rigor and builder mindset to every platform I touch.",
  },
];
