import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { galaxyA15Chrome } from "./devices";
import { PREVIEW_PORT } from "./servers";

/*
 * Capturas para a revisão visual humana (VALIDATION §4): não são testes de regressão.
 * Só rodam quando pedidas, com a pasta de saída em CAPTURAS_DIR:
 *   CAPTURAS_DIR=/caminho npx playwright test capturas --project=chromium-desktop
 * Para cada largura da matriz: a primeira tela (densidade 2) e a página inteira, sem e com
 * a sobreposição do grid (densidade 1, para manter os arquivos leves).
 */
const outputDir = process.env.CAPTURAS_DIR;

test.skip(!outputDir, "Capturas só quando CAPTURAS_DIR estiver definido.");
test.use({ baseURL: `http://localhost:${PREVIEW_PORT}` });

const matrix = [
  { width: 320, height: 568 },
  { width: 375, height: 548 },
  { width: 390, height: 844 },
  { width: 412, height: 708 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

const a15 = [
  { name: "galaxy-a15-vertical", profile: galaxyA15Chrome.barrasVisiveis },
  { name: "galaxy-a15-horizontal", profile: galaxyA15Chrome.horizontal },
];

const slug = "specimen";

for (const viewport of matrix) {
  const name = `${slug}-${viewport.width}x${viewport.height}`;

  test(`primeira tela ${name}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await capture(page, name, false);
    await context.close();
  });

  test(`página inteira ${name}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await capture(page, `${name}-inteira`, true);
    await page.getByRole("button", { name: "Mostrar grid" }).click();
    await capture(page, `${name}-inteira-grid`, true, false);
    await context.close();
  });
}

for (const { name, profile } of a15) {
  test(`primeira tela ${slug}-${name}`, async ({ browser }) => {
    const context = await browser.newContext(profile);
    const page = await context.newPage();
    await capture(page, `${slug}-${name}`, false);
    await context.close();
  });
}

async function capture(
  page: Page,
  name: string,
  fullPage: boolean,
  navigate = true,
) {
  if (navigate) {
    await page.goto("/specimen");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
  }
  mkdirSync(outputDir ?? "", { recursive: true });
  await page.screenshot({
    path: join(outputDir ?? "", `${name}.jpg`),
    fullPage,
    type: "jpeg",
    quality: 85,
  });
}
