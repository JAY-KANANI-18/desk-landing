import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Info, ArrowRight,
  MessageSquare, Phone, Zap, Shield, Tag, ShoppingBag, Key, Wrench, ChevronLeft, ChevronRight
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const regions = [
  { name: "India", authRate: 0.0040, authIntlRate: 0.0054, utilityRate: 0.0042, marketingRate: 0.0082, callRate: 0.0082 },
  { name: "United States", authRate: 0.0050, authIntlRate: 0.0060, utilityRate: 0.0055, marketingRate: 0.0125, callRate: 0.0150 },
  { name: "Brazil", authRate: 0.0350, authIntlRate: 0.0350, utilityRate: 0.0075, marketingRate: 0.1625, callRate: 0.0630 },
  { name: "United Kingdom", authRate: 0.0312, authIntlRate: 0.0312, utilityRate: 0.0072, marketingRate: 0.0997, callRate: 0.0480 },
  { name: "Germany", authRate: 0.0395, authIntlRate: 0.0395, utilityRate: 0.0130, marketingRate: 0.1525, callRate: 0.0530 },
  { name: "Indonesia", authRate: 0.0062, authIntlRate: 0.0062, utilityRate: 0.0040, marketingRate: 0.0554, callRate: 0.0125 },
  { name: "Mexico", authRate: 0.0265, authIntlRate: 0.0265, utilityRate: 0.0063, marketingRate: 0.0625, callRate: 0.0380 },
  { name: "Nigeria", authRate: 0.0100, authIntlRate: 0.0100, utilityRate: 0.0058, marketingRate: 0.0640, callRate: 0.0200 },
  { name: "Saudi Arabia", authRate: 0.0220, authIntlRate: 0.0220, utilityRate: 0.0082, marketingRate: 0.0840, callRate: 0.0350 },
  { name: "Egypt", authRate: 0.0120, authIntlRate: 0.0120, utilityRate: 0.0060, marketingRate: 0.0500, callRate: 0.0280 },
];

const messagingFaqs = [
  { q: "What are message templates?", a: "Message templates are pre-approved messages required to start a conversation on WhatsApp Business API when the customer hasn&#39;t messaged you first within the 24-hour customer service window. They must be submitted to and approved by Meta, and are used for: marketing, transactional and utility, authentication, service notifications." },
  { q: "What are utility messages?", a: "Utility messages are transactional notifications sent outside the 24-hour customer service window. Examples include order confirmations, payment receipts, shipping updates, appointment reminders, and account notifications. They cost less than marketing messages." },
  { q: "What are authentication messages?", a: "Authentication messages are used for one-time passwords (OTPs) and verification codes. These are essential for user verification flows and are priced separately from other template types, usually at lower rates." },
  { q: "What are marketing messages?", a: "Marketing messages include promotional offers, product announcements, customer re-engagement campaigns, and any non-transactional template content. These are the most flexible template type but carry the highest per-message rate." },
  { q: "What are free-form messages on WhatsApp?", a: "Free-form messages (also called session messages) are sent within the 24-hour customer service window after a customer initiates contact. These messages are completely free — no per-message charge applies, making it cost-effective to handle support conversations." },
  { q: "What is a customer service window?", a: "When a user messages your business, a 24-hour customer service window opens. Within this window, you can send any type of free-form message back. When the window expires, only approved template messages can resume the conversation." },
  { q: "How are businesses charged for inbound messages?", a: "Inbound messages (messages sent by customers to your business) are completely free — there is no charge to receive messages on WhatsApp Business API." },
  { q: "How are businesses charged for outbound messages?", a: "Outbound messages are charged based on template type (authentication, utility, marketing) and the recipient&#39;s country or region. The charge is per message sent, and you&#39;re only billed for delivered messages." },
  { q: "How do I calculate the cost of using WhatsApp Business API?", a: "Multiply the number of each template type sent by the per-message rate for the destination country/region. Sum all template categories (authentication + utility + marketing). Free-form session messages are always free. Our calculator above automates this calculation for you." },
];

const callingFaqs = [
  { q: "How are businesses charged for inbound WhatsApp calls?", a: "All incoming (inbound) calls for your business are completely free — businesses are never billed for inbound calls. When a user initiates a call to your business, there are no usage charges. Only outbound calls (business-to-customer) are charged." },
  { q: "Are incoming WhatsApp calls really free for businesses?", a: "Yes, 100% free. WhatsApp Business Calling API does not charge for incoming calls. This means customers can call your support team, sales team, or any business number at no API cost to your business." },
  { q: "How are businesses charged for outgoing calls on WhatsApp Business API?", a: "Outgoing calls are charged per minute in 1-second increments. The rate varies by the called party&#39;s country/region and whether it is a consumer-initiated or business-initiated calling. Monthly volume discounts may apply at scale." },
  { q: "When does billing start for an outgoing call?", a: "Billing starts when the called party answers — you are not charged for calls that ring but are not answered. This ensures you only pay for actual connected call time." },
  { q: "Are there any setup fees or additional charges for WhatsApp Calls?", a: "No setup fees, no monthly minimums, no per-number charges. You only pay for the actual call minutes your business uses each month. Standard WhatsApp Business API subscription costs from your BSP may apply." },
  { q: "How do volume-based discounts work?", a: "At higher call volumes (typically 10,000+ minutes/month), negotiated volume pricing becomes available. Contact our sales team to discuss a custom rate card tailored to your expected call volume and regions." },
  { q: "Can I call a customer anytime?", a: "No — WhatsApp Business Calling follows similar rules to messaging. You can only initiate a call to a customer who has previously interacted with your business or opted-in to receive calls. The 24-hour service window applies." },
  { q: "Which regions support WhatsApp Business Calling API?", a: "WhatsApp Calling API is gradually expanding. Currently available in select regions including India, parts of Southeast Asia, and select Latin American countries. Availability varies — check the Meta Business documentation for the latest supported regions list." },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmtUSD(n: number) {
  return n.toFixed(2);
}

// ─── Slider ─────────────────────────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  tooltip: string;
  rate: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  cost: number;
  color?: string;
}

const SliderRow = ({ label, tooltip, rate, value, onChange, max = 100000, cost, color = "bg-brand-600" }: SliderRowProps) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-white">{label}</span>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-slate-500 cursor-help" />
            <div className="absolute left-5 -top-1 z-10 w-56 bg-[#1a1f32] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 leading-relaxed hidden group-hover:block shadow-xl">
              {tooltip}
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-400">{rate}/message</span>
      </div>
      <div className="relative mb-2">
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
          <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range" min={0} max={max} step={100} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08]">
          <MessageSquare className="w-3 h-3 text-brand-400" />
          <span className="text-xs font-semibold text-white">{value.toLocaleString()} messages</span>
        </div>
        <span className="text-sm font-bold text-white">${fmtUSD(cost)}</span>
      </div>
    </div>
  );
};

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

const FaqAccordion = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all ${open === i ? "border-brand-600/30 bg-brand-600/[0.04]" : "border-white/[0.07] bg-white/[0.02]"}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
          >
            <span className="text-sm font-semibold text-white">{faq.q}</span>
            {open === i
              ? <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
              : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            }
          </button>
          {open === i && (
            <div className="px-5 pb-5 border-t border-white/[0.06]">
              <p className="text-sm text-slate-400 leading-relaxed pt-4" dangerouslySetInnerHTML={{ __html: faq.a }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Template Types Section ──────────────────────────────────────────────────

const templateTypes = [
  {
    key: "marketing",
    label: "Marketing",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "#f59e0b",
    colorClass: "text-amber-400",
    borderClass: "border-amber-400/40",
    bgClass: "bg-amber-400/10",
    activeBg: "bg-amber-400/15 border-amber-400/40",
    description: "Promotional offers, product launches, re-engagement campaigns, seasonal sales, and any business-initiated outreach to drive revenue.",
    charged: true,
    chargeNote: "Charged per template message sent",
    bullets: [
      "Promotional offers & discounts",
      "Product announcements & launches",
      "Re-engagement & win-back campaigns",
      "Seasonal & flash-sale campaigns",
      "Customer loyalty programs",
    ],
    preview: {
      senderName: "OmniChat Store",
      senderColor: "#f59e0b",
      badge: "Marketing Template",
      badgeColor: "#f59e0b",
      headerImg: true,
      body: "🛍️ Hey Sarah! Your exclusive *20% OFF* offer expires tonight.\n\nShop our latest Summer Collection before it sells out.",
      footer: "Reply STOP to unsubscribe",
      cta: "Shop Now →",
      ctaColor: "#f59e0b",
      promoCode: "SUMMER20",
    },
  },
  {
    key: "utility",
    label: "Utility",
    icon: <Wrench className="w-5 h-5" />,
    color: "#06b6d4",
    colorClass: "text-cyan-400",
    borderClass: "border-cyan-400/40",
    bgClass: "bg-cyan-400/10",
    activeBg: "bg-cyan-400/15 border-cyan-400/40",
    description: "Transactional notifications triggered by a user action — order confirmations, shipping updates, payment receipts, appointment reminders.",
    charged: true,
    chargeNote: "Charged per template message sent",
    bullets: [
      "Order confirmations & receipts",
      "Shipping & delivery updates",
      "Payment confirmation / failure",
      "Appointment & booking reminders",
      "Subscription renewal notices",
    ],
    preview: {
      senderName: "ShipTrack",
      senderColor: "#06b6d4",
      badge: "Utility Template",
      badgeColor: "#06b6d4",
      headerImg: false,
      body: "📦 Your order *#ORD-2847* has been shipped!\n\nExpected delivery: *Tomorrow by 6 PM*\nCarrier: BlueDart\nTracking: BD928472",
      footer: "Reply HELP for support",
      cta: "Track Package →",
      ctaColor: "#06b6d4",
      promoCode: null,
    },
  },
  {
    key: "authentication",
    label: "Authentication",
    icon: <Key className="w-5 h-5" />,
    color: "#8b5cf6",
    colorClass: "text-purple-400",
    borderClass: "border-purple-400/40",
    bgClass: "bg-purple-400/10",
    activeBg: "bg-purple-400/15 border-purple-400/40",
    description: "One-time passwords (OTPs), login verification codes, and identity confirmation messages for secure account access.",
    charged: true,
    chargeNote: "Charged per template message sent",
    bullets: [
      "Login one-time passwords (OTP)",
      "Account registration verification",
      "2-factor authentication codes",
      "Password reset confirmation",
      "Transaction authorization codes",
    ],
    preview: {
      senderName: "SecureApp",
      senderColor: "#8b5cf6",
      badge: "Authentication Template",
      badgeColor: "#8b5cf6",
      headerImg: false,
      body: "🔐 Your OmniChat verification code is:\n\n*847 293*\n\nThis code expires in 10 minutes. Never share this code with anyone.",
      footer: "Didn&#39;t request this? Ignore.",
      cta: "Copy Code",
      ctaColor: "#8b5cf6",
      promoCode: null,
    },
  },
  {
    key: "service",
    label: "Service / Free-form",
    icon: <Tag className="w-5 h-5" />,
    color: "#22c55e",
    colorClass: "text-green-400",
    borderClass: "border-green-400/40",
    bgClass: "bg-green-400/10",
    activeBg: "bg-green-400/15 border-green-400/40",
    description: "Free-form messages sent within the 24-hour customer service window after a user initiates contact. No template approval required — completely free.",
    charged: false,
    chargeNote: "FREE — within 24-hour service window",
    bullets: [
      "Customer support replies",
      "Live agent conversations",
      "Any message within 24h window",
      "No template approval needed",
      "Unlimited message types & formats",
    ],
    preview: {
      senderName: "Support Team",
      senderColor: "#22c55e",
      badge: "Free-form Message",
      badgeColor: "#22c55e",
      headerImg: false,
      body: "Hi James! 👋 Thanks for reaching out.\n\nI can see your order #2847 was placed yesterday. Let me check the status for you right now — give me just a moment!",
      footer: null,
      cta: null,
      ctaColor: "#22c55e",
      promoCode: null,
    },
  },
];

// WhatsApp message bubble renderer
const WhatsAppPreview = ({ type }: { type: typeof templateTypes[0] }) => {
  const p = type.preview;
  const lines = p.body.split("\n");

  const renderLine = (line: string, idx: number) => {
    const parts = line.split(/(\*[^*]+\*)/g);
    return (
      <span key={idx}>
        {parts.map((part, pi) =>
          part.startsWith("*") && part.endsWith("*")
            ? <strong key={pi} className="font-bold text-[#111b21]">{part.slice(1, -1)}</strong>
            : <span key={pi}>{part}</span>
        )}
        {idx < lines.length - 1 && <br />}
      </span>
    );
  };

  return (
    <div className="relative w-full max-w-[280px] mx-auto select-none">
      {/* Phone frame */}
      <div className="relative bg-[#e5ddd5] rounded-[2rem] overflow-hidden shadow-2xl" style={{ minHeight: 480 }}>
        {/* Status bar */}
        <div className="bg-[#075e54] px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: p.senderColor }}>
              {p.senderName[0]}
            </div>
            <div>
              <p className="text-white text-[11px] font-semibold leading-tight">{p.senderName}</p>
              <p className="text-green-200 text-[9px]">Business Account · Online</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="p-3 space-y-2" style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c8c8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
          {/* Date stamp */}
          <div className="text-center">
            <span className="text-[10px] bg-black/10 text-[#54656f] px-2 py-0.5 rounded-full">TODAY</span>
          </div>

          {/* Message bubble */}
          <div className="flex justify-end">
            <div className="relative max-w-[220px]">
              {/* Template badge */}
              <div className="flex items-center gap-1 mb-1 justify-end">
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: p.badgeColor + "dd" }}>
                  {p.badge}
                </span>
              </div>
              <div className="bg-[#dcf8c6] rounded-[12px] rounded-tr-[4px] overflow-hidden shadow-sm">
                {/* Header image mock */}
                {p.headerImg && (
                  <div className="w-full h-24 flex items-center justify-center text-2xl" style={{ background: `linear-gradient(135deg, ${p.senderColor}33, ${p.senderColor}66)` }}>
                    🛍️
                  </div>
                )}

                <div className="px-2.5 py-2">
                  <p className="text-[11px] text-[#111b21] leading-relaxed whitespace-pre-line">
                    {lines.map((line, i) => renderLine(line, i))}
                  </p>

                  {p.promoCode && (
                    <div className="mt-2 p-1.5 rounded-lg bg-white/60 border border-black/10 text-center">
                      <p className="text-[9px] text-[#54656f]">Promo Code</p>
                      <p className="text-[13px] font-bold tracking-widest" style={{ color: p.senderColor }}>{p.promoCode}</p>
                    </div>
                  )}

                  {p.footer && (
                    <p className="text-[9px] text-[#54656f] mt-1.5 italic">{p.footer}</p>
                  )}

                  <div className="flex justify-end mt-1">
                    <span className="text-[9px] text-[#54656f]">9:41 AM ✓✓</span>
                  </div>
                </div>

                {p.cta && (
                  <div className="border-t border-black/10 px-3 py-2 text-center" style={{ background: "rgba(255,255,255,0.4)" }}>
                    <span className="text-[11px] font-semibold" style={{ color: p.senderColor }}>{p.cta}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing label */}
          <div className="flex justify-center mt-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border ${type.charged ? "bg-red-500/10 border-red-400/30 text-red-400" : "bg-green-500/10 border-green-400/30 text-green-400"}`}>
              {type.charged ? "💰 " : "✅ "}
              {type.chargeNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateTypesSection = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % templateTypes.length);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setActive(idx);
    startAuto();
  };

  const prev = () => goTo((active - 1 + templateTypes.length) % templateTypes.length);
  const next = () => goTo((active + 1) % templateTypes.length);

  const current = templateTypes[active];

  return (
    <div className="mb-20">
      {/* Section header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Tag className="w-3.5 h-3.5" />
          Template Pricing Guide
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Which templates are charged?</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          WhatsApp Business API charges vary by template category. Understand what&#39;s charged and what&#39;s free before you estimate your monthly bill.
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0d1120] overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_320px]">

          {/* Left — info panel */}
          <div className="p-8 lg:p-10">
            {/* Tab pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {templateTypes.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${active === i ? `${t.activeBg} text-white` : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]"}`}
                  style={active === i ? { borderColor: t.color + "44" } : {}}
                >
                  <span style={{ color: active === i ? t.color : undefined }}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content — animated */}
            <div key={current.key} style={{ animation: "fadeSlideUp 0.35s ease both" }}>
              {/* Charge badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold mb-6 ${current.charged ? "bg-red-500/[0.08] border-red-400/25 text-red-400" : "bg-green-500/[0.08] border-green-400/25 text-green-400"}`}>
                {current.charged
                  ? <><AlertTriangle className="w-4 h-4" /> Charged per message sent</>
                  : <><CheckCircle2 className="w-4 h-4" /> Completely FREE</>}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3" style={{ color: current.color }}>{current.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">{current.description}</p>

              <div className="space-y-2.5">
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: current.color + "22" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: current.color }} />
                    </div>
                    <span className="text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: b }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <button onClick={prev} className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {templateTypes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{ background: active === i ? current.color : "rgba(255,255,255,0.15)", width: active === i ? 24 : 6 }}
                  />
                ))}
              </div>
              <button onClick={next} className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500 ml-2">{active + 1} / {templateTypes.length}</span>
            </div>
          </div>

          {/* Right — WhatsApp phone preview */}
          <div className="hidden lg:flex items-center justify-center p-8 border-l border-white/[0.06]" style={{ background: `linear-gradient(135deg, ${current.color}08, transparent 60%)` }}>
            <div key={current.key} style={{ animation: "fadeSlideUp 0.4s ease both" }}>
              <WhatsAppPreview type={current} />
            </div>
          </div>
        </div>

        {/* Mobile preview strip */}
        <div className="lg:hidden border-t border-white/[0.06] p-6 flex justify-center" style={{ background: `linear-gradient(135deg, ${current.color}08, transparent)` }}>
          <div key={`mob-${current.key}`} style={{ animation: "fadeSlideUp 0.4s ease both" }}>
            <WhatsAppPreview type={current} />
          </div>
        </div>
      </div>

      {/* Quick pricing bar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {templateTypes.map(t => (
          <div
            key={t.key}
            onClick={() => goTo(templateTypes.indexOf(t))}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${active === templateTypes.indexOf(t) ? t.activeBg : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}
            style={active === templateTypes.indexOf(t) ? { borderColor: t.color + "44" } : {}}
          >
            <div className="flex items-center gap-2 mb-2" style={{ color: t.color }}>
              {t.icon}
              <span className="text-xs font-bold text-white">{t.label}</span>
            </div>
            <p className={`text-xs font-semibold ${t.charged ? "text-red-400" : "text-green-400"}`}>
              {t.charged ? "● Charged" : "● Free"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Messaging Calculator ────────────────────────────────────────────────────

const MessagingCalculator = () => {
  const [regionIdx, setRegionIdx] = useState(0);
  const [authMsgs, setAuthMsgs] = useState(0);
  const [authIntlMsgs, setAuthIntlMsgs] = useState(0);
  const [utilityMsgs, setUtilityMsgs] = useState(0);
  const [marketingMsgs, setMarketingMsgs] = useState(0);

  const r = regions[regionIdx];
  const authCost = authMsgs * r.authRate;
  const authIntlCost = authIntlMsgs * r.authIntlRate;
  const utilityCost = utilityMsgs * r.utilityRate;
  const marketingCost = marketingMsgs * r.marketingRate;
  const total = authCost + authIntlCost + utilityCost + marketingCost;

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
      {/* Left — Explainer */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Calculate your WhatsApp Business messaging costs</h2>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/[0.08] border border-green-500/20 mb-6">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-300">All incoming messages are free</p>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          The WhatsApp Business API Calculator is a useful tool for estimating the cost of using the WhatsApp Business Platform (API). The estimate helps you understand your approximate monthly WhatsApp messaging costs.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          As of July 1, 2025, Meta switched from a per-conversation-based to a template-based pricing model, making it simpler to forecast your monthly costs.
        </p>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-600/[0.08] border border-brand-600/20 mb-6">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p className="text-sm text-brand-300">You are only billed for outgoing template messages. All incoming user-initiated messages are completely free.</p>
        </div>

        <p className="text-slate-300 text-sm font-semibold mb-3">How to classify a template message?</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["Marketing", "Utility", "Authentication"].map(t => (
            <span key={t} className="px-3 py-1 rounded-lg bg-[#25b865]/20 border border-[#25b865]/30 text-[#25b865] text-xs font-semibold">{t}</span>
          ))}
        </div>

        <ul className="space-y-2 mb-8">
          {[
            "Businesses are only charged per delivered template message.",
            "Marketing: promotional messages, updates, including to customers that started the conversation.",
            "Utility: transaction messages, including alerts, to customers that started the conversation.",
            "Non-delivered templates are not billed, counter resets at the start of each month.",
          ].map((it, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{it}</span>
            </li>
          ))}
        </ul>

        {/* 24-Hour Window Info */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
          <h3 className="text-base font-bold text-white mb-3">Understanding the 24-Hour Customer Service Window</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            When a user messages your business, a 24-hour customer service window opens. Within this window, you can send any type of message and they&#39;re completely free.
          </p>
          <ul className="space-y-2">
            {[
              { color: "bg-green-500", text: "Free-form messages and utility template messages are free" },
              { color: "bg-amber-500", text: "Marketing and authentication template messages are charged" },
            ].map((it, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <span className={`w-2 h-2 rounded-full shrink-0 ${it.color}`} />
                {it.text}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 mt-4 text-[11px] italic">
            Once a window closes, you can only send approved template messages — utility, authentication, or marketing — to re-engage.
          </p>
        </div>

        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">The prices listed are subject to change by Meta and may vary based on the customer&#39;s location. For the latest rates, refer to Meta&#39;s official pricing page.</p>
        </div>
      </div>

      {/* Right — Calculator Card */}
      <div className="sticky top-28">
        <div className="rounded-2xl border border-white/[0.09] bg-[#0d1120] overflow-hidden scan-glow">
          <div className="p-6 border-b border-white/[0.07]">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Country or Region</label>
            <div className="relative">
              <select
                value={regionIdx}
                onChange={e => setRegionIdx(Number(e.target.value))}
                className="w-full appearance-none bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white font-medium pr-10 focus:outline-none focus:border-brand-600/50"
              >
                {regions.map((r, i) => (
                  <option key={r.name} value={i} className="bg-[#0d1120]">{r.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="p-6 space-y-1">
            <SliderRow
              label="Authentication Template"
              tooltip="OTP and verification code messages sent to users authenticating into your platform."
              rate={`$${r.authRate.toFixed(4)}`}
              value={authMsgs} onChange={setAuthMsgs}
              max={100000} cost={authCost}
            />
            <SliderRow
              label="Auth — International Template"
              tooltip="Authentication templates sent to international numbers outside the user&#39;s home country billing region."
              rate={`$${r.authIntlRate.toFixed(4)}`}
              value={authIntlMsgs} onChange={setAuthIntlMsgs}
              max={100000} cost={authIntlCost}
              color="bg-purple-600"
            />
            <SliderRow
              label="Utility Template"
              tooltip="Transactional messages like order confirmations, shipping updates, payment receipts."
              rate={`$${r.utilityRate.toFixed(4)}`}
              value={utilityMsgs} onChange={setUtilityMsgs}
              max={100000} cost={utilityCost}
              color="bg-cyan-600"
            />
            <SliderRow
              label="Marketing Template"
              tooltip="Promotional campaigns, re-engagement messages, and offer notifications."
              rate={`$${r.marketingRate.toFixed(4)}`}
              value={marketingMsgs} onChange={setMarketingMsgs}
              max={100000} cost={marketingCost}
              color="bg-green-600"
            />
          </div>

          <div className="px-6 py-5 border-t border-white/[0.07] bg-white/[0.02]">
            <p className="text-xs text-slate-500 mb-1">Estimated total</p>
            <p className="text-4xl font-bold text-white">${fmtUSD(total)}</p>
            <p className="text-xs text-slate-500 mt-1">per month</p>
          </div>

          <div className="px-6 pb-5">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              To get the most accurate pricing, check the Meta pricing sheet or the WhatsApp rate card on their documentation pages. *Prices are in USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Calling Calculator ──────────────────────────────────────────────────────

const CallingCalculator = () => {
  const [regionIdx, setRegionIdx] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const r = regions[regionIdx];
  const total = minutes * r.callRate;

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Calculate your WhatsApp Business Calling API costs</h2>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/[0.08] border border-green-500/20 mb-6">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-300">All incoming (inbound) calls are free — only charged to outgoing calls</p>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Use this calculator to find out your WhatsApp Business Calling API costs including outgoing call charges so you can plan your monthly calling spend.
        </p>

        <p className="text-slate-300 text-sm font-semibold mb-3">Outgoing call pricing is based on:</p>
        <ul className="space-y-2 mb-8">
          {[
            "Call duration: Charged in 1-second increments, rounded up.",
            "Recipient&#39;s country or region — rates vary by destination.",
            "Monthly volume: The more minutes you spend, the lower the cost per minute. Tiers reset at the start of each month.",
          ].map((it, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400" dangerouslySetInnerHTML={{
              __html: `<span class="w-4 h-4 text-brand-400 shrink-0 mt-0.5 inline-block">✓</span>&nbsp;${it}`
            }} />
          ))}
        </ul>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">Rates are as set by Meta and may change. For the most up-to-date calling rates, refer to the official Meta documentation.</p>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          For messaging costs, use the WhatsApp API messages pricing calculator above.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          To manage your WhatsApp messages, calls, templates and listings in one place, try OmniChat — an official WhatsApp Business Solution Provider.
        </p>

        {/* Calling support info */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-xs font-semibold text-amber-300">Calling API is NOT available in some countries. Based on WhatsApp&#39;s policy, calling is restricted in:</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-slate-400">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Call type</p>
              <p>Inbound</p>
              <p>User-initiated Outbound</p>
              <p>Business-initiated Outgoing</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">WhatsApp-to-WhatsApp cost</p>
              <p>$0 (Free)</p>
              <p className="text-xs text-slate-400">INF, <span className="text-white">KSA</span>, <br />Syria, <br />Pakistan, <span className="text-white">Turkey</span></p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Business-initiated Outgoing</p>
              <p className="text-xs text-slate-400">Restricted in:<br /><span className="text-white">Turkey</span><br />Pakistan<br />Iran<br />Syria<br />Egypt<br />Nigeria</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="sticky top-28">
        <div className="rounded-2xl border border-white/[0.09] bg-[#0d1120] overflow-hidden scan-glow">
          <div className="p-6 border-b border-white/[0.07]">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Country or Region</label>
            <div className="relative">
              <select
                value={regionIdx}
                onChange={e => setRegionIdx(Number(e.target.value))}
                className="w-full appearance-none bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white font-medium pr-10 focus:outline-none focus:border-brand-600/50"
              >
                {regions.map((r, i) => (
                  <option key={r.name} value={i} className="bg-[#0d1120]">{r.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">Minutes per month</span>
                <div className="relative group">
                  <Info className="w-3.5 h-3.5 text-slate-500 cursor-help" />
                  <div className="absolute left-5 -top-1 z-10 w-56 bg-[#1a1f32] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 leading-relaxed hidden group-hover:block shadow-xl">
                    Estimated total outbound call minutes for one month. Billing is 1-second increments.
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400">${r.callRate.toFixed(4)}/min</span>
            </div>
            <div className="relative mb-2">
              <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${Math.round((minutes / 50000) * 100)}%` }} />
              </div>
              <input
                type="range" min={0} max={50000} step={100} value={minutes}
                onChange={e => setMinutes(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <Phone className="w-3 h-3 text-brand-400" />
                <span className="text-xs font-semibold text-white">{minutes.toLocaleString()} minutes</span>
              </div>
              <span className="text-sm font-bold text-white">${fmtUSD(total)}</span>
            </div>
          </div>

          <div className="px-6 py-5 border-t border-white/[0.07] bg-white/[0.02]">
            <p className="text-xs text-slate-500 mb-1">Estimated total</p>
            <p className="text-4xl font-bold text-white">${fmtUSD(total)}</p>
            <p className="text-xs text-slate-500 mt-1">per month</p>
          </div>

          <div className="px-6 pb-5">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              To get the most accurate pricing, check the Meta pricing sheet or your BSP&#39;s rate card directly. *Prices are in USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export const WhatsAppPricingPage = () => {
  useSEO({
    title: "WhatsApp Business API Pricing Calculator 2025 — Free Tool | OmniChat",
    description: "Calculate your exact WhatsApp Business API messaging and calling costs by country. Understand marketing, utility, and authentication template pricing from Meta. Free calculator, no sign-up.",
    canonical: "https://omnichat.io/whatsapp-pricing",
    ogImage: "https://omnichat.io/og-wa-pricing.png",
    keywords: "WhatsApp business API pricing, WhatsApp messaging cost calculator, WhatsApp template pricing 2025, Meta WhatsApp API cost, WhatsApp marketing message cost, WhatsApp utility message price, WhatsApp calling API pricing, WhatsApp BSP pricing calculator",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "WhatsApp API Pricing", url: "/whatsapp-pricing" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "WhatsApp Business API Pricing Calculator",
        "description": "Free tool to calculate WhatsApp Business API messaging and calling costs by country and message type.",
        "url": "https://omnichat.io/whatsapp-pricing"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does WhatsApp Business API cost?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp Business API pricing is per-template message and varies by country and template type (marketing, utility, authentication). Marketing messages cost the most; authentication the least. Inbound messages and session replies are free." } },
          { "@type": "Question", "name": "Are inbound WhatsApp messages free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all inbound WhatsApp messages from customers to your business are completely free. You are only charged for outbound template messages." } },
          { "@type": "Question", "name": "What is the difference between utility and marketing WhatsApp templates?", "acceptedAnswer": { "@type": "Answer", "text": "Utility templates are transactional (order confirmations, shipping updates, appointment reminders). Marketing templates are promotional (offers, campaigns, re-engagement). Marketing messages cost more per message than utility messages." } },
          { "@type": "Question", "name": "Are WhatsApp calling API calls free?", "acceptedAnswer": { "@type": "Answer", "text": "Inbound (customer to business) calls are free. Outbound calls are charged per minute based on the recipient country." } }
        ]
      }
    ],
  });

  const [tab, setTab] = useState<"messaging" | "calling">("messaging");

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-green-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6">

        {/* ── Hero ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
            <img src="https://cdn.simpleicons.org/whatsapp/25d366" alt="WhatsApp" className="w-3.5 h-3.5" />
            WhatsApp API Pricing
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight max-w-3xl mx-auto">
            WhatsApp Business API{" "}
            <span className="text-gradient">Pricing Calculator</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {tab === "messaging"
              ? "Estimate your monthly WhatsApp messaging costs and plan your budget with ease."
              : "Plan your WhatsApp calling budget with accurate monthly cost estimates."}
          </p>

          {/* Tab toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl">
            <button
              onClick={() => setTab("messaging")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "messaging" ? "bg-[#25d366] text-white shadow-lg shadow-green-500/20" : "text-slate-400 hover:text-white"}`}
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Messaging API
            </button>
            <button
              onClick={() => setTab("calling")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "calling" ? "bg-[#25d366] text-white shadow-lg shadow-green-500/20" : "text-slate-400 hover:text-white"}`}
            >
              <Phone className="w-4 h-4" />
              WhatsApp Calling API
            </button>
          </div>
        </div>

        {/* ── Calculator section ── */}
        <div className="mb-20">
          {tab === "messaging" ? <MessagingCalculator /> : <CallingCalculator />}
        </div>

        {/* ── Template Types Guide ── */}
        <TemplateTypesSection />

        {/* ── Why OmniChat for WhatsApp ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3">Battle-tested on WhatsApp</p>
            <h2 className="text-3xl font-bold text-white">Maximize your messaging efficiency</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="w-5 h-5 text-amber-400" />, iconBg: "bg-amber-400/10 border-amber-400/20",
                title: "Respond within 24 hours",
                desc: "Leverage the free 24-hour service window to handle high-volume support without template costs. Our smart inbox ensures no customer is left waiting.",
              },
              {
                icon: <CheckCircle2 className="w-5 h-5 text-green-400" />, iconBg: "bg-green-400/10 border-green-400/20",
                title: "Send templates with guardrails",
                desc: "OmniChat validates your template type before sending — automatically routing marketing, utility, and auth messages to correct template categories so you&#39;re never over-billed.",
              },
              {
                icon: <Shield className="w-5 h-5 text-brand-400" />, iconBg: "bg-brand-400/10 border-brand-400/20",
                title: "Leverage free entry points",
                desc: "Drive conversations via Click-to-WhatsApp Ads and Facebook Page CTAs — these open free 72-hour service windows, letting you reply with any message at zero template cost.",
              },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] card-hover">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.desc }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <FaqAccordion faqs={tab === "messaging" ? messagingFaqs : callingFaqs} />
        </div>

        {/* ── CTA ── */}
        <div className="rounded-3xl border border-brand-600/20 bg-gradient-to-br from-brand-600/15 via-purple-600/5 to-transparent p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 shimmer-bg pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-5">
              🚀 3x Your Business Results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start messaging at the lowest cost
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              OmniChat helps you manage every WhatsApp conversation, template, and automation — all in one place. No extra per-message markup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <Link to="/pricing" className="px-8 py-4 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
