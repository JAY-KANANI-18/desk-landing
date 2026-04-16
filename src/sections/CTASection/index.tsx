import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import { AnimatedSection } from "../../components/AnimatedSection";
import { MagneticButton } from "../../components/MagneticButton";

const StatItem = ({ value, suffix, label, inView, delay }: { value: number; suffix: string; label: string; inView: boolean; delay: number }) => {
  const count = useCountUp(value, 1800, inView);
  return (
    <div
      className="transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl font-black text-gradient mb-1 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
};

export const CTASection = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-600/12 rounded-full blur-[120px] transition-all duration-1500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/8 rounded-full blur-[100px] animate-pulse-slow" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <AnimatedSection direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-7 uppercase tracking-wide">
            <Zap className="w-3.5 h-3.5 animate-bounce-gentle" />
            Ready to simplify support?
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Bring every customer channel<br />
            <span className="text-shimmer">into one shared inbox</span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Give your support and CX team a single place to manage conversations, collaborate clearly, and respond with full context.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <MagneticButton>
              <Link
                to="/"
                className="group flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-hover text-base relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Start free trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <button className="flex items-center gap-2 px-8 py-4 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 font-medium rounded-xl transition-all text-base">
                Talk to Sales
              </button>
            </MagneticButton>
          </div>

          <p className="text-slate-500 text-sm">
            ✓ 14-day free trial &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Guided onboarding available
          </p>
        </AnimatedSection>

        {/* Count-up stats */}
        {/* <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/8">
          <StatItem value={2000} suffix="+" label="Teams using AxoDesk workflows" inView={inView} delay={300} />
          <StatItem value={5} suffix="M+" label="Conversations organized monthly" inView={inView} delay={450} />
          <StatItem value={4.9} suffix="/5" label="Support leader satisfaction score" inView={inView} delay={600} />
        </div> */}
      </div>
    </section>
  );
};
