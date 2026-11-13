# Fase 2 — Sistema visual

> **Status:** implementada e verificada automaticamente; **aguarda a validação visual da identidade por Rafa** (critério do [roadmap](ROADMAP.md)). Autorizada pelo prompt mestre de 2026-11-13 (E12).
> **Branch:** `fase-2/sistema-visual`, empilhada sobre `fase-1/fundacao` (E12). A PR tem como base a branch da Fase 1; depois do merge da PR #1, a base passa a ser a `main`.

## Objetivo

Materializar a identidade aprovada (DESIGN-SPEC v1.1, §3–§6 e §12) em tokens e primitivos, e reunir tudo numa página interna, `/specimen`, que também incorpora a ferramenta de medição `/medir` (E12).

## Entregas

| Item | Onde | Observação |
|---|---|---|
| Primitivas de cor (Bone, Graphite, Stone, Sage, Charcoal) | `app/globals.css` (`:root`) | Único lugar com valores de cor; um teste unitário recusa cor em qualquer outro arquivo. |
| Tokens semânticos `surface`, `text`, `text-muted`, `rule`, `accent`, `focus` e `placeholder` | `app/globals.css` | A paleta padrão do Tailwind foi removida: só esses nomes viram classes (`bg-surface`, `text-text-muted`…). |
| Superfícies Bone e Charcoal | `[data-surface="dark"]` + `components/primitives/Surface.tsx` | A superfície troca os valores dos tokens; os componentes nunca escolhem cor. |
| Escala tipográfica fluida (9 estilos + rótulo) | utilitários `type-display`, `type-position`, `type-h2`, `type-h3`, `type-contact`, `type-lead`, `type-body`, `type-body-sm`, `type-meta`, `type-label` | Interpretação S1 e S2. |
| Escala de espaço 8–192 | espaçamento padrão do Tailwind (`2`=8 px … `48`=192 px) | Os dez valores da §5 são múltiplos de 4 px e coincidem com a escala nativa; nenhum token novo. |
| Grid editorial 4 · 8 · 12, intervalos 16 · 20 · 24 | utilitário `grid-editorial` | Colunas e intervalo mudam por faixa via variáveis CSS. |
| Container de 1440 px com margens 20 px / `clamp(24px, 7vw, 112px)` | utilitário `container-editorial` | Interpretação S3. |
| Medida de leitura de 68 caracteres | classe `max-w-measure` | Token `--container-measure`. |
| Movimento (`ease-out-editorial`, `dur-fast`, `dur-base`, `dur-reveal`, `dur-route`) | `app/globals.css` | Com `prefers-reduced-motion: reduce`, as durações caem para 150 ms e as setas não se deslocam. |
| Primitivos | `components/primitives/` | `Surface`, `SectionLabel`, `IndexLink`, `ButtonLink`, `StatusMarker`, `PhotoFrame`. Interpretação S6. |
| Estados de interação e foco | `app/globals.css` | Hover com sublinhado Sage e seta de 4 px; `:active` no toque; foco de 2 px, afastamento de 3 px, raio de 4 px na cor `focus` de cada superfície. Interpretação S4. |
| Página `/specimen` com o diagnóstico de viewport | `app/(pt)/specimen/` | Só em preview e no servidor de desenvolvimento; `noindex`; em produção, 404. `/medir` deixou de existir (agora é 404 em todos os ambientes). |
| Sobreposição do grid | botão "Mostrar grid" no `/specimen` | Usada nas capturas "com grid" (VALIDATION §2.1). |

### O que o `/specimen` mostra

`00` Diagnóstico de viewport · `01` Superfícies e cores, com contrastes medidos · `02` Tipografia, com o valor da especificação e o valor calculado pelo navegador na largura atual · `03` Grid · `04` Espaçamento e forma · `05` Componentes e estados sobre Bone · `06` Componentes e estados sobre Charcoal · `07` Movimento (tokens e a preferência de movimento do aparelho).

Os estados (repouso, hover/toque, foco) aparecem fixados lado a lado por um atributo `data-state`, para que fiquem visíveis nas capturas; os links reais continuam respondendo ao ponteiro e ao teclado.

Textos de amostra: só os textos fixos aprovados (DESIGN-SPEC §2 e nomes de seção e projeto) ou descrições do próprio sistema. Nenhum texto de conteúdo foi criado.

### Diagnóstico de viewport (antigo `/medir`)

Mantém tudo o que foi validado no Galaxy A15 (E10, E11) e acrescenta:

| Campo | Fonte |
|---|---|
| Viewport em pixels CSS: `innerWidth` × `innerHeight`, na abertura e agora | `window` |
| `devicePixelRatio` | `window` (arredondado na tela; o JSON guarda o valor exato) |
| Orientação | `screen.orientation` |
| Tela e área disponível | `screen.width/height`, `availWidth/availHeight` |
| Área visível | `visualViewport` (largura, altura, escala) |
| Variações da barra do Chrome | menor e maior altura em cada orientação |
| **Faixa ativa** (`mobile`, `tablet`, `desktop`, `desktop-1280`, `desktop-1440`) | variável CSS `--bp`, a mesma que define o layout |
| **Largura útil do conteúdo** | largura real do container, descontadas as margens |
| **Grid** (colunas, largura da coluna, intervalo) | estilo calculado do grid |
| **Dimensões dos elementos principais** (cabeçalho, amostra do display, amostra do H1, grid) | `getBoundingClientRect`, atualizado quando as fontes terminam de carregar |

**Limitações, explicadas na própria página:** todos os valores são pixels CSS informados pelo navegador. Nenhum valor físico (centímetros, pixels do painel) é calculado ou estimado. A largura em pixels CSS depende do zoom da tela do Android e do zoom do navegador; a altura útil muda com a barra do Chrome e com o teclado; `screen.availHeight` no Android nem sempre desconta a barra de navegação do sistema; `screen.orientation` pode faltar em navegadores antigos. As dimensões de elementos são as da própria página `/specimen`; a primeira dobra da home é verificada na Fase 3.

## Interpretações técnicas (para validação de Rafa)

Pontos em que a especificação não define o detalhe. Nenhum altera cor, tipografia, grid ou composição aprovados. Registrados também em [`DECISIONS.md`](DECISIONS.md) (S1–S8).

| # | Interpretação | Motivo |
|---|---|---|
| S1 | Tamanhos interpolados linearmente entre 375 (mobile), 768 (tablet) e 1440 px (desktop); abaixo de 375 vale o valor de mobile e acima de 1440, o de desktop. O display usa 44 px abaixo de 380 px (M1) e vai de 48 a 64 px entre 380 e 768. | A §4 pede valores interpolados e dá os valores nas três faixas. Os valores exatos da especificação aparecem nas larguras de referência (verificado por teste). |
| S2 | Alturas de linha mudam por faixa (mobile < 768 ≤ tablet < 1024 ≤ desktop), sem interpolação. | A §4 dá uma altura de linha por faixa; o desktop começa em 1024, onde o grid passa a 12 colunas. |
| S3 | O container de 1440 px **inclui** as margens. Em 1440 px de largura, a área de conteúdo tem 1238 px; acima de ~1600 px, a margem chega ao teto de 112 px e o conteúdo fica em 1216 px, centralizado. | A §5 não diz se as margens ficam dentro ou fora dos 1440 px. Esta é a leitura usual; a alternativa (conteúdo de até 1440 px mais as margens) deixaria a página mais larga em telas grandes. **Pergunta para Rafa.** |
| S4 | Hover de links **e botões**: sublinhado Sage desenhado da esquerda para a direita (250 ms) e seta deslocada 4 px na sua direção (na diagonal, 3 px em cada eixo). No toque, o mesmo efeito em `:active`. O foco é só o contorno (não sublinha). | §3.3 (Sage no sublinhado do hover), §6.2 e §12. Para o botão, a §12 lista "hover · foco · ativo" sem descrever o efeito; foi usado o mesmo do link. |
| S5 | `/specimen` liberado pela variável de sistema `VERCEL_ENV` (como o antigo `/medir`), em vez da variável `ENABLE_SPECIMEN` prevista na ARCHITECTURE. | Nenhuma variável nova no projeto da Vercel (E6, prompt mestre). |
| S6 | `Container`, `Rule` e o grid são utilitários CSS (`container-editorial`, `<hr>`, `grid-editorial`), não componentes. O botão se chama `ButtonLink` porque sempre leva a um endereço. `IndexLink` tem as setas → ↓ ↗ e também ↑ (rodapé "Topo ↑", §9.9); ← entra na Fase 4 ("← Projetos"). `Figure` e `MetaTable` entram na Fase 4; `Nav`, `LanguageSwitch` e o rodapé, na Fase 3. | A5: um componente só existe quando é usado; CSS antes de JavaScript. |
| S7 | O alvo de toque de 48 px (56–72 px nas linhas-índice do mobile) é garantido pela composição de cada seção na Fase 3, não pelo `IndexLink` isolado, que também aparece dentro de texto. | Evita alterar a altura de links em linha. Será verificado por teste na Fase 3. |
| S8 | Token `placeholder` (Stone) para molduras pendentes (fotografia e capturas). | Stone é só decorativo (§3.3); um nome semântico evita usar a primitiva diretamente. |

## Achado F2-1 — contrastes da especificação arredondados para cima

O teste unitário calcula o contraste WCAG 2 a partir dos valores do CSS. Todos passam AA (4,5:1), exigido em todo texto (§13), mas três números da §3.2 são otimistas:

| Par | Especificação | Medido |
|---|---|---|
| `text` sobre Bone (graphite) | ≈ 16:1 | 15,6:1 |
| `text` sobre Charcoal (ivory) | ≈ 15:1 | **14,2:1** |
| `text-muted` sobre Bone (graphite 72%) | ≈ 7:1 | **6,7:1** |
| `text-muted` sobre Charcoal (ivory 70%) | ≈ 9:1 | **7,6:1** |
| Sage sobre Bone / Charcoal | ≈ 3,5:1 / ≈ 4,0:1 | 3,5:1 / 4,0:1 |
| Stone sobre Bone | ≈ 1,3:1 | 1,3:1 |
| Graphite sobre Stone (rótulo da moldura pendente) | — | 12,4:1 |

**Nenhuma cor foi alterada** (A6). O `/specimen` mostra os valores medidos, e o teste fixa esses números para que qualquer mudança de cor apareça. Proposta: corrigir os números da DESIGN-SPEC §3.2 (só o texto; as cores ficam). **Depende de Rafa.**

## Dependência instalada

`lucide-react` **1.70.0** (ícones das setas), aprovado em E2. Reverificado na instalação: publicado em 2026-11-06, a versão mais recente com 7 dias ou mais (a política de [`DEPENDENCIES.md`](DEPENDENCIES.md) §3); aceita React 19; `npm audit --omit=dev` continua com 0 vulnerabilidades. Os ícones são renderizados no servidor: nenhum JavaScript vai para o navegador por causa deles.

Monitoramento T4 no início da fase (2026-11-13): 7 alertas moderados nas ferramentas de desenvolvimento, todos de `minimatch` via `typescript-eslint` 8.72.2, que ainda exige `minimatch ^10`. Situação inalterada.

## Verificação automatizada

Ambiente de desenvolvimento, Node 24, build de produção:

| Verificação | Resultado |
|---|---|
| `npm run check` (lint, formatação, tipos, testes unitários, build) | Verde |
| Testes unitários (Vitest) | 44 aprovados, 12 deles novos (`tests/unit/sistema-visual.test.ts`) |
| Testes E2E (Playwright, Chromium) | 225 aprovados; 20 capturas puladas (só rodam quando pedidas) |

Novos testes:

- **`tests/unit/sistema-visual.test.ts`:** valores das primitivas; `text-muted` = graphite 72% / ivory 70%; contrastes medidos (F2-1); nenhum arquivo fora do `globals.css` usa cor hexadecimal, função de cor (`rgb()`, `hsl()`…) ou classe da paleta do Tailwind; valores arbitrários do Tailwind só nas exceções registradas (hoje, uma: `grid-cols-[auto_1fr]` nas tabelas do `/specimen`). Conferido que os testes falham com um arquivo propositalmente errado.
- **`tests/e2e/sistema-visual.spec.ts`:** tamanho e altura de linha de cada estilo em 13 larguras (320 a 1920 px, incluindo 379/380 e 767/768/1023/1024), comparados com os valores da especificação; colunas, intervalo, margens e largura útil em 7 larguras; ausência de rolagem horizontal em 320 px; foco de 2 px com afastamento de 3 px em Graphite (Bone) e Ivory (Charcoal); hover com sublinhado Sage completo e seta deslocada; movimento reduzido sem deslocamento; sobreposição do grid.
- **`tests/e2e/specimen.spec.ts`** (era `medir.spec.ts`): os testes do diagnóstico no perfil medido do Galaxy A15 (400 × 766, densidade 2,7), agora em `/specimen`, mais faixa ativa, largura útil (360 px), grid (4 colunas de 78 px, intervalo de 16 px), elementos e a troca para a faixa tablet na horizontal (837 px).
- **Rotas:** `/specimen` e `/medir` respondem 404, com a página do idioma, no servidor que simula produção.

## Capturas

Geradas por `tests/e2e/capturas.spec.ts` (só roda com `CAPTURAS_DIR` definido), no Chromium, contra o build de produção em modo preview:

- Matriz do prompt mestre: 320 × 568, 375 × 548, 390 × 844, 412 × 708, 768 × 1024, 1024 × 768, 1280 × 720, 1440 × 900, 1920 × 1080 — primeira tela em densidade 2; página inteira em densidade 1, **limpa e com a sobreposição do grid**.
- Galaxy A15 no Chrome, perfis medidos (E11): vertical 400 × 766 e horizontal 837 × 299, densidade 2,7.
- WebKit (iPhone) fica para a Fase 3, junto com os testes de primeira dobra, como já previsto.

### Revisão própria antes do envio (VALIDATION §2.1)

- Valores conferidos pelos testes acima, nas larguras da matriz: tipografia, grid, margens e foco correspondem aos números da especificação.
- 320 px: nenhuma rolagem horizontal; o display ("Menos ruído. Mais intenção.") ocupa duas linhas a 44 px.
- Charcoal: tokens invertidos corretamente (texto Ivory, foco Ivory, regra Ivory 12%, botão sólido em Bone).
- Achado F2-1 acima.

## Pendências e riscos

- **Validação visual da identidade por Rafa** — critério de conclusão da fase.
- S3 (container e margens acima de 1440 px) e F2-1 (números de contraste da especificação) aguardam decisão.
- O diagnóstico do `/specimen` ainda não foi aberto no Galaxy A15 real; os testes usam o perfil medido.
- "Zoom da tela" do Galaxy A15 continua sem registro (VALIDATION §6).
- O alvo de toque de 48 px é verificado na Fase 3 (S7).

## Fora do escopo desta fase

Composição da home (hero, projetos, seções), navegação e menu, rodapé, animações de entrada e de rolagem (Fases 3 e 6), estudos de caso (Fase 4).

## Como revisar

1. Abrir o preview da branch `fase-2/sistema-visual` em `/specimen` (protegido pelo login da Vercel).
2. No Galaxy A15, no Chrome: conferir a seção 00 e, se quiser, tocar em "Copiar diagnóstico" e enviar.
3. Usar "Mostrar grid" para ver as colunas sobre a página.
4. Comparar com as capturas enviadas na conversa.

## Registro de aprovação

| Data | Item | Decisão de Rafa |
|---|---|---|
| — | Identidade visual (Fase 2) | Pendente |
| — | S1–S8 | Pendente |
| — | F2-1 | Pendente |
