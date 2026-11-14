import Link from "next/link";
import { IndexLink } from "@/components/primitives/IndexLink";
import { Surface } from "@/components/primitives/Surface";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, sectionHref } from "@/i18n/routes";
import { LanguageSwitch } from "./LanguageSwitch";

/**
 * Rodapé (DESIGN-SPEC §9.9): RAFA · Menos ruído. Mais intenção. · © ano · PT/EN · Topo ↑.
 * Sobre Charcoal, continuando o bloco escuro da home. Repete os links do menu (ARCHITECTURE §9),
 * para que a navegação exista também sem abrir o menu.
 */
export function SiteFooter({
  locale,
  alternateHref,
}: {
  locale: Locale;
  alternateHref: string;
}) {
  const t = getDictionary(locale);
  const links = [
    { href: homePath(locale), label: t.nav.home },
    { href: sectionHref(locale, "projects"), label: t.nav.projects },
    { href: sectionHref(locale, "about"), label: t.nav.about },
    { href: sectionHref(locale, "contact"), label: t.nav.contact },
  ];

  return (
    <Surface tone="dark">
      <footer className="container-editorial border-rule type-meta grid-editorial gap-y-6 border-t py-10">
        <p className="col-span-4 md:col-span-3 lg:col-span-4">
          <span className="font-display text-base font-semibold tracking-wide">
            RAFA
          </span>
          <span className="text-text-muted block">{t.hero.signature}</span>
        </p>
        <nav
          aria-label={t.nav.footerLabel}
          className="col-span-4 md:col-span-5 lg:col-span-5"
        >
          <ul className="flex flex-wrap gap-x-6">
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
        <div className="col-span-4 flex flex-wrap items-center gap-x-6 md:col-span-8 lg:col-span-3 lg:justify-end">
          <span className="text-text-muted">© {new Date().getFullYear()}</span>
          <LanguageSwitch
            locale={locale}
            alternateHref={alternateHref}
            other={otherLocale(locale)}
          />
          <IndexLink href="#topo" arrow="up" className="min-h-12">
            {t.footer.top}
          </IndexLink>
        </div>
      </footer>
    </Surface>
  );
}
