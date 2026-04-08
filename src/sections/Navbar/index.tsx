import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarLogo } from "./components/NavbarLogo";
import { ProductDropdown } from "./components/ProductDropdown";
import { IndustriesDropdown } from "./components/IndustriesDropdown";
import { ResourcesDropdown } from "./components/ResourcesDropdown";
import { MobileMenu } from "./components/MobileMenu";
import { Menu, X, Globe, Phone } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { enableMultilanguage } from "@/i18n/messages";

type DropdownKey = "product" | "industries" | "resources";

export const Navbar = () => {
  const { t, locale, supportedLocales, localeLabels, changeLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isMenuOpen = !!activeDropdown;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    clearAll();
    setActiveDropdown(null);
    setIsVisible(false);
  }, [location]);

  const clearAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
  };

  const openDropdown = useCallback((name: DropdownKey) => {
    clearAll();
    setActiveDropdown(name);
    openTimer.current = setTimeout(() => setIsVisible(true), 10);
  }, []);

  const scheduleClose = useCallback(() => {
    clearAll();
    closeTimer.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setActiveDropdown(null), 220);
    }, 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearAll();
  }, []);

  const shrink = scrolled || isMenuOpen;

  return (
    <>
      <div className={`fixed py-2 top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${isMenuOpen ? "bg-[#0a0e1a] shadow-[0_8px_40px_rgba(0,0,0,0.6)]" : scrolled ? "bg-[#0a0e1a]/95 backdrop-blur-xl shadow-[0_1px_40px_rgba(0,0,0,0.45)] border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className={`transition-all duration-300 ease-out max-w-screen-xl mx-auto px-4 md:px-8`}>
          <div className={`flex items-center justify-between transition-all duration-300 ease-out ${shrink ? "h-14" : "h-16"} `}>
            <NavbarLogo />

            <div className="hidden md:flex items-center gap-0.5">
              {(["product", "industries", "resources"] as DropdownKey[]).map((key) => {
                const label = key === "product" ? t("nav.product") : key === "industries" ? t("nav.industries") : t("nav.resources");
                const isActive = activeDropdown === key;
                return (
                  <div key={key} className="relative" onMouseEnter={() => openDropdown(key)} onMouseLeave={scheduleClose}>
                    <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 select-none ${isActive ? "text-white bg-white/[0.08]" : "text-slate-300 hover:text-white hover:bg-white/[0.05]"}`}>
                      {label}
                      <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180 text-brand-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isActive && (
                      <div className="absolute left-0 right-0 h-4 bottom-0 translate-y-full" onMouseEnter={cancelClose} onMouseLeave={scheduleClose} />
                    )}
                  </div>
                );
              })}

              <Link to="/pricing" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all duration-200">
                {t("nav.pricing")}
              </Link>
              <Link to="/why-us" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all duration-200">
                {t("nav.whyUs")}
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              {enableMultilanguage && (
                <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-slate-400 rounded-lg border border-white/10">
                  <Globe className="w-3.5 h-3.5" />
                  <select
                    value={locale}
                    onChange={(e) => void changeLocale(e.target.value as (typeof supportedLocales)[number])}
                    className="bg-transparent text-xs font-medium outline-none cursor-pointer"
                    aria-label="Select language"
                  >
                    {supportedLocales.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#0a0e1a] text-white">
                        {localeLabels[loc]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.05]">
                {t("nav.login")}
              </button>
              <Link to="/talk-to-sales" className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-300 border border-white/10 rounded-lg hover:bg-white/[0.05] hover:text-white hover:border-white/20 transition-all duration-200">
                <Phone className="w-3.5 h-3.5" />
                {t("nav.talkToSales")}
              </Link>
              <Link to="/" className="px-4 py-1.5 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-500 transition-all duration-200 glow-brand-sm">
                {t("nav.startFreeTrial")}
              </Link>
            </div>

            <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {activeDropdown && (
          <div className={`w-full border-t border-white/[0.07] transition-all duration-220 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`} style={{transitionProperty: "opacity, transform", transitionDuration: isVisible ? "200ms" : "180ms", transitionTimingFunction: isVisible ? "cubic-bezier(0.16,1,0.3,1)" : "cubic-bezier(0.4,0,1,1)"}} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <div className={`transition-all duration-220 ease-out overflow-hidden ${isVisible ? "max-h-[640px]" : "max-h-0"}`} style={{transitionProperty: "max-height", transitionDuration: isVisible ? "240ms" : "200ms", transitionTimingFunction: isVisible ? "cubic-bezier(0.16,1,0.3,1)" : "cubic-bezier(0.4,0,1,1)"}}>
              <div className={`transition-all duration-300 ease-out ${shrink ? "max-w-[1160px]" : "max-w-screen-xl"} mx-auto`}>
                {activeDropdown === "product" && <ProductDropdown onClose={() => { setIsVisible(false); setTimeout(() => setActiveDropdown(null), 220); }} />}
                {activeDropdown === "industries" && <IndustriesDropdown onClose={() => { setIsVisible(false); setTimeout(() => setActiveDropdown(null), 220); }} />}
                {activeDropdown === "resources" && <ResourcesDropdown onClose={() => { setIsVisible(false); setTimeout(() => setActiveDropdown(null), 220); }} />}
              </div>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-600/40 to-transparent" />
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => { setIsVisible(false); setTimeout(() => setActiveDropdown(null), 220); }} />
      )}

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
};
