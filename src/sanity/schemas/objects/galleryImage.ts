import { defineField, defineType } from "sanity";

/**
 * GALLERY IMAGE — Imagem da galeria de um projeto (com alt e legenda).
 * O hotspot permite escolher o ponto focal para recortes automáticos.
 */
export const galleryImage = defineType({
  name: "galleryImage",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description: "Descreva a imagem (acessibilidade e SEO).",
      validation: (rule) =>
        rule.required().warning("Recomendado para acessibilidade e SEO."),
    }),
    defineField({
      name: "caption",
      title: "Legenda (opcional)",
      type: "string",
    }),
  ],
  preview: { select: { media: "asset", title: "alt", subtitle: "caption" } },
});
