# Fase 2 — Sistema visual

> **Status:** **aprovada por Rafa em 2026-11-14** (E16): identidade visual, sistema de design e validação responsiva. Merge da PR #2 autorizado, depois do merge da PR #1. Histórico: aprovada tecnicamente (E13); diagnóstico do Galaxy A15 e validação responsiva geral (E15). Autorizada pelo prompt mestre de 2026-11-13 (E12).
> **Branch:** `fase-2/sistema-visual`, desenvolvida empilhada sobre `fase-1/fundacao` (E12). Depois do merge da PR #1 (`d5cd387`), a base da PR #2 passou a ser a `main`.

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
| Sobreposição do grid | botão "Mostrar grid" no `/specimen` | Usada nas capturas "com grid" (VALIDATION §2.1). Cobre a página inteira (inclusive nas capturas de página inteira) e usa Sage translúcido para ser visível nas duas superfícies; é ferramenta interna, não um dos usos de Sage do site (§3.3). |

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

## Interpretações técnicas (aprovadas em 2026-11-13, E13)

Pontos em que a especificação não define o detalhe. Nenhum altera cor, tipografia, grid ou composição aprovados. Registrados também em [`DECISIONS.md`](DECISIONS.md) (S1–S8). Rafa aprovou S3 explicitamente e manteve S1–S8 como implementadas.

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

**Nenhuma cor foi alterada** (A6). O `/specimen` mostra os valores medidos, e o teste fixa esses números para que qualquer mudança de cor apareça.

**Resolvido (E13):** com a autorização de Rafa, a DESIGN-SPEC §3.2 passou a trazer os valores medidos, e o cabeçalho da especificação registra a correção e os valores anteriores. Cores, opacidades e composição não mudaram.

## Dependências instaladas

`lucide-react` **1.70.0** (ícones das setas), aprovado em E2. Reverificado na instalação: publicado em 2026-11-06, a versão mais recente com 7 dias ou mais (a política de [`DEPENDENCIES.md`](DEPENDENCIES.md) §3); aceita React 19; `npm audit --omit=dev` continua com 0 vulnerabilidades. Os ícones são renderizados no servidor: nenhum JavaScript vai para o navegador por causa deles.

`@axe-core/playwright` **4.14.0** (desenvolvimento), aprovado em E2 para a Fase 3 e antecipado para a validação de acessibilidade pedida em E15. Reverificado: publicado em 2026-10-15, a versão mais recente; aceita qualquer `playwright-core` (usa o mesmo 1.63.0 do projeto); exige Node ≥ 22.12. Nenhum alerta novo no `npm audit`.

Monitoramento T4 no início da fase (2026-11-13): 7 alertas moderados nas ferramentas de desenvolvimento, todos de `minimatch` via `typescript-eslint` 8.72.2, que ainda exige `minimatch ^10`. Situação inalterada.

## Verificação automatizada

Ambiente de desenvolvimento, Node 24, build de produção:

| Verificação | Resultado |
|---|---|
| `npm run check` (lint, formatação, tipos, testes unitários, build) | Verde |
| Testes unitários (Vitest) | 45 aprovados: 12 novos desta fase (`tests/unit/sistema-visual.test.ts`) e 1 do fechamento da Fase 1 (`tests/unit/publicacao.test.ts`, T6) |
| Testes E2E (Playwright, Chromium) | 243 aprovados; 29 capturas puladas (só rodam quando pedidas). Na primeira entrega eram 225; os 18 a mais são da validação responsiva (E15) |

Novos testes:

- **`tests/unit/sistema-visual.test.ts`:** valores das primitivas; `text-muted` = graphite 72% / ivory 70%; contrastes medidos (F2-1); nenhum arquivo fora do `globals.css` usa cor hexadecimal, função de cor (`rgb()`, `hsl()`…) ou classe da paleta do Tailwind; valores arbitrários do Tailwind só nas exceções registradas (hoje, uma: `grid-cols-[auto_1fr]` nas tabelas do `/specimen`). Conferido que os testes falham com um arquivo propositalmente errado.
- **`tests/e2e/sistema-visual.spec.ts`:** tamanho e altura de linha de cada estilo em 18 larguras (320 a 1920 px, incluindo as da matriz e os limites 379/380, 767/768 e 1023/1024), comparados com os valores da especificação; foco de 2 px com afastamento de 3 px em Graphite (Bone) e Ivory (Charcoal); hover com sublinhado Sage completo e seta deslocada; movimento reduzido sem deslocamento; sobreposição do grid.
- **`tests/e2e/specimen.spec.ts`** (era `medir.spec.ts`): os testes do diagnóstico no perfil medido do Galaxy A15 (400 × 766, densidade 2,7), agora em `/specimen`, mais faixa ativa, largura útil (360 px), grid (4 colunas de 78 px, intervalo de 16 px), elementos e a troca para a faixa tablet na horizontal (837 px).
- **Rotas:** `/specimen` e `/medir` respondem 404, com a página do idioma, no servidor que simula produção.
- **`tests/e2e/responsivo.spec.ts`** (E15): ver a seção seguinte.

## Validação responsiva geral e diagnóstico do Galaxy A15 (E15)

### Diagnóstico físico do Galaxy A15 (evidência complementar)

Enviado por Rafa em 2026-11-13, no Chrome do aparelho. O JSON completo desta coleta não chegou à conversa; a comparação usa os valores da mensagem e o JSON de E11, guardado em `tests/e2e/devices/galaxy-a15-chrome.json`.

| Orientação | Valor informado pelo aparelho | Esperado pela especificação e pelos testes | Resultado |
|---|---|---|---|
| Vertical | 400 × 766, densidade 2,7 | 400 × 766 e 2,7, medidos em E11 | Igual |
| Vertical | faixa `mobile`; conteúdo de 360 px; 4 colunas de 78 px; intervalo de 16 px | 400 − 2 × 20 = 360; (360 − 3 × 16) ÷ 4 = 78 | Igual |
| Horizontal | 837 × 355, densidade 2,7 | Altura entre 299 e 370 conforme a barra do Chrome (E11) | Dentro da faixa medida |
| Horizontal | faixa `tablet`; conteúdo de 719,9 px; 8 colunas de 72,5 px; intervalo de 20 px | 837 − 2 × 58,59 (7vw) = 719,8; (719,8 − 7 × 20) ÷ 8 = 72,5 | Igual (diferença de 0,1 px, do arredondamento para pixels do aparelho) |
| Ambas | área visível = viewport; escala 1; orientação correta; troca de faixa entre vertical e horizontal | — | Correto |

**Conclusão:** o aparelho reproduz exatamente o comportamento definido e testado. Nenhum ajuste específico para o Galaxy A15 é necessário, e nenhum foi feito: o aparelho é referência física, não alvo de otimização (E15). Como os números coincidem com os de E11, as duas medições usaram a mesma configuração de zoom; o valor nominal do "Zoom da tela" não foi informado e não é necessário nesta fase.

### Matriz validada

`tests/e2e/matriz.ts` (compartilhada com as capturas): 320 × 568, 360 × 800, 375 × 548, 390 × 844, 400 × 766, 412 × 708, 768 × 1024, 837 × 299, 837 × 355, 1024 × 768, 1280 × 720, 1440 × 900 e 1920 × 1080, mais os limites de faixa 767 e 1023. Os viewports do Galaxy A15 são os medidos; a altura de 360 × 800 é só uma referência para essa largura.

| Verificação (`tests/e2e/responsivo.spec.ts`) | Onde | Resultado |
|---|---|---|
| Rolagem horizontal da página | 15 viewports | Nenhuma |
| Elemento fora da tela (à esquerda ou à direita) | 15 viewports | Nenhum |
| Conteúdo maior que a própria caixa (texto cortado ou vazando) | 15 viewports | Nenhum (tolerância de 4 px para a seta do hover, §6.2; áreas com rolagem própria excluídas) |
| Controles interativos sobrepostos | 15 viewports | Nenhum |
| Botões e controles com menos de 48 px de altura | 15 viewports | Nenhum (links em texto: composição da Fase 3, S7) |
| Container, margens, colunas e intervalo do grid | 15 viewports | Iguais à §5 |
| Tamanho e altura de linha de cada estilo | 18 larguras | Iguais à §4 (S1, S2) |
| Teclado: todos os controles alcançáveis, na ordem de leitura, com contorno de 2 px e visíveis na tela | 400 × 766, 837 × 299 (pouca altura) e 1440 × 900 | Correto |
| axe (WCAG 2.2 A e AA, incluindo contraste real), com o diagnóstico completo aberto e o grid ligado | 400 × 766, 837 × 299 e 1440 × 900 | Sem violações depois da correção D1 |
| Contraste dos tokens | testes unitários | 15,6:1 · 14,2:1 · 6,7:1 · 7,6:1 (texto); Sage só em interface |
| Movimento reduzido, hover e foco nas duas superfícies | `sistema-visual.spec.ts` | Correto |

### Problemas encontrados

| # | Gravidade | Problema | Correção |
|---|---|---|---|
| D1 | Moderada (acessibilidade, WCAG 2.1.1; generalizável) | Com "Ver o diagnóstico completo" aberto, o JSON mais largo que a tela só rolava com toque ou mouse: pelo teclado, a área não recebia foco. Aparecia em qualquer largura em que o JSON não cabe (detectado pelo axe em 400 e 837 px). Só no `/specimen`. | A área do JSON passou a ser focável e nomeada (`tabIndex=0`, `role="region"`, `aria-label`). O axe confirma a correção e fica como teste de regressão. |
| T1 | — (teste) | A primeira versão da auditoria de layout contava a própria área com rolagem como "conteúdo maior que a caixa". | Teste ajustado: áreas com rolagem própria são excluídas. Nenhuma mudança no site. |
| T2 | — (capturas) | Na captura "com grid", o diagnóstico mostrava uma variação "largura 1 · altura 1", criada pelo próprio Playwright ao redimensionar o viewport na captura de página inteira anterior. O diagnóstico registra o que o navegador informa, como deve. | Script de capturas ajustado: a versão com grid é feita numa página nova. Nenhuma mudança no site. |

Nenhuma outra falha. Nenhuma mudança visual foi feita.

**Observação, não defeito:** na horizontal com pouca altura (837 × 299 a 355), a largura coloca a página na faixa tablet, com display de 67 px e 8 colunas. É o que a especificação define (faixas por largura), e no `/specimen` não há corte nem sobreposição. A primeira dobra da home nessa condição será verificada na Fase 3, junto com os testes de primeira dobra.

## Capturas

Geradas por `tests/e2e/capturas.spec.ts` (só roda com `CAPTURAS_DIR` definido), no Chromium, contra o build de produção em modo preview:

- Os 13 viewports da matriz (`tests/e2e/matriz.ts`) — primeira tela em densidade 2; página inteira em densidade 1, **limpa e com a sobreposição do grid**.
- Galaxy A15 no Chrome, perfis medidos (E11, E15): vertical 400 × 766, horizontal 837 × 299 e 837 × 355, densidade 2,7, com toque e interface móvel.
- Total: 42 arquivos. Nas capturas da matriz, "densidade 1/2" e a orientação "landscape" do diagnóstico são da emulação de computador; os valores de celular aparecem nas capturas com o perfil do Galaxy A15.
- WebKit (iPhone) fica para a Fase 3, junto com os testes de primeira dobra, como já previsto.

### Revisão própria antes do envio (VALIDATION §2.1)

- Valores conferidos pelos testes acima, nas larguras da matriz: tipografia, grid, margens e foco correspondem aos números da especificação.
- 320 px: nenhuma rolagem horizontal; o display ("Menos ruído. Mais intenção.") ocupa duas linhas a 44 px.
- Charcoal: tokens invertidos corretamente (texto Ivory, foco Ivory, regra Ivory 12%, botão sólido em Bone).
- Achado F2-1 acima.

## Pendências e riscos

- **Avaliação do relatório final por Rafa** — necessária para o fechamento formal da fase e para a decisão sobre os merges (E14, E15).
- Primeira dobra da home na horizontal com pouca altura: verificada na Fase 3 (observação acima).
- Alvo de toque dos links em texto: verificado na composição da Fase 3 (S7).
- WebKit (iPhone): testes e capturas na Fase 3, como previsto.

## Fora do escopo desta fase

Composição da home (hero, projetos, seções), navegação e menu, rodapé, animações de entrada e de rolagem (Fases 3 e 6), estudos de caso (Fase 4).

## Validação no Galaxy A15 (E13)

O preview é protegido pela Vercel Authentication: só abre com o login da conta Vercel de Rafa. Endereço (sempre aponta para o último commit da branch):

`https://rafaelzovic-dev-git-fase-2-sistema-visual-rdz14.vercel.app/specimen`

1. **Zoom da tela:** em Configurações, buscar "Zoom da tela" e anotar a posição atual, **sem mudar**. Os números em pixels CSS dependem dela.
2. **Abrir:** no Chrome do Galaxy A15, com o celular na vertical, abrir o endereço. Se aparecer a tela da Vercel, entrar com a mesma conta usada no computador; o Chrome volta para a página. Se o Chrome estiver em "Versão para computador", desligar.
   - *Opcional, para confirmar a proteção:* abrir o mesmo endereço numa guia anônima do Chrome. Deve aparecer a tela de login da Vercel, e não a página. (Daqui não é possível abrir endereços `*.vercel.app`, e um link de compartilhamento enfraqueceria a proteção; a configuração foi conferida pela API: Vercel Authentication ativa.)
3. **Não rolar** até a página carregar: o bloco "Na abertura" registra a área com as barras do Chrome visíveis.
4. **Rolar** devagar até o fim da página e voltar ao topo (a barra do Chrome recolhe e reaparece).
5. **Girar** para a horizontal, esperar a página se ajustar e voltar para a vertical (com a rotação automática ligada).
6. **Copiar:** na seção 00, tocar em "Copiar diagnóstico" e colar na conversa. Se não copiar: tocar em "Ver o diagnóstico completo", tocar e segurar o texto, "Selecionar tudo" e "Copiar".
7. **Enviar também:** o valor do Zoom da tela e duas capturas de tela (vertical e horizontal), feitas no próprio aparelho.
8. **Avaliação visual:** percorrer a página, usar "Mostrar grid" e responder se a identidade (cores, tipografia, componentes nas duas superfícies) está aprovada ou o que precisa de ajuste.

**O que será conferido com o diagnóstico:** se a abertura repete 400 × 766 e a densidade 2,7 medidas em E11; faixa ativa `mobile`; largura útil de 360 px; grid de 4 colunas de 78 px com intervalo de 16 px; dimensões das amostras do display e do H1 com as fontes carregadas; as variações da barra do Chrome e da horizontal. Um ajuste responsivo só será proposto se o aparelho mostrar diferença em relação a esses valores ou um problema visível.

## Registro de aprovação

| Data | Item | Decisão de Rafa |
|---|---|---|
| 2026-11-13 | Implementação da Fase 2 (E13) | Aprovada tecnicamente para seguir à validação visual; sem merge até a validação no Galaxy A15 |
| 2026-11-13 | S3 | Aprovada (margens dentro do container de 1440 px) |
| 2026-11-13 | S1–S8 | Mantidas como implementadas |
| 2026-11-13 | F2-1 | Correção autorizada e aplicada na DESIGN-SPEC §3.2 |
| 2026-11-13 | Merges (E14) | Nenhuma PR é mergeada por enquanto; fechamento formal da Fase 2 depois da validação no aparelho |
| 2026-11-13 | Diagnóstico físico do Galaxy A15 (E15) | Recebido; registrado como evidência complementar. Validação responsiva geral pedida e executada |
| 2026-11-14 | **Fase 2 aprovada** (E16) | Identidade visual, sistema de design e validação responsiva. As rodadas de validação e os diagnósticos já feitos bastam. |
| 2026-11-14 | Merge da PR #2 (E16) | Autorizado para Claude, depois do merge da PR #1: base em `main`, conferência da ARCHITECTURE §10.1, CI, conflitos e estado verificados, *merge commit*. O resultado fica registrado no início da Fase 3. |
