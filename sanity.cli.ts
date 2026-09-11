import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

/**
 * Configuração da CLI do Sanity (comando `sanity`), para tarefas como gerar
 * tipos ou administrar o projeto. Lê project ID e dataset do ambiente.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
