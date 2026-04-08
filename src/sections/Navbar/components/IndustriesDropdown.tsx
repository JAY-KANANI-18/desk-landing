import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag, GraduationCap, Heart, Briefcase, Car, Plane,
  ArrowRight, LayoutGrid, Cpu, Shirt, Sofa, Watch, ChevronRight,
  Home, Landmark, Utensils, BookOpen, Stethoscope, Scale,
  Building, Tag, Star
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

/* ─── TYPES ───────────────────────────────────────────────── */
interface SubItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

interface Industry {
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
  accentRaw: string;
  subs: SubItem[];
  featuredImg: string;
  featuredTitle: string;
  featuredStat: string;
  featuredCta: string;
  featuredTo: string;
}

/* ─── DATA ────────────────────────────────────────────────── */
const industries: Industry[] = [
  {
    icon: <ShoppingBag className="w-4 h-4" />,
    label: "Retail",
    color: "text-pink-400",
    bg: "bg-pink-600/15",
    accentRaw: "236,72,153",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/retail" },
      { icon: <Cpu className="w-4 h-4" />, label: "Electronics", to: "/industry/retail/electronics" },
      { icon: <Shirt className="w-4 h-4" />, label: "Fashion & Apparel", to: "/industry/retail/fashion" },
      { icon: <Sofa className="w-4 h-4" />, label: "Furniture", to: "/industry/retail/furniture" },
      { icon: <Watch className="w-4 h-4" />, label: "Jewelry and Watches", to: "/industry/retail/jewelry" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How Lamarsa Coffee Used Chat Commerce to Boost Sales Across 6 Countries by 50%",
    featuredStat: "+50% sales growth",
    featuredCta: "Read Customer Story",
    featuredTo: "/industry/retail",
  },
  {
    icon: <GraduationCap className="w-4 h-4" />,
    label: "Education",
    color: "text-yellow-400",
    bg: "bg-yellow-600/15",
    accentRaw: "234,179,8",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/education" },
      { icon: <BookOpen className="w-4 h-4" />, label: "Higher Education", to: "/industry/education" },
      { icon: <GraduationCap className="w-4 h-4" />, label: "K-12 Schools", to: "/industry/education" },
      { icon: <Star className="w-4 h-4" />, label: "Online Learning", to: "/industry/education" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How a University Boosted Enrollments by 4× with Automated WhatsApp Admissions",
    featuredStat: "+4× enrollments",
    featuredCta: "Read Case Study",
    featuredTo: "/industry/education",
  },
  {
    icon: <Heart className="w-4 h-4" />,
    label: "Healthcare",
    color: "text-red-400",
    bg: "bg-red-600/15",
    accentRaw: "239,68,68",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/healthcare" },
      { icon: <Stethoscope className="w-4 h-4" />, label: "Clinics & Hospitals", to: "/industry/healthcare" },
      { icon: <Heart className="w-4 h-4" />, label: "Telemedicine", to: "/industry/healthcare" },
      { icon: <Tag className="w-4 h-4" />, label: "Pharmacies", to: "/industry/healthcare" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How a Healthcare Network Reduced No-Shows by 40% Using WhatsApp Reminders",
    featuredStat: "-40% no-shows",
    featuredCta: "Read Case Study",
    featuredTo: "/industry/healthcare",
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "Professional Services",
    color: "text-purple-400",
    bg: "bg-purple-600/15",
    accentRaw: "147,51,234",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/professional" },
      { icon: <Scale className="w-4 h-4" />, label: "Legal & Law Firms", to: "/industry/professional" },
      { icon: <Building className="w-4 h-4" />, label: "Consulting", to: "/industry/professional" },
      { icon: <Landmark className="w-4 h-4" />, label: "Financial Services", to: "/industry/finance" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How a Law Firm Doubled Client Intake with Automated WhatsApp Onboarding",
    featuredStat: "2× more clients",
    featuredCta: "Read Case Study",
    featuredTo: "/industry/professional",
  },
  {
    icon: <Car className="w-4 h-4" />,
    label: "Automotive",
    color: "text-cyan-400",
    bg: "bg-cyan-600/15",
    accentRaw: "6,182,212",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/automotive" },
      { icon: <Car className="w-4 h-4" />, label: "Car Dealerships", to: "/industry/automotive" },
      { icon: <Tag className="w-4 h-4" />, label: "Auto Service Centers", to: "/industry/automotive" },
      { icon: <Star className="w-4 h-4" />, label: "Fleet Management", to: "/industry/automotive" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How a Dealership Chain Booked 4× More Test Drives Using WhatsApp Automation",
    featuredStat: "4× test drives",
    featuredCta: "Read Case Study",
    featuredTo: "/industry/automotive",
  },
  {
    icon: <Plane className="w-4 h-4" />,
    label: "Travel",
    color: "text-sky-400",
    bg: "bg-sky-600/15",
    accentRaw: "14,165,233",
    subs: [
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Overview", to: "/industry/travel" },
      { icon: <Plane className="w-4 h-4" />, label: "Travel Agencies", to: "/industry/travel" },
      { icon: <Home className="w-4 h-4" />, label: "Hotels & Resorts", to: "/industry/travel" },
      { icon: <Star className="w-4 h-4" />, label: "Tour Operators", to: "/industry/travel" },
    ],
    featuredImg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop&auto=format",
    featuredTitle: "How a Travel Agency Grew Bookings by 3× with Conversational Commerce on WhatsApp",
    featuredStat: "3× more bookings",
    featuredCta: "Read Case Study",
    featuredTo: "/industry/travel",
  },
];

/* ─── COMPONENT ────────────────────────────────────────────── */
type Props = { onClose: () => void };

export const IndustriesDropdown = ({ onClose }: Props) => {
  const { t } = useI18n();
  const [active, setActive] = useState<Industry>(industries[0]);

  return (
    <div className="w-full bg-[#0a0e1a]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex py-3 gap-0" style={{ minHeight: 300 }}>

          {/* ── LEFT: Category list ── */}
          <div className="w-52 shrink-0 pr-3 border-r border-white/[0.06] flex flex-col gap-0.5 py-1">
            {industries.map((ind) => {
              const isActive = active.label === ind.label;
              return (
                <button
                  key={ind.label}
                  onMouseEnter={() => setActive(ind)}
                  onClick={() => { onClose(); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                    isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                    {ind.label}
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* ── MIDDLE: Subcategories ── */}
          <div className="flex-1 px-6 py-1 flex flex-col gap-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 px-1">{active.label}</p>
            {active.subs.map((sub) => (
              <Link
                key={sub.label}
                to={sub.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-all duration-150 group"
              >
                <div className={`w-7 h-7 rounded-lg ${active.bg} ${active.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                  {sub.icon}
                </div>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{sub.label}</span>
              </Link>
            ))}
          </div>

          {/* ── RIGHT: Featured story ── */}
          <div className="w-72 shrink-0 pl-6 border-l border-white/[0.06] py-1 flex flex-col">
            <div className="rounded-xl overflow-hidden mb-4 shrink-0">
              <img
                src={active.featuredImg}
                alt={active.label}
                className="w-full h-36 object-cover transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex-1">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${active.bg} ${active.color} text-[10px] font-bold mb-3`}>
                <Star className="w-3 h-3" />
                {active.featuredStat}
              </div>
              <p className="text-sm font-bold text-white leading-snug mb-3">
                {active.featuredTitle}
              </p>
              <Link
                to={active.featuredTo}
                onClick={onClose}
                className={`inline-flex items-center gap-1.5 text-xs font-bold ${active.color} hover:opacity-80 transition-opacity group`}
              >
                {active.featuredCta}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between py-3 border-t border-white/[0.05]">
          <p className="text-xs text-slate-600">{t("dropdown.industries.noIndustry")}</p>
          <Link to="/talk-to-sales" onClick={onClose} className="flex items-center gap-2 px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-lg transition-all">
            {t("nav.talkToSales")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
