/**
 * Central SEO data — keyword strategy tuned to outrank respond.io and sleekflow.io
 * on high-intent omnichannel, WhatsApp business, and customer messaging terms.
 *
 * Usage: import the constant and pass to useSEO() in the page component.
 * Pages can also call useSEO() inline without importing from here.
 */

export const SITE_URL = "https://omnichat.io";

/* ─────────────────────────────────────────────────────── */
/* HOME                                                   */
/* ─────────────────────────────────────────────────────── */
export const HOME_SEO = {
  title: "OmniChat — #1 Omnichannel Customer Messaging Platform | WhatsApp, Instagram, Email",
  description: "OmniChat unifies WhatsApp Business API, Instagram DMs, Facebook Messenger, Email & Live Chat in one powerful inbox. AI automation, no-code workflows, real-time analytics. Better than respond.io & SleekFlow. Start free.",
  keywords: "omnichannel messaging platform, WhatsApp business API software, customer communication platform, respond.io alternative, sleekflow alternative, unified customer inbox, WhatsApp CRM software, omnichannel support tool, AI customer messaging, Instagram DM management, WhatsApp automation platform, customer messaging software 2025, omnichannel chat platform",
  canonical: `${SITE_URL}/`,
  ogImage: `${SITE_URL}/og-home.png`,
};

/* ─────────────────────────────────────────────────────── */
/* FEATURES                                               */
/* ─────────────────────────────────────────────────────── */
export const FEATURES_SEO = {
  title: "OmniChat Features — Unified Inbox, AI Automation, Analytics & More",
  description: "Explore OmniChat's full feature set: unified omnichannel inbox, no-code automation builder, AI chatbot, team collaboration, advanced analytics, CRM, and enterprise security. Everything to scale customer conversations.",
  keywords: "omnichannel inbox features, WhatsApp automation tool, AI chatbot platform, no-code automation builder, customer support analytics, team inbox software, CRM messaging integration, automated customer service, WhatsApp workflow automation, business messaging features, omnichannel ticketing system",
  canonical: `${SITE_URL}/features`,
  ogImage: `${SITE_URL}/og-features.png`,
};

/* ─────────────────────────────────────────────────────── */
/* PRICING                                                */
/* ─────────────────────────────────────────────────────── */
export const PRICING_SEO = {
  title: "OmniChat Pricing — Transparent Plans Starting at $29/mo | No Hidden Fees",
  description: "OmniChat pricing plans for every team size. Starter $29/mo, Growth $79/mo, Business $149/mo. 14-day free trial, no credit card needed. Compare with respond.io, sleekflow — we beat them all.",
  keywords: "omnichannel software pricing, WhatsApp business platform cost, OmniChat plans, customer messaging software price, respond.io pricing alternative, sleekflow pricing alternative, omnichannel inbox pricing, WhatsApp API pricing, business chat software cost, affordable customer support platform",
  canonical: `${SITE_URL}/pricing`,
  ogImage: `${SITE_URL}/og-pricing.png`,
};

/* ─────────────────────────────────────────────────────── */
/* WHY US                                                 */
/* ─────────────────────────────────────────────────────── */
export const WHY_US_SEO = {
  title: "Why Choose OmniChat? Best respond.io & SleekFlow Alternative",
  description: "Why thousands choose OmniChat over respond.io, sleekflow, or Intercom. True omnichannel unification, AI automation on day 1, live in 24h, 40% faster response times, and transparent pricing. See the comparison.",
  keywords: "respond.io alternative, sleekflow alternative, intercom alternative, best omnichannel platform, OmniChat vs respond.io, OmniChat vs sleekflow, why choose OmniChat, best WhatsApp business platform, omnichannel CRM comparison, WhatsApp inbox comparison, best customer messaging software 2025",
  canonical: `${SITE_URL}/why-us`,
  ogImage: `${SITE_URL}/og-why-us.png`,
};

/* ─────────────────────────────────────────────────────── */
/* INDUSTRY — per-slug SEO data                          */
/* ─────────────────────────────────────────────────────── */
export const INDUSTRY_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  ecommerce: {
    title: "OmniChat for E-commerce — WhatsApp Sales, Cart Recovery & Customer Support",
    description: "Scale e-commerce with OmniChat: unified inbox, WhatsApp cart recovery, Instagram DM support, Shopify sync, and AI automation. 3× more sales with omnichannel messaging.",
    keywords: "WhatsApp for ecommerce, omnichannel ecommerce platform, WhatsApp cart recovery, Instagram DM ecommerce, ecommerce customer support software, Shopify WhatsApp integration, omnichannel retail messaging",
  },
  "real-estate": {
    title: "OmniChat for Real Estate — WhatsApp Lead Response & Property Booking",
    description: "Convert more property leads. Respond in under 60 seconds, automate viewing bookings via WhatsApp, and nurture leads from portals to signed contracts.",
    keywords: "WhatsApp for real estate, real estate lead generation WhatsApp, property booking automation, real estate CRM WhatsApp, WhatsApp lead nurturing, real estate messaging platform",
  },
  education: {
    title: "OmniChat for Education — Student Enrollment Automation & WhatsApp Support",
    description: "Automate admissions, manage student queries across WhatsApp and email, and increase enrollment conversions with OmniChat.",
    keywords: "WhatsApp for education, student enrollment automation, admissions WhatsApp bot, education messaging platform, WhatsApp universities, student support chatbot",
  },
  healthcare: {
    title: "OmniChat for Healthcare — WhatsApp Appointment Reminders & Patient Communication",
    description: "Reduce no-shows by 40% with WhatsApp appointment reminders. Automate post-visit follow-ups and patient communication with HIPAA-friendly encryption.",
    keywords: "WhatsApp for healthcare, patient appointment reminders WhatsApp, healthcare messaging platform, hospital communication software, clinic WhatsApp automation, patient engagement platform",
  },
  finance: {
    title: "OmniChat for Financial Services — Secure Client Messaging & Onboarding",
    description: "Modernize client communication with secure WhatsApp messaging. Automate KYC, onboarding, account alerts, and portfolio notifications — GDPR compliant.",
    keywords: "WhatsApp for financial services, secure banking messaging, KYC automation WhatsApp, client onboarding software, financial services communication platform",
  },
  food: {
    title: "OmniChat for Restaurants & Food Delivery — WhatsApp Reservations & Orders",
    description: "Let customers book tables and track deliveries via WhatsApp. Automate order confirmations, reservation reminders, and post-visit review requests.",
    keywords: "WhatsApp for restaurants, restaurant reservation WhatsApp, food delivery WhatsApp automation, restaurant messaging platform, WhatsApp table booking",
  },
  automotive: {
    title: "OmniChat for Automotive — WhatsApp Test Drive Booking & Service Reminders",
    description: "Auto-respond to test drive inquiries, book service appointments via WhatsApp, and send vehicle reminders automatically. Drive more showroom visits.",
    keywords: "WhatsApp for automotive, car dealership WhatsApp, test drive booking automation, vehicle service reminder WhatsApp, automotive customer communication",
  },
  professional: {
    title: "OmniChat for Professional Services — Client Communication & Lead Automation",
    description: "Automate client intake, deliver proposals, and update projects via WhatsApp. Close deals 60% faster with OmniChat.",
    keywords: "WhatsApp for professional services, client intake automation, law firm messaging platform, consulting WhatsApp communication, B2B messaging automation",
  },
  travel: {
    title: "OmniChat for Travel & Hospitality — Booking Automation & Guest Communication",
    description: "Delight guests with instant booking confirmations, travel updates, and itinerary sharing via WhatsApp. Automate the full guest journey.",
    keywords: "WhatsApp for travel, hotel booking WhatsApp automation, travel agency messaging platform, guest communication software, hospitality WhatsApp bot",
  },
  retail: {
    title: "OmniChat for Retail — WhatsApp Commerce, Customer Support & Loyalty Programs",
    description: "The complete omnichannel retail messaging platform. Handle WhatsApp product queries, cart recovery, order updates, post-purchase reviews, and loyalty campaigns.",
    keywords: "WhatsApp for retail, retail omnichannel platform, WhatsApp commerce, retail customer service software, product inquiry WhatsApp, WhatsApp loyalty program retail",
  },
};

/* ─────────────────────────────────────────────────────── */
/* BLOG                                                   */
/* ─────────────────────────────────────────────────────── */
export const BLOG_LIST_SEO = {
  title: "OmniChat Blog — WhatsApp Marketing, AI Automation & Omnichannel Growth",
  description: "Expert guides, case studies, AI automation playbooks, and product updates from OmniChat. Learn how to 3× leads, cut support costs, and master messaging at scale.",
  keywords: "omnichannel messaging blog, WhatsApp marketing strategy, AI customer support tips, WhatsApp automation guide, customer communication insights, messaging platform updates, omnichat blog",
  canonical: `${SITE_URL}/blog`,
  ogImage: `${SITE_URL}/og-blog.png`,
};

/* ─────────────────────────────────────────────────────── */
/* HELP CENTER                                            */
/* ─────────────────────────────────────────────────────── */
export const HELP_CENTER_SEO = {
  title: "OmniChat Help Center — Documentation, Guides & API Reference",
  description: "Step-by-step guides, API documentation, automation tutorials, and answers to every OmniChat question. Self-serve help for teams of all sizes.",
  keywords: "omnichat help center, omnichannel platform documentation, whatsapp api guide, messaging platform tutorial, omnichat support, omnichat api docs",
  canonical: `${SITE_URL}/help`,
  ogImage: `${SITE_URL}/og-help.png`,
};

/* ─────────────────────────────────────────────────────── */
/* TOOLS                                                  */
/* ─────────────────────────────────────────────────────── */
export const WHATSAPP_PRICING_SEO = {
  title: "WhatsApp Business API Pricing Calculator 2025 — Free Tool | OmniChat",
  description: "Calculate your exact WhatsApp Business API costs with our free pricing calculator. Compare rates across countries, message types, and volumes. Updated for 2025.",
  keywords: "WhatsApp business API pricing, WhatsApp API cost calculator, WhatsApp messaging rates 2025, WhatsApp business pricing per message, WA API cost by country",
  canonical: `${SITE_URL}/tools/whatsapp-pricing`,
  ogImage: `${SITE_URL}/og-whatsapp-pricing.png`,
};

export const WHATSAPP_LINK_SEO = {
  title: "Free WhatsApp Link Generator — Create wa.me Links Instantly | OmniChat",
  description: "Generate your WhatsApp click-to-chat link in seconds. Add pre-filled messages, QR codes, and custom deeplinks for ads, email, websites, and bio links.",
  keywords: "WhatsApp link generator, wa.me link creator, WhatsApp click to chat link, WhatsApp QR code generator, WhatsApp deeplink tool, free WhatsApp tools",
  canonical: `${SITE_URL}/tools/whatsapp-link-generator`,
  ogImage: `${SITE_URL}/og-whatsapp-link.png`,
};
