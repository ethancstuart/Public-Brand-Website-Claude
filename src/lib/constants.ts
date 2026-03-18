export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Product & Technology Leader",
  description:
    "Building and leading the teams behind enterprise data and AI platforms — turning complex data into products people actually use. Currently at Disney Studios Technology.",
  url: "https://ethancstuart.com",
  ogImage: "/opengraph-image",
  links: {
    linkedin: "https://linkedin.com/in/ethan-stuart",
    github: "https://github.com/ethancstuart",
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
  status?: "Live" | "Open Source" | "Beta";
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
    title: "Zero to Ship",
    slug: "ai-coding-course",
    description:
      "A gamified learning platform that teaches PMs, Project Managers, Business Analysts, and BI Engineers to build and ship real products using AI coding tools. 16 hands-on modules, each ending with something deployed.",
    tags: ["Course", "AI Tools", "Claude", "Cursor"],
    liveUrl: "https://zerotoship.app",
    sourceUrl: "https://github.com/ethancstuart/zero-to-shipped",
    iframeSrc: "",
    status: "Live",
    highlights: [
      "Designed for PMs, analysts, and operators — not engineers",
      "Hands-on: students ship real apps, not toy examples",
      "Built with the same AI-first workflow the course teaches",
    ],
    caseStudy: {
      problem:
        "PMs, analysts, and operators are surrounded by AI coding tools — but have no structured way to go from zero to a shipped, deployed product. Most tutorials stop at hello world. The gap between 'I tried Cursor' and 'I shipped something real' is where most people stall.",
      approach:
        "Designed around the user outcome: every module ends with something deployed, not a slide deck. Students build real web applications using Claude, Cursor, and modern frameworks. The platform itself was built with the same AI-assisted workflow it teaches — proving the thesis that non-engineers can ship real products.",
      outcome:
        "Live at zerotoship.app — a 16-module gamified platform where students ship real, deployed products using AI coding tools. Proves the thesis that the gap between product thinking and product building is closing fast.",
    },
  },
  {
    title: "DashPulse",
    slug: "dashpulse",
    description:
      "Real-time intelligence dashboard built with vanilla TypeScript. Configurable panels, workspaces, AI command bar, and full PWA support — no frameworks, no dependencies.",
    tags: ["Vite", "TypeScript", "PWA", "Vercel Edge Functions"],
    liveUrl: "https://dashpulse.app",
    sourceUrl: "https://github.com/ethancstuart/dashboard",
    iframeSrc: "https://dashpulse.app/#/embed",
    image: "/portfolio/dashpulse-preview.png",
    status: "Live",
    highlights: [
      "Zero framework dependencies — pure TypeScript",
      "Configurable panels, workspaces, and AI command bar",
      "PWA with offline support, installable on any device",
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
        "I was tired of toggling between tabs and enterprise BI tools just to check basic metrics — and realized every product leader I know has the same problem. There's no lightweight, always-on dashboard that just works without vendor lock-in or complex setup.",
      approach:
        "Designed around the user need first: what does a product leader actually want to see at a glance, and how fast does it need to load? Then made a deliberate technical bet — zero framework dependencies, vanilla TypeScript only — to maximize performance and prove the concept. Added configurable panels, workspaces, an AI command bar, PWA offline support, and Vercel Edge Functions for low-latency data.",
      outcome:
        "Shipped a fully featured PWA dashboard with sub-second load times, configurable workspaces, and AI command bar. Validates that product leaders want a lightweight alternative to enterprise BI — now preparing for premium tier launch and Product Hunt.",
    },
  },
  {
    title: "Family Planner",
    slug: "family-planner",
    description:
      "A build-vs-buy experiment: could AI tools let me ship a full-stack app faster than evaluating existing solutions? AI-powered recipe import from TikTok, YouTube, and blogs, drag-and-drop meal planning, and smart grocery lists — built end-to-end with Next.js, Supabase, and Claude API.",
    tags: ["Next.js", "Supabase", "Claude API", "Tailwind CSS"],
    liveUrl: "https://family-planner-app-rosy.vercel.app",
    sourceUrl: "https://github.com/ethancstuart/family-planner-app",
    iframeSrc: "https://family-planner-app-rosy.vercel.app/embed",
    image: "/portfolio/family-planner-preview.png",
    status: "Open Source",
    highlights: [
      "AI recipe import from TikTok, YouTube, Instagram, blogs, and photos",
      "Drag-and-drop meal planner with smart grocery lists",
      "Full-stack with auth, database, and real-time sync",
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
        "My family needed a better way to save recipes from TikTok, YouTube, and blogs — and plan meals from them. But this was also an exploration: with AI-native tools, is it faster to build exactly what you need than to evaluate and compromise with existing apps?",
      approach:
        "Treated this as a real build-vs-buy decision. Scoped the user need (recipe capture, meal planning, grocery lists), then built end-to-end using AI-assisted development — Next.js and Supabase for the platform, Claude API for intelligent recipe extraction from any URL or photo. The goal was to test how fast a product leader with AI tools can go from idea to shipped product.",
      outcome:
        "Shipped a fully functional family platform in a fraction of the time traditional development would require. Open source — and a proof point that AI-native building changes the calculus on build-vs-buy decisions for product leaders.",
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
