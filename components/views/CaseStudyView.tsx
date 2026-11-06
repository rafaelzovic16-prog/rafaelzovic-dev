import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Project } from "@/content/projects";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectPath, sectionHref } from "@/i18n/routes";

/** Estrutura do estudo de caso (Fase 1). O conteúdo real, com evidências, entra na Fase 4. */
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
      <main>
        <p>
          <Link href={sectionHref(locale, "projects")}>
            <span aria-hidden="true">← </span>
            {t.caseStudy.back}
          </Link>
        </p>
        <p>{t.caseStudy.label}</p>
        <h1>{project.name}</h1>
        <p>{t.caseStudy.pending}</p>
      </main>
    </>
  );
}
