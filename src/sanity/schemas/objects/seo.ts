import { defineField, defineType } from "sanity";

/**
 * SEO — Campos opcionais de busca/compartilhamento. Se vazios, o site usa
 * valores padrão automáticos.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO (busca e compartilhamento)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Título para o Google (opcional)",
      type: "string",
      validation: (rule) =>
        rule.max(70).warning("Títulos curtos funcionam melhor."),
    }),
    defineField({
      name: "metaDescription",
      title: "Descrição para o Google (opcional)",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(180).warning("Descrições curtas funcionam melhor."),
    }),
    defineField({
      name: "shareImage",
      title: "Imagem de compartilhamento (opcional)",
      type: "image",
    }),
  ],
});
