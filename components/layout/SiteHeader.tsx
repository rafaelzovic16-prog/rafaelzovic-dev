import Link from "next/link";
import { htmlLang, otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, sectionHref } from "@/i18n/routes";

/**
 * Cabeçalho estrutural da Fase 1: assinatura, navegação (D9) e seletor de idioma.
 * O visual entra nas Fases 2 e 3. `alternateHref` é a página equivalente no outro idioma.
 */
export function SiteHeader({
  locale,
  alternateHref,
}: {
  locale: Locale;
  alternateHref: string;
}) {
  const t = getDictionary(locale);
  const other = otherLocale(locale);

  return (
    <header>
      <Link href={homePath(locale)}>RAFA</Link>
      <nav aria-label={t.nav.label}>
        <ul>
          <li>
            <Link href={homePath(locale)}>{t.nav.home}</Link>
          </li>
          <li>
            <Link href={sectionHref(locale, "projects")}>{t.nav.projects}</Link>
          </li>
          <li>
            <Link href={sectionHref(locale, "about")}>{t.nav.about}</Link>
          </li>
          <li>
            <Link href={sectionHref(locale, "contact")}>{t.nav.contact}</Link>
          </li>
        </ul>
      </nav>
      <p>
        <span className="sr-only">{t.language.label}: </span>
        <span aria-current="true">{t.language.current}</span>
        {" / "}
        {/* Link comum (não <Link>): trocar de idioma troca o layout raiz e recarrega a página. */}
        <a
          href={alternateHref}
          hrefLang={htmlLang[other]}
          lang={htmlLang[other]}
        >
          <span aria-hidden="true">{t.language.other}</span>
          <span className="sr-only">{t.language.otherName}</span>
        </a>
      </p>
    </header>
  );
}
