import { useEffect, useRef } from "react";
import { HeroContent } from "./components/HeroContent";
import { HeroDashboard } from "./components/HeroDashboard";
import { ParticleField } from "../../components/ParticleField";

const channelVisualItems = [
  {
    id: "ic-0",
    name: "WhatsApp",
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
    x: 12,
    y: 18,
    color: "#25D366",

  },
  {
    id: "ic-1",
    name: "Instagram",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
    x: 88,
    y: 18,
    color: "#E4405F",
    
  },
  {
    id: "ic-2",
    name: "Messenger",
    icon: "https://cdn.simpleicons.org/messenger/0084FF",
    x: 12,
    y: 52,
    color: "#0084FF",
  },
  {
    id: "ic-3",
    name: "Email",
    icon: "https://cdn.simpleicons.org/gmail",
    x: 88,
    y: 52,
    color: "#EA4335",
  },
  {
    id: "ic-4",
    name: "Website Chat",
    icon: "https://cdn.simpleicons.org/googlechat/34A853",
    x: 12,
    y: 86,
    color: "#34A853",
  },
  {
    id: "ic-5",
    name: "Telegram",
    icon: "https://cdn.simpleicons.org/telegram",
    x: 88,
    y: 86,
    color: "#229ED9",
  },
];

export const HeroSection = () => {
  const svgRef = useRef(null);
  const visualRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasDrawnRef = useRef(false);

  

  useEffect(() => {
    if (hasDrawnRef.current) return;
hasDrawnRef.current = true;
    const svg = svgRef.current;
    if (!svg) return;
  
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  
    const CX = 50;
    const CY = 50;
    const STOP_R = 14;
  
    channelVisualItems.forEach((icon, i) => {
      const ix = icon.x;
      const iy = icon.y;
  
      const dx = ix - CX;
      const dy = iy - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      const ex = CX + (dx / dist) * STOP_R;
      const ey = CY + (dy / dist) * STOP_R;
  
      // keep path always icon -> center
      const startX = ix;
      const startY = iy;
      const endX = ex;
      const endY = ey;
  
      const mx = (startX + endX) / 2;
      const my = (startY + endY) / 2 + (icon.x < 50 ? -4 : 4);
  
      const pathId = `axo-path-${i}`;
  
      // dashed path line
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("id", pathId);
      path.setAttribute("d", `M ${startX} ${startY} Q ${mx} ${my} ${endX} ${endY}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(129,140,248,0.28)");
      path.setAttribute("stroke-width", "0.45");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-dasharray", "2.5 2.5");
  
      const lineReverse = i % 2 !== 0;
      // path.style.animation = `axo-dash-travel ${2.2 + i * 0.25}s linear infinite`;
      // path.style.animationDirection = lineReverse ? "reverse" : "normal";
  
      svg.appendChild(path);
  
      const createMovingMessage = ({
        reverse = false,
        delay = 0,
        duration = 6,
        scale = 1,
        activeStart = 0,
        activeEnd = 0.35,
      }) => {
        const movingMsg = document.createElementNS("http://www.w3.org/2000/svg", "g");
        movingMsg.setAttribute("filter", "url(#axo-glow-filter)");
        movingMsg.setAttribute("transform", `scale(${scale})`);
  
        const fillColor = reverse ? "#818cf8" : icon.color;
  
        // bubble
        const bubble = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bubble.setAttribute("x", "-1.7");
        bubble.setAttribute("y", "-1.2");
        bubble.setAttribute("width", "3.4");
        bubble.setAttribute("height", "2.4");
        bubble.setAttribute("rx", "0.8");
        bubble.setAttribute("fill", fillColor);
  
        // tail
        const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tail.setAttribute("d", "M -0.5 1.2 L -1.2 2 L 0.2 1.3 Z");
        tail.setAttribute("fill", fillColor);
  
        // text line 1
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "-0.8");
        line1.setAttribute("y1", "-0.3");
        line1.setAttribute("x2", "0.9");
        line1.setAttribute("y2", "-0.3");
        line1.setAttribute("stroke", "white");
        line1.setAttribute("stroke-width", "0.22");
        line1.setAttribute("stroke-linecap", "round");
  
        // text line 2
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "-0.8");
        line2.setAttribute("y1", "0.45");
        line2.setAttribute("x2", "0.45");
        line2.setAttribute("y2", "0.45");
        line2.setAttribute("stroke", "white");
        line2.setAttribute("stroke-width", "0.22");
        line2.setAttribute("stroke-linecap", "round");
  
        movingMsg.appendChild(bubble);
        movingMsg.appendChild(tail);
        movingMsg.appendChild(line1);
        movingMsg.appendChild(line2);
  
        // motion
        const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        animateMotion.setAttribute("dur", `${duration}s`);
        animateMotion.setAttribute("repeatCount", "indefinite");
        animateMotion.setAttribute("begin", `${delay}s`);
        animateMotion.setAttribute("rotate", "auto");
  
        // Correct synced movement (fixes mid-spawn issue)
        animateMotion.setAttribute(
          "keyTimes",
          `0; ${activeStart}; ${activeEnd}; 1`
        );
  
        animateMotion.setAttribute(
          "keyPoints",
          reverse
            ? `1; 1; 0; 0`
            : `0; 0; 1; 1`
        );
  
        animateMotion.setAttribute("calcMode", "linear");
  
        const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
        mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${pathId}`);
  
        animateMotion.appendChild(mpath);
        movingMsg.appendChild(animateMotion);
  
        // visibility synced to same segment
        const opacityAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        opacityAnim.setAttribute("attributeName", "opacity");
        opacityAnim.setAttribute(
          "values",
          "0;0;1;1;0;0"
        );
        opacityAnim.setAttribute(
          "keyTimes",
          `0;${Math.max(activeStart - 0.01, 0)};${activeStart};${activeEnd};${Math.min(activeEnd + 0.01, 1)};1`
        );
        opacityAnim.setAttribute("dur", `${duration}s`);
        opacityAnim.setAttribute("repeatCount", "indefinite");
        opacityAnim.setAttribute("begin", `${delay}s`);
  
        movingMsg.appendChild(opacityAnim);
  
        svg.appendChild(movingMsg);
      };
  
      // total cycle per path
      const cycle = 6 + i * 0.25;
  
      // incoming: icon -> center
      if (i < 3) {
        // incoming
        createMovingMessage({
          reverse: false,
          delay: i * 0.35,
          duration: cycle,
          scale: 1,
          activeStart: 0.08,
          activeEnd: 0.42,
        });
      
        // outgoing
        createMovingMessage({
          reverse: true,
          delay: i * 0.35,
          duration: cycle,
          scale: 0.95,
          activeStart: 0.56,
          activeEnd: 0.9,
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative  flex items-center justify-center  pt-16 mt-20 ">
      {/* Animated particle canvas */}
      <style>{`
        @keyframes axo-pulse-ring {
          0%   { transform: translate(-50%,-50%) scale(1);    opacity: 0.6; }
          70%  { transform: translate(-50%,-50%) scale(1.35); opacity: 0; }
          100% { transform: translate(-50%,-50%) scale(1.35); opacity: 0; }
        }
        @keyframes axo-float {
          0%,100% { transform: translate(-50%,-50%) translateY(0px); }
          50%      { transform: translate(-50%,-50%) translateY(-6px); }
        }
        @keyframes axo-dash-travel { to { stroke-dashoffset: -40; } }
        @keyframes axo-glow {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.9; }
        }
        @keyframes axo-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .axo-hub-ring {
          position: absolute;
          left: 50%; top: 50%;
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(99,102,241,0.5);
          animation: axo-pulse-ring 2.5s ease-out infinite;
          pointer-events: none;
        }
          .axo-hub-ring,
.axo-icon,
.axo-center-hub {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
        .axo-icon {
          position: absolute;
          transform: translate(-50%,-50%);
          width: 48px; height: 48px;
          border-radius: 14px;
          border: 0.5px solid rgba(255,255,255,0.15);
          background: rgba(12,19,34,0.95);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, transform 0.2s;
          z-index: 3; cursor: pointer;
        }
        .axo-icon:hover {
          border-color: rgba(129,140,248,0.65) !important;
          transform: translate(-50%,-50%) translateY(-5px) scale(1.1) !important;
          animation: none !important;
        }
        .axo-badge-dot { animation: axo-glow 2s ease-in-out infinite; }
        .axo-left-col  { animation: axo-fade-up 0.7s ease both; }
      `}</style>

      {/* Bg gradients with parallax */}
      <div className="absolute inset-0 pointer-events-none ">
      <div className="absolute top-0 left-1/4 w-[min(420px,80vw)] h-[min(420px,80vw)] bg-brand-600/10 rounded-full blur-[70px]" />
<div className="absolute bottom-0 right-1/4 w-[min(300px,60vw)] h-[min(300px,60vw)] bg-purple-600/8 rounded-full blur-[55px]" />
<div className="absolute top-1/3 right-0 w-[min(220px,50vw)] h-[min(220px,50vw)] bg-brand-800/8 rounded-full blur-[45px]" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <HeroContent />
          <div className="relative  lg:block" style={{ height: 360 }}>
            <div
              ref={visualRef}
              className="absolute inset-0 rounded-[24px] "
              style={{
                background: "rgba(13,20,34,0.65)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)"
                            }}
            >
              {/* Inner radial glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(79,70,229,0.22) 0%, rgba(13,20,34,0) 70%)",
                }}
              />
              {/* Inner grid */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: 0.12,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />

              {/* Animated SVG lines */}
              <svg
  ref={svgRef}
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <defs>
    <filter id="axo-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.7" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
</svg>

              {/* Channel icons */}
              {channelVisualItems.map((item, i) => (
                <div
                  key={item.name}
                  className="axo-icon will-change-transform"
                  title={item.name}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    animation: i < 4 ? `axo-float ${2.2 + i * 0.25}s ease-in-out infinite` : "none",
                    animationDelay: `${i * 0.35}s`,
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: 26, height: 26, objectFit: "contain" }}
                  />
                </div>
              ))}
              {/* Pulse rings */}
              <div className="axo-hub-ring" style={{ animationDelay: "0s" }} />
              <div
                className="axo-hub-ring"
                style={{ animationDelay: "0.9s" }}
              />

              {/* Center hub */}
              <div
                className="absolute z-10"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
             <div
  className="axo-center-hub flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(17,26,47,0.97)",
                    border: "0.5px solid rgba(99,102,241,0.45)",
                    boxShadow: "0 0 32px rgba(99,102,241,0.2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  
                  <div>
                    <img src="/img/logo/axodesk-new-logo-dark.png" alt="AxoDesk" className="h-6 w-auto object-contain" />
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-10">
          <HeroDashboard />
        </div>
      </div>
      
    </section>
  );
};
