import { htmlLang, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * PT / EN (DESIGN-SPEC §12): o idioma atual em `text`, o outro em `text-muted`, com hover e
 * foco. Leva à página equivalente do outro idioma; preservar a seção ativa é da Fase 5.
 * Link comum (não <Link>): trocar de idioma troca o layout raiz e recarrega a página.
 */
export function LanguageSwitch({
  locale,
  alternateHref,
  other,
}: {
  locale: Locale;
  alternateHref: string;
  other: Locale;
}) {
  const t = getDictionary(locale);
  return (
    <p className="type-body-sm flex items-center gap-1">
      <span className="sr-only">{t.language.label}: </span>
      <span aria-current="true">{t.language.current}</span>
      <span aria-hidden="true">/</span>
      <a
        href={alternateHref}
        hrefLang={htmlLang[other]}
        lang={htmlLang[other]}
        className="interactive text-text-muted inline-flex min-h-12 items-center px-1"
      >
        <span aria-hidden="true" className="link-underline">
          {t.language.other}
        </span>
        <span className="sr-only">{t.language.otherName}</span>
      </a>
    </p>
  );
}
