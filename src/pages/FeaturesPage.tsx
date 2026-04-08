import { useState, useRef } from "react";
import { useSEO } from "../hooks/useSEO";
import {
  Inbox, Zap, Users, BarChart3, Tag, FileText,
  Webhook, MessageSquare, Bot, Phone, Lock,
  Search, Download, Bell, GitBranch,
  Globe, Layers, ArrowRight, CheckCircle2, ChevronRight, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";

const categories = [
  {
    id: "inbox",
    badge: "Core",
    badgeColor: "bg-brand-600/20 text-brand-400 border-brand-600/25",
    title: "Unified Inbox",
    subtitle: "Every channel. One view.",
    description: "All your customer conversations — WhatsApp, Instagram, Messenger, Email, Website Chat — fused into a single real-time inbox. Context-rich, fast, and built for teams.",
    accentRaw: "79,70,229",
    accent: "brand",
    icon: <Inbox className="w-6 h-6" />,
    features: [
      "Multi-channel message consolidation",
      "Real-time sync across all channels",
      "Conversation history & full context",
      "Smart merge of duplicate contacts",
      "Pin & star important conversations",
      "Bulk conversation management",
    ],
    stat: { value: "5×", label: "more conversations handled" },
    channels: ["whatsapp", "instagram", "messenger", "gmail", "telegram"],
  },
  {
    id: "automation",
    badge: "Power",
    badgeColor: "bg-emerald-600/20 text-emerald-400 border-emerald-600/25",
    title: "Automation & Workflows",
    subtitle: "Work smarter. Scale faster.",
    description: "No-code automation builder with 50+ triggers, conditions, and actions. Qualify leads, assign conversations, send follow-ups — all running 24/7 without you.",
    accentRaw: "16,185,129",
    accent: "emerald",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Visual drag-and-drop workflow builder",
      "Auto-assign to agents or teams",
      "Auto-reply with smart templates",
      "Trigger on message, keyword, tag, time",
      "Multi-step conditional logic",
      "Webhook & API actions",
    ],
    stat: { value: "15h+", label: "saved per agent weekly" },
    channels: [],
  },
  {
    id: "team",
    badge: "Collaboration",
    badgeColor: "bg-purple-600/20 text-purple-400 border-purple-600/25",
    title: "Team Collaboration",
    subtitle: "Your team, perfectly in sync.",
    description: "Assign, comment, and coordinate inside every conversation — without the customer ever seeing your internal comms. Built for fast-moving support teams.",
    accentRaw: "124,58,237",
    accent: "purple",
    icon: <Users className="w-6 h-6" />,
    features: [
      "Assign conversations to agents",
      "Internal notes (hidden from customer)",
      "@mention teammates in threads",
      "Team performance view",
      "Agent availability & status",
      "Collision detection (no double replies)",
    ],
    stat: { value: "40%", label: "fewer missed messages" },
    channels: [],
  },
  {
    id: "ai",
    badge: "AI — Beta",
    badgeColor: "bg-pink-600/20 text-pink-400 border-pink-600/25",
    title: "AI Assistant",
    subtitle: "Intelligence, built right in.",
    description: "AI that handles first-line support, qualifies leads, and suggests replies — trained on your own knowledge base for accurate, brand-consistent responses every time.",
    accentRaw: "236,72,153",
    accent: "pink",
    icon: <Bot className="w-6 h-6" />,
    features: [
      "AI-powered auto-reply",
      "Knowledge base training & fine-tuning",
      "Sentiment analysis on every message",
      "Smart reply suggestions for agents",
      "Intent detection & smart routing",
      "Multilingual support (20+ languages)",
    ],
    stat: { value: "60%", label: "of tickets auto-resolved" },
    channels: [],
  },
  {
    id: "analytics",
    badge: "Insights",
    badgeColor: "bg-orange-600/20 text-orange-400 border-orange-600/25",
    title: "Analytics & Reports",
    subtitle: "Data that drives decisions.",
    description: "Every metric that matters, live. From individual agent performance to channel-wide trends — get the full picture to optimize support and grow faster.",
    accentRaw: "249,115,22",
    accent: "orange",
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      "Real-time dashboard & live metrics",
      "First response & resolution time tracking",
      "Team & agent leaderboards",
      "CSAT & NPS collection flow",
      "Conversation volume by channel",
      "Custom report exports (CSV/PDF)",
    ],
    stat: { value: "90%", label: "better staffing decisions" },
    channels: [],
  },
  {
    id: "contacts",
    badge: "CRM",
    badgeColor: "bg-cyan-600/20 text-cyan-400 border-cyan-600/25",
    title: "Contact Management",
    subtitle: "Know every customer.",
    description: "A lightweight built-in CRM that stores every interaction, tag, note, and purchase — giving your whole team full context the moment a conversation opens.",
    accentRaw: "6,182,212",
    accent: "cyan",
    icon: <Layers className="w-6 h-6" />,
    features: [
      "Unified contact profiles",
      "Custom fields & attributes",
      "Contact tagging & lifecycle stages",
      "Bulk import/export (CSV)",
      "Full conversation history per contact",
      "Contact notes & activity log",
    ],
    stat: { value: "Full", label: "context on every reply" },
    channels: [],
  },
  {
    id: "api",
    badge: "Developer",
    badgeColor: "bg-slate-600/20 text-slate-400 border-slate-600/25",
    title: "API & Integrations",
    subtitle: "Connect everything.",
    description: "An API-first platform with webhooks, native integrations, and an open REST API. Connect your CRM, helpdesk, e-commerce stack, or any custom system.",
    accentRaw: "148,163,184",
    accent: "slate",
    icon: <Webhook className="w-6 h-6" />,
    features: [
      "REST API with full OpenAPI spec",
      "Real-time webhooks",
      "Zapier & n8n native connectors",
      "Shopify & WooCommerce sync",
      "Salesforce & HubSpot integration",
      "Custom integration support",
    ],
    stat: { value: "40+", label: "integrations available" },
    channels: [],
  },
  {
    id: "security",
    badge: "Enterprise",
    badgeColor: "bg-green-600/20 text-green-400 border-green-600/25",
    title: "Security & Compliance",
    subtitle: "Trust at every layer.",
    description: "Enterprise-grade security with end-to-end encryption, RBAC, audit logs, and compliance features your security team will actually approve.",
    accentRaw: "34,197,94",
    accent: "green",
    icon: <Lock className="w-6 h-6" />,
    features: [
      "End-to-end encryption",
      "Role-based access control (RBAC)",
      "Full immutable audit logs",
      "Two-factor auth & SSO",
      "GDPR & data privacy compliant",
      "99.9% uptime SLA",
    ],
    stat: { value: "99.9%", label: "uptime guaranteed" },
    channels: [],
  },
];

const accentMap: Record<string, { text: string; bg: string; border: string; barColor: string }> = {
  brand:   { text: "text-brand-400",   bg: "bg-brand-600/12",   border: "border-brand-600/25",   barColor: "#4f46e5" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-600/12", border: "border-emerald-600/25", barColor: "#10b981" },
  purple:  { text: "text-purple-400",  bg: "bg-purple-600/12",  border: "border-purple-600/25",  barColor: "#7c3aed" },
  pink:    { text: "text-pink-400",    bg: "bg-pink-600/12",    border: "border-pink-600/25",    barColor: "#ec4899" },
  orange:  { text: "text-orange-400",  bg: "bg-orange-600/12",  border: "border-orange-600/25",  barColor: "#f97316" },
  cyan:    { text: "text-cyan-400",    bg: "bg-cyan-600/12",    border: "border-cyan-600/25",    barColor: "#06b6d4" },
  slate:   { text: "text-slate-400",   bg: "bg-slate-600/12",   border: "border-slate-600/25",   barColor: "#94a3b8" },
  green:   { text: "text-green-400",   bg: "bg-green-600/12",   border: "border-green-600/25",   barColor: "#22c55e" },
};

const quickFeatures = [
  { icon: <Inbox />, name: "Unified Inbox" },
  { icon: <MessageSquare />, name: "Multi-channel Thread" },
  { icon: <Users />, name: "Assign Conversations" },
  { icon: <FileText />, name: "Internal Notes & Mentions" },
  { icon: <Tag />, name: "Tags & Lifecycle Stages" },
  { icon: <Bot />, name: "AI Auto-Reply" },
  { icon: <Download />, name: "Bulk Contact Import" },
  { icon: <Zap />, name: "No-Code Automations" },
  { icon: <GitBranch />, name: "Conditional Logic" },
  { icon: <FileText />, name: "Saved Reply Snippets" },
  { icon: <BarChart3 />, name: "Real-Time Analytics" },
  { icon: <Webhook />, name: "API & Webhooks" },
  { icon: <Search />, name: "Advanced Search" },
  { icon: <Bell />, name: "Smart Notifications" },
  { icon: <Globe />, name: "20+ Languages" },
  { icon: <Lock />, name: "RBAC & SSO" },
  { icon: <Phone />, name: "WA Calling (Soon)" },
  { icon: <Bot />, name: "AI Knowledge Base" },
  { icon: <Download />, name: "CSV/PDF Exports" },
  { icon: <Sparkles />, name: "Sentiment Analysis" },
];

/* Animated feature row */
function FeatureRow({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const ac = accentMap[cat.accent] ?? accentMap.brand;
  const isOdd = index % 2 === 1;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
      boxShadow: `0 20px 60px rgba(${cat.accentRaw}, 0.15), 0 0 0 1px rgba(${cat.accentRaw}, 0.1)`,
    });
  };
  const onLeave = () => setTiltStyle({});

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`grid md:grid-cols-2 gap-0 rounded-2xl border ${ac.border} overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 40}ms`, background: `radial-gradient(ellipse at ${isOdd ? "right" : "left"} top, rgba(${cat.accentRaw},0.06) 0%, transparent 60%), #0a0f1e` }}
    >
      {/* Content side */}
      <div className={`p-8 md:p-12 flex flex-col justify-center ${isOdd ? "md:order-2" : ""}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl ${ac.bg} ${ac.text} flex items-center justify-center`}>
            {cat.icon}
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${cat.badgeColor}`}>
            {cat.badge}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white mb-1">{cat.title}</h2>
        <p className={`text-sm font-semibold ${ac.text} mb-4`}>{cat.subtitle}</p>
        <p className="text-slate-400 leading-relaxed mb-7 text-[15px]">{cat.description}</p>

        <ul className="space-y-2.5 mb-8">
          {cat.features.map((f, fi) => (
            <li
              key={f}
              className={`flex items-center gap-3 text-sm text-slate-300 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${index * 40 + fi * 60 + 200}ms` }}
            >
              <div className={`w-5 h-5 rounded-full ${ac.bg} ${ac.text} flex items-center justify-center shrink-0`}>
                <CheckCircle2 className="w-3 h-3" />
              </div>
              {f}
            </li>
          ))}
        </ul>

        {/* Stat pill */}
        <div className={`inline-flex items-center gap-3 self-start px-4 py-2.5 rounded-xl ${ac.bg} border ${ac.border}`}>
          <span className={`text-2xl font-black ${ac.text}`}>{cat.stat.value}</span>
          <span className="text-xs text-slate-400 font-medium leading-snug max-w-[120px]">{cat.stat.label}</span>
        </div>
      </div>

      {/* Visual side */}
      <div className={`p-8 md:p-12 flex items-center justify-center ${isOdd ? "md:order-1" : ""} border-t md:border-t-0 ${isOdd ? "md:border-r" : "md:border-l"} border-white/5`}>
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={tiltStyle}
          className="w-full max-w-[320px] transition-all duration-200 cursor-default"
        >
          <div className="rounded-2xl bg-[#080c14] border border-white/10 overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-white/3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500 font-medium">{cat.title}</span>
            </div>
            <div className="p-4 space-y-2">
              {cat.features.slice(0, 5).map((f, fi) => (
                <div
                  key={fi}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border ${ac.border} ${ac.bg} transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                  style={{ transitionDelay: `${index * 40 + fi * 80 + 300}ms` }}
                >
                  <div className={`w-6 h-6 rounded-lg ${ac.bg} ${ac.text} flex items-center justify-center shrink-0`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{f}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ml-auto shrink-0`} style={{ background: `rgba(${cat.accentRaw},0.7)` }} />
                </div>
              ))}
            </div>
            <div className={`px-4 py-3 border-t border-white/5 flex items-center justify-between ${ac.bg}`}>
              <span className={`text-xs font-bold ${ac.text}`}>{cat.stat.value}</span>
              <span className="text-[10px] text-slate-500">{cat.stat.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const FeaturesPage = () => {
  useSEO({
    title: "OmniChat Features — Unified Inbox, AI Automation, Analytics & More",
    description: "Explore OmniChat's full feature set: unified omnichannel inbox for WhatsApp & Instagram, no-code automation builder, AI assistant, real-time analytics, team collaboration, and enterprise security — all in one platform.",
    canonical: "https://omnichat.io/features",
    ogImage: "https://omnichat.io/og-features.png",
    keywords: "omnichannel inbox features, WhatsApp business automation, AI chatbot platform, no-code automation builder, customer support analytics, team inbox software, CRM messaging integration, respond.io features comparison, sleekflow features comparison, unified messaging platform features",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Features", url: "/features" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "OmniChat Features — Complete Omnichannel Messaging Toolkit",
        "description": "Full feature set: unified inbox, AI automation, analytics, team collaboration, API access.",
        "url": "https://omnichat.io/features"
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "OmniChat Platform Features",
        "itemListElement": [
          {"@type":"ListItem","position":1,"name":"Unified Inbox","description":"All messaging channels in one real-time inbox — WhatsApp, Instagram, Messenger, Email, Live Chat"},
          {"@type":"ListItem","position":2,"name":"Automation & Workflows","description":"No-code automation builder with 50+ triggers, conditions and actions"},
          {"@type":"ListItem","position":3,"name":"AI Assistant","description":"AI that handles first-line support, qualifies leads and suggests replies"},
          {"@type":"ListItem","position":4,"name":"Team Collaboration","description":"Assign, comment and coordinate inside every conversation"},
          {"@type":"ListItem","position":5,"name":"Analytics & Reports","description":"Real-time dashboards and performance reporting across all channels"},
          {"@type":"ListItem","position":6,"name":"Contact Management & CRM","description":"Built-in CRM with full conversation history, tags and custom fields"},
          {"@type":"ListItem","position":7,"name":"API & Integrations","description":"REST API, webhooks, Shopify, HubSpot, Salesforce connectors"},
          {"@type":"ListItem","position":8,"name":"Security & Compliance","description":"SOC2, GDPR, E2E encryption, RBAC, SSO"}
        ]
      }
    ],
  });

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center mb-20 pt-10">
        {/* bg blobs */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none" />

        <AnimatedSection direction="fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-6 tracking-wide uppercase">
            <Sparkles className="w-3 h-3" /> Complete Feature Set
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80} direction="up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 leading-[1.05]">
            <span className="text-white">Everything you need to</span>
            <br />
            <span className="text-shimmer">master customer conversations</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={180} direction="up">
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Enterprise-grade communication tools in a clean, fast, and affordable platform — built for growing teams who refuse to juggle 10 different tabs.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={280} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="flex items-center gap-2 px-7 py-3.5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all">
              View Pricing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ── QUICK FEATURE GLANCE ── */}
      <AnimatedSection className="max-w-screen-xl mx-auto px-4 md:px-6 mb-24" direction="up">
        <div className="p-8 rounded-2xl bg-white/[0.025] border border-white/8 relative overflow-hidden">
          <div className="absolute inset-0 shimmer-bg pointer-events-none" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 text-center relative">20+ features included in every plan</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 relative">
            {quickFeatures.map((f, i) => (
              <div
                key={f.name}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-brand-600/20 transition-all duration-300 group cursor-default"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <span className="w-7 h-7 rounded-lg bg-brand-600/15 text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-600/25 transition-colors [&>svg]:w-3.5 [&>svg]:h-3.5">
                  {f.icon}
                </span>
                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors leading-tight">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FEATURE CATEGORY ROWS ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 space-y-6">
        {categories.map((cat, i) => (
          <FeatureRow key={cat.id} cat={cat} index={i} />
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <AnimatedSection direction="scale" className="max-w-screen-xl mx-auto px-4 md:px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-600/25 text-center p-14"
          style={{ background: "radial-gradient(ellipse at center top, rgba(79,70,229,0.2) 0%, rgba(124,58,237,0.08) 50%, transparent 80%), #0a0f1e" }}
        >
          <div className="absolute inset-0 shimmer-bg pointer-events-none" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brand-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to experience all of this?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">Start your free 14-day trial. Full platform. No credit card. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand text-base">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/pricing" className="flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
                See Pricing <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
