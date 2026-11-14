import { expect, test } from "@playwright/test";

/*
 * As três famílias, nos pesos da especificação (DESIGN-SPEC §4), carregam dos arquivos
 * versionados em assets/fonts/ (decisão T2), servidos pelo próprio site.
 * [variável CSS, peso, arquivo de origem]
 */
const fonts = [
  ["--font-manrope", "500", "Manrope-500"],
  ["--font-manrope", "600", "Manrope-600"],
  ["--font-inter", "400", "Inter-400"],
  ["--font-inter", "500", "Inter-500"],
  ["--font-jetbrains-mono", "400", "JetBrainsMono-400"],
] as const;

test("as fontes locais carregam sem requisições a outros domínios", async ({
  page,
  baseURL,
}) => {
  const externalRequests: string[] = [];
  const fontFiles: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL ?? "").origin) {
      externalRequests.push(request.url());
    }
    if (request.resourceType() === "font") {
      fontFiles.push(url.pathname.split("/").pop() ?? "");
    }
  });

  await page.goto("/");

  const loaded = await page.evaluate(async (specs) => {
    const root = getComputedStyle(document.documentElement);
    const result: string[] = [];
    for (const [variable, weight] of specs) {
      // A variável lista a fonte e sua substituta métrica ("manrope", "manrope Fallback").
      // Só a primeira interessa: a substituta aponta para uma fonte do sistema.
      const family = root.getPropertyValue(variable).split(",")[0]!.trim();
      const faces = await document.fonts.load(`${weight} 16px ${family}`);
      const name = family.replace(/["']/g, "");
      if (
        faces.some((face) => face.family === name && face.status === "loaded")
      ) {
        result.push(`${variable} ${weight}`);
      }
    }
    return result;
  }, fonts);

  expect(loaded).toEqual(
    fonts.map(([variable, weight]) => `${variable} ${weight}`),
  );
  // O nome do arquivo servido pelo Next começa pelo nome do arquivo de origem (com "_" no lugar de "-").
  for (const [, , source] of fonts) {
    expect(
      fontFiles.some((file) => file.startsWith(source.replace("-", "_"))),
    ).toBe(true);
  }
  expect(externalRequests).toEqual([]);
});
