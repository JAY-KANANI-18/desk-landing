/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
