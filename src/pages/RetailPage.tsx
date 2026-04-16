import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingBag, ArrowRight, ChevronRight, CheckCircle2, TrendingUp,
  MessageSquare, Zap, Sparkles, Star, Users, BarChart3,
  Cpu, Shirt, Sofa, Watch, LayoutGrid, ShoppingCart,
  Tag, Repeat, Globe, Bot, Package, Heart, Award, RefreshCw,
  Clock, Shield, Phone
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

/* ─── SUBCATEGORY DATA ───────────────────────────────────── */
const subcategories: Record<string, {
  icon: React.ReactNode;
  label: string;
  accentRaw: string;
  color: string;
  bg: string;
  border: string;
  heroTitle: string;
  heroSub: string;
  heroImg: string;
  challenges: string[];
  solutions: { title: string; desc: string; icon: React.ReactNode; img?: string }[];
  metrics: { value: number; suffix: string; label: string }[];
  useCases: { title: string; desc: string; icon: React.ReactNode }[];
  testimonial: { quote: string; name: string; role: string; company: string };
}> = {
  overview: {
    icon: <LayoutGrid className="w-6 h-6" />,
    label: "Retail",
    accentRaw: "236,72,153",
    color: "text-pink-400",
    bg: "bg-pink-600/15",
    border: "border-pink-600/25",
    heroTitle: "Turn Every Conversation Into a Sale",
    heroSub: "AxoDesk powers retail businesses across electronics, fashion, furniture, and jewelry to sell more, support better, and retain customers — all from one inbox.",
    heroImg: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=500&fit=crop&auto=format",
    challenges: [
      "Customers reach you on WhatsApp, IG, Facebook, and email — all separately",
      "Cart abandonment with no automated recovery flow",
      "Post-order support overwhelms your small team",
      "Repeat purchase rate stays flat — no loyalty engagement",
    ],
    solutions: [
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Omnichannel Unified Inbox",
        desc: "All customer chats — WhatsApp, Instagram DMs, Facebook Messenger, live chat — in one inbox with full order context. No tab switching.",
        img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <ShoppingCart className="w-5 h-5" />,
        title: "Cart Recovery Automations",
        desc: "Trigger WhatsApp messages to customers who abandoned their cart — within minutes. Recover 25%+ more sales automatically.",
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Bot className="w-5 h-5" />,
        title: "AI Sales Agent",
        desc: "AI handles product questions, checks inventory, shares sizing guides, and recommends products 24/7 — so your team closes, not answers.",
        img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Tag className="w-5 h-5" />,
        title: "Flash Sale Broadcasts",
        desc: "Send targeted WhatsApp promotions to segmented customer lists. 98% open rate — far beyond email or SMS.",
        img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=320&fit=crop&auto=format",
      },
    ],
    metrics: [
      { value: 3, suffix: "×", label: "More Sales Converted" },
      { value: 45, suffix: "%", label: "Fewer Missed Chats" },
      { value: 92, suffix: "%", label: "Customer Satisfaction" },
      { value: 25, suffix: "h", label: "Saved Per Agent/Week" },
    ],
    useCases: [
      { title: "Order tracking via WhatsApp", desc: "Auto-send order status updates the moment they ship.", icon: <Package className="w-5 h-5" /> },
      { title: "Product catalog sharing", desc: "Share rich product cards with images & buy buttons in chat.", icon: <ShoppingBag className="w-5 h-5" /> },
      { title: "Post-purchase CSAT", desc: "Collect reviews & satisfaction scores automatically after delivery.", icon: <Star className="w-5 h-5" /> },
      { title: "Loyalty offer broadcasts", desc: "Re-engage buyers with exclusive member deals on WhatsApp.", icon: <Award className="w-5 h-5" /> },
      { title: "Return & refund handling", desc: "Automate return requests without agent intervention.", icon: <RefreshCw className="w-5 h-5" /> },
      { title: "Flash sale campaigns", desc: "Hit high-intent segments with time-limited offers in seconds.", icon: <Zap className="w-5 h-5" /> },
    ],
    testimonial: {
      quote: "We went from 2 agents handling 300+ daily WhatsApp chats manually to AxoDesk handling 80% automatically. Our CSAT jumped from 71% to 94%.",
      name: "Sarah Chen",
      role: "Head of E-commerce",
      company: "Lamarsa Coffee",
    },
  },
  electronics: {
    icon: <Cpu className="w-6 h-6" />,
    label: "Electronics Retail",
    accentRaw: "99,102,241",
    color: "text-indigo-400",
    bg: "bg-indigo-600/15",
    border: "border-indigo-600/25",
    heroTitle: "Sell Electronics Faster with Conversational Commerce",
    heroSub: "Help customers compare specs, check compatibility, and buy confidently — all over WhatsApp and live chat. Reduce returns and increase repeat purchases.",
    heroImg: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&h=500&fit=crop&auto=format",
    challenges: [
      "Customers need spec comparisons before buying — support gets overwhelmed",
      "High return rate from wrong product choices",
      "After-sales warranty and repair queries flood the team",
      "Competitors offer 24/7 chat — you don't",
    ],
    solutions: [
      {
        icon: <Bot className="w-5 h-5" />,
        title: "AI Product Advisor Bot",
        desc: "An AI that asks about usage, budget, and preferences — then recommends the right product from your catalog. Reduces pre-sale support by 60%.",
        img: "https://images.unsplash.com/photo-1593640408182-31c228b33b9e?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Package className="w-5 h-5" />,
        title: "Real-Time Stock Alerts",
        desc: "Let customers subscribe to back-in-stock WhatsApp alerts automatically. Recover demand you'd otherwise lose.",
        img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <RefreshCw className="w-5 h-5" />,
        title: "Warranty & Repair Flow",
        desc: "Automated chatbot guides customers through warranty claims and service booking — no calls, no queues.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Post-Sale Upsell Sequences",
        desc: "Auto-suggest accessories and protection plans after purchase via WhatsApp — add 15–25% to average order value.",
        img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=320&fit=crop&auto=format",
      },
    ],
    metrics: [
      { value: 60, suffix: "%", label: "Less Pre-Sale Support" },
      { value: 25, suffix: "%", label: "Higher Average Order" },
      { value: 35, suffix: "%", label: "Lower Return Rate" },
      { value: 4, suffix: "×", label: "More Repeat Purchases" },
    ],
    useCases: [
      { title: "Spec comparison assistant", desc: "AI answers technical questions instantly.", icon: <Cpu className="w-5 h-5" /> },
      { title: "Back-in-stock alerts", desc: "Auto-notify waiting customers on WhatsApp.", icon: <Package className="w-5 h-5" /> },
      { title: "Warranty claim automation", desc: "Self-service warranty flow with no agent needed.", icon: <Shield className="w-5 h-5" /> },
      { title: "Delivery tracking", desc: "Real-time order & shipment updates via chat.", icon: <Zap className="w-5 h-5" /> },
      { title: "Accessory upsell", desc: "Recommend bundles and add-ons post-purchase.", icon: <Tag className="w-5 h-5" /> },
      { title: "Customer reviews", desc: "Auto-request ratings after product delivery.", icon: <Star className="w-5 h-5" /> },
    ],
    testimonial: {
      quote: "Our electronics support team used to spend 70% of time answering 'does this work with X?' questions. AxoDesk's AI now handles all of it — our team focuses on actual sales.",
      name: "Ahmad Fauzi",
      role: "Customer Experience Lead",
      company: "TechZone Electronics",
    },
  },
  fashion: {
    icon: <Shirt className="w-6 h-6" />,
    label: "Fashion & Apparel",
    accentRaw: "236,72,153",
    color: "text-pink-400",
    bg: "bg-pink-600/15",
    border: "border-pink-600/25",
    heroTitle: "Fashion That Sells Itself Through Conversation",
    heroSub: "Give every shopper a personal stylist experience on WhatsApp and Instagram. Reduce returns, increase loyalty, and make every new collection launch a sold-out event.",
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop&auto=format",
    challenges: [
      "High return rates from incorrect sizing and shade selection",
      "Seasonal launch demand spikes drown your support team",
      "Instagram DMs go unanswered — losing warm purchase intent",
      "Low customer lifetime value — one-time buyers are the norm",
    ],
    solutions: [
      {
        icon: <Shirt className="w-5 h-5" />,
        title: "Virtual Stylist & Size Guide Bot",
        desc: "AI asks customers body type, style preferences, and occasion — then recommends outfits with product links. Reduces returns by up to 30%.",
        img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Bot className="w-5 h-5" />,
        title: "Instagram DM Auto-Responder",
        desc: "Instantly reply to DMs from product posts and story replies with catalog links — never let a warm lead go cold.",
        img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Tag className="w-5 h-5" />,
        title: "New Collection Launch Campaigns",
        desc: "Broadcast new arrivals to segmented WhatsApp lists. Build hype with early-access drops for VIP customers.",
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Repeat className="w-5 h-5" />,
        title: "Loyalty & Repeat Purchase Flows",
        desc: "Auto-send restock nudges, birthday discounts, and VIP tier upgrades via WhatsApp to drive repeat purchases.",
        img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=320&fit=crop&auto=format",
      },
    ],
    metrics: [
      { value: 30, suffix: "%", label: "Lower Return Rate" },
      { value: 3, suffix: "×", label: "More Repeat Purchases" },
      { value: 85, suffix: "%", label: "IG DM Response Rate" },
      { value: 40, suffix: "%", label: "Higher Customer LTV" },
    ],
    useCases: [
      { title: "Virtual try-on guidance", desc: "AI helps match styles to customer body type.", icon: <Shirt className="w-5 h-5" /> },
      { title: "New collection drops", desc: "Broadcast launches to high-intent WhatsApp audiences.", icon: <Tag className="w-5 h-5" /> },
      { title: "Return & exchange flow", desc: "Self-service returns reduce agent workload 50%.", icon: <RefreshCw className="w-5 h-5" /> },
      { title: "Influencer collab notifications", desc: "Alert VIP customers to limited-edition collab drops.", icon: <Star className="w-5 h-5" /> },
      { title: "Instagram DM product replies", desc: "Auto-link tagged products from IG posts.", icon: <Heart className="w-5 h-5" /> },
      { title: "Loyalty tier upgrades", desc: "Notify customers when they unlock new loyalty rewards.", icon: <Award className="w-5 h-5" /> },
    ],
    testimonial: {
      quote: "Our Instagram DMs used to be a mess — hours of manual replies daily. Now AxoDesk auto-qualifies every DM, shares size guides, and books styling calls. It&#39;s like having 3 extra staff.",
      name: "Priya Mehta",
      role: "Marketing Director",
      company: "Ayla Fashion",
    },
  },
  furniture: {
    icon: <Sofa className="w-6 h-6" />,
    label: "Furniture Retail",
    accentRaw: "234,179,8",
    color: "text-amber-400",
    bg: "bg-amber-600/15",
    border: "border-amber-600/25",
    heroTitle: "Simplify Big-Ticket Furniture Sales Over Chat",
    heroSub: "Guide customers from inspiration to purchase with personalized chat consultations. Handle delivery queries, assembly questions, and after-sales care — all in one inbox.",
    heroImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=500&fit=crop&auto=format",
    challenges: [
      "Long consideration cycle — customers need multiple touchpoints before buying",
      "Delivery coordination and scheduling creates high support load",
      "Assembly questions and after-sales care strain the team",
      "Hard to upsell accessories or room packages digitally",
    ],
    solutions: [
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Consultation Booking Flow",
        desc: "Let customers book free room design consultations directly via WhatsApp — no website needed. Sync with your calendar automatically.",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Package className="w-5 h-5" />,
        title: "Delivery Coordination Bot",
        desc: "Auto-confirm, reschedule, and track deliveries over WhatsApp. Reduce inbound delivery calls by 60%.",
        img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Bot className="w-5 h-5" />,
        title: "Assembly & Care Guide Bot",
        desc: "Automatically send assembly videos and care instructions after delivery. Handle FAQs without any agent involvement.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Tag className="w-5 h-5" />,
        title: "Room Package Upsells",
        desc: "After a sofa purchase, auto-suggest matching coffee tables and rugs via WhatsApp. Drive 20–30% more add-on revenue.",
        img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&h=320&fit=crop&auto=format",
      },
    ],
    metrics: [
      { value: 60, suffix: "%", label: "Fewer Delivery Calls" },
      { value: 25, suffix: "%", label: "More Accessories Sold" },
      { value: 2, suffix: "×", label: "More Consultations Booked" },
      { value: 88, suffix: "%", label: "CSAT After Delivery" },
    ],
    useCases: [
      { title: "Design consultation booking", desc: "Book free room design sessions via WhatsApp.", icon: <Sofa className="w-5 h-5" /> },
      { title: "Stock availability checks", desc: "Let customers check availability in real-time via chat.", icon: <Package className="w-5 h-5" /> },
      { title: "Delivery rescheduling", desc: "Self-service delivery changes — no calls needed.", icon: <Clock className="w-5 h-5" /> },
      { title: "Assembly video delivery", desc: "Auto-send assembly guides at the moment of delivery.", icon: <Zap className="w-5 h-5" /> },
      { title: "Room package suggestions", desc: "Upsell matching items based on purchase history.", icon: <Tag className="w-5 h-5" /> },
      { title: "Warranty & claim handling", desc: "Manage after-sales claims through automated flows.", icon: <Shield className="w-5 h-5" /> },
    ],
    testimonial: {
      quote: "Delivery coordination was our biggest pain — 40% of our support calls were about estimated arrival times. AxoDesk automated all of it. Our team now focuses on closing deals, not tracking trucks.",
      name: "Marco Rossi",
      role: "Operations Manager",
      company: "CasaLux Furniture",
    },
  },
  jewelry: {
    icon: <Watch className="w-6 h-6" />,
    label: "Jewelry & Watches",
    accentRaw: "168,85,247",
    color: "text-violet-400",
    bg: "bg-violet-600/15",
    border: "border-violet-600/25",
    heroTitle: "Sell Luxury Jewelry Through Premium Chat Experiences",
    heroSub: "High-value purchases demand personal attention. AxoDesk gives every jewelry customer a private, high-touch conversation experience — on WhatsApp, Instagram, and beyond.",
    heroImg: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=500&fit=crop&auto=format",
    challenges: [
      "High-value buyers expect personal, premium service — not generic chatbots",
      "Authentication queries and certification requests require expert handling",
      "Custom order and engraving inquiries need guided consultation flows",
      "Gifting season demand spikes overwhelm a small specialist team",
    ],
    solutions: [
      {
        icon: <Users className="w-5 h-5" />,
        title: "VIP Concierge Chat Routing",
        desc: "Route high-value leads to your top jewelry consultants automatically based on purchase intent signals. Every premium buyer gets a personal touch.",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Award className="w-5 h-5" />,
        title: "Custom Order Consultation Flow",
        desc: "Guide customers through custom engraving, sizing, and metal choices via a structured WhatsApp conversation. No emails, no back-and-forth.",
        img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Gifting Season Campaigns",
        desc: "Launch targeted broadcasts for Valentine&#39;s Day, Mother&#39;s Day and festive seasons to segmented high-intent audiences with curated gift guides.",
        img: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=500&h=320&fit=crop&auto=format",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Certificate & Authentication Delivery",
        desc: "Auto-send digital certificates, authenticity cards, and care guides via WhatsApp at the point of delivery. Build instant trust.",
        img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=320&fit=crop&auto=format",
      },
    ],
    metrics: [
      { value: 3, suffix: "×", label: "More Custom Orders" },
      { value: 50, suffix: "%", label: "Higher Gifting Season Sales" },
      { value: 95, suffix: "%", label: "VIP Customer Satisfaction" },
      { value: 2, suffix: "×", label: "Repeat Purchase Rate" },
    ],
    useCases: [
      { title: "Custom order consultations", desc: "Guided engraving & customization flows on WhatsApp.", icon: <Watch className="w-5 h-5" /> },
      { title: "VIP client routing", desc: "High-value buyers get personal consultant assignment.", icon: <Users className="w-5 h-5" /> },
      { title: "Gift guide broadcasts", desc: "Seasonal campaigns to high-intent buyer segments.", icon: <Heart className="w-5 h-5" /> },
      { title: "Certificate delivery", desc: "Auto-send authenticity docs post-purchase.", icon: <Award className="w-5 h-5" /> },
      { title: "Resize & repair booking", desc: "Self-service after-sales service scheduling.", icon: <RefreshCw className="w-5 h-5" /> },
      { title: "Loyalty VIP program", desc: "Exclusive early access drops for top customers.", icon: <Star className="w-5 h-5" /> },
    ],
    testimonial: {
      quote: "Our clients expect white-glove service. With AxoDesk, every WhatsApp inquiry gets a personal response with the right consultant — and our custom order consultations doubled.",
      name: "Layla Al-Hassan",
      role: "Brand Director",
      company: "Éclat Jewels",
    },
  },
};

/* ─── METRIC CARD ─────────────────────────────────────────── */
function MetricCard({ metric, accentRaw, textColor, delay }: {
  metric: { value: number; suffix: string; label: string };
  accentRaw: string; textColor: string; delay: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const count = useCountUp(metric.value, 1800, inView);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative overflow-hidden p-6 rounded-2xl text-center transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse at top, rgba(${accentRaw},0.1) 0%, rgba(${accentRaw},0.03) 60%, transparent 100%), #0a0f1e`,
        border: `1px solid rgba(${accentRaw},0.18)`,
        transitionDelay: `${delay}ms`,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        opacity: inView ? 1 : 0,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRaw},0.5), transparent)` }} />
      <div className={`text-5xl font-black mb-1.5 tabular-nums ${textColor}`}>{count}{metric.suffix}</div>
      <div className="text-sm text-slate-400 font-medium">{metric.label}</div>
    </div>
  );
}

/* ─── SOLUTION CARD ───────────────────────────────────────── */
function SolutionCard({ sol, accentRaw, textColor, bg, border, delay, inView }: {
  sol: { title: string; desc: string; icon: React.ReactNode; img?: string };
  accentRaw: string; textColor: string; bg: string; border: string;
  delay: number; inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({});

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        const r = cardRef.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ transform: `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`, boxShadow: `0 16px 40px rgba(${accentRaw},0.2)` });
      }}
      onMouseLeave={() => setTilt({})}
      style={{
        ...tilt,
        transition: (tilt as any).transform ? "all 0.15s ease" : "all 0.35s ease, opacity 0.7s ease",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? (tilt as any).transform ?? "translateY(0)" : "translateY(24px)",
      }}
      className={`rounded-2xl border ${border} overflow-hidden flex flex-col cursor-default`}
    >
      {sol.img && (
        <div className="h-44 overflow-hidden shrink-0">
          <img src={sol.img} alt={sol.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5 flex-1">
        <div className={`w-9 h-9 rounded-xl ${bg} ${textColor} flex items-center justify-center mb-3`}>{sol.icon}</div>
        <h3 className="font-bold text-white text-base mb-2">{sol.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{sol.desc}</p>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export const RetailPage = () => {
  const { sub } = useParams<{ sub?: string }>();
  const key = sub && subcategories[sub] ? sub : "overview";
  const data = subcategories[key];

  const subcatNav = [
    { key: "overview", label: "Overview", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { key: "electronics", label: "Electronics", icon: <Cpu className="w-3.5 h-3.5" /> },
    { key: "fashion", label: "Fashion & Apparel", icon: <Shirt className="w-3.5 h-3.5" /> },
    { key: "furniture", label: "Furniture", icon: <Sofa className="w-3.5 h-3.5" /> },
    { key: "jewelry", label: "Jewelry & Watches", icon: <Watch className="w-3.5 h-3.5" /> },
  ];

  const { ref: solRef, inView: solInView } = useInView({ threshold: 0.05 });

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">

      {/* ── Subcategory nav tabs ── */}
      <div className="sticky top-16 z-30 bg-[#080c14]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {subcatNav.map((s) => {
              const isActive = s.key === key;
              return (
                <Link
                  key={s.key}
                  to={s.key === "overview" ? "/industry/retail" : `/industry/retail/${s.key}`}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? `${data.bg} ${data.color} border border-current/30`
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.05]"
                  }`}
                >
                  {s.icon}
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 pt-12 mb-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at left top, rgba(${data.accentRaw},0.15) 0%, transparent 60%)` }} />
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.07]">
          {/* Hero image */}
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img src={data.heroImg} alt={data.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(8,12,20,0.95) 35%, rgba(8,12,20,0.4) 100%)` }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-10 md:px-14 max-w-2xl">
                <AnimatedSection direction="fade">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${data.bg} border ${data.border} ${data.color} text-xs font-bold mb-5`}>
                    {data.icon}
                    <span>{data.label}</span>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={80} direction="up">
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-[1.08]">{data.heroTitle}</h1>
                </AnimatedSection>
                <AnimatedSection delay={160} direction="up">
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">{data.heroSub}</p>
                </AnimatedSection>
                <AnimatedSection delay={240} direction="up">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all text-sm w-fit">
                      Start Free Trial <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/talk-to-sales" className="flex items-center gap-2 px-6 py-3 border border-white/15 text-slate-300 hover:text-white hover:bg-white/[0.07] font-medium rounded-xl transition-all text-sm w-fit">
                      <Phone className="w-4 h-4" /> Talk to Sales
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Proven Results</p>
          <h2 className="text-3xl font-black text-white">What {data.label} businesses achieve with AxoDesk</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.metrics.map((m, i) => (
            <MetricCard key={i} metric={m} accentRaw={data.accentRaw} textColor={data.color} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <AnimatedSection direction="left">
            <div className="p-8 rounded-2xl border border-white/[0.07] h-full"
              style={{ background: `radial-gradient(ellipse at top left, rgba(${data.accentRaw},0.06) 0%, transparent 60%), #0a0f1e` }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">The Problem</p>
              <h2 className="text-2xl font-black text-white mb-6">Common challenges in {data.label}</h2>
              <ul className="space-y-4">
                {data.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-600/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">{i + 1}</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Testimonial */}
          <AnimatedSection direction="right">
            <div className="p-8 rounded-2xl border border-white/[0.07] h-full flex flex-col justify-between"
              style={{ background: `radial-gradient(ellipse at bottom right, rgba(${data.accentRaw},0.08) 0%, transparent 60%), #0a0f1e` }}
            >
              <div>
                <div className="flex gap-0.5 mb-5">
                  {[1,2,3,4,5].map(n => <Star key={n} className={`w-4 h-4 fill-current ${data.color}`} />)}
                </div>
                <blockquote className="text-white text-lg font-medium leading-relaxed mb-6">
                  &ldquo;{data.testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                <div className={`w-10 h-10 rounded-full ${data.bg} ${data.color} flex items-center justify-center font-bold text-sm`}>
                  {data.testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{data.testimonial.name}</p>
                  <p className="text-slate-500 text-xs">{data.testimonial.role} · {data.testimonial.company}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">How We Solve It</p>
          <h2 className="text-3xl font-black text-white">AxoDesk features built for {data.label}</h2>
        </AnimatedSection>
        <div
          ref={solRef as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {data.solutions.map((s, i) => (
            <SolutionCard
              key={s.title}
              sol={s}
              accentRaw={data.accentRaw}
              textColor={data.color}
              bg={data.bg}
              border={data.border}
              delay={i * 80}
              inView={solInView}
            />
          ))}
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Popular Use Cases</p>
          <h2 className="text-3xl font-black text-white">What {data.label} teams use AxoDesk for</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.useCases.map((uc, i) => (
            <AnimatedSection key={uc.title} delay={i * 60} direction="up">
              <div
                className="p-5 rounded-2xl border border-white/[0.07] hover:border-white/15 text-center transition-all duration-300 group cursor-default h-full flex flex-col items-center gap-3"
                style={{ background: `radial-gradient(ellipse at center, rgba(${data.accentRaw},0.05) 0%, transparent 70%), #0a0f1e` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px rgba(${data.accentRaw},0.15)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${data.accentRaw},0.35)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "";
                }}
              >
                <div className={`w-10 h-10 rounded-xl ${data.bg} ${data.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {uc.icon}
                </div>
                <div>
                  <p className="text-sm text-white font-semibold leading-snug mb-1">{uc.title}</p>
                  <p className="text-xs text-slate-500 leading-snug">{uc.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── IMAGE PLACEHOLDER SECTION ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Platform in Action</p>
          <h2 className="text-3xl font-black text-white">See AxoDesk working for {data.label}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dashboard screenshot placeholder */}
          <AnimatedSection direction="left">
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
              style={{ background: `radial-gradient(ellipse at top, rgba(${data.accentRaw},0.06) 0%, transparent 60%), #0a0f1e` }}
            >
              <div className="h-56 flex items-center justify-center border-b border-white/[0.06]"
                style={{ background: `radial-gradient(ellipse at center, rgba(${data.accentRaw},0.08) 0%, transparent 70%)` }}
              >
                <div className="text-center">
                  <div className={`w-14 h-14 rounded-2xl ${data.bg} ${data.color} flex items-center justify-center mx-auto mb-3`}>
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Dashboard Screenshot</p>
                  <p className="text-slate-600 text-xs mt-1">Analytics overview · your image here</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1.5">Real-Time {data.label} Analytics</h3>
                <p className="text-sm text-slate-400">Track revenue from chats, agent performance, response times, and customer satisfaction — all in one view.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Chat preview placeholder */}
          <AnimatedSection direction="right">
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
              style={{ background: `radial-gradient(ellipse at top, rgba(${data.accentRaw},0.06) 0%, transparent 60%), #0a0f1e` }}
            >
              <div className="h-56 flex items-center justify-center border-b border-white/[0.06]"
                style={{ background: `radial-gradient(ellipse at center, rgba(${data.accentRaw},0.08) 0%, transparent 70%)` }}
              >
                <div className="text-center">
                  <div className={`w-14 h-14 rounded-2xl ${data.bg} ${data.color} flex items-center justify-center mx-auto mb-3`}>
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Chat Flow Screenshot</p>
                  <p className="text-slate-600 text-xs mt-1">Inbox view · your image here</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1.5">AI-Powered {data.label} Conversations</h3>
                <p className="text-sm text-slate-400">Every WhatsApp, Instagram, and website chat in one thread — with customer history, order data, and AI suggestions.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6">
        <AnimatedSection direction="scale">
          <div className="relative overflow-hidden rounded-3xl border p-14 text-center"
            style={{
              borderColor: `rgba(${data.accentRaw},0.25)`,
              background: `radial-gradient(ellipse at center, rgba(${data.accentRaw},0.12) 0%, rgba(${data.accentRaw},0.04) 50%, transparent 80%), #0a0f1e`,
            }}
          >
            <div className="absolute inset-0 shimmer-bg pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${data.accentRaw},0.5), transparent)` }} />
            <div className="relative">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${data.bg} border ${data.border} ${data.color} text-xs font-bold mb-6`}>
                <Sparkles className="w-3 h-3" /> Ready to grow your {data.label} business?
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Start selling more through<br />
                <span className="text-shimmer">every conversation</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                Join 10,000+ {data.label.toLowerCase()} businesses using AxoDesk to convert chats into revenue.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all text-base">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/talk-to-sales" className="flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
                  <Phone className="w-4 h-4" /> Talk to Sales <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
};
