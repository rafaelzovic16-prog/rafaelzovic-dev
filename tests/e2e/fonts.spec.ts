import { expect, test } from "@playwright/test";

/* As três famílias, nos pesos da especificação, carregam do próprio site (DESIGN-SPEC §4). */
const fonts = [
  ["--font-manrope", "Manrope", "500"],
  ["--font-manrope", "Manrope", "600"],
  ["--font-inter", "Inter", "400"],
  ["--font-inter", "Inter", "500"],
  ["--font-jetbrains-mono", "JetBrains Mono", "400"],
] as const;

test("as fontes carregam sem requisições a outros domínios", async ({
  page,
  baseURL,
}) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(baseURL ?? "").origin) {
      externalRequests.push(request.url());
    }
  });

  await page.goto("/");

  const results = await page.evaluate(async (specs) => {
    const root = getComputedStyle(document.documentElement);
    const loaded: string[] = [];
    for (const [variable, name, weight] of specs) {
      // A variável lista a fonte e sua substituta métrica ("Manrope", "Manrope Fallback").
      // Só a primeira interessa: a substituta aponta para uma fonte local do sistema.
      const family = root.getPropertyValue(variable).split(",")[0]!.trim();
      const faces = await document.fonts.load(`${weight} 16px ${family}`);
      const ok = faces.some(
        (face) =>
          face.family.replace(/["']/g, "") === name && face.status === "loaded",
      );
      if (ok) loaded.push(`${name} ${weight}`);
    }
    return loaded;
  }, fonts);

  expect(results).toEqual(fonts.map(([, name, weight]) => `${name} ${weight}`));
  expect(externalRequests).toEqual([]);
});
