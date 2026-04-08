import { useState, useEffect, useRef } from "react";

const conversations = [
  { id: 1, name: "Sarah M.", channel: "WhatsApp", message: "Hi! Is my order #4421 shipped yet?", time: "now", avatar: "#25D366", channelIcon: "https://cdn.simpleicons.org/whatsapp/25D366", unread: 2, status: "open" },
  { id: 2, name: "James K.", channel: "Instagram", message: "Love your product! Can I get bulk pricing?", time: "2m", avatar: "#E4405F", channelIcon: "https://cdn.simpleicons.org/instagram/E4405F", unread: 1, status: "open" },
  { id: 3, name: "Alex P.", channel: "Messenger", message: "What&#39;s your return policy?", time: "5m", avatar: "#0084FF", channelIcon: "https://cdn.simpleicons.org/messenger/0084FF", unread: 0, status: "assigned" },
  { id: 4, name: "Maria C.", channel: "Email", message: "Re: Invoice #2290 — can you resend?", time: "12m", avatar: "#EA4335", channelIcon: "https://cdn.simpleicons.org/gmail/EA4335", unread: 0, status: "resolved" },
];

const replyMessages = [
  { from: "customer", text: "Hi! Is my order #4421 shipped yet?" },
  { from: "agent", text: "Hi Sarah! Yes, it shipped this morning via FedEx 🎉" },
  { from: "customer", text: "Amazing! Can I get the tracking number?" },
  { from: "agent", text: "Of course! FDX-4421-9XA. Arrives by Thursday." },
];

export const HeroDashboard = () => {
  const [activeConv, setActiveConv] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(v => {
          if (v >= replyMessages.length) {
            setNotification(true);
            setTimeout(() => setNotification(false), 2000);
            return 1;
          }
          return v + 1;
        });
      }, 1200);
    }, 2400);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div
      className={`relative transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-brand-600/5 rounded-3xl blur-3xl scale-110 pointer-events-none animate-glow-pulse" />

      {/* Notification toast */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${notification ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-xl shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300 font-semibold">New message received</span>
        </div>
      </div>

      <div className={`relative rounded-2xl bg-[#0d1422] border border-white/8 shadow-2xl shadow-black/50 overflow-hidden scan-glow transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          <div className="mx-auto text-xs text-slate-500 font-medium">OmniChat — Unified Inbox</div>
          <div className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>

        <div className="flex h-[460px]">
          {/* Sidebar */}
          <div className="w-52 border-r border-white/5 flex flex-col">
            <div className="px-3 py-3 border-b border-white/5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Inbox</div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400">4 open conversations</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConv(i)}
                  className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-all duration-200 ${activeConv === i ? "bg-brand-600/15 border-r-2 border-brand-500" : "hover:bg-white/4"}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105" style={{ background: c.avatar }}>
                      {c.name[0]}
                    </div>
                    <img src={c.channelIcon} alt={c.channel} className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border border-[#0d1422]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-white truncate">{c.name}</span>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-1">{c.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate leading-relaxed">{c.message}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="shrink-0 w-4 h-4 rounded-full bg-brand-600 text-[9px] font-bold text-white flex items-center justify-center animate-bounce-gentle">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: conversations[activeConv].avatar }}>
                  {conversations[activeConv].name[0]}
                </div>
                <img src={conversations[activeConv].channelIcon} alt="" className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border border-[#0d1422]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{conversations[activeConv].name}</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  via {conversations[activeConv].channel}
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${conversations[activeConv].status === "open" ? "bg-green-500/20 text-green-400" : conversations[activeConv].status === "assigned" ? "bg-brand-600/20 text-brand-400" : "bg-slate-600/20 text-slate-400"}`}>
                    {conversations[activeConv].status}
                  </span>
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="text-[10px] text-slate-500 hover:text-white px-2 py-1 rounded-lg bg-white/4 hover:bg-white/8 transition-all">Assign</button>
                <button className="text-[10px] text-slate-500 hover:text-white px-2 py-1 rounded-lg bg-white/4 hover:bg-white/8 transition-all">Note</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {replyMessages.slice(0, visibleMessages).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"} animate-slide-up`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed transition-all ${msg.from === "agent" ? "bg-brand-600 text-white rounded-br-sm" : "bg-white/8 text-slate-200 rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white/8 flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:border-white/14 transition-all group">
                <span className="text-xs text-slate-500 flex-1">Type a reply...</span>
                <button className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center hover:bg-brand-500 transition-colors group-hover:scale-105 transition-transform">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges with animation */}
      <div className={`absolute -left-6 top-1/3 bg-[#0d1422] border border-white/10 rounded-xl px-3 py-2.5 shadow-xl hidden lg:block animate-float`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white font-medium">Live sync on</span>
        </div>
      </div>
      <div className={`absolute -right-6 bottom-1/3 bg-[#0d1422] border border-white/10 rounded-xl px-3 py-2.5 shadow-xl hidden lg:block animate-float-delayed`}>
        <div className="text-xs text-slate-400">Response time</div>
        <div className="text-lg font-bold text-white">1.8m <span className="text-xs text-green-400">avg</span></div>
      </div>
    </div>
  );
};
