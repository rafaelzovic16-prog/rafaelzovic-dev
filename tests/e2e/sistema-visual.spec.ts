import { expect, test, type Page } from "@playwright/test";
import { PREVIEW_PORT } from "./servers";

/*
 * Sistema visual (Fase 2), medido no navegador sobre o /specimen: escala tipográfica fluida,
 * grid 4/8/12, margens do container, foco, hover e movimento reduzido. Os valores esperados
 * vêm da DESIGN-SPEC (§4, §5, §12), não do CSS.
 */
test.use({ baseURL: `http://localhost:${PREVIEW_PORT}` });

/* §4: valores em mobile (375), tablet (768) e desktop (1440), interpolados entre eles. */
const typeScale = {
  display: { mobile: 48, tablet: 64, desktop: 96 },
  "h1-position": { mobile: 20, tablet: 24, desktop: 28 },
  h2: { mobile: 34, tablet: 42, desktop: 52 },
  h3: { mobile: 28, tablet: 32, desktop: 40 },
  "contact-xl": { mobile: 36, tablet: 56, desktop: 72 },
  lead: { mobile: 22, tablet: 26, desktop: 32 },
  body: { mobile: 16, tablet: 16, desktop: 17 },
  "body-sm": { mobile: 15, tablet: 15, desktop: 15 },
  meta: { mobile: 11, tablet: 12, desktop: 12 },
} as const;

/* Alturas de linha por faixa: mobile < 768 ≤ tablet < 1024 ≤ desktop. */
const lineHeights = {
  display: { mobile: 1, tablet: 0.98, desktop: 0.95 },
  "h1-position": { mobile: 1.4, tablet: 1.35, desktop: 1.3 },
  h2: { mobile: 1.1, tablet: 1.08, desktop: 1.05 },
  h3: { mobile: 1.15, tablet: 1.12, desktop: 1.1 },
  "contact-xl": { mobile: 1.05, tablet: 1, desktop: 1 },
  lead: { mobile: 1.35, tablet: 1.32, desktop: 1.3 },
  body: { mobile: 1.6, tablet: 1.65, desktop: 1.65 },
  "body-sm": { mobile: 1.5, tablet: 1.55, desktop: 1.55 },
  meta: { mobile: 1.4, tablet: 1.4, desktop: 1.4 },
} as const;

type Style = keyof typeof typeScale;

function lerp(from: number, to: number, start: number, end: number, x: number) {
  return from + ((to - from) * (x - start)) / (end - start);
}

function expectedSize(style: Style, width: number): number {
  const { mobile, tablet, desktop } = typeScale[style];
  // Ajuste M1: display de 44 px abaixo de 380 px; de 380 a 768 vai de 48 a 64.
  if (style === "display" && width < 380) return 44;
  if (style === "display" && width < 768)
    return lerp(mobile, tablet, 380, 768, width);
  if (width <= 375) return mobile;
  if (width < 768) return lerp(mobile, tablet, 375, 768, width);
  if (width < 1440) return lerp(tablet, desktop, 768, 1440, width);
  return desktop;
}

function band(width: number): "mobile" | "tablet" | "desktop" {
  if (width >= 1024) return "desktop";
  return width >= 768 ? "tablet" : "mobile";
}

async function measureSamples(page: Page) {
  return page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLElement>("[data-type-sample]"),
    ).map((element) => {
      const style = getComputedStyle(element);
      return {
        name: element.dataset.typeSample ?? "",
        size: parseFloat(style.fontSize),
        lineHeight: parseFloat(style.lineHeight) / parseFloat(style.fontSize),
      };
    }),
  );
}

const widths = [
  320, 375, 379, 380, 500, 767, 768, 900, 1023, 1024, 1280, 1440, 1920,
];

for (const width of widths) {
  test(`escala tipográfica em ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/specimen");
    const samples = await measureSamples(page);
    expect(samples.length).toBeGreaterThanOrEqual(
      Object.keys(typeScale).length,
    );

    for (const sample of samples) {
      const style = (sample.name === "label" ? "meta" : sample.name) as Style;
      expect
        .soft(sample.size, `${sample.name}: tamanho`)
        .toBeCloseTo(expectedSize(style, width), 0);
      expect
        .soft(sample.lineHeight, `${sample.name}: altura de linha`)
        .toBeCloseTo(lineHeights[style][band(width)], 2);
    }
  });
}

/* §5: colunas, intervalo e margens do container em cada faixa. */
const gridCases = [
  { width: 320, columns: 4, gap: 16, margin: 20 },
  { width: 767, columns: 4, gap: 16, margin: 20 },
  { width: 768, columns: 8, gap: 20, margin: 768 * 0.07 },
  { width: 1023, columns: 8, gap: 20, margin: 1023 * 0.07 },
  { width: 1024, columns: 12, gap: 24, margin: 1024 * 0.07 },
  { width: 1440, columns: 12, gap: 24, margin: 1440 * 0.07 },
  // Acima de 1440, o container para em 1440 px e a margem chega ao teto de 112 px.
  { width: 1920, columns: 12, gap: 24, margin: 112 },
];

for (const { width, columns, gap, margin } of gridCases) {
  test(`grid de ${columns} colunas e margens em ${width} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/specimen");
    const grid = await page
      .locator("[data-measure-grid]")
      .evaluate((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          columns: style.gridTemplateColumns.split(" ").length,
          gap: parseFloat(style.columnGap),
          left: rect.left,
          width: rect.width,
        };
      });
    const container = Math.min(width, 1440);
    expect(grid.columns).toBe(columns);
    expect(grid.gap).toBe(gap);
    expect(grid.width).toBeCloseTo(container - 2 * margin, 0);
    expect(grid.left).toBeCloseTo((width - container) / 2 + margin, 0);
  });
}

test("sem rolagem horizontal em 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/specimen");
  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth).toBeLessThanOrEqual(320);
});

test("foco visível: contorno de 2 px na cor de foco de cada superfície", async ({
  page,
}) => {
  await page.goto("/specimen");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText("Mostrar grid");
  await expect(focused).toHaveCSS("outline-style", "solid");
  await expect(focused).toHaveCSS("outline-width", "2px");
  await expect(focused).toHaveCSS("outline-offset", "3px");
  await expect(focused).toHaveCSS("outline-color", "rgb(23, 24, 23)");

  // Na superfície Charcoal, o foco usa Ivory.
  const darkLink = page
    .locator('[data-surface="dark"] a:not([data-state])')
    .first();
  await darkLink.focus();
  await expect(darkLink).toHaveCSS("outline-color", "rgb(242, 240, 233)");
});

test("hover: sublinhado Sage desenhado por inteiro e seta deslocada", async ({
  page,
}) => {
  await page.goto("/specimen");
  const link = page.locator("#movimento ~ p a").first();
  await link.scrollIntoViewIfNeeded();
  await link.hover();
  const underline = link.locator(".link-underline");
  await expect(underline).toHaveCSS("background-size", "100% 1px");
  await expect(underline).toHaveCSS("background-image", /rgb\(120, 129, 118\)/);
  await expect(link.locator(".link-arrow")).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, -4)",
  );
});

test("movimento reduzido: a seta não se desloca no hover", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/specimen");
  await expect(page.getByText("movimento reduzido")).toBeVisible();
  const link = page.locator("#movimento ~ p a").first();
  await link.scrollIntoViewIfNeeded();
  await link.hover();
  await expect(link.locator(".link-arrow")).toHaveCSS("transform", "none");
});

test("a sobreposição do grid liga e desliga", async ({ page }) => {
  await page.goto("/specimen");
  await expect(page.getByTestId("grid-overlay")).toHaveCount(0);
  await page.getByRole("button", { name: "Mostrar grid" }).click();
  const overlay = page.getByTestId("grid-overlay");
  await expect(overlay).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ocultar grid" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Ocultar grid" }).click();
  await expect(overlay).toHaveCount(0);
});
