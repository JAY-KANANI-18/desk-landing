import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/seo/metadata";

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(robots());
  res.end();

  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
