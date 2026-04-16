import {
  Send,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Tag,
  Clock3,
  ShoppingBag,
  Star,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  CircleDot,
  ChevronDown,
  Sparkles,
  StickyNote,
  PanelRight,
  Check,
  CheckCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Sarah M.",
    channel: "WhatsApp",
    message: "Hi! Is my order #4421 shipped yet?",
    time: "now",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    channelIcon: "https://cdn.simpleicons.org/whatsapp/25D366",
    unread: 2,
    status: "Open",
    phone: "+1 (415) 555-0142",
    email: "sarah@example.com",
    orderId: "#4421",
    lastOrder: "Marble Tile Pack",
    tags: ["VIP", "Order Issue", "Repeat Buyer"],
     connectedChannels: [
    {
      name: "WhatsApp",
      icon: "https://cdn.simpleicons.org/whatsapp/25D366",
      value: "+1 (415) 555-0142",
      connected: true,
      primary: true,
    },
    {
      name: "Instagram",
      icon: "https://cdn.simpleicons.org/instagram/E4405F",
      value: "@sarah.designs",
      connected: true,
    },
    {
      name: "Email",
      icon: "https://cdn.simpleicons.org/gmail/EA4335",
      value: "sarah@example.com",
      connected: true,
    },
  ],
  },
  {
    id: 2,
    name: "James K.",
    channel: "Instagram",
    message: "Love your product! Can I get bulk pricing?",
    time: "2m",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    channelIcon: "https://cdn.simpleicons.org/instagram/E4405F",
    unread: 1,
    status: "Assigned",
    phone: "+1 (212) 555-0184",
    email: "james@example.com",
    orderId: "#5109",
    lastOrder: "Designer Wall Set",
    tags: ["Bulk Lead", "High Intent"],
  },
  {
    id: 3,
    name: "Alex P.",
    channel: "Messenger",
    message: "What's your return policy?",
    time: "5m",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    channelIcon: "https://cdn.simpleicons.org/messenger/0084FF",
    unread: 0,
    status: "Open",
    phone: "+1 (646) 555-0108",
    email: "alex@example.com",
    orderId: "#3988",
    lastOrder: "Kitchen Mosaic Kit",
    tags: ["Return", "First Order"],
  },
  {
    id: 4,
    name: "Maria C.",
    channel: "Email",
    message: "Re: Invoice #2290 — can you resend?",
    time: "12m",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    channelIcon: "https://cdn.simpleicons.org/gmail/EA4335",
    unread: 0,
    status: "Resolved",
    phone: "+1 (917) 555-0192",
    email: "maria@example.com",
    orderId: "#2290",
    lastOrder: "Bathroom Accent Pack",
    tags: ["Invoice", "B2B"],
  },
];

const assignees = [
  { name: "Unassigned", avatar: "", short: "U" },
  { name: "Emma", avatar: "https://randomuser.me/api/portraits/women/65.jpg", short: "S" },
  { name: "Daniel", avatar: "https://randomuser.me/api/portraits/men/41.jpg", short: "D" },
  { name: "Ava", avatar: "https://randomuser.me/api/portraits/women/26.jpg", short: "A" },
];

type TimelineItem =
  | {
      id: number;
      type: "event";
      icon: React.ReactNode;
      text: string;
      time: string;
      tone?: "default" | "success" | "brand";
    }
  | {
      id: number;
      type: "message";
      from: "customer" | "agent";
      text: string;
      time: string;
    };

const timelineByConversation: Record<number, TimelineItem[]> = {
  1: [
    // {
    //   id: 1,
    //   type: "event",
    //   icon: <CircleDot size={12} />,
    //   text: "Conversation opened",
    //   time: "08:52 PM",
    //   tone: "default",
    // },
    {
      id: 2,
      type: "event",
      icon: <UserPlus size={12} />,
      text: "Assigned to Emma ",
      time: "08:53 PM",
      tone: "brand",
    },
    {
      id: 3,
      type: "message",
      from: "customer",
      text: "Hi! Is my order #4421 shipped yet?",
      time: "08:54 PM",
    },
    // {
    //   id: 4,
    //   type: "event",
    //   icon: <StickyNote size={12} />,
    //   text: "Internal note added: check shipping provider",
    //   time: "08:54 PM",
    //   tone: "default",
    // },
    {
      id: 5,
      type: "message",
      from: "agent",
      text: "Hi Sarah! Yes, it shipped this morning via FedEx 🚚",
      time: "08:55 PM",
    },
    {
      id: 6,
      type: "message",
      from: "customer",
      text: "Amazing! Can I get the tracking number?",
      time: "08:55 PM",
    },
    {
      id: 7,
      type: "message",
      from: "agent",
      text: "Of course! FDX-4421-9XA. Arrives by Thursday.",
      time: "08:56 PM",
    },
  ],
  2: [
    {
      id: 1,
      type: "event",
      icon: <CircleDot size={12} />,
      text: "Conversation opened",
      time: "09:00 AM",
      tone: "default",
    },
    {
      id: 2,
      type: "message",
      from: "customer",
      text: "Love your product! Can I get bulk pricing?",
      time: "09:02 AM",
    },
    {
      id: 3,
      type: "event",
      icon: <UserPlus size={12} />,
      text: "Assigned to Daniel",
      time: "09:02 AM",
      tone: "brand",
    },
    {
      id: 4,
      type: "message",
      from: "agent",
      text: "Absolutely — how many units are you looking for?",
      time: "09:03 AM",
    },
  ],
  3: [
    {
      id: 1,
      type: "event",
      icon: <CircleDot size={12} />,
      text: "Conversation opened",
      time: "11:12 AM",
      tone: "default",
    },
    {
      id: 2,
      type: "message",
      from: "customer",
      text: "What's your return policy?",
      time: "11:14 AM",
    },
    {
      id: 3,
      type: "message",
      from: "agent",
      text: "You can return unused items within 14 days of delivery.",
      time: "11:15 AM",
    },
  ],
  4: [
    {
      id: 1,
      type: "event",
      icon: <CircleDot size={12} />,
      text: "Conversation opened",
      time: "02:16 PM",
      tone: "default",
    },
    {
      id: 2,
      type: "message",
      from: "customer",
      text: "Re: Invoice #2290 — can you resend?",
      time: "02:18 PM",
    },
    {
      id: 3,
      type: "message",
      from: "agent",
      text: "Done — I’ve resent it to your email just now.",
      time: "02:19 PM",
    },
    {
      id: 4,
      type: "event",
      icon: <CheckCircle2 size={12} />,
      text: "Conversation resolved",
      time: "02:20 PM",
      tone: "success",
    },
  ],
};

const statusStyles: Record<string, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Assigned: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resolved: "bg-slate-100 text-slate-700 border-slate-200",
};

export const HeroDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [activeConv, setActiveConv] = useState(0);
  const [mobileScale, setMobileScale] = useState(0.34);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isTyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState("Emma");
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  const active = conversations[activeConv];
  const baseTimeline = useMemo(
    () => timelineByConversation[active.id] || [],
    [active.id]
  );



  const timeline = useMemo(() => {
    const arr = [...baseTimeline];

    return arr;
  }, [baseTimeline, active.id]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const viewport = Math.max(window.innerWidth - 24, 300);
      const next = Math.min(0.53, Math.max(0.31, viewport / 1060));
      setMobileScale(next);
    };
    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    setVisibleCount(Math.min(3, timeline.length));
    setIsTyping(false);
    setShowAssignDropdown(false);
  }, [active.id, selectedAssignee]);

  useEffect(() => {
    if (!mounted || active.id !== 1) return;

    const interval = setInterval(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => {
          if (prev >= timeline.length) {
            setNotification(true);
            setTimeout(() => setNotification(false), 1600);
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    }, 2200);

    return () => clearInterval(interval);
  }, [mounted, active.id, timeline.length]);

  const shell = (
    <div
      className={`relative w-[1120px] max-h-fit rounded-[24px] bg-transparent border border-[#E8EBF3] shadow-[0_30px_90px_rgba(2,6,23,0.18),0_0_80px_rgba(99,102,241,0.06)]  transition-all duration-700  ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* top bar */}
      <div className="h-11 border-b border-[#E9EDF5] bg-white/90 flex items-center px-4 rounded-t-[24px]">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto text-[12px] text-slate-500 font-medium">
          AxoDesk — Unified Inbox
        </div>
       
      </div>

      <div className="grid h-[calc(100%-44px)] grid-cols-[270px_1fr_250px]">
        {/* LEFT */}
        <div className="border-r border-[#E9EDF5] bg-[#FAFBFF] rounded-bl-[24px]">
          <div className="border-b border-[#E9EDF5] px-4 py-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-slate-900">Inbox</h3>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-[#E6EAF2] bg-white p-2 text-slate-500 hover:bg-slate-50">
                  <Search size={15} />
                </button>
                <button className="rounded-lg border border-[#E6EAF2] bg-white p-2 text-slate-500 hover:bg-slate-50">
                  <Filter size={15} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-5 text-[13px]">
              <button className="relative font-semibold text-indigo-600">
                Open
                <span className="absolute -bottom-[11px] left-0 h-[2px] w-full rounded-full bg-indigo-500" />
              </button>
              <button className="text-slate-500">Closed</button>

              <div className="ml-auto flex items-center gap-2 text-slate-500">
                <span className="inline-flex h-5 w-10 items-center rounded-full bg-slate-200 p-0.5">
                  <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
                </span>
                <span>Unreplied</span>
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-90px)] ">
            {conversations.map((c, i) => (
              <button
                key={c.id}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-[#F0F2F7] transition-all ${
                  activeConv === i
                    ? "bg-indigo-50"
                    : "hover:bg-white"
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-white bg-white">
                    <img src={c.channelIcon} alt={c.channel} className="h-2.5 w-2.5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-semibold text-slate-900">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.time}</span>
                  </div>

                  <p className="truncate text-[12px] text-slate-500">
                    {c.message}
                  </p>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="rounded-full bg-white border border-[#E7EAF1] px-1.5 py-0.5 text-[10px] text-slate-500">
                      {c.channel}
                    </span>
                    <span
                      className={`rounded-full border px-1.5 py-0.5 text-[10px] ${
                        statusStyles[c.status]
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>

                {c.unread > 0 && (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-brand-600 text-[9px] font-bold text-white flex items-center justify-center ">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}

            <div className="px-4 py-5 text-center text-[12px] text-slate-400">
              All conversations loaded
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col bg-white">
          <div className="h-[64px] border-b border-[#E9EDF5] px-5 flex items-center">
            <div className="relative shrink-0">
              <img
                src={active.avatar}
                alt={active.name}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-white bg-white">
                <img
                  src={active.channelIcon}
                  alt={active.channel}
                  className="h-2.5 w-2.5"
                />
              </span>
            </div>

            <div className="ml-3">
              <div className="flex items-center gap-1.5">
                <p className="text-[18px] font-semibold text-slate-900">{active.name}</p>
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span className="text-[12px] text-indigo-600">Lead</span>
              </div>
              {/* <p className="text-[12px] text-slate-500">via {active.channel}</p> */}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* assign dropdown */}
              <div className="relative">
                <button
                disabled
                  onClick={() => setShowAssignDropdown((s) => !s)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E5EAF2] bg-white px-3 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  <UserPlus size={14} />
                  {selectedAssignee}
                  <ChevronDown size={14} />
                </button>

                
              </div>

              <button className="rounded-xl border border-[#E5EAF2] bg-white p-2 text-slate-500 hover:bg-slate-50">
                <Search size={16} />
              </button>
              <button className="rounded-xl border border-[#E5EAF2] bg-white px-3 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50">
                {active.status}
              </button>
              <button className="rounded-xl border border-[#E5EAF2] bg-white p-2 text-slate-500 hover:bg-slate-50">
                <PanelRight size={16} />
              </button>
            </div>
          </div>

          {/* timeline */}
          <div className="relative flex-1  px-5 py-4">
            <div className="mx-auto mb-4 w-fit rounded-full border border-[#E6EAF2] bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
              Today
            </div>

            <div className="space-y-2.5">
              {timeline.slice(0, visibleCount).map((item, idx) => (
                <div key={item.id} className="relative">
                  {item.type === "event" ? (
                    <div className="flex items-center justify-center">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] ${
                          item.tone === "success"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.tone === "brand"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                        <span className="text-slate-400">{item.time}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        item.from === "agent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {item.from === "customer" && (
                        <img
                          src={active.avatar}
                          alt={active.name}
                          className="mr-2.5 mt-auto h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
                        />
                      )}

                      <div
                        className={`max-w-[70%] ${
                          item.from === "agent" ? "items-end" : "items-start"
                        } flex flex-col`}
                      >
                        <div
                          className={`rounded-2xl px-3 py-2 text-[12px] leading-[1.45] shadow-sm ${
                            item.from === "agent"
                              ? "rounded-br-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                              : "rounded-bl-md border border-[#E8EBF2] bg-[#F8FAFD] text-slate-800"
                          }`}
                        >
                          {item.text}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 px-1 text-[10px] text-slate-400">
                          <span>{item.time}</span>
                          {item.from === "agent" && <CheckCheck size={14} className="text-indigo-500 flex-shrink-0" />}
                        </div>
                      </div>

                      {item.from === "agent" && (
                        <img
                          src="https://randomuser.me/api/portraits/men/12.jpg"
                          alt="Agent"
                          className="ml-2.5 mt-auto h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
                        />
                      )}
                    </div>
                  )}

                  {/* fake subtle line */}
                  {idx !== visibleCount - 1 && (
                    <div className="pointer-events-none absolute left-1/2 top-full h-2 w-px -translate-x-1/2 bg-[#E7EBF3]" />
                  )}
                </div>
              ))}

              {isTyping && active.id === 1 && (
                <div className="flex justify-start">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="mr-2.5 mt-auto h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="rounded-2xl rounded-bl-md border border-[#E8EBF2] bg-[#F8FAFD] px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* composer */}
          <div className="border-t border-[#E9EDF5] px-4 py-3">
            <div className="rounded-[18px] border border-[#E7EBF3] bg-[#FBFCFF] px-4 py-3">
              <div className="mb-3 min-h-[46px] text-[13px] text-slate-400">
                Reply... type "$" for variables
              </div>

              <div className="flex items-center justify-between border-t border-[#EEF2F7] pt-2.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="rounded-lg p-1.5 hover:bg-slate-100">
                    <Tag size={16} />
                  </button>
                  <button className="rounded-lg p-1.5 hover:bg-slate-100">
                    <Sparkles size={16} />
                  </button>
                  <button className="rounded-lg p-1.5 hover:bg-slate-100">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[12px] font-medium text-indigo-700 hover:bg-indigo-100">
                    Reply
                  </button>
                  <button className="rounded-xl border border-[#E5EAF2] bg-white px-3 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50">
                    Note
                  </button>
                  <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 p-2 text-white shadow-md shadow-indigo-500/15 hover:scale-[1.03] transition">
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-l border-[#E9EDF5] bg-[#FBFCFF] px-4 py-4 rounded-br-[24px]">
          <div className="mb-5 flex flex-col items-center">
            <img
              src={active.avatar}
              alt={active.name}
              className="mb-3 h-16 w-16 rounded-full object-cover ring-1 ring-slate-200"
            />
            <h4 className="text-[20px] font-semibold text-slate-900">{active.name}</h4>
            <p className="mt-1 text-[12px] text-slate-500">{active.phone}</p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {active.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[10px] text-indigo-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
  <span className="text-[11px] font-medium text-slate-500">Connected</span>

  <div className="flex items-center -space-x-1">
    {active.connectedChannels?.map((item, idx) => (
      <div
        key={item.name}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white shadow-sm ring-1 ring-[#E8EBF2]"
        title={item.name}
      >
        <img
          src={item.icon}
          alt={item.name}
          className="h-3.5 w-3.5 object-contain"
        />
      </div>
    ))}
  </div>
</div>
          </div>

          <div className="space-y-3">
            <SidebarCard icon={<Phone size={13} />} label="Phone" value={active.phone} />
            <SidebarCard icon={<Mail size={13} />} label="Email" value={active.email} />
            <SidebarCard
              icon={<ShoppingBag size={13} />}
              label="Last Order"
              value={active.lastOrder}
            />
            <SidebarCard icon={<Tag size={13} />} label="Order ID" value={active.orderId} />
            <SidebarCard icon={<Clock3 size={13} />} label="Last Seen" value="2 mins ago" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            
            <button className="rounded-xl border border-[#E6EAF2] bg-white px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50">
              View Order
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative mx-auto w-full max-w-[1120px] transition-all duration-1000 ease-out ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 scale-110 rounded-[34px] bg-indigo-500/5 blur-3xl" />

     

      <div
        className="relative w-full  md:hidden"
        style={{ height: `${Math.round(620 * mobileScale)}px` }}
      >
        <div
          className="absolute left-1/2 top-0 origin-top rounded-[24px]"
          style={{
            width: "1120px",
            transform: `translateX(-50%) scale(${mobileScale})`,
          }}
        >
          {shell}
        </div>
      </div>

<div className="hidden lg:flex justify-center items-center w-full min-h-[560px]">
  <div
    className="relative flex justify-center items-center"
    style={{
      width: `${1120 * 0.78}px`,
      height: `${684.8}px`, // 878 * 0.78 approx visible height
    }}
  >
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: "1120px",
        transform: "translate(-50%, -50%) scale(0.78)",
        transformOrigin: "center center",
      }}
    >
      {shell}
    </div>
  </div>
</div>
   </div>
  );
};

function SidebarCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E8EBF2] bg-white p-3">
      <div className="mb-1 flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="text-[12px] font-medium text-slate-700 leading-5">{value}</p>
    </div>
  );
}