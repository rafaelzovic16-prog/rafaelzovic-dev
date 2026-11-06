import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

/*
 * Os testes E2E rodam contra o build de produção: execute `npm run build` antes.
 * Fase 1: Chromium desktop. Os perfis mobile (Galaxy A15 de Rafa e iPhones em WebKit)
 * entram na Fase 3, junto com os testes de primeira dobra (docs/VALIDATION.md §3).
 */
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
  ],
  webServer: {
    // Sem --hostname: com o servidor preso a 127.0.0.1, o `next start` encaminha as reescritas
    // internas do proxy para um endereço em que não escuta, e a resposta 404 nunca chega.
    // Isso é específico do servidor próprio do Next; na Vercel as reescritas são da plataforma.
    command: `npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
