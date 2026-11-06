# Validação

> **Regra A3:** testes automatizados e avaliação visual humana são coisas separadas. **CI verde não significa aprovação estética.**
> Uma fase só é concluída com as duas coisas: CI verde **e** aprovação explícita de Rafa, registrada no `FASE-N.md` correspondente.

---

## 1. Verificação automatizada (máquina)

O que os testes conseguem afirmar com segurança: regras objetivas, mensuráveis e repetíveis.

### 1.1 Bloqueiam o merge

| Verificação | Ferramenta | Fase em que entra |
|---|---|---|
| Lint sem avisos, formatação, tipos | ESLint, Prettier, TypeScript | 1 |
| Build de produção | Next.js | 1 |
| Rotas, `lang` por idioma, 404 por idioma, redirecionamentos | Playwright | 1 |
| Paridade PT/EN (chaves e textos não vazios) | Vitest | 1 |
| Cores só via tokens; nenhum valor arbitrário de espaçamento fora da lista de exceções | Script no CI | 2 |
| Tamanhos tipográficos calculados iguais aos tokens em cada breakpoint (±1px nas larguras intermediárias) | Playwright | 2 |
| Primeira dobra (seção 3) | Playwright (WebKit e Chromium) | 3 |
| Conteúdo completo sem JavaScript; menu funcional sem JavaScript | Playwright com JavaScript desligado | 3 |
| Navegação por teclado, link "pular para o conteúdo", foco visível | Playwright | 3 |
| Alvos de toque ≥ 48px no mobile | Playwright (medição das caixas) | 3 |
| Nenhuma rolagem horizontal a partir de 320px | Playwright | 3 |
| Linhas de texto com no máximo 68 caracteres | Playwright | 3 |
| Acessibilidade: zero violação séria ou crítica | axe (`@axe-core/playwright`) | 3 |
| Evidência: funcionalidade concluída tem evidência; status tem data; tecnologia usada tem projeto e consta na stack dele | Vitest | 4 |
| Linguagem: termos de senioridade ou exagero recusados em PT e EN | Vitest | 3 |
| Nenhum link para repositório privado (C1) | Vitest | 4 |
| Troca de idioma preserva página e seção | Playwright | 5 |
| `canonical`, `hreflang` e Open Graph corretos por página | Playwright | 5 |
| Movimento reduzido: nenhum deslocamento ou escala | Playwright com emulação de `reduce` | 6 |
| Regressão visual contra capturas de referência **já aprovadas por Rafa** | Playwright (`toHaveScreenshot`), só no CI Linux | 6 |
| Publicação: sem pendências (foto, links, capturas reais) | `check:release` | 7 |

### 1.2 Medidos e relatados, sem bloquear (regra A4)

| Meta | Valor |
|---|---|
| Lighthouse mobile — Performance | ≥ 95 |
| Lighthouse — Acessibilidade · SEO · Boas práticas | 100 · 100 · ≥ 95 |
| LCP (laboratório, mobile) | ≤ 2,0s |
| CLS | ≤ 0,05 |
| TBT | ≤ 150ms |

**Regra A4:** essas metas orientam a otimização técnica (imagens, fontes, JavaScript). Se alguma meta entrar em conflito com o design aprovado, **o design prevalece**: o conflito é documentado e levado a Rafa com opções. Nenhum elemento da identidade é alterado para melhorar uma pontuação.

---

## 2. Avaliação visual humana (Rafa)

O que nenhum teste consegue afirmar: qualidade estética, fidelidade de intenção, personalidade.

### 2.1 Como é feita

1. Preview na Vercel com a fase concluída.
2. Pacote de capturas da matriz (seção 4), em duas versões: **limpa** e **com a sobreposição do grid**.
3. Antes de enviar, uma revisão própria comparando as capturas com os números da especificação; o resultado acompanha o pacote.
4. Rafa avalia no preview e, no mobile, **no próprio Galaxy A15, no Google Chrome** (E3, E7).
5. Aprovação, ajustes ou recusa são registrados no `FASE-N.md`.

### 2.2 Critérios de avaliação

| Critério | Pergunta |
|---|---|
| Fidelidade | Corresponde à especificação v1.1, sem reinterpretação? |
| Identidade | Parece concebido para RAFA, e não um template? (salvaguardas da [`DESIGN-SPEC.md`](DESIGN-SPEC.md) §15) |
| Hierarquia | A ordem de leitura é a pretendida? O posicionamento é entendido de imediato? |
| Ritmo e proporção | Espaço negativo, alternância de composições e variação de padding funcionam? |
| Tipografia | O contraste de escala dá personalidade? Manrope e Inter se distinguem? |
| Fotografia | Integra-se à composição sem parecer foto corporativa? Não domina o mobile? |
| Tom do texto | Honesto, sem exagero, com personalidade? EN natural? |
| Experiência mobile | A primeira experiência é curta e clara? O toque é confortável? |
| Movimento | Discreto, com função, sem chamar atenção para si? |

---

## 3. Primeira dobra mobile (regra A2)

### 3.1 Critério

Com a página no topo, **o H1 (posicionamento) e a linha "01 Projetos" ficam inteiramente visíveis** na área efetiva do navegador.

### 3.2 Método automatizado

- **Navegador:** Chromium para Android — o motor do Google Chrome, navegador principal de Rafa no Galaxy A15 (E7) — e WebKit (motor do Safari) com perfis de iPhone do Playwright. O Chromium roda no ambiente de desenvolvimento e no CI; o WebKit não está instalado no ambiente de desenvolvimento e roda só no CI (GitHub Actions).
- **Fontes carregadas:** o teste espera `document.fonts.ready` e confirma que Manrope 500/600, Inter 400 e JetBrains Mono 400 foram de fato carregadas. Medir com a fonte substituta não vale.
- **Animações concluídas:** o teste espera o fim da entrada do hero; também roda com movimento reduzido.
- **Medição:** posição inferior do H1 e da linha "Projetos" comparada com `window.innerHeight`.

### 3.3 Viewports efetivos

Os perfis de iPhone do Playwright já descontam as barras do Safari na maioria dos modelos. O perfil "iPhone SE (3rd gen)" é a exceção: usa a tela inteira (375 × 667), por isso **não** serve para este teste.

| Perfil | Viewport efetivo | Origem |
|---|---|---|
| **Samsung Galaxy A15 de Rafa, Google Chrome** (E3, E7) | **A medir** no aparelho, com as barras do Chrome abertas. Referência inicial da tela: 412 × 892 CSS px, a confirmar. | **Sem estimativa (E7):** o teste de primeira dobra deste perfil só é criado com os valores medidos. A referência 412 × 892 vem de aparelhos Samsung com a mesma tela (1080 × 2340, densidade 2,625) e serve apenas de ponto de partida. A configuração "Zoom da tela" do aparelho pode mudar a largura; a medição registra a configuração usada. |
| iPhone SE (2ª/3ª geração) no Safari | 375 × 548 | **Estimativa**; o perfil do Playwright não desconta as barras. A confirmar num aparelho real. |
| iPhone 13 Mini | 375 × 629 | Perfil do Playwright |
| iPhone 13 / 14 | 390 × 664 | Perfil do Playwright |
| iPhone 16e | 390 × 651 | Perfil do Playwright |
| iPhone 16 | 393 × 659 | Perfil do Playwright |
| iPhone 16 Pro Max | 440 × 763 | Perfil do Playwright |


**Diagnóstico do Galaxy A15 (E7, E9, E10):** a página **`/medir` do preview** lê, no próprio Chrome do aparelho, as APIs nativas `window.innerWidth`/`innerHeight`, `screen.width`/`height` (e `availWidth`/`availHeight`), `window.devicePixelRatio`, `window.visualViewport` e `screen.orientation`. As medidas só podem vir do aparelho: o Playwright emula um perfil, não detecta o celular de Rafa.

| Leitura | O que registra |
|---|---|
| Na abertura | A primeira leitura, antes de qualquer rolagem: área útil **com a barra do Chrome visível**. Não muda depois. |
| Interface do Chrome + Android | `screen.height − innerHeight` na abertura: barra de status e de navegação do Android somadas à barra do Chrome. |
| Variações | Menor e maior altura útil em cada orientação. A rolagem recolhe a barra do Chrome e a altura cresce; a diferença estima a barra. A rotação registra a horizontal. |
| `visualViewport` | Área realmente visível e escala (difere do `innerHeight` com zoom de pinça ou teclado aberto). |
| Diagnóstico completo | JSON copiado pelo botão "Copiar diagnóstico", com todas as leituras e o identificador do navegador (`userAgent`). |

**Como os dados entram no Playwright:** um perfil "Galaxy A15 · Chrome" (Chromium, `isMobile`, `hasTouch`) com `deviceScaleFactor` = densidade medida, `screen` = tela medida, `userAgent` do aparelho e dois viewports — **barras visíveis** (leitura de abertura) e **barra recolhida** (maior altura na vertical). Na Fase 1, a suíte existente (rotas, 404 por idioma, funcionamento sem JavaScript, fontes) passa a rodar também nesse perfil; na Fase 3, ele é o perfil de referência dos testes de primeira dobra, que usam a leitura com as barras visíveis, a mais restritiva.

### 3.4 Confirmação humana

O teste automatizado aproxima o navegador real; não o substitui. A confirmação final é Rafa abrir o preview **no próprio Galaxy A15** e enviar uma captura da primeira dobra. Como Rafa não usa iPhone, os perfis de iPhone ficam cobertos apenas pelos testes em WebKit no CI.

### 3.5 Desktop

1440 × 800 e 1280 × 720, em Chromium e WebKit: H1 e faixa-índice visíveis.

---

## 4. Matriz de capturas

Todas as páginas, nos dois idiomas:

| Dimensão | Motor | O que verifica |
|---|---|---|
| 320 × 568 | Chromium | Largura mínima, sem rolagem horizontal (não se exige primeira dobra) |
| medido | Chromium (Android) | Galaxy A15 de Rafa no Chrome — entra na matriz quando medido (E7) |
| 375 × 548 | WebKit | iPhone SE no Safari (estimativa) |
| 390 × 664 | WebKit | iPhone 13/14 |
| 393 × 659 | WebKit | iPhone 16 |
| 768 × 1024 | Chromium | Tablet em pé |
| 1024 × 768 | Chromium | Tablet deitado / notebook pequeno |
| 1280 × 720 | Chromium | Primeira dobra de notebook |
| 1440 × 900 | Chromium e WebKit | Referência desktop |
| 1920 × 1080 | Chromium | Limite do container |

---

## 5. Capturas de referência

- Só são criadas **depois** que Rafa aprova o visual da fase.
- São geradas e comparadas apenas no CI (Linux), para evitar diferenças de renderização entre sistemas.
- Atualizar uma captura de referência exige a mesma aprovação: uma mudança visual nunca é "aceita" apenas atualizando a referência.

---

## 6. Itens que dependem de Rafa

- Avaliação visual de cada fase.
- Medição da área útil do Galaxy A15 no Chrome, com as barras abertas, e confirmação da primeira dobra no aparelho.
- Teste com leitor de tela (TalkBack no Galaxy A15, ou NVDA no computador) na Fase 6, que não pode ser executado no ambiente de desenvolvimento.
- Revisão de cada afirmação de conteúdo sobre os projetos (Fase 4) e dos textos em inglês (Fase 5).
