# Fase 1 — Fundação

> **Status:** **concluída.** Merge da PR #1 na `main` em 2026-11-14 (`d5cd387`, merge commit), com autorização expressa de Rafa (E16). O histórico da fase continua abaixo; o status original desta linha era: "decisões T1–T5 aprovadas e ajustes aplicados; preview bloqueado por permissão da conexão; aguarda a validação final de Rafa (E8)".
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

## Decisões técnicas (propostas na primeira entrega; aprovadas em 2026-11-06)

Registradas em [`DECISIONS.md`](DECISIONS.md), seção T:

- **T1** — 404 por idioma via proxy.
- **T2** — fontes por `next/font/google`, baixadas no build e servidas pelo próprio site. **Pergunta:** "fontes locais" no roadmap significa isso, ou arquivos de fonte versionados no repositório?
- **T3** — ESLint 9 mantido, embora marcado como não suportado no npm.
- **T4** — alerta moderado de desenvolvimento aceito; produção auditada no CI.
- **T5** — `noindex` até a publicação, liberado por `SITE_INDEXABLE=true`.

## Preview na Vercel (P7) — situação na primeira entrega

Consulta só de leitura em 2026-11-06: a conta Vercel de Rafa tem os projetos `cafe-com-prosa`, `way` e `qualyt-trend`; não existe projeto para o portfólio. **Nada foi criado.**

Ação que precisa de autorização específica:

- Criar o projeto `rafaelzovic-dev` na mesma conta, conectado ao repositório `rafaelzovic16-prog/rafaelzovic-dev`, framework Next.js, Node 24.
- Sem domínio, sem variáveis de ambiente (portanto `noindex` ativo) e sem compra ou mudança de plano.
- Efeitos: cada push numa branch gera um preview; um merge na `main` gera uma publicação em `*.vercel.app`, que continua `noindex` (T5). Enquanto a `main` só tiver documentação, a primeira publicação de produção não terá o que mostrar.

Pode ser feito por mim, com as ferramentas da Vercel, depois da autorização; ou por Rafa, no painel da Vercel ("Add New → Project", importando o repositório).

## Rodada de validação (2026-11-06)

Rafa aprovou T1, T3, T4 e T5, trocou T2 por **T2.1 (fontes com `next/font/local`, arquivos no repositório)**, autorizou a Vercel com limites (E6) e informou o aparelho de referência (E7). Registro completo em [`DECISIONS.md`](DECISIONS.md).

### O que mudou

| Pedido | Feito |
|---|---|
| T1 — documentar o impacto do proxy | [`ARCHITECTURE.md`](ARCHITECTURE.md) §4.1: quando roda, custo medido localmente, custo na Vercel (a medir no preview), manutenção, caso de borda (endereço desconhecido com extensão recebe a 404 padrão do Next) e o achado do `--hostname`. Testes de 404 por idioma, sem JavaScript e de rotas desconhecidas mantidos. |
| T2.1 — `next/font/local` com os arquivos no repositório | 5 arquivos WOFF2 em `assets/fonts/` (Manrope 500/600, Inter 400/500, JetBrains Mono 400; "latin" + "latin-ext"), gerados de `google/fonts` por `scripts/build-fonts.sh`, com as licenças OFL. Proveniência em [`DEPENDENCIES.md`](DEPENDENCIES.md) §8. Medido na home: 178,7 KB em 5 arquivos, contra 201,9 KB em 6 arquivos com o Google Fonts. |
| T2.1 — independência também no build | Build executado com a rede de saída bloqueada: passou, sem nenhuma referência ao Google no resultado. Novo teste unitário recusa `next/font/google` e confere a presença dos arquivos e licenças. |
| T4 — monitorar os alertas | Passo informativo no CI registra o `npm audit` das dependências de desenvolvimento no resumo de cada execução; verificação a cada início de fase ([`DEPENDENCIES.md`](DEPENDENCIES.md) §7.3). |
| E7 — Galaxy A15, Chrome, área medida | [`VALIDATION.md`](VALIDATION.md) §3.3: o perfil do A15 só entra nos testes com os valores medidos no Chrome, com as barras abertas; a estimativa anterior (412 × 708) foi retirada. |

### Suíte completa, executada de novo (ambiente de desenvolvimento, Node 24.22.1)

| Etapa | Resultado |
|---|---|
| `npm ci` (instalação limpa a partir do lockfile) | 389 pacotes, sem erro |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| `npm audit` (desenvolvimento, T4) | 8 moderadas — as mesmas, de origem única (`minimatch`) |
| `npm run check` (lint, formatação, tipos, unitários, build) | Passa |
| Testes unitários | 29 de 29 (eram 20; +9 de fontes) |
| Build com a rede de saída bloqueada | Passa; 0 referências ao Google |
| Testes E2E (Chromium, build de produção) | 45 de 45 |

O resultado do CI no GitHub fica registrado na PR #1.

### Vercel (E6)

A criação do projeto foi tentada dentro dos limites autorizados (projeto `rafaelzovic-dev`, conectado ao repositório, sem deploy da `main`, que só tem documentação). **A Vercel recusou (403):** a conexão usada aqui consegue ler a conta, mas não tem permissão de escrita no time da conta (`rdz14`). **Nada foi criado nem alterado na Vercel**, e nenhum outro projeto foi tocado.

Dois caminhos, ambos dentro de E6:

1. Rafa aprova, num link de consentimento da Vercel (válido por 10 minutos), o acesso desta conexão ao time; em seguida o projeto é criado por aqui.
2. Rafa cria o projeto no painel da Vercel ("Add New → Project", importando `rafaelzovic16-prog/rafaelzovic-dev`, sem variáveis de ambiente e sem domínio). A partir daí, cada push na branch gera o preview.

Depois da criação, conferir no projeto: proteção dos previews ativa ("Vercel Authentication"), nenhuma variável de ambiente, nenhum domínio, Node 24, e o cabeçalho de não indexação nas respostas.

**Atualização (2026-11-06):** Rafa aprovou o acesso da conexão ao time e o projeto foi criado.

| Item | Situação |
|---|---|
| Projeto | `rafaelzovic-dev` (`prj_Qxf9GkUjNKXAGyFhC53qnty7Z3Vu`), conectado a `rafaelzovic16-prog/rafaelzovic-dev`; branch de produção: `main` |
| Proteção | Vercel Authentication ativa em **todas** as publicações, exceto domínios próprios (não há nenhum) — mais restritiva que "só previews" |
| Variáveis de ambiente | Nenhuma (`SITE_INDEXABLE` ausente → `noindex`, T5) |
| Domínios | Nenhum |
| Node | A Vercel criou o projeto com Node **26.x** por padrão; ajustado para **24.x**, a versão aprovada (E2). Foi a única configuração alterada. |
| Outros projetos | Não tocados |

**Ocorrência:** a primeira publicação, pedida pela API a partir da branch `fase-1/fundacao`, foi marcada pela Vercel como **produção** (primeira publicação de um projeto novo). Como produção deve vir só da `main` depois do merge, ela foi **cancelada antes de terminar o build**. O preview passou a ser gerado pela integração com o GitHub, a partir do envio desta atualização para a branch.

## Página de medição do Galaxy A15 (E9, E10 — 2026-11-06)

Autorizada por Rafa para medir a área útil no Chrome com as barras abertas (E7), sem depender de estimativas.

| Item | Situação |
|---|---|
| Endereço | `/medir`, no preview: `https://rafaelzovic-dev-git-fase-1-fundacao-rdz14.vercel.app/medir` |
| O que mostra | Diagnóstico de viewport com as APIs nativas do navegador (E10): leitura de abertura (barras do Chrome visíveis), orientação, tela e área disponível, altura somada da interface do Chrome + Android, variações por orientação (barra recolhida, rotação), `visualViewport` e o JSON completo para copiar |
| Onde existe | Só em previews da Vercel e no servidor de desenvolvimento. Em produção, o proxy responde 404, como qualquer endereço desconhecido |
| Variáveis | Nenhuma adicionada: usa `VERCEL_ENV`, que a própria Vercel define em cada publicação |
| Visual | Sem a identidade do site, que é da Fase 2; só texto legível no celular. `noindex` |
| Testes | 3 unitários da regra de liberação; E2E: 404 no servidor como produção (com e sem JavaScript) e, no servidor como preview, leitura de abertura e densidade corretas, orientação, variações (barra recolhida e rotação) sem alterar a leitura de abertura, e os campos do JSON |

Suíte depois do diagnóstico (E10): unitários 32 de 32; E2E 50 de 50.

**Como medir:** abrir o endereço acima no Chrome do Galaxy A15, na vertical e sem rolar; depois rolar até o fim da página (a barra do Chrome se recolhe) e, se quiser, girar para a horizontal e voltar; tocar em "Copiar diagnóstico" e enviar o resultado com o valor de "Zoom da tela" (Configurações → Tela). Com o diagnóstico, o perfil "Galaxy A15 · Chrome" entra no Playwright como descrito em [`VALIDATION.md`](VALIDATION.md) §3.3, e a suíte existente passa a rodar também nele.

## Medição real do Galaxy A15 e perfis no Playwright (E11, 2026-11-07)

Rafa executou o diagnóstico no próprio aparelho, no Chrome, e enviou o JSON completo, guardado sem alteração em `tests/e2e/devices/galaxy-a15-chrome.json`. Análise completa em [`VALIDATION.md`](VALIDATION.md) §3.3.

| Leitura | Vertical | Horizontal |
|---|---|---|
| Barras visíveis | **400 × 766** | 837 × 299 |
| Barra do Chrome recolhida | 400 × 822 (barra: 56 px) | 837 × 370 (barra: ≈ 71 px) |
| Tela | 400 × 867, densidade 2,7 | 867 × 400 |

- A referência inicial 412 × 892 foi substituída: a largura real do aparelho é 400.
- Interface somada na abertura (vertical): 101 px = barra do Chrome (56) + barras do Android (45).
- Três projetos novos no Playwright, montados só com esses valores: barras visíveis, barra recolhida e horizontal. Os testes da página `/medir` passaram a usar o perfil medido.

Suíte depois da medição: unitários 32 de 32; **E2E 191 de 191** (desktop 50; cada perfil do Galaxy A15, 47).

Pendente: o valor de "Zoom da tela" usado na medição (os números valem para essa configuração).

## Auditoria de encerramento (2026-11-13)

Nova verificação completa antes de preparar o encerramento (E12), a partir de uma instalação limpa, no commit `2d9363e`.

| Critério | Resultado |
|---|---|
| PR #1 | Aberta, sem conflitos com a `main`, nenhuma revisão pendente (o único comentário é o aviso automático da Vercel) |
| CI no GitHub (`2d9363e`) | Verde nas execuções de push e de PR |
| `npm ci` | 389 pacotes, sem erro |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| `npm audit` (desenvolvimento, T4) | 7 moderadas (eram 8; uma foi resolvida na origem). Mesma origem: `minimatch` via `typescript-eslint` 8.72.2, que ainda exige `^10` |
| `npm run check` | Passa (unitários 32 de 32) |
| Build com a rede de saída bloqueada | Passa |
| E2E | 191 de 191 (desktop e os 3 perfis medidos do Galaxy A15): rotas PT/EN, 404 por idioma com e sem JavaScript, redirecionamentos, fontes locais, diagnóstico de viewport |
| Vercel | Node 24.x; Vercel Authentication ativa; nenhuma variável de ambiente; nenhum domínio próprio; último preview (`2d9363e`) pronto; nenhuma publicação de produção ativa |
| Dependências | Next.js 16.4.6 saiu em 09/11 só com correções de bugs (sem segurança); pela regra dos 7 dias, pode entrar a partir de 16/11 |

**Conclusão:** todos os critérios técnicos da Fase 1 estão satisfeitos. **O encerramento depende só do merge da PR #1 por Rafa.**

**Efeito do merge, a confirmar por Rafa (texto original da auditoria):** a Vercel publica a primeira versão de produção em `rafaelzovic-dev-rdz14.vercel.app`. Com a proteção no modo "todas as publicações, exceto domínios do projeto", esse endereço provavelmente fica acessível sem login (é o que acontece com a URL de produção de outros projetos da conta). Continua sem indexação (T5), sem visual e sem as ferramentas de preview. Recomendação para o merge: usar "Create a merge commit" (não "Squash"), porque a PR da Fase 2 é empilhada sobre esta branch.

**Atualização (2026-11-13, E13 e T6):** a autorização complementar de Rafa proíbe publicar em produção sem autorização expressa e lembra que `noindex` não é autenticação. A documentação da Vercel confirma que, com a proteção atual, o endereço de produção do projeto fica público. Por isso, antes do merge, esta branch passou a ter um `vercel.json` que desliga a publicação automática **só da `main`** (`git.deploymentEnabled`), com um teste unitário que confere a regra. Efeito: o merge da PR #1 não publica nada em produção; os previews das branches continuam protegidos. A publicação volta a ser ligada na Fase 7, com autorização de Rafa.

**T6 aprovada por Rafa (2026-11-13), com condição:** bloquear só os deploys automáticos da `main`, com os previews funcionando e protegidos. Verificado: os previews de `13617ad` (esta branch) e `391ac23` (Fase 2) foram gerados depois do `vercel.json`. Consulta de leitura na Vercel no mesmo dia: nenhuma publicação de produção ativa (a única da história, de 2026-11-06, foi cancelada antes do build); Vercel Authentication ativa; nenhuma variável de ambiente; nenhum domínio próprio; configuração do projeto sem alteração desde a criação. O domínio de produção do projeto, pela API, é `rafaelzovic-dev.vercel.app`. A conferência obrigatória antes de qualquer merge e o procedimento de reativação estão em [`ARCHITECTURE.md`](ARCHITECTURE.md) §10.1. Por decisão de Rafa (E14), nenhuma PR é mergeada por enquanto.

Reconferência no mesmo dia: PR #1 aberta e sem conflitos; base `main` inalterada desde `b869a2c` (só os documentos de Rafa); CI verde nas execuções de push e de PR do `935613f`; 11 commits na branch.

## Fora do escopo desta fase

- Qualquer visual: cores, tipografia, grid, componentes (Fase 2).
- `lucide-react` e `@axe-core/playwright` (instalados quando usados).
- Perfis de iPhone em WebKit e os testes de primeira dobra (Fase 3). O Galaxy A15 já entrou na Fase 1 com valores medidos (E11).

## Como revisar

1. Ler as decisões T1–T5 e responder à pergunta de T2.
2. Autorizar (ou não) a criação do projeto na Vercel.
3. Opcional, localmente: `npm ci`, `npm run check`, `npx playwright install chromium`, `npm run test:e2e`.

## Registro de aprovação

| Data | Decisão | Observações |
|---|---|---|
| 2026-11-06 | Decisões T1, T3, T4, T5 aprovadas; T2 substituída por T2.1; Vercel autorizada com limites | Ajustes aplicados nesta rodada. Fase 2 não autorizada. |
| 2026-11-13 | Auditoria de encerramento: todos os critérios técnicos satisfeitos | Ver "Auditoria de encerramento". Fase 2 autorizada (E12), empilhada sobre esta branch. |
| 2026-11-13 | Rafa considera a auditoria da Fase 1 concluída (E13) | Merge só com autorização específica. T6 (publicação automática da `main` desligada) acrescentada antes do merge. |
| 2026-11-13 | T6 aprovada com condição (só a `main`; previews funcionando e protegidos) | Conferência antes do merge e reativação na Fase 7 documentadas (ARCHITECTURE §10.1). |
| 2026-11-14 | Merge da PR #1 (E16) | Executado por Claude com autorização expressa de Rafa: *merge commit* `d5cd387` (pais `b869a2c` e `70579ad`), sem *squash* e sem reescrita de histórico; a árvore da `main` ficou idêntica à da branch verificada. Antes: conferência da ARCHITECTURE §10.1 (T6 no `vercel.json`, CI verde, nenhuma publicação de produção, Vercel Authentication ativa, nenhum domínio próprio, nenhuma variável). Depois: nenhuma publicação criada pela Vercel para a `main`. A branch `fase-1/fundacao` foi mantida. |
