import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** Lista as folhas do dicionário como pares [caminho, valor]. */
function leaves(value: unknown, prefix = ""): [string, unknown][] {
  if (typeof value !== "object" || value === null) return [[prefix, value]];
  return Object.entries(value).flatMap(([key, child]) =>
    leaves(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("dicionários PT/EN", () => {
  it("têm exatamente as mesmas chaves", () => {
    const keys = (locale: (typeof locales)[number]) =>
      leaves(dictionaries[locale])
        .map(([key]) => key)
        .sort();
    expect(keys("en")).toEqual(keys("pt"));
  });

  it.each(locales)("%s não tem textos vazios", (locale) => {
    for (const [key, value] of leaves(dictionaries[locale])) {
      expect(typeof value, key).toBe("string");
      expect(String(value).trim(), key).not.toBe("");
    }
  });

  it("usam os posicionamentos aprovados (D1, D2)", () => {
    expect(dictionaries.pt.hero.position).toBe(
      "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer.",
    );
    expect(dictionaries.en.hero.position).toBe(
      "Web Developer in training, working towards becoming a Software Engineer.",
    );
  });

  it("usam os títulos de página aprovados", () => {
    expect(dictionaries.pt.meta.homeTitle).toBe(
      "Rafa — Desenvolvedor web em formação",
    );
    expect(dictionaries.en.meta.homeTitle).toBe(
      "Rafa — Web Developer in training",
    );
  });

  it.each(locales)(
    "%s mantém o marcador {project} no título do estudo de caso",
    (locale) => {
      expect(dictionaries[locale].meta.caseStudyTitle).toContain("{project}");
    },
  );
});
