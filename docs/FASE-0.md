# Fase 0 — Documentação

> **Status:** concluída pelo desenvolvimento; **aguarda revisão e aprovação de Rafa.**
> **Autorização:** início aprovado por Rafa em 2026-11-05, após a criação do repositório e o anexo à sessão.

## Objetivo

Registrar no repositório tudo o que foi aprovado — briefing, especificação de design, decisões e plano técnico — antes de qualquer código, e verificar as dependências antes da instalação (A1).

## Entregas

| Arquivo | Conteúdo |
|---|---|
| [`BRIEFING.md`](BRIEFING.md) | Briefing original v1.0, sem alterações de conteúdo |
| [`DESIGN-SPEC.md`](DESIGN-SPEC.md) | Especificação de design v1.1 aprovada, com M1 incorporado |
| [`DECISIONS.md`](DECISIONS.md) | Decisões D1–D9, P1–P7, ajustes A1–A6, governança G1–G3, conteúdo C1–C2 |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Plano técnico: estrutura, rotas, i18n, modelo de conteúdo, estilo, movimento |
| [`DEPENDENCIES.md`](DEPENDENCIES.md) | Política de versões e matriz proposta, verificada no registro do npm |
| [`VALIDATION.md`](VALIDATION.md) | Separação entre testes automatizados e avaliação humana; método da primeira dobra |
| [`CONTENT-INVENTORY.md`](CONTENT-INVENTORY.md) | Conteúdo pendente e fatos verificados |
| [`ROADMAP.md`](ROADMAP.md) | Fases, entregas e critérios de conclusão |
| `README.md` | Visão geral e índice |
| `CLAUDE.md` | Regras de trabalho para sessões futuras do assistente, apontando para estes documentos |

## Verificações realizadas (2026-11-05)

- **Registro do npm** (somente leitura): versões estáveis, datas de publicação, `peerDependencies` e `engines` de cada pacote candidato. Resultado em [`DEPENDENCIES.md`](DEPENDENCIES.md).
- **Notas de versão do Next.js:** a 16.4.5 contém apenas correções de segurança (7 alertas moderados); a 16.4.4, apenas correções de bugs.
- **Perfis de dispositivo do Playwright:** os perfis de iPhone recentes descontam as barras do Safari; o do iPhone SE (3ª geração) não. Isso corrigiu o plano: 375 × 548 passou a ser tratado como **estimativa** a confirmar num aparelho real ([`VALIDATION.md`](VALIDATION.md) §3.3).
- **Ambiente de desenvolvimento:** Node 22 e 24 disponíveis; apenas Chromium pré-instalado (WebKit roda no CI).
- **Visibilidade dos repositórios:** `rafaelzovic-dev` público; `saldozen-financeiro` e `qualyt-trend` privados (regra C1).

## Não feito, por definição da fase

- Nenhum código, nenhuma instalação de pacote, nenhum `package.json`.
- Nenhuma ação na Vercel ou relacionada a domínio.
- Nenhuma leitura do repositório `qualyt-trend`.
- Nenhuma alteração no repositório do SaldoZen.

## Pontos para a revisão de Rafa

1. **Matriz de dependências** ([`DEPENDENCIES.md`](DEPENDENCIES.md)): aprovar a política e as versões propostas, em especial:
   - Next.js 16.4.5 pela exceção de segurança;
   - TypeScript 5.9.3 e ESLint 9 (as versões principais mais novas são incompatíveis com o conjunto);
   - Node 24 LTS em vez de 22;
   - remoção de jsdom e Testing Library (A5).
2. **WebKit apenas no CI:** os testes de primeira dobra em WebKit rodam no GitHub Actions; no ambiente de desenvolvimento, só Chromium.
3. **Viewport do iPhone SE:** 375 × 548 é estimativa. Se possível, informar o modelo do seu iPhone para incluí-lo como perfil medido.
4. **Perfil do GitHub a exibir:** confirmar se é `rafaelzovic16-prog`.
5. **`CLAUDE.md`:** arquivo extra, não previsto no plano, para que sessões futuras sigam as regras G1, A1–A6 e C1–C2 sem depender do histórico desta conversa. Pode ser removido se preferir.

## Próxima etapa

A Fase 1 (Fundação) **só começa com aprovação explícita de Rafa**. Ela inclui a reverificação das versões, o teste de fumaça isolado e, no momento certo, um pedido de autorização específico para conectar o repositório à Vercel.

## Registro de aprovação

| Data | Decisão | Observações |
|---|---|---|
| — | Aguardando revisão | — |
