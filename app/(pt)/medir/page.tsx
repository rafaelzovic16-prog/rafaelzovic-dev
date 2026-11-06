import type { Metadata } from "next";
import { ViewportReadout } from "./ViewportReadout";

/*
 * Ferramenta interna de validação, autorizada por Rafa (E9): mede a área útil do Galaxy A15
 * no Chrome (E7). O proxy só a libera em previews da Vercel; em produção, /medir é 404.
 * Não tem a identidade visual do site: só precisa ser legível no celular.
 */
export const metadata: Metadata = {
  title: "Medição da área útil · Rafa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="p-5">
      <h1 className="text-xl">Medição da área útil</h1>
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        <li>
          Abra esta página no Chrome do Galaxy A15, com a tela na vertical.
        </li>
        <li>Não role a página antes de anotar.</li>
        <li>
          Envie os números de &quot;Na abertura&quot; e o valor de Configurações
          → Tela → Zoom da tela.
        </li>
      </ol>
      <noscript>
        <p className="mt-6">
          Esta página precisa de JavaScript para medir a tela.
        </p>
      </noscript>
      <ViewportReadout />
    </main>
  );
}
