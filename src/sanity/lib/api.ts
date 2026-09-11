/**
 * CAMADA DE DADOS — funções que as páginas usam para obter conteúdo, já com a
 * consulta, as etiquetas de cache e o fallback vazio adequados.
 */
import { sanityFetch } from "./fetch";
import {
  siteSettingsQuery,
  homePageQuery,
  aboutPageQuery,
  projectsQuery,
  categoriesQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "./queries";
import type {
  SiteSettings,
  HomePage,
  AboutPage,
  ProjectCard,
  Project,
  Category,
} from "./types";

export function getSiteSettings() {
  return sanityFetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    { fallback: null, tags: ["siteSettings"] },
  );
}

export function getHomePage() {
  return sanityFetch<HomePage | null>(
    homePageQuery,
    {},
    { fallback: null, tags: ["homePage"] },
  );
}

export function getAboutPage() {
  return sanityFetch<AboutPage | null>(
    aboutPageQuery,
    {},
    { fallback: null, tags: ["aboutPage"] },
  );
}

export function getProjects() {
  return sanityFetch<ProjectCard[]>(
    projectsQuery,
    {},
    { fallback: [], tags: ["project"] },
  );
}

export function getCategories() {
  return sanityFetch<Category[]>(
    categoriesQuery,
    {},
    { fallback: [], tags: ["category"] },
  );
}

export function getProjectBySlug(slug: string) {
  return sanityFetch<Project | null>(
    projectBySlugQuery,
    { slug },
    { fallback: null, tags: ["project"] },
  );
}

/** Slugs seguros (só letras/números/hífen) para gerar as páginas estáticas. */
function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

export async function getProjectSlugs() {
  const slugs = await sanityFetch<string[]>(
    projectSlugsQuery,
    {},
    { fallback: [], tags: ["project"] },
  );
  return slugs.filter(isSafeSlug);
}
