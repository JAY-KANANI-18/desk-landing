import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SiteLayout } from "@/components/SiteLayout";
import { getSeoMeta, SITE_URL } from "@/seo/metadata";
import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const seo = getSeoMeta(router.pathname, router.query);
  const schema = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : [];

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content={seo.robots ?? "index,follow"} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content={seo.ogType ?? "website"} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
        <meta name="theme-color" content="#080c14" />
        <link rel="preconnect" href={SITE_URL} />
        {schema.map((entry, idx) => (
          <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }} />
        ))}
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}
