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
| `@axe-core/playwright` | 4.14.0 | 2026-10-15 | Auditoria automática de acessibilidade. Aceita qualquer `playwright-core`. Exige Node ≥ 22.12. |
| `lucide-react` | 1.64.0 | 2026-10-29 | O pacote publica quase diariamente; escolher a versão mais recente com 7 dias ou mais no momento da instalação. Aceita React 19. |
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

**Decisão proposta:** aceitar o alerta de desenvolvimento, sem forçar versões fora da faixa declarada pelo pacote. O risco é baixo: afeta só o lint, que processa padrões escritos por nós, e nada disso vai para o site publicado. Reavaliar a cada atualização do `typescript-eslint`.

### 7.4 Ainda não instalados

`lucide-react` e `@axe-core/playwright` estão aprovados, mas só são instalados quando forem usados (Fases 2 e 3), com nova reverificação nesse momento (A5).

### 7.5 GitHub Actions

`actions/checkout`, `actions/setup-node` e `actions/upload-artifact` na versão principal v7, a mais recente de cada uma em 2026-11-06 (consulta às tags dos repositórios).
