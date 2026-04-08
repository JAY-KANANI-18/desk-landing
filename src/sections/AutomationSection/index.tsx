import { useState, useEffect } from "react";
import { Zap, MessageSquare, UserCheck, Tag, Bell, GitBranch, CheckCircle2 } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const triggers = [
  { label: "New message received", icon: <MessageSquare className="w-4 h-4" />, color: "text-green-400 bg-green-600/15" },
  { label: "Conversation opened", icon: <Zap className="w-4 h-4" />, color: "text-blue-400 bg-blue-600/15" },
  { label: "Conversation closed", icon: <CheckCircle2 className="w-4 h-4" />, color: "text-slate-400 bg-slate-600/15" },
  { label: "Agent assigned", icon: <UserCheck className="w-4 h-4" />, color: "text-purple-400 bg-purple-600/15" },
];

const actions = [
  { label: "Send auto-reply message", icon: <MessageSquare className="w-4 h-4" />, color: "text-brand-400 bg-brand-600/15" },
  { label: "Assign to agent or team", icon: <UserCheck className="w-4 h-4" />, color: "text-emerald-400 bg-emerald-600/15" },
  { label: "Add tag to contact", icon: <Tag className="w-4 h-4" />, color: "text-pink-400 bg-pink-600/15" },
  { label: "Trigger webhook / API", icon: <Bell className="w-4 h-4" />, color: "text-orange-400 bg-orange-600/15" },
];

const workflowSteps = [
  { label: "Trigger: New message", sub: "Customer sends any message", icon: <MessageSquare className="w-4 h-4" />, color: "text-green-400 bg-green-600/20 border-green-600/30", dot: "bg-green-400" },
  { label: "Condition: Contains keyword", sub: '"pricing", "cost", or "demo"', icon: <GitBranch className="w-4 h-4" />, color: "text-blue-400 bg-blue-600/20 border-blue-600/30", dot: "bg-blue-400" },
  { label: "Action: Send auto-reply", sub: "Sends pricing PDF + books demo", icon: <Zap className="w-4 h-4" />, color: "text-purple-400 bg-purple-600/20 border-purple-600/30", dot: "bg-purple-400" },
  { label: "Action: Assign to Sales", sub: "Routes to Sales team inbox", icon: <UserCheck className="w-4 h-4" />, color: "text-brand-400 bg-brand-600/20 border-brand-600/30", dot: "bg-brand-400" },
];

export const AutomationSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveStep(i);
      i++;
      if (i >= workflowSteps.length) {
        setTimeout(() => {
          setActiveStep(-1);
          i = 0;
        }, 1200);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="py-24 px-4 md:px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-16">
          {/* Content */}
          <AnimatedSection direction="left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5" />
              Automation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Automate the repetitive.<br />
              <span className="text-gradient">Focus on the human.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Build powerful no-code workflows in minutes. Set triggers, define conditions, and let OmniChat handle routine tasks 24/7 so your team can focus on what matters.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Triggers</p>
                <div className="space-y-2">
                  {triggers.map((t, i) => (
                    <div
                      key={t.label}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 transition-all cursor-default group"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(-16px)",
                        transition: `opacity 0.5s ease ${200 + i * 80}ms, transform 0.5s ease ${200 + i * 80}ms`,
                      }}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${t.color}`}>
                        {t.icon}
                      </div>
                      <span className="text-xs text-slate-300 font-medium">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Actions</p>
                <div className="space-y-2">
                  {actions.map((a, i) => (
                    <div
                      key={a.label}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 transition-all cursor-default group"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(16px)",
                        transition: `opacity 0.5s ease ${200 + i * 80}ms, transform 0.5s ease ${200 + i * 80}ms`,
                      }}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${a.color}`}>
                        {a.icon}
                      </div>
                      <span className="text-xs text-slate-300 font-medium">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Workflow Visual with animated highlight */}
          <AnimatedSection direction="right" delay={150}>
            <div className="rounded-2xl bg-[#0d1220] border border-white/8 p-6 shadow-2xl shadow-black/30 hover:border-white/14 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white">Example Workflow</h3>
                <span className="text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="space-y-1">
                {workflowSteps.map((step, i) => (
                  <div key={i}>
                    <div
                      className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-500 ${step.color} ${activeStep === i ? "scale-[1.02] shadow-lg" : "opacity-75"}`}
                      style={{
                        boxShadow: activeStep === i ? `0 0 20px ${step.dot === "bg-green-400" ? "rgba(74,222,128,0.2)" : step.dot === "bg-blue-400" ? "rgba(96,165,250,0.2)" : step.dot === "bg-purple-400" ? "rgba(192,132,252,0.2)" : "rgba(129,140,248,0.2)"}` : "",
                      }}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${step.color} transition-transform ${activeStep === i ? "scale-110" : ""}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{step.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{step.sub}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {activeStep === i && (
                          <span className={`w-2 h-2 rounded-full animate-ping ${step.dot}`} />
                        )}
                        <div className="text-xs text-slate-500 font-mono">#{i + 1}</div>
                      </div>
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div className={`w-px h-4 transition-all duration-300 ${activeStep > i ? "bg-brand-600/60" : "bg-white/10"}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span>⚡ Runs 247 times today</span>
                <span className="text-brand-400 font-medium cursor-pointer hover:text-brand-300 transition-colors">Edit workflow →</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
