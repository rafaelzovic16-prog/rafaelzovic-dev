# Registro de decisões

Toda decisão que refina, completa ou substitui um trecho de [`BRIEFING.md`](BRIEFING.md) fica registrada aqui, com data e origem.
Uma decisão só muda com nova aprovação explícita de Rafa, registrada como uma nova linha (nunca editando a anterior).

Legenda de status: **Aprovada** · **Proposta** (aguarda aprovação) · **Substituída**.

---

## D — Direção visual e especificação de design

| # | Decisão | Substitui / refina | Data | Status |
|---|---|---|---|---|
| D1 | Posicionamento PT: "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer." | Briefing §2, apresentação PT | 2026-11-05 | Aprovada |
| D2 | Posicionamento EN: "Web Developer in training, working towards becoming a Software Engineer." Equivalência de significado entre os idiomas. | Briefing §2, apresentação EN | 2026-11-05 | Aprovada |
| D3 | Hero, Projetos e Sobre em Bone; Competências e Contato em Charcoal, como um bloco escuro contínuo (transição editorial do claro para o escuro). | Briefing §6.6 (estende o Charcoal a Competências) | 2026-11-05 | Aprovada |
| D4 | Fotografia em cores naturais com saturação reduzida em ≈ 15%, aplicada na exportação. | Briefing §5 (detalha o tratamento) | 2026-11-05 | Aprovada |
| D5 | Ordem dos projetos: 01 Qualyt Trend · 02 SaldoZen. | — | 2026-11-05 | Aprovada |
| D6 | "Menos ruído. Mais intenção." como assinatura conceitual, com o posicionamento profissional claramente visível na primeira dobra. | Briefing §6.2 | 2026-11-05 | Aprovada |
| D7 | O H1 é o posicionamento profissional; a frase conceitual é um elemento display que não é título. | — | 2026-11-05 | Aprovada |
| D8 | A frase de apresentação do briefing sai do hero e orienta a abertura da seção Sobre. | Briefing §2 e §6.2 | 2026-11-05 | Aprovada |
| D9 | "Início" entra na navegação; os links do menu não têm numeração (a numeração fica só nos rótulos de seção). | Corrige a v1.0 da proposta | 2026-11-05 | Aprovada |

Cuidados registrados na aprovação da especificação v1.1:

- **Mobile:** priorizar a compreensão imediata do posicionamento e o acesso aos projetos; a fotografia não pode prejudicar a hierarquia nem alongar demais a primeira experiência. → aplicado como **P6 / ajuste M1**.
- **Autoridade:** construída com evidências reais dos projetos, decisões técnicas e documentação, sem exagerar competências, experiência ou funcionalidades. → aplicado no modelo de conteúdo ([`ARCHITECTURE.md`](ARCHITECTURE.md) §5) e nos testes de conteúdo ([`VALIDATION.md`](VALIDATION.md)).

---

## P — Plano técnico

| # | Decisão | Substitui / refina | Data | Status |
|---|---|---|---|---|
| P1 | Repositório independente `rafaelzovic16-prog/rafaelzovic-dev`, separado do SaldoZen. Criado por Rafa (público). | — | 2026-11-05 | Aprovada |
| P2 | Internacionalização sem biblioteca: dois layouts raiz (um por idioma) em grupos de rotas, dicionários tipados, mapa de rotas e âncoras. | — | 2026-11-05 | Aprovada |
| P3 | **Framer Motion fora da v1.** Movimento com CSS e um observador de rolagem. Motivo: o Motion grava o estado inicial (ex.: opacidade 0) no HTML do servidor, deixando o conteúdo invisível sem JavaScript, o que viola o Briefing §12. Volta apenas como nova proposta, se houver necessidade real. | Briefing §10 (stack) | 2026-11-05 | Aprovada |
| P4 | Conteúdo em TypeScript tipado, com validação de evidência, em vez de MDX. | — | 2026-11-05 | Aprovada |
| P5 | Estrutura de i18n na Fase 1; textos EN escritos junto com os PT; a Fase 5 vira revisão, metadados e seletor. | Briefing §16 (ordem das fases) | 2026-11-05 | Aprovada |
| P6 | Ajuste mobile M1: no hero mobile, posicionamento e link "Projetos" antes da foto; foto em 3 de 4 colunas. | Especificação v1.1 §9.3 | 2026-11-05 | Aprovada |
| P7 | Repositório ligado à Vercel a partir da Fase 1, para previews de validação, respeitando as permissões e autorizações específicas de cada ação. | — | 2026-11-05 | Aprovada |

---

## A — Ajustes obrigatórios ao plano técnico

| # | Regra | Onde é aplicada | Data | Status |
|---|---|---|---|---|
| A1 | Verificar compatibilidade e estabilidade de cada dependência antes de instalar. Não copiar versões do SaldoZen sem validação. | [`DEPENDENCIES.md`](DEPENDENCIES.md) | 2026-11-05 | Aprovada |
| A2 | A primeira dobra mobile é validada com Playwright em navegador real, com fontes carregadas e viewport efetivo do Safari. | [`VALIDATION.md`](VALIDATION.md) §3 | 2026-11-05 | Aprovada |
| A3 | Testes automatizados e avaliação visual humana são separados. CI verde não significa aprovação estética. | [`VALIDATION.md`](VALIDATION.md) §1–2 | 2026-11-05 | Aprovada |
| A4 | Lighthouse Performance ≥ 95 é meta, nunca justificativa para comprometer o design. | [`VALIDATION.md`](VALIDATION.md) §4 | 2026-11-05 | Aprovada |
| A5 | Evitar abstrações e componentes desnecessariamente complexos. Priorizar simplicidade, manutenção e fidelidade à especificação visual. | [`ARCHITECTURE.md`](ARCHITECTURE.md) §1 | 2026-11-05 | Aprovada |
| A6 | Não alterar a identidade visual aprovada durante a implementação sem autorização. | Todas as fases | 2026-11-05 | Aprovada |

---

## G — Governança do projeto

| # | Regra | Data | Status |
|---|---|---|---|
| G1 | Nenhuma fase avança automaticamente. Cada fase começa somente com aprovação explícita de Rafa. | 2026-11-05 | Aprovada |
| G2 | Nenhuma compra de domínio ou contratação de serviço sem autorização explícita. | 2026-11-05 | Aprovada |
| G3 | O SaldoZen permanece completamente separado: nada deste projeto é gravado no repositório dele. O conteúdo sobre o SaldoZen usa o repositório dele apenas como fonte de leitura. | 2026-11-05 | Aprovada |

---

## E — Aprovação da Fase 0

| # | Decisão | Data | Status |
|---|---|---|---|
| E1 | Fase 0 aprovada integralmente; início da Fase 1 autorizado. A Fase 2 só começa após apresentação e validação do resultado da Fase 1. | 2026-11-06 | Aprovada |
| E2 | Versões e dependências propostas em [`DEPENDENCIES.md`](DEPENDENCIES.md) aprovadas (com reverificação imediatamente antes da instalação, conforme a política). | 2026-11-06 | Aprovada |
| E3 | Aparelho de Rafa: **Samsung Galaxy A15**. A estratégia de testes mobile considera o viewport real desse aparelho. | 2026-11-06 | Aprovada |
| E4 | Perfil GitHub a exibir: `rafaelzovic16-prog`. | 2026-11-06 | Aprovada |
| E5 | `CLAUDE.md` é parte permanente da documentação e da governança do projeto. | 2026-11-06 | Aprovada |

---

## T — Decisões técnicas da Fase 1

Surgiram da implementação e do protótipo obrigatório (guardrail 10). Evidências em [`FASE-1.md`](FASE-1.md). **Aprovadas por Rafa em 2026-11-06**, com as observações da tabela seguinte; T2 foi substituída por T2.1.

| # | Decisão | Motivo | Data | Status |
|---|---|---|---|---|
| T1 | Páginas 404 por idioma entregues por um **proxy** (`proxy.ts`), em vez da rota "pega-tudo" prevista em P2. | O plano original entrega HTML vazio sem JavaScript no Next 16. O proxy mantém a especificação (uma 404 por idioma, `lang` correto, status 404, sem JavaScript) sem recurso experimental. Custo: o proxy roda em cada requisição de página. | 2026-11-06 | Aprovada (2026-11-06) |
| T2 | Fontes por `next/font/google`: baixadas no build e servidas pelo próprio site. | Nenhuma requisição externa no navegador (testado). Interpretação de "fontes locais" a confirmar; a alternativa é versionar os arquivos e usar `next/font/local`. | 2026-11-06 | Substituída por T2.1 |
| T3 | ESLint 9.39.5 mantido, embora o npm marque a linha 9 como "não mais suportada". | O modelo oficial do Next.js 16.4.5 ainda usa ESLint 9, e os plugins do `eslint-config-next` não aceitam o 10. Ferramenta só de desenvolvimento. | 2026-11-06 | Aprovada (2026-11-06) |
| T4 | Alerta moderado em dependência de desenvolvimento (`minimatch` via `typescript-eslint`) aceito; o CI bloqueia qualquer alerta moderado ou acima em dependências de produção. | A correção exigiria forçar uma versão fora da faixa declarada pelo pacote. Não afeta o site publicado. | 2026-11-06 | Aprovada (2026-11-06) |
| T5 | O site pede para não ser indexado (robots.txt e meta `noindex`) até a publicação aprovada; a liberação é a variável `SITE_INDEXABLE=true`, só em produção. | Ao conectar a Vercel, a `main` vira um endereço público `*.vercel.app` com o site incompleto. | 2026-11-06 | Aprovada (2026-11-06) |
| T6 | **Publicação automática da `main` desligada na Vercel** até a Fase 7: `vercel.json` com `git.deploymentEnabled` = `{ "main": false }`. As outras branches continuam gerando previews protegidos. Um teste unitário confere a regra. | A `main` é a branch de produção do projeto. Com a proteção atual ("todas as publicações, exceto domínios do projeto"), o endereço de produção `rafaelzovic-dev-rdz14.vercel.app` é domínio do projeto e fica público. Sem T6, o merge da PR #1 publicaria o site incompleto sem autorização expressa (E13, regra 5); `noindex` não é autenticação (E13, regra 9). Arquivo versionado e reversível; nenhuma configuração do projeto na Vercel muda. | 2026-11-13 | Proposta — aplicada na PR #1 antes do merge |

### Validação de Rafa (2026-11-06)

| # | Decisão / observação de Rafa | Status |
|---|---|---|
| T1 | Aprovada. Manter os testes de 404 por idioma, de funcionamento sem JavaScript e de rotas desconhecidas. **Documentar o impacto do proxy** → [`ARCHITECTURE.md`](ARCHITECTURE.md) §4.1. | Aprovada |
| T2.1 | **Fontes com `next/font/local`, com os arquivos dentro do repositório**: independência de serviços externos também durante o build. Substitui T2. | Aprovada (implementada na Fase 1) |
| T3 | Aprovado manter o ESLint 9, pela compatibilidade com o Next.js 16.4.5. | Aprovada |
| T4 | Aceitos **temporariamente** os 8 alertas moderados das ferramentas de desenvolvimento. Mantê-los documentados e monitorar atualizações e correções → [`DEPENDENCIES.md`](DEPENDENCIES.md) §7.3. | Aprovada (temporária) |
| T5 | Aprovada. O site permanece fora dos índices de buscadores até a publicação oficial. | Aprovada |

### Validação de Rafa (2026-11-13) — T6

| # | Decisão / observação de Rafa | Status |
|---|---|---|
| T6 | Aprovada, **com a condição de bloquear somente os deploys automáticos da `main`**, mantendo os previews funcionando e protegidos. Manter documentado como reativar a produção na Fase 7 → [`ARCHITECTURE.md`](ARCHITECTURE.md) §10.1. **Antes de qualquer merge**, confirmar de novo que a configuração está correta e que não existe publicação de produção ativa nem exposição indevida (lista de conferência na mesma seção). Verificado na aprovação: os previews de `fase-1/fundacao` (`13617ad`) e `fase-2/sistema-visual` (`391ac23`) foram gerados depois do `vercel.json`. Correção de dado: pela API da Vercel, o domínio de produção do projeto é `rafaelzovic-dev.vercel.app`; `rafaelzovic-dev-rdz14.vercel.app`, citado na linha T6, também aparece entre os endereços do projeto. | Aprovada (condicional) |
| E14 | Nenhuma PR é mergeada por enquanto. Rafa valida o `/specimen` no Galaxy A15 e envia o diagnóstico; depois, fechamento formal da Fase 2 e decisão sobre os merges. | Registrada |

### Autorizações e dados registrados na mesma validação

| # | Registro | Data | Status |
|---|---|---|---|
| E6 | **Vercel autorizada:** criar o projeto `rafaelzovic-dev`, conectado ao repositório GitHub. Limites: não comprar domínio; não contratar serviços pagos; não adicionar variáveis ou integrações desnecessárias; não alterar configurações de outros projetos; manter a proteção e a não indexação dos previews. | 2026-11-06 | Aprovada |
| E7 | **Aparelho de referência:** Samsung Galaxy A15, **Google Chrome**. Viewport de referência inicial 412 × 892 CSS px, a confirmar no aparelho. **Área útil medida com as barras do Chrome abertas, sem depender de estimativas.** | 2026-11-06 | Aprovada |
| E8 | A Fase 2 **não** está autorizada. O merge da PR #1 depende da validação do resultado final e dos critérios da Fase 1 por Rafa. | 2026-11-06 | Registrada |
| E16 | **Autorização explícita (Rafa): fechamento das Fases 1 e 2 e início da Fase 3.** **Fase 2 aprovada**: identidade visual, sistema de design e validação responsiva; as rodadas de validação e os diagnósticos já feitos bastam, sem novas conferências manuais. **Merge da PR #1 autorizado** para Claude executar: conferir a ARCHITECTURE §10.1, usar *merge commit* (nunca *squash*), não reescrever histórico, confirmar o resultado. **Merge da PR #2 autorizado** só depois do sucesso da PR #1, com as mesmas regras, mais base em `main`, nova conferência da §10.1 e verificação de CI, conflitos e estado. Se uma condição falhar, interromper e informar, sem improvisar. **Fase 3 autorizada** depois dos dois merges; conteúdos pessoais pendentes (fotografia, LinkedIn, e-mail, WhatsApp, Sobre, "Como trabalho", frases das competências) entram como pendências claramente identificadas, sem inventar e sem bloquear a implementação. **Não inclui** publicação em produção, reativação do deploy automático da `main`, domínio, DNS, indexação nem serviços pagos (Fase 7). | 2026-11-14 | Aprovada |
| E15 | **Diagnóstico físico do Galaxy A15 e validação responsiva geral (Rafa):** o diagnóstico do `/specimen` no aparelho (vertical 400 × 766, faixa mobile, conteúdo de 360 px, 4 × 78 px / 16 px; horizontal 837 × 355, faixa tablet, 719,9 px, 8 × 72,5 px / 20 px; densidade 2,7; escala 1) é **evidência complementar**. O Galaxy A15 é referência física, não alvo de otimização: nenhum ajuste específico para ele sem um defeito real e generalizável; nenhuma nova coleta manual nesta etapa. Validar a matriz geral (320 a 1920 px, incluindo 360, 400 e 837, e paisagem com pouca altura) com testes automatizados e capturas; corrigir só defeitos comprovados do escopo da Fase 2, documentando cada um; sem merge, sem produção, sem mudança na Vercel, sem avanço automático para a Fase 3. Resultado em [`FASE-2.md`](FASE-2.md). | 2026-11-13 | Aprovada |
| E13 | **Autorização complementar (Rafa):** S3 aprovada (margens dentro do container de 1440 px); S1–S8 mantidas como implementadas, desde que respeitem a especificação; F2-1: corrigir os números de contraste da especificação e da documentação para os valores medidos, **sem alterar cores, opacidades ou composição**. Auditoria da Fase 1 considerada concluída; o merge da PR #1 só com autorização específica. PR #2 aprovada tecnicamente, **sem merge** até a validação de Rafa no Galaxy A15 real (Chrome), com o diagnóstico completo mantido. A Fase 3 começa só depois dessa validação e do fechamento formal da Fase 2. Regras reforçadas: nenhum commit direto na `main`; nada no repositório do SaldoZen; nenhum outro projeto da Vercel alterado; previews protegidos pela Vercel Authentication; **nenhuma publicação em produção sem autorização expressa**; nenhuma compra, mudança de DNS ou serviço pago; nenhuma variável de ambiente desnecessária; nenhum controle de segurança removido para testes; `noindex` não é autenticação; `CLAUDE.md` e a documentação de governança preservados. Testes manuais só são declarados quando executados de fato. | 2026-11-13 | Aprovada |
| E12 | **Prompt mestre de continuidade (Rafa):** autoriza a execução das Fases 2 a 7 dentro da governança registrada — uma branch e uma PR por fase, preview protegido, nenhum merge automático (o merge continua sendo de Rafa), e nenhuma fase dependente começa antes de a anterior ser validada. Nenhuma compra de domínio e nenhuma publicação oficial sem autorização específica. Detalhes registrados: `/medir` passa a fazer parte de `/specimen` (Fase 2); a matriz de capturas inclui também 412 × 708; o contexto da Qualyt Trend inclui integração com OlaClick e o trabalho de auditoria e contenção (a confirmar com evidência na Fase 4). Como a Fase 2 não depende da Fase 1 estar na `main`, ela é desenvolvida numa branch empilhada sobre a da Fase 1, com PR própria. | 2026-11-13 | Aprovada |
| E11 | **Medição real do Galaxy A15 no Chrome** (diagnóstico `/medir` enviado por Rafa): 400 × 766 com as barras visíveis, 400 × 822 com a barra recolhida, 837 × 299 na horizontal; densidade 2,7; tela 400 × 867. Substitui a referência inicial 412 × 892. Viram três perfis no Playwright, que já rodam a suíte da Fase 1. | 2026-11-07 | Registrada |
| E10 | **Diagnóstico de viewport com APIs nativas** do navegador: `window.innerWidth`/`innerHeight`, `screen.width`/`height`, `window.devicePixelRatio`, `window.visualViewport` e `screen.orientation`, registrando as variações causadas pelas barras do Chrome e pela interface do Android. A página `/specimen` **continua na Fase 2**; a Fase 2 não é antecipada para a medição. Os dados reais do aparelho complementam os testes do Playwright. | 2026-11-06 | Aprovada |
| E9 | **Página de medição no preview autorizada:** `/medir`, ferramenta interna para medir a área útil do Galaxy A15 no Chrome (E7). Só existe em previews da Vercel (e no servidor de desenvolvimento); em produção responde 404. | 2026-11-06 | Aprovada |

---

## S — Interpretações técnicas da Fase 2

Pontos em que a especificação não define o detalhe, resolvidos na implementação do sistema visual sem alterar cor, tipografia, grid ou composição aprovados. Motivos e evidências em [`FASE-2.md`](FASE-2.md). **Aguardam a validação de Rafa.**

| # | Interpretação | Data | Status |
|---|---|---|---|
| S1 | Tipografia interpolada linearmente entre 375, 768 e 1440 px, com os valores exatos da especificação nessas larguras; display de 44 px abaixo de 380 px e de 48 a 64 px entre 380 e 768 px (M1). | 2026-11-13 | Proposta |
| S2 | Alturas de linha por faixa (mobile < 768 ≤ tablet < 1024 ≤ desktop), sem interpolação. | 2026-11-13 | Proposta |
| S3 | O container de 1440 px inclui as margens: conteúdo de 1238 px em 1440 de largura e de 1216 px a partir de ~1600. | 2026-11-13 | Proposta — pergunta para Rafa |
| S4 | Hover de links e botões com sublinhado Sage e seta de 4 px; `:active` no toque; foco só com o contorno. | 2026-11-13 | Proposta |
| S5 | `/specimen` liberado pela variável de sistema `VERCEL_ENV`, sem a variável `ENABLE_SPECIMEN` prevista. `/medir` foi incorporado ao `/specimen` (E12) e deixou de existir. | 2026-11-13 | Proposta |
| S6 | Container, regra e grid como utilitários CSS; `ButtonLink`; setas → ↓ ↗ ↑ no `IndexLink` (← na Fase 4); `Figure` e `MetaTable` na Fase 4. | 2026-11-13 | Proposta |
| S7 | Alvo de toque de 48 px garantido pela composição das seções (Fase 3), não pelo link isolado. | 2026-11-13 | Proposta |
| S8 | Token semântico `placeholder` (Stone) para molduras pendentes. | 2026-11-13 | Proposta |
| F2-1 | Contrastes medidos diferem de três aproximações da DESIGN-SPEC §3.2 (ivory sobre Charcoal 14,2:1; graphite 72% 6,7:1; ivory 70% 7,6:1). Todos passam AA. Cores mantidas; proposta de corrigir só os números do documento. | 2026-11-13 | Achado — depende de Rafa |

### Validação de Rafa (2026-11-13, E13)

| # | Decisão de Rafa | Status |
|---|---|---|
| S3 | Aprovada a implementação atual: margens dentro do container de 1440 px. | Aprovada |
| S1–S8 | Mantidas como implementadas, desde que respeitem a especificação de design e não introduzam alteração visual não aprovada. | Aprovadas |
| F2-1 | Autorizada a correção dos números de contraste na especificação e na documentação, para os valores medidos, sem alterar cores, opacidades ou composição. Aplicada na DESIGN-SPEC §3.2 (com registro da correção no cabeçalho). | Resolvido |
| Fase 2 | Aprovada tecnicamente para seguir à validação visual; **sem merge** até a validação de Rafa no Galaxy A15 real. | Aguarda validação no aparelho |

---

## F3 — Divergências e interpretações da Fase 3

Evidências e opções em [`FASE-3.md`](FASE-3.md).

| # | Registro | Data | Status |
|---|---|---|---|
| F3-1 | Recuo da segunda linha da assinatura: o recuo até a coluna 3 (§9.2) invade a coluna da foto (medido: PT a 1024 px; EN a 1024, 1280 e 1440 px). Provisório: recuo de uma coluna, sem sobreposição. | 2026-11-14 | **Depende de Rafa** |
| F3-2 | Faixa "Índice" abaixo da dobra a 1440 × 800 e 1280 × 720, por causa da altura da foto 4:5 nas colunas 9–12. Implementado como especificado; dois testes marcados como falha esperada. | 2026-11-14 | **Depende de Rafa** |
| F3-3 | `min(100svh, 880px)` para a primeira tela inteira, cabeçalho incluído. | 2026-11-14 | Proposta |
| F3-4 | Assinatura com uma palavra por linha no mobile, como no wireframe da §9.3. | 2026-11-14 | Proposta |
| F3-5 | Cabeçalho no fluxo; item ativo, esconder ao rolar e borda depois do hero na Fase 6. | 2026-11-14 | Proposta |
| F3-6 | Links do menu do mobile no estilo `h2` (a §8 pede 40 px, fora da escala). | 2026-11-14 | Proposta |
| F3-7 | Legenda "Rafa · 2026" só com a foto real (ano desconhecido, C2). | 2026-11-14 | Proposta |
| F3-8 | Faixa do tablet com "Projetos (2)"; texto longo a partir de 1024 px. | 2026-11-14 | Proposta |
| F3-9 | `scroll-margin` de 16 px nos elementos focáveis, para o contorno de foco não ser cortado na borda da tela. | 2026-11-14 | Proposta |
| F3-10 | Resumo do SaldoZen igual ao do briefing, ao lado do status "Em desenvolvimento"; revisão contra o estágio real na Fase 4. | 2026-11-14 | Proposta |

---

## R — Guardrails e colaboração registrados por Rafa

Registrados por Rafa na `main` em 2026-11-05 (commit `fc69d43`), transcritos aqui sem alteração de conteúdo na reconciliação da Fase 0. Valem junto com G1–G3; em caso de dúvida, prevalece a regra mais restritiva.

### Guardrails

1. Nunca implementar no repositório saldozen-financeiro.
2. Cada fase: branch, PR, CI, preview quando aplicável, revisão do usuário e aprovação explícita antes do merge.
3. Não iniciar fase seguinte sem aprovação da anterior.
4. Funcionalidade concluída exige evidência rastreável.
5. Não inventar links, capturas, métricas, credenciais ou experiência.
6. Pendências podem existir durante desenvolvimento, mas bloqueiam release.
7. Domínio, compra, DNS e ações externas exigem autorização explícita no momento da ação.
8. Dados de contato só com confirmação.
9. Preservar funcionamento essencial sem JavaScript.
10. Limitações técnicas e divergências devem ser documentadas e aprovadas antes de mudar escopo.

### Colaboração

- Claude: implementação conforme escopo da fase.
- ChatGPT: planejamento, revisão independente e auditoria.
- Rafa: decisões, validação visual e aprovação de PR/merge.
- Nenhum agente faz merge sem autorização explícita de Rafa.

Observação sobre P7 no registro de Rafa: "Aprovado como plano; conexão pendente" — a conexão com a Vercel depende de autorização no momento da ação.

---

## C — Conteúdo

| # | Regra | Data | Status |
|---|---|---|---|
| C1 | Link para repositório só aparece se o repositório for público. Em 2026-11-05, `saldozen-financeiro` e `qualyt-trend` são **privados**: os estudos de caso mostram a indicação "repositório privado" e apresentam a evidência como trecho ou captura. | 2026-11-05 | Aprovada (regra do plano técnico §5) |
| C2 | Nenhum texto, número, funcionalidade, cliente, resultado ou competência é publicado sem fonte verificável ou confirmação de Rafa. | 2026-11-05 | Aprovada (Briefing §15.4) |
