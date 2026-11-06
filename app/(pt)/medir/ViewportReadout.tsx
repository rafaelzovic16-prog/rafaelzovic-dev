"use client";

import { useState, useSyncExternalStore } from "react";

/*
 * Diagnóstico de viewport do Galaxy A15 (E7, E9, E10), com as APIs nativas do navegador:
 * window.innerWidth/innerHeight, screen.width/height (e availWidth/availHeight),
 * window.devicePixelRatio, window.visualViewport e screen.orientation.
 *
 * - "Na abertura": primeira leitura no navegador, antes de qualquer rolagem — área útil com a
 *   barra de endereço do Chrome visível.
 * - "Variações": menor e maior altura observadas em cada orientação. No Chrome do Android a
 *   barra de endereço se recolhe ao rolar e a altura útil aumenta; a diferença estima a barra.
 * - "Interface na abertura": screen.height − innerHeight = barra de status e de navegação do
 *   Android + barra do Chrome, somadas.
 * O JSON copiado tem os campos usados para criar o perfil do aparelho no Playwright.
 */

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

function read(): Reading {
  const visual = window.visualViewport;
  const orientation = window.screen.orientation;
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
  };
}

/* Estado do diagnóstico, guardado como texto para que o React receba um valor estável. */
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
  return () => {
    window.removeEventListener("resize", handle);
    window.visualViewport?.removeEventListener("resize", handle);
    window.screen.orientation?.removeEventListener("change", handle);
  };
}

export function ViewportReadout() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const [copied, setCopied] = useState(false);

  if (!snapshot) return <p className="mt-6">Medindo…</p>;

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
    <div className="mt-6 space-y-5 font-mono">
      <section>
        <h2>Na abertura (barras do Chrome visíveis)</h2>
        <p className="text-3xl" data-testid="abertura">
          {abertura.innerWidth} × {abertura.innerHeight}
        </p>
        <p>
          Densidade de pixels:{" "}
          <span data-testid="dpr">{abertura.devicePixelRatio}</span>
        </p>
        <p data-testid="orientacao">
          Orientação:{" "}
          {abertura.orientation
            ? `${abertura.orientation.type} (${abertura.orientation.angle}°)`
            : "não informada pelo navegador"}
        </p>
        <p data-testid="tela">
          Tela: {abertura.screen.width} × {abertura.screen.height} · disponível:{" "}
          {abertura.screen.availWidth} × {abertura.screen.availHeight}
        </p>
        <p data-testid="interface">
          Interface do Chrome + Android:{" "}
          {abertura.screen.height - abertura.innerHeight} px de altura
        </p>
      </section>

      <section>
        <h2>Variações observadas</h2>
        {(["vertical", "horizontal"] as const).map((key) => {
          const variation = variacoes[key];
          if (!variation) return null;
          return (
            <p key={key} data-testid={`variacao-${key}`}>
              {key}: largura {variation.largura} · altura{" "}
              {variation.alturaMinima} a {variation.alturaMaxima} · barra do
              Chrome ≈ {variation.alturaMaxima - variation.alturaMinima} px
            </p>
          );
        })}
      </section>

      <section>
        <h2>Agora</h2>
        <p data-testid="agora">
          {atual.innerWidth} × {atual.innerHeight}
          {atual.visualViewport
            ? ` · área visível ${atual.visualViewport.width} × ${atual.visualViewport.height} · escala ${atual.visualViewport.scale}`
            : ""}
        </p>
      </section>

      <section>
        <button type="button" onClick={copy} className="border px-4 py-3">
          Copiar diagnóstico
        </button>
        <p role="status" className="mt-2">
          {copied ? "Copiado. Cole na conversa." : ""}
        </p>
        <details className="mt-2">
          <summary>Ver o diagnóstico completo</summary>
          <pre className="mt-2 overflow-x-auto text-xs" data-testid="json">
            {json}
          </pre>
        </details>
      </section>
    </div>
  );
}
