# Roadmap

> **Regra G1:** nenhuma fase começa sem aprovação explícita de Rafa. A conclusão de uma fase exige CI verde **e** aprovação visual humana (A3).
> A ordem segue o Briefing §16, com a estrutura de i18n antecipada para a Fase 1 (P5) e uma Fase 0 de documentação.

| Fase | Objetivo | Entregas principais | Critério de conclusão | Status |
|---|---|---|---|---|
| **0 · Documentação** | Registrar tudo o que foi aprovado antes de escrever código | Briefing, especificação v1.1, decisões, arquitetura, dependências, validação, inventário de conteúdo, `CLAUDE.md` | Rafa revisa e aprova a documentação | **Aprovada em 2026-11-06** |
| **1 · Fundação** | Projeto rodando, com qualidade e rotas desde o início | Dependências verificadas e teste de fumaça (A1); Next.js, TypeScript, Tailwind; ESLint, Prettier, Vitest, Playwright, CI; fontes; esqueleto das rotas PT/EN com layouts raiz, 404s, redirecionamentos e dicionários tipados; projeto na Vercel com previews (autorização específica) | `npm run check` verde; rotas, `lang`, 404s e redirecionamentos testados; preview no ar; aprovação de Rafa | **Pronta para encerrar** — auditoria de 2026-11-13 aprovada em todos os critérios; aguarda o merge da PR #1 por Rafa |
| **2 · Sistema visual** | Identidade materializada em tokens e primitivos | Cores e superfícies, escala tipográfica fluida, grid 4/8/12, espaçamentos, primitivos com estados, página `/specimen`, sobreposição do grid | Capturas do `/specimen` em toda a matriz; tokens verificados; **validação visual da identidade por Rafa** | **Em andamento** (autorizada em 2026-11-13, E12) |
| **3 · Página principal** | Home completa, ainda sem animações | Header e menu, hero (com M1), Projetos (A/B), Sobre, Competências, Contato, rodapé — PT e EN | Testes de primeira dobra (Chromium/Android e WebKit), sem JS, teclado, toque, axe; capturas da matriz; confirmação no Galaxy A15 de Rafa; aprovação de Rafa | Não iniciada |
| **4 · Estudos de caso** | Autoridade baseada em evidência | Modelo de conteúdo com evidência; página de estudo de caso; conteúdo do SaldoZen e do Qualyt Trend; diagramas; capturas reais | Testes de evidência verdes; **revisão de cada afirmação por Rafa**; aprovação visual | Não iniciada |
| **5 · Inglês e metadados** | Versão EN completa e natural | Revisão do EN, metadados por página, `hreflang`, imagens Open Graph, seletor que preserva a seção | Testes de paridade, troca de idioma e metadados; revisão do EN por Rafa | Não iniciada |
| **6 · Refinamento** | Experiência final | Movimentos aprovados, movimento reduzido, auditoria de acessibilidade, SEO, desempenho; capturas de referência travadas | Metas de desempenho relatadas (A4); axe limpo; teste com leitor de tela por Rafa; aprovação final da experiência | Não iniciada |
| **7 · Publicação** | Site no ar no domínio próprio | `check:release` sem pendências; produção na Vercel; consulta de domínio; compra e DNS **apenas com autorização (G2)** | Checklist final no domínio definitivo; aprovação de Rafa para cada ação externa | Não iniciada |

Detalhes de cada fase ficam em `docs/FASE-N.md`, criado quando a fase começa.

## Fluxo de cada fase

Registrado por Rafa (commit `9f9501d`):

Branch própria → PR → CI verde → preview Vercel quando aplicável → relatório/capturas → revisão de Rafa → aprovação explícita → merge. Fase seguinte somente após aprovação da anterior. **Nenhum agente faz merge sem autorização explícita de Rafa.**

## Validações técnicas obrigatórias

Registrado por Rafa (commit `9f9501d`):

Versões exatas e compatibilidade de Next/React/TS/Tailwind e ferramentas devem ser verificadas na implementação, não presumidas. Prototipar dois layouts raiz e catch-all 404 na versão instalada. Mudanças que alterem requisito aprovado precisam de registro e aprovação.

## Matriz visual e critérios mensuráveis

Detalhados em [`VALIDATION.md`](VALIDATION.md). A matriz registrada por Rafa (`320×568; 375×548; 390×844; 768×1024; 1024×768; 1280×720; 1440×900; 1920×1080`) está contida na de `VALIDATION.md`; a diferença é que lá o iPhone 12–14 aparece pelo viewport **efetivo** do Safari (390 × 664) em vez do tamanho total da tela (390 × 844), e o Galaxy A15 de Rafa entra como perfil próprio (E3).
