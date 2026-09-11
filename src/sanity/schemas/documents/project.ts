import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

/**
 * PROJETO
 * -------
 * Cada projeto do portfólio: capa, galeria, descrição, categoria e a ficha
 * técnica (ano, local, status) exibida na página de detalhe.
 */
export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "media", title: "Fotos" },
    { name: "settings", title: "Ajustes" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título do projeto",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço (slug)",
      type: "slug",
      group: "content",
      description:
        'Parte final da URL. Clique em "Gerar" para criar a partir do título. Não cole uma URL inteira aqui.',
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          const value = slug?.current ?? "";
          if (/[^a-z0-9-]/.test(value)) {
            return 'Use apenas letras minúsculas, números e hífens — sem barras, espaços ou "https://".';
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      description: "Ex.: Residencial, Urbanismo, Comercial.",
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      group: "content",
      validation: (rule) =>
        rule.min(1980).max(new Date().getFullYear() + 5).integer(),
    }),
    defineField({
      name: "location",
      title: "Local",
      type: "string",
      group: "content",
      description: "Cidade/estado do projeto. Ex.: São Paulo, SP.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      description: "Ex.: Concluído, Em andamento, Conceitual.",
      initialValue: "Concluído",
    }),
    defineField({
      name: "summary",
      title: "Resumo curto",
      type: "text",
      rows: 2,
      group: "content",
      description: "Aparece no card e no compartilhamento.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "description",
      title: "Descrição completa",
      type: "blockContent",
      group: "content",
      description: "Conceito, materiais, soluções do projeto.",
    }),

    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) =>
            rule.required().warning("Recomendado para acessibilidade e SEO."),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotos",
      type: "array",
      group: "media",
      of: [{ type: "galleryImage" }],
      options: { layout: "grid" },
      description: "Arraste para reordenar. A ordem aqui é a ordem no site.",
    }),

    defineField({
      name: "featured",
      title: "Destacar na página inicial?",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      group: "settings",
      description: "Menor aparece primeiro. Opcional.",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Ordem manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Mais recentes",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      year: "year",
      media: "coverImage",
    },
    prepare({ title, category, year, media }) {
      const parts = [category, year].filter(Boolean).join(" · ");
      return { title, subtitle: parts, media };
    },
  },
});
