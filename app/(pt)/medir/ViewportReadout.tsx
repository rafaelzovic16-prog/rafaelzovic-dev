"use client";

import { useSyncExternalStore } from "react";

/*
 * Leitura do viewport para a medição do Galaxy A15 (E7, E9).
 * "Na abertura" registra a primeira leitura feita no navegador, antes de qualquer rolagem:
 * é a área útil com a barra de endereço do Chrome visível. "Agora" acompanha mudanças
 * (rolagem que recolhe a barra, rotação da tela).
 */

type Reading = {
  width: number;
  height: number;
  dpr: number;
  visualWidth: number;
  visualHeight: number;
  screenWidth: number;
  screenHeight: number;
};

function read(): string {
  const visual = window.visualViewport;
  return JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
    visualWidth: Math.round(visual?.width ?? window.innerWidth),
    visualHeight: Math.round(visual?.height ?? window.innerHeight),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  } satisfies Reading);
}

let firstReading: string | null = null;

function getSnapshot(): string {
  const current = read();
  firstReading ??= current;
  return current;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("resize", onChange);
  window.visualViewport?.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    window.visualViewport?.removeEventListener("resize", onChange);
  };
}

export function ViewportReadout() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => "");
  if (!current || !firstReading) {
    return <p>Medindo…</p>;
  }

  const first = JSON.parse(firstReading) as Reading;
  const now = JSON.parse(current) as Reading;

  return (
    <dl className="mt-6 space-y-4 font-mono">
      <div>
        <dt>Na abertura (barras do Chrome visíveis)</dt>
        <dd className="text-3xl" data-testid="abertura">
          {first.width} × {first.height}
        </dd>
        <dd>
          Densidade de pixels: <span data-testid="dpr">{first.dpr}</span>
        </dd>
      </div>
      <div>
        <dt>Agora</dt>
        <dd data-testid="agora">
          {now.width} × {now.height} (área visível {now.visualWidth} ×{" "}
          {now.visualHeight})
        </dd>
      </div>
      <div>
        <dt>Tela inteira</dt>
        <dd data-testid="tela">
          {now.screenWidth} × {now.screenHeight}
        </dd>
      </div>
    </dl>
  );
}
