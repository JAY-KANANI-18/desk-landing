import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  BookOpen, HelpCircle, Code2, Video,
  FileText, Users, Star, ArrowRight,
  ChevronRight, Sparkles, Rss, Clock,
  Search, Tag, TrendingUp, Book
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";

/* ── Resource sections config ── */
const sections = [
  {
    id: "docs",
    slug: "docs",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Documentation",
    desc: "Full platform & API reference",
    color: "text-blue-400",
    bg: "bg-blue-600/15",
    border: "border-blue-600/25",
    accentRaw: "59,130,246",
    heroTitle: "Platform Documentation",
    heroSub: "Everything you need to set up, integrate, and master AxoDesk — from channel setup to full API docs.",
    categories: [
      {
        title: "Getting Started",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["Quick Start Guide", "Connect Your First Channel", "Invite Your Team", "Set Up Your First Automation", "Understanding the Inbox"],
      },
      {
        title: "Channel Integrations",
        icon: <Tag className="w-4 h-4" />,
        articles: ["WhatsApp Business API", "Instagram DM Integration", "Facebook Messenger Setup", "Email (Gmail & Outlook)", "Telegram Bot Setup"],
      },
      {
        title: "Automation & Workflows",
        icon: <TrendingUp className="w-4 h-4" />,
        articles: ["Workflow Builder Overview", "Trigger Types", "Condition Logic", "Action Library", "Workflow Templates"],
      },
      {
        title: "API Reference",
        icon: <Code2 className="w-4 h-4" />,
        articles: ["REST API Overview", "Authentication", "Messages API", "Contacts API", "Webhooks Reference"],
      },
    ],
  },
  {
    id: "help",
    slug: "help",
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Help Center",
    desc: "Guides, FAQs & step-by-step tutorials",
    color: "text-green-400",
    bg: "bg-green-600/15",
    border: "border-green-600/25",
    accentRaw: "34,197,94",
    heroTitle: "Help Center",
    heroSub: "Self-serve answers, step-by-step guides, and video walkthroughs for every part of AxoDesk.",
    categories: [
      {
        title: "Account & Billing",
        icon: <Tag className="w-4 h-4" />,
        articles: ["Manage Your Subscription", "Upgrade or Downgrade Plan", "Invoice & Payment History", "Cancel Subscription", "Team Seat Management"],
      },
      {
        title: "Inbox & Conversations",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["How to Assign Conversations", "Using Internal Notes", "Add Tags & Labels", "Search & Filter Messages", "Bulk Actions"],
      },
      {
        title: "Contacts & CRM",
        icon: <Users className="w-4 h-4" />,
        articles: ["Import Contacts via CSV", "Manage Custom Fields", "Contact Lifecycle Stages", "Merge Duplicate Contacts", "Export Contact Data"],
      },
      {
        title: "Troubleshooting",
        icon: <HelpCircle className="w-4 h-4" />,
        articles: ["WhatsApp Not Connected", "Messages Not Delivering", "Agent Can&#39;t Log In", "Automation Not Triggering", "Report Inaccuracies"],
      },
    ],
  },
  {
    id: "api",
    slug: "api",
    icon: <Code2 className="w-5 h-5" />,
    label: "API Reference",
    desc: "REST API, webhooks & developer tools",
    color: "text-purple-400",
    bg: "bg-purple-600/15",
    border: "border-purple-600/25",
    accentRaw: "147,51,234",
    heroTitle: "Developer API Reference",
    heroSub: "A first-class REST API with webhooks, SDKs, and code samples in multiple languages.",
    categories: [
      {
        title: "Authentication",
        icon: <Tag className="w-4 h-4" />,
        articles: ["API Keys & Tokens", "OAuth 2.0 Flow", "Rate Limiting", "Error Codes", "Sandbox Environment"],
      },
      {
        title: "Messages",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["Send a Message", "Message Templates", "Media Attachments", "Bulk Messaging", "Message Status Webhooks"],
      },
      {
        title: "Contacts",
        icon: <Users className="w-4 h-4" />,
        articles: ["Create a Contact", "Update Contact Fields", "List Contacts", "Search Contacts", "Delete a Contact"],
      },
      {
        title: "Webhooks",
        icon: <TrendingUp className="w-4 h-4" />,
        articles: ["Webhook Overview", "Register a Webhook", "Webhook Payload Structure", "Retry Logic", "Verify Signatures"],
      },
    ],
  },
  {
    id: "webinars",
    slug: "webinars",
    icon: <Video className="w-5 h-5" />,
    label: "Webinars",
    desc: "Live sessions & on-demand recordings",
    color: "text-pink-400",
    bg: "bg-pink-600/15",
    border: "border-pink-600/25",
    accentRaw: "236,72,153",
    heroTitle: "Webinars & Live Sessions",
    heroSub: "Join live product demos, deep-dive workshops, and watch on-demand recordings from past sessions.",
    categories: [
      {
        title: "Upcoming Live",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["Weekly Platform Demo — Tuesdays 2PM UTC", "WhatsApp API Deep Dive — Apr 15", "Automation Masterclass — Apr 22", "AI Features Tour — May 2", "Ask the Team — Every Friday"],
      },
      {
        title: "On-Demand Library",
        icon: <Clock className="w-4 h-4" />,
        articles: ["Getting Started in 30 Minutes", "Building Your First Automation", "Lead Capture From Meta Ads", "How to Train Your AI Agent", "Analytics Walkthrough"],
      },
      {
        title: "Industry Webinars",
        icon: <Tag className="w-4 h-4" />,
        articles: ["E-commerce: Cart Recovery Flows", "Real Estate: Lead Nurturing 101", "Healthcare: Patient Communication", "Education: Enrollment Automation", "Finance: Secure Client Comms"],
      },
      {
        title: "Partner & Developer",
        icon: <Code2 className="w-4 h-4" />,
        articles: ["API Integration Workshop", "Build a WA Chatbot in 1 Hour", "Zapier & n8n Automation", "Partner Onboarding Session", "White-label Platform Overview"],
      },
    ],
  },
  {
    id: "blog",
    slug: "blog",
    icon: <Rss className="w-5 h-5" />,
    label: "Blog",
    desc: "Thought leadership & product updates",
    color: "text-orange-400",
    bg: "bg-orange-600/15",
    border: "border-orange-600/25",
    accentRaw: "249,115,22",
    heroTitle: "AxoDesk Blog",
    heroSub: "Insights on conversational marketing, AI for support, and growth tactics for B2C teams.",
    categories: [
      {
        title: "Product Updates",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["AI Agent v2.0 — What&#39;s New", "WhatsApp Calling API Now Available", "New Analytics Dashboard Release", "Improved Automation Builder", "Mobile App v3 Launch"],
      },
      {
        title: "Growth Strategies",
        icon: <TrendingUp className="w-4 h-4" />,
        articles: ["How to 3× Leads from Meta Ads", "WhatsApp Cart Recovery Playbook", "Reducing Support Costs by 40%", "Real Estate Lead Conversion Guide", "Black Friday Messaging Strategy"],
      },
      {
        title: "AI & Automation",
        icon: <Code2 className="w-4 h-4" />,
        articles: ["The AI-Powered Inbox in 2024", "When to Use Automation vs AI", "Training Your Knowledge Base", "Sentiment Analysis Use Cases", "Chatbot vs Human Handoff"],
      },
      {
        title: "Case Studies",
        icon: <Tag className="w-4 h-4" />,
        articles: ["How Bolt Got 4× More Leads", "Decathlon: Scaling Support Teams", "TurboRent: 60% Faster Onboarding", "HealthFirst: Cutting No-Shows 40%", "FoodBox: WhatsApp Loyalty Program"],
      },
    ],
  },
  {
    id: "community",
    slug: "community",
    icon: <Users className="w-5 h-5" />,
    label: "Community",
    desc: "Join 2,000+ AxoDesk practitioners",
    color: "text-cyan-400",
    bg: "bg-cyan-600/15",
    border: "border-cyan-600/25",
    accentRaw: "6,182,212",
    heroTitle: "AxoDesk Community",
    heroSub: "A private Slack community of 2,000+ practitioners sharing automations, templates, and growth strategies.",
    categories: [
      {
        title: "Community Channels",
        icon: <Sparkles className="w-4 h-4" />,
        articles: ["#general-introductions", "#automation-templates", "#ask-anything", "#feature-requests", "#success-stories"],
      },
      {
        title: "Top Discussions",
        icon: <TrendingUp className="w-4 h-4" />,
        articles: ["Best WhatsApp lead capture strategies", "AI vs rules-based automation comparison", "Top team inbox configurations", "Webhook debugging tips", "Building a zero-manual-work inbox"],
      },
      {
        title: "Shared Templates",
        icon: <Tag className="w-4 h-4" />,
        articles: ["Cart Recovery Automation Template", "Appointment Reminder Flow", "Lead Qualification Bot", "CSAT Survey Workflow", "Re-engagement Campaign"],
      },
      {
        title: "Community Events",
        icon: <Users className="w-4 h-4" />,
        articles: ["Monthly Community Meetup", "Template Swaps (Bi-weekly)", "AMA with Founders", "Partner Spotlight Sessions", "Annual AxoDesk Summit"],
      },
    ],
  },
];

type Section = typeof sections[0];

/* ─── Article list card ─── */
function CategoryCard({ cat, accentRaw, textColor, bg, border, delay, inView }: {
  cat: Section["categories"][0];
  accentRaw: string; textColor: string; bg: string; border: string;
  delay: number; inView: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-2xl border ${border} transition-all duration-700 h-full`}
      style={{
        background: `radial-gradient(ellipse at top, rgba(${accentRaw},0.05) 0%, transparent 60%), #0a0f1e`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-7 h-7 rounded-lg ${bg} ${textColor} flex items-center justify-center`}>
          {cat.icon}
        </div>
        <h3 className="text-sm font-bold text-white">{cat.title}</h3>
      </div>
      <ul className="space-y-2">
        {cat.articles.map((article, i) => (
          <li key={i}>
            <a
              href="#"
              className={`flex items-center gap-2 text-xs text-slate-400 hover:${textColor} hover:text-white transition-colors group py-0.5`}
              dangerouslySetInnerHTML={{ __html: `<span class="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-current shrink-0 inline-block mr-1"></span>${article}` }}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-white/5">
        <a href="#" className={`text-xs font-semibold ${textColor} flex items-center gap-1 hover:gap-2 transition-all`}>
          Browse all <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ─── Section tab ─── */
function SectionTab({ sec, isActive, onClick }: { sec: Section; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all duration-200 group w-full ${
        isActive
          ? `${sec.bg} border ${sec.border}`
          : "border border-transparent hover:bg-white/5"
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isActive ? `${sec.bg} ${sec.color}` : "bg-white/5 text-slate-500"}`}>
        {sec.icon}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>{sec.label}</p>
        <p className={`text-[10px] transition-colors truncate ${isActive ? "text-slate-400" : "text-slate-600"}`}>{sec.desc}</p>
      </div>
    </button>
  );
}

export const ResourcesPage = () => {
  useSEO({
    title: "AxoDesk Resources — Docs, API Reference, Webinars & Blog",
    description: "Everything to master AxoDesk: full platform documentation, REST API reference, on-demand webinars, blog insights, and a 2,000+ member community. All free to access.",
    canonical: "https://axodesk.in/resources",
    ogImage: "https://axodesk.in/og-resources.png",
    keywords: "axodesk documentation, WhatsApp API reference, omnichannel support guides, customer messaging tutorials, axodesk blog, WhatsApp business API docs, messaging platform resources, axodesk community",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Resources", url: "/resources" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AxoDesk Resources — Docs, API, Webinars & Blog",
      "description": "Documentation, API reference, webinars, blog and community for AxoDesk users.",
      "url": "https://axodesk.in/resources"
    },
  });

  const { section: sectionSlug } = useParams<{ section?: string }>();
  const [activeId, setActiveId] = useState(sectionSlug ?? "docs");
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center mb-16 pt-10">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-600/8 rounded-full blur-[120px] pointer-events-none" />
        <AnimatedSection direction="fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-6 uppercase tracking-wide">
            <Book className="w-3 h-3" /> Resources & Support
          </div>
        </AnimatedSection>
        <AnimatedSection delay={80} direction="up">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-[1.05]">
            Everything you need to<br />
            <span className="text-shimmer">succeed with AxoDesk</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={160} direction="up">
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Documentation, help guides, API reference, webinars, blog insights, and a thriving community — all in one place.
          </p>
        </AnimatedSection>

        {/* Search bar */}
        <AnimatedSection delay={240} direction="up">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search docs, guides, tutorials..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 placeholder-slate-600 text-sm focus:outline-none focus:border-brand-600/50 focus:bg-white/8 transition-all"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 bg-white/5 border border-white/10 px-2 py-1 rounded-md font-mono">⌘K</kbd>
          </div>
        </AnimatedSection>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex gap-6">

          {/* Sidebar */}
          <AnimatedSection direction="left" className="w-60 shrink-0 self-start sticky top-24">
            <div className="rounded-2xl border border-white/8 p-3 bg-[#0a0f1e]">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 px-3 mb-2 mt-1">Resources</p>
              <div className="space-y-1">
                {sections.map((sec) => (
                  <SectionTab
                    key={sec.id}
                    sec={sec}
                    isActive={activeId === sec.id}
                    onClick={() => setActiveId(sec.id)}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Section hero */}
            <AnimatedSection direction="up" key={active.id}>
              <div
                className="relative rounded-2xl border p-8 mb-8 overflow-hidden"
                style={{
                  borderColor: `rgba(${active.accentRaw},0.2)`,
                  background: `radial-gradient(ellipse at left top, rgba(${active.accentRaw},0.1) 0%, transparent 60%), #0a0f1e`,
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${active.accentRaw},0.5), transparent)` }} />
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${active.bg} ${active.color} flex items-center justify-center shrink-0 text-xl`}>
                    {active.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">{active.heroTitle}</h2>
                    <p className="text-slate-400 leading-relaxed">{active.heroSub}</p>
                    <a href="#" className={`inline-flex items-center gap-2 mt-4 text-sm font-bold ${active.color} hover:opacity-80 transition-opacity`}>
                      Open {active.label} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Category grid */}
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 gap-4"
            >
              {active.categories.map((cat, i) => (
                <CategoryCard
                  key={cat.title}
                  cat={cat}
                  accentRaw={active.accentRaw}
                  textColor={active.color}
                  bg={active.bg}
                  border={active.border}
                  delay={i * 80}
                  inView={inView}
                />
              ))}
            </div>

            {/* Featured section */}
            <AnimatedSection direction="up" delay={200} className="mt-8">
              <div className="p-6 rounded-2xl border border-amber-600/20 bg-gradient-to-r from-amber-600/8 to-orange-600/5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-white">Featured: 2024 State of Conversational Commerce Report</p>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-400">Free Download</span>
                  </div>
                  <p className="text-sm text-slate-400">How 500 B2C businesses use messaging to 3× their conversion rates — with real data.</p>
                </div>
                <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600/20 border border-amber-600/30 text-amber-400 text-sm font-bold hover:bg-amber-600/30 transition-all shrink-0">
                  Download <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* ── COMMUNITY CTA ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mt-20">
        <AnimatedSection direction="scale">
          <div className="relative overflow-hidden rounded-3xl border border-brand-600/25 p-12 text-center"
            style={{ background: "radial-gradient(ellipse at center top, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.08) 50%, transparent 80%), #0a0f1e" }}
          >
            <div className="absolute inset-0 shimmer-bg pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)" }} />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  {["SM", "CT", "PK", "AJ", "MR"].map((av, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080c14] bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-[9px] font-black text-white">
                      {av}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400">2,000+ members & growing</p>
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Join the AxoDesk Community</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Share automation templates, ask questions, swap growth strategies, and learn from practitioners running AxoDesk at scale.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
                  Join the Community <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/" className="flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
                  Start Free Trial <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};
