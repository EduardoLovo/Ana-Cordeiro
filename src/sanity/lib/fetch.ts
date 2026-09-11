import { client } from "./client";
import { isSanityConfigured } from "../env";

/**
 * HELPER DE BUSCA COM CACHE
 * -------------------------
 * Envolve o client.fetch adicionando: (1) fallback vazio quando o Sanity ainda
 * não está configurado (evita erros de rede) e (2) revalidação por tempo do
 * Next, para o conteúdo publicado aparecer no site em poucos instantes.
 */
export const DEFAULT_REVALIDATE = 60;

type FetchOptions = {
  fallback: unknown;
  tags?: string[];
  revalidate?: number;
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: FetchOptions = { fallback: null },
): Promise<T> {
  if (!isSanityConfigured) {
    return options.fallback as T;
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: options.revalidate ?? DEFAULT_REVALIDATE,
      tags: options.tags,
    },
  });
}
