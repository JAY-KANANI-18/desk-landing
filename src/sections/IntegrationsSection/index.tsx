import { Webhook, Code2, GitBranch, ArrowRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const integrations = [
  { name: "Meta Ads", icon: "https://cdn.simpleicons.org/meta/0081FB", glow: "#0081FB" },
  { name: "Google Sheets", icon: "https://cdn.simpleicons.org/googlesheets/34A853", glow: "#34A853" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier/FF4A00", glow: "#FF4A00" },
  { name: "Shopify", icon: "https://cdn.simpleicons.org/shopify/7AB55C", glow: "#7AB55C" },
  { name: "WooCommerce", icon: "https://cdn.simpleicons.org/woocommerce/96588A", glow: "#96588A" },
  { name: "Salesforce", icon: "https://cdn.simpleicons.org/salesforce/00A1E0", glow: "#00A1E0" },
  { name: "HubSpot", icon: "https://cdn.simpleicons.org/hubspot/FF7A59", glow: "#FF7A59" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/635BFF", glow: "#635BFF" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA4B71", glow: "#EA4B71" },
  { name: "Slack", icon: "https://cdn.simpleicons.org/slack/4A154B", glow: "#4A154B" },
];

const apiFeatures = [
  { icon: <Webhook className="w-5 h-5" />, title: "REST API", desc: "Full-featured API to read and write conversations, contacts, and more.", color: "text-brand-400 bg-brand-600/15", glow: "rgba(79,70,229,0.3)" },
  { icon: <Code2 className="w-5 h-5" />, title: "Real-time Webhooks", desc: "Push events to any endpoint the moment something happens in AxoDesk.", color: "text-purple-400 bg-purple-600/15", glow: "rgba(139,92,246,0.3)" },
  { icon: <GitBranch className="w-5 h-5" />, title: "Native Integrations", desc: "One-click connections to Zapier, n8n, Shopify, HubSpot, and more.", color: "text-emerald-400 bg-emerald-600/15", glow: "rgba(16,185,129,0.3)" },
];

export const IntegrationsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-4 md:px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 uppercase tracking-wide">
              Integrations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              API-first. Plays well<br />
              <span className="text-gradient">with everything.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Connect AxoDesk to your CRM, helpdesk, e-commerce store, or any custom system with our full-featured API and webhook platform.
            </p>
          </div>
        </AnimatedSection>

        {/* Integration logos with individual glow on hover */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-14">
          {integrations.map((int, i) => (
            <div
              key={int.name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/4 border border-white/6 transition-all duration-300 group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = `0 0 20px ${int.glow}40`;
                el.style.borderColor = `${int.glow}40`;
                el.style.background = `${int.glow}08`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "";
                el.style.borderColor = "";
                el.style.background = "";
              }}
            >
              <img src={int.icon} alt={int.name} className="w-8 h-8 rounded-xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-[9px] text-slate-500 font-medium text-center">{int.name}</span>
            </div>
          ))}
        </div>

        {/* API Features */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {apiFeatures.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-white/3 border border-white/8 transition-all duration-500 cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${400 + i * 120}ms, transform 0.6s ease ${400 + i * 120}ms`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = `0 8px 40px ${f.glow}`;
                el.style.borderColor = f.glow.replace("0.3", "0.4");
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "";
                el.style.borderColor = "";
                el.style.transform = "";
              }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${f.color}`}>{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <AnimatedSection direction="fade" delay={600}>
          <div className="text-center">
            <button className="group inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-brand-600/30 font-medium rounded-xl transition-all">
              <Code2 className="w-4 h-4" />
              View API Documentation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
