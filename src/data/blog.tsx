import { ReactNode } from "react";

/* ────────────────────────────────────────────────
   CMS-READY SCHEMA
   Every field maps directly to a CMS content type.
   When you wire a real CMS (Contentful / Sanity / 
   Strapi / Ghost) just swap the static array with
   an API call — the page components are unchanged.
──────────────────────────────────────────────────*/

export type PostStatus = "published" | "draft" | "scheduled";

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarColor: string; // tailwind bg class
}

export interface OGMeta {
  title: string;
  description: string;
  image: string; // placeholder URL — swap with real CDN
  type: "article" | "website";
  twitterCard: "summary_large_image" | "summary";
}

export interface BlogPost {
  id: string;
  slug: string;
  status: PostStatus;

  /* Content */
  title: string;
  excerpt: string;
  body: string; // HTML / Markdown string — rendered as-is

  /* Taxonomy */
  category: string;        // primary category slug
  categoryLabel: string;
  tags: string[];

  /* Media */
  coverColor: string;      // gradient stop 1 (hex) for placeholder
  coverColor2: string;     // gradient stop 2 (hex)
  coverIcon: ReactNode;    // SVG icon element used in placeholder

  /* Meta */
  author: Author;
  publishedAt: string;     // ISO 8601
  readingTimeMin: number;
  featured: boolean;
  industry?: string;

  /* OG */
  og: OGMeta;
}

/* ── Authors ── */
const authors: Record<string, Author> = {
  sarah: { id: "sarah", name: "Sarah Mitchell", role: "Head of Growth", avatarInitials: "SM", avatarColor: "bg-purple-600" },
  james: { id: "james", name: "James Okoro", role: "Product Manager", avatarInitials: "JO", avatarColor: "bg-blue-600" },
  priya: { id: "priya", name: "Priya Kapoor", role: "AI Research Lead", avatarInitials: "PK", avatarColor: "bg-pink-600" },
  alex:  { id: "alex",  name: "Alex Johansson", role: "Solutions Engineer", avatarInitials: "AJ", avatarColor: "bg-green-600" },
  maria: { id: "maria", name: "Maria Reyes", role: "Customer Success", avatarInitials: "MR", avatarColor: "bg-orange-600" },
};

/* ── Category registry — single source of truth ── */
export const CATEGORIES = [
  { slug: "product-updates",  label: "Product Updates",  color: "text-brand-400",   bg: "bg-brand-600/15",   border: "border-brand-600/25",   accentRaw: "99,102,241"  },
  { slug: "growth-strategy",  label: "Growth Strategy",  color: "text-green-400",   bg: "bg-green-600/15",   border: "border-green-600/25",   accentRaw: "34,197,94"   },
  { slug: "ai-automation",    label: "AI & Automation",  color: "text-purple-400",  bg: "bg-purple-600/15",  border: "border-purple-600/25",  accentRaw: "147,51,234"  },
  { slug: "case-studies",     label: "Case Studies",     color: "text-amber-400",   bg: "bg-amber-600/15",   border: "border-amber-600/25",   accentRaw: "245,158,11"  },
  { slug: "industry-insights",label: "Industry Insights",color: "text-cyan-400",    bg: "bg-cyan-600/15",    border: "border-cyan-600/25",    accentRaw: "6,182,212"   },
  { slug: "developer",        label: "Developer",        color: "text-pink-400",    bg: "bg-pink-600/15",    border: "border-pink-600/25",    accentRaw: "236,72,153"  },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];

export function getCategoryMeta(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

/* ── Posts ── */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "001",
    slug: "ai-agent-v2-launch",
    status: "published",
    title: "AI Agent 2.0: Fully Autonomous Customer Conversations",
    excerpt: "Our biggest AI release yet. AI Agent 2.0 can now handle end-to-end customer journeys — from first touch to payment confirmation — without human intervention.",
    body: `<p>Today we&#39;re launching AI Agent 2.0, a complete ground-up rebuild of our autonomous conversation engine...</p>`,
    category: "product-updates",
    categoryLabel: "Product Updates",
    tags: ["AI", "Agent", "Automation", "WhatsApp"],
    coverColor: "#4f46e5",
    coverColor2: "#7c3aed",
    coverIcon: null,
    author: authors.james,
    publishedAt: "2026-04-01T09:00:00Z",
    readingTimeMin: 6,
    featured: true,
    og: {
      title: "AI Agent 2.0: Fully Autonomous Customer Conversations — AxoDesk Blog",
      description: "Our biggest AI release yet. AI Agent 2.0 handles end-to-end customer journeys without human intervention.",
      image: "https://placehold.co/1200x630/4f46e5/ffffff?text=AI+Agent+2.0",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "002",
    slug: "whatsapp-cart-recovery-playbook",
    status: "published",
    title: "The WhatsApp Cart Recovery Playbook: 3× Your Revenue",
    excerpt: "Abandoned carts cost e-commerce brands billions every year. Here&#39;s the exact WhatsApp sequence used by top brands to recover 30%+ of lost revenue.",
    body: `<p>Cart abandonment remains one of the highest-ROI problems in e-commerce...</p>`,
    category: "growth-strategy",
    categoryLabel: "Growth Strategy",
    tags: ["WhatsApp", "E-commerce", "Cart Recovery", "Revenue"],
    coverColor: "#16a34a",
    coverColor2: "#059669",
    coverIcon: null,
    author: authors.sarah,
    publishedAt: "2026-03-28T09:00:00Z",
    readingTimeMin: 9,
    featured: true,
    og: {
      title: "WhatsApp Cart Recovery Playbook: 3× Revenue — AxoDesk Blog",
      description: "The exact WhatsApp sequence top brands use to recover 30%+ of abandoned cart revenue.",
      image: "https://placehold.co/1200x630/16a34a/ffffff?text=Cart+Recovery+Playbook",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "003",
    slug: "when-to-use-ai-vs-automation",
    status: "published",
    title: "AI vs Rules-Based Automation: How to Choose the Right Tool",
    excerpt: "Not every workflow needs AI, and not every workflow can be solved with rules. Here&#39;s the definitive decision framework used by 500+ AxoDesk teams.",
    body: `<p>One of the most common questions we get from customers is: should I use AI Agent or build a workflow?...</p>`,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    tags: ["AI", "Automation", "Workflow", "Decision Framework"],
    coverColor: "#7c3aed",
    coverColor2: "#9333ea",
    coverIcon: null,
    author: authors.priya,
    publishedAt: "2026-03-22T09:00:00Z",
    readingTimeMin: 7,
    featured: false,
    og: {
      title: "AI vs Rules-Based Automation: How to Choose — AxoDesk Blog",
      description: "The definitive decision framework for when to use AI Agent vs workflow automation.",
      image: "https://placehold.co/1200x630/7c3aed/ffffff?text=AI+vs+Automation",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "004",
    slug: "bolt-4x-leads-case-study",
    status: "published",
    title: "How Bolt Scaled Lead Generation 4× With WhatsApp Automation",
    excerpt: "Bolt&#39;s sales team was drowning in unqualified leads from Facebook ads. Within 90 days of deploying AxoDesk, they quadrupled qualified pipeline.",
    body: `<p>Bolt, a leading mobility platform across 40+ markets, was struggling to qualify leads from Meta ad campaigns at scale...</p>`,
    category: "case-studies",
    categoryLabel: "Case Studies",
    tags: ["Case Study", "Lead Generation", "Facebook Ads", "WhatsApp"],
    coverColor: "#d97706",
    coverColor2: "#ea580c",
    coverIcon: null,
    author: authors.maria,
    publishedAt: "2026-03-18T09:00:00Z",
    readingTimeMin: 5,
    featured: true,
    industry: "mobility",
    og: {
      title: "How Bolt Got 4× More Leads With AxoDesk — Case Study",
      description: "How Bolt scaled qualified pipeline 4× in 90 days using WhatsApp automation and AI qualification.",
      image: "https://placehold.co/1200x630/d97706/ffffff?text=Bolt+Case+Study",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "005",
    slug: "whatsapp-calling-api-launch",
    status: "published",
    title: "WhatsApp Business Calling API Is Now Available in AxoDesk",
    excerpt: "Voice calls, messages, and emails — all in a single thread. AxoDesk now natively supports the WhatsApp Business Calling API for all Growth+ plans.",
    body: `<p>The WhatsApp Business Calling API has been one of our most-requested features...</p>`,
    category: "product-updates",
    categoryLabel: "Product Updates",
    tags: ["WhatsApp", "Calling", "API", "Product"],
    coverColor: "#4f46e5",
    coverColor2: "#06b6d4",
    coverIcon: null,
    author: authors.james,
    publishedAt: "2026-03-10T09:00:00Z",
    readingTimeMin: 4,
    featured: false,
    og: {
      title: "WhatsApp Business Calling API Now in AxoDesk",
      description: "Voice, messages and email in one thread. WhatsApp Calling API available for Growth+ plans.",
      image: "https://placehold.co/1200x630/4f46e5/ffffff?text=Calling+API+Launch",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "006",
    slug: "real-estate-lead-nurturing",
    status: "published",
    title: "Real Estate Lead Nurturing on WhatsApp: The Complete Guide",
    excerpt: "Real estate leads have a notoriously long buying cycle. This guide covers the full nurturing sequence from first inquiry to signed contract.",
    body: `<p>Real estate agents who respond to inquiries within 5 minutes are 9× more likely to convert...</p>`,
    category: "industry-insights",
    categoryLabel: "Industry Insights",
    tags: ["Real Estate", "Lead Nurturing", "WhatsApp", "Sales"],
    coverColor: "#0891b2",
    coverColor2: "#0e7490",
    coverIcon: null,
    author: authors.sarah,
    publishedAt: "2026-03-05T09:00:00Z",
    readingTimeMin: 11,
    featured: false,
    industry: "real-estate",
    og: {
      title: "Real Estate Lead Nurturing on WhatsApp: Complete Guide — AxoDesk",
      description: "Full nurturing sequence from first inquiry to signed contract for real estate teams.",
      image: "https://placehold.co/1200x630/0891b2/ffffff?text=Real+Estate+Guide",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "007",
    slug: "building-webhooks-axodesk-api",
    status: "published",
    title: "Building Real-Time Event Pipelines With the AxoDesk Webhook API",
    excerpt: "A practical walkthrough for developers: setting up webhooks, verifying signatures, handling retries, and building reliable event-driven integrations.",
    body: `<p>Webhooks are the backbone of real-time integrations. Here&#39;s everything you need to build production-grade pipelines...</p>`,
    category: "developer",
    categoryLabel: "Developer",
    tags: ["API", "Webhooks", "Developer", "Integration"],
    coverColor: "#db2777",
    coverColor2: "#9333ea",
    coverIcon: null,
    author: authors.alex,
    publishedAt: "2026-02-28T09:00:00Z",
    readingTimeMin: 12,
    featured: false,
    og: {
      title: "Building Real-Time Pipelines With AxoDesk Webhooks — Dev Blog",
      description: "Practical walkthrough: set up webhooks, verify signatures, handle retries, and build production-grade integrations.",
      image: "https://placehold.co/1200x630/db2777/ffffff?text=Webhook+Guide",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "008",
    slug: "reducing-support-costs-ai",
    status: "published",
    title: "How to Cut Customer Support Costs by 40% With AI",
    excerpt: "AI-powered triage, intelligent routing and automated resolution can dramatically reduce your cost-per-ticket — without sacrificing CSAT scores.",
    body: `<p>Support is often the biggest operational cost for fast-growing B2C companies...</p>`,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    tags: ["AI", "Support", "Cost Reduction", "CSAT"],
    coverColor: "#7c3aed",
    coverColor2: "#4f46e5",
    coverIcon: null,
    author: authors.priya,
    publishedAt: "2026-02-20T09:00:00Z",
    readingTimeMin: 8,
    featured: false,
    og: {
      title: "Cut Customer Support Costs 40% With AI — AxoDesk Blog",
      description: "AI triage, routing and auto-resolution reduce cost-per-ticket without hurting CSAT.",
      image: "https://placehold.co/1200x630/7c3aed/ffffff?text=AI+Support+Cost",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "009",
    slug: "black-friday-messaging-strategy",
    status: "published",
    title: "The Black Friday WhatsApp Strategy That Drove $2M in 48 Hours",
    excerpt: "One AxoDesk customer sent 4 precisely timed WhatsApp broadcast campaigns over Black Friday weekend and generated $2M in direct-attributable revenue.",
    body: `<p>Black Friday is the Super Bowl of e-commerce. Here&#39;s how one brand used AxoDesk to make it their biggest day ever...</p>`,
    category: "growth-strategy",
    categoryLabel: "Growth Strategy",
    tags: ["Black Friday", "Broadcast", "E-commerce", "WhatsApp"],
    coverColor: "#16a34a",
    coverColor2: "#4f46e5",
    coverIcon: null,
    author: authors.sarah,
    publishedAt: "2026-02-12T09:00:00Z",
    readingTimeMin: 10,
    featured: false,
    og: {
      title: "Black Friday WhatsApp Strategy That Drove $2M in 48 Hours",
      description: "4 timed WhatsApp campaigns, $2M in 48 hours. The exact playbook broken down.",
      image: "https://placehold.co/1200x630/16a34a/ffffff?text=Black+Friday+Strategy",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "010",
    slug: "decathlon-scaling-support",
    status: "published",
    title: "Decathlon: Scaling a Global Support Team With AxoDesk AI",
    excerpt: "Decathlon wanted to maintain 24/7 support quality across 8 countries without doubling headcount. Here&#39;s how AI made that possible.",
    body: `<p>Decathlon operates in 60+ countries with 100,000+ employees and a huge e-commerce footprint...</p>`,
    category: "case-studies",
    categoryLabel: "Case Studies",
    tags: ["Case Study", "Support", "Global", "Retail"],
    coverColor: "#d97706",
    coverColor2: "#dc2626",
    coverIcon: null,
    author: authors.maria,
    publishedAt: "2026-02-05T09:00:00Z",
    readingTimeMin: 6,
    featured: false,
    industry: "retail",
    og: {
      title: "Decathlon: Scaling Global Support With AI — AxoDesk Case Study",
      description: "24/7 support quality across 8 countries without doubling headcount.",
      image: "https://placehold.co/1200x630/d97706/ffffff?text=Decathlon+Case+Study",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "011",
    slug: "sentiment-analysis-use-cases",
    status: "published",
    title: "5 Powerful Sentiment Analysis Use Cases for Customer Messaging",
    excerpt: "Knowing how customers feel in real time changes everything — from routing priority to win-back campaigns. Here are 5 high-ROI use cases with setup guides.",
    body: `<p>Sentiment analysis is one of the most underused signals in customer messaging...</p>`,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    tags: ["Sentiment Analysis", "AI", "NLP", "CX"],
    coverColor: "#9333ea",
    coverColor2: "#db2777",
    coverIcon: null,
    author: authors.priya,
    publishedAt: "2026-01-30T09:00:00Z",
    readingTimeMin: 7,
    featured: false,
    og: {
      title: "5 Sentiment Analysis Use Cases for Customer Messaging",
      description: "High-ROI use cases and setup guides for using sentiment signals in messaging workflows.",
      image: "https://placehold.co/1200x630/9333ea/ffffff?text=Sentiment+Analysis",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
  {
    id: "012",
    slug: "healthcare-patient-reminders",
    status: "published",
    title: "Reducing No-Shows 40% With WhatsApp Appointment Reminders",
    excerpt: "Healthcare providers lose thousands per week to no-shows. Automated WhatsApp reminders with 1-tap confirm/reschedule changed the game for HealthFirst.",
    body: `<p>Patient no-shows are a silent revenue killer for clinics and hospitals...</p>`,
    category: "industry-insights",
    categoryLabel: "Industry Insights",
    tags: ["Healthcare", "Appointments", "WhatsApp", "Automation"],
    coverColor: "#0891b2",
    coverColor2: "#16a34a",
    coverIcon: null,
    author: authors.alex,
    publishedAt: "2026-01-22T09:00:00Z",
    readingTimeMin: 8,
    featured: false,
    industry: "healthcare",
    og: {
      title: "Reduce No-Shows 40% With WhatsApp Appointment Reminders",
      description: "How HealthFirst slashed no-shows with automated WhatsApp reminders and 1-tap confirmations.",
      image: "https://placehold.co/1200x630/0891b2/ffffff?text=Healthcare+Reminders",
      type: "article",
      twitterCard: "summary_large_image",
    },
  },
];

/* ── Derived helpers ── */
export const PUBLISHED_POSTS = BLOG_POSTS.filter((p) => p.status === "published");

export const ALL_TAGS = Array.from(
  new Set(BLOG_POSTS.flatMap((p) => p.tags))
).sort();

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
