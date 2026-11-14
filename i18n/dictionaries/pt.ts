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
  skipLink: "Pular para o conteúdo",
  /** Marcador de conteúdo que Rafa ainda vai fornecer (C2). Bloqueia a publicação (Fase 7). */
  pending: "pendente",
  nav: {
    label: "Navegação principal",
    menu: "Menu",
    close: "Fechar",
    footerLabel: "Navegação do rodapé",
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
    photo: "Fotografia",
    index: "Índice",
    indexProjects: "Projetos selecionados",
    indexProjectsShort: "Projetos",
  },
  sections: {
    projects: "Trabalhos selecionados",
    about: "Sobre",
    capabilities: "Competências",
    contact: "Contato",
  },
  work: {
    readCase: "Ler estudo de caso",
    capture: "Captura",
    status: {
      done: "Concluído",
      "in-progress": "Em desenvolvimento",
      planned: "Planejado",
    },
    statusDate: "status em",
  },
  about: {
    opening: "Abertura do Sobre",
    body: "Texto do Sobre",
    howTitle: "Como trabalho",
    how: ["Intenção", "Engenharia", "Evolução"],
    statement: "Afirmação",
  },
  capabilities: {
    area: "Frase e evidência",
    used: "Usado em projetos",
    studying: "Em estudo",
    studyingList: "Lista",
  },
  contact: {
    primary: "Canais principais",
    secondary: "Outros contatos",
    email: "E-mail",
    whatsapp: "WhatsApp — decisão",
  },
  footer: {
    top: "Topo",
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
