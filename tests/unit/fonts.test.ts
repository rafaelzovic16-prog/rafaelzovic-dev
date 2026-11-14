import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");

/** Arquivos .ts/.tsx do código do site (fora de node_modules, .next e testes). */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

describe("fontes locais (decisão T2)", () => {
  it("nenhum código do site carrega fontes de serviço externo", () => {
    const files = ["app", "components", "lib", "i18n", "content"].flatMap(
      (dir) => sourceFiles(join(root, dir)),
    );
    const offenders = files.filter((file) =>
      /next\/font\/google|fonts\.(googleapis|gstatic)\.com/.test(
        readFileSync(file, "utf8"),
      ),
    );
    expect(offenders).toEqual([]);
  });

  it.each([
    "manrope/Manrope-500.woff2",
    "manrope/Manrope-600.woff2",
    "inter/Inter-400.woff2",
    "inter/Inter-500.woff2",
    "jetbrains-mono/JetBrainsMono-400.woff2",
    "manrope/OFL.txt",
    "inter/OFL.txt",
    "jetbrains-mono/OFL.txt",
  ])("o repositório contém assets/fonts/%s", (file) => {
    expect(existsSync(join(root, "assets", "fonts", file))).toBe(true);
  });
});
