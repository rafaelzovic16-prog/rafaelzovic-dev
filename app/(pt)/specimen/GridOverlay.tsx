"use client";

import { useState } from "react";
import { columnVisibility } from "./columns";

/*
 * Sobreposição do grid editorial (Fase 2): mostra as colunas do container sobre a página
 * inteira, para conferir o alinhamento. Ferramenta do /specimen; não existe no site.
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
          className="pointer-events-none fixed inset-0 z-50"
        >
          <div className="container-editorial grid-editorial h-full">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={`bg-text/6 border-text/20 h-full border-x ${columnVisibility(index)}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
