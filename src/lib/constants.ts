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

// New redesign-v2 types and exports
export type ProjectStatus = "live" | "beta" | "build" | "active";
export type ProjectCategory = "featured" | "lab" | "re-stack";

export interface Project {
  slug: string;
  name: string;
  type: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  color: string;
  href?: string;
}

// Featured 4 — full magazine spreads in Phase 2
export const FEATURED: Project[] = [
  {
    slug: "nexuswatch",
    name: "NexusWatch",
    type: "Geopolitical Intelligence",
    description:
      "Real-time geopolitical intelligence across 86 countries. AI risk analyst, 45+ data layers, globe visualization. Professional-grade threat monitoring built solo.",
    status: "live",
    category: "featured",
    color: "var(--color-nx)",
    href: "https://nexuswatch.io",
  },
  {
    slug: "the-composer",
    name: "The Composer",
    type: "Multi-Agent Editorial Framework",
    description:
      "Agentic newsroom built on a 10-persona editorial board, multi-step pipeline (notes → draft → review → publish). Masthead is the productized expansion.",
    status: "beta",
    category: "featured",
    color: "var(--color-cm)",
  },
  {
    slug: "product-os",
    name: "Product OS",
    type: "Spec-as-code for PMs",
    description:
      "OSS CLI + commercial dashboard + GitHub App that turn structured product specs into reviewable, version-controlled artifacts.",
    status: "build",
    category: "featured",
    color: "var(--color-po)",
  },
  {
    slug: "zero-to-ship",
    name: "Zero to Ship",
    type: "AI Coding Course Platform",
    description:
      "16-module gamified course teaching the same shipping-first method used to build the rest of this portfolio.",
    status: "live",
    category: "featured",
    color: "var(--color-zts)",
    href: "https://zerotoship.dev",
  },
];

// Modeling Lab — practice / quant track
export const MODELING_LAB: Project[] = [
  {
    slug: "quant-engine",
    name: "Quant Engine",
    type: "Systematic Trading Platform",
    description:
      "World-class systematic trading platform — signal factory, streaming, GPU backtest, Bayesian state, paper-traded live on Alpaca.",
    status: "live",
    category: "lab",
    color: "var(--color-ml)",
  },
  {
    slug: "sports-ml",
    name: "Sports ML Pipeline",
    type: "Models for Sports Markets",
    description:
      "20+ models across 4 sports. Kelly-sized bets, model-promoted to production after backtest. From small bankroll to live wagering.",
    status: "active",
    category: "lab",
    color: "var(--color-ml)",
  },
];

// RE Stack — real-estate ventures
export const RE_STACK: Project[] = [
  {
    slug: "meridian",
    name: "Meridian Intelligence",
    type: "Non-QM Lending Intelligence",
    description:
      "Lending intelligence platform — 34 features, 433 tests, white-label-ready. Operator-layer SaaS for non-QM mortgage shops.",
    status: "active",
    category: "re-stack",
    color: "var(--color-re)",
  },
  {
    slug: "ridgecap",
    name: "RidgeCap",
    type: "CRE Data Infrastructure",
    description:
      "CRE data infrastructure — 7-table FRED schema, 15 free CRE series, parallel build. Currently in product-frozen due-diligence mode.",
    status: "build",
    category: "re-stack",
    color: "var(--color-re)",
  },
];

// Aggregate for callers that want everything
export const ALL_PROJECTS: Project[] = [...FEATURED, ...MODELING_LAB, ...RE_STACK];

// Legacy portfolio structure — kept for compatibility with existing pages
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
];

