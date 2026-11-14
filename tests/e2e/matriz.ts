/*
 * Matriz responsiva do projeto (VALIDATION §4; E12, E15): larguras de referência de celulares,
 * tablets, notebooks e desktops, em pixels CSS. O Galaxy A15 entra com os valores medidos no
 * aparelho (E11, E15): 400 × 766 na vertical e, na horizontal, 837 × 299 (barras visíveis) e
 * 837 × 355 (leitura enviada em 2026-11-13, dentro da faixa de 299 a 370 medida em E11).
 * A altura de 360 × 800 é só uma altura de referência para essa largura, não um aparelho.
 */
export const matrix = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 548 },
  { width: 390, height: 844 },
  { width: 400, height: 766 },
  { width: 412, height: 708 },
  { width: 768, height: 1024 },
  { width: 837, height: 299 },
  { width: 837, height: 355 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;
