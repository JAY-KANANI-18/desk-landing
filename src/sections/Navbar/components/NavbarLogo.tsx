import { Link } from "react-router-dom";

export const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        src="/img/logo/axodesk-new-logo-dark.png"
        alt="AxoDesk"
        className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </Link>
  );
};
