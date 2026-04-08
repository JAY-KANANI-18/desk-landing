import { Users, MessageSquare, AtSign, Share2, CheckCircle2 } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { AnimatedSection } from "../../components/AnimatedSection";

const cards = [
  { icon: <Share2 className="w-5 h-5" />, title: "Assign Conversations", desc: "Route chats to the right agent based on skills, availability, or custom rules.", color: "text-brand-400 bg-brand-600/15", glow: "rgba(79,70,229,0.3)" },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Internal Notes", desc: "Add context-rich private notes visible only to your team — never to customers.", color: "text-purple-400 bg-purple-600/15", glow: "rgba(139,92,246,0.3)" },
  { icon: <AtSign className="w-5 h-5" />, title: "@Mentions", desc: "Ping teammates directly in a conversation thread to pull in the right expert fast.", color: "text-emerald-400 bg-emerald-600/15", glow: "rgba(16,185,129,0.3)" },
  { icon: <Users className="w-5 h-5" />, title: "Shared Inbox", desc: "Your entire team works from a unified view — no silos, no missed conversations.", color: "text-orange-400 bg-orange-600/15", glow: "rgba(249,115,22,0.3)" },
];

export const TeamCollaborationSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-4 md:px-6 bg-white/2" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-screen-xl mx-auto">
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-5 uppercase tracking-wide">
              <Users className="w-3.5 h-3.5" />
              Team Collaboration
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Built for teams.<br />
              <span className="text-gradient">Loved by agents.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Give your support team the tools to work together seamlessly and never leave a customer waiting.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className="group p-6 rounded-2xl bg-white/3 border border-white/8 transition-all duration-500 cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${c.glow}`;
                (e.currentTarget as HTMLElement).style.borderColor = `${c.glow.replace("0.3", "0.4")}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${c.color}`}>
                {c.icon}
              </div>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Collaboration Mock */}
        <AnimatedSection direction="scale" threshold={0.2}>
          <div className="max-w-2xl mx-auto rounded-2xl bg-[#0d1220] border border-white/8 overflow-hidden shadow-2xl shadow-black/30 hover:border-white/14 transition-colors duration-500">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 bg-white/2">
              <div className="w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-[11px] font-bold text-brand-400">S</div>
              <span className="text-sm font-semibold text-white">Sarah K. — Order Support</span>
              <span className="ml-auto text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open
              </span>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WA" className="w-5 h-5 rounded-full mt-1 shrink-0" />
                <div className="bg-white/8 px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm text-slate-200 max-w-xs hover:bg-white/12 transition-colors">
                  My package still hasn&#39;t arrived and it&#39;s been 2 weeks!
                </div>
              </div>

              <div className="flex items-start gap-3 pl-6">
                <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-2.5 rounded-2xl text-xs text-amber-300 max-w-xs hover:bg-amber-500/15 transition-colors">
                  📝 <strong>Internal note:</strong> @Mike check with logistics team — order #8821 flagged missing
                </div>
              </div>

              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 ring-2 ring-brand-600/30">M</div>
                <div className="bg-brand-600 px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm text-white max-w-xs hover:bg-brand-500 transition-colors">
                  Hi Sarah! I&#39;ve escalated this to our logistics team. You&#39;ll hear back within 2 hours. So sorry for the delay! 🙏
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-white/5 flex items-center gap-3">
              <span className="text-[10px] text-slate-500">Assigned to: <span className="text-white font-medium">Mike Chen</span></span>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400">
                <CheckCircle2 className="w-3 h-3" />
                SLA: 1h 45m remaining
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
