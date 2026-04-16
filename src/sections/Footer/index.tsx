import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const channels = [
  { src: "https://cdn.simpleicons.org/whatsapp/25D366", alt: "WhatsApp" },
  { src: "https://cdn.simpleicons.org/instagram/E4405F", alt: "Instagram" },
  { src: "https://cdn.simpleicons.org/messenger/0084FF", alt: "Messenger" },
  { src: "https://cdn.simpleicons.org/gmail/EA4335", alt: "Gmail" },
  { src: "https://cdn.simpleicons.org/telegram/26A5E4", alt: "Telegram" },
];

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 bg-[#060a10]">
      {/* Newsletter banner */}
      <div className="border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{t("footer.newsletterTitle")}</h3>
              <p className="text-sm text-slate-400">{t("footer.newsletterDesc")}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-600/50 transition-colors"
              />
              <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-all whitespace-nowrap">
                {t("footer.subscribe")} <ArrowRight className="w-3.5 h-3.5" />
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
              <img src="/img/logo/axodesk-new-logo-dark.png" alt="AxoDesk" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed max-w-xs">
              {t("footer.brandDesc")}
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t("footer.product")}</h3>
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t("footer.industries")}</h3>
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t("footer.resources")}</h3>
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2.5 mb-6">
              {["About Us", "Careers", "Partners", "Press Kit", "Security", "Contact Us"].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a href="mailto:hello@axodesk.in" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                hello@axodesk.in
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
          <p className="text-xs text-slate-600">{t("footer.allRights")}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t("footer.terms")}</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t("footer.cookies")}</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t("footer.gdpr")}</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-600">{t("footer.systemStatus")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
