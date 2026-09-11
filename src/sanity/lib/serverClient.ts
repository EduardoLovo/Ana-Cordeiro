import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * CLIENTE DE ESCRITA (uso exclusivo no servidor) — grava as mensagens do
 * formulário de contato. Precisa do token secreto SANITY_API_WRITE_TOKEN, que
 * nunca vai para o navegador (garantido pelo import "server-only").
 */
const token = process.env.SANITY_API_WRITE_TOKEN;

export const hasWriteToken = Boolean(token);

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});
