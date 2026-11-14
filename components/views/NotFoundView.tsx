import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, sectionHref } from "@/i18n/routes";

/** Página "não encontrada" de cada idioma (DESIGN-SPEC §11). */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={homePath(otherLocale(locale))}
      />
      <main>
        <h1>{t.notFound.title}</h1>
        <ul>
          <li>
            <Link href={homePath(locale)}>{t.notFound.home}</Link>
          </li>
          <li>
            <Link href={sectionHref(locale, "projects")}>
              {t.notFound.projects}
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
