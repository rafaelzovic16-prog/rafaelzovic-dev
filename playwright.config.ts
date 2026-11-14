import { defineConfig, devices } from "@playwright/test";
import { galaxyA15Chrome } from "./tests/e2e/devices";
import { PORT, PREVIEW_PORT } from "./tests/e2e/servers";

const baseURL = `http://localhost:${PORT}`;

/*
 * Os testes E2E rodam contra o build de produção: execute `npm run build` antes.
 * Projetos: Chromium desktop e o Galaxy A15 de Rafa no Chrome, com valores medidos no
 * aparelho (E11; docs/VALIDATION.md §3.3). Os perfis de iPhone em WebKit entram na Fase 3,
 * junto com os testes de primeira dobra.
 */

/* A página /medir tem perfil próprio no seu arquivo de teste; não precisa rodar em cada aparelho. */
const deviceProject = { testIgnore: /medir\.spec\.ts$/ };
export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "galaxy-a15-chrome",
      ...deviceProject,
      use: galaxyA15Chrome.barrasVisiveis,
    },
    {
      name: "galaxy-a15-chrome-barra-recolhida",
      ...deviceProject,
      use: galaxyA15Chrome.barraRecolhida,
    },
    {
      name: "galaxy-a15-chrome-horizontal",
      ...deviceProject,
      use: galaxyA15Chrome.horizontal,
    },
  ],
  // Sem --hostname: com o servidor preso a 127.0.0.1, o `next start` encaminha as reescritas
  // internas do proxy para um endereço em que não escuta, e a resposta 404 nunca chega.
  // Isso é específico do servidor próprio do Next; na Vercel as reescritas são da plataforma.
  webServer: [
    {
      // Como em produção: sem VERCEL_ENV, as ferramentas de preview ficam ocultas.
      command: `npm run start -- --port ${PORT}`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      command: `npm run start -- --port ${PREVIEW_PORT}`,
      url: `http://localhost:${PREVIEW_PORT}`,
      env: { VERCEL_ENV: "preview" },
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
