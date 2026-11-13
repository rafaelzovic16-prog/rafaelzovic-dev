import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/*
 * Publicação de produção só com autorização expressa de Rafa (G2, guardrail 7, E13; T6).
 * Um merge na `main` não gera publicação na Vercel; as outras branches continuam gerando
 * previews protegidos. Na Fase 7, com a autorização registrada, o vercel.json e este teste
 * mudam juntos.
 */
describe("publicação na Vercel (T6)", () => {
  it("só a main tem a publicação automática desligada", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
      git?: { deploymentEnabled?: unknown };
    };
    expect(config.git?.deploymentEnabled).toEqual({ main: false });
  });
});
