import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";

/**
 * PÁGINA SOBRE — documento único
 * ------------------------------
 * Perfil da arquiteta: rótulo, nome (com acento itálico), foto, apresentação,
 * texto biográfico, registro CAU e a grade de "especialidades" (as três zonas
 * do design antigo).
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    { name: "intro", title: "Perfil", default: true },
    { name: "specialties", title: "Especialidades" },
  ],
  fields: [
    defineField({
      name: "kicker",
      title: "Rótulo",
      type: "string",
      group: "intro",
      initialValue: "A Arquiteta",
    }),
    defineField({
      name: "nameLine",
      title: "Nome (parte normal)",
      type: "string",
      group: "intro",
      initialValue: "Ana",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameAccent",
      title: "Nome (parte em itálico)",
      type: "string",
      group: "intro",
      initialValue: "Cordeiro",
      description: "Aparece em serifada itálica cinza.",
    }),
    defineField({
      name: "portrait",
      title: "Foto",
      type: "image",
      group: "intro",
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
      name: "intro",
      title: "Apresentação (destaque)",
      type: "text",
      rows: 3,
      group: "intro",
      description: "Frase forte de abertura, em tamanho maior.",
    }),
    defineField({
      name: "body",
      title: "Texto biográfico",
      type: "blockContent",
      group: "intro",
      description: "A história completa: trajetória, abordagem, valores.",
    }),
    defineField({
      name: "cau",
      title: "Registro profissional (CAU)",
      type: "string",
      group: "intro",
      description: "Ex.: Registro Profissional CAU A00000-0.",
    }),
    defineField({
      name: "specialties",
      title: "Especialidades",
      type: "array",
      group: "specialties",
      description: "As áreas de atuação (ex.: Urbanismo, Residencial, Consultoria).",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) => rule.required(),
            },
            { name: "text", title: "Descrição", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "seo",
      title: "SEO (busca e compartilhamento)",
      type: "seo",
      group: "intro",
    }),
  ],
  preview: { prepare: () => ({ title: "Página Sobre" }) },
});
