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
3. **Servidor por padrão.** Só os componentes da pasta `enhance/` rodam no navegador. Cada um é um aprimoramento: sem JavaScript, o site continua completo (Briefing §12). Exceção: as ferramentas da página interna `/specimen` (diagnóstico, tamanhos calculados, sobreposição do grid) ficam junto dela, em `app/(pt)/specimen/`, porque não fazem parte do site publicado.
4. **Tokens, não valores.** Componentes usam tokens semânticos de cor, tipografia e espaço; nunca hexadecimais nem pixels arbitrários.
5. **Conteúdo real, validado.** Afirmações sobre projetos exigem evidência (§5).

---

## 2. Estrutura de pastas

A lista de componentes é indicativa: cada arquivo só é criado quando a fase correspondente precisa dele.

```
rafaelzovic-dev/
├── app/
│   ├── (pt)/                         ← layout raiz PT
│   │   ├── layout.tsx                <html lang="pt-BR">, fontes, metadados padrão
│   │   ├── page.tsx                  /
│   │   ├── projetos/[slug]/
│   │   │   ├── page.tsx              /projetos/qualyt-trend · /projetos/saldozen
│   │   │   └── opengraph-image.tsx   (Fase 5)
│   │   ├── opengraph-image.tsx       (Fase 5)
│   │   ├── pagina-nao-encontrada/page.tsx   404 em PT, entregue pelo proxy
│   │   └── specimen/                 catálogo do design system + diagnóstico de viewport (Fase 2; só em preview, noindex)
│   ├── (en)/                         ← layout raiz EN
│   │   ├── layout.tsx                <html lang="en">
│   │   └── en/
│   │       ├── page.tsx              /en
│   │       ├── projects/[slug]/{page.tsx, opengraph-image.tsx}
│   │       ├── opengraph-image.tsx   (Fase 5)
│   │       └── page-not-found/page.tsx      404 em EN, entregue pelo proxy
│   ├── globals.css                   tokens (@theme), superfícies, base
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/        RootDocument · SiteHeader · Nav · MobileMenu · LanguageSwitch · Footer · SkipLink · Folio
│   ├── primitives/    Surface · SectionLabel · IndexLink · ButtonLink · StatusMarker · PhotoFrame
│   │                  (Fase 2) · Figure · MetaTable (Fase 4)
│   ├── home/          Hero · SelectedWork (com ProjectFeature) · About · Capabilities · Contact
│   │                  (Fase 3; ProjectIndex só a partir do terceiro projeto)
│   ├── case-study/    CaseHeader · CaseToc · MarginNote · ArchitectureDiagram · NextProject
│   ├── views/         HomeView · CaseStudyView · NotFoundView  ← compartilhadas por PT e EN
│   └── enhance/       ilhas de cliente, uma por comportamento aprovado (Fase 3: MobileMenu)
├── content/
│   ├── site.ts                    identidade, domínio, links (null até serem fornecidos)
│   ├── capabilities.ts            áreas do briefing e registro técnico derivado das stacks (Fase 3)
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
├── assets/fonts/                  fontes WOFF2 versionadas + licenças OFL (T2.1)
├── assets/photo/                  foto mestre já tratada (D4)
├── scripts/build-fonts.sh         gera assets/fonts/ a partir de google/fonts
├── tests/
│   ├── unit/                      dados: paridade, rotas, evidência, linguagem, publicação
│   └── e2e/                       navegador real: primeira dobra, sem JS, movimento, teclado, a11y, visual
├── docs/
├── .github/workflows/ci.yml
├── proxy.ts                       endereços desconhecidos → página 404 do idioma, com status 404
├── vercel.json                    publicação automática da main desligada até a Fase 7 (T6)
└── next.config.ts                 redirecionamentos, formatos de imagem
```

Mudanças em relação ao plano v1.0, por A5:

- `IndexStrip`, `Principles`, `CapabilityRow`, `TechLedger` e `ContactLink` deixam de ser arquivos próprios por padrão: começam dentro do componente da seção que os usa e só são extraídos se forem reutilizados.
- `EditorialGrid` foi retirado: o grid usa as classes de grid do próprio Tailwind dentro do `Container`.
- Fase 2 (interpretação S6, [`FASE-2.md`](FASE-2.md)): `Container`, `Rule` e o grid viraram utilitários CSS no `globals.css` (`container-editorial`, `<hr>`, `grid-editorial`), não componentes; `Button` se chama `ButtonLink`, porque sempre leva a um endereço.
- `CaseSection` e `StageLedger` foram retirados: são marcação simples dentro de `CaseStudyView`.
- Fase 3: `LanguageSwitch` e `SiteFooter` entraram em `layout/`; `Pending` em `primitives/`, para todo conteúdo que Rafa ainda vai fornecer (com `data-pending`). Os projetos ficaram num único `content/projects.ts`, com categoria, resumo, status datado e stack; a divisão em `facts.ts`/`pt.ts`/`en.ts` por projeto entra na Fase 4, com os estudos de caso.
- As ilhas de cliente não têm lista fixa: são criadas uma por comportamento aprovado (estado da navegação, seção ativa, revelação na rolagem, copiar e-mail, menu, seletor de idioma), e podem ser agrupadas se compartilharem estado.

---

## 3. Rotas

| PT (padrão) | EN | Conteúdo |
|---|---|---|
| `/` | `/en` | Home |
| `/projetos/qualyt-trend` | `/en/projects/qualyt-trend` | Estudo de caso 01 |
| `/projetos/saldozen` | `/en/projects/saldozen` | Estudo de caso 02 |
| 404 PT | 404 EN | Página não encontrada no idioma da URL, entregue pelo proxy com status 404 |
| `/sitemap.xml` · `/robots.txt` | — | SEO |
| `/specimen` | — | Catálogo do sistema visual com o diagnóstico de viewport (Fase 2). Liberado pelo proxy só em previews da Vercel (`VERCEL_ENV=preview`, variável de sistema da própria Vercel) e no servidor de desenvolvimento; em produção, 404. A variável `ENABLE_SPECIMEN` prevista no plano não foi criada (S5). |
| ~~`/medir`~~ | — | Ferramenta de diagnóstico de viewport (E9, E10), incorporada ao `/specimen` na Fase 2 (E12). Hoje é 404 em todos os ambientes. |

**Redirecionamentos permanentes (308):**

- `/pt` e `/pt/*` → a mesma rota sem prefixo.
- `/projetos` → `/#projetos` · `/en/projects` → `/en#projects`.

**Âncoras:** `#projetos #sobre #competencias #contato` ↔ `#projects #about #capabilities #contact`. "Início" leva ao topo da home.

Todas as páginas são geradas no build. Slugs desconhecidos resultam em 404.

---

## 4. Internacionalização (P2, P5)

- **Dois layouts raiz** em grupos de rotas, um por idioma. Cada um gera o `<html lang>` correto no servidor, e as URLs em português existem sem reescritas.
  - Efeito documentado pelo Next.js: navegar entre layouts raiz diferentes recarrega a página. Isso só acontece na troca de idioma, o que é aceitável.
- **404 por idioma via proxy** (`proxy.ts`, decisão T1, **aprovada em 2026-11-06**; impacto na §4.1). O plano original (rota "pega-tudo" chamando `notFound()`) foi testado na Fase 1 e **não funciona**: no Next 16, `notFound()` numa renderização sob demanda entrega HTML vazio sem JavaScript, e com dois layouts raiz não existe 404 estática por idioma. O proxy deixa passar as páginas conhecidas e reescreve qualquer outro endereço para a página 404 do idioma da URL, com status 404 e HTML completo. Evidências e alternativas em [`FASE-1.md`](FASE-1.md).
  - Endereços com extensão (`robots.txt`, imagens, ícones) não passam pelo proxy. Rotas novas sem extensão (ex.: imagens Open Graph na Fase 5, `/specimen` na Fase 2) precisam entrar na lista de páginas conhecidas; os testes E2E acusam se não entrarem.
- **Cabeçalho renderizado pelas views**, não pelo layout: o seletor de idioma precisa do endereço equivalente no outro idioma, que só a página conhece. Assim ele funciona no servidor, sem JavaScript.
- **Dicionários tipados:** `en.ts` precisa ter exatamente o formato de `pt.ts`; uma chave faltando quebra a compilação. Um teste acusa textos vazios.
- **Seletor de idioma:**
  - Sem JavaScript: link simples para a página equivalente.
  - Com JavaScript: leva para a **seção ativa** detectada pela rolagem (ex.: lendo Sobre em `/` → `/en#about`).
- **Sem redirecionamento automático** pelo idioma do navegador. PT é o padrão; `hreflang` orienta os buscadores.
- **Metadados por página e idioma:** título e descrição próprios, `canonical`, `hreflang` (`pt-BR`, `en`, `x-default` → `/`), imagem Open Graph gerada com a tipografia do site.
- **Textos EN** são escritos junto com os PT em cada fase; a Fase 5 revisa naturalidade, metadados e o seletor.

### 4.1 Impacto do proxy (T1)

| Aspecto | Impacto | Como é controlado |
|---|---|---|
| **Quando roda** | Em toda requisição de página. Não roda para arquivos internos do Next (`/_next/…`) nem para endereços com extensão (`robots.txt`, fontes, imagens). | `matcher` em `proxy.ts`. |
| **Páginas conhecidas** | O proxy só confere o endereço numa lista e deixa passar; a página continua estática, gerada no build. | Lista gerada do mapa de rotas (`knownPaths`), sem duplicação manual. |
| **Endereços desconhecidos** | Reescritos para a 404 do idioma, com status 404, `lang` correto e HTML completo, também sem JavaScript. | Testes E2E de 404 com e sem JavaScript. |
| **Custo de tempo, local** | Medido com o servidor do Next (`next start`), 200 requisições cada: home ≈ 2,2 ms; endereço desconhecido ≈ 1,9 ms. Não representa a Vercel. | — |
| **Custo na Vercel** | O proxy roda como Routing Middleware: a documentação da Vercel confirma que ele acrescenta latência e custo por requisição. Os limites incluídos no plano Hobby **não constam da documentação consultada**. | A medir no preview (tempo de resposta) e a acompanhar no painel de uso da Vercel. Nenhum serviço pago será contratado (E6). |
| **Ferramentas de preview** | Rotas internas (hoje só `/specimen`, que incorporou o `/medir` de E9) ficam numa lista separada (`previewOnlyPaths`) e só passam pelo proxy em previews. | Testes unitários da regra e E2E nos dois cenários (servidor como produção e servidor como preview). |
| **Manutenção** | Toda rota nova sem extensão precisa entrar no mapa de rotas, senão vira 404. Exemplo já previsto: imagens Open Graph (Fase 5); o `/specimen` entrou na lista de ferramentas de preview na Fase 2. | Teste unitário confere a lista de páginas conhecidas; os testes E2E visitam cada página pública e falham se alguma responder 404. |
| **Caso de borda** | Endereço desconhecido **com extensão** (ex.: `/qualquer.html`) não passa pelo proxy e recebe a 404 padrão do Next: status 404 correto, mas página sem `lang` e sem conteúdo do site. | Aceito: não é um endereço que o site divulga. Registrado para a Fase 6 (SEO). |
| **Servidor próprio** | Com `next start --hostname 127.0.0.1`, as reescritas do proxy não respondem (achado da Fase 1). Não afeta a Vercel. | Testes E2E usam o servidor sem `--hostname`; motivo comentado em `playwright.config.ts`. |

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

- **Tailwind 4 com tokens em CSS** (`@theme` no `globals.css`), sem arquivo de configuração JS. A paleta padrão do Tailwind foi removida: só os tokens semânticos viram classes.
- **Superfícies:** um único componente `Surface` troca os tokens semânticos para o bloco Charcoal (`data-surface="dark"`). Nenhum componente referencia cor primitiva.
- **Tipografia fluida:** cada estilo da especificação é um utilitário (`type-display`, `type-h2`…) com tamanhos interpolados entre 375, 768 e 1440 px (S1) e altura de linha por faixa (S2).
- **Guardas no CI:** em vez de um script separado, um teste unitário (`tests/unit/sistema-visual.test.ts`, que roda no `npm run check` e no CI) recusa cor hexadecimal, função de cor e classe da paleta do Tailwind fora do `globals.css`, e valores arbitrários do Tailwind (ex.: `mt-[13px]`) fora de uma lista explícita de exceções justificadas.

---

## 7. Movimento (P3)

- CSS para estados, sublinhados, setas, hover de imagem e entrada do hero.
- Um observador de rolagem (`IntersectionObserver`) para a revelação "uma vez só".
- O estado inicial oculto só existe quando uma classe indicando JavaScript ativo está presente no documento; sem JavaScript, nada fica oculto.
- `prefers-reduced-motion: reduce` remove deslocamentos e escalas.

---

## 8. Imagens e fontes

- **Fontes (decisão T2.1, aprovada em 2026-11-06):** `next/font/local`, com os arquivos **versionados em `assets/fonts/`**. Nem o build nem o navegador dependem de serviço externo: o build foi testado com a rede de saída bloqueada, e um teste unitário recusa o uso de `next/font/google`.
  - Origem: repositório oficial `google/fonts`, licença SIL OFL 1.1 (cópia de cada licença ao lado dos arquivos). Gerados por `scripts/build-fonts.sh`; proveniência e versões em [`DEPENDENCIES.md`](DEPENDENCIES.md) §8.
  - Um arquivo WOFF2 estático por peso: Manrope 500/600, Inter 400/500, JetBrains Mono 400, cada um com os caracteres "latin" e "latin-ext" nos intervalos do Google Fonts.
  - Limitação do `next/font/local`: não aceita intervalo de caracteres por arquivo, por isso "latin" e "latin-ext" ficam juntos no mesmo arquivo e são sempre baixados. Medido na home: 5 arquivos, 178,7 KB — 23 KB a menos que a configuração anterior com Google Fonts (6 arquivos, 201,9 KB).
  - Todos os 5 arquivos são pré-carregados hoje. Quais pré-carregar de fato (os da primeira dobra) é decisão de desempenho da Fase 6.
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
- **Publicação (T6):** a `main` não gera publicação automática na Vercel até a Fase 7 (`vercel.json`, `git.deploymentEnabled`). Todas as outras branches geram previews, protegidos pela Vercel Authentication. Religar a publicação exige autorização expressa de Rafa (E13). Detalhes na §10.1.

### 10.1 Publicação de produção (T6)

**Como funciona hoje.** O `vercel.json` contém `"git": { "deploymentEnabled": { "main": false } }`. A Vercel lê esse arquivo no próprio commit que receberia a publicação: um commit na `main` (inclusive o de um merge) não gera publicação; qualquer outra branch gera um preview. A regra vale só para publicações automáticas pelo Git: uma publicação manual (painel, CLI ou API) continua possível, e por isso também exige autorização expressa (E13). O teste `tests/unit/publicacao.test.ts` falha se a regra mudar.

Domínios do projeto (consulta de 2026-11-13): `rafaelzovic-dev.vercel.app` é o domínio de produção; `rafaelzovic-dev-rdz14.vercel.app` também aparece entre os endereços do projeto. Com a proteção atual ("todas as publicações, exceto domínios do projeto"), esses endereços ficariam públicos se houvesse uma publicação de produção. Hoje não há nenhuma.

**Conferência antes de qualquer merge na `main` (até a Fase 7):**

1. A branch que vai entrar na `main` tem o `vercel.json` com `{ "main": false }`, e o CI da PR está verde (o teste de publicação faz parte dele).
2. Vercel, projeto `rafaelzovic-dev`: nenhuma publicação de produção ativa (`live: false`; a lista de publicações com alvo "production" não tem nenhuma pronta).
3. Proteção: Vercel Authentication ativa; nenhum link de compartilhamento ou exceção de proteção criado.
4. Domínios: só os gerados pela Vercel; nenhum domínio próprio.
5. Variáveis de ambiente: nenhuma (em especial, `SITE_INDEXABLE` ausente, T5).
6. Depois do merge: conferir que a Vercel não criou publicação para o commit da `main`.

**Reativação na Fase 7 (só com autorização expressa de Rafa, registrada em [`DECISIONS.md`](DECISIONS.md)):**

1. Na branch da Fase 7, retirar o bloco `git` do `vercel.json` e atualizar `tests/unit/publicacao.test.ts` no mesmo commit; registrar a substituição de T6.
2. Decidir com Rafa, à parte, a indexação: `SITE_INDEXABLE=true` só no ambiente de produção (T5).
3. Revisar a proteção: a produção passa a ser pública (é o objetivo); os previews continuam protegidos.
4. Rodar `npm run check`, `check:release`, a suíte E2E e conferir o preview da branch.
5. O merge dessa PR na `main` gera a primeira publicação de produção. Conferir o build, os endereços de produção, os cabeçalhos (`robots`) e as rotas PT/EN.
6. Domínio próprio (`rafaelzovic.dev`): consulta, compra e DNS são passos separados, cada um com autorização (G2).
