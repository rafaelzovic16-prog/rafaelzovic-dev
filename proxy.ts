import { NextResponse, type NextRequest } from "next/server";
import { knownPaths, localeOfPath, notFoundPaths } from "@/i18n/routes";
import { previewOnlyPaths, previewToolsEnabled } from "@/lib/site";

/**
 * Endereços desconhecidos recebem a página "não encontrada" do idioma da URL,
 * com status 404 e HTML completo gerado no servidor.
 *
 * Por que um proxy: no Next 16, `notFound()` chamado durante uma renderização sob demanda
 * entrega um HTML vazio que só é preenchido com JavaScript, e com dois layouts raiz não existe
 * uma página 404 estática por idioma. Detalhes e alternativas em docs/FASE-1.md.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (knownPaths.has(pathname)) return NextResponse.next();
  // Ferramentas internas (ex.: /medir): só em preview; em produção viram 404 como qualquer outro endereço.
  if (previewOnlyPaths.has(pathname) && previewToolsEnabled()) {
    return NextResponse.next();
  }

  // `nextUrl.clone()` mantém o endereço interno do servidor; montar a URL a partir de
  // `request.url` pode apontar para outro host e transformar a reescrita em requisição externa.
  const notFoundPage = request.nextUrl.clone();
  notFoundPage.pathname = notFoundPaths[localeOfPath(pathname)];
  notFoundPage.search = "";
  return NextResponse.rewrite(notFoundPage, { status: 404 });
}

export const config = {
  // Ficam de fora os arquivos internos do Next e qualquer endereço com extensão
  // (robots.txt, imagens, ícones), que o próprio Next serve ou responde.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
