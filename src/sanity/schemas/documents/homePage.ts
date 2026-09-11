import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

/**
 * PÁGINA INICIAL (HOME) — documento único
 * ---------------------------------------
 * Reproduz o topo do site: um título grande em três partes, sendo a do meio
 * em itálico serifado (ex.: "Projetando / o futuro das / cidades."), a chamada,
 * a imagem de destaque e a frase de filosofia.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Página inicial",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Destaque (topo)", default: true },
    { name: "philosophy", title: "Filosofia" },
  ],
  fields: [
    defineField({
      name: "heroLine1",
      title: "Título — 1ª linha",
      type: "string",
      group: "hero",
      description: 'Ex.: "Projetando".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroAccent",
      title: "Título — palavra de acento (itálico)",
      type: "string",
      group: "hero",
      description: 'Aparece em serifada itálica cinza. Ex.: "o futuro das".',
    }),
    defineField({
      name: "heroLine2",
      title: "Título — última linha",
      type: "string",
      group: "hero",
      description: 'Ex.: "cidades.".',
    }),
    defineField({
      name: "heroSubtitle",
      title: "Chamada (subtítulo)",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Imagem de destaque",
      type: "image",
      group: "hero",
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
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Texto do botão",
      type: "string",
      group: "hero",
      initialValue: "Ver Projetos",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Link do botão",
      type: "string",
      group: "hero",
      initialValue: "/projetos",
    }),

    defineField({
      name: "philosophyKicker",
      title: "Rótulo da seção",
      type: "string",
      group: "philosophy",
      initialValue: "Filosofia",
    }),
    defineField({
      name: "philosophyQuote",
      title: "Frase de filosofia",
      type: "text",
      rows: 3,
      group: "philosophy",
      description: "Exibida em itálico, no destaque cinza-claro.",
    }),
  ],
  preview: { prepare: () => ({ title: "Página inicial" }) },
});
