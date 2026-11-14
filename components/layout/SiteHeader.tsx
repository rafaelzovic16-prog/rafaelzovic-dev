import Link from "next/link";
import { MobileMenu } from "@/components/enhance/MobileMenu";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, sectionHref } from "@/i18n/routes";
import { LanguageSwitch } from "./LanguageSwitch";

/** Destino do "Pular para o conteúdo": o <main> de cada página. */
export const contentId = { pt: "conteudo", en: "content" } as const;

/**
 * Cabeçalho (DESIGN-SPEC §8, §9.2, §9.3; D9): assinatura, navegação sem numeração e PT / EN.
 * Desktop e tablet: 72 px, links no centro. Mobile: 56 px, PT/EN e o botão "Menu", que abre a
 * sobreposição. O menu fica fora do <header> (camada superior do navegador).
 * Item ativo e esconder ao rolar dependem da rolagem: entram com os movimentos (Fase 6).
 */
export function SiteHeader({
  locale,
  alternateHref,
}: {
  locale: Locale;
  alternateHref: string;
}) {
  const t = getDictionary(locale);
  const menuId = "menu";
  const links = [
    { href: homePath(locale), label: t.nav.home },
    { href: sectionHref(locale, "projects"), label: t.nav.projects },
    { href: sectionHref(locale, "about"), label: t.nav.about },
    { href: sectionHref(locale, "contact"), label: t.nav.contact },
  ];
  const language = (
    <LanguageSwitch
      locale={locale}
      alternateHref={alternateHref}
      other={otherLocale(locale)}
    />
  );

  return (
    <>
      <a
        href={`#${contentId[locale]}`}
        className="type-body-sm bg-surface sr-only rounded focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3"
      >
        {t.skipLink}
      </a>
      <header
        id="topo"
        className="container-editorial flex h-14 items-center justify-between md:h-18"
      >
        <Link
          href={homePath(locale)}
          className="interactive font-display inline-flex min-h-12 items-center font-semibold tracking-wide"
        >
          <span className="link-underline">RAFA</span>
        </Link>
        <nav aria-label={t.nav.label} className="hidden md:block">
          <ul className="type-body-sm flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="interactive inline-flex min-h-12 items-center"
                >
                  <span className="link-underline">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {language}
          <button
            type="button"
            popoverTarget={menuId}
            className="interactive type-body-sm min-h-12 px-2 md:hidden"
          >
            <span className="link-underline">{t.nav.menu}</span>
          </button>
        </div>
      </header>
      <MobileMenu
        id={menuId}
        label={t.nav.menu}
        closeLabel={t.nav.close}
        links={links}
        language={language}
      />
    </>
  );
}
