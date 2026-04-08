import { useState, useRef, MouseEvent } from "react";
import {
  Inbox, Zap, Users, BarChart3, Tag, FileText,
  Webhook, Bot, GitBranch, Download, Search, Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";

const features = [
  { icon: <Inbox />, title: "Unified Inbox", desc: "All channels in one place. WhatsApp, IG, FB, Email, Chat.", color: "brand" },
  { icon: <Zap />, title: "Automation & Workflows", desc: "No-code rules to auto-assign, reply, and tag conversations.", color: "emerald" },
  { icon: <Users />, title: "Team Collaboration", desc: "Assign, mention, and leave internal notes on any conversation.", color: "purple" },
  { icon: <BarChart3 />, title: "Analytics & Reports", desc: "Response time, CSAT, agent performance, and conversation trends.", color: "orange" },
  { icon: <Tag />, title: "Tags & Lifecycle", desc: "Tag contacts, set lifecycle stages, and segment your audience.", color: "pink" },
  { icon: <FileText />, title: "Saved Replies", desc: "Store canned responses and share them instantly with your team.", color: "cyan" },
  { icon: <GitBranch />, title: "Auto Assign", desc: "Route conversations to the right agent based on rules or skills.", color: "yellow" },
  { icon: <Bot />, title: "AI Assistant", desc: "AI-powered replies trained on your knowledge base. Coming soon.", color: "rose", badge: "Beta" },
  { icon: <Download />, title: "Bulk Import/Export", desc: "Import contacts from CSV, export conversations and reports.", color: "slate" },
  { icon: <Webhook />, title: "API & Webhooks", desc: "REST API and webhooks to connect any external tool or system.", color: "indigo" },
  { icon: <Search />, title: "Advanced Search", desc: "Find any message, contact, or conversation in milliseconds.", color: "teal" },
  { icon: <Bell />, title: "Smart Notifications", desc: "Get notified for new messages, mentions, and SLA breaches.", color: "violet" },
];

const colorMap: Record<string, { icon: string; bg: string; border: string; glow: string }> = {
  brand:   { icon: "text-brand-400",   bg: "bg-brand-600/15",   border: "group-hover:border-brand-600/40",   glow: "rgba(79,70,229,0.25)" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-600/15", border: "group-hover:border-emerald-600/40", glow: "rgba(16,185,129,0.25)" },
  purple:  { icon: "text-purple-400",  bg: "bg-purple-600/15",  border: "group-hover:border-purple-600/40",  glow: "rgba(139,92,246,0.25)" },
  orange:  { icon: "text-orange-400",  bg: "bg-orange-600/15",  border: "group-hover:border-orange-600/40",  glow: "rgba(249,115,22,0.25)" },
  pink:    { icon: "text-pink-400",    bg: "bg-pink-600/15",    border: "group-hover:border-pink-600/40",    glow: "rgba(236,72,153,0.25)" },
  cyan:    { icon: "text-cyan-400",    bg: "bg-cyan-600/15",    border: "group-hover:border-cyan-600/40",    glow: "rgba(6,182,212,0.25)" },
  yellow:  { icon: "text-yellow-400",  bg: "bg-yellow-600/15",  border: "group-hover:border-yellow-600/40",  glow: "rgba(234,179,8,0.25)" },
  rose:    { icon: "text-rose-400",    bg: "bg-rose-600/15",    border: "group-hover:border-rose-600/40",    glow: "rgba(244,63,94,0.25)" },
  slate:   { icon: "text-slate-400",   bg: "bg-slate-600/15",   border: "group-hover:border-slate-600/40",   glow: "rgba(100,116,139,0.25)" },
  indigo:  { icon: "text-indigo-400",  bg: "bg-indigo-600/15",  border: "group-hover:border-indigo-600/40",  glow: "rgba(99,102,241,0.25)" },
  teal:    { icon: "text-teal-400",    bg: "bg-teal-600/15",    border: "group-hover:border-teal-600/40",    glow: "rgba(20,184,166,0.25)" },
  violet:  { icon: "text-violet-400",  bg: "bg-violet-600/15",  border: "group-hover:border-violet-600/40",  glow: "rgba(139,92,246,0.25)" },
};

const TiltCard = ({ feature, index, inView }: { feature: typeof features[number]; index: number; inView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const c = colorMap[feature.color] ?? colorMap.brand;
  const delay = (index % 4) * 80 + Math.floor(index / 4) * 120;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    el.style.boxShadow = `0 20px 40px ${c.glow}`;
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.boxShadow = "";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group p-6 rounded-2xl bg-white/3 border border-white/6 ${c.border} transition-all duration-300 cursor-default tilt-card`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-bg" />

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 [&>svg]:w-5 [&>svg]:h-5 ${c.icon} ${c.bg}`}>
        {feature.icon}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-white">{feature.title}</h3>
        {(feature as any).badge && (
          <span className="text-[9px] font-bold bg-rose-600/20 text-rose-400 px-1.5 py-0.5 rounded-full animate-pulse">
            {(feature as any).badge}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      className="py-24 px-4 md:px-6 bg-white/2 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* bg radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 uppercase tracking-wide">
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Everything to manage<br />
            <span className="text-shimmer">customer conversations</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            From inbox to automation to analytics — OmniChat has every tool your team needs to deliver exceptional customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {features.map((f, i) => (
            <TiltCard key={i} feature={f} index={i} inView={inView} />
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            to="/features"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all hover:border-brand-600/30"
          >
            Explore all features in detail
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
