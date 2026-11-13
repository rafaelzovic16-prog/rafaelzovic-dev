import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * Sistema visual (Fase 2): os valores de cor só existem em app/globals.css, e os contrastes
 * da especificação (DESIGN-SPEC §3) são conferidos a partir desses valores.
 */
const css = readFileSync("app/globals.css", "utf8");

type Rgb = [number, number, number];

function primitive(name: string): Rgb {
  const hex = css.match(new RegExp(`--${name}: #([0-9a-f]{6});`))?.[1];
  if (!hex) throw new Error(`Primitiva --${name} não encontrada`);
  const channel = (i: number) => parseInt(hex.slice(i, i + 2), 16);
  return [channel(0), channel(2), channel(4)];
}

/** Valor `rgb(r g b / alfa)` de um token semântico, no bloco indicado. */
function translucent(
  block: string,
  token: string,
): { rgb: Rgb; alpha: number } {
  const match = css
    .slice(css.indexOf(block))
    .match(
      new RegExp(`--${token}: rgb\\((\\d+) (\\d+) (\\d+) / ([\\d.]+)\\);`),
    );
  if (!match) throw new Error(`Token --${token} não encontrado em ${block}`);
  const [, r, g, b, alpha] = match.map(Number) as [
    number,
    number,
    number,
    number,
    number,
  ];
  return { rgb: [r, g, b], alpha };
}

function over(top: { rgb: Rgb; alpha: number }, [r, g, b]: Rgb): Rgb {
  const mix = (front: number, back: number) =>
    Math.round(front * top.alpha + back * (1 - top.alpha));
  return [mix(top.rgb[0], r), mix(top.rgb[1], g), mix(top.rgb[2], b)];
}

function luminance([r, g, b]: Rgb): number {
  const linear = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const high = Math.max(luminance(a), luminance(b));
  const low = Math.min(luminance(a), luminance(b));
  return (high + 0.05) / (low + 0.05);
}

const bone = primitive("bone");
const graphite = primitive("graphite");
const stone = primitive("stone");
const sage = primitive("sage");
const charcoal = primitive("charcoal");

describe("primitivas (§3.1)", () => {
  it("têm os valores da especificação", () => {
    expect(bone).toEqual([0xf2, 0xf0, 0xe9]);
    expect(graphite).toEqual([0x17, 0x18, 0x17]);
    expect(stone).toEqual([0xd9, 0xd7, 0xcf]);
    expect(sage).toEqual([0x78, 0x81, 0x76]);
    expect(charcoal).toEqual([0x20, 0x21, 0x1f]);
  });
});

describe("contrastes (§3.2, §3.3, §13)", () => {
  const mutedLight = translucent(":root {", "text-muted");
  const mutedDark = translucent('[data-surface="dark"]', "text-muted");

  it("text-muted é graphite 72% no claro e ivory 70% no escuro", () => {
    expect(mutedLight).toEqual({ rgb: graphite, alpha: 0.72 });
    expect(mutedDark).toEqual({ rgb: bone, alpha: 0.7 });
  });

  /*
   * Contraste WCAG 2 medido a partir dos valores do CSS. A especificação arredonda alguns para
   * cima (≈ 15:1, ≈ 7:1 e ≈ 9:1); os medidos estão registrados em docs/FASE-2.md (achado F2-1).
   * Todos passam AA (4,5:1), exigido em todo texto (§13). Os valores ficam fixados aqui para
   * que qualquer mudança de cor apareça no teste.
   */
  it("texto principal passa AA: 15,6:1 sobre Bone e 14,2:1 sobre Charcoal", () => {
    expect(contrast(graphite, bone)).toBeCloseTo(15.6, 1);
    expect(contrast(bone, charcoal)).toBeCloseTo(14.2, 1);
  });

  it("texto secundário passa AA: 6,7:1 sobre Bone e 7,6:1 sobre Charcoal", () => {
    const light = contrast(over(mutedLight, bone), bone);
    const dark = contrast(over(mutedDark, charcoal), charcoal);
    expect(light).toBeCloseTo(6.7, 1);
    expect(dark).toBeCloseTo(7.6, 1);
    expect(Math.min(light, dark)).toBeGreaterThanOrEqual(4.5);
  });

  it("Sage passa 3:1 para elementos de interface nas duas superfícies, mas não serve para texto normal", () => {
    expect(contrast(sage, bone)).toBeGreaterThanOrEqual(3);
    expect(contrast(sage, charcoal)).toBeGreaterThanOrEqual(3);
    expect(contrast(sage, bone)).toBeLessThan(4.5);
  });

  it("o rótulo sobre a moldura Stone (fotografia pendente) passa AA", () => {
    expect(contrast(graphite, stone)).toBeGreaterThanOrEqual(4.5);
  });

  it("Stone é decorativo: ≈ 1,3:1 sobre Bone", () => {
    expect(contrast(stone, bone)).toBeLessThan(1.5);
  });
});

/* §3.3: componentes usam só tokens semânticos, nunca valores de cor. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(entry.name) ? [path] : [];
  });
}

const palette =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white";
const forbidden = [
  {
    name: "cor hexadecimal",
    pattern: /(?<![\w&/])#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/i,
  },
  { name: "função de cor", pattern: /\b(?:rgba?|hsla?|oklch|oklab)\(/ },
  {
    name: "classe da paleta do Tailwind",
    pattern: new RegExp(
      `\\b(?:bg|text|border|outline|ring|fill|stroke|decoration|from|to|via)-(?:${palette})\\b`,
    ),
  },
];

/*
 * ARCHITECTURE §6: valores arbitrários do Tailwind (ex.: `mt-[13px]`) fogem da escala.
 * Exceções justificadas, com o arquivo onde são permitidas.
 */
const arbitraryExceptions = [
  {
    value: "grid-cols-[auto_1fr]",
    file: join("app", "(pt)", "specimen", "page.tsx"),
    reason: "tabelas de valores do /specimen, ferramenta interna",
  },
];

describe("valores arbitrários do Tailwind", () => {
  it("só aparecem nas exceções registradas", () => {
    const found = ["app", "components"]
      .flatMap(sourceFiles)
      .flatMap((file) =>
        [
          ...readFileSync(file, "utf8").matchAll(/[\w:-]+-\[[^\]\s"'`]+\]/g),
        ].map(([value]) => ({ value, file })),
      );
    const unexpected = found.filter(
      ({ value, file }) =>
        !arbitraryExceptions.some(
          (exception) => exception.value === value && exception.file === file,
        ),
    );
    expect(unexpected).toEqual([]);
  });
});

describe("valores de cor fora de app/globals.css", () => {
  const files = ["app", "components"]
    .flatMap(sourceFiles)
    .filter((file) => file !== join("app", "globals.css"));

  it("existem arquivos para verificar", () => {
    expect(files.length).toBeGreaterThan(10);
  });

  for (const { name, pattern } of forbidden) {
    it(`nenhum arquivo usa ${name}`, () => {
      const offenders = files.filter((file) =>
        pattern.test(readFileSync(file, "utf8")),
      );
      expect(offenders).toEqual([]);
    });
  }
});
