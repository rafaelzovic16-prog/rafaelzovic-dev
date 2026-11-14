import { projects, type Project } from "./projects";

/** As seis áreas do BRIEFING §6.5, com os nomes usados no próprio briefing. */
export const capabilityAreas = [
  "Software Development",
  "Web Development",
  "Database & Backend",
  "Product Thinking",
  "Problem Solving",
  "Digital Experiences",
] as const;

/**
 * Registro técnico "usado em projetos" (DESIGN-SPEC §9.7), derivado das stacks dos projetos:
 * uma tecnologia só aparece aqui se um projeto a lista (VALIDATION §1). Ordem de aparição.
 */
export function technologiesInUse(
  list: readonly Project[] = projects,
): { technology: string; projects: Project[] }[] {
  const used = new Map<string, Project[]>();
  for (const project of list) {
    for (const technology of project.stack) {
      used.set(technology, [...(used.get(technology) ?? []), project]);
    }
  }
  return [...used].map(([technology, inProjects]) => ({
    technology,
    projects: inProjects,
  }));
}
