# Arquitetura técnica

> **Status:** plano técnico v1.0 aprovado em 2026-11-05 (P1–P7), com os ajustes A1–A6 incorporados.
> Este documento descreve **como** o site será construído. **O que** ele deve parecer está em [`DESIGN-SPEC.md`](DESIGN-SPEC.md), que prevalece em caso de conflito.

---

## 1. Princípios

1. **Fidelidade à especificação visual (A6).** A implementação traduz a especificação; não a reinterpreta.
2. **Simplicidade antes de abstração (A5).**
   - Um componente só vira primitivo compartilhado quando é usado em pelo menos dois lugares.
   - Nenhuma prop, variante ou configuração para casos hipotéticos.
   - Nenhum "construtor de seção" genérico: cada seção da home é um componente próprio, porque cada uma tem composição própria (Briefing §15.6).
   - Preferir HTML e CSS nativos a JavaScript. Preferir um arquivo legível a três arquivos "organizados".
3. **Servidor por padrão.** Só os componentes da pasta `enhance/` rodam no navegador. Cada um é um aprimoramento: sem JavaScript, o site continua completo (Briefing §12).
4. **Tokens, não valores.** Componentes usam tokens semânticos de cor, tipografia e espaço; nunca hexadecimais nem pixels arbitrários.
5. **Conteúdo real, validado.** Afirmações sobre projetos exigem evidência (§5).

---

## 2. Estrutura de pastas

A lista de componentes é indicativa: cada arquivo só é criado quando a fase correspondente precisa dele.

```
rafaelzovic-dev/
├── app/
│   ├── (pt)/                         ← layout raiz PT
│   │   ├── layout.tsx                <html lang="pt-BR">, fontes, header, footer
│   │   ├── page.tsx                  /
│   │   ├── projetos/[slug]/
│   │   │   ├── page.tsx              /projetos/qualyt-trend · /projetos/saldozen
│   │   │   └── opengraph-image.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── not-found.tsx             404 em PT
│   │   ├── [...rest]/page.tsx        URL inexistente → 404 em PT
│   │   └── specimen/page.tsx         catálogo do design system (só em preview, noindex)
│   ├── (en)/                         ← layout raiz EN
│   │   ├── layout.tsx                <html lang="en">
│   │   └── en/
│   │       ├── page.tsx              /en
│   │       ├── projects/[slug]/{page.tsx, opengraph-image.tsx}
│   │       ├── opengraph-image.tsx
│   │       ├── not-found.tsx         404 em EN
│   │       └── [...rest]/page.tsx    URL inexistente em /en/* → 404 em EN
│   ├── globals.css                   tokens (@theme), superfícies, base
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/        SiteHeader · Nav · MobileMenu · LanguageSwitch · Footer · SkipLink · Folio
│   ├── primitives/    Container · Surface · Rule · SectionLabel · IndexLink · Button
│   │                  StatusMarker · Figure · PhotoFrame · MetaTable
│   ├── home/          Hero · SelectedWork · ProjectFeature · ProjectIndex · About
│   │                  Capabilities · Contact
│   ├── case-study/    CaseHeader · CaseToc · MarginNote · ArchitectureDiagram · NextProject
│   ├── views/         HomeView · CaseStudyView · NotFoundView  ← compartilhadas por PT e EN
│   └── enhance/       ilhas de cliente, uma por comportamento aprovado
├── content/
│   ├── site.ts                    identidade, domínio, links (null até serem fornecidos)
│   ├── capabilities.ts            áreas e tecnologias, com evidência
│   └── projects/
│       ├── index.ts               ordem: qualyt-trend, saldozen
│       ├── qualyt-trend/  facts.ts · pt.ts · en.ts · images/
│       └── saldozen/      facts.ts · pt.ts · en.ts · images/
├── i18n/
│   ├── config.ts                  idiomas, padrão, lang, locale do Open Graph
│   ├── routes.ts                  mapa de páginas e âncoras PT ↔ EN
│   └── dictionaries/  pt.ts · en.ts
├── lib/
│   ├── types.ts
│   ├── content.ts
│   ├── metadata.ts
│   └── fonts.ts
├── assets/photo/                  foto mestre já tratada (D4)
├── tests/
│   ├── unit/                      dados: paridade, rotas, evidência, linguagem, publicação
│   └── e2e/                       navegador real: primeira dobra, sem JS, movimento, teclado, a11y, visual
├── docs/
├── .github/workflows/ci.yml
└── next.config.ts                 redirecionamentos, formatos de imagem
```

Mudanças em relação ao plano v1.0, por A5:

- `IndexStrip`, `Principles`, `CapabilityRow`, `TechLedger` e `ContactLink` deixam de ser arquivos próprios por padrão: começam dentro do componente da seção que os usa e só são extraídos se forem reutilizados.
- `EditorialGrid` foi retirado: o grid usa as classes de grid do próprio Tailwind dentro do `Container`.
- `CaseSection` e `StageLedger` foram retirados: são marcação simples dentro de `CaseStudyView`.
- As ilhas de cliente não têm lista fixa: são criadas uma por comportamento aprovado (estado da navegação, seção ativa, revelação na rolagem, copiar e-mail, menu, seletor de idioma), e podem ser agrupadas se compartilharem estado.

---

## 3. Rotas

| PT (padrão) | EN | Conteúdo |
|---|---|---|
| `/` | `/en` | Home |
| `/projetos/qualyt-trend` | `/en/projects/qualyt-trend` | Estudo de caso 01 |
| `/projetos/saldozen` | `/en/projects/saldozen` | Estudo de caso 02 |
| 404 PT | 404 EN | Página não encontrada no idioma da URL |
| `/sitemap.xml` · `/robots.txt` | — | SEO |
| `/specimen` | — | Só quando a variável `ENABLE_SPECIMEN` estiver ativa (previews); retorna 404 em produção |

**Redirecionamentos permanentes (308):**

- `/pt` e `/pt/*` → a mesma rota sem prefixo.
- `/projetos` → `/#projetos` · `/en/projects` → `/en#projects`.

**Âncoras:** `#projetos #sobre #competencias #contato` ↔ `#projects #about #capabilities #contact`. "Início" leva ao topo da home.

Todas as páginas são geradas no build. Slugs desconhecidos resultam em 404.

---

## 4. Internacionalização (P2, P5)

- **Dois layouts raiz** em grupos de rotas, um por idioma. Cada um gera o `<html lang>` correto no servidor, e as URLs em português existem sem reescritas nem middleware.
  - Efeito documentado pelo Next.js: navegar entre layouts raiz diferentes recarrega a página. Isso só acontece na troca de idioma, o que é aceitável.
- **404 por idioma** com uma rota "pega-tudo" em cada idioma que chama `notFound()`. Evita o `global-not-found`, ainda experimental no Next 16. A precedência dessa rota sobre `sitemap.xml`, `robots.txt` e as imagens OG é verificada por teste na Fase 1.
- **Dicionários tipados:** `en.ts` precisa ter exatamente o formato de `pt.ts`; uma chave faltando quebra a compilação. Um teste acusa textos vazios.
- **Seletor de idioma:**
  - Sem JavaScript: link simples para a página equivalente.
  - Com JavaScript: leva para a **seção ativa** detectada pela rolagem (ex.: lendo Sobre em `/` → `/en#about`).
- **Sem redirecionamento automático** pelo idioma do navegador. PT é o padrão; `hreflang` orienta os buscadores.
- **Metadados por página e idioma:** título e descrição próprios, `canonical`, `hreflang` (`pt-BR`, `en`, `x-default` → `/`), imagem Open Graph gerada com a tipografia do site.
- **Textos EN** são escritos junto com os PT em cada fase; a Fase 5 revisa naturalidade, metadados e o seletor.

---

## 5. Modelo de conteúdo e evidência

| Arquivo | Conteúdo |
|---|---|
| `projects/<slug>/facts.ts` | Fatos independentes de idioma: slug, ordem, destaque, ano, stack, status **com data**, funcionalidades com status e evidência, links (só se existirem), imagens com dimensões. |
| `projects/<slug>/pt.ts` · `en.ts` | Textos: resumo e as 10 seções do estudo de caso como blocos tipados (parágrafo, figura, nota de margem, lista, diagrama). As seções são as mesmas nos dois idiomas, verificado por tipo. |
| `capabilities.ts` | As 6 áreas, cada uma com referência a evidência; tecnologias "usadas" (com projetos) e "em estudo". |
| `dictionaries/*.ts` | Interface, hero, Sobre, Contato. |

**Regras verificadas por teste** (detalhes em [`VALIDATION.md`](VALIDATION.md) §1):

- Funcionalidade `concluída` exige pelo menos uma evidência (commit, PR, arquivo, documento, deploy ou captura).
- Status de projeto exige data.
- Tecnologia "usada" exige pelo menos um projeto, e esse projeto precisa listar a tecnologia na stack. Tecnologia "em estudo" não tem projeto.
- Termos de senioridade ou exagero são recusados nos textos PT e EN (lista no teste).
- Link de repositório privado não é publicado (C1).

**Pendências em desenvolvimento:** marcadores "pendente" são permitidos durante o desenvolvimento e **bloqueados na publicação** pelo comando `check:release` (Fase 7).

---

## 6. Estilo

- **Tailwind 4 com tokens em CSS** (`@theme` no `globals.css`), sem arquivo de configuração JS.
- **Superfícies:** um único componente `Surface` troca os tokens semânticos para o bloco Charcoal. Nenhum componente referencia cor primitiva.
- **Tipografia fluida:** cada estilo da especificação é um token com interpolação entre breakpoints.
- **Guardas no CI:** um script recusa valores hexadecimais fora do `globals.css` e valores arbitrários do Tailwind (ex.: `mt-[13px]`), com lista explícita de exceções justificadas.

---

## 7. Movimento (P3)

- CSS para estados, sublinhados, setas, hover de imagem e entrada do hero.
- Um observador de rolagem (`IntersectionObserver`) para a revelação "uma vez só".
- O estado inicial oculto só existe quando uma classe indicando JavaScript ativo está presente no documento; sem JavaScript, nada fica oculto.
- `prefers-reduced-motion: reduce` remove deslocamentos e escalas.

---

## 8. Imagens e fontes

- **Fontes:** `next/font`, hospedadas junto com o site, sem requisição externa em tempo de execução; só os pesos da especificação. Se o download das fontes durante o build não for possível em algum ambiente, a alternativa é carregar os mesmos arquivos localmente — decisão registrada na Fase 1.
- **Imagens:** importadas dos arquivos de conteúdo (dimensões conhecidas, sem deslocamento de layout), servidas em AVIF/WebP pelo otimizador de imagens. A prioridade de carregamento considera que a foto é o maior elemento da primeira dobra no desktop, mas não no mobile.

---

## 9. Menu mobile sem JavaScript

O menu usa a **Popover API** nativa do HTML: abre e fecha sem JavaScript, fica na camada superior e fecha com Esc. O JavaScript só acrescenta bloqueio de rolagem e gestão de foco. Os mesmos links também existem no rodapé.

---

## 10. Fluxo de trabalho

- Uma branch por fase (`fase-N/<tema>`), com PR para revisão.
- CI verde + preview na Vercel + pacote de capturas + **aprovação de Rafa** → merge.
- Nenhuma fase começa sem aprovação explícita (G1).
- Ações externas (Vercel, domínio) só com autorização específica (P7, G2).
