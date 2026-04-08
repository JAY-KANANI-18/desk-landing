import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X, ChevronRight, ArrowLeft, ArrowRight,
  MessageSquare, Globe, Bot, Inbox, Users, Zap, Tag, FileText,
  Webhook, BarChart3, Phone, Mail, Shield, Sparkles,
  ShoppingBag, Home, GraduationCap, Heart, Landmark,
  Utensils, Car, Briefcase, TrendingUp, Plane,
  Clock, RefreshCw, Code2, Video, Rss, Calculator, Link2, Award,
  QrCode, LayoutGrid, Cpu, Shirt, Sofa, Watch
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

type Props = { onClose: () => void };

/* ─── DATA ─────────────────────────────────────────────── */

const productSections = [
  {
    label: "Capture Leads", accent: "text-brand-400", bg: "bg-brand-600/20",
    items: [
      { icon: <MessageSquare className="w-4 h-4" />, label: "Capture from Ads", desc: "Meta & Google Ads integration", to: "/features" },
      { icon: <Globe className="w-4 h-4" />, label: "Website Live Chat", desc: "Embeddable chat widget", to: "/features" },
      { icon: <Users className="w-4 h-4" />, label: "Social Capture", desc: "IG, FB, WA DMs", to: "/features" },
      { icon: <Tag className="w-4 h-4" />, label: "Offline to Online", desc: "QR codes & deep links", to: "/features" },
    ],
  },
  {
    label: "Convert Leads", accent: "text-emerald-400", bg: "bg-emerald-600/20",
    items: [
      { icon: <Bot className="w-4 h-4" />, label: "AI Agents", desc: "Auto-qualify & respond", badge: "✨ New", to: "/features" },
      { icon: <Inbox className="w-4 h-4" />, label: "Team Inbox", desc: "Unified shared inbox", to: "/features" },
      { icon: <Users className="w-4 h-4" />, label: "Lead Scoring", desc: "Route & qualify automatically", to: "/features" },
      { icon: <Zap className="w-4 h-4" />, label: "Smart Routing", desc: "Assign to right agent/team", to: "/features" },
      { icon: <FileText className="w-4 h-4" />, label: "Appointment Booking", desc: "Calendar-based scheduling", to: "/features" },
    ],
  },
  {
    label: "Retain Customers", accent: "text-purple-400", bg: "bg-purple-600/20",
    items: [
      { icon: <MessageSquare className="w-4 h-4" />, label: "Conversational Support", desc: "24/7 omnichannel support", to: "/features" },
      { icon: <Mail className="w-4 h-4" />, label: "Broadcast Campaigns", desc: "Promotions & newsletters", to: "/features" },
      { icon: <Zap className="w-4 h-4" />, label: "Renewal Reminders", desc: "Automated follow-up flows", to: "/features" },
      { icon: <BarChart3 className="w-4 h-4" />, label: "CSAT & NPS Surveys", desc: "Measure satisfaction scores", to: "/features" },
    ],
  },
  {
    label: "Scale", accent: "text-orange-400", bg: "bg-orange-600/20",
    items: [
      { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics & Reports", desc: "Cross-channel deep insights", to: "/features" },
      { icon: <Phone className="w-4 h-4" />, label: "WA Calling API", desc: "Voice & video calls", badge: "Soon", to: "/features" },
      { icon: <Webhook className="w-4 h-4" />, label: "API & Webhooks", desc: "Build any integration", to: "/features" },
      { icon: <Shield className="w-4 h-4" />, label: "Security & Compliance", desc: "SOC2, GDPR, RBAC", to: "/features" },
    ],
  },
];

const industries = [
  {
    icon: <ShoppingBag className="w-4 h-4" />, label: "Retail", color: "text-pink-400", bg: "bg-pink-600/20", slug: "retail",
    subs: [
      { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: "Overview", to: "/industry/retail" },
      { icon: <Cpu className="w-3.5 h-3.5" />, label: "Electronics", to: "/industry/retail/electronics" },
      { icon: <Shirt className="w-3.5 h-3.5" />, label: "Fashion & Apparel", to: "/industry/retail/fashion" },
      { icon: <Sofa className="w-3.5 h-3.5" />, label: "Furniture", to: "/industry/retail/furniture" },
      { icon: <Watch className="w-3.5 h-3.5" />, label: "Jewelry & Watches", to: "/industry/retail/jewelry" },
    ],
  },
  { icon: <GraduationCap className="w-4 h-4" />, label: "Education", color: "text-yellow-400", bg: "bg-yellow-600/20", slug: "education", subs: [] },
  { icon: <Heart className="w-4 h-4" />, label: "Healthcare", color: "text-red-400", bg: "bg-red-600/20", slug: "healthcare", subs: [] },
  { icon: <Briefcase className="w-4 h-4" />, label: "Professional Services", color: "text-purple-400", bg: "bg-purple-600/20", slug: "professional", subs: [] },
  { icon: <Car className="w-4 h-4" />, label: "Automotive", color: "text-cyan-400", bg: "bg-cyan-600/20", slug: "automotive", subs: [] },
  { icon: <Plane className="w-4 h-4" />, label: "Travel", color: "text-sky-400", bg: "bg-sky-600/20", slug: "travel", subs: [] },
];

const resourcesSections = [
  {
    heading: "Support",
    items: [
      { icon: <Clock className="w-4 h-4" />, label: "Contact Us", desc: "24/5 live + 24/7 AI support", to: "/talk-to-sales", color: "text-brand-400", border: "group-hover:border-brand-500/40" },
      { icon: <RefreshCw className="w-4 h-4" />, label: "Help Center", desc: "Step-by-step guides", to: "/help-center", color: "text-brand-400", border: "group-hover:border-brand-500/40" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { icon: <Video className="w-4 h-4" />, label: "Video Guides", desc: "Master business messaging", to: "/resources", color: "text-brand-400", border: "group-hover:border-brand-500/40" },
      { icon: <Rss className="w-4 h-4" />, label: "Blog", desc: "Growth playbooks & case studies", to: "/blog", color: "text-orange-400", border: "group-hover:border-orange-500/40" },
      { icon: <Code2 className="w-4 h-4" />, label: "Developer Hub", desc: "Guides & documentation", to: "/resources", color: "text-brand-400", border: "group-hover:border-brand-500/40" },
    ],
  },
  {
    heading: "Tools",
    items: [
      { icon: <Calculator className="w-4 h-4" />, label: "WhatsApp Pricing Calculator", desc: "Calculate WA messaging costs", to: "/tools/whatsapp-pricing", color: "text-green-400", border: "group-hover:border-green-500/40" },
      { icon: <Link2 className="w-4 h-4" />, label: "WhatsApp Link Generator", desc: "Create WA link & QR instantly", to: "/tools/whatsapp-link-generator", color: "text-green-400", border: "group-hover:border-green-500/40" },
    ],
  },
  {
    heading: "Partners",
    items: [
      { icon: <Award className="w-4 h-4" />, label: "Partner Program", desc: "Earn commissions for referrals", to: "/resources", color: "text-slate-300", border: "group-hover:border-white/20" },
    ],
  },
];

/* ─── SLIDE PANEL ────────────────────────────────────────── */

type SlideView = "main" | "product" | "industries" | "resources";

export const MobileMenu = ({ onClose }: Props) => {
  const { t } = useI18n();
  const [view, setView] = useState<SlideView>("main");
  const [animating, setAnimating] = useState(false);

  const navigate = (next: SlideView) => {
    if (animating) return;
    setAnimating(true);
    setView(next);
    setTimeout(() => setAnimating(false), 320);
  };

  const slideClass = (target: SlideView) => {
    if (view === target) return "translate-x-0 opacity-100";
    if (target === "main") return "-translate-x-full opacity-0 pointer-events-none";
    return "translate-x-full opacity-0 pointer-events-none";
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#080c14] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/[0.07] shrink-0">
        {view !== "main" ? (
          <button
            onClick={() => navigate("main")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t("mobile.back")}</span>
          </button>
        ) : (
          <img src="/img/logo/axodesk-new-logo-dark.png" alt="OmniChat" className="h-8 w-auto object-contain" />
        )}

        {view !== "main" && (
          <span className="text-sm font-semibold text-white absolute left-1/2 -translate-x-1/2">
            {view === "product" ? t("nav.product") : view === "industries" ? t("nav.industries") : t("nav.resources")}
          </span>
        )}

        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sliding panels container */}
      <div className="relative flex-1 overflow-hidden">

        {/* ── MAIN MENU ── */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${slideClass("main")}`}>
          <div className="px-4 pt-4 pb-2 space-y-1">

            {/* Product */}
            <button
              onClick={() => navigate("product")}
              className="w-full flex items-center justify-between px-3 py-3.5 text-left text-white font-semibold rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{t("mobile.product")}</p>
                  <p className="text-xs text-slate-500">{t("mobile.productDesc")}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Industries */}
            <button
              onClick={() => navigate("industries")}
              className="w-full flex items-center justify-between px-3 py-3.5 text-left text-white font-semibold rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{t("mobile.industries")}</p>
                  <p className="text-xs text-slate-500">{t("mobile.industriesDesc")}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Resources */}
            <button
              onClick={() => navigate("resources")}
              className="w-full flex items-center justify-between px-3 py-3.5 text-left text-white font-semibold rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-600/20 flex items-center justify-center">
                  <Rss className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{t("mobile.resources")}</p>
                  <p className="text-xs text-slate-500">{t("mobile.resourcesDesc")}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <div className="h-px bg-white/[0.06] my-2" />

            <Link to="/pricing" onClick={onClose} className="flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/[0.06] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                <Tag className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t("nav.pricing")}</p>
                <p className="text-xs text-slate-500">{t("mobile.pricingDesc")}</p>
              </div>
            </Link>

            <Link to="/why-us" onClick={onClose} className="flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/[0.06] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t("nav.whyUs")}</p>
                <p className="text-xs text-slate-500">{t("mobile.whyUsDesc")}</p>
              </div>
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="px-4 pt-4 pb-8 space-y-3 border-t border-white/[0.06] mt-4">
            <button className="w-full py-3 text-sm font-medium text-slate-300 border border-white/10 rounded-xl hover:bg-white/[0.06] transition-all">
              {t("nav.login")}
            </button>
            <Link to="/talk-to-sales" onClick={onClose} className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-300 border border-white/10 rounded-xl hover:bg-white/[0.06] transition-all">
              <Phone className="w-4 h-4" />
              {t("nav.talkToSales")}
            </Link>
            <Link to="/" onClick={onClose} className="block w-full py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-500 transition-all text-center">
              {t("nav.startFreeTrial")}
            </Link>
          </div>
        </div>

        {/* ── PRODUCT ── */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${slideClass("product")}`}>
          <div className="px-4 pt-4 pb-8 space-y-5">

            {/* Quick link */}
            <Link to="/features" onClick={onClose} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-brand-600/10 border border-brand-600/20 text-brand-400 text-sm font-semibold">
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> View full platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {productSections.map((sec) => (
              <div key={sec.label}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 px-1 ${sec.accent}`}>{sec.label}</p>
                <div className="space-y-1">
                  {sec.items.map((item: any) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${sec.bg} ${sec.accent} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                          {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${sec.bg} ${sec.accent} shrink-0`}>{item.badge}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-white/[0.06] flex gap-2">
              <Link to="/pricing" onClick={onClose} className="flex-1 py-2.5 text-center text-xs font-semibold text-slate-400 border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all">Pricing</Link>
              <Link to="/" onClick={onClose} className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-500 transition-all">Start Free Trial</Link>
            </div>
          </div>
        </div>

        {/* ── INDUSTRIES ── */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${slideClass("industries")}`}>
          <div className="px-4 pt-4 pb-8 space-y-1">

            {/* Quick link */}
            <Link to="/industry" onClick={onClose} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-purple-600/10 border border-purple-600/20 text-purple-400 text-sm font-semibold mb-3">
              <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> All Industries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {industries.map((ind) => (
              <div key={ind.slug}>
                {ind.subs.length > 0 ? (
                  /* Industry with subcategories — show inline subs */
                  <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-2">
                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-3 py-3 ${ind.bg}`}>
                      <div className={`w-8 h-8 rounded-lg bg-white/10 ${ind.color} flex items-center justify-center shrink-0`}>{ind.icon}</div>
                      <p className={`text-sm font-bold ${ind.color}`}>{ind.label}</p>
                    </div>
                    {/* Subcategories */}
                    <div className="py-1">
                      {ind.subs.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors group"
                        >
                          <div className={`w-6 h-6 rounded-lg ${ind.bg} ${ind.color} flex items-center justify-center shrink-0`}>{sub.icon}</div>
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{sub.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Industry without subcategories */
                  <Link
                    to={`/industry/${ind.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors group mb-1"
                  >
                    <div className={`w-8 h-8 rounded-xl ${ind.bg} ${ind.color} flex items-center justify-center shrink-0`}>{ind.icon}</div>
                    <p className="text-sm font-semibold text-white flex-1">{ind.label}</p>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-slate-600 text-center mb-3">Don&#39;t see your industry? OmniChat works for any B2C business.</p>
              <Link to="/talk-to-sales" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-500 transition-all">
                Talk to Sales <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── RESOURCES ── */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${slideClass("resources")}`}>
          <div className="px-4 pt-4 pb-8 space-y-6">

            {resourcesSections.map((section) => (
              <div key={section.heading}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-1">{section.heading}</p>
                <div className="space-y-1">
                  {section.items.map((item: any) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 transition-colors ${item.border} ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-white/[0.06] flex gap-2">
              <Link to="/blog" onClick={onClose} className="flex-1 py-2.5 text-center text-xs font-semibold text-slate-400 border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all">Visit Blog</Link>
              <Link to="/talk-to-sales" onClick={onClose} className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-500 transition-all">Talk to Sales</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
