import { useState, useEffect } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { MagneticButton } from "../../../components/MagneticButton";

const words = ["WhatsApp", "Instagram", "Messenger", "Email", "Live Chat"];

export const HeroContent = () => {
  const typed = useTypewriter(words, 90, 2000);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number) =>
    `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <div>
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/25 text-brand-400 text-xs font-semibold mb-7 tracking-wide ${anim(0)}`}
        style={{ transitionDelay: visible ? "0ms" : "0ms" }}
      >
        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
        Omnichannel Communication Platform
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
        </span>
      </div>

      {/* Headline */}
      <h1
        className={`text-4xl sm:text-5xl md:text-[3.75rem] font-bold leading-[1.1] mb-6 tracking-tight ${anim(100)}`}
        style={{ transitionDelay: visible ? "100ms" : "0ms" }}
      >
        <span className="text-white">One Inbox for</span>
        <br />
        <span className="text-white">Every Customer</span>
        <br />
        <span className="text-gradient">Conversation</span>
      </h1>

      {/* Typewriter sub */}
      <div
        className={`flex flex-wrap items-center gap-2 mb-4 ${anim(200)}`}
        style={{ transitionDelay: visible ? "200ms" : "0ms" }}
      >
        <span className="text-slate-400 text-sm sm:text-base">Manage</span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-brand-600/20 border border-brand-600/30 text-brand-300 font-semibold text-sm sm:text-base min-w-[110px]">
          {typed}
          <span className="w-0.5 h-4 bg-brand-400 animate-pulse ml-0.5" />
        </span>
        <span className="text-slate-400 text-sm sm:text-base">— all in one place.</span>
      </div>

      {/* Sub */}
      <p
        className={`text-slate-400 text-base sm:text-lg leading-relaxed mb-7 sm:mb-9 max-w-lg ${anim(300)}`}
        style={{ transitionDelay: visible ? "300ms" : "0ms" }}
      >
        Boost team productivity, delight customers, and never miss a message again. OmniChat unifies every channel in a single intelligent inbox.
      </p>

      {/* CTAs */}
      <div
        className={`flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 ${anim(400)}`}
        style={{ transitionDelay: visible ? "400ms" : "0ms" }}
      >
        <MagneticButton>
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all glow-brand-hover text-sm sm:text-base relative overflow-hidden w-full xs:w-auto"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </MagneticButton>
        <MagneticButton>
          <button className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 font-medium rounded-xl transition-all text-sm sm:text-base w-full xs:w-auto">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-600/25 flex items-center justify-center group-hover:bg-brand-600/40 transition-colors">
              <Play className="w-3 h-3 text-brand-400 ml-0.5" />
            </div>
            Book a Demo
          </button>
        </MagneticButton>
      </div>

      {/* Trust */}
      <p
        className={`text-slate-500 text-sm ${anim(500)}`}
        style={{ transitionDelay: visible ? "500ms" : "0ms" }}
      >
        ✓ Free 14-day trial &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Cancel anytime
      </p>

      {/* Social proof */}
      <div
        className={`mt-6 sm:mt-8 flex flex-wrap items-center gap-4 ${anim(600)}`}
        style={{ transitionDelay: visible ? "600ms" : "0ms" }}
      >
        <div className="flex -space-x-2">
          {["#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#059669"].map((c, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-[#080c14] flex items-center justify-center text-xs font-bold text-white hover:scale-110 hover:z-10 transition-transform cursor-default"
              style={{ background: c, transitionDelay: `${600 + i * 60}ms` }}
            >
              {["S", "M", "K", "R", "J"][i]}
            </div>
          ))}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">2,000+ businesses trust OmniChat</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className="text-amber-400 text-xs animate-bounce-gentle" style={{ animationDelay: `${s * 100}ms` }}>★</span>
            ))}
            <span className="text-slate-500 text-xs ml-1">4.9/5 rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};
