import { Inter, JetBrains_Mono, Manrope } from "next/font/google";

/*
 * As fontes são baixadas no build e servidas pelo próprio site:
 * nenhuma requisição externa acontece no navegador do visitante.
 * Só os pesos da especificação (DESIGN-SPEC §4).
 */
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
});

/** Classes que expõem as fontes como variáveis CSS no elemento <html>. */
export const fontVariables = [
  manrope.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");
