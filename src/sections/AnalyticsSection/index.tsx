import { BarChart3, TrendingUp, Clock, Star, MessageCircle, CheckCircle2 } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const channelData = [
  { name: "WhatsApp", pct: 48, color: "bg-[#25D366]", glow: "#25D366" },
  { name: "Instagram", pct: 22, color: "bg-[#E4405F]", glow: "#E4405F" },
  { name: "Messenger", pct: 15, color: "bg-[#0084FF]", glow: "#0084FF" },
  { name: "Email", pct: 10, color: "bg-[#EA4335]", glow: "#EA4335" },
  { name: "Live Chat", pct: 5, color: "bg-[#FF5100]", glow: "#FF5100" },
];

const listFeatures = [
  "Real-time team & agent performance dashboards",
  "Response time and first-contact resolution tracking",
  "Customer satisfaction (CSAT & NPS) collection",
  "Conversation volume trends by channel",
  "Custom report exports (CSV, PDF)",
];

const MetricCard = ({ icon, value, label, sub, color, inView, delay }: { icon: React.ReactNode; value: string; label: string; sub: string; color: string; inView: boolean; delay: number }) => (
  <div
    className={`p-5 rounded-2xl bg-[#0d1220] border border-white/8 hover:border-white/14 transition-all duration-500 group cursor-default`}
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "scale(1) translateY(0)" : "scale(0.9) translateY(16px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03) translateY(-4px)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
    <div className="text-3xl font-black text-white mb-0.5 tabular-nums">{value}</div>
    <div className="text-xs font-semibold text-slate-400">{label}</div>
    <div className="text-[10px] text-green-400 mt-1 font-medium">{sub}</div>
  </div>
);

export const AnalyticsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-4 md:px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-16">
          {/* Metrics Panel */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard icon={<Clock className="w-5 h-5" />} value="1.8m" label="Avg Response Time" sub="↓ 40% vs last month" color="text-green-400 bg-green-600/15" inView={inView} delay={0} />
              <MetricCard icon={<Star className="w-5 h-5" />} value="96%" label="CSAT Score" sub="↑ 8% vs last month" color="text-yellow-400 bg-yellow-600/15" inView={inView} delay={100} />
              <MetricCard icon={<MessageCircle className="w-5 h-5" />} value="1,842" label="Conversations Today" sub="↑ 12% vs yesterday" color="text-brand-400 bg-brand-600/15" inView={inView} delay={200} />
              <MetricCard icon={<CheckCircle2 className="w-5 h-5" />} value="98.5%" label="Resolution Rate" sub="↑ 3% vs last month" color="text-purple-400 bg-purple-600/15" inView={inView} delay={300} />
            </div>

            {/* Channel breakdown with animated bars */}
            <div
              className="p-5 rounded-2xl bg-[#0d1220] border border-white/8 transition-all duration-500"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 400ms, transform 0.6s ease 400ms" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Conversations by Channel</p>
              <div className="space-y-3">
                {channelData.map((ch, i) => (
                  <div key={ch.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300 font-medium">{ch.name}</span>
                      <span
                        className="text-xs text-slate-500 font-bold tabular-nums transition-all duration-1000"
                        style={{ opacity: inView ? 1 : 0, transitionDelay: `${600 + i * 150}ms` }}
                      >
                        {ch.pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ch.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: inView ? `${ch.pct}%` : "0%",
                          transitionDelay: `${600 + i * 150}ms`,
                          boxShadow: inView ? `0 0 8px ${ch.glow}50` : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatedSection direction="right" delay={100}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 uppercase tracking-wide">
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics & Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Make data-driven<br />
              <span className="text-gradient">support decisions</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Track everything from individual agent performance to channel-wide trends. Get the insights your managers need to continually improve customer experience.
            </p>
            <ul className="space-y-3 mb-8">
              {listFeatures.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-slate-300 text-sm transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(20px)",
                    transitionDelay: inView ? `${400 + i * 80}ms` : "0ms",
                  }}
                >
                  <TrendingUp className="w-4 h-4 text-brand-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
