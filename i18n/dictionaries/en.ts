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
  skipLink: "Skip to content",
  pending: "pending",
  nav: {
    label: "Main navigation",
    menu: "Menu",
    close: "Close",
    footerLabel: "Footer navigation",
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
    photo: "Photograph",
    index: "Index",
    indexProjects: "Selected projects",
    indexProjectsShort: "Projects",
  },
  sections: {
    projects: "Selected work",
    about: "About",
    capabilities: "Capabilities",
    contact: "Contact",
  },
  work: {
    readCase: "Read case study",
    capture: "Screenshot",
    status: {
      done: "Completed",
      "in-progress": "In development",
      planned: "Planned",
    },
    statusDate: "status as of",
  },
  about: {
    opening: "About opening",
    body: "About text",
    howTitle: "How I work",
    how: ["Intention", "Engineering", "Evolution"],
    statement: "Statement",
  },
  capabilities: {
    area: "Sentence and evidence",
    used: "Used in projects",
    studying: "Currently studying",
    studyingList: "List",
  },
  contact: {
    primary: "Main channels",
    secondary: "Other contacts",
    email: "Email",
    whatsapp: "WhatsApp — decision",
  },
  footer: {
    top: "Top",
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
