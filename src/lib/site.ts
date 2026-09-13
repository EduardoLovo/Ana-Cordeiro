/**
 * CONFIGURAÇÕES GERAIS DO SITE (não editáveis pelo painel)
 * -------------------------------------------------------
 * Valores técnicos usados em SEO (sitemap, robots, metadados). A URL pública
 * pode ser ajustada por variável de ambiente quando o domínio existir.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.anacordeiroarq.com.br";
