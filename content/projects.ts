/**
 * Projetos publicados, na ordem aprovada (D5).
 * Por enquanto só o identificador e o nome; o modelo completo, com status,
 * funcionalidades e evidências, entra na Fase 4.
 */
export const projects = [
  { slug: "qualyt-trend", name: "Qualyt Trend" },
  { slug: "saldozen", name: "SaldoZen" },
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
