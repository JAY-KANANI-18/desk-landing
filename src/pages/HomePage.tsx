import { useSEO } from "../hooks/useSEO";
import { HeroSection } from "../sections/HeroSection";
import { UnifiedThreadSection } from "../sections/UnifiedThreadSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { AutomationSection } from "../sections/AutomationSection";
import { TeamCollaborationSection } from "../sections/TeamCollaborationSection";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { CTASection } from "../sections/CTASection";

export const HomePage = () => {
  useSEO({
    title: "AxoDesk | AI Customer Conversation Management Platform",
    description:
      "AxoDesk unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat in one AI-powered team inbox. Automate replies, route leads, sync CRM data, and convert faster.",
    canonical: "https://axodesk.in/",
    ogImage: "https://axodesk.in/og-home.png",
    keywords:
      "AI customer conversation management software, customer conversation management platform, WhatsApp Business API platform, omnichannel team inbox, AI agents for sales and support, WhatsApp CRM, Instagram DM inbox, lead routing automation, WhatsApp API calling, conversation-led growth platform",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://axodesk.in/#organization",
        "name": "AxoDesk",
        "url": "https://axodesk.in",
        "logo": "https://axodesk.in/img/logo/axodesk-new-logo-dark.png",
        "foundingDate": "2022",
        "description":
          "AxoDesk is an AI-powered customer conversation management platform that unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat in one team inbox.",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61570976755467",
          "https://www.instagram.com/axodesk/",
          "https://www.g2.com/products/axodesk",
        ],
        "contactPoint": [
          { "@type": "ContactPoint", "contactType": "customer support", "email": "support@axodesk.in" },
          { "@type": "ContactPoint", "contactType": "sales", "email": "sales@axodesk.in" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AxoDesk",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "url": "https://axodesk.in",
        "offers": [
          { "@type": "Offer", "name": "Starter", "price": "29", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Growth", "price": "79", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Business", "price": "149", "priceCurrency": "USD" },
        ],
        "featureList": [
          "Omnichannel Team Inbox",
          "AI Agents",
          "Conversation Routing",
          "Lead Management",
          "CRM Sync",
          "Automation Workflows",
          "Analytics",
          "WhatsApp Business API",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AxoDesk?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "AxoDesk is an AI-powered customer conversation management platform. It combines WhatsApp Business API, Instagram, Messenger, Email, and Website Chat in one workspace so teams can respond faster with automation and full customer context.",
            },
          },
          {
            "@type": "Question",
            "name": "Who is AxoDesk for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "AxoDesk is built for fast-growing retail, ecommerce, and D2C teams that handle high conversation volume across multiple channels and need better team coordination.",
            },
          },
          {
            "@type": "Question",
            "name": "What problem does AxoDesk solve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "AxoDesk solves fragmented customer communication by centralizing messages, routing leads automatically, and helping teams manage conversations, AI workflows, and CRM context from one inbox.",
            },
          },
          {
            "@type": "Question",
            "name": "Is there a free trial?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes - all plans include a 14-day free trial with full access. No credit card required.",
            },
          },
          {
            "@type": "Question",
            "name": "Does AxoDesk support multiple industries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. AxoDesk supports retail, ecommerce, D2C, and support-led teams in other consumer-focused industries that need reliable omnichannel operations.",
            },
          },
        ],
      },
    ],
    breadcrumb: [{ name: "Home", url: "/" }],
  });

  return (
    <>
      <HeroSection />
    {/* <PlatformsSection /> */}
      <UnifiedThreadSection />
      <FeaturesSection />
      <AutomationSection />
    {/* <AISection /> */}
      <TeamCollaborationSection />
      <AnalyticsSection />
    {/* <ComingSoonSection />
    <IntegrationsSection /> */}
      <CTASection />
    </>
  );
};
