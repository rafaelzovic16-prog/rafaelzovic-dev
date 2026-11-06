import { htmlLang, type Locale } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";

/** Documento HTML compartilhado pelos dois layouts raiz (um por idioma). */
export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang[locale]} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
