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
    title: "OmniChat — #1 Omnichannel Customer Messaging Platform | WhatsApp, Instagram, Email",
    description: "OmniChat unifies WhatsApp Business API, Instagram DMs, Facebook Messenger, Email & Live Chat in one powerful inbox. AI automation, no-code workflows, real-time analytics. Better than respond.io & SleekFlow. Start free.",
    canonical: "https://omnichat.io/",
    ogImage: "https://omnichat.io/og-home.png",
    keywords: "omnichannel messaging platform, WhatsApp business API software, customer communication platform, respond.io alternative, sleekflow alternative, unified customer inbox, WhatsApp CRM software, omnichannel support tool, AI customer messaging, Instagram DM management, WhatsApp automation platform, customer messaging software 2025",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://omnichat.io/#organization",
        "name": "OmniChat",
        "url": "https://omnichat.io",
        "logo": "https://omnichat.io/logo.png",
        "foundingDate": "2022",
        "description": "OmniChat is the leading omnichannel customer messaging platform — unifying WhatsApp, Instagram, Messenger, Email and Live Chat with AI automation.",
        "sameAs": ["https://twitter.com/omnichat","https://linkedin.com/company/omnichat","https://facebook.com/omnichat","https://g2.com/products/omnichat"],
        "contactPoint": [{"@type":"ContactPoint","contactType":"customer support","email":"support@omnichat.io"},{"@type":"ContactPoint","contactType":"sales","email":"sales@omnichat.io"}]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "OmniChat",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "url": "https://omnichat.io",
        "offers": [
          {"@type":"Offer","name":"Starter","price":"29","priceCurrency":"USD"},
          {"@type":"Offer","name":"Growth","price":"79","priceCurrency":"USD"},
          {"@type":"Offer","name":"Business","price":"149","priceCurrency":"USD"}
        ],
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"560","bestRating":"5"},
        "featureList": ["Unified Inbox","WhatsApp Business API","AI Automation","Team Collaboration","Real-Time Analytics","CRM","API & Webhooks","GDPR Compliant"]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"What is OmniChat?","acceptedAnswer":{"@type":"Answer","text":"OmniChat is an omnichannel customer messaging platform that unifies WhatsApp, Instagram, Messenger, Email, and Live Chat into one inbox with AI automation and team collaboration."}},
          {"@type":"Question","name":"How does OmniChat compare to respond.io and SleekFlow?","acceptedAnswer":{"@type":"Answer","text":"OmniChat delivers a truly unified inbox with AI automation included in every plan, faster onboarding, and significantly lower pricing than respond.io and SleekFlow."}},
          {"@type":"Question","name":"Is OmniChat an official WhatsApp Business Solution Provider?","acceptedAnswer":{"@type":"Answer","text":"Yes, OmniChat is an official WhatsApp Business Solution Provider (BSP) with full API access, template management, broadcasting, and WhatsApp Calling API."}},
          {"@type":"Question","name":"Is there a free trial?","acceptedAnswer":{"@type":"Answer","text":"Yes — all plans include a 14-day free trial with full access. No credit card required."}},
          {"@type":"Question","name":"What industries does OmniChat support?","acceptedAnswer":{"@type":"Answer","text":"OmniChat serves e-commerce, retail, real estate, healthcare, education, finance, restaurants, automotive, travel, and professional services."}}
        ]
      }
    ],
    breadcrumb: [{ name: "Home", url: "/" }],
  });

  return (
  <>
    <HeroSection />
    <PlatformsSection />
    <UnifiedThreadSection />
    <FeaturesSection />
    <AutomationSection />
    <AISection />
    <TeamCollaborationSection />
    <AnalyticsSection />
    <ComingSoonSection />
    <IntegrationsSection />
    <CTASection />
  </>
  );
};
