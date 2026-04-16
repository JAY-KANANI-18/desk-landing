import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import { HeroSection } from "../sections/HeroSection";
import { PlatformsSection } from "../sections/PlatformsSection";
import { UnifiedThreadSection } from "../sections/UnifiedThreadSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { AutomationSection } from "../sections/AutomationSection";
import { AISection } from "../sections/AISection";
import { TeamCollaborationSection } from "../sections/TeamCollaborationSection";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { ComingSoonSection } from "../sections/ComingSoonSection";
import { IntegrationsSection } from "../sections/IntegrationsSection";
import { CTASection } from "../sections/CTASection";

export const HomePage = () => {
  useSEO({
    title: "AxoDesk — Omnichannel Shared Inbox for Support & CX Teams",
    description: "AxoDesk helps fast-growing retail and ecommerce teams manage WhatsApp, Instagram, Messenger, Email, and Website Chat in one shared inbox. Reduce missed messages, reply faster, and run cleaner support operations.",
    canonical: "https://axodesk.in/",
    ogImage: "https://axodesk.in/og-home.png",
    keywords: "shared inbox, omnichannel support platform, ecommerce customer support software, whatsapp instagram inbox, customer communication platform, support operations software, d2c support tool, customer experience platform, team inbox for support",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://axodesk.in/#organization",
        "name": "AxoDesk",
        "url": "https://axodesk.in",
        "logo": "https://axodesk.in/img/logo/axodesk-new-logo-dark.png",
        "foundingDate": "2022",
        "description": "AxoDesk is an omnichannel shared inbox for modern support and CX teams, unifying WhatsApp, Instagram, Messenger, Email, and Website Chat.",
        "sameAs": ["https://twitter.com/axodesk","https://linkedin.com/company/axodesk","https://facebook.com/axodesk","https://g2.com/products/axodesk"],
        "contactPoint": [{"@type":"ContactPoint","contactType":"customer support","email":"support@axodesk.in"},{"@type":"ContactPoint","contactType":"sales","email":"sales@axodesk.in"}]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AxoDesk",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "url": "https://axodesk.in",
        "offers": [
          {"@type":"Offer","name":"Starter","price":"29","priceCurrency":"USD"},
          {"@type":"Offer","name":"Growth","price":"79","priceCurrency":"USD"},
          {"@type":"Offer","name":"Business","price":"149","priceCurrency":"USD"}
        ],
        "featureList": ["Shared Inbox","Omnichannel Messaging","Conversation Routing","Team Collaboration","SLA Tracking","Automation Workflows","Analytics","API & Webhooks"]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"What is AxoDesk?","acceptedAnswer":{"@type":"Answer","text":"AxoDesk is an omnichannel shared inbox for support and CX teams. It combines WhatsApp, Instagram, Messenger, Email, and Website Chat in one workspace so teams can reply faster with full customer context."}},
          {"@type":"Question","name":"Who is AxoDesk for?","acceptedAnswer":{"@type":"Answer","text":"AxoDesk is built for fast-growing retail, ecommerce, and D2C teams that handle high conversation volume across multiple channels and need better team coordination."}},
          {"@type":"Question","name":"What problem does AxoDesk solve?","acceptedAnswer":{"@type":"Answer","text":"AxoDesk solves fragmented communication by centralizing scattered customer messages into one thread, reducing missed inquiries, duplicate effort, and delayed replies."}},
          {"@type":"Question","name":"Is there a free trial?","acceptedAnswer":{"@type":"Answer","text":"Yes — all plans include a 14-day free trial with full access. No credit card required."}},
          {"@type":"Question","name":"Does AxoDesk support multiple industries?","acceptedAnswer":{"@type":"Answer","text":"Yes. AxoDesk supports retail, ecommerce, D2C, and support-led teams in other consumer-focused industries that need reliable omnichannel operations."}}
        ]
      }
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
