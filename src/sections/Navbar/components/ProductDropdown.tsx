import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Inbox, Zap, Users, BarChart3, Tag, FileText, Webhook,
  MessageSquare, Bot, Phone, Mail, Globe, ChevronRight,
  Shield, Sparkles, ArrowRight
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const platformChannels = [
  { src: "https://cdn.simpleicons.org/whatsapp", alt: "WhatsApp" },
  { src: "https://cdn.simpleicons.org/instagram", alt: "Instagram" },
  { src: "https://cdn.simpleicons.org/messenger", alt: "Messenger" },
  { src: "https://cdn.simpleicons.org/gmail", alt: "Email" },
  { src: "https://cdn.simpleicons.org/telegram", alt: "Telegram" },
  { src: "https://cdn.simpleicons.org/googlechat", alt: "WebsiteChat" },
];

const sections = [
  {
    label: "Capture Leads",
    accent: "brand",
    accentRaw: "79,70,229",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    items: [
      { icon: <MessageSquare className="w-4 h-4" />, label: "Capture from Ads", desc: "Meta & Google Ads integration", badge: null },
      { icon: <Globe className="w-4 h-4" />, label: "Website Live Chat", desc: "Embeddable chat widget", badge: null },
      { icon: <Users className="w-4 h-4" />, label: "Social Capture", desc: "IG, FB, WA DMs", badge: null },
      { icon: <Tag className="w-4 h-4" />, label: "Offline to Online", desc: "QR codes & deep links", badge: null },
    ],
  },
  {
    label: "Convert Leads",
    accent: "emerald",
    accentRaw: "16,185,129",
    icon: <Zap className="w-3.5 h-3.5" />,
    items: [
      { icon: <Bot className="w-4 h-4" />, label: "AI Agents", desc: "Auto-qualify & respond", badge: "✨ New" },
      { icon: <Inbox className="w-4 h-4" />, label: "Team Inbox", desc: "Unified shared inbox", badge: null },
      { icon: <Users className="w-4 h-4" />, label: "Lead Scoring", desc: "Route & qualify automatically", badge: null },
      { icon: <Zap className="w-4 h-4" />, label: "Smart Routing", desc: "Assign to right agent/team", badge: null },
      { icon: <FileText className="w-4 h-4" />, label: "Appointment Booking", desc: "Calendar-based scheduling", badge: null },
    ],
  },
  {
    label: "Retain Customers",
    accent: "purple",
    accentRaw: "124,58,237",
    icon: <Users className="w-3.5 h-3.5" />,
    items: [
      { icon: <MessageSquare className="w-4 h-4" />, label: "Conversational Support", desc: "24/7 omnichannel support", badge: null },
      { icon: <Mail className="w-4 h-4" />, label: "Broadcast Campaigns", desc: "Promotions & newsletters", badge: null },
      { icon: <Zap className="w-4 h-4" />, label: "Renewal Reminders", desc: "Automated follow-up flows", badge: null },
      { icon: <BarChart3 className="w-4 h-4" />, label: "CSAT & NPS Surveys", desc: "Measure satisfaction scores", badge: null },
    ],
  },
  {
    label: "Scale",
    accent: "orange",
    accentRaw: "249,115,22",
    icon: <BarChart3 className="w-3.5 h-3.5" />,
    items: [
      { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics & Reports", desc: "Cross-channel deep insights", badge: null },
      { icon: <Phone className="w-4 h-4" />, label: "WA Calling API", desc: "Voice & video calls", badge: "Soon" },
      { icon: <Webhook className="w-4 h-4" />, label: "API & Webhooks", desc: "Build any integration", badge: null },
      { icon: <Shield className="w-4 h-4" />, label: "Security & Compliance", desc: "SOC2, GDPR, RBAC", badge: null },
    ],
  },
];

const accentClasses: Record<string, { text: string; bg: string; border: string }> = {
  brand:   { text: "text-brand-400",   bg: "bg-brand-600/15",   border: "border-brand-600/30"   },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-600/15", border: "border-emerald-600/30" },
  purple:  { text: "text-purple-400",  bg: "bg-purple-600/15",  border: "border-purple-600/30"  },
  orange:  { text: "text-orange-400",  bg: "bg-orange-600/15",  border: "border-orange-600/30"  },
};

type SectionItem = { icon: React.ReactNode; label: string; desc: string; badge: string | null };
type Section = typeof sections[0];
type Props = { onClose: () => void; fullWidth?: boolean };

export const ProductDropdown = ({ onClose, fullWidth }: Props) => {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);
  const ac = accentClasses[activeSection.accent];

  return (
    <div className="w-full bg-[#0a0e1a]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Top strip */}
   

        {/* Main grid */}
        <div className="flex py-4 gap-0">
          {/* Left: journey stage tabs */}
          <div className="w-48 shrink-0 pr-4 border-r border-white/[0.05]">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">{t("dropdown.product.journeyStages")}</p>
            {sections.map((sec) => {
              const isActive = sec.label === activeSection.label;
              const a = accentClasses[sec.accent];
              return (
                <button
                  key={sec.label}
                  onMouseEnter={() => setActiveSection(sec)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group mb-0.5 ${
                    isActive ? `${a.bg} border ${a.border}` : "border border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${isActive ? `${a.bg} ${a.text}` : "text-slate-500 bg-white/[0.05]"}`}>
                    {sec.icon}
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                    {sec.label}
                  </span>
                  {isActive && <ChevronRight className={`w-3 h-3 ml-auto shrink-0 ${a.text}`} />}
                </button>
              );
            })}

            {/* Channel pills */}
            <div className="mt-4 pt-3 border-t border-white/[0.05] px-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">{t("dropdown.product.channels")}</p>
              <div className="flex flex-wrap gap-2">
                {platformChannels.map((ch) => (
                  <div key={ch.alt} title={ch.alt} className="w-8 h-8  flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                    <img src={ch.src} alt={ch.alt} className="w-6 h-6 object-contain" />
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-[8px] text-slate-400 font-bold">+5</div>
              </div>
            </div>
          </div>

          {/* Center: item grid */}
          <div className="flex-1 px-6">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">{activeSection.label}</p>
            <div className="grid grid-cols-2 gap-1">
              {activeSection.items.map((item: SectionItem) => (
                <Link
                  key={item.label}
                  to="/features"
                  onClick={onClose}
                  className={`flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-150 group`}
                >
                  <div className={`w-8 h-8 rounded-xl ${ac.bg} ${ac.text} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${ac.bg} ${ac.text} shrink-0`}>{item.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: CTA panel */}
          {/* <div className="w-52 shrink-0 pl-4 border-l border-white/[0.05] flex flex-col gap-3">
            <div className={`flex-1 p-4 rounded-xl border ${ac.border} ${ac.bg} flex flex-col gap-2`}>
              <div className={`flex items-center gap-2 ${ac.text} mb-1`}>
                {activeSection.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{activeSection.label}</span>
              </div>
              {activeSection.items.slice(0, 3).map((item: SectionItem) => (
                <div key={item.label} className="flex items-center gap-2 py-1.5">
                  <span className={`${ac.text} shrink-0`}>{item.icon}</span>
                  <span className="text-xs text-slate-300 font-medium truncate">{item.label}</span>
                </div>
              ))}
              <div className="mt-auto pt-3 border-t border-white/[0.06]">
                <Link to="/features" onClick={onClose} className={`text-xs font-bold ${ac.text} flex items-center gap-1 hover:gap-2 transition-all`}>
                  {t("dropdown.product.exploreAll")} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-gradient-to-br from-brand-600/10 to-purple-600/8">
              <p className="text-xs font-bold text-white mb-1">{t("dropdown.product.trialTitle")}</p>
              <p className="text-[10px] text-slate-500 mb-3 leading-snug">{t("dropdown.product.trialDesc")}</p>
              <Link to="/" onClick={onClose} className="flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors group">
                {t("dropdown.product.getStarted")} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div> */}
        </div>

        {/* Footer */}
  
      </div>
    </div>
  );
};
