import { useRef, useState, useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Star, TrendingUp, Shield, Zap,
  Users, BarChart3, Globe, Award, Clock, HeartHandshake,
  Layers, Bot, ChevronRight, Play, Quote
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { AnimatedSection } from "../components/AnimatedSection";

/* ─── Trusted logos ─── */
const logos = [
  { name: "Toyota", text: "TOYOTA" },
  { name: "Decathlon", text: "DECATHLON" },
  { name: "Hertz", text: "Hertz" },
  { name: "Shopify", text: "Shopify" },
  { name: "Adidas", text: "adidas" },
  { name: "Samsung", text: "SAMSUNG" },
  { name: "Lufthansa", text: "Lufthansa" },
  { name: "Booking", text: "Booking.com" },
];

/* ─── vs Others comparison ─── */
const comparisons = [
  {
    icon: <Inbox className="w-5 h-5" />,
    ours: "All channels in ONE inbox — WhatsApp, IG, Email, Messenger",
    theirs: "Separate dashboards per channel, constant tab-switching",
    color: "brand",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    ours: "No-code automation builder with 50+ triggers & actions",
    theirs: "Basic rules engine, requires developer setup",
    color: "emerald",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    ours: "Real-time analytics across all channels in one report",
    theirs: "Per-channel reports, manual data stitching needed",
    color: "orange",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    ours: "AI assistant trained on your knowledge base, ready on day 1",
    theirs: "Generic AI bolt-on, requires months of training data",
    color: "pink",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    ours: "Scales from 1 agent to 1,000+ with zero infrastructure work",
    theirs: "Per-seat pricing spikes, manual migration to enterprise tier",
    color: "purple",
  },
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    ours: "Onboarding done in <24 h — dedicated success manager included",
    theirs: "Weeks of setup, support via ticket queue only",
    color: "cyan",
  },
];

/* ─── Why Us pillars ─── */
const pillars = [
  {
    icon: <Layers className="w-7 h-7" />,
    color: "brand",
    title: "Truly Unified",
    body: "Not just a multi-tab view. Every channel, team, contact, and conversation fused into a single real-time data model.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    color: "emerald",
    title: "Conversation-Led Growth",
    body: "Turn every support thread into a revenue signal. Qualify leads, upsell products, and close deals — all inside your inbox.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    color: "purple",
    title: "Enterprise-Grade Security",
    body: "SOC 2 Type II, end-to-end encryption, SSO, RBAC, and GDPR compliance — without locking you into an enterprise contract.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    color: "orange",
    title: "Proven ROI",
    body: "Customers average a 3× lift in lead conversion and 40% drop in first-response time within the first 90 days.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    color: "cyan",
    title: "Live in < 24 Hours",
    body: "Connect your channels, import contacts, and have your first automated workflow running before your next standup.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    color: "pink",
    title: "#1 Rated Support",
    body: "Consistently rated best-in-class for ease of use, customer support, and value-for-money on G2 and Capterra.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote: "We saw 4× more leads from ads, reduced response time and improved customer experience. AxoDesk is the backbone of our growth team.",
    name: "Sarah Mitchell",
    role: "Head of Growth, Bolt",
    rating: 5,
    avatar: "SM",
    color: "brand",
  },
  {
    quote: "Onboarding is so smooth — 24/7. I had my first workflow live in under an hour. The automation alone saved us hiring two support reps.",
    name: "Carlos Torres",
    role: "Founder, Zara Digital",
    rating: 5,
    avatar: "CT",
    color: "emerald",
  },
  {
    quote: "Switching from Intercom saved us $2,400/month and we actually got MORE features. The unified inbox is a game changer for our 12-agent team.",
    name: "Priya Kapoor",
    role: "Customer Success, Decathlon",
    rating: 5,
    avatar: "PK",
    color: "purple",
  },
];

/* ─── Steps ─── */
const approach = [
  {
    step: "01",
    icon: <Globe className="w-6 h-6" />,
    title: "Connect All Channels",
    body: "WhatsApp, Instagram, Messenger, Email, Live Chat — linked in minutes with zero code.",
    color: "brand",
  },
  {
    step: "02",
    icon: <Zap className="w-6 h-6" />,
    title: "Automate the Repetitive",
    body: "Build workflows that qualify leads, assign conversations, and send follow-ups while you sleep.",
    color: "emerald",
  },
  {
    step: "03",
    icon: <Users className="w-6 h-6" />,
    title: "Empower Your Team",
    body: "Agents respond faster with AI suggestions, saved replies, and full contact context in one view.",
    color: "purple",
  },
  {
    step: "04",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Measure & Scale",
    body: "Real-time dashboards show exactly where revenue is being won or lost — so you can double down.",
    color: "orange",
  },
];

/* ─── Stats ─── */
const stats = [
  { target: 3, suffix: "×", label: "More Leads Converted" },
  { target: 40, suffix: "%", label: "Faster Response Time" },
  { target: 99, suffix: ".9%", label: "Uptime SLA" },
  { target: 24, suffix: "h", label: "Average Onboarding" },
];

/* ─── Inline Inbox icon (for comp table) ─── */
function Inbox({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
    </svg>
  );
}

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  brand:   { bg: "bg-brand-600/15",   text: "text-brand-400",   border: "border-brand-600/25",   glow: "rgba(79,70,229,0.35)" },
  emerald: { bg: "bg-emerald-600/15", text: "text-emerald-400", border: "border-emerald-600/25", glow: "rgba(16,185,129,0.35)" },
  purple:  { bg: "bg-purple-600/15",  text: "text-purple-400",  border: "border-purple-600/25",  glow: "rgba(124,58,237,0.35)" },
  orange:  { bg: "bg-orange-600/15",  text: "text-orange-400",  border: "border-orange-600/25",  glow: "rgba(234,88,12,0.35)" },
  cyan:    { bg: "bg-cyan-600/15",    text: "text-cyan-400",    border: "border-cyan-600/25",    glow: "rgba(6,182,212,0.35)" },
  pink:    { bg: "bg-pink-600/15",    text: "text-pink-400",    border: "border-pink-600/25",    glow: "rgba(236,72,153,0.35)" },
};

/* ─── Animated stat card ─── */
function StatCard({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const count = useCountUp(target, 2000, inView);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center gap-1 p-6 rounded-2xl bg-white/4 border border-white/8 hover:border-brand-600/30 transition-all duration-500 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-5xl font-black text-white tabular-nums group-hover:text-shimmer transition-all">
        {count}{suffix}
      </span>
      <span className="text-sm text-slate-400 font-medium text-center">{label}</span>
    </div>
  );
}

/* ─── Tilt pillar card ─── */
function PillarCard({ pillar, delay }: { pillar: typeof pillars[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const c = colorMap[pillar.color] ?? colorMap.brand;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`,
      boxShadow: `0 16px 48px ${c.glow}`,
    });
  };
  const onLeave = () => setStyle({});

  return (
    <AnimatedSection delay={delay} direction="up">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className={`p-6 rounded-2xl bg-[#0d1220] border ${c.border} cursor-default transition-all duration-200 h-full`}
      >
        <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4`}>
          {pillar.icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{pillar.body}</p>
      </div>
    </AnimatedSection>
  );
}

/* ─── Comparison row ─── */
function CompRow({ item, index }: { item: typeof comparisons[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const c = colorMap[item.color] ?? colorMap.brand;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`grid md:grid-cols-2 gap-4 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Our side */}
      <div className={`flex items-start gap-3 p-4 rounded-xl bg-brand-600/8 border border-brand-600/20 group hover:border-brand-600/40 transition-all`}>
        <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.text} flex items-center justify-center shrink-0 mt-0.5`}>
          {item.icon}
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-400 mb-1">AxoDesk</div>
          <p className="text-sm text-slate-200 font-medium leading-snug">{item.ours}</p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5 ml-auto" />
      </div>
      {/* Their side */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6 opacity-60">
        <div className="w-8 h-8 rounded-lg bg-slate-700/40 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
          {item.icon}
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Others</div>
          <p className="text-sm text-slate-500 leading-snug">{item.theirs}</p>
        </div>
        <div className="w-5 h-5 rounded-full border-2 border-slate-700 shrink-0 mt-0.5 ml-auto" />
      </div>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  const c = colorMap[t.color] ?? colorMap.brand;
  return (
    <AnimatedSection delay={delay} direction="scale">
      <div className={`relative p-7 rounded-2xl bg-[#0d1220] border ${c.border} hover:shadow-lg transition-all duration-300 group h-full flex flex-col`} style={{ "--hover-shadow": c.glow } as React.CSSProperties}>
        <Quote className={`w-8 h-8 ${c.text} opacity-40 mb-4`} />
        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${c.bg} ${c.text} flex items-center justify-center text-sm font-bold shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-xs text-slate-500">{t.role}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Approach step ─── */
function ApproachStep({ step, index }: { step: typeof approach[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.25 });
  const c = colorMap[step.color] ?? colorMap.brand;
  const isLast = index === approach.length - 1;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex gap-5 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center shrink-0 font-black text-lg border ${c.border} transition-all duration-300 ${inView ? "scale-100" : "scale-75"}`}
          style={{ transitionDelay: `${index * 120 + 200}ms` }}>
          {step.step}
        </div>
        {!isLast && <div className="w-px flex-1 mt-3 bg-gradient-to-b from-white/15 to-transparent min-h-[40px]" />}
      </div>
      <div className="pb-8">
        <h4 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
          <span className={`${c.text}`}>{step.icon}</span>
          {step.title}
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{step.body}</p>
      </div>
    </div>
  );
}

/* ─── Logo marquee ─── */
function LogoMarquee() {
  const doubled = [...logos, ...logos];
  return (
    <div className="overflow-hidden py-4 mask-gradient-x">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">
        {doubled.map((l, i) => (
          <span key={i} className="text-slate-500 font-bold text-lg tracking-tight hover:text-slate-300 transition-colors cursor-default shrink-0">
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
export const WhyUsPage = () => {
  useSEO({
    title: "AxoDesk vs Respond.io | AI Customer Conversation Platform Alternative",
    description: "Compare AxoDesk vs respond.io, SleekFlow, and Intercom. Get AI agents, an omnichannel team inbox, WhatsApp CRM workflows, and transparent pricing in one customer conversation platform.",
    canonical: "https://axodesk.in/why-us",
    ogImage: "https://axodesk.in/og-why-us.png",
    keywords: "respond.io alternative, respond io alternative, AxoDesk vs respond.io, customer conversation management software, AI customer conversation platform, omnichannel team inbox, WhatsApp CRM alternative, conversation-led growth platform, SleekFlow alternative, Intercom alternative",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Why AxoDesk", url: "/why-us" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Why AxoDesk — Best Alternative to respond.io & SleekFlow",
        "description": "Detailed comparison: AxoDesk vs respond.io, SleekFlow, Intercom. Lower costs, faster onboarding, AI in every plan.",
        "url": "https://axodesk.in/why-us"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"How is AxoDesk different from respond.io?","acceptedAnswer":{"@type":"Answer","text":"AxoDesk includes AI automation in every plan, has faster onboarding (under 24h), a truly unified inbox across all channels, and costs significantly less than respond.io."}},
          {"@type":"Question","name":"How does AxoDesk compare to SleekFlow?","acceptedAnswer":{"@type":"Answer","text":"AxoDesk offers more channels, deeper AI features, better analytics, and more transparent pricing than SleekFlow — with no long-term contract required."}},
          {"@type":"Question","name":"Does AxoDesk support enterprise teams?","acceptedAnswer":{"@type":"Answer","text":"Yes. AxoDesk scales from solo operators to 1,000-agent enterprise teams with custom SLAs, SSO, dedicated infrastructure, and a success manager."}},
          {"@type":"Question","name":"How quickly can I get started with AxoDesk?","acceptedAnswer":{"@type":"Answer","text":"Most teams are live within 24 hours — connect your channels, import contacts, and build your first automation with no developer needed."}}
        ]
      }
    ],
  });

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 pt-10 pb-20 text-center">
        {/* bg blobs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[90px] pointer-events-none" />

        <AnimatedSection direction="fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-6 tracking-wide uppercase">
            Why businesses choose AxoDesk
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80} direction="up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-5">
            Why businesses choose{" "}
            <span className="text-shimmer">AxoDesk</span>
            <br />vs other alternatives
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={180} direction="up">
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The conversation management platform that actually unifies your channels, automates the repetitive work, and helps fast-growing B2C businesses convert more.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={280} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
              <Play className="w-4 h-4" /> Watch 2-min Demo
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* ── TRUSTED BY ── */}
      {/* <section className="py-10 border-y border-white/5 bg-white/[0.015] mb-20">
        <AnimatedSection direction="fade">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-600 mb-6">
            Powering the conversations of global icons
          </p>
        </AnimatedSection>
        <LogoMarquee />
      </section> */}

      {/* ── STATS ── */}
      <AnimatedSection className="max-w-screen-xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 80} />
          ))}
        </div>
      </AnimatedSection>

      {/* ── COMPARISON ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-28">
        <AnimatedSection direction="up" className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Head-to-head</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AxoDesk vs Other <span className="text-gradient">Alternatives</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Most tools solve ONE channel. We solve the conversation — end to end.
          </p>
        </AnimatedSection>

        {/* Column headers */}
        <AnimatedSection direction="fade" delay={100}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2">
              <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-brand-400 uppercase tracking-wider">AxoDesk</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2">
              <div className="w-6 h-6 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-slate-400 text-xs font-bold">?</span>
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Others</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {comparisons.map((item, i) => (
            <CompRow key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── WHY US PILLARS ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-28">
        <AnimatedSection direction="up" className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">The AxoDesk difference</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Built differently. <span className="text-gradient">On purpose.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every decision we make is guided by one goal: help B2C businesses turn conversations into revenue.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} pillar={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: steps */}
          <div>
            <AnimatedSection direction="left">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Our approach</p>
              <h2 className="text-4xl font-black text-white mb-3">
                Conversation-Led{" "}
                <span className="text-gradient">Growth™</span>
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                A proven 4-step framework that takes a business from scattered DMs to a structured, automated, revenue-generating conversation engine.
              </p>
            </AnimatedSection>
            <div>
              {approach.map((s, i) => (
                <ApproachStep key={s.step} step={s} index={i} />
              ))}
            </div>
          </div>

          {/* Right: mock dashboard */}
          <AnimatedSection direction="right" delay={200}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-brand-600/15 blur-[80px] rounded-full" />
              <div className="relative rounded-2xl bg-[#0d1220] border border-white/10 overflow-hidden scan-glow shadow-2xl">
                {/* titlebar */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8 bg-white/3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 text-xs text-slate-500 font-medium">AxoDesk — Unified Inbox</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400">Live</span>
                  </div>
                </div>
                {/* body */}
                <div className="p-5 space-y-3">
                  {[
                    { channel: "WA", color: "bg-green-500", name: "Maria K.", msg: "Hi! I need help with my order #4821", time: "now", unread: 2 },
                    { channel: "IG", color: "bg-pink-500", name: "Alex Chen", msg: "Hey, do you ship internationally?", time: "2m", unread: 1 },
                    { channel: "EM", color: "bg-blue-500", name: "support@acme.io", msg: "Following up on ticket #9920", time: "5m", unread: 0 },
                    { channel: "FB", color: "bg-blue-600", name: "Tom Harper", msg: "What are your business hours?", time: "12m", unread: 1 },
                    { channel: "WC", color: "bg-brand-500", name: "Anonymous Visitor", msg: "Can I get a demo call?", time: "18m", unread: 0 },
                  ].map((conv, ci) => (
                    <DashConvRow key={ci} conv={conv} delay={ci * 80} />
                  ))}
                </div>
                {/* bottom bar */}
                <div className="border-t border-white/8 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Showing 5 of 248 open conversations</span>
                  <div className="flex items-center gap-1.5 text-brand-400 text-xs font-medium">
                    View all <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-28">
        <AnimatedSection direction="up" className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">What customers say</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Trusted by teams that <span className="text-gradient">move fast</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real results from real businesses — not cherry-picked case studies.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 100} />
          ))}
        </div>

        {/* Rating bar */}
        <AnimatedSection delay={200} direction="up" className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-8 p-6 rounded-2xl bg-white/3 border border-white/8">
            {[
              { platform: "G2", score: "4.8", count: "342 reviews" },
              { platform: "Capterra", score: "4.9", count: "218 reviews" },
              { platform: "Product Hunt", score: "#1", count: "Product of the Day" },
            ].map(r => (
              <div key={r.platform} className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <span className="text-white font-bold text-lg">{r.score}</span>
                  <span className="text-slate-500 text-xs ml-1">on {r.platform}</span>
                  <p className="text-[10px] text-slate-600">{r.count}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6">
        <AnimatedSection direction="scale">
          <div className="relative overflow-hidden rounded-3xl border border-brand-600/25 bg-gradient-to-br from-brand-600/20 via-purple-600/10 to-transparent p-14 text-center">
            {/* shimmer overlay */}
            <div className="absolute inset-0 shimmer-bg pointer-events-none" />
            {/* blobs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-600/15 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/20 border border-brand-600/30 text-brand-300 text-xs font-bold mb-6 uppercase tracking-wide">
                🚀 Zero-risk. 14-day free trial.
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                3× your business results<br />
                <span className="text-shimmer">with AxoDesk</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-lg mx-auto">
                Join 5,000+ growing businesses. Full platform access, no credit card required, cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/pricing" className="flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-200 hover:text-white hover:bg-white/8 font-medium rounded-xl transition-all text-base">
                  See Pricing <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
};

/* ─── Chat row sub-component ─── */
function DashConvRow({ conv, delay }: { conv: { channel: string; color: string; name: string; msg: string; time: string; unread: number }; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-500 cursor-pointer group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-8 h-8 rounded-xl ${conv.color} flex items-center justify-center text-white text-[10px] font-black shrink-0`}>
        {conv.channel}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs font-semibold text-white truncate">{conv.name}</span>
          <span className="text-[10px] text-slate-600 shrink-0 ml-2">{conv.time}</span>
        </div>
        <p className="text-[11px] text-slate-500 truncate">{conv.msg}</p>
      </div>
      {conv.unread > 0 && (
        <div className="w-4 h-4 rounded-full bg-brand-600 flex items-center justify-center text-[9px] text-white font-bold shrink-0">
          {conv.unread}
        </div>
      )}
    </div>
  );
}
