import { SiteFooter } from "@/components/layout/SiteFooter";
import { contentId, SiteHeader } from "@/components/layout/SiteHeader";
import { IndexLink } from "@/components/primitives/IndexLink";
import type { Project } from "@/content/projects";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectPath, sectionHref } from "@/i18n/routes";

/**
 * Estrutura do estudo de caso. O conteúdo real, com evidências, e o layout da DESIGN-SPEC §10
 * entram na Fase 4; até lá, a página usa o cabeçalho, o rodapé e os tokens do site.
 */
export function CaseStudyView({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={projectPath(otherLocale(locale), project.slug)}
      />
      <main
        id={contentId[locale]}
        className="container-editorial pt-10 pb-32 md:pt-16 md:pb-48"
      >
        <p className="type-body-sm">
          <IndexLink
            href={sectionHref(locale, "projects")}
            arrow="right"
            className="min-h-12"
          >
            {t.caseStudy.back}
          </IndexLink>
        </p>
        <p className="type-label mt-10">{t.caseStudy.label}</p>
        <h1 className="type-display mt-4">{project.name}</h1>
        <p
          className="type-meta text-text-muted mt-10"
          data-pending={t.caseStudy.label}
        >
          {t.caseStudy.pending}
        </p>
      </main>
      <SiteFooter
        locale={locale}
        alternateHref={projectPath(otherLocale(locale), project.slug)}
      />
    </>
  );
}
