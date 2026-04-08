import type { ReactNode } from "react";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { GlowCursor } from "@/components/GlowCursor";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080c14] text-white font-sans overflow-x-hidden">
      <GlowCursor />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
