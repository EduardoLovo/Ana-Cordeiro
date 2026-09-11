import type { SchemaTypeDefinition } from "sanity";

// Documentos (conteúdo que a cliente cria/edita)
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { project } from "./documents/project";
import { category } from "./documents/category";
import { contactMessage } from "./documents/contactMessage";

// Objetos reutilizáveis
import { blockContent } from "./objects/blockContent";
import { galleryImage } from "./objects/galleryImage";
import { socialLink } from "./objects/socialLink";
import { seo } from "./objects/seo";

/** Lista completa de tipos de conteúdo carregada pelo Sanity Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  project,
  category,
  contactMessage,
  blockContent,
  galleryImage,
  socialLink,
  seo,
];
