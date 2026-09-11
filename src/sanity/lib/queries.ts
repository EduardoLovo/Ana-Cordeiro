import { groq } from "next-sanity";

/**
 * CONSULTAS GROQ — cada constante pede exatamente os campos usados, deixando
 * tudo mais rápido e leve.
 */

/* ---------- Configurações globais ---------- */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    footerText,
    cau,
    email,
    phone,
    whatsappUrl,
    address,
    hours,
    socials[]{ platform, url },
    defaultSeo
  }
`;

/* ---------- Página inicial ---------- */
export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroLine1,
    heroAccent,
    heroLine2,
    heroSubtitle,
    heroImage,
    heroCtaLabel,
    heroCtaHref,
    philosophyKicker,
    philosophyQuote
  }
`;

/* ---------- Página Sobre ---------- */
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    kicker,
    nameLine,
    nameAccent,
    portrait,
    intro,
    body,
    cau,
    specialties[]{ title, text },
    seo
  }
`;

/* ---------- Projeção reutilizável de "card de projeto" ---------- */
const projectCardProjection = groq`
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  status,
  summary,
  "categoryTitle": category->title,
  "categorySlug": category->slug.current,
  coverImage
`;

/* ---------- Projetos ---------- */
export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 9999) asc, publishedAt desc){
    ${projectCardProjection}
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(coalesce(order, 9999) asc, title asc){
    _id,
    title,
    "slug": slug.current
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectCardProjection},
    description,
    gallery[]{ ... }
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
