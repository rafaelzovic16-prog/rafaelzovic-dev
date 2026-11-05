# RAFA — Especificação de design v1.1

Status: aprovada. Implementação não iniciada nesta fase.

## Posicionamento
- PT: "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer."
- EN: "Web Developer in training, working towards becoming a Software Engineer."
- Assinatura visual: "Menos ruído. Mais intenção."
- O posicionamento é o H1; a frase conceitual é display, não título.
- A frase "construindo soluções digitais com atenção à engenharia, ao design e aos detalhes" orienta a abertura de Sobre.

## Direção visual e navegação
- Hero, Projetos e Sobre: Bone. Competências e Contato: bloco Charcoal contínuo.
- Fotografia natural, saturação reduzida em aproximadamente 15%.
- Ordem: 01 Qualyt Trend; 02 SaldoZen.
- Navegação: Início, Projetos, Sobre, Contato. Links sem numeração; marcador Sage no item ativo.

## Hero responsivo
- Desktop: meta "RAFA — Digital Craft & Engineering"; display Manrope 600, 96px/0.95; H1 Manrope 500, 28px/1.3; foto 4:5 à direita; faixa-índice.
- Tablet: texto colunas 1–5, foto 6–8; display 64px; H1 24px.
- Mobile: nav, meta, display, H1, link Projetos, foto e link Sobre. Display 44px até 380px e 48px acima; H1 20px/1.4. Foto em 3 de 4 colunas, alinhada à direita.
- Alvo: H1 e link Projetos integralmente visíveis em viewport 375×548.

## Página principal
1. Hero.
2. 01 — Trabalhos selecionados: Qualyt Trend com imagem 16:10 nas colunas 1–8 e texto 9–12; SaldoZen com texto 1–4 e imagem 4:3 nas colunas 6–12. Índice de arquivo somente a partir do terceiro projeto.
3. 02 — Sobre: rótulo 1–3; abertura Manrope 32px nas colunas 4–11; corpo em duas colunas; princípios Intenção, Engenharia e Evolução.
4. Bloco Charcoal contínuo: 03 Competências (seis áreas com evidências); regra interna Ivory 12%; 04 Contato (GitHub, LinkedIn, e-mail copiar e WhatsApp somente se aprovado); rodapé.

## Estudos de caso
Tabela de metadados; sumário fixo à esquerda; texto colunas 4–9; marginália 10–12; seção 04 Arquitetura em Charcoal. Mobile: fólio fixo "04 / 10".

## Fotografia
Original mínimo 2400px no lado maior (RAW/TIFF/JPEG alta qualidade); recorte 4:5, olhos no terço superior, meio torso até acima da cabeça; fundo neutro quente Bone/Stone. Tratamento na exportação, não CSS. Entrega AVIF e WebP em 480/960/1440px com ponto focal. Alt PT "Retrato de Rafa"; EN "Portrait of Rafa". Enquanto pendente, moldura Stone e rótulo "Fotografia — pendente", sem imagem substituta.

## Design system
### Cores
| Token | Hex |
|---|---|
| bone | #F2F0E9 |
| graphite | #171817 |
| stone | #D9D7CF |
| sage | #788176 |
| charcoal | #20211F |

Superfície clara Bone/texto Graphite; escura Charcoal/texto Ivory (= Bone). Texto muted: Graphite 72% ou Ivory 70%. Regra: Stone ou Ivory 12%. Accent Sage; foco Graphite/Ivory. Sage nunca em texto abaixo de 24px; usos: status, nav ativa, régua de marginália, hover de título e links de contato. Stone é decorativo; controles usam bordas com cor de texto.

### Tipografia
| Estilo | Fonte/peso | Desktop | Tablet | Mobile | Tracking |
|---|---|---:|---:|---:|---:|
| display | Manrope 600 | 96/0.95 | 64/0.98 | 48/1.0 | -0.04em |
| h1-position | Manrope 500 | 28/1.3 | 24/1.35 | 20/1.4 | -0.01em |
| h2 | Manrope 600 | 52/1.05 | 42/1.08 | 34/1.1 | -0.03em |
| h3 | Manrope 600 | 40/1.1 | 32/1.12 | 28/1.15 | -0.02em |
| contact-xl | Manrope 600 | 72/1.0 | 56/1.0 | 36/1.05 | -0.03em |
| lead | Manrope 500 | 32/1.3 | 26/1.32 | 22/1.35 | -0.01em |
| body | Inter 400 | 17/1.65 | 16/1.65 | 16/1.6 | 0 |
| body-sm | Inter 400 | 15/1.55 | 15/1.55 | 15/1.5 | 0 |
| meta | JetBrains Mono 400 | 12/1.4 | 12/1.4 | 11/1.4 | 0 |

Escala fluida; corpo mínimo 16px. Fontes locais: Manrope 500/600, Inter 400/500, JetBrains Mono 400, latin e latin-ext.

### Grid e forma
Breakpoints 375/768/1024/1280/1440; 4/8/12 colunas (12 a partir de 1024); gutters 16/20/24px; margens 20px mobile e clamp(24px, 7vw, 112px) a partir do tablet; container 1440px. Escala de espaço 8/16/24/32/48/64/96/128/160/192px. Padding desktop: Projetos 160/192; Sobre 192/160; Competências 128/128; Contato 160/96. Mobile cerca de 60%. Regras 1px; raio 0, exceto 4px em botões/foco. Leitura até 68 caracteres; toque mínimo 48px.

### Movimento
Easing cubic-bezier(.2,.7,.1,1). Durações: estados 150ms; hover 250ms; reveal 500ms; hero 600ms linhas e 800ms foto, intervalo 80ms; rota 200ms. Reveal desloca 16px uma vez em títulos e blocos de projeto. Reduced motion: sem deslocamento/escala, opacidade 150ms. Sem JS, conteúdo sempre visível.

## Acessibilidade e metadados
Skip link primeiro; foco 2px com afastamento 3px; um H1 por página; lang correto. Status nunca só por cor. Títulos: PT "Rafa — Desenvolvedor web em formação"; EN "Rafa — Web Developer in training". Status informados: Qualyt Trend em desenvolvimento; SaldoZen em desenvolvimento, Fase 2.1 (validar fontes antes de publicar). Não afirmar funcionalidades sem confirmação.

## Componentes
Nav, LanguageSwitch, SectionLabel, IndexLink, ProjectFeature, ProjectIndexRow, StatusMarker, MetaTable, TechLedger, CapabilityRow, ContactLink, Button, Figure, PhotoFrame, MarginNote, CaseStudyTOC e Footer, com estados e variantes da especificação v1.1.

## Pendências que bloqueiam publicação
Foto; URLs GitHub/LinkedIn; e-mail; decisão sobre WhatsApp; texto Sobre; inventário e capturas reais dos projetos; links de demonstração/repositórios; domínio.