import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import {
  homePath,
  knownPaths,
  localeOfPath,
  notFoundPaths,
  projectPath,
  sectionHref,
  sections,
} from "@/i18n/routes";
import nextConfig from "@/next.config";

describe("mapa de rotas", () => {
  it("segue as URLs aprovadas", () => {
    expect(homePath("pt")).toBe("/");
    expect(homePath("en")).toBe("/en");
    expect(projectPath("pt", "saldozen")).toBe("/projetos/saldozen");
    expect(projectPath("en", "saldozen")).toBe("/en/projects/saldozen");
    expect(sectionHref("pt", "about")).toBe("/#sobre");
    expect(sectionHref("en", "about")).toBe("/en#about");
  });

  it("tem âncoras distintas para as quatro seções em cada idioma", () => {
    for (const locale of locales) {
      const anchors = Object.values(sections).map((section) => section[locale]);
      expect(anchors).toHaveLength(4);
      expect(new Set(anchors).size).toBe(4);
    }
  });

  it("conhece exatamente as homes e os estudos de caso nos dois idiomas", () => {
    const expected = locales.flatMap((locale) => [
      homePath(locale),
      ...projects.map((project) => projectPath(locale, project.slug)),
    ]);
    expect([...knownPaths].sort()).toEqual(expected.sort());
  });

  it("não trata as páginas 404 como páginas conhecidas", () => {
    for (const path of Object.values(notFoundPaths)) {
      expect(knownPaths.has(path)).toBe(false);
    }
  });

  it.each([
    ["/", "pt"],
    ["/projetos/saldozen", "pt"],
    ["/qualquer", "pt"],
    ["/enx", "pt"],
    ["/en", "en"],
    ["/en/", "en"],
    ["/en/projects/saldozen", "en"],
  ] as const)("identifica o idioma de %s como %s", (path, locale) => {
    expect(localeOfPath(path)).toBe(locale);
  });

  it("mantém a ordem aprovada dos projetos (D5)", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "qualyt-trend",
      "saldozen",
    ]);
  });
});

describe("redirecionamentos", () => {
  it("levam o índice de projetos para a seção da home de cada idioma", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const destinationOf = (source: string) =>
      redirects.find((redirect) => redirect.source === source)?.destination;

    expect(destinationOf("/projetos")).toBe(sectionHref("pt", "projects"));
    expect(destinationOf("/en/projects")).toBe(sectionHref("en", "projects"));
    expect(redirects.every((redirect) => redirect.permanent)).toBe(true);
  });
});
