import { expect, test } from "@playwright/test";
import { PREVIEW_PORT } from "./servers";

/*
 * Página de medição (E9), no servidor que simula um preview da Vercel (VERCEL_ENV=preview).
 * O viewport de teste usa a referência inicial do Galaxy A15 (412 × 892 CSS px, densidade 2,625),
 * só para conferir que a página lê e mostra os valores; a área útil real vem do aparelho (E7).
 */
test.use({
  baseURL: `http://localhost:${PREVIEW_PORT}`,
  viewport: { width: 412, height: 892 },
  deviceScaleFactor: 2.625,
  isMobile: true,
  hasTouch: true,
});

test("no preview, /medir mostra a área útil e a densidade de pixels", async ({
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
});

test("a leitura de abertura não muda quando a área útil muda depois", async ({
  page,
}) => {
  await page.goto("/medir");
  await expect(page.getByTestId("abertura")).toHaveText("412 × 892");
  // Simula a barra do Chrome se recolhendo: a área útil aumenta.
  await page.setViewportSize({ width: 412, height: 940 });
  await expect(page.getByTestId("agora")).toContainText("412 × 940");
  await expect(page.getByTestId("abertura")).toHaveText("412 × 892");
});
