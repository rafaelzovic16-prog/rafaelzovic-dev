# Inventário de conteúdo

> Tudo o que o site precisa mostrar e ainda não está disponível, ou que precisa de confirmação.
> **Regra C2:** nada é publicado sem fonte verificável ou confirmação de Rafa. Durante o desenvolvimento, item pendente aparece como marcador "pendente"; na publicação, o comando `check:release` falha se algum item obrigatório continuar pendente.

Atualizado em 2026-11-05.

---

## 1. Identidade e contato

| Item | Situação | Necessário a partir de | Bloqueia publicação | Observações |
|---|---|---|---|---|
| Fotografia profissional | Pendente | Fase 3 (moldura "pendente" até lá) | Sim | Especificação em [`DESIGN-SPEC.md`](DESIGN-SPEC.md) §7. |
| URL do GitHub | Pendente | Fase 3 | Sim | Os repositórios estão na conta `rafaelzovic16-prog`. **Confirmar se é este o perfil a exibir.** |
| URL do LinkedIn | Pendente | Fase 3 | Sim | — |
| E-mail profissional | Pendente | Fase 3 | Sim | — |
| WhatsApp | **Decisão pendente:** exibir ou não | Fase 3 | Só se Rafa decidir exibir | Nenhum número fictício. |

## 2. Textos

| Item | Situação | Necessário a partir de | Bloqueia publicação | Observações |
|---|---|---|---|---|
| Texto da seção Sobre (PT e EN) | Pendente | Fase 3 (estrutura) | Sim | Escrito por Rafa, ou rascunho aprovado por Rafa. Abertura orientada por D8. Evitar frases genéricas (Briefing §6.4). |
| "Como trabalho" (3 afirmações) | Pendente | Fase 3 | Sim | Temas aprovados: Intenção · Engenharia · Evolução. |
| Frase de cada área de competência | Pendente | Fase 3 | Sim | Cada área precisa de evidência em um estudo de caso. |
| Tecnologias "em estudo" | Pendente | Fase 3 | Não (a lista pode ficar vazia) | Informadas por Rafa. |

## 3. Projetos

### 3.1 Qualyt Trend

| Item | Situação | Observações |
|---|---|---|
| Fonte | Repositório **privado** `rafaelzovic16-prog/qualyt-trend` | Leitura apenas com autorização, na Fase 4. Sem link público (C1). |
| Fatos conhecidos | Só os do briefing, **não verificados** | E-commerce com Next.js e Supabase, catálogo real, estrutura de dados e experiência de compra. |
| Ano, estágio atual, funcionalidades e status | Pendente | Verificados no repositório ou informados por Rafa. |
| Contexto, decisões técnicas, desafios, processo | Pendente | Base do estudo de caso. |
| Capturas reais | Pendente | — |
| Demonstração | Desconhecida | Só aparece se existir. |

### 3.2 SaldoZen

| Item | Situação | Observações |
|---|---|---|
| Fonte | Repositório **privado** `rafaelzovic16-prog/saldozen-financeiro` | Usado apenas para leitura (G3). Sem link público (C1). |
| Fatos verificados em 2026-11-05 | README, `package.json` e histórico | Fundação técnica (Fase 1) concluída. Funções de dinheiro e datas com testes (Fase 2.1) integradas à `main` em 2026-10-27. **Ainda sem login, banco de dados ou dados financeiros.** Stack em uso: Next.js, React, TypeScript, Tailwind CSS, Vitest, Playwright. Supabase **planejado, não instalado**. |
| Documentação de processo | Disponível | `docs/ROADMAP.md`, `docs/FASE-0.md`, `docs/FASE-1.md`, `docs/FASE-2.md`, CI e PRs. Base para "Processo" e "Decisões técnicas". |
| Ano, contexto, decisões e desafios | A redigir na Fase 4 | Rascunho a partir das fontes, revisado afirmação por afirmação por Rafa. |
| Capturas reais | Pendente | Mostrar o que existe de fato no estágio atual. |
| Demonstração | Não existe | "Demo não publicada". |

**Status do SaldoZen muda com o tempo:** os fatos acima são relidos na Fase 4 e de novo antes da publicação.

## 4. Publicação

| Item | Situação | Observações |
|---|---|---|
| Domínio `rafaelzovic.dev` | Não verificado | Consulta de disponibilidade e preço na Fase 7. **Compra só com autorização de Rafa (G2).** |
| Projeto na Vercel | Não criado | Fase 1, com autorização específica (P7). |
