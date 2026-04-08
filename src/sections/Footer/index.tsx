import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const channels = [
  { src: "https://cdn.simpleicons.org/whatsapp/25D366", alt: "WhatsApp" },
  { src: "https://cdn.simpleicons.org/instagram/E4405F", alt: "Instagram" },
  { src: "https://cdn.simpleicons.org/messenger/0084FF", alt: "Messenger" },
  { src: "https://cdn.simpleicons.org/gmail/EA4335", alt: "Gmail" },
  { src: "https://cdn.simpleicons.org/telegram/26A5E4", alt: "Telegram" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#060a10]">
      {/* Newsletter banner */}
      <div className="border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Stay up to date with OmniChat</h3>
              <p className="text-sm text-slate-400">Product updates, tips, and industry insights — delivered to your inbox.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-600/50 transition-colors"
              />
              <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-all whitespace-nowrap">
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">
          {/* Brand col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-white text-lg font-bold">OmniChat</span>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed max-w-xs">
              One inbox for every customer conversation. Manage WhatsApp, Instagram, Messenger, Email, and more — all in one place.
            </p>

            {/* Channels */}
            <div className="flex items-center gap-2 mb-5">
              {channels.map(c => (
                <img key={c.alt} src={c.src} alt={c.alt} className="w-6 h-6 rounded-lg opacity-70 hover:opacity-100 transition-opacity" />
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600/30 hover:border-brand-600/30 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Product</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Features", to: "/features" },
                { label: "Pricing", to: "/pricing" },
                { label: "Integrations", to: "/" },
                { label: "API & Docs", to: "/" },
                { label: "Changelog", to: "/" },
                { label: "Roadmap", to: "/" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-500 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Industries</h3>
            <ul className="space-y-2.5">
              {[
                { label: "E-commerce", to: "/industry/ecommerce" },
                { label: "Real Estate", to: "/industry/real-estate" },
                { label: "Education", to: "/industry/education" },
                { label: "Healthcare", to: "/industry/healthcare" },
                { label: "Financial", to: "/industry/finance" },
                { label: "All Industries", to: "/industry" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-500 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {["Documentation", "Help Center", "Blog", "Community", "Webinars", "Case Studies"].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Company</h3>
            <ul className="space-y-2.5 mb-6">
              {["About Us", "Careers", "Partners", "Press Kit", "Security", "Contact Us"].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a href="mailto:hello@omnichat.io" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                hello@omnichat.io
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2026 OmniChat Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map(l => (
              <a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-600">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
