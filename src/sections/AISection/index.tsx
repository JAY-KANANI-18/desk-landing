import React, { useState, useEffect, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";
import {
  Bot,
  Sparkles,
  Zap,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  ShoppingCart,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";

/* ─── Journey Stages ─────────────────────────────────── */
const stages = [
  {
    id: "capture",
    emoji: "🎯",
    label: "Capture",
    tagline: "Unify every touchpoint to drive revenue",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.35)",
    desc: "Leads come from everywhere — WhatsApp chats, TikTok Ads, Instagram DMs, store visits. OmniChat unifies them into one smart inbox so no opportunity is ever missed.",
    bullets: [
      "Auto-capture leads from 12+ channels",
      "CRM sync keeps profiles always fresh",
      "Deduplication merges duplicate contacts",
      "Smart tags route leads instantly",
    ],
    icon: TrendingUp,
    statNum: "3×",
    statLabel: "more leads captured",
    visual: "capture",
  },
  {
    id: "convert",
    emoji: "💰",
    label: "Convert",
    tagline: "Sell more with AI and analytics",
    color: "#10b981",
    glow: "rgba(16,185,129,0.35)",
    desc: "AI Agents qualify prospects, send product recommendations, and close deals — 24/7. Analytics surface exactly where leads drop so your team can intervene at the right moment.",
    bullets: [
      "AI-powered lead scoring and qualification",
      "Automated product catalogue sharing",
      "One-click order and payment links",
      "Conversion funnel analytics dashboard",
    ],
    icon: ShoppingCart,
    statNum: "68%",
    statLabel: "higher conversion rate",
    visual: "convert",
  },
  {
    id: "retain",
    emoji: "🔁",
    label: "Retain",
    tagline: "Build recurring revenue, not one-time sales",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    desc: "Re-engage customers with personalised campaigns, loyalty nudges, and proactive support before issues arise. Turn every buyer into a repeat customer automatically.",
    bullets: [
      "Broadcast segments with personalisation",
      "Automated re-engagement sequences",
      "CSAT surveys after every resolution",
      "Churn prediction alerts for agents",
    ],
    icon: Users,
    statNum: "4.2×",
    statLabel: "higher customer lifetime value",
    visual: "retain",
  },
];

/* ─── AI Capabilities ─────────────────────────────────── */
const aiCaps = [
  {
    id: "agent",
    icon: Bot,
    color: "#6366f1",
    glow: "rgba(99,102,241,0.4)",
    label: "AI Agent",
    badge: "Fully Autonomous",
    badgeColor: "#6366f1",
    headline: "Full automation — no human needed",
    sub: "Deploy AI Agents that handle entire conversations end-to-end: answer FAQs, qualify leads, process orders, book appointments, and escalate only when truly needed.",
    highlights: [
      { icon: Zap, text: "Responds instantly, 24 / 7 across all channels" },
      { icon: CheckCircle2, text: "Handles 80% of queries without agent involvement" },
      { icon: TrendingUp, text: "Learns from past conversations continuously" },
      { icon: ShoppingCart, text: "Processes orders, bookings & payments autonomously" },
    ],
    mockMessages: [
      { from: "user", text: "Hi, I want to order the Pro plan" },
      { from: "ai", text: "Great choice! 🎉 I can set that up right now. Can I confirm your email address?" },
      { from: "user", text: "sure, it's alex@company.com" },
      { from: "ai", text: "Perfect! I've created your Pro account and sent a payment link to alex@company.com. You're all set! ✅" },
      { from: "system", text: "Order #8821 created · Payment link sent · CRM updated" },
    ],
  },
  {
    id: "assist",
    icon: Sparkles,
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    label: "AI Assist",
    badge: "Copilot Mode",
    badgeColor: "#10b981",
    headline: "Supercharge every human reply",
    sub: "AI Assist acts as a real-time copilot for your agents — generating smart reply suggestions, auto-summarising long threads, and coaching tone so every message is on-brand.",
    highlights: [
      { icon: MessageSquare, text: "Smart reply suggestions in real time" },
      { icon: Sparkles, text: "Auto-summarise long conversation threads" },
      { icon: HeadphonesIcon, text: "Tone coaching to keep replies on-brand" },
      { icon: CheckCircle2, text: "Translate messages into 50+ languages instantly" },
    ],
    mockMessages: [
      { from: "user", text: "I've been waiting 3 days for my refund, this is unacceptable!" },
      { from: "suggestion", text: "💡 AI Suggest: \"I sincerely apologize for the delay. I can see your refund of $49.99 was processed today and should arrive within 24 hours. I'm escalating this to priority so it doesn\'t happen again.\"" },
      { from: "agent", text: "I sincerely apologize for the delay. Your refund of $49.99 was processed today ✅" },
      { from: "ai", text: "📊 Thread summary: Customer frustrated about 3-day refund delay. Resolved — refund confirmed. CSAT risk: Medium." },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    label: "AI Automation",
    badge: "No-Code Flows",
    badgeColor: "#f59e0b",
    headline: "Build powerful workflows visually",
    sub: "Connect triggers, conditions and actions without writing a single line of code. Route leads, send broadcasts, sync CRMs, and trigger webhooks — all on autopilot.",
    highlights: [
      { icon: Zap, text: "Visual drag-and-drop workflow builder" },
      { icon: Bot, text: "Conditional logic with AI intent detection" },
      { icon: TrendingUp, text: "Connect to 200+ apps via native integrations" },
      { icon: Users, text: "Auto-assign conversations to the right team" },
    ],
    mockMessages: [
      { from: "system", text: "🔵 TRIGGER — New lead from Facebook Ad" },
      { from: "flow", text: "→ AI scores lead: High Intent (92%)" },
      { from: "flow", text: "→ Send welcome message via WhatsApp" },
      { from: "flow", text: "→ Assign to Sales Team · Create deal in CRM" },
      { from: "flow", text: "→ Schedule follow-up in 2 hours ✅" },
    ],
  },
];

/* ─── Fake WhatsApp Chat Preview ──────────────────────── */
const ChatMock: React.FC<{ messages: typeof aiCaps[0]["mockMessages"]; color: string; glow: string }> = ({ messages, color, glow }) => {
  const [visible, setVisible] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(0);
    let i = 0;
    const tick = () => {
      i++;
      setVisible(i);
      if (i < messages.length) setTimeout(tick, 900);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [messages]);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [visible, messages]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[360px] sm:h-[390px]"
      style={{ background: "#0e1621", boxShadow: `0 0 40px ${glow}` }}
    >
      {/* Phone header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10" style={{ background: "#17212b" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: color }}>
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <div className="text-white text-sm font-semibold">OmniChat AI</div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <Play size={10} className="text-white/60" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className="p-4 space-y-3 flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {messages.slice(0, visible + 1).map((m, i) => (
          <div
            key={i}
            className="flex animate-[fadeSlideUp_0.4s_ease_forwards]"
            style={{ justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}
          >
            {m.from === "system" || m.from === "flow" ? (
              <div className="w-full text-center text-xs py-1.5 px-3 rounded-full bg-white/5 text-white/50 border border-white/10">
                {m.text}
              </div>
            ) : m.from === "suggestion" ? (
              <div className="max-w-[90%] text-xs py-2 px-3 rounded-xl border text-white/70 italic" style={{ background: `${color}18`, borderColor: `${color}40` }}>
                {m.text}
              </div>
            ) : (
              <div
                className="max-w-[80%] text-sm py-2 px-3 rounded-2xl leading-relaxed"
                style={
                  m.from === "user"
                    ? { background: color, color: "#fff", borderBottomRightRadius: 4 }
                    : m.from === "agent"
                    ? { background: "#1e2d3d", color: "#e2e8f0", borderBottomLeftRadius: 4 }
                    : { background: "#1e2d3d", color: "#e2e8f0", borderBottomLeftRadius: 4 }
                }
              >
                {m.text}
              </div>
            )}
          </div>
        ))}
        {visible < messages.length - 1 && (
          <div className="flex gap-1 pl-2">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="w-2 h-2 rounded-full bg-white/30 animate-bounce"
                style={{ animationDelay: `${d * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10" style={{ background: "#17212b" }}>
        <div className="flex-1 bg-white/5 rounded-full px-3 py-1.5 text-xs text-white/30">Type a message…</div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: color }}>
          <ArrowRight size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
};

/* ─── Journey Visual Placeholder ─────────────────────── */
const JourneyVisual: React.FC<{ type: string; color: string; glow: string }> = ({ type, color, glow }) => {
  if (type === "capture") return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 p-5 space-y-3" style={{ background: "#0e1621", boxShadow: `0 0 32px ${glow}` }}>
      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Incoming Leads</div>
      {[
        { ch: "WhatsApp", color: "#25d366", msg: "Hi, interested in the Business plan", time: "now" },
        { ch: "Instagram", color: "#e1306c", msg: "Can you send me the catalogue?", time: "2m" },
        { ch: "Facebook", color: "#1877f2", msg: "What\'s your pricing?", time: "5m" },
        { ch: "TikTok Ads", color: "#ff0050", msg: "Clicked on your ad – want demo", time: "8m" },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: l.color + "22", border: `1px solid ${l.color}55`, color: l.color }}>{l.ch[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white/80">{l.ch}</div>
            <div className="text-xs text-white/40 truncate">{l.msg}</div>
          </div>
          <div className="text-xs text-white/30">{l.time}</div>
        </div>
      ))}
      <div className="mt-2 p-2.5 rounded-xl border border-dashed text-center text-xs text-white/30" style={{ borderColor: `${color}40` }}>+ 847 more contacts synced to CRM</div>
    </div>
  );

  if (type === "convert") return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 p-5 space-y-3" style={{ background: "#0e1621", boxShadow: `0 0 32px ${glow}` }}>
      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Conversion Funnel</div>
      {[
        { label: "Leads Captured", val: 1240, pct: 100, col: "#6366f1" },
        { label: "AI Qualified", val: 860, pct: 69, col: "#8b5cf6" },
        { label: "Demo Booked", val: 340, pct: 27, col: "#10b981" },
        { label: "Deal Closed", val: 212, pct: 17, col: color },
      ].map((r, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-xs text-white/60">
            <span>{r.label}</span>
            <span className="font-semibold" style={{ color: r.col }}>{r.val.toLocaleString()}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${r.pct}%`, background: r.col }} />
          </div>
        </div>
      ))}
      <div className="pt-1 flex items-center gap-2 text-xs" style={{ color }}>
        <TrendingUp size={12} />
        <span>Conversion up <strong>68%</strong> vs. last quarter</span>
      </div>
    </div>
  );

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 p-5 space-y-3" style={{ background: "#0e1621", boxShadow: `0 0 32px ${glow}` }}>
      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Retention Dashboard</div>
      {[
        { label: "Active Customers", val: "3,842", change: "+12%", up: true },
        { label: "Repeat Purchases", val: "68%", change: "+9pts", up: true },
        { label: "Avg. LTV", val: "$1,240", change: "+4.2×", up: true },
        { label: "Churn Rate", val: "2.1%", change: "-0.8pts", up: false },
      ].map((s, i) => (
        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/60">{s.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{s.val}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: s.up ? "#10b98122" : "#ef444422", color: s.up ? "#10b981" : "#ef4444" }}>{s.change}</span>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 text-xs" style={{ color }}>
        <Star size={12} />
        <span>CSAT score <strong>4.8 / 5</strong> across all channels</span>
      </div>
    </div>
  );
};

/* ─── Main Section ────────────────────────────────────── */
export const AISection: React.FC = () => {
  const [capKey, setCapKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg,#080c14 0%,#0a0e1a 60%,#080c14 100%)" }}>
      {/* bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#6366f1" }} />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#10b981" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl" style={{ background: "#f59e0b" }} />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6">

        {/* ── SECTION HEADER ─────────────────────────────── */}
        <AnimatedSection animation="up" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-6">
            <Sparkles size={14} />
            AI-Powered Growth Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Scale business growth with every
            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#6366f1,#10b981,#f59e0b)" }}>
              customer conversation
            </span>
          </h2>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            As chats and calls multiply, old inboxes break. OmniChat&#39;s AI framework helps you manage the entire customer journey across every channel — even at high volume.
          </p>
        </AnimatedSection>

        {/* ── JOURNEY STAGES (Capture / Convert / Retain) ── */}
        <AnimatedSection animation="up" delay={100} className="mb-28">
          <div className="space-y-12">
            {stages.map((stage) => (
              <div key={stage.id} className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: `${stage.color}18`, color: stage.color, border: `1px solid ${stage.color}40` }}>
                    <stage.icon size={12} />
                    {stage.label}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{stage.tagline}</h3>
                  <p className="text-white/55 leading-relaxed mb-6">{stage.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {stage.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 size={15} style={{ color: stage.color, flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl border" style={{ background: `${stage.color}10`, borderColor: `${stage.color}30` }}>
                    <div>
                      <div className="text-3xl font-black" style={{ color: stage.color }}>{stage.statNum}</div>
                      <div className="text-xs text-white/50">{stage.statLabel}</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <button className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">
                      Learn more <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
                <div>
                  <JourneyVisual type={stage.visual} color={stage.color} glow={stage.glow} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── AI CAPABILITIES ────────────────────────────── */}
        <AnimatedSection animation="up" delay={150}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-5">
              <Bot size={14} />
              AI built on a trusted foundation
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Scale without adding headcount
            </h3>
            <p className="text-white/50 max-w-xl mx-auto">
              Accelerate growth on every channel with AI that responds, routes and performs tasks accurately and reliably — 24 / 7.
            </p>
          </div>

          {/* Cap content */}
          <div className="space-y-14">
            {aiCaps.map((cap, capIndex) => (
              <div key={cap.id} className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left — info */}
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: `${cap.color}18`, color: cap.color, border: `1px solid ${cap.color}40` }}>
                    <cap.icon size={12} />
                    {cap.badge}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">{cap.headline}</h4>
                  <p className="text-white/55 leading-relaxed mb-7">{cap.sub}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cap.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${cap.color}22`, border: `1px solid ${cap.color}40` }}>
                          <h.icon size={13} style={{ color: cap.color }} />
                        </div>
                        <span className="text-sm text-white/65 leading-snug">{h.text}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-7 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105" style={{ background: cap.color, boxShadow: `0 0 20px ${cap.glow}` }}>
                    Explore {cap.label} <ArrowRight size={14} />
                  </button>
                </div>
                {/* Right — chat preview */}
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3 text-center">Live Preview — {cap.label}</div>
                  <ChatMock key={`${cap.id}-${capIndex}-${capKey}`} messages={cap.mockMessages} color={cap.color} glow={cap.glow} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── BOTTOM TRUST BAR ───────────────────────────── */}
        <AnimatedSection animation="up" delay={200} className="mt-24 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "10M+", label: "Conversations handled daily", color: "#6366f1" },
              { num: "80%", label: "Queries resolved by AI", color: "#10b981" },
              { num: "3 min", label: "Average first response time", color: "#f59e0b" },
              { num: "99.9%", label: "Uptime guarantee", color: "#ec4899" },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.num}</div>
                <div className="text-xs text-white/50 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};
