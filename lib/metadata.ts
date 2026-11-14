import type { Metadata } from "next";
import { getProject } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isIndexable } from "./site";

const noIndex = { index: false, follow: false } as const;

/** Metadados padrão de cada idioma, definidos no layout raiz. */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    title: t.meta.homeTitle,
    description: t.meta.description,
    ...(isIndexable ? {} : { robots: noIndex }),
  };
}

export function caseStudyMetadata(locale: Locale, slug: string): Metadata {
  const t = getDictionary(locale);
  const name = getProject(slug)?.name ?? "";
  return { title: t.meta.caseStudyTitle.replace("{project}", name) };
}

/** A página "não encontrada" nunca é indexável. */
export function notFoundMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return { title: t.meta.notFoundTitle, robots: noIndex };
}
