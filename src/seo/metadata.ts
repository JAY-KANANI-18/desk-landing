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
  jsonLd?: object | object[];
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://omnichat.io";
const DEFAULT_OG = `${SITE_URL}/og-default.png`;

function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

export function getSeoMeta(pathname: string, query: ParsedUrlQuery, locale: SupportedLocale = "en"): SeoMeta {
  const localizedSiteName: Record<SupportedLocale, string> = {
    en: "OmniChat",
    es: "OmniChat",
    ar: "OmniChat",
    fr: "OmniChat",
    pt: "OmniChat",
    de: "OmniChat",
    it: "OmniChat",
  };
  const base: SeoMeta = {
    title: `${localizedSiteName[locale]} — Omnichannel Customer Communication Platform`,
    description:
      "OmniChat unifies WhatsApp, Instagram, Messenger, Email, and Live Chat in one inbox with AI automation.",
    canonical: absolute(pathname === "/" ? "/" : pathname),
    ogImage: DEFAULT_OG,
    ogType: "website",
    robots: "index,follow,max-image-preview:large",
  };

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
        title: `${article.title} — OmniChat Help Center`,
        description: article.excerpt,
        canonical: absolute(`/help/${article.category}/${article.slug}`),
        ogImage: DEFAULT_OG,
        ogType: "article",
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
      return {
        title: `${category.label} — OmniChat Help Center`,
        description: category.description,
        canonical: absolute(`/help/${category.slug}`),
        ogImage: DEFAULT_OG,
      };
    }
  }

  if (pathname === "/help") {
    return {
      ...base,
      title: "OmniChat Help Center — Documentation, Guides & API",
      description: `Official OmniChat help center with ${HELP_CATEGORIES.length}+ documentation categories, setup guides, and API docs.`,
      canonical: absolute("/help"),
    };
  }

  return base;
}

export { SITE_URL };
