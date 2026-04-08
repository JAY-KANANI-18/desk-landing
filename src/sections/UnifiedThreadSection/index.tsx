import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const messages = [
  { channel: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp/25D366", from: "customer", name: "Alex Chen", text: "Hi, when does my order arrive?", time: "10:30 AM" },
  { channel: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E4405F", from: "customer", name: "Alex Chen (IG)", text: "Also checking here — same shipment?", time: "10:32 AM" },
  { channel: "system", icon: "", from: "system", name: "System", text: "🔗 Contacts automatically merged", time: "" },
  { channel: "agent", icon: "", from: "agent", name: "You", text: "Hi Alex! Yes — same order. Ships tomorrow. Tracking: FDX-8821. You&#39;ll get a notification too! 👍", time: "10:33 AM" },
];

const features = [
  "Complete cross-channel conversation history",
  "Automatic duplicate contact merging",
  "Real-time message sync across all platforms",
  "Full context before every reply",
];

export const UnifiedThreadSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [visibleMsgs, setVisibleMsgs] = useState(0);

  useEffect(() => {
    if (!inView) return;
    messages.forEach((_, i) => {
      setTimeout(() => setVisibleMsgs(v => Math.max(v, i + 1)), 300 + i * 600);
    });
  }, [inView]);

  return (
    <section className="py-24 px-4 md:px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <AnimatedSection direction="left">
            <div className="rounded-2xl bg-[#0d1220] border border-white/8 overflow-hidden shadow-2xl shadow-black/30 hover:border-white/14 transition-colors duration-500">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
                <div className="text-sm font-semibold text-white">Alex Chen</div>
                <div className="flex items-center gap-1 ml-auto">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WA" className="w-4 h-4 rounded-full" />
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="IG" className="w-4 h-4 rounded-full" />
                  <span className="text-[10px] text-slate-500 ml-1">2 channels</span>
                </div>
              </div>
              <div className="p-5 space-y-3 min-h-[200px]">
                {messages.map((m, i) => {
                  const show = visibleMsgs > i;
                  if (m.from === "system") return (
                    <div key={i} className="text-center transition-all duration-500" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)" }}>
                      <span className="text-[10px] bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/8">{m.text}</span>
                    </div>
                  );
                  return (
                    <div key={i} className={`flex items-start gap-3 transition-all duration-500 ${m.from === "agent" ? "flex-row-reverse" : ""}`} style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)" }}>
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {m.name[0]}
                        </div>
                        {m.icon && <img src={m.icon} alt="" className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border border-[#0d1220]" />}
                      </div>
                      <div className={`max-w-[70%] ${m.from === "agent" ? "items-end" : "items-start"} flex flex-col`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-slate-500 font-medium">{m.name}</span>
                          {m.channel !== "agent" && m.channel !== "system" && (
                            <span className="text-[9px] text-slate-600 bg-white/5 px-1.5 py-0.5 rounded-full">via {m.channel}</span>
                          )}
                          <span className="text-[9px] text-slate-600">{m.time}</span>
                        </div>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${m.from === "agent" ? "bg-brand-600 text-white rounded-br-sm" : "bg-white/8 text-slate-200 rounded-bl-sm"}`}>
                          {m.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 tracking-wide uppercase">
              Unified Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              All conversations.<br />
              <span className="text-gradient">One thread.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              When a customer messages you on WhatsApp and then follows up on Instagram, it all shows up as one unified thread. No duplication, no lost context — just seamless continuity.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <li key={f} className="flex items-center gap-3 text-slate-300 text-sm transition-all duration-500" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(20px)", transitionDelay: inView ? `${400 + i * 100}ms` : "0ms" }}>
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/features" className="group inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors">
              Explore unified inbox
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
