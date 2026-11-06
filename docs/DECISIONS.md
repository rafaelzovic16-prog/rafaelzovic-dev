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

## C — Conteúdo

| # | Regra | Data | Status |
|---|---|---|---|
| C1 | Link para repositório só aparece se o repositório for público. Em 2026-11-05, `saldozen-financeiro` e `qualyt-trend` são **privados**: os estudos de caso mostram a indicação "repositório privado" e apresentam a evidência como trecho ou captura. | 2026-11-05 | Aprovada (regra do plano técnico §5) |
| C2 | Nenhum texto, número, funcionalidade, cliente, resultado ou competência é publicado sem fonte verificável ou confirmação de Rafa. | 2026-11-05 | Aprovada (Briefing §15.4) |
