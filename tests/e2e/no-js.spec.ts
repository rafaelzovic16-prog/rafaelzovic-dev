import { expect, test } from "@playwright/test";
import { htmlLang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { publicPages, unknownPaths } from "./pages";

/* Briefing §12 e guardrail 9: o conteúdo essencial não depende de JavaScript. */
test.use({ javaScriptEnabled: false });

test.describe("sem JavaScript", () => {
  for (const page of publicPages) {
    test(`${page.path} mostra o H1 e a navegação`, async ({
      page: browser,
    }) => {
      await browser.goto(page.path);
      await expect(browser.locator("h1")).toHaveText(page.h1);
      await expect(browser.locator("header nav a")).toHaveCount(4);
    });
  }

  for (const [path, locale] of unknownPaths) {
    test(`${path} mostra a página 404 completa`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        htmlLang[locale],
      );
      await expect(page.locator("h1")).toHaveText(
        dictionaries[locale].notFound.title,
      );
    });
  }

  test("a navegação entre home, estudo de caso e idioma funciona", async ({
    page,
  }) => {
    await page.goto("/");
    // O nome do projeto também aparece no registro técnico; o link do bloco do projeto é o título.
    await page
      .locator("main article")
      .getByRole("link", { name: "SaldoZen" })
      .click();
    await expect(page).toHaveURL("/projetos/saldozen");
    await expect(page.locator("h1")).toHaveText("SaldoZen");

    await page.locator("header a[hreflang]").click();
    await expect(page).toHaveURL("/en/projects/saldozen");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
