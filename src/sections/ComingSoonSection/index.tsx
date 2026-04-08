import { Phone, Bot, Radio, Send, ShoppingBag, Database, Zap, BarChart3, Sparkles } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const comingItems = [
  { icon: <Phone className="w-5 h-5" />, title: "WhatsApp Calling", timeline: "Q2 2026", desc: "Make & receive WhatsApp voice/video calls from the platform", borderColor: "border-green-600/20", iconBg: "text-green-400 bg-green-600/15", glow: "#22c55e" },
  { icon: <Radio className="w-5 h-5" />, title: "SMS & Telegram", timeline: "Q2 2026", desc: "Reach customers via text message and Telegram channels", borderColor: "border-blue-600/20", iconBg: "text-blue-400 bg-blue-600/15", glow: "#3b82f6" },
  { icon: <Bot className="w-5 h-5" />, title: "AI Auto-Reply", timeline: "Beta Feb 2026", desc: "Context-aware AI that handles common questions automatically", borderColor: "border-pink-600/20", iconBg: "text-pink-400 bg-pink-600/15", hot: true, glow: "#ec4899" },
  { icon: <Database className="w-5 h-5" />, title: "AI Knowledge Base", timeline: "Beta Mar 2026", desc: "Train AI on your docs & FAQs for accurate automated responses", borderColor: "border-purple-600/20", iconBg: "text-purple-400 bg-purple-600/15", hot: true, glow: "#a855f7" },
  { icon: <Send className="w-5 h-5" />, title: "Broadcast Campaigns", timeline: "Q1 2026", desc: "Send bulk campaigns via WhatsApp, SMS & Email to segments", borderColor: "border-orange-600/20", iconBg: "text-orange-400 bg-orange-600/15", glow: "#f97316" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Advanced Reporting", timeline: "Q1 2026", desc: "White-label reports, custom dashboards, and data exports", borderColor: "border-cyan-600/20", iconBg: "text-cyan-400 bg-cyan-600/15", glow: "#06b6d4" },
];

const integrationLogos = [
  { name: "Meta Ads", icon: "https://cdn.simpleicons.org/meta/0081FB" },
  { name: "Google Sheets", icon: "https://cdn.simpleicons.org/googlesheets/34A853" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Shopify", icon: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "WooCommerce", icon: "https://cdn.simpleicons.org/woocommerce/96588A" },
  { name: "Salesforce", icon: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot", icon: "https://cdn.simpleicons.org/hubspot/FF7A59" },
];

export const ComingSoonSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-24 px-4 md:px-6 bg-white/2" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/15 border border-amber-600/20 text-amber-400 text-xs font-bold mb-5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Coming Soon — 2026 Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              The future is already<br />
              <span className="text-gradient">being built</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              We ship fast. These features are on our near-term roadmap and rolling out soon.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {comingItems.map((item, i) => (
            <div
              key={item.title}
              className={`relative p-6 rounded-2xl bg-white/3 border ${item.borderColor} transition-all duration-500 cursor-default group`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = `0 0 30px ${item.glow}20`;
                el.style.transform = "translateY(-4px) scale(1.01)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "";
                el.style.transform = "";
              }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shimmer-bg" />

              {(item as any).hot && (
                <div className="absolute top-4 right-4 text-[9px] font-black bg-pink-600/30 text-pink-400 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  🔥 Hot
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <span className="text-[9px] font-semibold bg-white/8 text-slate-400 px-2 py-0.5 rounded-full">{item.timeline}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Integrations */}
        <AnimatedSection direction="scale" threshold={0.15}>
          <div className="p-8 rounded-2xl bg-[#0d1220] border border-white/8 hover:border-white/14 transition-colors duration-500">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Upcoming Integrations</p>
              <h3 className="text-2xl font-bold text-white">Connect the tools you already use</h3>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {integrationLogos.map((int, i) => (
                <div
                  key={int.name}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/4 border border-white/6 hover:bg-white/7 hover:border-white/12 transition-all group cursor-default"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <img src={int.icon} alt={int.name} className="w-8 h-8 rounded-xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="text-[10px] text-slate-400 text-center leading-tight font-medium">{int.name}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="group inline-flex items-center gap-2 px-7 py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 hover:text-amber-300 font-semibold rounded-xl border border-amber-600/20 hover:border-amber-600/40 transition-all text-sm">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Join Beta Program — Get Early Access
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
