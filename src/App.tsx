import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";
import { HomePage } from "./pages/HomePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { IndustryPage } from "./pages/IndustryPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { WhatsAppPricingPage } from "./pages/WhatsAppPricingPage";
import { WhatsAppLinkGeneratorPage } from "./pages/WhatsAppLinkGeneratorPage";
import { BlogPage } from "./pages/BlogPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { TalkToSalesPage } from "./pages/TalkToSalesPage";
import { RetailPage } from "./pages/RetailPage";
import { GlowCursor } from "./components/GlowCursor";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080c14] text-white font-sans overflow-x-hidden">
        <GlowCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/industry" element={<IndustryPage />} />
          <Route path="/industry/retail" element={<RetailPage />} />
          <Route path="/industry/retail/:sub" element={<RetailPage />} />
          <Route path="/industry/travel" element={<IndustryPage />} />
          <Route path="/industry/:slug" element={<IndustryPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:section" element={<ResourcesPage />} />
          <Route path="/tools/whatsapp-pricing" element={<WhatsAppPricingPage />} />
          <Route path="/tools/whatsapp-link-generator" element={<WhatsAppLinkGeneratorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/help/:category" element={<HelpCenterPage />} />
          <Route path="/help/:category/:article" element={<HelpCenterPage />} />
          <Route path="/talk-to-sales" element={<TalkToSalesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
