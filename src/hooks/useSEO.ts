/**
 * useSEO — centralized, unified SEO hook
 * Injects <title>, description, keywords, canonical, OG, Twitter Card, JSON-LD
 * Used directly in every page component
 */
import { useEffect } from "react";

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string;
  robots?: string;
  /** JSON-LD structured data — single object or array */
  schema?: object | object[];
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  /** Article-specific: ISO date strings */
  publishedTime?: string;
  modifiedTime?: string;
  /** Breadcrumb shorthand — auto-generated BreadcrumbList schema appended */
  breadcrumb?: { name: string; url: string }[];
}

const SITE_URL = "https://omnichat.io";
const DEFAULT_OG = `${SITE_URL}/og-default.png`;

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectSchema(data: object | object[], id: string) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = "website",
  keywords,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schema,
  twitterCard = "summary_large_image",
  noIndex = false,
  publishedTime,
  modifiedTime,
  breadcrumb,
}: SEOConfig) {
  useEffect(() => {
    // Title
    document.title = title;

    // Core
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : robots);
    setMeta("name", "author", "OmniChat");

    // Canonical
    if (canonical) setLink("canonical", canonical);

    // OG
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:type", ogType);
    if (canonical) setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "OmniChat");
    setMeta("property", "og:locale", "en_US");
    if (publishedTime) setMeta("property", "article:published_time", publishedTime);
    if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime);

    // Twitter
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:site", "@omnichat");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Page schema
    if (schema) {
      injectSchema(schema, "jsonld-page");
    }

    // Breadcrumb schema
    if (breadcrumb && breadcrumb.length > 0) {
      injectSchema(
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumb.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            "item": `${SITE_URL}${item.url}`,
          })),
        },
        "jsonld-breadcrumb"
      );
    }

    return () => {
      document.title = "OmniChat — Omnichannel Customer Communication Platform";
      const p = document.getElementById("jsonld-page");
      if (p) p.remove();
      const b = document.getElementById("jsonld-breadcrumb");
      if (b) b.remove();
    };
  }, [title, description, canonical, ogImage, ogType, keywords, robots, schema, twitterCard, noIndex, publishedTime, modifiedTime, breadcrumb]);
}

/* ════════════════════════
   REUSABLE SCHEMA HELPERS
════════════════════════ */

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "OmniChat",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "foundingDate": "2022",
  "description": "OmniChat is the leading omnichannel customer messaging platform — unifying WhatsApp, Instagram, Messenger, Email and Live Chat with AI automation.",
  "sameAs": [
    "https://twitter.com/omnichat",
    "https://linkedin.com/company/omnichat",
    "https://facebook.com/omnichat",
    "https://g2.com/products/omnichat",
    "https://capterra.com/p/omnichat",
  ],
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "customer support", "email": "support@omnichat.io" },
    { "@type": "ContactPoint", "contactType": "sales", "email": "sales@omnichat.io" },
  ],
};

export const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OmniChat",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Customer Communication Platform",
  "operatingSystem": "Web, iOS, Android",
  "url": SITE_URL,
  "offers": [
    { "@type": "Offer", "name": "Starter",  "price": "29",  "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
    { "@type": "Offer", "name": "Growth",   "price": "79",  "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
    { "@type": "Offer", "name": "Business", "price": "149", "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "560",
    "bestRating": "5",
    "worstRating": "1",
  },
  "description": "All-in-one omnichannel inbox: WhatsApp, Instagram, Messenger, Email, Live Chat. AI automation, team collaboration, analytics, and CRM.",
  "featureList": [
    "Unified Omnichannel Inbox",
    "WhatsApp Business API (official BSP)",
    "No-code Automation Workflows",
    "AI-Powered Chatbot",
    "Team Collaboration with Internal Notes",
    "Real-Time Analytics & Reports",
    "CRM & Contact Management",
    "REST API & Webhooks",
    "Shopify & WooCommerce Integration",
    "GDPR & SOC2 Compliant",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "OmniChat",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a.replace(/<[^>]*>/g, "") },
    })),
  };
}

export function buildArticleSchema(post: {
  title: string; excerpt: string; publishedAt: string;
  authorName: string; slug: string; ogImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.ogImage,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": { "@type": "Person", "name": post.authorName },
    "publisher": {
      "@type": "Organization",
      "name": "OmniChat",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };
}

export function buildHowToSchema(article: {
  title: string; description: string; steps: { title: string; body: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": article.description,
    "step": article.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.body,
    })),
  };
}
