# RAFA — Portfolio · Design & Development Brief

> **Documento original, versão 1.0 (briefing definitivo).** É a fonte de verdade do projeto e não é editado.
> Decisões tomadas depois dele, que refinam ou substituem trechos específicos (por exemplo, o texto de posicionamento e a biblioteca de animação), estão registradas em [`DECISIONS.md`](DECISIONS.md). A conversão das tabelas para Markdown é a única alteração de forma.

---

Versão: 1.0 — Briefing definitivo
Identidade: Rafa
Domínio pretendido: `rafaelzovic.dev`
Idiomas: Português e Inglês
Objetivo: Construir autoridade profissional e apresentar projetos, competências e evolução técnica.

---

## 1. Visão do projeto

O portfólio será a presença digital profissional de Rafa.

Não deve parecer um template de portfólio comprado, um site genérico de desenvolvedor ou uma página excessivamente decorada.

A proposta é construir uma experiência visual própria, com identidade editorial, minimalismo, precisão e personalidade.

O site precisa transmitir três ideias:

1. Intenção: cada elemento existe por um motivo.
2. Capacidade técnica: os projetos demonstram capacidade de construir e resolver problemas.
3. Evolução: apresentar uma trajetória real de aprendizado e desenvolvimento, sem exagerar experiência ou competências.

### Conceito central

Digital Craft & Engineering

Uma combinação entre desenvolvimento de software, pensamento de produto e construção de experiências digitais.

### Frase conceitual

Menos ruído. Mais intenção.

Versão em inglês:

Less noise. More intention.

---

## 2. Posicionamento profissional

### Assinatura

RAFA

### Apresentação principal

Português:

Desenvolvedor em formação, construindo soluções digitais com atenção à engenharia, ao design e aos detalhes.

English:

Aspiring Software Engineer building digital solutions with a focus on engineering, design, and detail.

### Especialização apresentada

- Desenvolvimento de software.
- Desenvolvimento web.
- Banco de dados e backend.
- Pensamento de produto.
- Resolução de problemas.
- Experiências digitais.

O posicionamento deve ser ambicioso, mas honesto. Não utilizar títulos que sugiram experiência profissional ou senioridade que ainda não foram alcançadas.

---

## 3. Direção de arte

### 3.1 Personalidade visual

O site deve ser:

- Minimalista.
- Editorial.
- Sofisticado.
- Contemporâneo.
- Técnico sem ser visualmente clichê.
- Profissional sem parecer corporativo demais.
- Autoral, com identidade reconhecível.

### Referências conceituais

A linguagem visual deve combinar:

- Layouts editoriais de publicações de design.
- Portfólios independentes de designers e engenheiros.
- Interfaces digitais de alta qualidade.
- Tipografia expressiva e grids rigorosos.
- Apresentação de projetos com estética de estudo de caso.

### Elementos proibidos ou a evitar

- Aparência de template pronto.
- Gradientes decorativos sem função.
- Glassmorphism excessivo.
- Cartões arredondados repetidos em toda a página.
- Ícones aleatórios como decoração.
- Ilustrações genéricas de robôs, circuitos ou cérebros digitais.
- Animações exageradas.
- Efeitos que prejudiquem leitura ou desempenho.
- Estatísticas, clientes, resultados ou depoimentos inventados.

---

## 4. Sistema visual — Design System

### 4.1 Paleta de cores

A identidade será híbrida, combinando superfícies claras e escuras.

| Token | Cor | Aplicação |
|---|---|---|
| Bone | `#F2F0E9` | Fundo principal |
| Graphite | `#171817` | Texto principal |
| Stone | `#D9D7CF` | Divisórias e elementos secundários |
| Sage | `#788176` | Destaques pontuais |
| Charcoal | `#20211F` | Seções escuras |
| Ivory | `#F2F0E9` | Texto em superfícies escuras |

O verde Sage deve ser utilizado com moderação. A identidade não deve depender de uma cor de destaque para parecer interessante.

### 4.2 Tipografia

| Fonte | Utilização |
|---|---|
| Manrope | Títulos e chamadas principais |
| Inter | Textos, parágrafos e interface |
| JetBrains Mono | Metadados, tecnologias e informações técnicas |

A tipografia deve ser um dos principais elementos de identidade do site.

Escala de referência — Desktop

- Hero: 72–96 px.
- Títulos de seção: 40–56 px.
- Subtítulos: 20–24 px.
- Texto: 15–17 px.
- Metadados: 11–12 px.

A escala deve ser adaptada para telas menores, preservando hierarquia e legibilidade.

### 4.3 Grid e espaçamento

- Container máximo: 1440 px.
- Grid desktop: 12 colunas.
- Margens laterais: 6–8%.
- Sistema de espaçamento baseado em 8 px.
- Divisórias de 1 px.
- Bordas discretas.
- Raios de 4–8 px somente quando necessários.
- Amplo uso de espaço negativo.

O layout deve priorizar alinhamento, proporção e ritmo visual.

---

## 5. Fotografia e identidade pessoal

Tratamento aprovado: fotografia profissional.

O espaço da fotografia será reservado no layout principal.

Diretrizes:

- Utilizar fotografia real fornecida por Rafa.
- Tratamento limpo e profissional.
- Enquadramento cuidadosamente definido.
- Iluminação e contraste naturais.
- Integração com a composição editorial.
- Evitar aparência de foto corporativa genérica.

Não utilizar imagens de pessoas genéricas ou retratos artificiais como substitutos.

A fotografia definitiva será integrada após o envio da imagem.

---

## 6. Arquitetura do site

A estrutura será composta por uma página principal e páginas individuais para os projetos.

### 6.1 Navegação

Menu discreto, com:

- Início.
- Projetos.
- Sobre.
- Contato.
- Seletor PT / EN.

A navegação deve ser simples e funcional, com comportamento responsivo.

### 6.2 Hero — Apresentação

A primeira dobra deve estabelecer imediatamente a identidade e o posicionamento.

Elementos:

- Assinatura RAFA.
- Apresentação profissional.
- Frase conceitual.
- Fotografia profissional em composição editorial.
- Acesso aos projetos.
- Acesso à seção sobre.

O hero deve ser visualmente marcante sem depender de efeitos exagerados.

### 6.3 Selected Work — Projetos

Seção de maior importância depois da apresentação.

Apresentação editorial assimétrica, com hierarquia visual entre os projetos.

Projetos iniciais em destaque:

**Qualyt Trend**

Categoria: E-commerce / Desenvolvimento de produto digital.

Projeto de comércio eletrônico com Next.js e Supabase, trabalhando com catálogo real, estrutura de dados e experiência de compra.

**SaldoZen**

Categoria: Finanças pessoais / Aplicação web.

Plataforma pessoal de organização financeira, com foco em estruturação de dados, segurança e experiência de uso.

Os dois projetos devem apresentar seu estágio real de desenvolvimento. Não anunciar funcionalidades como concluídas sem confirmação.

A estrutura deve permitir adicionar projetos futuros sem reconstruir o layout.

### 6.4 About — Sobre

Uma apresentação pessoal objetiva, com foco em:

- Interesse por tecnologia e desenvolvimento.
- Construção de soluções do zero.
- Curiosidade técnica e experimentação.
- Aprendizado contínuo.
- Interesse em engenharia de software e produtos digitais.

O texto deve ter personalidade e evitar frases genéricas como "sou apaixonado por tecnologia".

### 6.5 Capabilities — Competências

Apresentar áreas de atuação e conhecimentos de maneira organizada.

Categorias:

- Software Development.
- Web Development.
- Database & Backend.
- Product Thinking.
- Problem Solving.
- Digital Experiences.

Separar visualmente:

- Tecnologias utilizadas em projetos.
- Tecnologias em aprendizado.
- Competências práticas demonstráveis.

Não criar barras de proficiência ou níveis artificiais.

### 6.6 Contact — Contato

Seção final com fundo Charcoal.

Estratégia de contatos: seletiva.

GitHub e LinkedIn terão maior destaque visual.

E-mail e WhatsApp estarão disponíveis em uma área secundária de contato, sem competir com os canais principais.

Não exibir endereços ou números fictícios.

---

## 7. Páginas de projetos

Cada projeto deverá ter uma página própria de estudo de caso.

Estrutura recomendada:

1. Identificação e resumo do projeto.
2. Contexto e problema.
3. Objetivo da solução.
4. Arquitetura e tecnologias.
5. Decisões técnicas.
6. Desafios encontrados.
7. Processo de desenvolvimento.
8. Capturas reais da interface.
9. Resultado e estágio atual.
10. Links para demonstração e repositório, quando disponíveis.

A apresentação deve demonstrar raciocínio técnico, não apenas mostrar imagens bonitas.

---

## 8. Idiomas

O site será bilíngue:

- Português brasileiro — idioma padrão.
- Inglês — versão completa.

O seletor deve permitir alternar os idiomas sem perder a página ou a seção atual.

Todos os elementos importantes devem possuir tradução:

- Navegação.
- Apresentação.
- Projetos.
- Sobre.
- Competências.
- Contato.
- Metadados e títulos de página.

A tradução deve ser natural, não uma tradução literal que prejudique o posicionamento profissional.

---

## 9. Interações e movimento

A experiência deve ser refinada e discreta.

Interações previstas:

- Entrada tipográfica suave no hero.
- Revelação progressiva de elementos durante a rolagem.
- Hover sutil nas imagens dos projetos.
- Transições curtas entre estados.
- Navegação suave.
- Feedback visual em links e botões.

Regras:

- Respeitar `prefers-reduced-motion`.
- Não bloquear conteúdo atrás de animações.
- Evitar animações pesadas.
- Não sacrificar desempenho por estética.
- Todas as interações devem funcionar em dispositivos móveis.

---

## 10. Tecnologias

Stack inicial recomendada:

| Tecnologia | Função |
|---|---|
| Next.js | Framework principal |
| React | Interface |
| TypeScript | Tipagem e segurança |
| Tailwind CSS | Estilização |
| Framer Motion | Animações pontuais |
| Lucide | Ícones funcionais |
| Vercel | Hospedagem |
| GitHub | Versionamento |

O conteúdo dos projetos e das páginas pode ser estruturado localmente.

Não será necessário criar um backend ou banco de dados para a primeira versão.

A arquitetura deverá ser organizada para facilitar manutenção e expansão.

---

## 11. Responsividade

O site deverá ser projetado para:

- Desktop.
- Notebook.
- Tablet.
- Smartphone.

Não basta reduzir o layout desktop para caber em uma tela pequena.

A versão mobile deverá possuir composição própria, respeitando:

- Hierarquia tipográfica.
- Espaçamentos.
- Leitura.
- Navegação.
- Imagens.
- Interações por toque.

---

## 12. SEO, acessibilidade e desempenho

Requisitos obrigatórios:

- Metadata adequada em português e inglês.
- Títulos e descrições específicos por página.
- Open Graph.
- Favicon e identidade visual.
- URLs organizadas.
- HTML semântico.
- Navegação por teclado.
- Contraste adequado.
- Textos alternativos nas imagens.
- Imagens otimizadas.
- Carregamento eficiente de fontes.
- Core Web Vitals como referência de qualidade.

O site deverá funcionar corretamente sem depender de JavaScript para exibir o conteúdo essencial.

---

## 13. Domínio e publicação

Domínio escolhido: `rafaelzovic.dev`

A publicação será realizada inicialmente pela Vercel.

O domínio deverá ser verificado quanto à disponibilidade e ao preço antes da compra.

A estrutura deverá permitir conectar o domínio personalizado sem alterar a arquitetura do projeto.

---

## 14. Critérios de qualidade

O projeto somente deverá ser considerado pronto quando:

- A identidade visual estiver consistente.
- O resultado não parecer um template genérico.
- A versão desktop estiver refinada.
- A versão mobile estiver cuidadosamente adaptada.
- Os dois idiomas estiverem completos.
- Os projetos apresentarem informações reais.
- Os links funcionarem.
- A fotografia profissional estiver integrada.
- SEO e acessibilidade tiverem sido revisados.
- Não existirem erros críticos de execução.
- O desempenho estiver adequado.
- A navegação e as interações estiverem funcionando.

---

## 15. Regras de implementação

Estas regras são obrigatórias durante o desenvolvimento:

1. Não alterar a direção de arte sem aprovação.
2. Não substituir a paleta ou tipografia por escolhas genéricas.
3. Não transformar o projeto em uma coleção de cards repetitivos.
4. Não inventar conteúdo, experiência profissional, métricas ou resultados.
5. Não utilizar imagens genéricas como se fossem fotografias pessoais.
6. Não implementar todas as seções com o mesmo padrão visual.
7. Não priorizar efeitos em detrimento da experiência.
8. Manter componentes organizados e reutilizáveis.
9. Garantir responsividade desde o início.
10. Validar visualmente cada etapa antes de avançar.

Qualquer alteração relevante na identidade deverá ser proposta e aprovada antes de ser aplicada.

---

## 16. Etapas de execução

A implementação será dividida em fases.

**Fase 1 — Fundação**

- Criar projeto.
- Configurar Next.js e TypeScript.
- Configurar Tailwind.
- Organizar estrutura de pastas.
- Configurar fontes, tokens e variáveis visuais.

**Fase 2 — Sistema visual**

- Implementar grid.
- Implementar tipografia.
- Implementar paleta.
- Definir componentes-base.
- Validar identidade visual.

**Fase 3 — Página principal**

- Navegação.
- Hero.
- Projetos.
- Sobre.
- Competências.
- Contato.

**Fase 4 — Projetos**

- Criar páginas de estudo de caso.
- Integrar conteúdo real.
- Inserir imagens e capturas.

**Fase 5 — Internacionalização**

- Implementar PT/EN.
- Revisar textos e metadados.

**Fase 6 — Refinamento**

- Animações.
- Responsividade.
- Acessibilidade.
- SEO.
- Desempenho.

**Fase 7 — Publicação**

- Testes finais.
- Configuração Vercel.
- Conexão do domínio.
- Verificação de funcionamento.

---

## 17. Pendências de conteúdo

Estas pendências não alteram a direção de arte aprovada, mas deverão ser preenchidas antes da publicação final:

- Fotografia profissional de Rafa.
- URL do GitHub.
- URL do LinkedIn.
- E-mail profissional.
- Número de WhatsApp, caso seja exibido.
- Inventário completo dos projetos que serão publicados.
- Capturas reais dos projetos.
- Links de demonstração e repositórios.
- Verificação e registro do domínio.

---

## Diretriz final

O objetivo não é simplesmente construir um site bonito.

É criar uma presença profissional que represente a forma como Rafa pensa, estuda, constrói e resolve problemas.

O portfólio deve ter identidade suficiente para ser reconhecido, simplicidade suficiente para não envelhecer rapidamente e conteúdo suficiente para sustentar sua credibilidade.

RAFA — Digital Craft & Engineering.

Menos ruído. Mais intenção.
