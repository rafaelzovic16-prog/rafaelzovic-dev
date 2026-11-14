import { projects } from "@/content/projects";
import { locales, type Locale } from "./config";

/** Âncoras das seções da home em cada idioma. */
export const sections = {
  projects: { pt: "projetos", en: "projects" },
  about: { pt: "sobre", en: "about" },
  capabilities: { pt: "competencias", en: "capabilities" },
  contact: { pt: "contato", en: "contact" },
} as const satisfies Record<string, Record<Locale, string>>;

export type Section = keyof typeof sections;

export function homePath(locale: Locale): string {
  return locale === "pt" ? "/" : "/en";
}

export function sectionHref(locale: Locale, section: Section): string {
  return `${homePath(locale)}#${sections[section][locale]}`;
}

export function projectPath(locale: Locale, slug: string): string {
  return locale === "pt" ? `/projetos/${slug}` : `/en/projects/${slug}`;
}

/**
 * Páginas "não encontrada" de cada idioma. O proxy as entrega, com status 404,
 * para qualquer endereço que não seja uma página conhecida.
 */
export const notFoundPaths = {
  pt: "/pagina-nao-encontrada",
  en: "/en/page-not-found",
} as const satisfies Record<Locale, string>;

/** Todas as páginas públicas, nos dois idiomas. */
export const knownPaths: ReadonlySet<string> = new Set(
  locales.flatMap((locale) => [
    homePath(locale),
    ...projects.map((project) => projectPath(locale, project.slug)),
  ]),
);

/** Idioma de um endereço: tudo sob /en é inglês; o resto é português. */
export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}
