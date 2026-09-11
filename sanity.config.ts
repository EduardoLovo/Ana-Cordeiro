"use client";

/**
 * CONFIGURAÇÃO DO SANITY STUDIO (painel de administração)
 * -------------------------------------------------------
 * Carregado pela rota /studio (painel embutido no site) e pela CLI do Sanity.
 * Painel 100% em português, mostrando só o que a arquiteta precisa editar.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";
import { structure, singletonTypes, uncreatableTypes } from "@/sanity/structure";

export default defineConfig({
  name: "ana-cordeiro-arquitetura-studio",
  title: "Ana Cordeiro — Painel",
  basePath: "/studio",

  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Impede criação manual de singletons e das mensagens de contato.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !uncreatableTypes.has(schemaType)),
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  // Remove ações destrutivas dos singletons (evita apagar sem querer).
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
});
