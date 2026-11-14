"use client";

import { useState, useSyncExternalStore } from "react";

/*
 * Diagnóstico de viewport (E7, E9, E10, E12), com as APIs nativas do navegador:
 * window.innerWidth/innerHeight, screen (e availWidth/availHeight), devicePixelRatio,
 * visualViewport e screen.orientation, mais o que o próprio CSS do site informa:
 * faixa (breakpoint) ativa, largura útil do conteúdo, grid e as dimensões dos elementos
 * marcados com data-measure.
 *
 * - "Na abertura": primeira leitura, antes de qualquer rolagem — área útil com a barra do
 *   Chrome visível. Não muda depois.
 * - "Variações": menor e maior altura em cada orientação (a rolagem recolhe a barra do Chrome).
 * O JSON copiado tem os campos usados para criar perfis de aparelho no Playwright.
 */

type Element = {
  nome: string;
  largura: number;
  altura: number;
  topo: number;
  base: number;
};

type Reading = {
  innerWidth: number;
  innerHeight: number;
  devicePixelRatio: number;
  screen: {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
  };
  visualViewport: {
    width: number;
    height: number;
    scale: number;
    offsetTop: number;
  } | null;
  orientation: { type: string; angle: number } | null;
  breakpoint: string;
  conteudo: number | null;
  grade: { colunas: number; coluna: number; intervalo: number } | null;
  elementos: Element[];
};

type Variation = {
  largura: number;
  alturaMinima: number;
  alturaMaxima: number;
};

type Diagnostic = {
  abertura: Reading;
  atual: Reading;
  variacoes: Partial<Record<"vertical" | "horizontal", Variation>>;
  userAgent: string;
};

const round = (value: number) => Math.round(value * 10) / 10;

function readGrid(): Reading["grade"] {
  const grid = document.querySelector<HTMLElement>("[data-measure-grid]");
  if (!grid) return null;
  const style = getComputedStyle(grid);
  const columns = style.gridTemplateColumns.split(" ").filter(Boolean);
  return {
    colunas: columns.length,
    coluna: round(parseFloat(columns[0] ?? "0")),
    intervalo: round(parseFloat(style.columnGap)),
  };
}

function readElements(): Element[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("[data-measure]"),
  ).map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      nome: element.dataset.measure ?? "",
      largura: round(rect.width),
      altura: round(rect.height),
      topo: round(rect.top + window.scrollY),
      base: round(rect.bottom + window.scrollY),
    };
  });
}

function read(): Reading {
  const visual = window.visualViewport;
  const orientation = window.screen.orientation;
  const content = document.querySelector<HTMLElement>("[data-measure-content]");
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    },
    visualViewport: visual
      ? {
          width: Math.round(visual.width),
          height: Math.round(visual.height),
          scale: visual.scale,
          offsetTop: Math.round(visual.offsetTop),
        }
      : null,
    orientation: orientation
      ? { type: orientation.type, angle: orientation.angle }
      : null,
    breakpoint: getComputedStyle(document.documentElement)
      .getPropertyValue("--bp")
      .replace(/["']/g, "")
      .trim(),
    conteudo: content ? round(content.getBoundingClientRect().width) : null,
    grade: readGrid(),
    elementos: readElements(),
  };
}

/* Estado guardado como texto para que o React receba um valor estável. */
let state: string | null = null;

function update(): void {
  const reading = read();
  const diagnostic: Diagnostic = state
    ? (JSON.parse(state) as Diagnostic)
    : {
        abertura: reading,
        atual: reading,
        variacoes: {},
        userAgent: navigator.userAgent,
      };
  diagnostic.atual = reading;

  const key =
    reading.innerWidth > reading.innerHeight ? "horizontal" : "vertical";
  const previous = diagnostic.variacoes[key];
  diagnostic.variacoes[key] = {
    largura: reading.innerWidth,
    alturaMinima: Math.min(
      previous?.alturaMinima ?? reading.innerHeight,
      reading.innerHeight,
    ),
    alturaMaxima: Math.max(
      previous?.alturaMaxima ?? reading.innerHeight,
      reading.innerHeight,
    ),
  };
  state = JSON.stringify(diagnostic);
}

function getSnapshot(): string {
  if (state === null) update();
  return state ?? "";
}

function subscribe(onChange: () => void): () => void {
  const handle = () => {
    update();
    onChange();
  };
  window.addEventListener("resize", handle);
  window.visualViewport?.addEventListener("resize", handle);
  window.screen.orientation?.addEventListener("change", handle);
  // As fontes mudam a altura dos elementos quando terminam de carregar.
  document.fonts?.addEventListener("loadingdone", handle);
  void document.fonts?.ready.then(handle);
  return () => {
    window.removeEventListener("resize", handle);
    window.visualViewport?.removeEventListener("resize", handle);
    window.screen.orientation?.removeEventListener("change", handle);
    document.fonts?.removeEventListener("loadingdone", handle);
  };
}

export function ViewportDiagnostic() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const [copied, setCopied] = useState(false);

  if (!snapshot) {
    return (
      <p className="type-body-sm mt-6">
        Medindo… (esta ferramenta precisa de JavaScript para ler as dimensões da
        tela)
      </p>
    );
  }

  const diagnostic = JSON.parse(snapshot) as Diagnostic;
  const { abertura, atual, variacoes } = diagnostic;
  const json = JSON.stringify(diagnostic, null, 2);

  async function copy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="type-meta mt-8 space-y-8">
      <dl className="grid-editorial gap-y-6">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <dt className="text-text-muted">
            Na abertura (barras do Chrome visíveis)
          </dt>
          <dd className="type-h3 mt-2" data-testid="abertura">
            {abertura.innerWidth} × {abertura.innerHeight}
          </dd>
          <dd className="mt-1">
            Densidade de pixels:{" "}
            <span data-testid="dpr">
              {/* Arredondado na tela; o JSON guarda o valor exato informado. */}
              {Math.round(abertura.devicePixelRatio * 1000) / 1000}
            </span>
          </dd>
          <dd data-testid="orientacao">
            Orientação:{" "}
            {abertura.orientation
              ? `${abertura.orientation.type} (${abertura.orientation.angle}°)`
              : "não informada pelo navegador"}
          </dd>
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <dt className="text-text-muted">Layout do site agora</dt>
          <dd className="mt-2" data-testid="breakpoint">
            Faixa ativa: {atual.breakpoint}
          </dd>
          <dd data-testid="conteudo">
            Largura útil do conteúdo: {atual.conteudo ?? "—"} px
          </dd>
          <dd data-testid="grade">
            Grid:{" "}
            {atual.grade
              ? `${atual.grade.colunas} colunas de ${atual.grade.coluna} px, intervalo de ${atual.grade.intervalo} px`
              : "—"}
          </dd>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <dt className="text-text-muted">Tela e área visível</dt>
          <dd className="mt-2" data-testid="tela">
            Tela: {abertura.screen.width} × {abertura.screen.height} ·
            disponível: {abertura.screen.availWidth} ×{" "}
            {abertura.screen.availHeight}
          </dd>
          <dd data-testid="interface">
            Interface do Chrome + Android na abertura:{" "}
            {abertura.screen.height - abertura.innerHeight} px de altura
          </dd>
          <dd data-testid="agora">
            Agora: {atual.innerWidth} × {atual.innerHeight}
            {atual.visualViewport
              ? ` · área visível ${atual.visualViewport.width} × ${atual.visualViewport.height} · escala ${atual.visualViewport.scale}`
              : ""}
          </dd>
        </div>
      </dl>

      <div>
        <p className="text-text-muted">Variações observadas</p>
        {(["vertical", "horizontal"] as const).map((key) => {
          const variation = variacoes[key];
          if (!variation) return null;
          return (
            <p key={key} className="mt-1" data-testid={`variacao-${key}`}>
              {key}: largura {variation.largura} · altura{" "}
              {variation.alturaMinima} a {variation.alturaMaxima} · barra do
              Chrome ≈ {variation.alturaMaxima - variation.alturaMinima} px
            </p>
          );
        })}
      </div>

      <div>
        <p className="text-text-muted">
          Elementos principais desta página (agora)
        </p>
        <ul className="mt-1 space-y-1" data-testid="elementos">
          {atual.elementos.map((element) => (
            <li key={element.nome}>
              {element.nome}: {element.largura} × {element.altura} · do topo da
              página: {element.topo} a {element.base}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          type="button"
          onClick={copy}
          className="interactive type-body-sm min-h-12 rounded border border-text px-6"
        >
          <span className="link-underline">Copiar diagnóstico</span>
        </button>
        <p role="status" className="mt-2">
          {copied ? "Copiado. Cole na conversa." : ""}
        </p>
        <details className="mt-2">
          <summary className="min-h-12 cursor-pointer py-3">
            Ver o diagnóstico completo
          </summary>
          {/*
           * Área com rolagem própria: focável e nomeada para que o teclado também consiga
           * rolar o JSON quando ele for mais largo que a tela (WCAG 2.1.1; defeito D1, E15).
           */}
          <pre
            className="mt-2 overflow-x-auto"
            data-testid="json"
            tabIndex={0}
            role="region"
            aria-label="Diagnóstico completo em JSON"
          >
            {json}
          </pre>
        </details>
      </div>
    </div>
  );
}
