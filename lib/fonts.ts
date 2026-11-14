import localFont from "next/font/local";

/*
 * Fontes versionadas no repositório (decisão T2): nem o build nem o navegador do visitante
 * dependem de serviços externos. Os arquivos em assets/fonts/ são gerados por
 * scripts/build-fonts.sh a partir do repositório oficial google/fonts (licença OFL),
 * com os caracteres "latin" e "latin-ext" e só os pesos da especificação (DESIGN-SPEC §4).
 */
const manrope = localFont({
  src: [
    { path: "../assets/fonts/manrope/Manrope-500.woff2", weight: "500" },
    { path: "../assets/fonts/manrope/Manrope-600.woff2", weight: "600" },
  ],
  variable: "--font-manrope",
});

const inter = localFont({
  src: [
    { path: "../assets/fonts/inter/Inter-400.woff2", weight: "400" },
    { path: "../assets/fonts/inter/Inter-500.woff2", weight: "500" },
  ],
  variable: "--font-inter",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../assets/fonts/jetbrains-mono/JetBrainsMono-400.woff2",
      weight: "400",
    },
  ],
  variable: "--font-jetbrains-mono",
});

/** Classes que expõem as fontes como variáveis CSS no elemento <html>. */
export const fontVariables = [
  manrope.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");
