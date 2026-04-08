import { useInView } from "../../hooks/useInView";

const channels = [
  { name: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp/25D366", color: "#25D366", users: "2B+ users", hoverBorder: "#25D366" },
  { name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E4405F", color: "#E4405F", users: "1.4B+ users", hoverBorder: "#E4405F" },
  { name: "Messenger", icon: "https://cdn.simpleicons.org/messenger/0084FF", color: "#0084FF", users: "1B+ users", hoverBorder: "#0084FF" },
  { name: "Email", icon: "https://cdn.simpleicons.org/gmail/EA4335", color: "#EA4335", users: "4B+ users", hoverBorder: "#EA4335" },
  { name: "Live Chat", icon: "https://cdn.simpleicons.org/livechat/FF5100", color: "#FF5100", users: "Website visitors", hoverBorder: "#FF5100" },
];

const allChannels = [...channels, ...channels];

export const PlatformsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-14 border-y border-white/5 bg-white/2 overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <p
          className={`text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Connect every channel your customers use
        </p>
      </div>

      {/* Auto-scroll rail */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #080c14, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, #080c14, transparent)" }} />
        <div className="flex gap-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {allChannels.map((ch, i) => (
              <div
                key={i}
                className="shrink-0 flex flex-col items-center gap-3 px-8 py-5 rounded-2xl border border-white/6 bg-white/2 transition-all duration-300 cursor-default group"
                style={{
                  minWidth: 140,
                  ["--hover-color" as string]: ch.color,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${ch.color}40`;
                  el.style.background = `${ch.color}08`;
                  el.style.boxShadow = `0 0 30px ${ch.color}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.background = "";
                  el.style.boxShadow = "";
                }}
              >
                <img src={ch.icon} alt={ch.name} className="w-10 h-10 rounded-xl group-hover:scale-125 group-hover:rotate-3 transition-transform duration-300" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">{ch.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{ch.users}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
