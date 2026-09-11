/**
 * VARIÁVEIS DE AMBIENTE DO SANITY
 * -------------------------------
 * Centraliza a leitura das configurações do Sanity. Os valores vêm do
 * `.env.local` (nunca do código), para o mesmo código funcionar em projetos
 * diferentes — importante porque será transferido para a cliente no futuro.
 */

export const apiVersion = readEnv(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "2025-01-01",
);

export const dataset = readEnv(process.env.NEXT_PUBLIC_SANITY_DATASET, "production");

/**
 * ID do projeto Sanity. Enquanto o projeto real não existe, usamos
 * "placeholder": o site continua funcionando e mostra estados vazios.
 */
export const projectId = readEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "placeholder",
);

/** Indica se o Sanity já foi configurado de verdade. */
export const isSanityConfigured = projectId !== "placeholder";

/**
 * Lê uma variável com valor padrão seguro, tratando ausência (undefined) e
 * vazio ("" / só espaços) como "não configurado" — evita que uma variável
 * vazia na hospedagem quebre o build.
 */
function readEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}
