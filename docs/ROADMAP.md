# RAFA — Roadmap

Base: design v1.1 e plano técnico v1.0. Estado: Fase 0, documentação. Código de aplicação não iniciado.

## Fluxo
Branch própria → PR → CI verde → preview Vercel quando aplicável → relatório/capturas → revisão de Rafa → aprovação explícita → merge. Fase seguinte somente após aprovação da anterior.

## Fase 0 — Repositório e documentação
- [x] Confirmar repositório próprio.
- [x] Registrar design v1.1, decisões D1–D9/P1–P7, roadmap e inventário.
- [ ] Rafa revisar documentos.
- [ ] Rafa aprovar início da Fase 1.
Fora do escopo: código, dependências, build e deploy.

## Fase 1 — Fundação
Next.js 16, React 19, TypeScript estrito, Tailwind 4; ESLint, Prettier, Vitest, Playwright, npm run check; fontes locais; rotas e layouts PT/EN, 404 por idioma, redirects e dicionários tipados; CI. Integração Vercel somente após autorização/conexão. Critério: checks, rotas, lang, redirects, 404 e preview validados.

## Fase 2 — Sistema visual
Tokens, superfícies, tipografia fluida, grid, espaçamento, primitivos, /specimen (preview/noindex) e overlay de grid. Critério: capturas Bone/Charcoal, contraste, foco e tokens validados.

## Fase 3 — Home
Header, nav/menu, hero M1, índice, Projetos, Sobre, Competências, Contato e rodapé. Sem animações. PT/EN juntos; conteúdo pendente sinalizado. Critério: primeira dobra, capturas, sem JS, teclado, acessibilidade e sem overflow a 320px.

## Fase 4 — Estudos de caso
Conteúdo tipado/evidências, 10 seções, sumário e marginália. SaldoZen baseado em README/docs/PRs reais; Qualyt Trend depende de repositório/material fornecido. Capturas reais. Nenhuma conclusão sem evidência e revisão de Rafa.

## Fase 5 — Inglês e metadados
Revisão EN, metadata por rota, canonical, hreflang, OG e seletor preservando seção. Testes de paridade e troca de idioma.

## Fase 6 — Refinamento
Movimento CSS, hover/reveal, reduced motion, auditoria acessibilidade, otimização de imagem/fonte, sitemap, robots e JSON-LD Person somente com dados reais. Capturas de referência. Teste manual de leitor de tela por Rafa. Critério: metas de desempenho, axe sem violações sérias/críticas e sem regressão sem JS.

## Fase 7 — Publicação
npm run check:release sem pendências; deploy produção; consulta de disponibilidade/preço de rafaelzovic.dev. Compra e DNS somente com autorização explícita. Checklist final e aprovação.

## Matriz visual
320×568; 375×548; 390×844; 768×1024; 1024×768; 1280×720; 1440×900; 1920×1080. Capturas limpas e com grid, URL do preview e observações.

## Critérios mensuráveis
H1 e link Projetos na primeira dobra; sem overflow a 320px; corpo ≥16px; toque ≥48px; foco visível; contraste AA; status não depende só de cor; conteúdo completo sem JS; reduced motion sem deslocamento/escala. Lighthouse mobile alvo: Performance ≥95, Acessibilidade 100, SEO 100, LCP ≤2s, CLS ≤0,05, TBT ≤150ms. Comparação visual automatizada após congelar referências.

## Validações técnicas obrigatórias
Versões exatas e compatibilidade de Next/React/TS/Tailwind e ferramentas devem ser verificadas na implementação, não presumidas. Prototipar dois layouts raiz e catch-all 404 na versão instalada. Mudanças que alterem requisito aprovado precisam de registro e aprovação.