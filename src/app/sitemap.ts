import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getProjectSlugs } from "@/sanity/lib/api";

/** sitemap.xml — páginas fixas + cada projeto publicado. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/projetos", "/sobre", "/contato"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectSlugs = await getProjectSlugs();
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projetos/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
