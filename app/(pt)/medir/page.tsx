import type { Metadata } from "next";
import { ViewportReadout } from "./ViewportReadout";

/*
 * Ferramenta interna de validação, autorizada por Rafa (E9, E10): diagnóstico de viewport do
 * Galaxy A15 no Chrome (E7), com as APIs nativas do navegador. O proxy só a libera em previews
 * da Vercel; em produção, /medir é 404. Não é a página /specimen, que continua na Fase 2.
 * Não tem a identidade visual do site: só precisa ser legível no celular.
 */
export const metadata: Metadata = {
  title: "Diagnóstico de viewport · Rafa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="p-5">
      <h1 className="text-xl">Diagnóstico de viewport</h1>
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        <li>
          Abra no Chrome do Galaxy A15, na vertical, e não role: o primeiro
          bloco registra a área com as barras visíveis.
        </li>
        <li>
          Depois, role até o fim da página, para a barra do Chrome se recolher.
        </li>
        <li>Se quiser, gire para a horizontal e volte.</li>
        <li>
          Toque em &quot;Copiar diagnóstico&quot; e envie na conversa, junto com
          o valor de Configurações → Tela → Zoom da tela.
        </li>
      </ol>
      <noscript>
        <p className="mt-6">
          Esta página precisa de JavaScript para ler as dimensões da tela.
        </p>
      </noscript>
      <ViewportReadout />
      {/* Espaço para rolar: é a rolagem que faz o Chrome recolher a barra de endereço. */}
      <div className="h-screen" aria-hidden="true" />
      <p className="pb-10">
        Fim da página. Agora toque em &quot;Copiar diagnóstico&quot; acima.
      </p>
    </main>
  );
}
