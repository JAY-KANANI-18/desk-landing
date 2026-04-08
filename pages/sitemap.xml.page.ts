import type { GetServerSideProps } from "next";
import { PUBLISHED_POSTS } from "@/data/blog";
import { HELP_ARTICLES, HELP_CATEGORIES } from "@/data/helpCenter";
import { SITE_URL } from "@/seo/metadata";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
};

function xml(entries: SitemapEntry[]) {
  const body = entries
    .map(
      (e) => `<url>
  <loc>${e.loc}</loc>
  ${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}
  ${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}
  ${e.priority ? `<priority>${e.priority}</priority>` : ""}
</url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticRoutes: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/features`, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/pricing`, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/why-us`, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/industry`, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/resources`, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.9" },
    { loc: `${SITE_URL}/help`, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/talk-to-sales`, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/tools/whatsapp-pricing`, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/tools/whatsapp-link-generator`, changefreq: "monthly", priority: "0.7" },
  ];

  const blogRoutes: SitemapEntry[] = PUBLISHED_POSTS.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.publishedAt).toISOString(),
    changefreq: "monthly",
    priority: "0.8",
  }));

  const helpCategoryRoutes: SitemapEntry[] = HELP_CATEGORIES.map((category) => ({
    loc: `${SITE_URL}/help/${category.slug}`,
    changefreq: "weekly",
    priority: "0.7",
  }));

  const helpArticleRoutes: SitemapEntry[] = HELP_ARTICLES.map((article) => ({
    loc: `${SITE_URL}/help/${article.category}/${article.slug}`,
    lastmod: new Date(article.lastUpdated).toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  }));

  const sitemap = xml([...staticRoutes, ...blogRoutes, ...helpCategoryRoutes, ...helpArticleRoutes]);
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
