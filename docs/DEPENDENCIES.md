# Dependências — política e matriz de versões

> **Status:** **aprovada por Rafa em 2026-11-06** (E2), reverificada e instalada na Fase 1 (seção 7).
> Verificação original em 2026-11-05, consultando o registro do npm (`npm view`), as notas de versão do Next.js e o ambiente de desenvolvimento.
> A matriz é verificada de novo imediatamente antes de cada instalação ou atualização, porque versões novas são publicadas quase todos os dias.

---

## 1. Política de versões

1. **Somente versões estáveis** (`latest` ou linha de manutenção oficial). Nada de `canary`, `beta`, `rc`, `preview` ou `next`.
2. **Versões fixadas exatamente** (sem `^` ou `~`), com `package-lock.json` versionado e instalação por `npm ci`.
3. **Maturidade mínima de 7 dias** desde a publicação. **Exceção:** versões que corrigem falhas de segurança são adotadas imediatamente.
4. **Compatibilidade verificada** pelas `peerDependencies` e `engines` de cada pacote, contra o conjunto todo — não pacote a pacote.
5. **Teste de fumaça isolado** antes de gravar no repositório: num diretório temporário fora do projeto, instalar o conjunto e rodar lint, tipos, build e um teste E2E. Só depois o `package.json` do projeto é escrito.
6. **Menos dependências é melhor** (regra A5). Cada pacote precisa de uma função que o projeto realmente usa.
7. Atualizações posteriores seguem a mesma política e entram em PR própria.

---

## 2. Runtime

| Item | Proposta | Motivo |
|---|---|---|
| Node.js | **24 LTS** (24.22.1 disponível no ambiente) | O Node 22 entra em fim de vida em abril de 2027; para um projeto novo, o 24 dá suporte até 2028. Confirmar na Fase 1 que a Vercel aceita a linha 24 no plano em uso. |
| npm | 10 ou superior | Vem com o Node. |

---

## 3. Matriz proposta

| Pacote | Versão | Publicada | Motivo da escolha |
|---|---|---|---|
| `next` | **16.4.5** | 2026-11-03 | **Exceção de segurança:** é uma versão só de correções para 7 alertas de severidade moderada (incluindo um desvio na otimização de imagens SVG). Tem menos de 7 dias, mas a política prioriza segurança. |
| `react` · `react-dom` | 19.3.1 | 2026-10-14 | Versão estável atual; compatível com o `peerDependencies` do Next (`^19.0.0`). |
| `typescript` | **5.9.3** | 2025-09-30 | O TypeScript 7 (7.0.2) está **fora**: o `typescript-eslint` 8.72.1 aceita apenas `>=4.8.4 <6.1.0`. O 6.0.3 é compatível, mas traz descontinuações sem benefício para este projeto; o 5.9.3 é o mais maduro da faixa suportada. O 6.0.3 pode ser testado no teste de fumaça como alternativa. |
| `tailwindcss` · `@tailwindcss/postcss` | 4.3.3 | 2026-07-16 | A 4.3.4 saiu em 2026-11-02 (menos de 7 dias, sem correção de segurança). Reavaliar na Fase 1. |
| `eslint` | **9.39.5** | 2026-07-10 | Linha de manutenção oficial. O ESLint 10 (10.14.0) está **fora**: `eslint-plugin-react` 7.37.5 aceita até `^9.7`, `eslint-plugin-jsx-a11y` 6.10.2 e `eslint-plugin-import` 2.32.0 aceitam até `^9`, e os três vêm com o `eslint-config-next`. |
| `eslint-config-next` | 16.4.5 | 2026-11-03 | Sempre igual à versão do Next. Aceita `eslint >=9`. |
| `prettier` | 3.9.10 | 2026-10-10 | Versão estável atual. |
| `vitest` | 5.0.5 | 2026-10-15 | A 5.1.0 saiu em 2026-11-02 (menos de 7 dias). Exige Node `^22.12 \|\| ^24`. |
| `vite` | 8.3.5 | 2026-10-21 | Dependência obrigatória do Vitest (`^6.4 \|\| ^7 \|\| ^8`). A 8.3.6 saiu em 2026-11-05. |
| `@playwright/test` | **1.63.0** | 2026-09-04 | Os navegadores pré-instalados no ambiente de desenvolvimento correspondem a esta versão, o que evita configuração especial de caminho de navegador (A5). No CI, os navegadores são instalados para a versão fixada. A 1.64.0 (2026-10-07) é a alternativa se houver motivo concreto. |
| `@axe-core/playwright` | 4.14.0 → **instalado 4.14.0** (Fase 2, E15) | 2026-10-15 | Auditoria automática de acessibilidade. Aceita qualquer `playwright-core`. Exige Node ≥ 22.12. Na instalação (2026-11-13), continuava a versão mais recente; usa o mesmo `playwright-core` 1.63.0 do projeto; nenhum alerta novo no `npm audit`. |
| `lucide-react` | 1.64.0 → **instalado 1.70.0** (Fase 2) | 2026-10-29 → 2026-11-06 | O pacote publica quase diariamente; escolher a versão mais recente com 7 dias ou mais no momento da instalação. Aceita React 19. Na instalação (2026-11-13), a 1.70.0 era a mais recente com 7 dias; as 1.71.0 e 1.72.0 eram mais novas. |
| `@types/node` | 24.19.2 | 2026-10-09 | Mesma linha principal do runtime (Node 24). |
| `@types/react` · `@types/react-dom` | 19.3.0 | 2026-09-09 | Versões atuais dos tipos do React 19. |

---

## 4. Removido do plano técnico v1.0 (regra A5)

| Pacote | Motivo da remoção |
|---|---|
| `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@vitejs/plugin-react` | Os testes unitários deste projeto validam **dados** (conteúdo, rotas, paridade de idiomas, evidências) e rodam em ambiente Node. A interface é validada no navegador real pelo Playwright. Simular um navegador com jsdom seria uma camada a mais sem ganho. |
| Framer Motion | Decisão P3. |
| Biblioteca de i18n | Decisão P2. |
| MDX | Decisão P4. |

---

## 5. Versões recusadas nesta verificação

| Pacote | Versão | Motivo |
|---|---|---|
| `typescript` | 7.0.2 | Fora da faixa suportada pelo `typescript-eslint`. |
| `eslint` | 10.x | Plugins do `eslint-config-next` ainda não declaram suporte. |
| `jsdom` | 31.0.0 | Publicada no dia da verificação; e o pacote saiu do plano. |
| Qualquer `canary`/`beta`/`rc`/`preview` | — | Política §1.1. |

---

## 6. Ambiente de desenvolvimento (fatos verificados)

- Node 22.23.4 é o padrão do ambiente; Node 24.22.1 está disponível.
- Navegador pré-instalado: **apenas Chromium**, correspondente ao Playwright 1.63.0. **WebKit não está instalado** no ambiente de desenvolvimento; os testes em WebKit rodam no CI (GitHub Actions), onde a instalação de navegadores é padrão. Ver [`VALIDATION.md`](VALIDATION.md) §3.

---

## 7. Reverificação e instalação na Fase 1 (2026-11-06)

### 7.1 Reverificação no registro do npm

- **Nenhuma versão da matriz mudou.** Não saiu nova versão de segurança do Next.js depois da 16.4.5.
- Tailwind 4.3.4, Vitest 5.1.0 e Vite 8.3.6 continuam com menos de 7 dias e sem correção de segurança: mantidas as versões da matriz.
- `@types/node` já está na linha 26; mantida a 24.19.2, igual à linha do runtime (Node 24).
- **ESLint 9 está marcado no npm como "não mais suportado"** (todas as versões 9.x). Mantido mesmo assim, porque:
  - o modelo oficial do Next.js 16.4.5 (`create-next-app`) ainda instala `eslint ^9`;
  - `eslint-plugin-react`, `eslint-plugin-jsx-a11y` e `eslint-plugin-import`, que vêm com o `eslint-config-next`, ainda não declaram suporte ao ESLint 10;
  - é uma ferramenta de desenvolvimento: não vai para o site publicado.
  Reavaliar quando o `eslint-config-next` passar a aceitar o ESLint 10 nos plugins.

### 7.2 Teste de fumaça isolado (política §1.5)

Num diretório temporário fora do repositório, com Node 24.22.1 e npm 11.19.1: instalação sem conflito de `peerDependencies`; lint, verificação de tipos, build de produção, Vitest e Playwright passaram. O protótipo também testou as hipóteses de arquitetura (dois layouts raiz, página 404 por idioma, redirecionamentos com `#`); o resultado está em [`FASE-1.md`](FASE-1.md).

### 7.3 Auditoria de segurança (`npm audit`)

| Escopo | Resultado |
|---|---|
| Dependências de produção (`--omit=dev`) | **0 vulnerabilidades.** Verificado no CI a cada execução (nível moderado ou acima bloqueia). |
| Dependências de desenvolvimento | 8 alertas moderados, todos com **uma única origem**: `minimatch` 10.2.6, usado por `@typescript-eslint/typescript-estree` 8.72.1 (alerta GHSA-g3hv-75wg-m249, negação de serviço com padrões de glob). A correção está no `minimatch` 11.0.1, mas o `typescript-eslint` exige `^10`. A "correção" sugerida pelo `npm audit` é rebaixar o `eslint-config-next` para a versão 15, o que não faz sentido. |

**Decisão T4, aprovada temporariamente por Rafa em 2026-11-06:** aceitar o alerta de desenvolvimento, sem forçar versões fora da faixa declarada pelo pacote. O risco é baixo: afeta só o lint, que processa padrões escritos por nós, e nada disso vai para o site publicado.

**Monitoramento:**

- O CI registra, a cada execução, o resumo do `npm audit` das dependências de desenvolvimento (passo informativo, que não bloqueia).
- No início de cada fase, antes de qualquer instalação, verificar se o `typescript-eslint` passou a aceitar o `minimatch` 11.0.1 ou superior, e registrar o resultado no `FASE-N.md`.
- Assim que houver correção dentro da faixa declarada, atualizar seguindo a política (§1) e retirar esta exceção.

**Registro do monitoramento:**

| Data | Alertas de desenvolvimento | `typescript-eslint` | Situação |
|---|---|---|---|
| 2026-11-06 | 8 moderados | 8.72.1, exige `minimatch ^10` | aceito (T4) |
| 2026-11-13 | 7 moderados | 8.72.2, ainda exige `minimatch ^10` | aceito (T4); um dos alertas foi resolvido na origem |

### 7.4 Instalados depois da Fase 1

`@axe-core/playwright` foi instalado na Fase 2, quando passou a ser usado na validação de acessibilidade pedida em E15 (4.14.0, reverificado). `lucide-react` foi instalado na Fase 2 (1.70.0, reverificado; ver a tabela da §3 e [`FASE-2.md`](FASE-2.md)).

### 7.5 GitHub Actions

`actions/checkout`, `actions/setup-node` e `actions/upload-artifact` na versão principal v7, a mais recente de cada uma em 2026-11-06 (consulta às tags dos repositórios).

---

## 8. Fontes versionadas (decisão T2.1)

As fontes não são dependência npm: são arquivos WOFF2 gerados uma vez e versionados em `assets/fonts/`, para que nem o build nem o visitante dependam de serviço externo.

| Item | Valor |
|---|---|
| Origem | Repositório oficial [`google/fonts`](https://github.com/google/fonts), commit `86aced91de05cd4f96a06838124cca45be337b2b` (2026-11-06), pastas `ofl/manrope`, `ofl/inter`, `ofl/jetbrainsmono` |
| Arquivos de origem | `Manrope[wght].ttf`, `Inter[opsz,wght].ttf`, `JetBrainsMono[wght].ttf` (fontes variáveis) |
| Licença | SIL Open Font License 1.1, sem "Reserved Font Name" declarado. Cópia de cada `OFL.txt` em `assets/fonts/<família>/`. |
| Geração | `scripts/build-fonts.sh`: fixa o peso (e, no Inter, o tamanho óptico 14, o padrão para texto), mantém os caracteres "latin" + "latin-ext" nos intervalos do Google Fonts e salva em WOFF2 com todos os recursos OpenType |
| Ferramentas de geração | Python com `fonttools` 4.68.0 e `brotli` 1.2.1, usadas fora do projeto. Não são dependências do site. |

| Arquivo | Peso | Tamanho |
|---|---|---|
| `manrope/Manrope-500.woff2` | 500 | 18 092 bytes |
| `manrope/Manrope-600.woff2` | 600 | 18 308 bytes |
| `inter/Inter-400.woff2` | 400 | 58 560 bytes |
| `inter/Inter-500.woff2` | 500 | 60 336 bytes |
| `jetbrains-mono/JetBrainsMono-400.woff2` | 400 | 23 420 bytes |

Verificado em cada arquivo: peso correto, arquivo estático (não variável), presença dos caracteres usados em PT e EN (acentos, `ç`, `—`, `·`, aspas tipográficas, `€`) e dos recursos OpenType. Os tamanhos combinados equivalem aos do Google Fonts para "latin" + "latin-ext" (Inter 400: 58,6 KB no Google; 58,5 KB aqui).

**Atualizar as fontes:** gerar de novo com o script a partir de um commit mais recente de `google/fonts`, comparar com os arquivos atuais e registrar o novo commit nesta seção.
