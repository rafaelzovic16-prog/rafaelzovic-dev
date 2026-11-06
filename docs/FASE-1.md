# Fase 1 — Fundação

> **Status:** concluída pelo desenvolvimento, **exceto o preview na Vercel**, que aguarda autorização específica (P7). **Aguarda a validação de Rafa.**
> **Autorização:** início aprovado por Rafa em 2026-11-06 (E1). A Fase 2 só começa após a validação desta fase.

## Objetivo

Deixar o projeto rodando com qualidade desde o início: dependências verificadas, ferramentas de verificação, CI e a estrutura de rotas PT/EN (layouts raiz, 404 por idioma, redirecionamentos e dicionários tipados). **Esta fase não tem visual:** as páginas são HTML estrutural sem estilo, de propósito. Tokens, tipografia e grid são a Fase 2.

## Entregas

| Área | Arquivos |
|---|---|
| Projeto e ferramentas | `package.json`, `package-lock.json`, `.nvmrc` (Node 24), `.npmrc`, `tsconfig.json`, `eslint.config.mjs`, `.prettierignore`, `postcss.config.mjs`, `next.config.ts`, `vitest.config.mts`, `playwright.config.ts`, `.gitignore` |
| CI | `.github/workflows/ci.yml`: auditoria de produção, lint, formatação, tipos, testes unitários, build e E2E |
| Internacionalização | `i18n/config.ts`, `i18n/routes.ts` (rotas, âncoras, páginas conhecidas), `i18n/dictionaries/{pt,en,index}.ts` |
| Rotas | `app/(pt)/…` e `app/(en)/en/…`: home, estudos de caso, páginas 404; `app/robots.ts`; `proxy.ts` |
| Componentes | `components/layout/{RootDocument,SiteHeader}.tsx`, `components/views/{HomeView,CaseStudyView,NotFoundView}.tsx` |
| Apoio | `lib/{fonts,metadata,site}.ts`, `content/projects.ts` (só slug e nome, na ordem D5) |
| Testes | `tests/unit/{i18n,routes}.test.ts`, `tests/e2e/{routes,no-js,fonts}.spec.ts` |

### Rotas entregues

| Endereço | Resultado |
|---|---|
| `/` · `/en` | Home estrutural: meta, frase conceitual, H1 com o posicionamento (D1/D2, D7), seções com âncoras e lista de projetos |
| `/projetos/qualyt-trend` · `/projetos/saldozen` · `/en/projects/…` | Estudo de caso estrutural: nome do projeto e "Conteúdo pendente." |
| Qualquer outro endereço | Página 404 do idioma da URL, status 404, `noindex` |
| `/pt/*`, `/projetos`, `/en/projects` | Redirecionamento permanente (308) |
| `/robots.txt` | `Disallow: /` até a publicação (T5) |

## Verificação automatizada (ambiente de desenvolvimento, Node 24.22.1)

| Verificação | Resultado |
|---|---|
| `npm audit --omit=dev` | 0 vulnerabilidades |
| `npm run check` (lint, formatação, tipos, testes unitários, build) | Passa |
| Testes unitários | 20 de 20 |
| Testes E2E (Chromium, contra o build de produção) | 45 de 45 |

Os testes E2E cobrem: as 6 páginas públicas (status 200, `lang`, um único H1, título, link do idioma apontando para a página equivalente); 9 endereços desconhecidos (status 404, página do idioma certo, `noindex`), **com e sem JavaScript**; 6 redirecionamentos; `robots.txt`; navegação sem JavaScript entre home, estudo de caso e troca de idioma; e as 5 combinações de fonte e peso carregadas **sem nenhuma requisição a outro domínio**.

O resultado do CI no GitHub está na PR desta fase.

## Protótipo obrigatório: o que foi testado e o que mudou

O roadmap exige "prototipar dois layouts raiz e catch-all 404 na versão instalada". O protótipo, feito num diretório isolado, confirmou parte do plano e derrubou outra.

**Funciona como planejado**

- Dois layouts raiz em grupos de rotas: `<html lang>` correto em cada idioma, páginas geradas estaticamente no build.
- Redirecionamentos com `#` no destino (`/projetos` → `/#projetos`).

**Não funciona como planejado: página 404 por idioma**

O plano (P2) previa uma rota "pega-tudo" em cada idioma chamando `notFound()`. No Next 16, isso entrega um HTML vazio (`<html id="__next_error__">`, sem `lang` e sem conteúdo) que só é preenchido com JavaScript. Sem JavaScript, o visitante vê uma página em branco.

| Abordagem testada | Sem JavaScript | Observação |
|---|---|---|
| Rota "pega-tudo" com `notFound()` (plano original) | Página em branco | Reproduzido também num app com **um único** layout raiz e nas versões 16.4.3 e 16.4.4: é comportamento do Next 16, não regressão da 16.4.5 |
| `not-found.tsx` um nível abaixo do layout raiz | Página em branco | — |
| Rota "pega-tudo" estática (`force-static`) | Página em branco | — |
| `global-not-found` | Funciona | Recurso **experimental**; uma única página para os dois idiomas, com `lang` fixo — contraria a especificação (§11, uma 404 por idioma) |
| **Proxy que reescreve para a 404 do idioma, com status 404** | **Funciona** | 404 por idioma, `lang` correto, sem recurso experimental. **Escolhido (T1, proposta).** |

Custo da escolha: o proxy roda em cada requisição de página (na Vercel, uma etapa leve antes de servir a página estática) e a lista de páginas conhecidas precisa acompanhar as rotas novas — ela é gerada do mesmo mapa de rotas e coberta por testes.

**Registro honesto de método:** durante a comparação, servidores antigos do protótipo continuaram ativos nas portas de teste (o processo do Next muda de nome e não foi encerrado pelo comando usado). Algumas comparações intermediárias foram respondidas por esses servidores e estavam erradas. Todas as conclusões acima foram refeitas com servidores novos e verificação explícita de porta livre.

### Outro achado: `next start --hostname`

Com o servidor de testes preso a `127.0.0.1`, o `next start` encaminha as reescritas do proxy para um endereço em que não escuta, e a resposta 404 nunca chega. É específico do servidor próprio do Next (na Vercel, as reescritas são da plataforma). Os testes E2E usam o servidor sem `--hostname`; o motivo está comentado em `playwright.config.ts`.

## Decisões técnicas propostas (aguardam validação)

Registradas em [`DECISIONS.md`](DECISIONS.md), seção T:

- **T1** — 404 por idioma via proxy.
- **T2** — fontes por `next/font/google`, baixadas no build e servidas pelo próprio site. **Pergunta:** "fontes locais" no roadmap significa isso, ou arquivos de fonte versionados no repositório?
- **T3** — ESLint 9 mantido, embora marcado como não suportado no npm.
- **T4** — alerta moderado de desenvolvimento aceito; produção auditada no CI.
- **T5** — `noindex` até a publicação, liberado por `SITE_INDEXABLE=true`.

## Pendente para concluir a fase: preview na Vercel (P7)

Consulta só de leitura em 2026-11-06: a conta Vercel de Rafa tem os projetos `cafe-com-prosa`, `way` e `qualyt-trend`; não existe projeto para o portfólio. **Nada foi criado.**

Ação que precisa de autorização específica:

- Criar o projeto `rafaelzovic-dev` na mesma conta, conectado ao repositório `rafaelzovic16-prog/rafaelzovic-dev`, framework Next.js, Node 24.
- Sem domínio, sem variáveis de ambiente (portanto `noindex` ativo) e sem compra ou mudança de plano.
- Efeitos: cada push numa branch gera um preview; um merge na `main` gera uma publicação em `*.vercel.app`, que continua `noindex` (T5). Enquanto a `main` só tiver documentação, a primeira publicação de produção não terá o que mostrar.

Pode ser feito por mim, com as ferramentas da Vercel, depois da autorização; ou por Rafa, no painel da Vercel ("Add New → Project", importando o repositório).

## Fora do escopo desta fase

- Qualquer visual: cores, tipografia, grid, componentes (Fase 2).
- `lucide-react` e `@axe-core/playwright` (instalados quando usados).
- Perfis mobile nos testes E2E (Fase 3, junto com os testes de primeira dobra).

## Como revisar

1. Ler as decisões T1–T5 e responder à pergunta de T2.
2. Autorizar (ou não) a criação do projeto na Vercel.
3. Opcional, localmente: `npm ci`, `npm run check`, `npx playwright install chromium`, `npm run test:e2e`.

## Registro de aprovação

| Data | Decisão | Observações |
|---|---|---|
| — | Aguardando validação | — |
