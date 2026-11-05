# RAFA — Registro de decisões

Decisões aprovadas. Alterações futuras devem ser registradas com data, contexto e impacto; não sobrescrever silenciosamente.

## Design D1–D9
| ID | Decisão | Estado |
|---|---|---|
| D1 | Posicionamento PT: Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer. | Aprovado |
| D2 | Posicionamento EN: Web Developer in training, working towards becoming a Software Engineer. | Aprovado |
| D3 | Hero/Projetos/Sobre em Bone; Competências/Contato em Charcoal | Aprovado |
| D4 | Foto natural, saturação -15% aproximadamente | Aprovado |
| D5 | Ordem: Qualyt Trend, SaldoZen | Aprovado |
| D6 | "Menos ruído. Mais intenção." como assinatura; posicionamento na primeira dobra | Aprovado |
| D7 | Posicionamento é H1; frase conceitual é display não-título | Aprovado |
| D8 | Frase de apresentação antiga orienta abertura de Sobre, não o hero | Aprovado |
| D9 | Nav inclui Início; links sem numeração; números ficam nos rótulos de seção | Aprovado |

## Implementação P1–P7
| ID | Decisão | Estado |
|---|---|---|
| P1 | Repositório próprio rafaelzovic-dev, separado do SaldoZen | Aprovado |
| P2 | i18n próprio com dois layouts raiz PT/EN | Aprovado |
| P3 | Sem Framer Motion v1; CSS e aprimoramentos pequenos de cliente | Aprovado |
| P4 | Conteúdo TypeScript tipado com evidências; reavaliar MDX se necessário | Aprovado |
| P5 | Estrutura i18n na Fase 1; textos PT/EN juntos | Aprovado |
| P6 | Ajuste mobile M1: posicionamento e link Projetos antes da foto | Aprovado |
| P7 | Vercel desde Fase 1 para previews, após conexão autorizada | Aprovado como plano; conexão pendente |

## Guardrails
1. Nunca implementar no repositório saldozen-financeiro.
2. Cada fase: branch, PR, CI, preview quando aplicável, revisão do usuário e aprovação explícita antes do merge.
3. Não iniciar fase seguinte sem aprovação da anterior.
4. Funcionalidade concluída exige evidência rastreável.
5. Não inventar links, capturas, métricas, credenciais ou experiência.
6. Pendências podem existir durante desenvolvimento, mas bloqueiam release.
7. Domínio, compra, DNS e ações externas exigem autorização explícita no momento da ação.
8. Dados de contato só com confirmação.
9. Preservar funcionamento essencial sem JavaScript.
10. Limitações técnicas e divergências devem ser documentadas e aprovadas antes de mudar escopo.

## Colaboração
- Claude: implementação conforme escopo da fase.
- ChatGPT: planejamento, revisão independente e auditoria.
- Rafa: decisões, validação visual e aprovação de PR/merge.
- Nenhum agente faz merge sem autorização explícita de Rafa.