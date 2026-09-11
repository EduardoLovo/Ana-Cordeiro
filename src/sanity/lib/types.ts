/**
 * TIPOS DO CONTEÚDO — refletem o que as consultas GROQ retornam.
 */
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = {
  asset?: { _ref: string; _type: string };
  hotspot?: { x: number; y: number };
  crop?: unknown;
  alt?: string;
  caption?: string;
} & SanityImageSource;

export type SocialLink = { platform: string; url: string };

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: SanityImage;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  footerText?: string;
  cau?: string;
  email?: string;
  phone?: string;
  whatsappUrl?: string;
  address?: string;
  hours?: string;
  socials?: SocialLink[];
  defaultSeo?: SeoData;
};

export type HomePage = {
  heroLine1: string;
  heroAccent?: string;
  heroLine2?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  philosophyKicker?: string;
  philosophyQuote?: string;
};

export type Specialty = { title: string; text?: string };

export type AboutPage = {
  kicker?: string;
  nameLine: string;
  nameAccent?: string;
  portrait?: SanityImage;
  intro?: string;
  body?: PortableTextBlock[];
  cau?: string;
  specialties?: Specialty[];
  seo?: SeoData;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  status?: string;
  summary?: string;
  categoryTitle?: string;
  categorySlug?: string;
  coverImage?: SanityImage;
};

export type Project = ProjectCard & {
  description?: PortableTextBlock[];
  gallery?: SanityImage[];
};
