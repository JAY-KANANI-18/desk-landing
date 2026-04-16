import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  ShoppingBag, Home, GraduationCap, Heart, Landmark,
  Utensils, Car, Briefcase, CheckCircle2, ArrowRight,
  MessageSquare, TrendingUp, Zap, ChevronRight, Sparkles
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

const industryData: Record<string, {
  icon: React.ReactNode;
  label: string;
  short: string;
  color: string;
  textColor: string;
  bg: string;
  border: string;
  accentRaw: string;
  heroTitle: string;
  heroSub: string;
  challenges: string[];
  solutions: { title: string; desc: string; icon: React.ReactNode }[];
  metrics: { value: number; suffix: string; label: string }[];
  useCases: { title: string; icon: React.ReactNode }[];
}> = {
  ecommerce: {
    icon: <ShoppingBag className="w-6 h-6" />,
    label: "E-commerce & Retail",
    short: "E-commerce",
    color: "from-pink-600/20 to-pink-900/5",
    textColor: "text-pink-400",
    bg: "bg-pink-600/15",
    border: "border-pink-600/25",
    accentRaw: "236,72,153",
    heroTitle: "Turn Every Chat Into a Sale",
    heroSub: "Support customers, recover abandoned carts, and drive repeat purchases — all from one inbox.",
    challenges: ["High support ticket volume at scale", "Fragmented channels (IG DMs, WhatsApp, website)", "Cart abandonment with no recovery flow", "Post-order query overload on your team"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Unified Order Support", desc: "See order history and customer data right inside every conversation. No tab switching." },
      { icon: <Zap className="w-5 h-5" />, title: "Cart Recovery Automations", desc: "Trigger WhatsApp or SMS messages for abandoned carts automatically — within minutes." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Review & Feedback Collection", desc: "Auto-send CSAT surveys after order delivery to collect reviews and spot issues early." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Shopify & WooCommerce Sync", desc: "Pull live order data into AxoDesk without switching tools or copying links." },
    ],
    metrics: [
      { value: 3, suffix: "×", label: "More Sales Converted" },
      { value: 45, suffix: "%", label: "Less Missed Messages" },
      { value: 92, suffix: "%", label: "Customer Satisfaction" },
      { value: 25, suffix: "h", label: "Saved Per Agent/Week" },
    ],
    useCases: [
      { title: "Order tracking via WhatsApp", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Instagram DM product queries", icon: <Zap className="w-5 h-5" /> },
      { title: "Post-purchase feedback", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Loyalty program messaging", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Flash sale broadcasts", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  "real-estate": {
    icon: <Home className="w-6 h-6" />,
    label: "Real Estate",
    short: "Real Estate",
    color: "from-blue-600/20 to-blue-900/5",
    textColor: "text-blue-400",
    bg: "bg-blue-600/15",
    border: "border-blue-600/25",
    accentRaw: "59,130,246",
    heroTitle: "Close Deals Faster with Better Conversations",
    heroSub: "Engage leads from any channel, schedule viewings, and nurture prospects — all in one place.",
    challenges: ["Slow lead response loses deals to competitors", "Leads scattered across portals & DMs", "Scheduling property tours is manual & slow", "Cold leads that never get a follow-up"],
    solutions: [
      { icon: <Zap className="w-5 h-5" />, title: "Instant Lead Engagement", desc: "Auto-reply to every new lead in under 60 seconds — from any channel, including portals." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "Viewing Scheduler", desc: "Let prospects book property viewings directly in WhatsApp — no back-and-forth calls." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Lead Nurture Sequences", desc: "Automated follow-up workflows for leads who don't respond immediately. Never lose a lead." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Property Matching Bot", desc: "Ask qualifying questions and match buyers to the right listings — automatically." },
    ],
    metrics: [
      { value: 5, suffix: "×", label: "Faster Lead Response" },
      { value: 60, suffix: "%", label: "More Viewing Bookings" },
      { value: 80, suffix: "%", label: "Lead Follow-up Rate" },
      { value: 3, suffix: "×", label: "More Deals Closed" },
    ],
    useCases: [
      { title: "Property inquiry responses", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Virtual tour scheduling", icon: <Zap className="w-5 h-5" /> },
      { title: "Mortgage follow-ups", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Neighborhood guides via WA", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Agent assignment routing", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  education: {
    icon: <GraduationCap className="w-6 h-6" />,
    label: "Education",
    short: "Education",
    color: "from-yellow-600/20 to-yellow-900/5",
    textColor: "text-yellow-400",
    bg: "bg-yellow-600/15",
    border: "border-yellow-600/25",
    accentRaw: "234,179,8",
    heroTitle: "Engage Students from Inquiry to Enrollment",
    heroSub: "Handle admissions, support, and engagement across every channel your students use.",
    challenges: ["High inquiry volume during enrollment season", "WhatsApp-first student population", "Multiple departments, one confused student", "Low engagement rates on email campaigns"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Admissions Automation", desc: "Auto-respond to course inquiries and guide prospects through the application step by step." },
      { icon: <Zap className="w-5 h-5" />, title: "Student Support Inbox", desc: "Centralize queries from WhatsApp, email, and website chat for all admin teams at once." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Bulk Announcements", desc: "Send semester updates, fee reminders, and event invites to student segments in one click." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Department Routing", desc: "Auto-route queries to admissions, finance, or academic support based on message content." },
    ],
    metrics: [
      { value: 4, suffix: "×", label: "More Enrollments" },
      { value: 70, suffix: "%", label: "Faster Query Resolution" },
      { value: 55, suffix: "%", label: "Higher Engagement Rate" },
      { value: 2, suffix: "×", label: "Admin Efficiency Gain" },
    ],
    useCases: [
      { title: "Course inquiry responses", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Application status updates", icon: <Zap className="w-5 h-5" /> },
      { title: "Fee payment reminders", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Class schedule notifications", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Parent-teacher communication", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  healthcare: {
    icon: <Heart className="w-6 h-6" />,
    label: "Healthcare",
    short: "Healthcare",
    color: "from-red-600/20 to-red-900/5",
    textColor: "text-red-400",
    bg: "bg-red-600/15",
    border: "border-red-600/25",
    accentRaw: "239,68,68",
    heroTitle: "Patient Communication, Simplified",
    heroSub: "Reduce no-shows, improve care coordination, and give patients the responsive comms they expect.",
    challenges: ["Appointment no-shows cost revenue daily", "High call center volume from patients", "Post-visit follow-up gaps in care", "Fragmented communication with providers"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Appointment Reminders", desc: "Automated WhatsApp and SMS reminders reduce no-shows by up to 40% — proven." },
      { icon: <Zap className="w-5 h-5" />, title: "Post-Visit Follow-ups", desc: "Check in on patients, collect feedback, and share care instructions automatically." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Lab & Prescription Alerts", desc: "Proactively notify patients when results or prescriptions are ready for pickup." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Secure Patient Chat", desc: "HIPAA-friendly communication channels with end-to-end encryption standard." },
    ],
    metrics: [
      { value: 40, suffix: "%", label: "Fewer No-Shows" },
      { value: 65, suffix: "%", label: "Less Call Volume" },
      { value: 88, suffix: "%", label: "Patient Satisfaction" },
      { value: 30, suffix: "%", label: "Cost Reduction" },
    ],
    useCases: [
      { title: "Appointment booking via WhatsApp", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Lab result notifications", icon: <Zap className="w-5 h-5" /> },
      { title: "Post-discharge follow-ups", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Medication reminders", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Insurance query handling", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  finance: {
    icon: <Landmark className="w-6 h-6" />,
    label: "Financial Services",
    short: "Finance",
    color: "from-green-600/20 to-green-900/5",
    textColor: "text-green-400",
    bg: "bg-green-600/15",
    border: "border-green-600/25",
    accentRaw: "34,197,94",
    heroTitle: "Build Client Trust Through Better Communication",
    heroSub: "Respond faster, automate compliance workflows, and delight clients with proactive service.",
    challenges: ["Slow response to time-sensitive client queries", "Compliance & security concerns with messaging", "High onboarding friction and drop-off", "Low client engagement on campaigns"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Secure Client Messaging", desc: "End-to-end encrypted conversations that meet financial compliance standards out of the box." },
      { icon: <Zap className="w-5 h-5" />, title: "KYC & Onboarding Automation", desc: "Guide clients through onboarding with automated workflows and document collection flows." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Proactive Portfolio Alerts", desc: "Notify clients of important account activity via WhatsApp or SMS instantly." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Support Ticket Routing", desc: "Route queries to the right specialist based on product or inquiry type automatically." },
    ],
    metrics: [
      { value: 2, suffix: "×", label: "Faster Response Time" },
      { value: 50, suffix: "%", label: "Lower Onboarding Friction" },
      { value: 95, suffix: "%", label: "Client Satisfaction" },
      { value: 35, suffix: "%", label: "Support Cost Reduction" },
    ],
    useCases: [
      { title: "Loan application updates", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Account alert notifications", icon: <Zap className="w-5 h-5" /> },
      { title: "Tax document distribution", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Investment update broadcasts", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Client onboarding flows", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  food: {
    icon: <Utensils className="w-6 h-6" />,
    label: "Food & Restaurant",
    short: "Food & Dining",
    color: "from-orange-600/20 to-orange-900/5",
    textColor: "text-orange-400",
    bg: "bg-orange-600/15",
    border: "border-orange-600/25",
    accentRaw: "249,115,22",
    heroTitle: "From Order to Table, Seamlessly Connected",
    heroSub: "Handle reservations, delivery updates, and customer feedback in one unified inbox.",
    challenges: ["Phone-heavy reservation system", "Delivery query overload for your team", "Low repeat customer & loyalty rates", "Managing reviews across multiple channels"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "WhatsApp Reservations", desc: "Let customers book tables directly on WhatsApp with automated confirmations and reminders." },
      { icon: <Zap className="w-5 h-5" />, title: "Order Status Updates", desc: "Automated delivery tracking messages keep customers in the loop at every step." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Post-Visit Reviews", desc: "Auto-trigger review requests after dining to build your online reputation effortlessly." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Loyalty Campaigns", desc: "Target repeat customers with exclusive offers via WhatsApp broadcast — high open rates." },
    ],
    metrics: [
      { value: 3, suffix: "×", label: "More Repeat Orders" },
      { value: 55, suffix: "%", label: "Faster Order Response" },
      { value: 90, suffix: "%", label: "Reservation Fill Rate" },
      { value: 25, suffix: "×", label: "WhatsApp Open Rate" },
    ],
    useCases: [
      { title: "Table reservation via WhatsApp", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Delivery status messages", icon: <Zap className="w-5 h-5" /> },
      { title: "Menu sharing & promotions", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Post-visit feedback", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Loyalty offer broadcasts", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  automotive: {
    icon: <Car className="w-6 h-6" />,
    label: "Automotive",
    short: "Automotive",
    color: "from-cyan-600/20 to-cyan-900/5",
    textColor: "text-cyan-400",
    bg: "bg-cyan-600/15",
    border: "border-cyan-600/25",
    accentRaw: "6,182,212",
    heroTitle: "Drive More Sales with Better Conversations",
    heroSub: "Respond to test drive requests, book service appointments, and follow up with leads instantly.",
    challenges: ["Slow lead response from website & portals", "Service booking still done by phone", "Low repeat service visit rates", "High lead drop-off from ads"],
    solutions: [
      { icon: <Zap className="w-5 h-5" />, title: "Instant Lead Response", desc: "Auto-reply to every test drive inquiry in under 60 seconds from any channel or portal." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "Service Reminder Automation", desc: "Automatically notify customers when their vehicle service is due — and book it on WA." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Virtual Showroom Chat", desc: "Let prospects explore specs, pricing, and availability via WhatsApp chat flows." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Post-Sale Follow-ups", desc: "Stay connected after purchase to drive referrals, reviews, and repeat service." },
    ],
    metrics: [
      { value: 4, suffix: "×", label: "More Test Drives Booked" },
      { value: 45, suffix: "%", label: "More Service Bookings" },
      { value: 78, suffix: "%", label: "Lead Conversion Rate" },
      { value: 3, suffix: "×", label: "More Repeat Service Visits" },
    ],
    useCases: [
      { title: "Test drive booking", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Service appointment scheduling", icon: <Zap className="w-5 h-5" /> },
      { title: "Vehicle availability queries", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Insurance renewal reminders", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Trade-in value inquiries", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
  professional: {
    icon: <Briefcase className="w-6 h-6" />,
    label: "Professional Services",
    short: "Professionals",
    color: "from-purple-600/20 to-purple-900/5",
    textColor: "text-purple-400",
    bg: "bg-purple-600/15",
    border: "border-purple-600/25",
    accentRaw: "147,51,234",
    heroTitle: "Client Communication That Wins More Business",
    heroSub: "Modernize client intake, follow-ups, and project communications with one unified platform.",
    challenges: ["Slow and manual client intake processes", "Missed follow-ups cost you deals", "Multiple communication channels spread thin", "Hard to scale client services without chaos"],
    solutions: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Automated Client Intake", desc: "Collect requirements, documents, and details through guided WhatsApp conversations." },
      { icon: <Zap className="w-5 h-5" />, title: "Proposal & Quote Delivery", desc: "Send proposals via WhatsApp and track when they're viewed and responded to in real time." },
      { icon: <TrendingUp className="w-5 h-5" />, title: "Project Status Updates", desc: "Keep clients informed with automated milestone notifications — no micromanaging needed." },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Meeting Booking Links", desc: "Let clients book directly via WhatsApp link — no back-and-forth email chains." },
    ],
    metrics: [
      { value: 2, suffix: "×", label: "More Clients Onboarded" },
      { value: 60, suffix: "%", label: "Faster Proposal Close" },
      { value: 85, suffix: "%", label: "Client Satisfaction Score" },
      { value: 40, suffix: "%", label: "Admin Time Saved" },
    ],
    useCases: [
      { title: "Client onboarding workflows", icon: <MessageSquare className="w-5 h-5" /> },
      { title: "Contract signature reminders", icon: <Zap className="w-5 h-5" /> },
      { title: "Invoice & payment follow-ups", icon: <TrendingUp className="w-5 h-5" /> },
      { title: "Project update broadcasts", icon: <CheckCircle2 className="w-5 h-5" /> },
      { title: "Referral request automation", icon: <Sparkles className="w-5 h-5" /> },
    ],
  },
};

const industryList = Object.entries(industryData);

/* ── Animated metric card ── */
function MetricCard({ metric, accentRaw, textColor, delay }: {
  metric: { value: number; suffix: string; label: string };
  accentRaw: string;
  textColor: string;
  delay: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const count = useCountUp(metric.value, 1800, inView);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative overflow-hidden p-6 rounded-2xl text-center transition-all duration-700 cursor-default group"
      style={{
        background: `radial-gradient(ellipse at top, rgba(${accentRaw},0.1) 0%, rgba(${accentRaw},0.03) 60%, transparent 100%), #0a0f1e`,
        border: `1px solid rgba(${accentRaw},0.15)`,
        transitionDelay: `${delay}ms`,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        opacity: inView ? 1 : 0,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRaw},0.5), transparent)` }} />
      <div className={`text-5xl font-black mb-1.5 tabular-nums ${textColor}`}>
        {count}{metric.suffix}
      </div>
      <div className="text-sm text-slate-400 font-medium">{metric.label}</div>
    </div>
  );
}

/* ── Tilt solution card ── */
function SolutionCard({ sol, accentRaw, textColor, bg, border, delay, inView }: {
  sol: { title: string; desc: string; icon: React.ReactNode };
  accentRaw: string; textColor: string; bg: string; border: string;
  delay: number; inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`,
      boxShadow: `0 12px 40px rgba(${accentRaw},0.2)`,
    });
  };
  const onLeave = () => setStyle({});

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transition: (style as any).transform ? "all 0.15s ease" : "all 0.3s ease, opacity 0.7s ease, transform 0.7s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? (style as any).transform ?? "translateY(0)" : "translateY(20px)",
      }}
      className={`p-5 rounded-2xl border ${border} cursor-default h-full`}
      data-style-hack={style}
    >
      <div className={`w-10 h-10 rounded-xl ${bg} ${textColor} flex items-center justify-center mb-4`}>
        {sol.icon}
      </div>
      <h3 className="font-bold text-white mb-2">{sol.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{sol.desc}</p>
    </div>
  );
}

const industrySEO: Record<string, { title: string; desc: string; keywords: string }> = {
  ecommerce: {
    title: "E-commerce & Retail Messaging Platform — WhatsApp for Online Stores",
    desc: "Boost e-commerce sales with AxoDesk: unified WhatsApp + Instagram inbox, cart recovery automation, Shopify integration, and AI support. 3× more conversions. Start free.",
    keywords: "ecommerce whatsapp platform, shopify whatsapp integration, cart recovery whatsapp, online store customer messaging, retail omnichannel platform, instagram dm ecommerce",
  },
  "real-estate": {
    title: "Real Estate CRM & Messaging Platform — WhatsApp for Property Teams",
    desc: "Close more property deals with AxoDesk. Auto-respond to portal leads, book viewings via WhatsApp, and nurture cold prospects with automated sequences. 5× faster lead response.",
    keywords: "real estate whatsapp crm, property lead management, real estate messaging platform, viewing scheduler whatsapp, property portal lead response, real estate automation",
  },
  education: {
    title: "Education Messaging Platform — WhatsApp for Admissions & Student Support",
    desc: "Handle admissions inquiries, send fee reminders, and engage students on WhatsApp. AxoDesk helps education institutions automate multi-channel communication at scale.",
    keywords: "education whatsapp platform, student admissions automation, university whatsapp messaging, school parent communication platform, enrollment automation whatsapp",
  },
  healthcare: {
    title: "Healthcare Patient Messaging — WhatsApp Appointment Reminders & Alerts",
    desc: "Reduce no-shows by 40% with WhatsApp appointment reminders. AxoDesk enables secure, HIPAA-friendly patient communication across WhatsApp, SMS, and web chat.",
    keywords: "healthcare whatsapp messaging, patient appointment reminders, hospital messaging platform, clinic whatsapp automation, patient communication software, healthcare chatbot",
  },
  finance: {
    title: "Financial Services Messaging Platform — Secure Client Communication",
    desc: "Build client trust with faster, more secure messaging. AxoDesk powers KYC onboarding, portfolio alerts, and support routing for banks, fintechs, and financial advisors.",
    keywords: "financial services messaging, banking whatsapp platform, fintech customer communication, kyc onboarding automation, secure client messaging, wealth management messaging",
  },
  food: {
    title: "Restaurant & Food Business Messaging — WhatsApp Reservations & Orders",
    desc: "Let customers book tables and track orders via WhatsApp. AxoDesk helps restaurants, cloud kitchens, and food businesses automate reservations and drive repeat orders.",
    keywords: "restaurant whatsapp booking, food business messaging platform, table reservation whatsapp, cloud kitchen customer messaging, food delivery order updates",
  },
  automotive: {
    title: "Automotive Dealer Messaging Platform — WhatsApp for Car Sales & Service",
    desc: "Book more test drives and service appointments via WhatsApp. AxoDesk helps auto dealers respond to leads instantly and automate follow-up for service reminders.",
    keywords: "automotive whatsapp crm, car dealer messaging platform, test drive booking whatsapp, vehicle service reminder automation, auto dealer lead management",
  },
  professional: {
    title: "Professional Services Messaging — Client Communication for Agencies & Consultants",
    desc: "Automate client intake, send proposals, and manage project updates via WhatsApp. AxoDesk is the messaging platform for agencies, law firms, and consultants.",
    keywords: "professional services messaging, agency client communication, consultant whatsapp platform, law firm messaging software, client intake automation",
  },
};

export const IndustryPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const industry = slug && industryData[slug] ? industryData[slug] : null;
  const seo = slug ? industrySEO[slug] : null;

  useSEO(
    industry && seo
      ? {
          title: seo.title,
          description: seo.desc,
          canonical: `https://axodesk.in/industry/${slug}`,
          keywords: seo.keywords,
          breadcrumb: [
            { name: "Home", url: "/" },
            { name: "Industries", url: "/industry" },
            { name: industry.label, url: `/industry/${slug}` },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seo.title,
            "description": seo.desc,
            "url": `https://axodesk.in/industry/${slug}`,
          },
        }
      : {
          title: "AxoDesk for Every Industry — E-commerce, Healthcare, Real Estate & More",
          description: "AxoDesk serves 8+ industries with tailored omnichannel messaging. E-commerce, real estate, healthcare, education, finance, food service, automotive, and professional services.",
          canonical: "https://axodesk.in/industry",
          keywords: "omnichannel messaging by industry, WhatsApp for ecommerce, WhatsApp for real estate, WhatsApp for healthcare, customer communication by industry, industry-specific WhatsApp automation",
          breadcrumb: [
            { name: "Home", url: "/" },
            { name: "Industries", url: "/industry" },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AxoDesk Industry Solutions",
            "description": "Purpose-built omnichannel messaging solutions for every industry.",
            "url": "https://axodesk.in/industry"
          },
        }
  );

  /* ── OVERVIEW PAGE ── */
  if (!industry) {
    return (
      <div className="pt-24 pb-32 overflow-x-hidden">
        {/* Hero */}
        <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center mb-20 pt-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-600/8 rounded-full blur-[120px] pointer-events-none" />
          <AnimatedSection direction="fade">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-6 uppercase tracking-wide">
              <Sparkles className="w-3 h-3" /> Built for Every Industry
            </div>
          </AnimatedSection>
          <AnimatedSection delay={80} direction="up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05]">
              Your industry has unique needs.<br />
              <span className="text-shimmer">We understand them.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={180} direction="up">
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              AxoDesk is trusted by businesses across 8+ industries. Explore how we solve your specific communication challenges.
            </p>
          </AnimatedSection>
        </section>

        {/* Industry cards grid */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industryList.map(([key, ind], i) => (
              <IndustryCard key={key} slug={key} ind={ind} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection direction="scale" className="max-w-screen-xl mx-auto px-4 md:px-6 mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-brand-600/25 p-14 text-center"
            style={{ background: "radial-gradient(ellipse at center top, rgba(79,70,229,0.18) 0%, transparent 70%), #0a0f1e" }}
          >
            <div className="absolute inset-0 shimmer-bg pointer-events-none" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">Don&#39;t see your industry?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">AxoDesk works for any business that communicates with customers. Talk to our team to see a custom demo.</p>
              <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
                Talk to Sales <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  /* ── SPECIFIC INDUSTRY PAGE ── */
  const { ref: solRef, inView: solInView } = useInView({ threshold: 0.05 });

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">

      {/* HERO */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 mb-20 pt-10">
        <div
          className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at left top, rgba(${industry.accentRaw},0.2) 0%, transparent 60%)` }}
        />
        <div className="relative rounded-3xl border border-white/8 overflow-hidden p-12 md:p-16"
          style={{ background: `radial-gradient(ellipse at right center, rgba(${industry.accentRaw},0.08) 0%, transparent 60%), #0a0f1e` }}
        >
          {/* Accent top line */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${industry.accentRaw},0.6), transparent)` }} />

          <div className="max-w-3xl">
            <AnimatedSection direction="fade">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${industry.bg} border ${industry.border} ${industry.textColor} text-sm font-bold mb-6`}>
                {industry.icon}
                <span>{industry.label}</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={80} direction="up">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.05]">{industry.heroTitle}</h1>
            </AnimatedSection>

            <AnimatedSection delay={160} direction="up">
              <p className="text-slate-300 text-xl mb-10 max-w-2xl leading-relaxed">{industry.heroSub}</p>
            </AnimatedSection>

            <AnimatedSection delay={240} direction="up">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/" className="flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center gap-2 px-7 py-3.5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/8 font-medium rounded-xl transition-all">
                  Book a Demo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">Proven results</p>
          <h2 className="text-3xl font-black text-white">What our {industry.short} customers achieve</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industry.metrics.map((m, i) => (
            <MetricCard key={i} metric={m} accentRaw={industry.accentRaw} textColor={industry.textColor} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* CHALLENGES + SOLUTIONS */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Challenges */}
          <AnimatedSection direction="left">
            <div className="p-8 rounded-2xl border border-white/8 h-full"
              style={{ background: `radial-gradient(ellipse at top left, rgba(${industry.accentRaw},0.06) 0%, transparent 60%), #0a0f1e` }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">The problem</p>
              <h2 className="text-2xl font-black text-white mb-6">Common Challenges in {industry.short}</h2>
              <ul className="space-y-4">
                {industry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-600/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      {i + 1}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Solutions */}
          <div
            ref={solRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {industry.solutions.map((s, i) => (
              <SolutionCard
                key={s.title}
                sol={s}
                accentRaw={industry.accentRaw}
                textColor={industry.textColor}
                bg={industry.bg}
                border={industry.border}
                delay={i * 100}
                inView={solInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <AnimatedSection direction="up" className="text-center mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">Popular use cases</p>
          <h2 className="text-3xl font-black text-white">What {industry.short} teams use AxoDesk for</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {industry.useCases.map((uc, i) => (
            <AnimatedSection key={uc.title} delay={i * 80} direction="up">
              <div
                className="p-5 rounded-2xl border border-white/8 hover:border-white/15 text-center transition-all duration-300 group cursor-default h-full flex flex-col items-center gap-3"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(${industry.accentRaw},0.05) 0%, transparent 70%), #0a0f1e`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px rgba(${industry.accentRaw},0.15)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${industry.accentRaw},0.35)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "";
                }}
              >
                <div className={`w-10 h-10 rounded-xl ${industry.bg} ${industry.textColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {uc.icon}
                </div>
                <p className="text-sm text-slate-300 font-medium leading-snug">{uc.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-6">
        <AnimatedSection direction="scale">
          <div className="relative overflow-hidden rounded-3xl border p-14 text-center"
            style={{
              borderColor: `rgba(${industry.accentRaw},0.25)`,
              background: `radial-gradient(ellipse at center, rgba(${industry.accentRaw},0.12) 0%, rgba(${industry.accentRaw},0.04) 50%, transparent 80%), #0a0f1e`,
            }}
          >
            <div className="absolute inset-0 shimmer-bg pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${industry.accentRaw},0.5), transparent)` }} />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Transform {industry.short} communication<br />
                <span className="text-shimmer">starting today</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                Join hundreds of {industry.label.toLowerCase()} businesses using AxoDesk to grow faster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
                  Talk to Sales <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

/* ── Industry card for overview grid ── */
function IndustryCard({ slug, ind, index }: { slug: string; ind: typeof industryData[string]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const { ref, inView } = useInView({ threshold: 0.1 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`,
      boxShadow: `0 16px 50px rgba(${ind.accentRaw},0.2)`,
    });
  };
  const onLeave = () => setStyle({});

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <Link to={`/industry/${slug}`}>
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            ...style,
            background: `radial-gradient(ellipse at top left, rgba(${ind.accentRaw},0.08) 0%, transparent 60%), #0a0f1e`,
            transition: (style as any).transform ? "all 0.15s ease" : "all 0.3s ease",
          }}
          className={`p-6 rounded-2xl border ${ind.border} cursor-pointer group h-full flex flex-col`}
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${ind.accentRaw},0.4), transparent)` }} />

          <div className={`w-12 h-12 rounded-2xl ${ind.bg} ${ind.textColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
            {ind.icon}
          </div>

          <h3 className={`text-lg font-bold text-white mb-2 group-hover:${ind.textColor} transition-colors`}>{ind.label}</h3>
          <p className="text-sm text-slate-400 mb-5 leading-relaxed flex-1">{ind.heroSub}</p>

          <div className={`flex items-center gap-1 text-sm font-semibold ${ind.textColor}`}>
            Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
