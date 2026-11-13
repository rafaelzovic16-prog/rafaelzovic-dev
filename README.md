# RAFA — Portfolio

**Digital Craft & Engineering · Menos ruído. Mais intenção.**

Repositório do portfólio pessoal de Rafa, publicado futuramente em `rafaelzovic.dev`.

> **Status atual:** Fase 0 aprovada em 2026-11-06. Fase 1 (fundação) pronta para encerrar, aguardando o merge da PR #1. Fase 2 (sistema visual: tokens, tipografia, grid, primitivos e a página interna `/specimen`) implementada e **aguardando a validação visual de Rafa**. A home ainda não tem a composição final (Fase 3). Cada fase depende de aprovação explícita; veja o [roadmap](docs/ROADMAP.md).

## Documentação

| Documento | Para que serve |
|---|---|
| [Briefing](docs/BRIEFING.md) | Fonte de verdade do projeto (v1.0, não editado) |
| [Especificação de design v1.1](docs/DESIGN-SPEC.md) | Identidade, design system, wireframes e comportamento aprovados |
| [Decisões](docs/DECISIONS.md) | Tudo o que refina ou substitui o briefing, com data |
| [Arquitetura](docs/ARCHITECTURE.md) | Estrutura, rotas, internacionalização e modelo de conteúdo |
| [Dependências](docs/DEPENDENCIES.md) | Política de versões e matriz verificada |
| [Validação](docs/VALIDATION.md) | Testes automatizados × avaliação visual humana |
| [Inventário de conteúdo](docs/CONTENT-INVENTORY.md) | O que falta e o que já foi verificado |
| [Roadmap](docs/ROADMAP.md) | Fases e critérios de conclusão |
| [Fase 0](docs/FASE-0.md) · [Fase 1](docs/FASE-1.md) · [Fase 2](docs/FASE-2.md) | Registro de cada fase |

## Princípios

- **Intenção:** cada elemento existe por um motivo.
- **Evidência:** nenhuma afirmação sobre projetos, competências ou resultados sem fonte verificável.
- **Fidelidade:** a identidade visual aprovada não muda sem autorização.
- **Simplicidade:** nenhuma abstração antes de ser necessária.
- **Acessível e independente de JavaScript** para o conteúdo essencial.

## Stack

Next.js 16 · React 19 · TypeScript (estrito) · Tailwind CSS 4 · Vitest · Playwright · Vercel. Versões exatas e justificativas em [Dependências](docs/DEPENDENCIES.md).

## Desenvolvimento

Pré-requisito: **Node.js 24** (`nvm use` lê o `.nvmrc`). O `.npmrc` usa `engine-strict=true`, então a instalação falha com uma mensagem clara em outra versão.

```bash
npm ci            # instala exatamente o que está no lockfile
npm run dev       # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run lint` | ESLint (regras do Next.js, TypeScript e acessibilidade), sem tolerar avisos |
| `npm run format:check` | Confere a formatação (`npm run format` corrige) |
| `npm run typecheck` | Gera os tipos de rotas e roda `tsc --noEmit` |
| `npm test` | Testes unitários (Vitest) |
| `npm run build` | Build de produção |
| `npm run test:e2e` | Testes E2E no Chromium, contra o build de produção (rode `npm run build` antes; na primeira vez, `npx playwright install chromium`) |
| `npm run check` | Lint, formatação, tipos, testes unitários e build, em sequência |

### Página interna `/specimen`

Catálogo do sistema visual e diagnóstico de viewport. Existe só no servidor de desenvolvimento (`npm run dev`) e nos previews da Vercel; em produção, responde 404. Para gerar as capturas da matriz de validação (depois de `npm run build`):

```bash
CAPTURAS_DIR=/caminho/da/pasta npx playwright test capturas --project=chromium-desktop
```

### Fontes

As fontes ficam versionadas em `assets/fonts/` (decisão T2.1): nem o build nem o site dependem de serviço externo. Elas só precisam ser geradas de novo para atualizar a versão, com `scripts/build-fonts.sh` (procedimento e proveniência em [Dependências](docs/DEPENDENCIES.md) §8).

### Publicação

Nenhum merge na `main` publica o site: a publicação automática da `main` na Vercel está desligada no `vercel.json` até a Fase 7 (decisão T6). Cada branch gera um preview, protegido pela Vercel Authentication.

### Variáveis de ambiente

| Variável | Efeito |
| --- | --- |
| `SITE_INDEXABLE` | Só com `true` o site permite indexação. Sem ela, `robots.txt` e as páginas pedem `noindex` (decisão T5). Será definida apenas em produção, na Fase 7. |
