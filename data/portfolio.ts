// All site content lives here. Edit this file to change copy; components only render it.

export type Stage = { name: string; built: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  stack: string[];
  impact: string[];
  hardest: { title: string; body: string };
  diagram: string;
  status?: string;
};

export type Job = {
  title: string;
  company: string;
  place: string;
  period: string;
  points: string[];
};

export const profile = {
  name: "Sahil Jariwala",
  role: "Senior Software Engineer & Tech Lead",
  focus: "AI platform and backend",
  location: "Surat, Gujarat, India",
  email: "sahiljariwala6@gmail.com",
  github: "https://github.com/sahiljsy",
  linkedin: "https://www.linkedin.com/in/sahil-jariwala-a909a71b8/",
  siteUrl: "https://sahiljariwala.vercel.app",
  intro:
    "I build the systems behind AI products: the pipelines that pull in ad and commerce data, the agents that reason over it, and the interface people work in.",
  about: [
    "For the last two and a half years I've helped build Strique, an AI marketing platform, from the ground up. I'm one of the people who make backend and architecture decisions for the product team, and I've shipped in Python, Java, Go and TypeScript across the whole stack.",
    "My recent work is AI agent infrastructure: multi-agent orchestration, context management that survives long conversations, long-term memory, sandboxed code execution, and routing across nine LLM providers. Before that I built the Java data platform and batch pipelines that feed it.",
    "I care about measuring before tuning, about systems that fail safely, and about leaving conventions behind that the rest of the team can build on.",
  ],
  lookingFor:
    "Tech Lead, Lead Engineer, or Senior Backend / AI Platform roles, especially at early-stage AI companies.",
};

export const facts: { value: string; label: string }[] = [
  { value: "~1,900", label: "commits across 7 production codebases" },
  { value: "61", label: "LLMs routed across 9 providers" },
  { value: "4", label: "languages shipped to production" },
  { value: "~15", label: "ad and commerce platform connectors" },
];

export const signalPath: Stage[] = [
  {
    name: "Data",
    built: ["Google Ads, GA4, Meta, Amazon, TikTok", "Shopify and Fynd webhooks", "Merchant Center and Meta Catalog"],
  },
  {
    name: "Pipelines",
    built: ["35+ Spring Batch processors", "Go customer data platform", "SQL filter and rule engines"],
  },
  {
    name: "Agents",
    built: ["Multi-agent orchestration", "Context gate and compaction", "Memory, sandbox, 61 models"],
  },
  {
    name: "Interface",
    built: ["Streaming chat with approvals", "Task plans with live progress", "File library and automations"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-agent-marketing-assistant",
    title: "Multi-agent AI marketing assistant",
    summary:
      "The agent backend behind Strique's AI assistant: specialist agents for Meta Ads, Google Ads and creative work, streamed live to the browser.",
    period: "Sep 2025 – present",
    role: "Primary author of the core agent runtime; #2 contributor (464 commits)",
    stack: ["Python", "FastAPI", "OpenAI Agents SDK", "LiteLLM", "PostgreSQL", "Redis", "Kubernetes"],
    impact: [
      "Wrote about 70% of the core agent runtime that every agent builds on: streaming, tool execution, event handling and persistence.",
      "Created the model registry that routes 61 models across 9 LLM providers per agent, removing lock-in to a single vendor.",
      "Built the orchestration layer that hands requests to specialist sub-agents, with human-in-the-loop approvals and a guard against runaway dispatch loops.",
      "Designed layered context compaction and a per-call context gate, so long conversations stay within budget and interrupted plans resume.",
      "Shipped long-term memory (Mem0, then Honcho), sandboxed code execution, script-first automations, and a plug-and-play system for skills, tools and model settings.",
    ],
    hardest: {
      title: "One streaming interface over three providers",
      body: "OpenAI, Anthropic and Gemini each stream reasoning and tool calls differently, and the SDK stamps placeholder IDs that collided as database keys. I normalised IDs at the edge, coerced tool output shapes, and kept one provider-neutral system prompt so every provider can cache it.",
    },
    diagram: `flowchart LR
  U["User message"] --> O["Orchestrator agent"]
  O -->|"hand-off"| M["Meta Ads agent"]
  O -->|"hand-off"| G["Google Ads agent"]
  O -->|"hand-off"| C["Creative agent"]
  O --> CG["Context gate"]
  CG --> R["Model registry (61 models)"]
  O --> MEM["Long-term memory"]
  O --> SB["Code sandbox"]
  O -->|"SSE stream"| UI["Chat UI"]`,
  },
  {
    slug: "ai-marketing-workspace",
    title: "AI marketing workspace (web app)",
    summary:
      "The customer-facing Next.js app: streaming AI chat, dashboards, automations, a shared file library and ad-platform integrations.",
    period: "Jun 2024 – present",
    role: "Core contributor (338 commits)",
    stack: ["Next.js 15", "React 19", "TypeScript", "Vercel AI SDK", "Zustand", "TanStack Query"],
    impact: [
      "Built the typed client layer between the web app and the Java backend, and moved legacy API routes to server actions.",
      "Shipped 6+ integrations end to end: Google Ads, Google Analytics, Meta Ads, Amazon Ads, Amazon Seller, Shopify and TikTok.",
      "Built the chat's task-planning view with live tool progress, human-in-the-loop approval panels, context-compaction UI, scheduled automations and the file library.",
      "Delivered a widget validation rewrite as 5 dependency-ordered pull requests, each small enough to review on its own.",
    ],
    hardest: {
      title: "State leaking between conversations",
      body: "With several chat streams running at once, one conversation's state could bleed into another. I traced it to shared streaming state and isolated it per conversation.",
    },
    diagram: `flowchart LR
  B["Browser"] --> N["Next.js server actions"]
  N --> J["Java data APIs"]
  N --> A["AI agent server"]
  A -->|"SSE"| B
  B --> L["File library (R2)"]`,
  },
  {
    slug: "marketing-data-platform",
    title: "Marketing data platform",
    summary:
      "The Java service that stores ad and commerce data and answers every dashboard widget, plus the product catalog and feed pipeline.",
    period: "May 2024 – Dec 2025",
    role: "#2 contributor (602 commits, 23% of history)",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Protobuf", "Testcontainers"],
    impact: [
      "Built a filter engine from scratch that compiles a protobuf expression tree into parameterised SQL, with escaping, type coercion and per-platform quirks. Every dashboard widget uses it.",
      "Designed an automated catalog rule engine: priority-ordered conditions compiled to dynamic SQL and applied per feed destination.",
      "Built the catalog and feed pipeline: products, collections, variants, XML feeds, feed-quality checks and an audit trail.",
      "Built blended lead-gen analytics across Google Ads, Meta, GA4 and TikTok.",
    ],
    hardest: {
      title: "A key migration under live ingestion",
      body: "I moved about 30 live ad and commerce tables to new composite keys while data kept syncing, without stopping ingestion.",
    },
    diagram: `flowchart LR
  P["Ad and commerce APIs"] --> I["Ingestion"]
  I --> DB[("PostgreSQL")]
  W["Dashboard widget"] --> F["Filter engine"]
  F -->|"parameterised SQL"| DB
  DB --> R["Rule engine"] --> X["XML product feeds"]`,
  },
  {
    slug: "customer-data-platform",
    title: "Customer data platform in Go",
    summary:
      "A new Go service that ingests commerce data from any connector, normalises it, and serves catalog and feed APIs.",
    period: "Sep 2026 – present",
    role: "#1 contributor; set up the architecture and plan the build",
    stack: ["Go", "Huma v2", "GORM", "PostgreSQL", "ClickHouse", "Pub/Sub", "Temporal"],
    status: "In progress",
    impact: [
      "Set up the service architecture (ingest, core, worker, pipeline) with a code-first OpenAPI layer, structured logging and health checks. The rest of the team builds on it.",
      "Leading the port of the product catalog from Java: 29 data models with a schema that fits any connector, typed attributes plus the raw payload.",
      "Decide the build order and who owns each part, and wrote the plan that splits the port across the team.",
      "Built the event-driven handler for Fynd marketplace webhooks.",
    ],
    hardest: {
      title: "A contract that changes as fast as the code",
      body: "A shared proto repo meant a release for every field. I chose code-first OpenAPI so the contract ships in the same pull request as the handler, and made webhook replays safe with UUIDv7 IDs and upserts on natural keys.",
    },
    diagram: `flowchart LR
  S["Shopify / Fynd webhooks"] --> IN["Ingest"]
  IN --> PS["Pub/Sub"]
  PS --> WK["Worker"]
  WK --> PG[("PostgreSQL")]
  WK --> CH[("ClickHouse")]
  PG --> CO["Core APIs (OpenAPI)"]`,
  },
  {
    slug: "shared-platform-library",
    title: "Shared platform library",
    summary:
      "A Java library other services depend on for notifications, branded reports, storage and short links.",
    period: "Oct 2024 – Jun 2025",
    role: "Set up the project; #1 contributor (185 of ~350 commits)",
    stack: ["Java 21", "Spring Boot", "Apache POI", "Testcontainers"],
    impact: [
      "Set up the library, its versioned releases to GitHub Packages and its CI release workflow.",
      "Designed one sending interface for email, Slack, WhatsApp and SMS, with scheduled delivery and retries.",
      "Built the branded PowerPoint report generator: about 15 templates across 5 themes, rendering live analytics and AI summaries into client-ready decks.",
    ],
    hardest: {
      title: "Office XML that doesn't break",
      body: "Dynamic tables and charts had to merge into fixed slide templates across five themes without corrupting the file.",
    },
    diagram: `flowchart LR
  SVC["Other services"] --> SS["Send service"]
  SS --> E["Email"]
  SS --> SL["Slack"]
  SS --> WA["WhatsApp"]
  SS --> SM["SMS"]
  SVC --> RP["Report generator"] --> PPT["Branded decks"]`,
  },
  {
    slug: "batch-etl-and-reporting",
    title: "Batch ETL and scheduled reporting",
    summary:
      "Spring Batch pipelines that pull data from ad, analytics and commerce platforms, plus scheduled report delivery.",
    period: "Aug 2024 – Nov 2025",
    role: "#3 contributor (245 commits)",
    stack: ["Java 21", "Spring Batch", "PostgreSQL"],
    impact: [
      "Built or maintained 35+ batch processors for Google Ads, GA4 (10+ report types), Amazon Ads and Seller, Meta Ads and TikTok.",
      "Built a catalog sync and delete pipeline that reconciles product status across Shopify, Meta Catalog and Google Merchant Center.",
      "Moved about 15 scheduled analytics jobs to production one at a time across about 35 small pull requests.",
    ],
    hardest: {
      title: "Three catalogs, three meanings of deleted",
      body: "Shopify, Meta and Merchant Center each report product status and deletion differently. I mapped them into one pipeline with a single status model.",
    },
    diagram: `flowchart LR
  SCH["Scheduler"] --> JB["Spring Batch jobs"]
  JB --> GA["Google Ads / GA4"]
  JB --> AM["Amazon"]
  JB --> MT["Meta / TikTok"]
  JB --> DB[("PostgreSQL")]
  DB --> REP["Scheduled reports"]`,
  },
];

export const leadership: string[] = [
  "Review the team's pull requests. Across our codebases I've merged about 225, roughly 130 of them from teammates.",
  "Mentor 3–4 developers: help them get unblocked, talk through designs, and review their work.",
  "Plan the customer data platform: decide which features ship first and when, and who owns each part.",
  "Leave conventions the team builds on: code-first API contracts, connector-agnostic schemas, safe-to-replay writes.",
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI and agents",
    items: ["OpenAI Agents SDK", "LiteLLM", "Multi-agent orchestration", "Context management", "Mem0, Honcho", "MCP", "E2B sandboxes", "SSE streaming"],
  },
  { group: "Backend", items: ["Python, FastAPI", "Java 21, Spring Boot, Spring Batch", "Go, Huma, GORM", "Protobuf", "REST, OpenAPI"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query", "Vercel AI SDK"] },
  {
    group: "Data and infrastructure",
    items: ["PostgreSQL", "ClickHouse", "Redis", "Pub/Sub", "Temporal", "GCS, Cloudflare R2", "Docker, Kubernetes", "GitHub Actions"],
  },
  { group: "Earlier", items: ["SQL Server", "SSIS", "C#", "VB.NET"] },
];

export const experience: Job[] = [
  {
    title: "Software Engineer",
    company: "Strique",
    place: "Mumbai",
    period: "May 2024 – present",
    points: [
      "Helped build the AI marketing platform from the ground up. One of the core people making backend and architecture decisions.",
      "Moved across the stack as the product grew: Java data platform and ETL, then frontend integrations, then AI agents, now the Go customer data platform.",
      "The platform has served about 12–15 enterprise clients, and 100+ while it was free.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "HHAeXchange",
    place: "Ahmedabad",
    period: "Dec 2022 – Feb 2024",
    points: [
      "Data processing and integration work in SQL Server and SSIS, with C# and VB.NET components.",
      "Optimised legacy code, built new interfaces for a new-market project and contributed to an automation project.",
      "Excellence Award, Q3 2023.",
    ],
  },
  {
    title: "B.Tech, Computer Engineering",
    company: "Dharmsinh Desai University",
    place: "Nadiad",
    period: "2019 – 2023",
    points: ["CPI 9.31."],
  },
];

export const achievements: string[] = [
  "Excellence Award, HHAeXchange (Q3 2023)",
  "CodeChef 3-star; global rank 88 in the June Long Challenge 2021",
  "350+ problems solved on LeetCode",
  "HackerRank SQL (Basic) and AWS Cloud Foundations certifications",
];

export const earlierProjects: { title: string; year: string; description: string; tags: string[]; url: string }[] = [
  {
    title: "Face-recognition attendance",
    year: "2022",
    description: "A Django app that marks attendance from a live camera using Dlib and OpenCV, with daily and monthly reports.",
    tags: ["Python", "Django", "OpenCV"],
    url: "https://github.com/sahiljsy/Attendance-using-Real-time-face-recognition",
  },
  {
    title: "Student portal",
    year: "2021",
    description: "A MERN virtual classroom with assignments, notices and email notifications.",
    tags: ["React", "Node.js", "MongoDB"],
    url: "https://github.com/sahiljsy/student_portal",
  },
  {
    title: "Online bus booking",
    year: "2021",
    description: "A Django ticket booking system with an admin panel.",
    tags: ["Python", "Django"],
    url: "https://github.com/sahiljsy/online_bus_booking",
  },
  {
    title: "Online exam preparation",
    year: "2021",
    description: "An ASP.NET Core MVC app for quizzes and question papers with admin and user roles.",
    tags: ["C#", "ASP.NET Core"],
    url: "https://github.com/sahiljsy/OnlineExamPrepration_DONNET_CORE",
  },
  {
    title: "World of Memory",
    year: "2022",
    description: "A memory-sharing social app on a WCF service layer.",
    tags: ["C#", "WCF"],
    url: "https://github.com/sahiljsy/WorldOfMemory",
  },
  {
    title: "WhatsApp clone",
    year: "2023",
    description: "A React chat interface with login and contact conversations.",
    tags: ["React"],
    url: "https://github.com/sahiljsy/WhatsAppClone",
  },
];
