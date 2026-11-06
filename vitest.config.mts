import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Resolve o alias "@/" definido no tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    // Os testes unitários validam dados (rotas, idiomas, conteúdo); a interface é testada
    // no navegador real pelo Playwright. Por isso não há simulação de DOM (A5).
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
