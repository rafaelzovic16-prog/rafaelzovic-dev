import { projects } from "@/content/projects";
import { htmlLang, locales, otherLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { homePath, projectPath } from "@/i18n/routes";

/** Todas as páginas públicas, com o que cada uma deve apresentar. */
export const publicPages = locales.flatMap((locale) => {
  const t = dictionaries[locale];
  const other = otherLocale(locale);
  return [
    {
      path: homePath(locale),
      lang: htmlLang[locale],
      h1: t.hero.position,
      title: t.meta.homeTitle,
      alternate: homePath(other),
    },
    ...projects.map((project) => ({
      path: projectPath(locale, project.slug),
      lang: htmlLang[locale],
      h1: project.name,
      title: t.meta.caseStudyTitle.replace("{project}", project.name),
      alternate: projectPath(other, project.slug),
    })),
  ];
});

/** Endereços desconhecidos e o idioma da página 404 que devem receber. */
export const unknownPaths = [
  ["/qualquer", "pt"],
  ["/a/b/c", "pt"],
  ["/projetos/inexistente", "pt"],
  ["/enx", "pt"],
  ["/pagina-nao-encontrada", "pt"],
  ["/en/qualquer", "en"],
  ["/en/a/b", "en"],
  ["/en/projects/inexistente", "en"],
  ["/en/page-not-found", "en"],
  // Ferramenta só de preview (E9, E12): fora do preview, é um endereço desconhecido.
  ["/specimen", "pt"],
  // Antiga página de medição, incorporada ao /specimen na Fase 2 (E12).
  ["/medir", "pt"],
] as const;
