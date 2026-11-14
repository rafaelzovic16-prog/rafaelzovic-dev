import { expect, test } from "@playwright/test";
import { galaxyA15Chrome } from "./devices";
import { PREVIEW_PORT } from "./servers";

/*
 * Diagnóstico de viewport (E9, E10), no servidor que simula um preview da Vercel, com o perfil
 * medido no Galaxy A15 de Rafa (E11): a página emulada precisa reproduzir os números que o
 * aparelho real informou.
 */
test.use({
  ...galaxyA15Chrome.barrasVisiveis,
  baseURL: `http://localhost:${PREVIEW_PORT}`,
});

test("no preview, /medir mostra a área útil, a densidade e a orientação", async ({
  page,
}) => {
  const response = await page.goto("/medir");
  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.getByTestId("abertura")).toHaveText("400 × 766");
  await expect(page.getByTestId("dpr")).toHaveText(/^2\.7/);
  await expect(page.getByTestId("orientacao")).toContainText("portrait");
  await expect(page.getByTestId("variacao-vertical")).toContainText(
    "largura 400 · altura 766 a 766",
  );
});

test("registra as variações da barra do Chrome sem alterar a leitura de abertura", async ({
  page,
}) => {
  await page.goto("/medir");
  await expect(page.getByTestId("abertura")).toHaveText("400 × 766");

  // Barra do Chrome recolhida, como medido no aparelho: a altura útil vai a 822.
  await page.setViewportSize(galaxyA15Chrome.barraRecolhida.viewport);
  await expect(page.getByTestId("variacao-vertical")).toContainText(
    "altura 766 a 822 · barra do Chrome ≈ 56 px",
  );

  // Rotação para a horizontal, com as barras visíveis.
  await page.setViewportSize(galaxyA15Chrome.horizontal.viewport);
  await expect(page.getByTestId("variacao-horizontal")).toContainText(
    "largura 837",
  );

  await expect(page.getByTestId("abertura")).toHaveText("400 × 766");
});

test("o diagnóstico completo tem os campos usados no perfil do Playwright", async ({
  page,
}) => {
  await page.goto("/medir");
  await page.getByText("Ver o diagnóstico completo").click();
  const diagnostic = JSON.parse(
    (await page.getByTestId("json").textContent()) ?? "{}",
  );

  expect(diagnostic.abertura).toMatchObject({
    innerWidth: 400,
    innerHeight: 766,
  });
  expect(diagnostic.abertura.devicePixelRatio).toBeCloseTo(2.7, 3);
  expect(diagnostic.abertura.screen).toEqual(
    expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }),
  );
  expect(diagnostic.abertura).toHaveProperty("visualViewport");
  expect(diagnostic.abertura).toHaveProperty("orientation");
  expect(diagnostic.variacoes).toHaveProperty("vertical");
  expect(typeof diagnostic.userAgent).toBe("string");
});
