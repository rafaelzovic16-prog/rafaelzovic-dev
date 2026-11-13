/**
 * O site só pode ser indexado por buscadores depois da publicação aprovada (Fase 7).
 * Até lá, robots.txt e as páginas pedem para não indexar, inclusive na URL de produção da Vercel.
 * Liberação: variável de ambiente SITE_INDEXABLE=true, configurada apenas no ambiente de produção.
 */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

/** Ferramentas internas de validação, que nunca aparecem em produção (E9). */
export const previewOnlyPaths: ReadonlySet<string> = new Set(["/specimen"]);

/**
 * As ferramentas internas só ficam disponíveis em previews da Vercel e no servidor de
 * desenvolvimento. `VERCEL_ENV` é uma variável de sistema que a própria Vercel define
 * em cada publicação ("preview" ou "production"); nenhuma variável foi adicionada ao projeto.
 */
export function previewToolsEnabled(
  env: { VERCEL_ENV?: string; NODE_ENV?: string } = process.env,
): boolean {
  return env.VERCEL_ENV === "preview" || env.NODE_ENV === "development";
}
