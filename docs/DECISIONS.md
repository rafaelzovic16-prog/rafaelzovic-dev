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

### Validação de Rafa (2026-11-06)

| # | Decisão / observação de Rafa | Status |
|---|---|---|
| T1 | Aprovada. Manter os testes de 404 por idioma, de funcionamento sem JavaScript e de rotas desconhecidas. **Documentar o impacto do proxy** → [`ARCHITECTURE.md`](ARCHITECTURE.md) §4.1. | Aprovada |
| T2.1 | **Fontes com `next/font/local`, com os arquivos dentro do repositório**: independência de serviços externos também durante o build. Substitui T2. | Aprovada (implementada na Fase 1) |
| T3 | Aprovado manter o ESLint 9, pela compatibilidade com o Next.js 16.4.5. | Aprovada |
| T4 | Aceitos **temporariamente** os 8 alertas moderados das ferramentas de desenvolvimento. Mantê-los documentados e monitorar atualizações e correções → [`DEPENDENCIES.md`](DEPENDENCIES.md) §7.3. | Aprovada (temporária) |
| T5 | Aprovada. O site permanece fora dos índices de buscadores até a publicação oficial. | Aprovada |

### Autorizações e dados registrados na mesma validação

| # | Registro | Data | Status |
|---|---|---|---|
| E6 | **Vercel autorizada:** criar o projeto `rafaelzovic-dev`, conectado ao repositório GitHub. Limites: não comprar domínio; não contratar serviços pagos; não adicionar variáveis ou integrações desnecessárias; não alterar configurações de outros projetos; manter a proteção e a não indexação dos previews. | 2026-11-06 | Aprovada |
| E7 | **Aparelho de referência:** Samsung Galaxy A15, **Google Chrome**. Viewport de referência inicial 412 × 892 CSS px, a confirmar no aparelho. **Área útil medida com as barras do Chrome abertas, sem depender de estimativas.** | 2026-11-06 | Aprovada |
| E8 | A Fase 2 **não** está autorizada. O merge da PR #1 depende da validação do resultado final e dos critérios da Fase 1 por Rafa. | 2026-11-06 | Registrada |
| E11 | **Medição real do Galaxy A15 no Chrome** (diagnóstico `/medir` enviado por Rafa): 400 × 766 com as barras visíveis, 400 × 822 com a barra recolhida, 837 × 299 na horizontal; densidade 2,7; tela 400 × 867. Substitui a referência inicial 412 × 892. Viram três perfis no Playwright, que já rodam a suíte da Fase 1. | 2026-11-07 | Registrada |
| E10 | **Diagnóstico de viewport com APIs nativas** do navegador: `window.innerWidth`/`innerHeight`, `screen.width`/`height`, `window.devicePixelRatio`, `window.visualViewport` e `screen.orientation`, registrando as variações causadas pelas barras do Chrome e pela interface do Android. A página `/specimen` **continua na Fase 2**; a Fase 2 não é antecipada para a medição. Os dados reais do aparelho complementam os testes do Playwright. | 2026-11-06 | Aprovada |
| E9 | **Página de medição no preview autorizada:** `/medir`, ferramenta interna para medir a área útil do Galaxy A15 no Chrome (E7). Só existe em previews da Vercel (e no servidor de desenvolvimento); em produção responde 404. | 2026-11-06 | Aprovada |

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
