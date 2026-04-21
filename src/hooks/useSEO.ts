import { useEffect } from "react";

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string;
  robots?: string;
  schema?: object | object[];
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumb?: { name: string; url: string }[];
}

const SITE_URL = "https://axodesk.in";
const DEFAULT_OG = `${SITE_URL}/og-default.png`;

function normalizePath(path: string) {
  if (path === "/whatsapp-pricing") return "/tools/whatsapp-pricing";
  if (path === "/whatsapp-link-generator") return "/tools/whatsapp-link-generator";
  return path;
}

function normalizeSeoUrl(url: string) {
  return url
    .replace(`${SITE_URL}/whatsapp-pricing`, `${SITE_URL}/tools/whatsapp-pricing`)
    .replace(`${SITE_URL}/whatsapp-link-generator`, `${SITE_URL}/tools/whatsapp-link-generator`);
}

function normalizeSeoText(value: string) {
  return value.replace(/\b2025\b/g, "2026");
}

function normalizeSchemaUrls<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeSchemaUrls(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => [
        key,
        normalizeSchemaUrls(entryValue),
      ])
    ) as T;
  }

  if (typeof value === "string") {
    return normalizeSeoUrl(value) as T;
  }

  return value;
}

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
    const normalizedTitle = normalizeSeoText(title);
    const normalizedKeywords = keywords ? normalizeSeoText(keywords) : undefined;
    const normalizedCanonical = canonical ? normalizeSeoUrl(canonical) : undefined;
    const normalizedSchema = schema ? normalizeSchemaUrls(schema) : undefined;
    const normalizedBreadcrumb = breadcrumb?.map((item) => ({
      ...item,
      url: normalizePath(item.url),
    }));

    document.title = normalizedTitle;

    setMeta("name", "description", description);
    if (normalizedKeywords) setMeta("name", "keywords", normalizedKeywords);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : robots);
    setMeta("name", "author", "AxoDesk");

    if (normalizedCanonical) setLink("canonical", normalizedCanonical);

    setMeta("property", "og:title", normalizedTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:type", ogType);
    if (normalizedCanonical) setMeta("property", "og:url", normalizedCanonical);
    setMeta("property", "og:site_name", "AxoDesk");
    setMeta("property", "og:locale", "en_US");
    if (publishedTime) setMeta("property", "article:published_time", publishedTime);
    if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime);

    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:site", "@axodesk");
    setMeta("name", "twitter:title", normalizedTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    if (normalizedSchema) {
      injectSchema(normalizedSchema, "jsonld-page");
    }

    if (normalizedBreadcrumb && normalizedBreadcrumb.length > 0) {
      injectSchema(
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": normalizedBreadcrumb.map((item, i) => ({
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
      document.title = "AxoDesk | AI Customer Conversation Management Platform";
      const pageSchema = document.getElementById("jsonld-page");
      if (pageSchema) pageSchema.remove();
      const breadcrumbSchema = document.getElementById("jsonld-breadcrumb");
      if (breadcrumbSchema) breadcrumbSchema.remove();
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    keywords,
    robots,
    schema,
    twitterCard,
    noIndex,
    publishedTime,
    modifiedTime,
    breadcrumb,
  ]);
}

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "AxoDesk",
  "url": SITE_URL,
  "logo": `${SITE_URL}/img/logo/axodesk-new-logo-dark.png`,
  "foundingDate": "2022",
  "description":
    "AxoDesk is an AI-powered customer conversation management platform that unifies WhatsApp, Instagram, Messenger, Email, and Live Chat with automation.",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61570976755467",
    "https://www.instagram.com/axodesk/",
    "https://g2.com/products/axodesk",
    "https://capterra.com/p/axodesk",
  ],
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "customer support", "email": "support@axodesk.in" },
    { "@type": "ContactPoint", "contactType": "sales", "email": "sales@axodesk.in" },
  ],
};

export const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AxoDesk",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Customer Conversation Management Platform",
  "operatingSystem": "Web, iOS, Android",
  "url": SITE_URL,
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "29", "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
    { "@type": "Offer", "name": "Growth", "price": "79", "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
    { "@type": "Offer", "name": "Business", "price": "149", "priceCurrency": "USD", "priceValidUntil": "2027-12-31" },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "560",
    "bestRating": "5",
    "worstRating": "1",
  },
  "description":
    "All-in-one customer conversation platform with WhatsApp, Instagram, Messenger, Email, Live Chat, AI automation, analytics, and CRM sync.",
  "featureList": [
    "Omnichannel Team Inbox",
    "WhatsApp Business API",
    "AI Agents",
    "Lead Routing Automation",
    "Team Collaboration",
    "Conversation Analytics",
    "CRM and Contact Management",
    "REST API and Webhooks",
    "Shopify and WooCommerce Integration",
    "GDPR and SOC 2 compliance",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AxoDesk",
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
  title: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  slug: string;
  ogImage: string;
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
      "name": "AxoDesk",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/img/logo/axodesk-new-logo-dark.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };
}

export function buildHowToSchema(article: {
  title: string;
  description: string;
  steps: { title: string; body: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": article.description,
    "step": article.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.body,
    })),
  };
}
