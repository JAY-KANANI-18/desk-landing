/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/whatsapp-pricing",
        destination: "/tools/whatsapp-pricing",
        permanent: true,
      },
      {
        source: "/whatsapp-link-generator",
        destination: "/tools/whatsapp-link-generator",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.axodesk.in" }],
        destination: "https://axodesk.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
