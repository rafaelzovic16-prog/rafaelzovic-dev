import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { galaxyA15Chrome } from "./devices";
import { matrix } from "./matriz";

/*
 * Capturas para a revisão visual humana (VALIDATION §2.1, §4): não são testes de regressão.
 * Só rodam quando pedidas, com a pasta de saída em CAPTURAS_DIR:
 *   CAPTURAS_DIR=/caminho npx playwright test capturas --project=chromium-desktop
 * Home em PT: para cada viewport da matriz, a primeira tela (densidade 2) e a página inteira,
 * sem e com a sobreposição do grid (densidade 1). Home em EN: primeira tela e página inteira
 * no mobile e no desktop. Depois, a primeira tela nos perfis medidos do Galaxy A15.
 */
const outputDir = process.env.CAPTURAS_DIR ?? "";

test.skip(!outputDir, "Capturas só quando CAPTURAS_DIR estiver definido.");

const a15 = [
  { name: "galaxy-a15-vertical", profile: galaxyA15Chrome.barrasVisiveis },
  { name: "galaxy-a15-horizontal", profile: galaxyA15Chrome.horizontal },
  {
    name: "galaxy-a15-horizontal-355",
    profile: {
      ...galaxyA15Chrome.horizontal,
      viewport: { width: 837, height: 355 },
    },
  },
];

const pages = [
  { path: "/", slug: "home-pt", viewports: matrix, grid: true },
  {
    path: "/en",
    slug: "home-en",
    viewports: matrix.filter(({ width }) => width === 400 || width === 1440),
    grid: false,
  },
];

for (const { path, slug, viewports, grid } of pages) {
  for (const viewport of viewports) {
    const name = `${slug}-${viewport.width}x${viewport.height}`;

    test(`primeira tela ${name}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { ...viewport },
        deviceScaleFactor: 2,
      });
      await capture(await context.newPage(), path, name, false);
      await context.close();
    });

    test(`página inteira ${name}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { ...viewport },
        deviceScaleFactor: 1,
      });
      await capture(await context.newPage(), path, `${name}-inteira`, true);
      if (grid) {
        const page = await context.newPage();
        await capture(page, path, `${name}-inteira-grid`, true, showGrid);
      }
      await context.close();
    });
  }
}

for (const { name, profile } of a15) {
  test(`primeira tela home-pt-${name}`, async ({ browser }) => {
    const context = await browser.newContext(profile);
    await capture(await context.newPage(), "/", `home-pt-${name}`, false);
    await context.close();
  });
}

/*
 * Sobreposição do grid só para a captura: as mesmas classes do botão "Mostrar grid" do
 * /specimen, sobre a página inteira. Não existe no site.
 */
async function showGrid(page: Page) {
  await page.evaluate(() => {
    document.body.style.position = "relative";
    const overlay = document.createElement("div");
    overlay.className = "pointer-events-none absolute inset-0 z-50";
    const grid = document.createElement("div");
    grid.className = "container-editorial grid-editorial h-full";
    for (let i = 0; i < 12; i++) {
      const column = document.createElement("div");
      const visibility =
        i >= 8 ? "hidden lg:block" : i >= 4 ? "hidden md:block" : "";
      column.className = `bg-accent/10 border-accent/50 h-full border-x ${visibility}`;
      grid.append(column);
    }
    overlay.append(grid);
    document.body.append(overlay);
  });
}

async function capture(
  page: Page,
  path: string,
  name: string,
  fullPage: boolean,
  before?: (page: Page) => Promise<void>,
) {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toBeVisible();
  if (before) await before(page);
  mkdirSync(outputDir, { recursive: true });
  await page.screenshot({
    path: join(outputDir, `${name}.jpg`),
    fullPage,
    type: "jpeg",
    quality: 85,
  });
}
