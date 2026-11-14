import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { matrix } from "./matriz";
import { PREVIEW_PORT } from "./servers";

/*
 * Validação responsiva geral do sistema visual (Fase 2, E15), no /specimen, em toda a matriz.
 * Não é otimização para um aparelho: as mesmas verificações valem em todas as larguras.
 */
test.use({ baseURL: `http://localhost:${PREVIEW_PORT}` });

/** §5: margem lateral de 20 px no mobile e clamp(24px, 7vw, 112px) a partir de 768 px. */
function expectedMargin(width: number): number {
  return width < 768 ? 20 : Math.min(112, Math.max(24, width * 0.07));
}

/** §5: 4, 8 ou 12 colunas, com intervalos de 16, 20 ou 24 px. */
function expectedGrid(width: number) {
  if (width >= 1024) return { columns: 12, gap: 24 };
  if (width >= 768) return { columns: 8, gap: 20 };
  return { columns: 4, gap: 16 };
}

/*
 * Auditoria de layout executada no navegador. Ignora o que está dentro de uma área com rolagem
 * própria (o JSON do diagnóstico), e também essa própria área, cujo conteúdo é maior de
 * propósito. Tolera 4 px no transbordo de texto: é o deslocamento da seta no estado de hover,
 * fixado no /specimen por `data-state` (§6.2).
 */
function auditLayout() {
  const viewport = document.documentElement.clientWidth;
  const describe = (element: Element) =>
    `${element.tagName.toLowerCase()} "${(element.textContent ?? "").trim().slice(0, 40)}"`;
  const insideScroller = (element: Element) => {
    for (
      let parent = element.parentElement;
      parent;
      parent = parent.parentElement
    ) {
      const overflow = getComputedStyle(parent).overflowX;
      if (overflow === "auto" || overflow === "scroll") return true;
    }
    return false;
  };

  const outside: string[] = [];
  const textOverflow: string[] = [];
  for (const element of document.body.querySelectorAll("*")) {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || insideScroller(element))
      continue;
    if (rect.right > viewport + 0.5 || rect.left < -0.5)
      outside.push(describe(element));
    const style = getComputedStyle(element);
    const scrolls = style.overflowX === "auto" || style.overflowX === "scroll";
    if (
      !scrolls &&
      style.display !== "inline" &&
      element.clientWidth > 0 &&
      element.scrollWidth > element.clientWidth + 4
    ) {
      textOverflow.push(describe(element));
    }
  }

  const interactive = [
    ...document.querySelectorAll("a[href], button, summary"),
  ].filter((element) => element.getBoundingClientRect().width > 0);
  const overlaps: string[] = [];
  interactive.forEach((a, i) => {
    const ra = a.getBoundingClientRect();
    interactive.slice(i + 1).forEach((b) => {
      const rb = b.getBoundingClientRect();
      const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      const y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (x > 1 && y > 1) overlaps.push(`${describe(a)} × ${describe(b)}`);
    });
  });

  // Botões e controles: alvo de toque de 48 px (§5). Links em texto: composição da Fase 3 (S7).
  const smallTargets = [
    ...document.querySelectorAll("button, summary, a.min-h-12"),
  ]
    .filter((element) => element.getBoundingClientRect().height < 48)
    .map(describe);

  return {
    pageWidth: document.documentElement.scrollWidth,
    viewport,
    outside,
    textOverflow,
    overlaps,
    smallTargets,
  };
}

/* Larguras da matriz e os limites de cada faixa (767/768 e 1023/1024). */
const layoutCases = [
  ...matrix,
  { width: 767, height: 900 },
  { width: 1023, height: 900 },
];

for (const viewport of layoutCases) {
  test(`layout em ${viewport.width} × ${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/specimen");
    await page.evaluate(() => document.fonts.ready);

    const report = await page.evaluate(auditLayout);
    expect(report.viewport).toBe(viewport.width);
    expect(report.pageWidth, "rolagem horizontal").toBeLessThanOrEqual(
      viewport.width,
    );
    expect(report.outside, "elementos fora da tela").toEqual([]);
    expect(report.textOverflow, "conteúdo maior que a própria caixa").toEqual(
      [],
    );
    expect(report.overlaps, "elementos interativos sobrepostos").toEqual([]);
    expect(report.smallTargets, "controles com menos de 48 px").toEqual([]);

    // Container e grid (§5).
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
    const container = Math.min(viewport.width, 1440);
    const margin = expectedMargin(viewport.width);
    expect(grid).toMatchObject(expectedGrid(viewport.width));
    expect(grid.width).toBeCloseTo(container - 2 * margin, 0);
    expect(grid.left).toBeCloseTo((viewport.width - container) / 2 + margin, 0);
  });
}

/* Teclado: todos os controles alcançáveis, na ordem de leitura, com foco visível na tela. */
const keyboardViewports = [
  { width: 400, height: 766 },
  { width: 837, height: 299 },
  { width: 1440, height: 900 },
];

for (const viewport of keyboardViewports) {
  test(`navegação por teclado em ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/specimen");
    const total = await page.locator("a[href], button, summary").count();
    expect(total).toBeGreaterThan(30);

    const visited: { name: string; top: number; left: number }[] = [];
    for (let i = 0; i < total; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          name: (element.textContent ?? "").trim().slice(0, 40),
          top: rect.top + window.scrollY,
          left: rect.left,
          outline: `${style.outlineStyle} ${style.outlineWidth}`,
          visible:
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.left >= 0 &&
            rect.right <= window.innerWidth,
        };
      });
      expect
        .soft(focused.outline, `foco em "${focused.name}"`)
        .toBe("solid 2px");
      expect.soft(focused.visible, `"${focused.name}" visível`).toBe(true);
      visited.push(focused);
    }

    // Ordem de leitura: de cima para baixo e, na mesma linha, da esquerda para a direita.
    visited.slice(1).forEach((current, i) => {
      const previous = visited[i]!;
      const sameRow = Math.abs(current.top - previous.top) <= 8;
      expect
        .soft(
          sameRow ? current.left > previous.left : current.top > previous.top,
          `ordem: "${previous.name}" → "${current.name}"`,
        )
        .toBe(true);
    });
  });
}

/* Acessibilidade automática (axe, regras WCAG 2.2 A e AA), incluindo o contraste real. */
for (const viewport of keyboardViewports) {
  test(`axe sem violações em ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/specimen");
    await page.evaluate(() => document.fonts.ready);
    // Também com o diagnóstico completo aberto e a sobreposição do grid ligada.
    await page.getByText("Ver o diagnóstico completo").click();
    await page.getByRole("button", { name: "Mostrar grid" }).click();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
      ),
    ).toEqual([]);
  });
}
