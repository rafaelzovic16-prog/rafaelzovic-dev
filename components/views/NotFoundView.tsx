import { SiteFooter } from "@/components/layout/SiteFooter";
import { contentId, SiteHeader } from "@/components/layout/SiteHeader";
import { IndexLink } from "@/components/primitives/IndexLink";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, sectionHref } from "@/i18n/routes";

/**
 * Página "não encontrada" de cada idioma (DESIGN-SPEC §11): mesma estrutura do site, mensagem
 * curta no estilo `h2` (é o único título da página, por isso um H1), link para a home e para
 * os projetos.
 */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={homePath(otherLocale(locale))}
      />
      <main
        id={contentId[locale]}
        className="container-editorial pt-16 pb-32 md:pt-28 md:pb-48"
      >
        <h1 className="type-h2">{t.notFound.title}</h1>
        <ul className="type-body mt-10 space-y-2">
          <li>
            <IndexLink
              href={homePath(locale)}
              arrow="right"
              className="min-h-12"
            >
              {t.notFound.home}
            </IndexLink>
          </li>
          <li>
            <IndexLink
              href={sectionHref(locale, "projects")}
              arrow="right"
              className="min-h-12"
            >
              {t.notFound.projects}
            </IndexLink>
          </li>
        </ul>
      </main>
      <SiteFooter
        locale={locale}
        alternateHref={homePath(otherLocale(locale))}
      />
    </>
  );
}
