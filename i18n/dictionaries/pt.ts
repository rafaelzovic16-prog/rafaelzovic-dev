/**
 * Textos de interface em português (idioma padrão).
 * Este arquivo define o formato que o dicionário em inglês precisa seguir.
 * Textos aprovados: posicionamento (D1), assinatura e meta do hero, títulos de página.
 */
export const pt = {
  meta: {
    homeTitle: "Rafa — Desenvolvedor web em formação",
    description:
      "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer.",
    caseStudyTitle: "{project} — Estudo de caso · Rafa",
    notFoundTitle: "Página não encontrada · Rafa",
  },
  nav: {
    label: "Navegação principal",
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    contact: "Contato",
  },
  language: {
    label: "Idioma",
    current: "PT",
    other: "EN",
    otherName: "English",
  },
  hero: {
    meta: "RAFA — Digital Craft & Engineering",
    signature: "Menos ruído. Mais intenção.",
    position:
      "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer.",
  },
  sections: {
    projects: "Trabalhos selecionados",
    about: "Sobre",
    capabilities: "Competências",
    contact: "Contato",
  },
  caseStudy: {
    label: "Estudo de caso",
    back: "Projetos",
    pending: "Conteúdo pendente.",
  },
  notFound: {
    title: "Página não encontrada",
    home: "Ir para o início",
    projects: "Ver projetos",
  },
};

export type Dictionary = typeof pt;
