import measured from "./devices/galaxy-a15-chrome.json";

/*
 * Perfis do Galaxy A15 de Rafa no Chrome (E7, E10, E11), montados só com os valores medidos
 * no aparelho pela página /medir (hoje parte do /specimen). Nenhum número aqui é estimado.
 *
 * - Barras visíveis: leitura de abertura, a mais restritiva na vertical; referência para a
 *   primeira dobra (Fase 3).
 * - Barra recolhida: maior altura observada na vertical, depois de rolar.
 * - Horizontal: leitura com as barras visíveis na horizontal.
 */
const { abertura, variacoes, userAgent } = measured.diagnostico;

// O navegador informa 2.700000047683716 (precisão de ponto flutuante); a densidade é 2,7.
const deviceScaleFactor = Math.round(abertura.devicePixelRatio * 1000) / 1000;

const common = {
  browserName: "chromium" as const,
  userAgent,
  deviceScaleFactor,
  isMobile: true,
  hasTouch: true,
};

const portraitScreen = {
  width: abertura.screen.width,
  height: abertura.screen.height,
};

export const galaxyA15Chrome = {
  barrasVisiveis: {
    ...common,
    viewport: { width: abertura.innerWidth, height: abertura.innerHeight },
    screen: portraitScreen,
  },
  barraRecolhida: {
    ...common,
    viewport: {
      width: variacoes.vertical.largura,
      height: variacoes.vertical.alturaMaxima,
    },
    screen: portraitScreen,
  },
  horizontal: {
    ...common,
    viewport: {
      width: variacoes.horizontal.largura,
      height: variacoes.horizontal.alturaMinima,
    },
    screen: { width: portraitScreen.height, height: portraitScreen.width },
  },
};
