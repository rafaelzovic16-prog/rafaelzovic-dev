import type { Dictionary } from "./pt";

/**
 * Textos de interface em inglês. O tipo `Dictionary` garante as mesmas chaves do português.
 * Textos aprovados: posicionamento (D2), assinatura e meta do hero, títulos de página.
 * A revisão de naturalidade de todo o inglês acontece na Fase 5.
 */
export const en: Dictionary = {
  meta: {
    homeTitle: "Rafa — Web Developer in training",
    description:
      "Web Developer in training, working towards becoming a Software Engineer.",
    caseStudyTitle: "{project} — Case study · Rafa",
    notFoundTitle: "Page not found · Rafa",
  },
  nav: {
    label: "Main navigation",
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  language: {
    label: "Language",
    current: "EN",
    other: "PT",
    otherName: "Português",
  },
  hero: {
    meta: "RAFA — Digital Craft & Engineering",
    signature: "Less noise. More intention.",
    position:
      "Web Developer in training, working towards becoming a Software Engineer.",
  },
  sections: {
    projects: "Selected work",
    about: "About",
    capabilities: "Capabilities",
    contact: "Contact",
  },
  caseStudy: {
    label: "Case study",
    back: "Projects",
    pending: "Content pending.",
  },
  notFound: {
    title: "Page not found",
    home: "Go to the homepage",
    projects: "View projects",
  },
};
