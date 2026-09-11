import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

/**
 * CATEGORIA DE PROJETO — agrupa os projetos por tipo (Residencial, Urbanismo,
 * Comercial…). Serve para o filtro na listagem de projetos.
 */
export const category = defineType({
  name: "category",
  title: "Categoria de projeto",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço (slug)",
      type: "slug",
      description: "Gerado a partir do nome. Usado na URL do filtro.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Menor aparece primeiro nos filtros. Opcional.",
    }),
  ],
});
