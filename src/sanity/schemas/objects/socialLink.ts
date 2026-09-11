import { defineField, defineType } from "sanity";

/**
 * SOCIAL LINK — Uma rede social (plataforma + URL do perfil).
 */
export const socialLink = defineType({
  name: "socialLink",
  title: "Rede social",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Behance", value: "behance" },
          { title: "Pinterest", value: "pinterest" },
          { title: "Facebook", value: "facebook" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "YouTube", value: "youtube" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Endereço (URL)",
      type: "url",
      description: "Cole o link completo do perfil (começando com https://).",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: { select: { title: "platform", subtitle: "url" } },
});
