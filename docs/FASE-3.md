# Fase 3 — Página principal

> **Status:** implementada e verificada automaticamente; **aguarda duas decisões de composição (F3-1 e F3-2) e a avaliação de Rafa**. Autorizada em 2026-11-14 (E16), depois dos merges das PRs #1 e #2.
> **Branch:** `fase-3/home`, a partir da `main` em `c52cdc4`.

## Objetivo

A home completa da DESIGN-SPEC §9, em PT e EN, com o ajuste mobile M1, sem animações (Fase 6) e sem conteúdo inventado: o que Rafa ainda vai fornecer aparece como pendência identificada.

## Entregas

| Parte | Implementação | Referência |
|---|---|---|
| Cabeçalho | Assinatura RAFA; Início · Projetos · Sobre · Contato sem numeração; PT / EN. 72 px no desktop/tablet, 56 px no mobile. "Pular para o conteúdo" é o primeiro foco. | §8, §9.2, §13; D9 |
| Menu do mobile | Sobreposição em tela cheia sobre Bone, com a Popover API: abre, fecha e responde ao Esc **sem JavaScript**; o JavaScript só fecha o menu ao escolher um link. PT/EN no rodapé do menu. | §8; ARCHITECTURE §9 |
| Hero | Meta, assinatura (elemento visual), H1 de posicionamento (D7). Desktop: texto nas colunas 1–7, foto 4:5 nas 9–12 com o topo na altura de maiúsculas do display (calculado com as métricas reais da Manrope), faixa "Índice" na base. Tablet: texto 1–5, foto 6–8. Mobile (M1): "01 Projetos" antes da foto (3 de 4 colunas, à direita) e "02 Sobre" depois. | §9.2–§9.4 |
| 01 — Trabalhos selecionados | Variantes A e B alternadas automaticamente; bloco inteiro clicável, com o foco no bloco; número de 64 px, nome, categoria, resumo, status datado, stack e "Ler estudo de caso →". Capturas pendentes em moldura Stone com o nome do projeto. | §9.5, §12 |
| 02 — Sobre | Rótulo 1–3, abertura em `lead` 4–11, corpo, "Como trabalho" com os temas aprovados (Intenção · Engenharia · Evolução). Textos pendentes. | §9.6; D8 |
| 03 — Competências (Charcoal) | As seis áreas do briefing (frase e evidência pendentes) e o registro técnico "Usado em projetos", derivado das stacks, com linha pontilhada e link para cada projeto. "Em estudo" pendente. | §9.7; Briefing §6.5 |
| 04 — Contato (Charcoal) | GitHub (`rafaelzovic16-prog`, E4) em `contact-xl`, com seta ↗ e regra que fica Sage no hover. LinkedIn, e-mail e a decisão sobre o WhatsApp pendentes: **nenhum endereço inventado**. | §9.8 |
| Rodapé | RAFA · Menos ruído. Mais intenção. · © ano · PT/EN · Topo ↑, com os links do menu, sobre Charcoal, continuando o bloco escuro. | §9.9 |
| 404 e estudos de caso | Mesmo cabeçalho e rodapé, com os tokens do site. O estudo de caso completo é a Fase 4. | §10, §11 |

Bone: hero, Projetos e Sobre. Charcoal: Competências, Contato e rodapé, num único bloco contínuo (D3).

### Conteúdo usado e de onde vem (C2)

| Conteúdo | Fonte |
|---|---|
| Posicionamento, assinatura, meta | Textos aprovados (D1, D2, D7; DESIGN-SPEC §2) |
| Categoria e resumo de cada projeto | Texto do próprio Rafa no Briefing §6.3; o inglês é tradução, revisada na Fase 5 |
| Status "Em desenvolvimento" | Qualyt Trend: registro de Rafa (commit `b869a2c`, 2026-11-05). SaldoZen: README e histórico verificados em 2026-11-05 |
| Stack | Qualyt Trend: Briefing §6.3 (Next.js, Supabase), a conferir no repositório na Fase 4. SaldoZen: `package.json` verificado (Next.js, React, TypeScript, Tailwind CSS); Supabase, que está só planejado, **não** aparece |
| Áreas de competência | Briefing §6.5 |
| GitHub | E4 |

### Pendências marcadas na página

Cada pendência mostra o nome do item e "— pendente" (EN: "— pending") e leva o atributo `data-pending`, para o `check:release` da Fase 7 bloquear a publicação: fotografia; capturas dos dois projetos; abertura e texto do Sobre; as três afirmações de "Como trabalho"; frase e evidência das seis áreas; lista "Em estudo"; LinkedIn; e-mail; decisão sobre o WhatsApp. São 18 marcadores por idioma (contados no navegador), nenhum com texto provisório que pareça real.

## Decisões que dependem de Rafa

Divergências entre a especificação e a medição real, registradas antes de qualquer mudança de composição (A6). A implementação atual é provisória e está indicada em cada uma.

### F3-1 — Recuo da segunda linha da assinatura

A especificação desenha "Mais intenção." com recuo até a coluna 3. Medido com a fonte real, esse recuo faz a linha avançar sobre a coluna da foto:

| Largura | PT, recuo até a col. 3 | EN, recuo até a col. 3 |
|---|---|---|
| 1440 | termina 23 px antes da foto | **invade 13 px** |
| 1280 | 2 px antes da foto | **invade 31 px** |
| 1024 | **invade 30 px** | **invade 58 px** |

**Implementado (provisório):** recuo de uma coluna (até a col. 2). Nenhuma sobreposição em nenhuma largura, nos dois idiomas (teste "assinatura e foto sem sobreposição"). A linha não quebra no desktop e avança até a coluna 8, nunca sobre a foto.

**Opções:** (a) manter o recuo de uma coluna; (b) recuo até a col. 3 só onde couber (1440 e acima, só em PT), com uma coluna nos outros casos; (c) sem recuo.

### F3-2 — Faixa "Índice" na primeira tela do desktop

Com a foto 4:5 nas colunas 9–12 (397 × 496 px em 1440; 351 × 439 px em 1280), o hero fica mais alto que a estimativa da §9.2 (≈ 684 px, que não considerava a altura da foto). Resultado: H1 visível em todas as larguras, mas a faixa "Índice" termina em 837 px a 1440 × 800 e em 803 px a 1280 × 720, abaixo da dobra (critério da VALIDATION §3.5). Em 1440 × 900, 1920 × 1080 e 1024 × 768, a faixa fica visível.

**Implementado:** a especificação como aprovada. Os dois casos aparecem na suíte como **falhas esperadas** (`test.fail`), para não sumirem.

**Opções:** (a) foto em 3 colunas no desktop (10–12): a faixa cabe nas duas larguras; a proporção texto : foto vira ≈ 7 : 3; (b) manter a foto e reduzir os espaços verticais do hero em telas baixas (↕112 acima do meta e ↕64 acima da faixa); (c) aceitar a faixa abaixo da dobra nessas duas larguras e ajustar o critério.

## Interpretações técnicas (sem mudança de identidade)

| # | Interpretação | Motivo |
|---|---|---|
| F3-3 | `min(100svh, 880px)` vale para a primeira tela inteira, cabeçalho incluído. | Sem isso, a primeira tela passaria a altura da janela exatamente pelos 72 px do cabeçalho. |
| F3-4 | Mobile: a assinatura fica com uma palavra por linha ("Menos / ruído. / Mais / intenção."), como desenhado na §9.3. | O wireframe mostra quatro linhas; com elas, a primeira dobra medida a 375 × 548 dá 503 px, exatamente a estimativa da especificação. |
| F3-5 | Cabeçalho no fluxo da página. Item ativo (■ Sage), esconder ao rolar e borda depois do hero entram com os movimentos da Fase 6. | São comportamentos de rolagem; a Fase 3 é "ainda sem animações". Sem eles, nada fica escondido nem indisponível. |
| F3-6 | Links do menu do mobile no estilo `h2` (34 px no mobile). | A §8 pede 40 px, que não existe na escala tipográfica; `h2` é o mais próximo e mantém a escala. |
| F3-7 | A legenda "Rafa · 2026" da foto só entra com a foto real. | O ano da foto não é conhecido (C2). |
| F3-8 | No tablet, a faixa usa "Projetos (2)"; "Projetos selecionados (2)" a partir de 1024 px. | O texto longo quebrava em duas linhas nas 3 colunas do tablet. |
| F3-9 | Ao navegar pelo teclado, o elemento focado para a 16 px da borda da tela (`scroll-margin`). | Sem isso, o contorno de foco (2 px + 3 px de afastamento) ficava cortado na borda, achado pelos testes de teclado. |
| F3-10 | O resumo do SaldoZen é o texto do briefing ("com foco em estruturação de dados, segurança e experiência de uso"), ao lado do status "Em desenvolvimento". | Descreve o foco do projeto, não funcionalidades prontas; a redação final é revisada contra o estágio real na Fase 4. |

## Verificação automatizada

Ambiente de desenvolvimento, Node 24, build de produção:

| Verificação | Resultado |
|---|---|
| `npm run check` | Verde; 52 testes unitários (7 novos em `tests/unit/conteudo.test.ts`) |
| Testes E2E (Chromium) | 314 aprovados, incluindo 2 falhas esperadas (F3-2); 33 capturas puladas |
| WebKit (iPhone e desktop) | Só no CI (não instalado aqui): 19 testes de primeira dobra |

`tests/e2e/home.spec.ts`, em PT e EN:

- **Primeira dobra mobile (A2):** H1 e linha "01 Projetos" inteiras na área efetiva, com Manrope e Inter carregadas, no Galaxy A15 medido e nos viewports de iPhone da VALIDATION §3.3; a linha vem antes da foto (M1). Medido: 496 px a 400 × 766 e 503 px a 375 × 548 (estimativa da especificação: 503).
- **Primeira dobra desktop (§3.5):** H1 e faixa visíveis em 1440 × 900, 1920 × 1080 e 1024 × 768; 1440 × 800 e 1280 × 720 dependem de F3-2.
- **Assinatura × foto:** sem sobreposição em 768, 837, 1024, 1280, 1440 e 1920 px.
- **Layout em toda a matriz** (13 viewports × 2 idiomas): sem rolagem horizontal, nenhum elemento fora da tela, nada vazando da própria caixa, controles sem sobreposição e com 48 px.
- **Estrutura e conteúdo:** um H1; seções 01–04 na ordem; Competências, Contato e rodapé no bloco Charcoal; projetos na ordem D5 com status datado; só o link do GitHub; nenhum link de LinkedIn, e-mail, telefone ou WhatsApp; as 18 pendências marcadas, todas com "pendente"/"pending".
- **Menu:** abre, leva à seção e fecha; Esc fecha; funciona sem JavaScript.
- **Teclado** (400 × 766, 837 × 299, 1440 × 900): "Pular para o conteúdo" primeiro; todos os controles com contorno de 2 px e inteiros na tela.
- **axe** (WCAG 2.2 A/AA): sem violações em 3 viewports × 2 idiomas e com o menu aberto.

Também: `tests/e2e/auditoria.ts` (auditoria de layout e percurso de teclado compartilhados com o `/specimen`), o teste sem JavaScript continua passando (com o link do projeto procurado dentro do bloco do projeto) e o CI instala o WebKit.

## Capturas

`tests/e2e/capturas.spec.ts` agora captura a home: PT nos 13 viewports da matriz (primeira tela em densidade 2; página inteira limpa e com o grid, em densidade 1), EN em 400 × 766 e 1440 × 900, e a primeira tela nos perfis medidos do Galaxy A15 (vertical, horizontal 299 e 355). 46 arquivos.

## Pendências e riscos

- **F3-1 e F3-2**: decisões de composição de Rafa.
- Conteúdo pessoal pendente (lista acima): não bloqueia o desenvolvimento, bloqueia a publicação.
- Tradução EN dos resumos e categorias: revisão na Fase 5.
- WebKit roda só no CI; a primeira execução valida os perfis de iPhone.
- Comportamentos de rolagem do cabeçalho: Fase 6 (F3-5).

## Registro de aprovação

| Data | Item | Decisão de Rafa |
|---|---|---|
| 2026-11-14 | Início da Fase 3 (E16) | Autorizado depois dos merges das PRs #1 e #2 |
| — | F3-1, F3-2 | Pendente |
| — | Home (avaliação visual) | Pendente |
