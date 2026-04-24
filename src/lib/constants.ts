export const siteConfig = {
  name: "Ethan Stuart",
  title: "Ethan Stuart — Builder. Data & AI. Product Leadership.",
  description:
    "I lead data and AI products at Fortune 50 scale and ship them independently as a solo founder. AI products across intelligence, lending, trading, and learning.",
  url: "https://ethancstuart.com",
  ogImage: "https://ethancstuart.com/opengraph-image",
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
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
];

export interface PortfolioProject {
  title: string;
  slug: string;
  type: string;
  description: string;
  tagline: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  iframeSrc: string;
  image?: string;
  status: "Live" | "Building" | "Open Source";
  featured?: boolean;
  metrics?: string[];
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
    title: "NexusWatch",
    slug: "nexuswatch",
    type: "Geopolitical Intelligence Platform",
    tagline: "Bloomberg-level geopolitical intelligence without the Bloomberg price tag. 86 countries, 45+ live data layers, AI analyst — built solo.",
    description:
      "Real-time global intelligence platform tracking 86 countries across 45+ live data layers — conflict zones, earthquakes, wildfires, flight disruptions, cyber incidents, ship tracking, and more. Bloomberg terminal meets geopolitical situational awareness.",
    tags: ["TypeScript", "MapLibre GL", "Vite", "Supabase", "Claude AI"],
    liveUrl: "https://nexuswatch.dev",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/nexuswatch-preview.png",
    status: "Live",
    featured: true,
    metrics: ["86 countries", "45+ data layers", "AI intelligence analyst", "4 subscription tiers"],
    highlights: [
      "86 countries, 45+ real-time data layers on a single interactive globe",
      "AI-powered geopolitical analysis and tension index scoring",
      "Conflict zones, natural disasters, cyber incidents, and ship tracking — live",
    ],
    stack: ["TypeScript", "Vite", "MapLibre GL", "Supabase", "Claude AI"],
    caseStudy: {
      problem:
        "Geopolitical intelligence is either locked behind Bloomberg terminals costing $25K/year or buried in news feeds that require hours to parse. There's no product that gives a solo analyst, researcher, or enterprise team a live, structured view of global risk at a glance.",
      approach:
        "Built a MapLibre GL globe as the primary interface — every data layer toggled on top of a single interactive map. Engineered 45+ live data feeds (GDELT, USGS, FlightAware, AIS ship tracking, CISA cyber alerts, undersea cable databases) into a unified event stream. Layered an AI analyst (Claude) on top that synthesizes tension patterns into a daily intelligence brief.",
      outcome:
        "Live at nexuswatch.io — 86 countries, 45+ data layers, live geopolitical scoring, and an AI analyst accessible without an enterprise contract. Designed for researchers, journalists, analysts, and operators who need situational awareness, not a Bloomberg subscription.",
    },
  },
  {
    title: "Meridian Intelligence",
    slug: "meridian",
    type: "Non-QM Lending Intelligence OS",
    tagline: "Mortgage brokers spend hours calling lenders before knowing if a deal closes. Meridian eliminates that. Real-time matching across 15+ lenders, AI deal scoring, scenario analysis.",
    description:
      "Institutional lending intelligence platform for mortgage brokers. Matches deals to 15+ real non-QM lenders in real time, runs automated scenario analysis, and surfaces the rate and terms a deal can actually get — before a broker makes a single call.",
    tags: ["Next.js", "Supabase", "TypeScript", "Claude AI"],
    liveUrl: "https://meridian.finance",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/meridian-preview.png",
    status: "Live",
    featured: false,
    metrics: ["15+ lender integrations", "20+ intelligence modules", "433 tests passing", "Free → Enterprise"],
    highlights: [
      "15+ live lender integrations with real-time program matching",
      "20+ intelligence modules: scenario analysis, rate comparison, deal scoring",
      "Built for brokers — surfaces deal viability before the first lender call",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "Claude AI", "PostgreSQL"],
    caseStudy: {
      problem:
        "Non-QM mortgage brokers spend hours calling lenders, manually comparing program guidelines, and building scenario spreadsheets — before they know if a deal will close. There's no intelligence layer between the deal and the lender universe.",
      approach:
        "Built a full lending OS: 15+ lender integrations with real program data (not scraped, not stale), a scenario engine that computes rate/terms across the universe in real time, and an AI analyst that scores deal viability and flags fit/gap issues. Designed for the broker workflow, not the lender.",
      outcome:
        "Live at meridian.finance — 20+ intelligence modules, 15+ lenders, 433+ tests passing. Pricing from free to enterprise. Built by a solo founder who learned non-QM lending from scratch to get the domain right.",
    },
  },
  {
    title: "Zero to Ship",
    slug: "ai-coding-course",
    type: "AI-Native Learning Platform",
    tagline: "The gap between 'I tried Cursor' and 'I shipped something real' is where most PMs stall. Zero to Ship closes it — 16 modules, each ending with something deployed.",
    description:
      "Gamified learning platform teaching PMs, analysts, and operators to build and ship real products using AI coding tools. 16 hands-on modules — each ending with something deployed, not a slide deck.",
    tags: ["Next.js", "Supabase", "Stripe", "Framer Motion"],
    liveUrl: "https://zerotoship.app",
    sourceUrl: "https://github.com/ethancstuart/zero-to-shipped",
    iframeSrc: "",
    image: "/portfolio/zerotoship-preview.png",
    status: "Live",
    featured: false,
    metrics: ["16 hands-on modules", "XP + 20+ badges", "Stripe + founding tier", "Built with AI tools it teaches"],
    highlights: [
      "Built for operators, not engineers — every module ships something real",
      "Gamification: XP, 20+ badges, leaderboard, skill tree, certificates",
      "The platform was built with the same AI-first workflow it teaches",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Shiki", "Framer Motion"],
    caseStudy: {
      problem:
        "PMs, analysts, and operators are surrounded by AI coding tools — but have no structured path from zero to a shipped, deployed product. Most tutorials stop at hello world. The gap between 'I tried Cursor' and 'I shipped something real' is where most people stall.",
      approach:
        "Designed around the user outcome: every module ends with something deployed. Built full gamification (XP, badges, streaks, leaderboard, skill tree, certificates), Stripe checkout with founding coupon, 5 email nurture sequences, and public profiles. The platform itself was built using the same AI-assisted workflow it teaches.",
      outcome:
        "Live at zerotoship.app — 16-module gamified platform, Stripe live, founding member pricing. Proves the thesis that the gap between product thinking and product building is closing fast.",
    },
  },
  {
    title: "RidgeCap",
    slug: "ridgecap",
    type: "CRE Debt Intelligence",
    tagline: "CRE brokers manage deal pipelines across dozens of lenders using spreadsheets. RidgeCap replaces that — AI lender matching, DSCR underwriting, live macro data.",
    description:
      "Capital source matching and deal underwriting platform for commercial real estate brokers. AI-powered lender matching, geospatial market intelligence, portfolio stress testing, and pipeline management — purpose-built for CRE debt professionals.",
    tags: ["Next.js", "Supabase", "TypeScript", "FRED API"],
    liveUrl: "https://ridgecap.app",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/ridgecap-preview.png",
    status: "Building",
    featured: false,
    metrics: ["AI lender matching", "DSCR/LTV underwriting", "15 FRED macro series", "CRE debt OS"],
    highlights: [
      "AI capital source matching across the CRE lender universe",
      "Geospatial market intelligence and deal underwriting engine",
      "Portfolio stress testing with live FRED macro data integration",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "FRED API", "PostgreSQL"],
    caseStudy: {
      problem:
        "CRE brokers manage deal pipelines across dozens of lenders, property types, and markets using spreadsheets and memory. There's no intelligence layer that matches deals to capital sources, stress-tests portfolios against macro scenarios, or gives brokers a unified view of their book.",
      approach:
        "Built a full CRE debt OS: AI capital source matching using property type, LTV, geography, and deal structure; an underwriting engine with DSCR/LTV analysis; geospatial intelligence via FRED CRE market data (15 free series, 7 tables); and a pipeline management layer. Designed around the broker workflow.",
      outcome:
        "CRE market data infrastructure shipped, AI matching and underwriting engine complete. Target pricing Scout→$1,200→$2,500→$5,000/mo. Paused while focusing on Meridian traction; ready to resume once Meridian's milestone hits.",
    },
  },
  {
    title: "Quant Engine",
    slug: "quant-engine",
    type: "Systematic Trading Platform",
    tagline: "Institutional-grade systematic trading infrastructure built by one person. Signal factory, GPU backtesting, Bayesian self-learning, 9-multiplier sizing — running live.",
    description:
      "Institutional-grade systematic trading platform. Signal factory generating 10,000+ candidate signals, GPU-accelerated backtesting, Bayesian self-learning loop, and a 9-multiplier position sizing chain. Running live on Alpaca.",
    tags: ["Python", "PyTorch", "FastAPI", "Alpaca"],
    liveUrl: "",
    sourceUrl: "",
    iframeSrc: "",
    image: "/portfolio/quant-engine-preview.png",
    status: "Live",
    featured: false,
    metrics: ["10,000+ candidate signals", "100K parallel simulations", "666 tests passing", "Live on Alpaca"],
    highlights: [
      "Signal factory: 10,000+ candidate signals with Benjamini-Hochberg multiple testing correction",
      "GPU-accelerated backtesting via PyTorch — 100,000 parallel simulations",
      "Bayesian feedback loop with Thompson Sampling meta-learner for dynamic strategy allocation",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "Alpaca", "LightGBM", "statsmodels"],
    caseStudy: {
      problem:
        "Institutional-grade systematic trading is locked behind hedge fund infrastructure — expensive, opaque, and inaccessible to solo operators. The edge is in signal quality, risk management, and self-learning, not in trading terminal access.",
      approach:
        "Built five pillars: a signal factory (10,000+ candidates, walk-forward validation, Benjamini-Hochberg filtering), GPU-accelerated backtesting (PyTorch, 100K parallel simulations), real-time streaming (WebSocket + Alpaca), a 9-multiplier position sizing chain (vol, regime, FOMC, GEX, correlation), and a Bayesian self-learning loop with Thompson Sampling. NexusWatch feeds geopolitical risk directly into the sizing model.",
      outcome:
        "Running live on Alpaca with a paper portfolio. 666 tests, 170+ modules, ~50K LOC. Path: 30-day Sharpe estimate → 6-month GO/NO-GO for real capital. NexusWatch API productization adds $500–2K/mo per subscriber as a parallel revenue stream.",
    },
  },
  {
    title: "Family Planner",
    slug: "family-planner",
    type: "AI-Powered Home App",
    tagline: "A build-vs-buy experiment that became a real product. AI recipe import from TikTok and YouTube, drag-and-drop meal planning — shipped with Lovable in days, not months.",
    description:
      "AI-powered family organization app built with Lovable. Recipe import from TikTok, YouTube, and blogs, drag-and-drop meal planning, and smart grocery lists — a live proof point that the gap between product thinking and product building is closing fast.",
    tags: ["Lovable", "Supabase", "Claude API", "TypeScript"],
    liveUrl: "https://family-planner-app-rosy.vercel.app",
    sourceUrl: "https://github.com/ethancstuart/family-planner-app",
    iframeSrc: "",
    image: "/portfolio/family-planner-preview.png",
    status: "Open Source",
    featured: false,
    metrics: ["Open source MIT", "AI recipe import", "TikTok + YouTube + blogs", "Shipped in days"],
    highlights: [
      "Built with Lovable — AI-native development from idea to shipped in days",
      "AI recipe import from TikTok, YouTube, Instagram, and blogs",
      "Open source: MIT licensed, full-stack with auth and real-time sync",
    ],
    stack: ["Lovable", "Supabase", "Claude API", "TypeScript"],
    caseStudy: {
      problem:
        "My family needed a better way to save recipes from TikTok and YouTube and plan meals from them. But this was also an experiment: with AI-native tools, is it faster to build exactly what you need than to evaluate and compromise with existing apps?",
      approach:
        "Treated this as a real build-vs-buy decision. Built using Lovable for the app shell, Claude API for intelligent recipe extraction from any URL or photo, and Supabase for the backend. The goal was to test how fast a product leader with AI tools can go from idea to shipped product.",
      outcome:
        "Shipped a fully functional family platform in a fraction of the time traditional development would require. Open source under MIT — and a proof point that AI-native building changes the calculus on build-vs-buy decisions for product leaders.",
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
