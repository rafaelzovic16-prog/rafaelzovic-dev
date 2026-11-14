import { describe, expect, it } from "vitest";
import { capabilityAreas, technologiesInUse } from "@/content/capabilities";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";

/* Conteúdo da home (Fase 3): regras de evidência que valem antes da Fase 4 (VALIDATION §1; C2). */
describe("projetos", () => {
  it("seguem a ordem aprovada (D5)", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "qualyt-trend",
      "saldozen",
    ]);
  });

  it("têm status datado, com data válida e não futura", () => {
    for (const project of projects) {
      expect(project.status.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const date = new Date(project.status.date);
      expect(Number.isNaN(date.getTime())).toBe(false);
      expect(date.getTime()).toBeLessThanOrEqual(Date.now());
    }
  });

  it("têm categoria, resumo e stack nos dois idiomas", () => {
    for (const project of projects) {
      for (const locale of locales) {
        expect(project.category[locale].trim()).not.toBe("");
        expect(project.summary[locale].trim()).not.toBe("");
      }
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("não anunciam o SaldoZen como concluído (estágio verificado em 2026-11-05)", () => {
    const saldozen = projects.find((project) => project.slug === "saldozen");
    expect(saldozen?.status.value).toBe("in-progress");
    // Supabase está planejado, não instalado: não pode aparecer na stack.
    expect(saldozen?.stack).not.toContain("Supabase");
  });
});

describe("competências", () => {
  it("são as seis áreas do briefing (§6.5)", () => {
    expect(capabilityAreas).toHaveLength(6);
  });

  it("toda tecnologia usada aponta para um projeto que a lista na stack", () => {
    const used = technologiesInUse();
    expect(used.length).toBeGreaterThan(0);
    for (const { technology, projects: inProjects } of used) {
      expect(inProjects.length).toBeGreaterThan(0);
      for (const project of inProjects) {
        expect(project.stack).toContain(technology);
      }
    }
  });

  it("nenhuma tecnologia de projeto fica fora do registro", () => {
    const listed = new Set(
      technologiesInUse().map((entry) => entry.technology),
    );
    for (const project of projects) {
      for (const technology of project.stack) {
        expect(listed.has(technology)).toBe(true);
      }
    }
  });
});
