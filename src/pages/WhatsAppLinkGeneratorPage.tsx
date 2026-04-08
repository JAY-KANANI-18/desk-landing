import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useSEO } from "../hooks/useSEO";
import {
  MessageCircle, Link2, QrCode, Copy, Download, CheckCircle2,
  ChevronDown, ChevronUp, Zap, Tag, Users, ArrowRight, Share2, Smartphone
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
];

const FAQS = [
  {
    q: "What does a WhatsApp link look like?",
    a: "A WhatsApp link looks like https://wa.me/[number]. When clicked, it opens WhatsApp and starts a conversation with that number. You can also append a pre-filled message with ?text=your+message."
  },
  {
    q: "What happens after my customer clicks on a WhatsApp link or scans my QR?",
    a: "WhatsApp will open on their device — either the mobile app or WhatsApp Web. They&#39;ll be taken directly to a conversation with your number, with any pre-filled message you set already typed in, ready to send."
  },
  {
    q: "What happens after my customer clicks on a WhatsApp link or scans my link?",
    a: "The user is taken directly to a chat with your business on WhatsApp. If you set a pre-filled message, it will be auto-typed for them, making it effortless to start a conversation."
  },
  {
    q: "How much does it cost to generate a WhatsApp link?",
    a: "It&#39;s completely free to generate a WhatsApp link or QR code using our tool. No sign-up required."
  },
  {
    q: "How can I track where leads came from when they click on a WhatsApp link?",
    a: "You can use UTM parameters in your campaigns and combine them with OmniChat&#39;s analytics to track the source of each conversation."
  },
  {
    q: "Does a WhatsApp link work in my country?",
    a: "WhatsApp links work globally wherever WhatsApp is available. The wa.me link format is supported in all countries where WhatsApp operates."
  },
  {
    q: "Can I embed a WhatsApp link in an image?",
    a: "Yes — you can wrap any image in an anchor tag with your WhatsApp link as the href, making the image clickable and opening a WhatsApp chat."
  },
  {
    q: "I&#39;m a current respond.io user, can I also generate a WhatsApp link from the platform?",
    a: "Yes! OmniChat lets you generate links and manage all your WhatsApp conversations from a single unified inbox."
  },
  {
    q: "If I have a WhatsApp link, why would I need a WhatsApp QR code?",
    a: "QR codes are ideal for offline use — print them on flyers, packaging, business cards, or in-store signage. They&#39;re a great complement to digital links."
  },
  {
    q: "How to add a WhatsApp link to Instagram?",
    a: "Go to your Instagram profile → Edit Profile → Website, and paste your WhatsApp link. You can also add it to Stories using the Link sticker."
  },
  {
    q: "How to add a WhatsApp link to Google My Business?",
    a: "In your Google Business Profile dashboard, add your WhatsApp link under the \"Website\" or \"Booking\" URL field so customers can message you directly."
  },
  {
    q: "How can I manage leads generated from a WhatsApp link?",
    a: "OmniChat automatically captures all conversations from your WhatsApp link into a unified inbox, where your team can assign, respond, and track leads."
  },
  {
    q: "Is WhatsApp link available for WhatsApp Business App users?",
    a: "Yes — WhatsApp Business App users can generate a short link directly in the app settings. Our tool works for both personal and business numbers."
  },
];

const WHY_CARDS = [
  {
    icon: Zap,
    title: "Instant communication",
    desc: "Let customers reach you with one tap — no need to save your number first.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Tag,
    title: "Effective WhatsApp marketing",
    desc: "Place your link anywhere — ads, emails, social — to turn audiences into conversations.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Users,
    title: "Effortless lead collection",
    desc: "Capture customer numbers automatically as soon as they message you via your link.",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
  },
];

export const WhatsAppLinkGeneratorPage = () => {
  useSEO({
    title: "Free WhatsApp Link & QR Code Generator 2025 — Create wa.me Links Instantly",
    description: "Generate a WhatsApp click-to-chat link and scannable QR code in seconds. Add a pre-filled message, download your QR code, and share anywhere. Free, no sign-up required.",
    canonical: "https://omnichat.io/whatsapp-link-generator",
    ogImage: "https://omnichat.io/og-wa-link.png",
    keywords: "WhatsApp link generator, WhatsApp QR code generator, wa.me link creator, click to chat WhatsApp, WhatsApp click to chat link, WhatsApp business link free, create WhatsApp QR code, WhatsApp link maker tool",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "WhatsApp Link Generator", url: "/whatsapp-link-generator" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "WhatsApp Link & QR Code Generator",
        "url": "https://omnichat.io/whatsapp-link-generator",
        "description": "Free tool to create WhatsApp click-to-chat links and downloadable QR codes with optional pre-filled messages.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What does a WhatsApp link look like?", "acceptedAnswer": { "@type": "Answer", "text": "A WhatsApp link looks like https://wa.me/[country-code][number]. When clicked, it opens WhatsApp directly to a chat with that number. You can add a pre-filled message with ?text= parameter." } },
          { "@type": "Question", "name": "How do I create a free WhatsApp link?", "acceptedAnswer": { "@type": "Answer", "text": "Enter your country code and phone number in OmniChat's free generator, optionally add a pre-filled message, and click Generate. Your wa.me link and QR code are instantly ready to share." } },
          { "@type": "Question", "name": "Can I add a WhatsApp link to Instagram?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — paste your WhatsApp link in your Instagram bio under Edit Profile > Website, or use the Link sticker in Stories." } },
          { "@type": "Question", "name": "Is it free to generate a WhatsApp link?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, OmniChat's WhatsApp link and QR code generator is completely free with no sign-up required." } }
        ]
      }
    ],
  });

  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generated, setGenerated] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "qr">("link");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showCountryDrop, setShowCountryDrop] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const fullNumber = `${countryCode.replace("+", "")}${phone.replace(/\D/g, "")}`;

  const handleGenerate = () => {
    if (!phone.trim()) return;
    const encoded = encodeURIComponent(message);
    const link = message
      ? `https://wa.me/${fullNumber}?text=${encoded}`
      : `https://wa.me/${fullNumber}`;
    setWaLink(link);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(waLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = "whatsapp-qr.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  return (
    <div className="min-h-screen bg-[#080c14]">
      {/* ---------- HERO ---------- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* bg blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-green-500/6 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-brand-600/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              {/* badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">Free Tool</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                WhatsApp Link &amp; QR{" "}
                <span className="text-gradient">Generator</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                Create a WhatsApp click-to-chat link and QR code in seconds. Share it anywhere — ads, emails, bio links, or print — and let customers start a conversation instantly.
              </p>

              {/* steps */}
              <div className="space-y-4">
                {[
                  "Enter your country code followed by your WhatsApp phone number",
                  "Add an optional pre-filled message for customers",
                  "Click Generate Link — your link and QR code are ready",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-white">{i + 1}</span>
                    </div>
                    <p className="text-sm text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — generator card */}
            <div className="relative">
              {/* glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-green-500/20 via-brand-500/10 to-transparent" />
              <div className="relative bg-[#0f1525] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">

                {/* tabs */}
                <div className="flex gap-1 mb-6 p-1 bg-white/[0.04] rounded-lg">
                  {(["link", "qr"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${
                        activeTab === t
                          ? "bg-green-600 text-white shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t === "link" ? <Link2 className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                      {t === "link" ? "Link Generator" : "QR Generator"}
                    </button>
                  ))}
                </div>

                {/* form */}
                <div className="space-y-4 mb-5">
                  {/* phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      {/* country picker */}
                      <div className="relative">
                        <button
                          onClick={() => setShowCountryDrop(v => !v)}
                          className="flex items-center gap-1.5 h-11 px-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-white hover:border-green-500/40 transition-colors whitespace-nowrap"
                        >
                          <span>{selectedCountry.flag}</span>
                          <span className="font-mono text-slate-300">{countryCode}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                        {showCountryDrop && (
                          <div className="absolute top-12 left-0 z-50 w-52 bg-[#131929] border border-white/[0.1] rounded-xl shadow-2xl overflow-y-auto max-h-56">
                            {COUNTRY_CODES.map(c => (
                              <button
                                key={c.code}
                                onClick={() => { setCountryCode(c.code); setShowCountryDrop(false); }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                              >
                                <span>{c.flag}</span>
                                <span className="font-mono text-xs text-slate-500 w-10 shrink-0">{c.code}</span>
                                <span className="truncate">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="6501234567"
                        className="flex-1 h-11 px-4 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-green-500/50 transition-colors"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5">
                      Include country code + number in full (no spaces or dashes)
                    </p>
                  </div>

                  {/* message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Welcome message <span className="text-slate-600">(optional)</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Hi! I&#39;d like to know more about your services."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                    />
                    <p className="text-[11px] text-slate-600 mt-1">
                      This message will be auto-filled when customers open your link
                    </p>
                  </div>
                </div>

                {/* generate btn */}
                <button
                  onClick={handleGenerate}
                  disabled={!phone.trim()}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Generate {activeTab === "qr" ? "QR Code" : "Link"}
                </button>

                {/* result area */}
                {generated && waLink && (
                  <div className="mt-5 space-y-4 animate-[fadeSlideUp_0.4s_ease_both]">
                    <div className="h-px bg-white/[0.06]" />

                    {activeTab === "link" ? (
                      /* LINK RESULT */
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Your WhatsApp Link</p>
                        <div className="flex items-center gap-2 p-3 bg-white/[0.04] border border-green-500/20 rounded-xl">
                          <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                          <span className="flex-1 text-xs text-green-300 font-mono truncate">{waLink}</span>
                          <button onClick={handleCopy} className="shrink-0 p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                            {copiedLink
                              ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                              : <Copy className="w-4 h-4 text-slate-400 hover:text-white" />}
                          </button>
                        </div>

                        {/* phone preview */}
                        <div className="mt-4 flex items-center justify-center">
                          <div className="relative w-44">
                            {/* phone frame */}
                            <div className="bg-[#1a1f2e] border-2 border-white/10 rounded-3xl p-2 shadow-2xl">
                              <div className="bg-[#111827] rounded-2xl overflow-hidden">
                                {/* status bar */}
                                <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white">B</span>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-bold text-white leading-none">Your Business</p>
                                    <p className="text-[8px] text-green-200">Online</p>
                                  </div>
                                </div>
                                {/* chat area */}
                                <div className="bg-[#0b141a] px-3 py-3 min-h-[80px]">
                                  {message && (
                                    <div className="bg-[#1f2c34] rounded-lg rounded-tl-none px-2.5 py-1.5 max-w-[85%]">
                                      <p className="text-[9px] text-white leading-snug">{message.slice(0, 60)}{message.length > 60 ? "…" : ""}</p>
                                      <p className="text-[7px] text-slate-500 text-right mt-0.5">12:01 PM ✓✓</p>
                                    </div>
                                  )}
                                  {!message && (
                                    <div className="flex items-center justify-center h-16">
                                      <p className="text-[9px] text-slate-600 text-center">Customer opens chat…</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 w-full flex items-center justify-center gap-2 py-2 border border-green-500/30 rounded-xl text-sm font-semibold text-green-400 hover:bg-green-500/10 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          Test Link
                        </a>
                      </div>
                    ) : (
                      /* QR RESULT */
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Your WhatsApp QR Code</p>
                        <div className="flex flex-col items-center gap-4">
                          <div ref={qrRef} className="p-4 bg-white rounded-2xl shadow-lg shadow-green-500/10">
                            <QRCodeSVG
                              value={waLink}
                              size={160}
                              level="H"
                              fgColor="#075e54"
                              bgColor="#ffffff"
                              includeMargin={false}
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 text-center leading-snug">
                            Scan to open WhatsApp chat with<br />
                            <span className="text-green-400 font-mono">+{fullNumber}</span>
                          </p>
                          <button
                            onClick={handleDownloadQR}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl text-sm font-semibold text-white transition-all shadow-md shadow-green-600/20"
                          >
                            <Download className="w-4 h-4" />
                            Download QR Code (PNG)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHY USE WHATSAPP LINKS ---------- */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Why use WhatsApp links?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY_CARDS.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-[#0f1525]/70 border border-white/[0.07] rounded-2xl p-6 card-hover">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW TO USE ---------- */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Where to use your WhatsApp link & QR code
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Place your link or QR code everywhere your audience sees you — turning passive viewers into active conversations.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "📲", label: "Instagram & Facebook bio or stories" },
                  { icon: "📧", label: "Email signatures and newsletters" },
                  { icon: "🖨️", label: "Print — flyers, packaging, business cards" },
                  { icon: "🛒", label: "E-commerce checkout & order confirmation pages" },
                  { icon: "📢", label: "Paid ads with click-to-WhatsApp" },
                  { icon: "🏪", label: "Google My Business & physical storefronts" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <span className="text-xl w-8 shrink-0">{icon}</span>
                    <span className="text-sm text-slate-300 font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* right — stacked phone mockup showing QR scan */}
            <div className="flex items-center justify-center">
              <div className="relative w-64">
                {/* glow */}
                <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-2xl" />
                <div className="relative bg-[#0f1525] border border-white/10 rounded-3xl p-5 shadow-2xl">
                  {/* QR display card */}
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 mb-4">
                    <p className="text-[11px] font-bold text-[#075e54] uppercase tracking-widest">Scan to Chat</p>
                    <div className="p-1 bg-[#075e54] rounded-xl">
                      <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 49 }).map((_, i) => {
                          const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,8,15,22,29,36];
                          const dark = corners.includes(i) || (i % 7 === 3 && i > 10 && i < 38) || (Math.sin(i * 0.9) > 0.3);
                          return (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${dark ? "bg-white" : "bg-[#075e54]"}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500">wa.me/your-number</p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-slate-400">Point camera to scan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  openFaq === i
                    ? "border-brand-500/30 bg-brand-600/5"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={`text-sm font-semibold leading-snug ${openFaq === i ? "text-white" : "text-slate-300"}`}>
                    {faq.q}
                  </span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 animate-[fadeSlideUp_0.25s_ease_both]">
                    <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/15 border border-brand-500/25 mb-6">
            <Zap className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest">3× Your Business Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Turn every link into a{" "}
            <span className="text-gradient">managed conversation</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
            OmniChat captures every WhatsApp conversation from your links into a unified inbox — so your team never misses a lead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-brand-600/25">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3.5 border border-white/[0.12] text-slate-300 hover:text-white hover:border-white/25 font-semibold rounded-xl transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
