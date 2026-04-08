import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { AnimatedSection } from "../components/AnimatedSection";
import {
  Phone, Mail, MessageSquare, Globe, ChevronRight,
  Check, Star, Building2, Users, TrendingUp, Shield,
  Calendar, Clock, ArrowRight, Sparkles, Zap
} from "lucide-react";

const companySize = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const industries = [
  "E-commerce & Retail",
  "Real Estate",
  "Education",
  "Healthcare",
  "Finance & Banking",
  "Travel & Hospitality",
  "SaaS / Technology",
  "Other",
];

const goals = [
  { id: "inbox", label: "Unified Inbox", icon: MessageSquare },
  { id: "automation", label: "Automation & Bots", icon: Zap },
  { id: "analytics", label: "Analytics & Reports", icon: TrendingUp },
  { id: "team", label: "Team Collaboration", icon: Users },
  { id: "integrations", label: "CRM Integrations", icon: Globe },
  { id: "enterprise", label: "Enterprise Security", icon: Shield },
];

const testimonials = [
  {
    quote: "The sales team walked us through every use case for our industry. We were live within 48 hours.",
    name: "Sarah Chen",
    title: "Head of CX — Luxe Retail Group",
    avatar: "SC",
    color: "from-pink-500 to-rose-600",
  },
  {
    quote: "No pushy upsells. They genuinely understood our workflow and recommended exactly what we needed.",
    name: "Marcus Oliveira",
    title: "CTO — PropTech Solutions",
    avatar: "MO",
    color: "from-violet-500 to-brand-600",
  },
  {
    quote: "30-minute call turned into a full custom onboarding plan. Incredible experience.",
    name: "Priya Nair",
    title: "Operations Lead — EduFirst",
    avatar: "PN",
    color: "from-emerald-500 to-teal-600",
  },
];

const stats = [
  { value: "< 2h", label: "Avg. response time" },
  { value: "98%", label: "Customer satisfaction" },
  { value: "48h", label: "Time to go live" },
  { value: "24/7", label: "Enterprise support" },
];

export const TalkToSalesPage = () => {
  useSEO({
    title: "Talk to OmniChat Sales — Book a Free Demo | Omnichannel Platform",
    description: "Book a free 30-minute personalised demo with OmniChat's sales team. See how to unify WhatsApp, Instagram, and Email into one inbox — and get a custom pricing proposal for your team.",
    canonical: "https://omnichat.io/talk-to-sales",
    ogImage: "https://omnichat.io/og-sales.png",
    keywords: "OmniChat demo, book omnichannel demo, WhatsApp platform sales, OmniChat pricing custom, talk to sales omnichannel, enterprise messaging demo, customer communication platform demo",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Talk to Sales", url: "/talk-to-sales" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Talk to OmniChat Sales",
      "description": "Book a free personalised demo with OmniChat's sales team and get a custom pricing proposal.",
      "url": "https://omnichat.io/talk-to-sales",
      "contactOption": "TollFree",
      "contactType": "sales",
      "email": "sales@omnichat.io",
      "availableLanguage": ["English", "Arabic", "Spanish"]
    },
  });

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    industry: "",
    message: "",
  });
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection animation="fade" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Talk to a real human — no bots here
            </div>
          </AnimatedSection>

          <AnimatedSection animation="up" delay={80}>
            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight">
              Let&#39;s find the perfect{" "}
              <span className="text-gradient">plan for you</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="up" delay={140}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our sales team will walk you through OmniChat, help you understand what&#39;s right for your team, and get you up and running fast.
            </p>
          </AnimatedSection>

          {/* Stats row */}
          <AnimatedSection animation="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content: form + sidebar */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* ── Form Card ── */}
          <AnimatedSection animation="up" delay={60}>
            <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <Check className="w-9 h-9 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">You&#39;re all set!</h2>
                    <p className="text-slate-400 max-w-sm mx-auto">A member of our team will reach out within 2 business hours. Check your inbox for a calendar invite.</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Link to="/pricing" className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                      View Pricing
                    </Link>
                    <Link to="/" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-semibold text-white transition-all glow-brand-sm">
                      Back to Home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Tell us about yourself</h2>
                    <p className="text-sm text-slate-500">We&#39;ll use this to personalise your demo.</p>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "firstName", label: "First name", placeholder: "Jane" },
                      { name: "lastName", label: "Last name", placeholder: "Smith" },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{f.label} <span className="text-brand-400">*</span></label>
                        <input
                          name={f.name}
                          value={(formState as any)[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                          placeholder={f.placeholder}
                          required
                          className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 ${focused === f.name ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "email", label: "Work email", placeholder: "jane@company.com", type: "email" },
                      { name: "phone", label: "Phone number", placeholder: "+1 (555) 000-0000", type: "tel" },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{f.label} {f.name === "email" && <span className="text-brand-400">*</span>}</label>
                        <input
                          name={f.name}
                          type={f.type}
                          value={(formState as any)[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                          placeholder={f.placeholder}
                          required={f.name === "email"}
                          className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 ${focused === f.name ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Company + Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Company name <span className="text-brand-400">*</span></label>
                      <input
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        onFocus={() => setFocused("company")}
                        onBlur={() => setFocused(null)}
                        placeholder="Acme Inc."
                        required
                        className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 ${focused === "company" ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Company size <span className="text-brand-400">*</span></label>
                      <select
                        name="companySize"
                        value={formState.companySize}
                        onChange={handleChange}
                        onFocus={() => setFocused("companySize")}
                        onBlur={() => setFocused(null)}
                        required
                        className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer ${focused === "companySize" ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                      >
                        <option value="" disabled className="bg-[#0d1120]">Select size</option>
                        {companySize.map(s => <option key={s} value={s} className="bg-[#0d1120]">{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Industry <span className="text-brand-400">*</span></label>
                    <select
                      name="industry"
                      value={formState.industry}
                      onChange={handleChange}
                      onFocus={() => setFocused("industry")}
                      onBlur={() => setFocused(null)}
                      required
                      className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer ${focused === "industry" ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                    >
                      <option value="" disabled className="bg-[#0d1120]">Select industry</option>
                      {industries.map(i => <option key={i} value={i} className="bg-[#0d1120]">{i}</option>)}
                    </select>
                  </div>

                  {/* Goals */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">What are you looking to achieve?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {goals.map(g => {
                        const Icon = g.icon;
                        const active = selectedGoals.includes(g.id);
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => toggleGoal(g.id)}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${active ? "border-brand-500/60 bg-brand-500/10 text-brand-300 shadow-[0_0_0_1px_rgba(79,70,229,0.3)]" : "border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/16 hover:text-white hover:bg-white/[0.05]"}`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-brand-400" : ""}`} />
                            {g.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Anything else we should know?</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      placeholder="Tell us about your current setup, specific challenges, or questions..."
                      className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none ${focused === "message" ? "border-brand-500/70 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" : "border-white/8 hover:border-white/14"}`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base transition-all duration-200 glow-brand shadow-[0_8px_32px_rgba(79,70,229,0.35)] hover:shadow-[0_8px_40px_rgba(79,70,229,0.55)] active:scale-[0.98]"
                  >
                    <Calendar className="w-5 h-5" />
                    Book my demo
                  </button>

                  <p className="text-center text-xs text-slate-600">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-slate-500 hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="#" className="text-slate-500 hover:text-white underline underline-offset-2 transition-colors">Terms of Service</a>.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* What to expect */}
            <AnimatedSection animation="up" delay={120}>
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-4">What to expect</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Clock, label: "30-min personalised call", sub: "No generic pitches — we tailor the demo to your business" },
                    { icon: Users, label: "Meet your dedicated rep", sub: "One point of contact through your entire evaluation" },
                    { icon: Zap, label: "Live product walkthrough", sub: "See exactly how OmniChat works for your industry" },
                    { icon: Building2, label: "Custom pricing proposal", sub: "Get a quote scoped to your team size and channels" },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-600/15 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-brand-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-200">{item.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.sub}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedSection>

            {/* Prefer to reach out directly? */}
            <AnimatedSection animation="up" delay={160}>
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-4">Prefer to reach out directly?</h3>
                <div className="space-y-3">
                  <a href="mailto:sales@omnichat.io" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-brand-500/40 hover:bg-brand-500/5 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Email us</div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">sales@omnichat.io</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
                  </a>
                  <a href="tel:+12345678900" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-brand-500/40 hover:bg-brand-500/5 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Call us</div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">+1 (234) 567-890</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
                  </a>
                  <a href="https://wa.me/12345678900" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                      <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">WhatsApp us</div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Chat with sales now</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Trusted by */}
            <AnimatedSection animation="up" delay={200}>
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-1.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-white ml-1">4.9</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Based on 1,200+ reviews on G2 &amp; Capterra</p>
                <div className="space-y-4">
                  {testimonials.map(t => (
                    <div key={t.name} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 leading-relaxed">&#34;{t.quote}&#34;</p>
                        <div className="text-xs font-semibold text-slate-300 mt-1">{t.name}</div>
                        <div className="text-xs text-slate-600">{t.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};
