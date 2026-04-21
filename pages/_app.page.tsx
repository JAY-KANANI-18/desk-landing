import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FACEBOOK_URL, INSTAGRAM_URL, getSeoMeta, SITE_URL } from "@/seo/metadata";
import { enableMultilanguage, rtlLocales, supportedLocales, type SupportedLocale } from "@/i18n/messages";
import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = (router.locale as SupportedLocale) || "en";
  const seo = getSeoMeta(router.pathname, router.query, locale);
  const schema = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : [];
  const currentPath = router.asPath.split("?")[0] || "/";

  useEffect(() => {
    const isRTL = rtlLocales.includes(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [locale]);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
        <meta name="author" content="AxoDesk" />
        <meta name="robots" content={seo.robots ?? "index,follow"} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content={seo.ogType ?? "website"} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:image:alt" content={seo.title} />
        <meta property="og:site_name" content="AxoDesk" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@axodesk" />
        <meta name="twitter:creator" content="@axodesk" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
        <meta name="theme-color" content="#080c14" />
        <link rel="preconnect" href={SITE_URL} />
        <link rel="me" href={FACEBOOK_URL} />
        <link rel="me" href={INSTAGRAM_URL} />
        {(enableMultilanguage ? supportedLocales : (["en"] as const)).map((loc) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`${SITE_URL}${currentPath === "/" ? "" : currentPath}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${currentPath === "/" ? "" : currentPath}`} />
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
