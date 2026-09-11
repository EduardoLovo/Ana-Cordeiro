import { defineArrayMember, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

/**
 * BLOCK CONTENT — Texto rico (Portable Text)
 * ------------------------------------------
 * Editor de texto rico usado na descrição dos projetos e na bio da página
 * Sobre. Permite títulos, negrito, itálico, listas, links e imagens — tudo
 * pelo painel, sem código.
 */
export const blockContent = defineType({
  title: "Conteúdo",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Texto normal", value: "normal" },
        { title: "Título", value: "h2" },
        { title: "Subtítulo", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista com marcadores", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "Endereço (URL)",
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      title: "Imagem",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo",
          description: "Descreva a imagem (acessibilidade e SEO).",
        },
        { name: "caption", type: "string", title: "Legenda (opcional)" },
      ],
    }),
  ],
});
