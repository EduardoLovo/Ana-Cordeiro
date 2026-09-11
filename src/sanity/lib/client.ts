import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * CLIENTE DE LEITURA do Sanity. Usa o CDN (respostas rápidas e baratas) e
 * mostra apenas o conteúdo publicado (rascunhos não aparecem para visitantes).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
