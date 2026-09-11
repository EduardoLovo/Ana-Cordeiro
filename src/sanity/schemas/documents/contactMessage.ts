import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons/Envelope";

/**
 * MENSAGEM DE CONTATO
 * -------------------
 * Cada mensagem enviada pelo formulário do site vira um documento destes, na
 * aba "Mensagens" do painel. Os campos de conteúdo são somente-leitura; a
 * arquiteta pode marcar como respondida e apagar. Criados só pelo site.
 */
export const contactMessage = defineType({
  name: "contactMessage",
  title: "Mensagem de contato",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", readOnly: true }),
    defineField({ name: "email", title: "E-mail", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Telefone", type: "string", readOnly: true }),
    defineField({ name: "subject", title: "Assunto", type: "string", readOnly: true }),
    defineField({
      name: "message",
      title: "Mensagem",
      type: "text",
      rows: 6,
      readOnly: true,
    }),
    defineField({
      name: "receivedAt",
      title: "Recebida em",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "handled",
      title: "Já respondida / arquivada",
      type: "boolean",
      initialValue: false,
      description: "Marque quando já tiver dado retorno.",
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "receivedDesc",
      by: [{ field: "receivedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subject: "subject", date: "receivedAt", handled: "handled" },
    prepare({ title, subject, date, handled }) {
      const when = date ? new Date(date).toLocaleDateString("pt-BR") : "";
      const status = handled ? "✓ " : "• ";
      return {
        title: `${status}${title || "Sem nome"}`,
        subtitle: [subject, when].filter(Boolean).join(" · "),
      };
    },
  },
});
