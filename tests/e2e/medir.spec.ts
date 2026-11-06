import { expect, test } from "@playwright/test";
import { PREVIEW_PORT } from "./servers";

/*
 * Diagnóstico de viewport (E9, E10), no servidor que simula um preview da Vercel.
 * O viewport de teste usa a referência inicial do Galaxy A15 (412 × 892 CSS px, densidade 2,625)
 * só para conferir que a página lê e registra os valores; a área útil real vem do aparelho (E7).
 */
test.use({
  baseURL: `http://localhost:${PREVIEW_PORT}`,
  viewport: { width: 412, height: 892 },
  deviceScaleFactor: 2.625,
  isMobile: true,
  hasTouch: true,
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
  await expect(page.getByTestId("abertura")).toHaveText("412 × 892");
  await expect(page.getByTestId("dpr")).toHaveText("2.625");
  await expect(page.getByTestId("orientacao")).toContainText("portrait");
  await expect(page.getByTestId("variacao-vertical")).toContainText(
    "largura 412 · altura 892 a 892",
  );
});

test("registra as variações da barra do Chrome sem alterar a leitura de abertura", async ({
  page,
}) => {
  await page.goto("/medir");
  await expect(page.getByTestId("abertura")).toHaveText("412 × 892");

  // Barra do Chrome recolhida: a altura útil aumenta.
  await page.setViewportSize({ width: 412, height: 940 });
  await expect(page.getByTestId("variacao-vertical")).toContainText(
    "altura 892 a 940 · barra do Chrome ≈ 48 px",
  );

  // Rotação para a horizontal.
  await page.setViewportSize({ width: 892, height: 412 });
  await expect(page.getByTestId("variacao-horizontal")).toContainText(
    "largura 892",
  );

  await expect(page.getByTestId("abertura")).toHaveText("412 × 892");
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
    innerWidth: 412,
    innerHeight: 892,
    devicePixelRatio: 2.625,
  });
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
