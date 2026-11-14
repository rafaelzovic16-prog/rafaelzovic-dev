import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { galaxyA15Chrome } from "./devices";
import { matrix } from "./matriz";
import { PREVIEW_PORT } from "./servers";

/*
 * Capturas para a revisão visual humana (VALIDATION §4): não são testes de regressão.
 * Só rodam quando pedidas, com a pasta de saída em CAPTURAS_DIR:
 *   CAPTURAS_DIR=/caminho npx playwright test capturas --project=chromium-desktop
 * Para cada viewport da matriz (matriz.ts): a primeira tela (densidade 2) e a página inteira,
 * sem e com a sobreposição do grid (densidade 1, para manter os arquivos leves). Depois, a
 * primeira tela nos perfis medidos do Galaxy A15.
 */
const outputDir = process.env.CAPTURAS_DIR;

test.skip(!outputDir, "Capturas só quando CAPTURAS_DIR estiver definido.");
test.use({ baseURL: `http://localhost:${PREVIEW_PORT}` });

/* Perfis medidos do Galaxy A15 (E11, E15): densidade 2,7, toque e interface móvel. */
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

const slug = "specimen";

for (const viewport of matrix) {
  const name = `${slug}-${viewport.width}x${viewport.height}`;

  test(`primeira tela ${name}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { ...viewport },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await capture(page, name, false);
    await context.close();
  });

  test(`página inteira ${name}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { ...viewport },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await capture(page, `${name}-inteira`, true);
    // Página nova para a versão com grid: a captura de página inteira redimensiona o viewport
    // por um instante, e o diagnóstico registraria esse tamanho como uma variação.
    const gridPage = await context.newPage();
    await gridPage.goto("/specimen");
    await gridPage.evaluate(() => document.fonts.ready);
    await gridPage.getByRole("button", { name: "Mostrar grid" }).click();
    await capture(gridPage, `${name}-inteira-grid`, true, false);
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
