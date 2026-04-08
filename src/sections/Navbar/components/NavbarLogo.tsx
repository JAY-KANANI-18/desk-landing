import { Link } from "react-router-dom";

export const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-brand-600 rounded-xl rotate-3 group-hover:rotate-6 transition-transform" />
        <div className="relative w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" opacity="0.9"/>
            <circle cx="8" cy="11" r="1.2" fill="#4f46e5"/>
            <circle cx="12" cy="11" r="1.2" fill="#4f46e5"/>
            <circle cx="16" cy="11" r="1.2" fill="#4f46e5"/>
          </svg>
        </div>
      </div>
      <span className="text-white text-lg font-bold tracking-tight">OmniChat</span>
    </Link>
  );
};
