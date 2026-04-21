import type { ParsedUrlQuery } from "querystring";
import { HELP_CATEGORIES, getArticleBySlug, getCategoryBySlug } from "@/data/helpCenter";
import { getPostBySlug } from "@/data/blog";
import type { SupportedLocale } from "@/i18n/messages";

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType?: "website" | "article";
  robots?: string;
  keywords?: string;
  jsonLd?: object | object[];
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axodesk.in";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61570976755467";
const INSTAGRAM_URL = "https://www.instagram.com/axodesk/";
const DEFAULT_OG = `${SITE_URL}/og-default.png`;
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large";
const HOME_KEYWORDS =
  "AI customer conversation management software, customer conversation management platform, WhatsApp Business API platform, omnichannel team inbox, AI agents for sales and support, WhatsApp CRM, Instagram DM inbox, lead routing automation, WhatsApp API calling, conversation-led growth platform";

function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

function websiteMeta(meta: Omit<SeoMeta, "ogType" | "robots">): SeoMeta {
  return {
    ...meta,
    ogType: "website",
    robots: DEFAULT_ROBOTS,
  };
}

const HOME_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": "AxoDesk",
    "url": SITE_URL,
    "logo": `${SITE_URL}/img/logo/axodesk-new-logo-dark.png`,
    "description":
      "AxoDesk is an AI-powered customer conversation management platform that unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat in one team inbox.",
    "sameAs": [FACEBOOK_URL, INSTAGRAM_URL],
    "contactPoint": [
      { "@type": "ContactPoint", "contactType": "customer support", "email": "support@axodesk.in" },
      { "@type": "ContactPoint", "contactType": "sales", "email": "sales@axodesk.in" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": "AxoDesk",
    "url": SITE_URL,
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    "name": "AxoDesk",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Customer Conversation Management Platform",
    "operatingSystem": "Web, iOS, Android",
    "url": SITE_URL,
    "description":
      "AxoDesk unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat with AI agents, automation, team inbox workflows, and CRM sync.",
    "featureList": [
      "Omnichannel team inbox",
      "WhatsApp Business API",
      "AI agents for support and sales",
      "Lead routing automation",
      "CRM sync and contact management",
      "Conversation analytics",
      "WhatsApp API calling",
    ],
  },
];

const STATIC_ROUTE_META: Record<string, SeoMeta> = {
  "/": websiteMeta({
    title: "AxoDesk | AI Customer Conversation Management Platform",
    description:
      "AxoDesk unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat in one AI-powered team inbox. Automate replies, route leads, sync CRM data, and convert faster.",
    canonical: absolute("/"),
    ogImage: `${SITE_URL}/og-home.png`,
    keywords: HOME_KEYWORDS,
    jsonLd: HOME_JSON_LD,
  }),
  "/features": websiteMeta({
    title: "AxoDesk Features | Team Inbox, AI Agents, Automation & Analytics",
    description:
      "Explore AxoDesk's full feature set: omnichannel team inbox, WhatsApp Business API workflows, AI agents, lead routing automation, analytics, and CRM sync.",
    canonical: absolute("/features"),
    ogImage: `${SITE_URL}/og-features.png`,
    keywords:
      "customer conversation management software features, omnichannel team inbox, WhatsApp Business API inbox, AI agents for customer support, lead routing automation, CRM sync for conversations, conversation analytics",
  }),
  "/pricing": websiteMeta({
    title: "AxoDesk Pricing | Customer Conversation Platform Plans",
    description:
      "AxoDesk pricing starts at $29 per month with team inbox, WhatsApp API, automation, and AI features included. Compare plans and see why teams switch from respond.io.",
    canonical: absolute("/pricing"),
    ogImage: `${SITE_URL}/og-pricing.png`,
    keywords:
      "customer conversation platform pricing, WhatsApp Business API pricing, omnichannel inbox pricing, respond.io pricing alternative, WhatsApp CRM pricing, AI customer support software pricing",
  }),
  "/blog": websiteMeta({
    title: "AxoDesk Blog | WhatsApp Marketing, AI Automation & Growth Guides",
    description:
      "Expert guides, case studies, AI automation playbooks, and product updates from AxoDesk. Learn how to grow with WhatsApp, automation, and omnichannel conversations.",
    canonical: absolute("/blog"),
    ogImage: `${SITE_URL}/og-blog.png`,
    keywords:
      "omnichannel messaging blog, WhatsApp marketing strategy, AI customer support tips, WhatsApp automation guide, customer communication insights, conversation-led growth, WhatsApp business tips 2026",
  }),
  "/industry": websiteMeta({
    title: "AxoDesk for Every Industry | WhatsApp & AI Conversation Workflows",
    description:
      "See how AxoDesk helps ecommerce, retail, healthcare, education, finance, and service teams manage WhatsApp, Instagram, and customer conversations at scale.",
    canonical: absolute("/industry"),
    ogImage: DEFAULT_OG,
    keywords:
      "customer communication platform by industry, WhatsApp for ecommerce, WhatsApp for healthcare, WhatsApp for education, omnichannel messaging by industry, industry-specific conversation workflows",
  }),
  "/resources": websiteMeta({
    title: "AxoDesk Resources | Docs, API Reference, Webinars & Blog",
    description:
      "Everything to master AxoDesk: full platform documentation, REST API reference, webinars, blog insights, and practical messaging resources.",
    canonical: absolute("/resources"),
    ogImage: `${SITE_URL}/og-resources.png`,
    keywords:
      "axodesk documentation, WhatsApp API reference, omnichannel support guides, customer messaging tutorials, messaging platform resources, AI conversation workflow guides",
  }),
  "/why-us": websiteMeta({
    title: "AxoDesk vs Respond.io | AI Customer Conversation Platform Alternative",
    description:
      "Compare AxoDesk vs respond.io, SleekFlow, and Intercom. Get AI agents, an omnichannel team inbox, WhatsApp CRM workflows, and transparent pricing in one platform.",
    canonical: absolute("/why-us"),
    ogImage: `${SITE_URL}/og-why-us.png`,
    keywords:
      "respond.io alternative, respond io alternative, AxoDesk vs respond.io, customer conversation management software, AI customer conversation platform, omnichannel team inbox, WhatsApp CRM alternative, conversation-led growth platform, SleekFlow alternative, Intercom alternative",
  }),
  "/talk-to-sales": websiteMeta({
    title: "Talk to AxoDesk Sales | Book an AI Conversation Platform Demo",
    description:
      "Book a free personalized demo with AxoDesk's sales team and see how to unify WhatsApp, Instagram, Messenger, and Email in one AI-powered inbox.",
    canonical: absolute("/talk-to-sales"),
    ogImage: `${SITE_URL}/og-sales.png`,
    keywords:
      "AxoDesk demo, customer conversation platform demo, WhatsApp platform sales demo, AI customer conversation software demo, omnichannel inbox demo, talk to sales AxoDesk",
  }),
  "/tools/whatsapp-pricing": websiteMeta({
    title: "WhatsApp Business API Pricing Calculator 2026 | Free Tool | AxoDesk",
    description:
      "Calculate WhatsApp Business API messaging and calling costs by country. Compare marketing, utility, and authentication template pricing with AxoDesk's free calculator.",
    canonical: absolute("/tools/whatsapp-pricing"),
    ogImage: `${SITE_URL}/og-wa-pricing.png`,
    keywords:
      "WhatsApp business API pricing 2026, WhatsApp messaging cost calculator, WhatsApp template pricing, Meta WhatsApp API cost, WhatsApp calling API pricing, WhatsApp BSP pricing calculator",
  }),
  "/tools/whatsapp-link-generator": websiteMeta({
    title: "Free WhatsApp Link & QR Code Generator 2026 | AxoDesk",
    description:
      "Generate a WhatsApp click-to-chat link and QR code in seconds. Add a pre-filled message, download your QR code, and share it in ads, bios, email, or print.",
    canonical: absolute("/tools/whatsapp-link-generator"),
    ogImage: `${SITE_URL}/og-wa-link.png`,
    keywords:
      "WhatsApp link generator, WhatsApp QR code generator, wa.me link creator, click to WhatsApp link, WhatsApp business link free, Instagram bio WhatsApp link, WhatsApp link maker tool",
  }),
};

export function getSeoMeta(pathname: string, query: ParsedUrlQuery, locale: SupportedLocale = "en"): SeoMeta {
  const localizedSiteName: Record<SupportedLocale, string> = {
    en: "AxoDesk",
    es: "AxoDesk",
    ar: "AxoDesk",
    fr: "AxoDesk",
    pt: "AxoDesk",
    de: "AxoDesk",
    it: "AxoDesk",
  };

  const staticMeta = STATIC_ROUTE_META[pathname];
  if (staticMeta) {
    return staticMeta;
  }

  const base: SeoMeta = websiteMeta({
    title: `${localizedSiteName[locale]} | AI Customer Conversation Management Platform`,
    description:
      "AxoDesk unifies WhatsApp Business API, Instagram, Messenger, Email, and Live Chat in one AI-powered inbox.",
    canonical: absolute(pathname === "/" ? "/" : pathname),
    ogImage: DEFAULT_OG,
    keywords: HOME_KEYWORDS,
  });

  if (pathname === "/blog/[slug]") {
    const slug = typeof query.slug === "string" ? query.slug : "";
    const post = getPostBySlug(slug);
    if (post) {
      return {
        title: post.og.title,
        description: post.og.description,
        canonical: absolute(`/blog/${post.slug}`),
        ogImage: post.og.image,
        ogType: "article",
        robots: DEFAULT_ROBOTS,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          image: post.og.image,
          author: { "@type": "Person", name: post.author.name },
          mainEntityOfPage: absolute(`/blog/${post.slug}`),
        },
      };
    }
  }

  if (pathname === "/help/[category]/[article]") {
    const article = typeof query.article === "string" ? getArticleBySlug(query.article) : undefined;
    const category = typeof query.category === "string" ? getCategoryBySlug(query.category) : undefined;
    if (article) {
      return {
        title: `${article.title} - AxoDesk Help Center`,
        description: article.excerpt,
        canonical: absolute(`/help/${article.category}/${article.slug}`),
        ogImage: DEFAULT_OG,
        ogType: "article",
        robots: DEFAULT_ROBOTS,
        keywords: article.tags.join(", "),
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.excerpt,
          dateModified: article.lastUpdated,
          author: { "@type": "Person", name: article.author.name },
          about: category?.label ?? "Help Center",
          mainEntityOfPage: absolute(`/help/${article.category}/${article.slug}`),
        },
      };
    }
  }

  if (pathname === "/help/[category]") {
    const category = typeof query.category === "string" ? getCategoryBySlug(query.category) : undefined;
    if (category) {
      return websiteMeta({
        title: `${category.label} - AxoDesk Help Center`,
        description: category.description,
        canonical: absolute(`/help/${category.slug}`),
        ogImage: DEFAULT_OG,
      });
    }
  }

  if (pathname === "/help") {
    return {
      ...base,
      title: "AxoDesk Help Center | Documentation, Guides & API",
      description: `Official AxoDesk help center with ${HELP_CATEGORIES.length}+ documentation categories, setup guides, and API docs.`,
      canonical: absolute("/help"),
      keywords:
        "AxoDesk help center, omnichannel messaging documentation, WhatsApp API setup guide, customer conversation platform docs, AxoDesk tutorials, messaging troubleshooting",
    };
  }

  return base;
}

export { SITE_URL, FACEBOOK_URL, INSTAGRAM_URL };
