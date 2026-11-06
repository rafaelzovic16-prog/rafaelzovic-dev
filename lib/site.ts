/**
 * O site só pode ser indexado por buscadores depois da publicação aprovada (Fase 7).
 * Até lá, robots.txt e as páginas pedem para não indexar, inclusive na URL de produção da Vercel.
 * Liberação: variável de ambiente SITE_INDEXABLE=true, configurada apenas no ambiente de produção.
 */
export const isIndexable = process.env.SITE_INDEXABLE === "true";
