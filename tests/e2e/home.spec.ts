import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Page } from "@playwright/test";
import { auditLayout, walkFocus } from "./auditoria";
import { galaxyA15Chrome } from "./devices";
import { matrix } from "./matriz";

/*
 * Home (Fase 3): primeira dobra (A2; VALIDATION §3), layout em toda a matriz, conteúdo sem
 * invenção (C2), menu, teclado e acessibilidade, em PT e EN. Roda no servidor como produção.
 */
const homes = [
  { path: "/", projects: "#projetos", about: "#sobre", pending: "pendente" },
  { path: "/en", projects: "#projects", about: "#about", pending: "pending" },
] as const;

async function openHome(page: Page, path: string) {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

/* Perfis do critério A2: o Galaxy A15 medido e os viewports efetivos de iPhone (VALIDATION §3.3). */
const mobileProfiles = [
  {
    name: "Galaxy A15 · Chrome (medido)",
    options: galaxyA15Chrome.barrasVisiveis,
  },
  ...[
    { name: "iPhone SE · Safari (estimativa)", width: 375, height: 548 },
    { name: "iPhone 13 Mini", width: 375, height: 629 },
    { name: "iPhone 13 / 14", width: 390, height: 664 },
    { name: "iPhone 16e", width: 390, height: 651 },
    { name: "iPhone 16", width: 393, height: 659 },
    { name: "iPhone 16 Pro Max", width: 440, height: 763 },
  ].map(({ name, width, height }) => ({
    name,
    options: {
      viewport: { width, height },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
  })),
];

async function newMobilePage(
  browser: Browser,
  profile: (typeof mobileProfiles)[number],
) {
  const context = await browser.newContext(profile.options);
  return { context, page: await context.newPage() };
}

for (const home of homes) {
  for (const profile of mobileProfiles) {
    test(`primeira dobra ${home.path} · ${profile.name}`, async ({
      browser,
    }) => {
      const { context, page } = await newMobilePage(browser, profile);
      await openHome(page, home.path);
      // Medir com a fonte substituta não vale (VALIDATION §3.2).
      const loaded = await page.evaluate(() =>
        [...document.fonts]
          .filter((font) => font.status === "loaded")
          .map((font) => `${font.family} ${font.weight}`),
      );
      for (const font of ["manrope 500", "manrope 600", "inter 400"]) {
        expect(loaded.some((entry) => entry.toLowerCase().includes(font))).toBe(
          true,
        );
      }
      const innerHeight = await page.evaluate(() => window.innerHeight);
      const h1 = await page.locator("h1").boundingBox();
      const row = await page
        .locator(`main a[href$="${home.projects}"]`)
        .first()
        .boundingBox();
      expect(h1!.y + h1!.height).toBeLessThanOrEqual(innerHeight);
      expect(row!.y + row!.height).toBeLessThanOrEqual(innerHeight);
      // M1: no mobile, a linha "Projetos" vem antes da foto.
      const photo = await page.locator('main [role="img"]').boundingBox();
      expect(row!.y).toBeLessThan(photo!.y);
      await context.close();
    });
  }
}

/* §3.5 Desktop: H1 e faixa "Índice" visíveis na primeira tela. */
const desktopFolds = [
  { width: 1440, height: 900, blocked: false },
  { width: 1920, height: 1080, blocked: false },
  { width: 1024, height: 768, blocked: false },
  // F3-2: com a foto 4:5 nas colunas 9–12, a faixa fica abaixo da dobra; aguarda Rafa.
  { width: 1440, height: 800, blocked: true },
  { width: 1280, height: 720, blocked: true },
];

for (const { width, height, blocked } of desktopFolds) {
  test(`primeira dobra desktop ${width} × ${height}`, async ({ page }) => {
    test.fail(blocked, "Divergência F3-2: decisão de Rafa pendente.");
    await page.setViewportSize({ width, height });
    await openHome(page, "/");
    const h1 = await page.locator("h1").boundingBox();
    const strip = await page.locator('main a[href$="#sobre"]').boundingBox();
    expect(h1!.y + h1!.height).toBeLessThanOrEqual(height);
    expect(strip!.y + strip!.height).toBeLessThanOrEqual(height);
  });
}

/* A assinatura nunca invade a coluna da foto (F3-1), nos dois idiomas. */
for (const home of homes) {
  for (const width of [768, 837, 1024, 1280, 1440, 1920]) {
    test(`assinatura e foto sem sobreposição ${home.path} · ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await openHome(page, home.path);
      const { lineRight, photoLeft } = await page.evaluate(() => {
        const display = document.querySelector("main .type-display")!;
        const range = document.createRange();
        range.selectNodeContents(display);
        const right = Math.max(
          ...[...range.getClientRects()].map((rect) => rect.right),
        );
        const photo = document.querySelector('main [role="img"]')!;
        return {
          lineRight: right,
          photoLeft: photo.getBoundingClientRect().left,
        };
      });
      expect(lineRight).toBeLessThan(photoLeft);
    });
  }
}

/* Layout em toda a matriz (as mesmas verificações do /specimen). */
for (const home of homes) {
  for (const viewport of matrix) {
    test(`layout ${home.path} · ${viewport.width} × ${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await openHome(page, home.path);
      // A assinatura passa das 7 colunas de propósito no desktop (F3-1): o teste
      // "assinatura e foto sem sobreposição" confere o que importa.
      const report = await page.evaluate(auditLayout, "main .type-display");
      expect(report.pageWidth, "rolagem horizontal").toBeLessThanOrEqual(
        viewport.width,
      );
      expect(report.outside, "elementos fora da tela").toEqual([]);
      expect(report.textOverflow, "conteúdo maior que a caixa").toEqual([]);
      expect(report.overlaps, "controles sobrepostos").toEqual([]);
      expect(report.smallTargets, "controles com menos de 48 px").toEqual([]);
    });
  }
}

/* Estrutura, superfícies e conteúdo sem invenção (C2). */
for (const home of homes) {
  test(`estrutura e conteúdo ${home.path}`, async ({ page }) => {
    await openHome(page, home.path);
    await expect(page.locator("h1")).toHaveCount(1);
    // Seções na ordem aprovada, numeradas de 01 a 04.
    const labels = await page.locator("main section h2").allTextContents();
    expect(labels.map((label) => label.slice(0, 2))).toEqual([
      "01",
      "02",
      "03",
      "04",
    ]);
    // Bone até o Sobre; Competências, Contato e rodapé num bloco Charcoal contínuo.
    await expect(page.locator('[data-surface="dark"] section')).toHaveCount(2);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator('[data-surface="dark"] footer')).toHaveCount(1);
    // Projetos na ordem aprovada (D5), cada um com status datado.
    await expect(page.locator("main article h3")).toHaveText([
      "Qualyt Trend",
      "SaldoZen",
    ]);
    await expect(page.locator("main article time[datetime]")).toHaveCount(2);
    // Contatos: só o GitHub aprovado (E4); nenhum endereço inventado.
    await expect(
      page.locator('a[href="https://github.com/rafaelzovic16-prog"]'),
    ).toHaveCount(1);
    await expect(
      page.locator(
        'a[href*="linkedin"], a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]',
      ),
    ).toHaveCount(0);
    // Conteúdo pendente marcado, nunca texto provisório.
    const pending = page.locator("[data-pending]");
    // Foto, 2 capturas, abertura e texto do Sobre, 3 afirmações, 6 áreas, "Em estudo",
    // LinkedIn, e-mail e WhatsApp (FASE-3.md).
    await expect(pending).toHaveCount(18);
    for (const text of await pending.allTextContents()) {
      expect(text).toContain(home.pending);
    }
  });
}

test("menu do mobile abre, leva à seção e fecha", async ({ browser }) => {
  const { context, page } = await newMobilePage(browser, mobileProfiles[0]!);
  await openHome(page, "/");
  const menu = page.locator("#menu");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Sobre" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#sobre$/);
  // Esc também fecha (Popover API).
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await context.close();
});

test("menu do mobile funciona sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    ...mobileProfiles[0]!.options,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto("/");
  const menu = page.locator("#menu");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(menu).toBeVisible();
  // Os quatro links do menu, mais PT / EN no rodapé da sobreposição (§8).
  await expect(menu.getByRole("navigation").getByRole("link")).toHaveCount(4);
  await expect(menu.locator("a[hreflang]")).toHaveCount(1);
  await menu.getByRole("button", { name: "Fechar" }).click();
  await expect(menu).toBeHidden();
  await context.close();
});

for (const viewport of [
  { width: 400, height: 766 },
  { width: 837, height: 299 },
  { width: 1440, height: 900 },
]) {
  test(`teclado na home em ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openHome(page, "/");
    // O primeiro foco é o "Pular para o conteúdo", que aparece ao receber o foco.
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Shift+Tab");

    const total = await page
      .locator("a[href]:visible, button:visible, summary:visible")
      .count();
    const visited = await walkFocus(page, total);
    for (const focus of visited) {
      expect.soft(focus.outline, `foco em "${focus.name}"`).toBe("solid 2px");
      expect.soft(focus.visible, `"${focus.name}" visível`).toBe(true);
    }
  });
}

for (const home of homes) {
  for (const viewport of [
    { width: 400, height: 766 },
    { width: 837, height: 299 },
    { width: 1440, height: 900 },
  ]) {
    test(`axe sem violações ${home.path} · ${viewport.width} × ${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await openHome(page, home.path);
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
}

test("axe sem violações com o menu aberto", async ({ browser }) => {
  const { context, page } = await newMobilePage(browser, mobileProfiles[0]!);
  await openHome(page, "/");
  await page.getByRole("button", { name: "Menu" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.map((violation) => violation.id)).toEqual([]);
  await context.close();
});
