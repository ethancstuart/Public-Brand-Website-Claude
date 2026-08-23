export interface CaseSection {
  label: string;
  title: string;
  body: string[];
}

export interface CaseStudy {
  /** One paragraph directly under the title. */
  lede: string;
  /** Tabular facts — the register's habit, carried into the detail page. */
  facts: { term: string; value: string }[];
  sections: CaseSection[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "allisons-kitchen": {
    lede: "Kitchen software built for one household first — mine — and opened to other families only once it survived daily use at home. Capture a recipe from anywhere, plan the week once, cook from a clean screen.",
    facts: [
      { term: "Status", value: "Invite — web gated, iOS in UAT" },
      { term: "Origin", value: "Built for my own household" },
      { term: "Formerly", value: "Stuart Pantry" },
      { term: "Surface", value: "Web · iOS" },
    ],
    sections: [
      {
        label: "Origin",
        title: "It was built for one household before it was built for anyone else.",
        body: [
          "This did not start as a product. It started because the recipes my family actually cooks were scattered across screenshots, a browser bookmark folder, a paused video, and someone's memory — and the week's plan lived nowhere at all.",
          "That is the credibility, not something to apologize for. Software built for a real household under real conditions gets corrected every single evening. The dinner does not care whether the feature demos well.",
        ],
      },
      {
        label: "Problem",
        title: "Recipe apps optimize for collecting. Households need to cook.",
        body: [
          "The category is full of tools for saving recipes and nearly empty of tools for the twenty minutes when someone is standing in a kitchen with a hot pan. Capture is easy and well served. Planning the week and then executing it is neither.",
          "So the product treats capture as a means, not the point: get the recipe in from wherever it lives, then get out of the way.",
        ],
      },
      {
        label: "System",
        title: "Capture from anywhere, plan once, cook from a clean screen.",
        body: [
          "Capture ingests a link, a photo of a printed page, or a video you paused, and normalizes it into structured ingredients and steps. Planning assembles the week in one sitting and rolls the result into a consolidated shopping list.",
          "The cooking view is deliberately austere: one screen, current step, no upsell, no ads, nothing that requires clean hands to dismiss.",
        ],
      },
      {
        label: "Where it stands",
        title: "Opening to other families a few at a time.",
        body: [
          "Web is in invite — real households, gated, added deliberately rather than in a launch. The iOS build is in user acceptance testing.",
          "Adding families slowly is a choice, not a constraint. Each new household surfaces assumptions that were invisible while the only user was the person who wrote the code.",
        ],
      },
    ],
  },

  nexuswatch: {
    lede: "Real-time geopolitical threat monitoring: 45+ live data layers across 86 countries — conflict, disasters, infrastructure, environment — an LLM risk analyst reading a normalized event pipeline, and an MCP server so agents can query the same data a human would.",
    facts: [
      { term: "Status", value: "Live — open to anyone" },
      { term: "Coverage", value: "45+ live data layers · 86 countries scored" },
      { term: "Source", value: "Open source" },
      { term: "Stack", value: "TypeScript · MapLibre GL · Supabase · Claude API" },
    ],
    sections: [
      {
        label: "Problem",
        title: "The signal is public. The synthesis is not.",
        body: [
          "Geopolitical risk data is scattered across government feeds, humanitarian trackers, and environmental monitors — all public, none reconciled. The work is not access; it is normalization and judgment.",
          "Commercial platforms in the category tend to lean on stale refreshes and opaque scoring, with no analyst layer a reader can interrogate.",
        ],
      },
      {
        label: "System",
        title: "An analyst layer sitting on a normalized event pipeline.",
        body: [
          "Scheduled collection pulls structured events from 45+ live data layers, normalizes them into one schema, and scores instability across 86 countries. An LLM analyst reads that pipeline and produces narrative explanations on demand — the map is the index, the analyst is the product.",
          "An MCP server exposes the same pipeline to agents, which means the platform is queryable by software as well as by people.",
        ],
      },
      {
        label: "What's live",
        title: "Open to anyone, with a real subscriber list.",
        body: [
          "The public site, the API, and the MCP server are all live. A daily brief goes to actual subscribers — the strongest signal that the output is worth reading, since nobody stays subscribed to a demo.",
          "The project is open source, which imposes a discipline of its own: the pipeline has to be defensible to anyone who opens it.",
        ],
      },
    ],
  },

  altogether: {
    lede: "Trip planning for several households at once. Each household submits availability and budget privately; Otto, the AI co-planner, finds the windows that actually work and prices them per household.",
    facts: [
      { term: "Status", value: "In development — waitlist open" },
      { term: "Formerly", value: "Long Table, formerly Caravan" },
      { term: "Co-planner", value: "Otto" },
      { term: "In users' hands", value: "Not yet" },
    ],
    sections: [
      {
        label: "Problem",
        title: "One household is a calendar. Three is a negotiation.",
        body: [
          "Coordinating a trip across families fails on two things at once: nobody wants to publish their real constraints to the group thread, and nobody wants to be the person doing the arithmetic.",
          "Budget is the harder half. People will trade dates far more readily than they will say out loud what they can spend.",
        ],
      },
      {
        label: "System",
        title: "Private inputs, shared answers.",
        body: [
          "Each household submits availability and budget privately. Otto reads across all of them and proposes windows that genuinely clear everyone's constraints, priced per household rather than as one undifferentiated total.",
          "The privacy boundary is the design, not a setting. No household sees another's numbers; they see the options those numbers made possible.",
        ],
      },
      {
        label: "Where it stands",
        title: "Waitlist open. Not yet in anyone's hands.",
        body: [
          "The status here is deliberately unflattering. There is a waitlist and there is working software, and there are not yet real households using it to plan a real trip. Until that is true it stays in development.",
          "The name has moved twice — Caravan, then Long Table, now Altogether. Same product throughout; the trail is kept visible rather than quietly erased.",
        ],
      },
    ],
  },

  "the-composer": {
    lede: "An agentic newsroom. An editorial board of personas gates an explicit state machine that carries a piece from notes through draft, review, and publish. Masthead is the multi-tenant productization of the same framework.",
    facts: [
      { term: "Status", value: "In development" },
      { term: "Shape", value: "Persona board over a state machine" },
      { term: "Product layer", value: "Masthead — multi-tenant" },
      { term: "Escalation", value: "Repeated failures return to the operator" },
    ],
    sections: [
      {
        label: "Problem",
        title: "Publishing raw operator thinking has a quality ceiling.",
        body: [
          "Writing that goes out unreviewed is faster and worse. The usual fix — a human editor — does not scale to the cadence a working operator can actually sustain.",
          "Review by persona preserves the voice while raising the floor, because each reviewer is narrow enough to have an opinion worth disagreeing with.",
        ],
      },
      {
        label: "System",
        title: "Notes → structured → interview → draft → review → approved.",
        body: [
          "The pipeline is an explicit state machine, not a prompt chain. Every transition gates on a persona's pass or fail, and the state is inspectable at each step.",
          "A rejected draft returns to interview rather than all the way to notes, which preserves the thinking already done. Repeated failure at the same gate escalates to the operator instead of looping.",
        ],
      },
      {
        label: "Board",
        title: "Each persona reads through one narrow lens.",
        body: [
          "Strategist, architect, editor, journalist, peer, revenue partner, reader archetypes, chief of staff. Each is an agent anchored to a real editorial role with a single evaluative concern — rigor of argument, narrative arc, voice authenticity, conversion mechanism.",
          "Narrowness is the mechanism. A reviewer asked to judge everything judges nothing.",
        ],
      },
      {
        label: "Masthead",
        title: "The product layer on top.",
        body: [
          "Masthead turns the framework into multi-tenant software: authentication, per-tenant isolation at the row level, streaming review UI. The free tier ships board reviews; the paid tier opens the pipeline editor and agent customization.",
        ],
      },
    ],
  },

  "product-os": {
    lede: "Spec-as-code for product managers. A CLI, a GitHub App, and a dashboard that turn product specs into reviewable, version-controlled artifacts — specs moving through pull requests like the code they describe.",
    facts: [
      { term: "Status", value: "In development" },
      { term: "Surfaces", value: "CLI · GitHub App · dashboard" },
      { term: "Model", value: "Open-source core, commercial layer" },
      { term: "Used by", value: "The practice that built this site" },
    ],
    sections: [
      {
        label: "Problem",
        title: "Specs decay the moment they leave the document.",
        body: [
          "A spec in a shared doc is read once and then quietly diverges from the thing it describes. Engineering solved this for code decades ago — version control, review, checks on merge — and product work never adopted it.",
          "The result is decision debt: teams re-litigating choices because the reasoning behind them was never written anywhere durable.",
        ],
      },
      {
        label: "System",
        title: "The spec lives in the repo it governs.",
        body: [
          "The CLI scaffolds and lints specs. The GitHub App runs those checks on pull requests — are requirements traceable to test cases, is there an owner, has a decision log entry been recorded. The dashboard reports spec coverage and review velocity.",
          "Because the spec sits beside the code, a change to one shows up as a diff against the other.",
        ],
      },
      {
        label: "Why it exists",
        title: "It is the tooling this practice already needed.",
        body: [
          "Product OS is not a hypothesis about how teams should work. It is the extraction of a working method: the specs, decision logs, and commit-time validation that govern every other product on this site.",
          "That is also the honest limit on it. It is built for the way one operator works, and the open-source core is how that assumption gets tested against everyone else's.",
        ],
      },
    ],
  },

  "zero-to-ship": {
    lede: "Working sessions, guides, and agent-system setup for PMs, analysts, and BI engineers who want to ship with AI coding tools. It started as a sixteen-module course. It is now a services practice, and the pivot is the more interesting story.",
    facts: [
      { term: "Status", value: "Live — usable today" },
      { term: "Formerly", value: "Zero to Ship" },
      { term: "Was", value: "A gamified sixteen-module course" },
      { term: "Development", value: "On hold" },
    ],
    sections: [
      {
        label: "The pivot",
        title: "The course was the wrong shape for the problem.",
        body: [
          "The original product was a sixteen-module gamified course teaching an AI-native shipping method. It was built, it was coherent, and it answered a question the audience was not asking.",
          "People who already know how to think about product did not need sixteen modules. They needed someone to sit with them for two hours and get the agent system actually running against their own repository — and then leave them with something that kept working on Monday.",
          "So the course became the artifact and the working session became the product. Saying this plainly costs nothing and explains more than a launch post would: the pivot is the evidence that the method is real, because a method that never contradicts you is not being tested.",
        ],
      },
      {
        label: "What it is now",
        title: "Sessions, guides, and agent-system setup.",
        body: [
          "Working sessions are hands-on and specific to the participant's own codebase. Guides cover the parts that generalize — repository conventions, spec structure, review agents, what to validate on commit.",
          "Agent-system setup is the piece people most often cannot do alone: standing up reviewer roles, decision logs, and the validation that makes an AI-assisted repository trustworthy rather than merely fast.",
        ],
      },
      {
        label: "Who it's for",
        title: "PMs, analysts, and BI engineers who want to ship.",
        body: [
          "The audience is people who are fluent in the problem domain and slow at the shipping — not engineers looking for another framework. The measure of success is whether they ship something real afterward without help.",
        ],
      },
      {
        label: "Where it stands",
        title: "Usable today. Active development is on hold.",
        body: [
          "The site is live and the services are real. Feature work is paused while attention sits elsewhere in the portfolio, and the status says so rather than implying momentum that is not there.",
        ],
      },
    ],
  },
};
