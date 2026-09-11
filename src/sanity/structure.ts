import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { TagIcon } from "@sanity/icons/Tag";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";

/**
 * ESTRUTURA DO PAINEL (menu lateral do Studio)
 * --------------------------------------------
 * "Página inicial", "Página Sobre" e "Configurações" aparecem como itens únicos
 * (singletons). Projetos, Categorias e Mensagens são listas.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Página inicial")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.listItem()
        .title("Página Sobre")
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

      S.divider(),

      S.listItem()
        .title("Projetos")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("project").title("Projetos")),
      S.listItem()
        .title("Categorias de projeto")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categorias")),

      S.divider(),

      S.listItem()
        .title("Mensagens")
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList("contactMessage")
            .title("Mensagens de contato")
            .defaultOrdering([{ field: "receivedAt", direction: "desc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Configurações do site")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);

/** Singletons: editados pelos itens fixos, sem criar vários. */
export const singletonTypes = new Set([
  "homePage",
  "aboutPage",
  "siteSettings",
]);

/** Tipos que a cliente não cria manualmente (singletons + mensagens). */
export const uncreatableTypes = new Set([
  ...singletonTypes,
  "contactMessage",
]);
