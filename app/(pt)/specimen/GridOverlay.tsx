"use client";

import { useState } from "react";
import { columnVisibility } from "./columns";

/*
 * Sobreposição do grid editorial (Fase 2): mostra as colunas do container sobre a página
 * inteira (posição absoluta sobre o <main>, para aparecer também nas capturas de página
 * inteira). Ferramenta do /specimen; não existe no site. Usa Sage translúcido porque precisa
 * ser visível nas duas superfícies; não é um dos usos de Sage do site (§3.3).
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
        className="interactive type-body-sm min-h-12 rounded border border-text px-6"
      >
        <span className="link-underline">
          {visible ? "Ocultar grid" : "Mostrar grid"}
        </span>
      </button>
      {visible ? (
        <div
          aria-hidden="true"
          data-testid="grid-overlay"
          className="pointer-events-none absolute inset-0 z-50"
        >
          <div className="container-editorial grid-editorial h-full">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={`bg-accent/10 border-accent/50 h-full border-x ${columnVisibility(index)}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
