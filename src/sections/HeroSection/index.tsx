import { useEffect, useRef } from "react";
import { HeroContent } from "./components/HeroContent";
import { HeroDashboard } from "./components/HeroDashboard";
import { ParticleField } from "../../components/ParticleField";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrolled = window.scrollY * 0.3;
      const blobs = sectionRef.current.querySelectorAll<HTMLElement>(".parallax-blob");
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 0.15;
        blob.style.transform = `translateY(${scrolled * factor}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-16">
      {/* Animated particle canvas */}
      <ParticleField count={50} />

      {/* Bg gradients with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-blob absolute top-0 left-1/4 w-[min(500px,90vw)] h-[min(500px,90vw)] bg-brand-600/12 rounded-full blur-[140px] transition-transform" />
        <div className="parallax-blob absolute bottom-0 right-1/4 w-[min(384px,70vw)] h-[min(384px,70vw)] bg-purple-600/10 rounded-full blur-[110px] transition-transform" />
        <div className="parallax-blob absolute top-1/3 right-0 w-[min(288px,60vw)] h-[min(288px,60vw)] bg-brand-800/10 rounded-full blur-[90px] transition-transform" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #080c14 100%)" }} />
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <HeroContent />
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
};
