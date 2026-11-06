# RAFA — Especificação de design v1.1

> **Status:** aprovada por Rafa em 2026-11-05.
> **Fontes:** [`BRIEFING.md`](BRIEFING.md) (fonte de verdade) e as decisões D1–D9 e A1–A6 em [`DECISIONS.md`](DECISIONS.md).
> **Regra:** nenhum item deste documento muda durante a implementação sem autorização explícita (regra A6). Uma dúvida de interpretação vira pergunta, não decisão.

---

## 1. Conceito

### 1.1 O portfólio como publicação técnica

O site é tratado como uma **monografia editorial**: algo entre um livro de design e um caderno de engenharia. Cada parte tem número, legenda e justificativa.

Três recursos de identidade aparecem no site inteiro:

| Recurso | O que é | Por que existe |
|---|---|---|
| **Fólio** | Cabeçalho fino em JetBrains Mono que indica onde o leitor está: `RAFA — 02 Projetos — PT`. | Traduz precisão. Substitui a barra de progresso genérica. |
| **Marginália** | Notas curtas na coluna de margem explicando *por que* algo foi feito, principalmente nos estudos de caso. | Torna visível a ideia "cada elemento existe por um motivo". Mostra raciocínio, não só resultado. |
| **Evidência ligada** | Cada tecnologia ou competência aponta para o projeto onde foi usada de fato. | Sustenta a autoridade com fatos e evita a lista de logos. |

### 1.2 A paleta como narrativa (D3)

- **Claro (Bone):** a parte humana e editorial — Hero, Projetos e Sobre.
- **Escuro (Charcoal):** a parte técnica e de ação — Competências e Contato, em **um único bloco escuro contínuo**.

A página escurece à medida que entra na engenharia. O corte de cor acontece **uma vez só**. Nos estudos de caso, o corpo é Bone e a seção 04 Arquitetura é Charcoal.

### 1.3 Tipografia como protagonista

Não há imagem decorativa. A identidade vem de:

- **Escala:** grande contraste entre o display (96px) e o texto (16–17px).
- **Deslocamento editorial:** linhas de título com recuo de colunas.
- **Disciplina do mono:** JetBrains Mono só para dados (datas, status, stack, índices). Maiúsculas no mono apenas nos rótulos de seção.

---

## 2. Textos fixos e posicionamento

| Elemento | PT | EN |
|---|---|---|
| Assinatura | RAFA | RAFA |
| Meta do hero | RAFA — Digital Craft & Engineering | RAFA — Digital Craft & Engineering |
| Frase conceitual (assinatura visual, D7) | Menos ruído. Mais intenção. | Less noise. More intention. |
| **Posicionamento (H1, D1/D2/D7)** | Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer. | Web Developer in training, working towards becoming a Software Engineer. |
| Título da home | Rafa — Desenvolvedor web em formação | Rafa — Web Developer in training |
| Título de estudo de caso | `<Projeto>` — Estudo de caso · Rafa | `<Projeto>` — Case study · Rafa |

- A frase de apresentação do briefing ("construindo soluções digitais com atenção à engenharia, ao design e aos detalhes") **saiu do hero** e orienta a abertura da seção Sobre (D8).
- Os dois idiomas mantêm equivalência de significado. A tradução é natural, não literal.

---

## 3. Cores

### 3.1 Primitivas

| Token | Hex |
|---|---|
| `bone` | `#F2F0E9` |
| `graphite` | `#171817` |
| `stone` | `#D9D7CF` |
| `sage` | `#788176` |
| `charcoal` | `#20211F` |

Ivory tem o mesmo valor de Bone: é um único valor com dois papéis semânticos, criando a inversão perfeita entre as superfícies.

### 3.2 Semânticas

| Token | Superfície clara | Superfície escura |
|---|---|---|
| `surface` | bone | charcoal |
| `text` | graphite (≈ 16:1) | ivory (≈ 15:1) |
| `text-muted` | graphite 72% (≈ 7:1) | ivory 70% (≈ 9:1) |
| `rule` | stone | ivory 12% |
| `accent` | sage | sage |
| `focus` | graphite | ivory |

### 3.3 Regras

- **Componentes usam só tokens semânticos**, nunca valores hexadecimais.
- **Sage** nunca é usado em texto abaixo de 24px. Contraste: ≈ 3,5:1 sobre Bone e ≈ 4,0:1 sobre Charcoal; passa para texto grande e elementos de interface, não para texto normal.
- **Sage tem exatamente cinco usos:** marcador de status, item ativo da navegação, régua da marginália, sublinhado no hover e regra no hover dos links de contato.
- **Stone é estritamente decorativo** (≈ 1,3:1 sobre Bone). Bordas de controles interativos usam `text` ou `text-muted`.

---

## 4. Tipografia

| Estilo | Fonte / peso | Desktop | Tablet | Mobile | Tracking |
|---|---|---|---|---|---|
| `display` | Manrope 600 | 96/0.95 | 64/0.98 | 48/1.0 (44 abaixo de 380px de largura) | −0,04em |
| `h1-position` | Manrope 500 | 28/1.3 | 24/1.35 | 20/1.4 | −0,01em |
| `h2` | Manrope 600 | 52/1.05 | 42/1.08 | 34/1.1 | −0,03em |
| `h3` | Manrope 600 | 40/1.1 | 32/1.12 | 28/1.15 | −0,02em |
| `contact-xl` | Manrope 600 | 72/1.0 | 56/1.0 | 36/1.05 | −0,03em |
| `lead` | Manrope 500 | 32/1.3 | 26/1.32 | 22/1.35 | −0,01em |
| `body` | Inter 400 | 17/1.65 | 16/1.65 | 16/1.6 | 0 |
| `body-sm` | Inter 400 | 15/1.55 | 15/1.55 | 15/1.5 | 0 |
| `meta` | JetBrains Mono 400 | 12/1.4 | 12/1.4 | 11/1.4 | 0 (rótulo: +0,06em, maiúsculas) |

- Valores interpolados entre breakpoints, com piso de 16px para corpo de texto.
- Pesos carregados: Manrope 500/600, Inter 400/500, JetBrains Mono 400. Subsets latin e latin-ext.
- Manrope e Inter são parecidas; o contraste entre elas vem de escala, peso e tracking, não da troca de fonte.

---

## 5. Grid, espaço e forma

| Item | Valor |
|---|---|
| Breakpoints | 375 · 768 · 1024 · 1280 · 1440 |
| Colunas | 4 (mobile) · 8 (tablet) · 12 (a partir de 1024) |
| Gutter | 16 · 20 · 24 |
| Margens | 20px no mobile; `clamp(24px, 7vw, 112px)` a partir do tablet |
| Container | 1440px |
| Escala de espaço | 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 192 |
| Padding de seção (topo/base, desktop) | Projetos 160/192 · Sobre 192/160 · Competências 128/128 · Contato 160/96. No mobile, ≈ 60% desses valores. |
| Título de seção → conteúdo | 64px no desktop · 40px no mobile |
| Regras | 1px |
| Raio | 0 por padrão. 4px apenas em botões e no contorno de foco. Imagens com cantos retos. |
| Medida de leitura | No máximo 68 caracteres |
| Alvo de toque | No mínimo 48px. Linhas-índice e links de contato no mobile: 56–72px. |
| Largura mínima suportada | 320px, sem rolagem horizontal |

---

## 6. Movimento

### 6.1 Tokens

| Token | Valor |
|---|---|
| `ease-out-editorial` | `cubic-bezier(.2, .7, .1, 1)` |
| `dur-fast` | 150ms (estados) |
| `dur-base` | 250ms (sublinhados, setas) |
| `dur-reveal` | 500ms (rolagem) |
| `dur-hero` | 600ms nas linhas, 800ms na foto, intervalo de 80ms |
| `dur-route` | 200ms (fade entre páginas) |

### 6.2 Momentos

| Momento | Animação | Função |
|---|---|---|
| Entrada do hero | Linhas do display sobem de dentro de uma máscara; a foto revela de baixo para cima. | Estabelecer a ordem de leitura |
| Rolagem | Opacidade 0 → 1 com deslocamento de 16px, uma vez só, **apenas** em títulos de seção e blocos de projeto | Marcar mudança de capítulo |
| Corte para Charcoal | Nenhuma | O contraste já é o evento |
| Hover em imagem de projeto | Escala 1,00 → 1,02 em 600ms, dentro da máscara | Feedback discreto |
| Links | Sublinhado desenhado da esquerda para a direita; seta desloca 4px | Feedback |
| Entre páginas | Fade de 200ms | Continuidade |
| Sumário do estudo de caso | Item ativo acompanha a rolagem | Orientação |

### 6.3 Regras

- **Sem JavaScript, o conteúdo aparece completo.** O estado inicial animado só é aplicado quando o JavaScript está ativo.
- **`prefers-reduced-motion: reduce`** remove deslocamentos e escalas; resta só opacidade de 150ms.
- **No toque**, efeitos de hover viram estados `:active`. Nada depende de hover para revelar informação.
- Nenhum cursor personalizado, nenhuma animação contínua, nenhum efeito parallax.

---

## 7. Fotografia

| Item | Especificação |
|---|---|
| Original | Mínimo de 2400px no lado maior, sem compressão (RAW, TIFF ou JPEG de alta qualidade) |
| Recorte | 4:5. Olhos aproximadamente no terço superior; do meio do torso até acima da cabeça, com margem |
| Tratamento (D4) | Cores naturais, saturação −15%, sem filtro de cor, sem vinheta, sem retoque perceptível |
| Onde aplicar | Na exportação da imagem, **não via CSS** |
| Fundo ideal | Neutro e quente, próximo a Bone ou Stone |
| Entrega | AVIF e WebP em 3 larguras (480 / 960 / 1440), com ponto focal definido |
| Texto alternativo | PT: "Retrato de Rafa" · EN: "Portrait of Rafa" |
| Enquanto pendente | Moldura Stone com o rótulo mono "Fotografia — pendente". **Nunca** uma imagem de substituição. |

---

## 8. Navegação (D9)

- **Itens:** Início · Projetos · Sobre · Contato · PT / EN. **Sem numeração nos links do menu.**
- A numeração existe apenas nos rótulos de seção (01 a 04).
- Item ativo: quadrado Sage de 6px ao lado do texto.
- Desktop: some ao rolar para baixo e volta ao rolar para cima; ganha borda inferior Stone de 1px depois do hero.
- Mobile: botão com a palavra "Menu" abre uma sobreposição em tela cheia sobre Bone, com links de 40px e PT/EN no rodapé.

---

## 9. Página principal

### 9.1 Visão geral

```
BONE ─────────────────────────────────────────────────────────────────────
  Hero
  01 — Trabalhos selecionados
     [01 Qualyt Trend]  imagem col 1–8 · 16:10 │ texto col 9–12 alinhado à base
     [02 SaldoZen]      texto col 1–4 no topo  │ imagem col 6–12 · 4:3 · desce 96px
     Índice de arquivo: só a partir de 3 projetos
  02 — Sobre
     rótulo col 1–3 │ abertura Manrope 32 col 4–11 (orientada por D8)
                    │ corpo col 4–7 │ corpo col 8–11
                    │ Como trabalho: 01 Intenção · 02 Engenharia · 03 Evolução
CHARCOAL ═════════════════════════════════════════════════════════════════
  03 — Competências
     6 áreas col 1–6 (cada uma liga a uma evidência)
     Registro técnico col 8–12: USADO EM PROJETOS / EM ESTUDO
  ── regra Ivory 12% ──
  04 — Contato
     GitHub ↗ · LinkedIn ↗ (contact-xl) │ E-mail [copiar] · WhatsApp (body-sm)
  Rodapé: RAFA · Menos ruído. Mais intenção. · © ano · PT/EN · Topo ↑
```

### 9.2 Hero — desktop (1440 × 800)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ RAFA            Início  Projetos  Sobre  Contato ■           PT / EN     │ 72
├──────────────────────────────────────────────────────────────────────────┤
│                                                                   ↕ 112  │
│ RAFA — Digital Craft & Engineering                    ┌──────────────┐   │ meta
│                                                 ↕ 24  │              │   │
│ Menos ruído.                                          │  FOTOGRAFIA  │   │ display 96
│           Mais intenção.                              │  4:5         │   │ (recuo col 3)
│                                                 ↕ 40  │  col 9–12    │   │
│ Desenvolvedor em formação, com foco em                │              │   │ H1 · h1-position
│ desenvolvimento web e objetivo de me                  │              │   │
│ tornar Software Engineer.          col 1–7            └──────────────┘   │
│                                                       Rafa · 2026        │ legenda mono
│                                                                   ↕ 64   │
├──────────────────────────────────────────────────────────────────────────┤
│ ÍNDICE      01  Projetos selecionados (2)  ↓      02  Sobre  ↓           │ 64
└──────────────────────────────────────────────────────────────────────────┘
```

- Altura: `min(100svh, 880px)`.
- Bloco de texto nas colunas 1–7; foto nas colunas 9–12, com o topo alinhado à altura de maiúsculas da primeira linha do display.
- Proporção texto : foto ≈ 7 : 4. O texto domina.
- **Semântica (D7):** o H1 é o posicionamento. A frase conceitual é um elemento display que não é título.
- Primeira dobra estimada a 1440 × 800: ≈ 684px. A 1280 × 720, com o display em ≈ 84px: ≈ 640px.
- Em EN, o posicionamento ocupa 2 linhas; a grade não muda.

### 9.3 Hero — mobile (ajuste M1, P6)

Prioridade: compreensão imediata do posicionamento e acesso aos projetos antes da fotografia.

```
┌─────────────────────────┐
│ RAFA        PT/EN  Menu │ 56
├─────────────────────────┤ ↕ 24
│ RAFA — Digital Craft &… │ meta em 1 linha real (≈ 224 de 335px úteis)
│                         │ ↕ 16
│ Menos                   │ display 44–48
│ ruído.                  │ quebra intencional,
│ Mais                    │ uma ideia por linha
│ intenção.               │ ↕ 24
│ Desenvolvedor em        │ H1 · 20/1.4
│ formação, com foco em   │
│ desenvolvimento web e   │
│ objetivo de me tornar   │
│ Software Engineer.      │ ↕ 24
├─────────────────────────┤
│ 01 Projetos (2)       ↓ │ 56 ← acesso aos projetos antes da foto
├─────────────────────────┤ ↕ 32
│      ┌────────────────┐ │
│      │ FOTOGRAFIA 4:5 │ │ 3 de 4 colunas, alinhada à direita
│      │ ≈ 250 × 310    │ │
│      └────────────────┘ │
│ Rafa · 2026             │ legenda à esquerda, na base
├─────────────────────────┤ ↕ 32
│ 02 Sobre              ↓ │ 56
└─────────────────────────┘
```

- Estimativa até o fim da linha "Projetos": ≈ 503px.
- **Critério:** H1 e linha "Projetos" inteiramente visíveis na área efetiva do navegador — Safari no iPhone (A2) e Chrome/Samsung Internet no Android, incluindo o Galaxy A15 de Rafa (E3) —, com fontes carregadas. O método de verificação está em [`VALIDATION.md`](VALIDATION.md) (regra A2).
- Altura total do hero ≈ 1,4 tela, contra quase 2 se a foto ocupasse 4 colunas.
- No mobile, o maior elemento visível da primeira dobra é texto, não a foto.

### 9.4 Hero — tablet (768 × 1024)

Texto nas colunas 1–5, foto nas colunas 6–8. Display 64px, H1 24px.

### 9.5 Trabalhos selecionados

- Projeto 01 (variante A): imagem 8 colunas em 16:10; texto nas colunas 9–12, alinhado à base da imagem.
- Projeto 02 (variante B): texto nas colunas 1–4, alinhado ao topo; imagem nas colunas 6–12 em 4:3, deslocada 96px para baixo.
- Bloco de texto: número (`01`), nome (h3), categoria (meta), resumo de 2–3 linhas (body), status (StatusMarker com data), stack (meta), link "Ler estudo de caso →".
- Projetos destacados alternam A e B automaticamente. Projetos não destacados entram no **índice de arquivo** (tabela: ano · nome · categoria · stack · status), que só aparece a partir do terceiro projeto.
- Mobile: imagem em largura total, depois o texto. Números de projeto em 64px fazem o papel da assimetria.
- Enquanto não houver captura real: moldura Stone com o nome do projeto e "Captura — pendente". Nunca uma interface simulada.

### 9.6 Sobre

- Rótulo nas colunas 1–3. Abertura em `lead` nas colunas 4–11. Corpo em duas colunas (4–7 e 8–11).
- "Como trabalho": três afirmações curtas numeradas.
- **O texto é de Rafa** ou um rascunho aprovado por Rafa. Nada é escrito como fato sem confirmação.
- Mobile: tudo em uma coluna.

### 9.7 Competências (Charcoal)

- Colunas 1–6: as seis áreas do briefing, cada uma com uma frase curta e um link para a evidência no estudo de caso. Área sem evidência é reescrita ou retirada.
- Colunas 8–12: registro técnico em mono, com linha pontilhada entre tecnologia e projeto.
  - **Usado em projetos:** cada tecnologia lista os projetos onde foi usada.
  - **Em estudo:** marcador ○, sem vínculo com projeto.
- Sem barras, níveis ou porcentagens.
- Mobile: lista empilhada, sem acordeão.

### 9.8 Contato (Charcoal)

- GitHub e LinkedIn em `contact-xl` (72px desktop, 36px mobile), com seta ↗, identificador em mono e regra de 1px entre eles.
- Área secundária em `body-sm`: E-mail (com "copiar" e feedback "Copiado" por 2s, anunciado para leitores de tela) e WhatsApp, se Rafa decidir exibir.
- Nenhum link é exibido enquanto o endereço real não for fornecido.

### 9.9 Rodapé

RAFA · Menos ruído. Mais intenção. · © ano · PT/EN · Topo ↑

---

## 10. Estudo de caso

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ← Projetos                RAFA — Projetos — 01 / 02                PT/EN │
├──────────────────────────────────────────────────────────────────────────┤
│ 01                                                                       │
│ Qualyt Trend                                               display 88    │
│ Resumo em uma frase                                        22px          │
├──────────┬──────────┬──────────┬──────────┬──────────────────────────────┤
│ Categoria│ Tipo     │ Stack    │ Status   │ Links                        │ tabela mono
├──────────┴──────────┴──────────┴──────────┴──────────────────────────────┤
│ [CAPTURA PRINCIPAL — largura do container, 16:9]                         │
├──────────────────────────────────────────────────────────────────────────┤
│ SUMÁRIO    │ 02 Contexto e problema            │ NOTA                    │
│ (fixo)     │ Texto col 4–9 (~68 caracteres)    │ Por que X e não Y: …    │ marginália
│ 01 Resumo  │                                   │                         │ col 10–12
│ 02 Contexto│                                   │                         │
│ ● 03 Obj.  │                                   │                         │
│ …          │                                   │                         │
│ 10 Links   │                                   │                         │
├══ 04 Arquitetura em CHARCOAL — diagrama em linha de 1px, rótulos mono ═══┤
│ … 08 Capturas: figuras numeradas "Fig. 3 — …"                            │
│ 09 Estágio atual: Concluído / Em andamento / Planejado, com data          │
├──────────────────────────────────────────────────────────────────────────┤
│ Próximo projeto                                                          │
│ SaldoZen  →                                                    56px      │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Seções (do briefing):** 01 Identificação e resumo · 02 Contexto e problema · 03 Objetivo · 04 Arquitetura e tecnologias · 05 Decisões técnicas · 06 Desafios · 07 Processo · 08 Capturas · 09 Resultado e estágio atual · 10 Links.
- **Status sempre datado:** "Status em DD/MM/AAAA".
- **Links:** só aparecem se existirem. Repositório privado → indicação "repositório privado", com a evidência apresentada como trecho ou captura (regra C1).
- **Botões indisponíveis** viram texto: "Demo não publicada". Nunca "em breve".
- **Diagramas** desenhados na linguagem do site: linhas de 1px, rótulos mono, sem ícones genéricos.
- **Mobile:** o sumário vira um fólio fixo no topo (`04 / 10 — Arquitetura`) que abre a lista ao toque; a marginália entra no fluxo do texto como nota com régua Sage.

---

## 11. Página não encontrada

Uma por idioma. Mesma estrutura do site (header, rodapé), mensagem curta em `h2`, link para a home e para os projetos.

---

## 12. Componentes e estados

| Componente | Variantes | Estados |
|---|---|---|
| Nav | desktop · mobile | ativo (■ Sage) · oculta/visível pela direção da rolagem · com borda depois do hero |
| LanguageSwitch | PT / EN | atual (`text`) · outro (`text-muted`) · hover · foco. Preserva página e seção. |
| SectionLabel | claro · escuro | — |
| IndexLink | → · ↓ · ↗ | hover (sublinhado e seta) · foco · ativo |
| ProjectFeature | A · B | hover (imagem 1,02 e sublinhado no título) · foco no bloco inteiro |
| ProjectIndexRow | — | hover (miniatura em coluna fixa, não segue o cursor) · foco |
| StatusMarker | Concluído ■ graphite · Em desenvolvimento ■ sage · Planejado □ | Sempre com texto; nunca só cor |
| MetaTable | linha (desktop) · pares empilhados (mobile) | — |
| TechLedger | usado · em estudo (○) | hover e foco no link de evidência |
| CapabilityRow | — | link para a evidência |
| ContactLink | primário · secundário | hover (seta e regra Sage) · foco · "Copiado" |
| Button | sólido · contorno (só nos estudos de caso) | hover · foco · ativo. Indisponível vira texto. |
| Figure | largura total · coluna | legenda numerada |
| PhotoFrame | — | carregada · pendente |
| MarginNote | margem (desktop) · no texto (mobile) | — |
| CaseToc | lateral · fólio fixo (mobile) | item ativo · aberto/fechado |
| Footer | — | — |
| Foco (todos) | contorno de 2px na cor `focus`, afastamento de 3px | nunca removido |

---

## 13. Acessibilidade

- "Pular para o conteúdo" é o primeiro elemento focável.
- Um H1 por página: posicionamento na home, nome do projeto no estudo de caso.
- `lang` correto por rota (`pt-BR` / `en`).
- Navegação completa por teclado; ordem de foco igual à ordem visual.
- Contraste AA em todo texto; regras de Sage e Stone da seção 3.3.
- Status nunca comunicado só por cor.
- Textos alternativos reais; imagens decorativas não existem.

---

## 14. Referências

Usadas para composição, hierarquia e comportamento — **nunca** para paleta ou identidade.

| Referência | Levar | Não levar |
|---|---|---|
| Moodboard 1 — "Minimalist Web Design" | Proporção entre texto e espaço vazio | Esferas 3D e formas decorativas |
| Moodboard 2 — "HARUN" | Navegação mínima; detalhe vertical de margem | Nome gigante centralizado; fundo todo preto |
| Moodboard 3 — "Portfolite" | Selo pequeno acima do título como pista de hierarquia | Fumaça em gradiente; faixa de logos de clientes |
| Moodboard 4 — "Jason Martin" | Ideia de linha do tempo de evolução | Barras de proficiência; foto como fundo |
| Moodboard 5 — "Hi, I'm Chris" | Apresentação direta em primeira pessoa | Par de botões em pílula |
| Moodboard 6 — "Photographer X" | Foto como bloco da grade; blocos assimétricos | Cards de projeto em sequência idêntica |
| Stripe Press | Tipografia de livro na web; ritmo editorial | — |
| Pentagram | Estrutura de estudo de caso; grid rigoroso | — |
| Rauno Freiberg, Emil Kowalski | Artesanato de interface; movimento preciso | — |
| Paco Coursey | Contenção; texto como interface | — |
| Linear (método, changelog) | Densidade técnica com clareza | — |
| Teenage Engineering | Metadados como elemento gráfico | — |
| J. Müller-Brockmann, *Grid Systems* | Base do grid | — |
| Dieter Rams, "Weniger, aber besser" | Paralelo conceitual de "Menos ruído" | — |

---

## 15. Salvaguardas contra o genérico

Durante a implementação, cada item abaixo é verificado na avaliação visual humana:

1. Nada de "portfólio dark": a base é Bone.
2. O nome nunca vira o elemento gigante do hero.
3. Nenhum par de botões em pílula como CTA.
4. JetBrains Mono só para dados; maiúsculas só nos rótulos.
5. Um único sistema de numeração (seções 01–04, projetos 01–0n).
6. Poucos projetos se compensam com profundidade, nunca com preenchimento.
7. Nenhuma competência sem evidência.
8. Padding de seção variado de propósito.
9. Nenhuma seção usa o mesmo padrão visual de outra.
10. Nenhum efeito sem função descrita na seção 6.

## 16. Proibido (do briefing)

Gradientes decorativos, glassmorphism, cards arredondados repetidos, ícones decorativos, ilustrações de robôs/circuitos/cérebros, animações exageradas, barras de proficiência, estatísticas/clientes/resultados/depoimentos inventados, imagens genéricas no lugar da fotografia pessoal.
