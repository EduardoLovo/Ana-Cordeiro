import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

/**
 * CONFIGURAÇÕES DO SITE — documento único (singleton). Dados globais: marca,
 * contato, horário, redes sociais, registro CAU e SEO padrão.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Marca", default: true },
    { name: "contact", title: "Contato" },
    { name: "social", title: "Redes sociais" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Nome do site / marca",
      type: "string",
      group: "brand",
      initialValue: "Ana Cordeiro",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Assinatura curta",
      type: "string",
      group: "brand",
      initialValue: "Arquitetura & Urbanismo",
      description: "Aparece abaixo do nome, no cabeçalho e rodapé.",
    }),
    defineField({
      name: "footerText",
      title: "Texto do rodapé",
      type: "text",
      rows: 3,
      group: "brand",
      description: "Frase curta de apresentação exibida no rodapé.",
    }),
    defineField({
      name: "cau",
      title: "Registro CAU",
      type: "string",
      group: "brand",
      description: "Ex.: CAU A00000-0.",
    }),

    defineField({
      name: "email",
      title: "E-mail de contato",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email().error("Digite um e-mail válido."),
    }),
    defineField({
      name: "phone",
      title: "Telefone / WhatsApp",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "whatsappUrl",
      title: "Link direto do WhatsApp (opcional)",
      type: "url",
      group: "contact",
      description: "Ex.: https://wa.me/5511999999999",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "address",
      title: "Endereço",
      type: "text",
      rows: 3,
      group: "contact",
      description: "Endereço completo (pode usar várias linhas).",
    }),
    defineField({
      name: "hours",
      title: "Horário de atendimento",
      type: "text",
      rows: 2,
      group: "contact",
      description: "Ex.: Segunda a Sexta / 09:00 — 18:00",
    }),

    defineField({
      name: "socials",
      title: "Redes sociais",
      type: "array",
      group: "social",
      of: [{ type: "socialLink" }],
    }),

    defineField({
      name: "defaultSeo",
      title: "SEO padrão",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Configurações do site" }) },
});
