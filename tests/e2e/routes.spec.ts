import { expect, test } from "@playwright/test";
import { htmlLang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { publicPages, unknownPaths } from "./pages";

test.describe("páginas públicas", () => {
  for (const page of publicPages) {
    test(`${page.path} responde 200 com lang, H1 e título corretos`, async ({
      page: browser,
    }) => {
      const response = await browser.goto(page.path);
      expect(response?.status()).toBe(200);
      await expect(browser.locator("html")).toHaveAttribute("lang", page.lang);
      await expect(browser.locator("h1")).toHaveCount(1);
      await expect(browser.locator("h1")).toHaveText(page.h1);
      await expect(browser).toHaveTitle(page.title);
    });

    test(`${page.path} aponta o seletor de idioma para a página equivalente`, async ({
      page: browser,
    }) => {
      await browser.goto(page.path);
      await expect(browser.locator("header a[hreflang]")).toHaveAttribute(
        "href",
        page.alternate,
      );
    });
  }
});

test.describe("endereços desconhecidos", () => {
  for (const [path, locale] of unknownPaths) {
    test(`${path} responde 404 com a página do idioma ${locale}`, async ({
      page,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        htmlLang[locale],
      );
      await expect(page.locator("h1")).toHaveText(
        dictionaries[locale].notFound.title,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    });
  }
});

test.describe("redirecionamentos permanentes", () => {
  for (const [source, destination] of [
    ["/pt", "/"],
    ["/pt/projetos/saldozen", "/projetos/saldozen"],
    ["/projetos", "/#projetos"],
    ["/en/projects", "/en#projects"],
    ["/projetos/saldozen/", "/projetos/saldozen"],
    ["/en/", "/en"],
  ] as const) {
    test(`${source} → ${destination}`, async ({ request, baseURL }) => {
      const response = await request.get(source, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      const location = new URL(response.headers().location ?? "", baseURL);
      expect(location.pathname + location.hash).toBe(destination);
    });
  }
});

test("robots.txt bloqueia a indexação antes da publicação", async ({
  request,
  page,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(await response.text()).toMatch(/Disallow: \/\s/);

  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
