import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";
import { otherLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { homePath, projectPath, sections, type Section } from "@/i18n/routes";

/**
 * Estrutura da home (Fase 1): hierarquia, âncoras e textos aprovados, sem visual.
 * A composição da especificação (DESIGN-SPEC §9) entra na Fase 3.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={homePath(otherLocale(locale))}
      />
      <main>
        <p>{t.hero.meta}</p>
        {/* D7: a frase conceitual é assinatura visual, não título. O H1 é o posicionamento. */}
        <p>{t.hero.signature}</p>
        <h1>{t.hero.position}</h1>

        <HomeSection
          locale={locale}
          section="projects"
          title={t.sections.projects}
        >
          <ol>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={projectPath(locale, project.slug)}>
                  {project.name}
                </Link>
              </li>
            ))}
          </ol>
        </HomeSection>
        <HomeSection locale={locale} section="about" title={t.sections.about} />
        <HomeSection
          locale={locale}
          section="capabilities"
          title={t.sections.capabilities}
        />
        <HomeSection
          locale={locale}
          section="contact"
          title={t.sections.contact}
        />
      </main>
    </>
  );
}

function HomeSection({
  locale,
  section,
  title,
  children,
}: {
  locale: Locale;
  section: Section;
  title: string;
  children?: React.ReactNode;
}) {
  const id = sections[section][locale];
  return (
    <section id={id} aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>{title}</h2>
      {children}
    </section>
  );
}
