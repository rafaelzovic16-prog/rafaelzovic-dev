"use client";

import { useSyncExternalStore } from "react";

/*
 * Tamanho e altura de linha calculados pelo navegador para uma amostra tipográfica
 * (`data-type-sample`), atualizados ao redimensionar e quando as fontes terminam de carregar.
 * Mostra o valor real da escala fluida na largura atual, não o da especificação.
 */
function subscribe(onChange: () => void): () => void {
  window.addEventListener("resize", onChange);
  document.fonts?.addEventListener("loadingdone", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    document.fonts?.removeEventListener("loadingdone", onChange);
  };
}

export function LiveSize({ sample }: { sample: string }) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      const element = document.querySelector(`[data-type-sample="${sample}"]`);
      if (!element) return "—";
      const style = getComputedStyle(element);
      const size = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) / size;
      return `${Math.round(size * 10) / 10} px / ${Math.round(lineHeight * 100) / 100}`;
    },
    () => "—",
  );
  return <span data-testid={`tamanho-${sample}`}>agora: {value}</span>;
}
