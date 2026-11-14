import type { Page } from "@playwright/test";

/*
 * Verificações de layout e de teclado compartilhadas pelos testes do /specimen e da home.
 */

/*
 * Auditoria de layout executada no navegador. Ignora o que está dentro de uma área com rolagem
 * própria (o JSON do diagnóstico), e também essa própria área, cujo conteúdo é maior de
 * propósito. Tolera 4 px no transbordo de texto: é o deslocamento da seta no estado de hover,
 * fixado no /specimen por `data-state` (§6.2).
 */
export function auditLayout(ignore = "") {
  const viewport = document.documentElement.clientWidth;
  const describe = (element: Element) =>
    `${element.tagName.toLowerCase()} "${(element.textContent ?? "").trim().slice(0, 40)}"`;
  const insideScroller = (element: Element) => {
    for (
      let parent = element.parentElement;
      parent;
      parent = parent.parentElement
    ) {
      const overflow = getComputedStyle(parent).overflowX;
      if (overflow === "auto" || overflow === "scroll") return true;
    }
    return false;
  };

  const outside: string[] = [];
  const textOverflow: string[] = [];
  for (const element of document.body.querySelectorAll("*")) {
    const rect = element.getBoundingClientRect();
    // Elementos visualmente ocultos (`sr-only`, como o "Pular para o conteúdo") não contam.
    if (rect.width <= 1 || rect.height <= 1 || insideScroller(element))
      continue;
    // Exceção pedida pelo teste, com motivo registrado nele.
    if (ignore && element.closest(ignore)) continue;
    if (rect.right > viewport + 0.5 || rect.left < -0.5)
      outside.push(describe(element));
    const style = getComputedStyle(element);
    const scrolls = style.overflowX === "auto" || style.overflowX === "scroll";
    if (
      !scrolls &&
      style.display !== "inline" &&
      element.clientWidth > 0 &&
      element.scrollWidth > element.clientWidth + 4
    ) {
      textOverflow.push(describe(element));
    }
  }

  const interactive = [
    ...document.querySelectorAll("a[href], button, summary"),
  ].filter((element) => element.getBoundingClientRect().width > 0);
  const overlaps: string[] = [];
  interactive.forEach((a, i) => {
    const ra = a.getBoundingClientRect();
    interactive.slice(i + 1).forEach((b) => {
      const rb = b.getBoundingClientRect();
      const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      const y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (x > 1 && y > 1) overlaps.push(`${describe(a)} × ${describe(b)}`);
    });
  });

  // Botões e controles: alvo de toque de 48 px (§5). Links em texto: composição da Fase 3 (S7).
  const smallTargets = [
    ...document.querySelectorAll("button, summary, a.min-h-12"),
  ]
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      // Só os controles exibidos (o menu fechado e o botão "Menu" no desktop não contam).
      return rect.width > 0 && rect.height > 0 && rect.height < 48;
    })
    .map(describe);

  return {
    pageWidth: document.documentElement.scrollWidth,
    viewport,
    outside,
    textOverflow,
    overlaps,
    smallTargets,
  };
}

/**
 * Percorre a página com Tab e devolve, para cada foco, o nome, a posição, o contorno visível
 * (no próprio elemento ou, no bloco clicável dos projetos, no ::after) e se está na tela.
 */
export async function walkFocus(page: Page, count: number) {
  const visited: {
    name: string;
    top: number;
    left: number;
    outline: string;
    visible: boolean;
  }[] = [];
  for (let i = 0; i < count; i++) {
    await page.keyboard.press("Tab");
    visited.push(
      await page.evaluate(() => {
        const element = document.activeElement as HTMLElement;
        const stretched = element.classList.contains("stretched-link");
        const box = stretched
          ? (element.closest("article") ?? element)
          : element;
        const rect = box.getBoundingClientRect();
        const style = getComputedStyle(element, stretched ? "::after" : null);
        return {
          name: (element.textContent ?? "").trim().slice(0, 40),
          top: element.getBoundingClientRect().top + window.scrollY,
          left: element.getBoundingClientRect().left,
          outline: `${style.outlineStyle} ${style.outlineWidth}`,
          // Controles: inteiros na tela. Blocos de projeto (mais altos que a tela): visíveis.
          visible:
            rect.left >= 0 &&
            rect.right <= window.innerWidth &&
            (stretched
              ? rect.top < window.innerHeight && rect.bottom > 0
              : // Inclui o contorno de foco: 2 px a 3 px de distância do elemento. No topo
                // do documento a página não rola mais para cima: basta o elemento inteiro.
                (rect.top - 5 >= 0 ||
                  (window.scrollY === 0 && rect.top >= 0)) &&
                rect.bottom + 5 <= window.innerHeight),
        };
      }),
    );
  }
  return visited;
}
