import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** robots.txt — indexa o site, exceto o painel (/studio). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
