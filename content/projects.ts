import type { ProjectStatus } from "@/components/primitives/StatusMarker";
import type { Locale } from "@/i18n/config";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  category: Localized;
  summary: Localized;
  /** Status sempre datado (DESIGN-SPEC §10), em formato ISO. */
  status: { value: ProjectStatus; date: string };
  stack: readonly string[];
};

/**
 * Projetos na ordem aprovada (D5). Nenhum campo é inventado (C2); fonte de cada um:
 * - categoria e resumo: texto do próprio Rafa no BRIEFING §6.3. O inglês é tradução,
 *   revisada na Fase 5;
 * - status: Qualyt Trend, registro de Rafa na `main` (commit b869a2c, 2026-11-05);
 *   SaldoZen, README e histórico verificados em 2026-11-05 (CONTENT-INVENTORY §3.2);
 * - stack: Qualyt Trend, BRIEFING §6.3 (a conferir no repositório na Fase 4);
 *   SaldoZen, package.json verificado em 2026-11-05.
 * Funcionalidades, evidências e anos entram na Fase 4, com revisão de Rafa.
 */
export const projects: readonly Project[] = [
  {
    slug: "qualyt-trend",
    name: "Qualyt Trend",
    category: {
      pt: "E-commerce / Desenvolvimento de produto digital",
      en: "E-commerce / Digital product development",
    },
    summary: {
      pt: "Projeto de comércio eletrônico com Next.js e Supabase, trabalhando com catálogo real, estrutura de dados e experiência de compra.",
      en: "E-commerce project built with Next.js and Supabase, working with a real catalog, data structure and the shopping experience.",
    },
    status: { value: "in-progress", date: "2026-11-05" },
    stack: ["Next.js", "Supabase"],
  },
  {
    slug: "saldozen",
    name: "SaldoZen",
    category: {
      pt: "Finanças pessoais / Aplicação web",
      en: "Personal finance / Web application",
    },
    summary: {
      pt: "Plataforma pessoal de organização financeira, com foco em estruturação de dados, segurança e experiência de uso.",
      en: "Personal financial organization platform, focused on data structure, security and user experience.",
    },
    status: { value: "in-progress", date: "2026-11-05" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
