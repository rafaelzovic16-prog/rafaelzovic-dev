import type { Metadata } from "next";
import { ButtonLink } from "@/components/primitives/ButtonLink";
import { IndexLink } from "@/components/primitives/IndexLink";
import { PhotoFrame } from "@/components/primitives/PhotoFrame";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { StatusMarker } from "@/components/primitives/StatusMarker";
import { Surface } from "@/components/primitives/Surface";
import { columnVisibility } from "./columns";
import { GridOverlay } from "./GridOverlay";
import { LiveSize } from "./LiveSize";
import { ViewportDiagnostic } from "./ViewportDiagnostic";

/*
 * /specimen (Fase 2): catálogo do sistema visual com o diagnóstico de viewport, que antes era
 * a página /medir (E9, E10, E12). Ferramenta interna: o proxy só a libera em previews da Vercel
 * e no servidor de desenvolvimento; em produção, é 404. Nunca indexada.
 * Textos de amostra: os textos fixos aprovados (DESIGN-SPEC §2) ou descrições do próprio sistema.
 */
export const metadata: Metadata = {
  title: "Specimen · Rafa",
  robots: { index: false, follow: false },
};

const typeStyles = [
  {
    name: "display",
    className: "type-display",
    spec: "Manrope 600 · 96/0.95 · 64/0.98 · 48/1.0 (44 abaixo de 380 px) · −0,04em",
    sample: "Menos ruído. Mais intenção.",
  },
  {
    name: "h1-position",
    className: "type-position",
    spec: "Manrope 500 · 28/1.3 · 24/1.35 · 20/1.4 · −0,01em",
    sample:
      "Desenvolvedor em formação, com foco em desenvolvimento web e objetivo de me tornar Software Engineer.",
  },
  {
    name: "h2",
    className: "type-h2",
    spec: "Manrope 600 · 52/1.05 · 42/1.08 · 34/1.1 · −0,03em",
    sample: "Trabalhos selecionados",
  },
  {
    name: "h3",
    className: "type-h3",
    spec: "Manrope 600 · 40/1.1 · 32/1.12 · 28/1.15 · −0,02em",
    sample: "Qualyt Trend",
  },
  {
    name: "contact-xl",
    className: "type-contact",
    spec: "Manrope 600 · 72/1.0 · 56/1.0 · 36/1.05 · −0,03em",
    sample: "GitHub",
  },
  {
    name: "lead",
    className: "type-lead",
    spec: "Manrope 500 · 32/1.3 · 26/1.32 · 22/1.35 · −0,01em",
    sample:
      "Abertura de seção em Manrope 500, para o Sobre e os estudos de caso.",
  },
  {
    name: "body",
    className: "type-body max-w-measure",
    spec: "Inter 400 · 17/1.65 · 16/1.65 · 16/1.6",
    sample:
      "Corpo de texto em Inter 400, com piso de 16 px e medida de leitura de no máximo 68 caracteres. Este parágrafo existe para conferir o comprimento da linha e o espaçamento entre as linhas na largura atual.",
  },
  {
    name: "body-sm",
    className: "type-body-sm max-w-measure",
    spec: "Inter 400 · 15/1.55 · 15/1.55 · 15/1.5",
    sample:
      "Texto secundário em Inter 400: legendas, área secundária do contato e a indicação de demonstração indisponível.",
  },
  {
    name: "meta",
    className: "type-meta",
    spec: "JetBrains Mono 400 · 12/1.4 · 12/1.4 · 11/1.4 · só para dados",
    sample: "RAFA — Digital Craft & Engineering",
  },
  {
    name: "label",
    className: "type-label",
    spec: "meta em maiúsculas, +0,06em · só nos rótulos de seção",
    sample: "01 — Trabalhos selecionados",
  },
] as const;

/* Contrastes WCAG 2 medidos a partir dos valores do CSS (tests/unit/sistema-visual.test.ts). */
const colorTokens = [
  {
    token: "surface",
    className: "bg-surface",
    light: "bone",
    dark: "charcoal",
  },
  {
    token: "text",
    className: "bg-text",
    light: "graphite · 15,6:1",
    dark: "ivory · 14,2:1",
  },
  {
    token: "text-muted",
    className: "bg-text-muted",
    light: "graphite 72% · 6,7:1",
    dark: "ivory 70% · 7,6:1",
  },
  {
    token: "rule",
    className: "bg-rule",
    light: "stone · decorativo",
    dark: "ivory 12% · decorativo",
  },
  {
    token: "accent",
    className: "bg-accent",
    light: "sage · 3,5:1 · só interface",
    dark: "sage · 4,0:1 · só interface",
  },
  { token: "focus", className: "bg-focus", light: "graphite", dark: "ivory" },
] as const;

/* Escala de espaço (§5). Classes literais para o Tailwind gerar cada largura. */
const spaceScale = [
  { value: 8, className: "w-2" },
  { value: 16, className: "w-4" },
  { value: 24, className: "w-6" },
  { value: 32, className: "w-8" },
  { value: 48, className: "w-12" },
  { value: 64, className: "w-16" },
  { value: 96, className: "w-24" },
  { value: 128, className: "w-32" },
  { value: 160, className: "w-40" },
  { value: 192, className: "w-48" },
] as const;

export default function Page() {
  return (
    <main id="topo" className="pb-24">
      <div className="container-editorial pt-6 md:pt-12">
        <header data-measure="cabeçalho do specimen" className="space-y-4">
          <p className="type-meta text-text-muted">
            Uso interno · só em preview · não indexada
          </p>
          <h1 className="type-h2">Specimen — sistema visual</h1>
          <p className="type-body-sm text-text-muted max-w-measure">
            Tokens, escala tipográfica, grid, espaçamento e componentes da
            especificação de design v1.1, com o diagnóstico de viewport do
            aparelho. Em produção, este endereço responde 404.
          </p>
          <GridOverlay />
        </header>

        <section
          aria-labelledby="diagnostico"
          className="border-rule mt-16 border-t pt-6"
        >
          <SectionLabel index="00" id="diagnostico">
            Diagnóstico de viewport
          </SectionLabel>
          <ol className="type-body-sm mt-6 max-w-measure list-decimal space-y-1 pl-5">
            <li>
              Abra no Chrome do Galaxy A15, na vertical, e não role: o primeiro
              bloco registra a área com as barras visíveis.
            </li>
            <li>
              Depois, role até o fim da página e volte, para a barra do Chrome
              se recolher e reaparecer.
            </li>
            <li>Se quiser, gire para a horizontal e volte.</li>
            <li>
              Toque em &quot;Copiar diagnóstico&quot; e envie na conversa, junto
              com o valor de Configurações → Tela → Zoom da tela.
            </li>
          </ol>
          <noscript>
            <p className="type-body-sm mt-6">
              Esta ferramenta precisa de JavaScript para ler as dimensões da
              tela.
            </p>
          </noscript>
          <ViewportDiagnostic />
          <div className="type-body-sm text-text-muted mt-8 max-w-measure space-y-2">
            <p className="type-label text-text">Limites destas medidas</p>
            <p>
              Todos os valores vêm do navegador, em pixels CSS. O navegador não
              informa o tamanho físico da tela nem a área do painel: nada aqui
              está em centímetros ou em pixels do hardware.
            </p>
            <p>
              A largura em pixels CSS depende do zoom da tela do Android e do
              zoom do navegador, que mudam o devicePixelRatio. A altura útil
              (innerHeight) muda quando a barra do Chrome se recolhe ou quando o
              teclado abre; por isso as variações ficam registradas.
            </p>
            <p>
              screen.availHeight, no Android, nem sempre desconta a barra de
              navegação do sistema, e screen.orientation pode não existir em
              navegadores antigos. As dimensões dos elementos são as desta
              página, com as fontes carregadas.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="superficies"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="01" id="superficies">
            Superfícies e cores
          </SectionLabel>
          <p className="type-body-sm text-text-muted mt-6 max-w-measure">
            Tokens semânticos (§3.2). Os componentes só usam estes nomes; a
            superfície troca os valores. Contrastes WCAG medidos sobre a própria
            superfície.
          </p>
          <div className="grid-editorial mt-10 gap-y-6">
            {(["light", "dark"] as const).map((tone) => (
              <Surface
                key={tone}
                tone={tone}
                className="border-rule col-span-4 border p-6 md:col-span-4 lg:col-span-6"
              >
                <p className="type-label">
                  {tone === "light" ? "Bone — claro" : "Charcoal — escuro"}
                </p>
                <ul className="mt-6 space-y-4">
                  {colorTokens.map((color) => (
                    <li key={color.token} className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={`border-rule size-12 shrink-0 border ${color.className}`}
                      />
                      <span className="type-meta">
                        {color.token}
                        <span className="text-text-muted block">
                          {tone === "light" ? color.light : color.dark}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <hr className="mt-6" />
                <p className="type-body-sm mt-6">
                  Texto principal sobre a superfície.{" "}
                  <span className="text-text-muted">Texto secundário.</span>
                </p>
              </Surface>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="tipografia"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="02" id="tipografia">
            Tipografia
          </SectionLabel>
          <p className="type-body-sm text-text-muted mt-6 max-w-measure">
            Valores da especificação em desktop · tablet · mobile, interpolados
            entre 375, 768 e 1440 px. &quot;Agora&quot; é o valor calculado pelo
            navegador nesta largura.
          </p>
          <ul className="mt-10 space-y-12">
            {typeStyles.map((style) => (
              <li key={style.name}>
                <p className="type-meta text-text-muted">
                  {style.name} · {style.spec} · <LiveSize sample={style.name} />
                </p>
                <p
                  className={`${style.className} mt-3`}
                  data-type-sample={style.name}
                  {...(style.name === "display" || style.name === "h1-position"
                    ? { "data-measure": `amostra ${style.name}` }
                    : {})}
                >
                  {style.sample}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="grid"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="03" id="grid">
            Grid
          </SectionLabel>
          <dl className="type-meta mt-6 grid max-w-measure grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-text-muted">Breakpoints</dt>
            <dd>375 · 768 · 1024 · 1280 · 1440</dd>
            <dt className="text-text-muted">Colunas</dt>
            <dd>4 · 8 (a partir de 768) · 12 (a partir de 1024)</dd>
            <dt className="text-text-muted">Intervalo</dt>
            <dd>16 · 20 · 24 px</dd>
            <dt className="text-text-muted">Margens</dt>
            <dd>20 px · clamp(24px, 7vw, 112px) a partir de 768</dd>
            <dt className="text-text-muted">Container</dt>
            <dd>1440 px no máximo</dd>
          </dl>
          <div
            data-measure="grid"
            data-measure-content=""
            data-measure-grid=""
            className="grid-editorial mt-10"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={`bg-placeholder type-meta flex h-24 items-end p-2 ${columnVisibility(index)}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="espacamento"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="04" id="espacamento">
            Espaçamento e forma
          </SectionLabel>
          <ul className="mt-10 space-y-3">
            {spaceScale.map((space) => (
              <li key={space.value} className="flex items-center gap-4">
                <span className="type-meta text-text-muted w-12 shrink-0 text-right">
                  {space.value}
                </span>
                <span
                  aria-hidden="true"
                  className={`bg-text h-2 ${space.className}`}
                />
              </li>
            ))}
          </ul>
          <dl className="type-meta mt-10 grid max-w-measure grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-text-muted">Seções (desktop)</dt>
            <dd>
              Projetos 160/192 · Sobre 192/160 · Competências 128/128 · Contato
              160/96 · mobile ≈ 60%
            </dd>
            <dt className="text-text-muted">Título → conteúdo</dt>
            <dd>64 px desktop · 40 px mobile</dd>
            <dt className="text-text-muted">Regras</dt>
            <dd>1 px</dd>
            <dt className="text-text-muted">Raio</dt>
            <dd>0 · 4 px só em botões e no contorno de foco</dd>
            <dt className="text-text-muted">Alvo de toque</dt>
            <dd>no mínimo 48 px</dd>
          </dl>
        </section>

        <section
          aria-labelledby="componentes"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="05" id="componentes">
            Componentes e estados — claro
          </SectionLabel>
          <Components />
          <div className="grid-editorial mt-12">
            <div className="col-span-3 col-start-2 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
              <p className="type-meta text-text-muted">
                PhotoFrame — pendente · 4:5
              </p>
              <div className="mt-4">
                <PhotoFrame label="Fotografia — pendente" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Surface tone="dark" className="mt-24 py-16">
        <section
          aria-labelledby="componentes-escuro"
          className="container-editorial"
        >
          <SectionLabel index="06" id="componentes-escuro">
            Componentes e estados — escuro
          </SectionLabel>
          <Components />
        </section>
      </Surface>

      <div className="container-editorial">
        <section
          aria-labelledby="movimento"
          className="border-rule mt-24 border-t pt-6"
        >
          <SectionLabel index="07" id="movimento">
            Movimento
          </SectionLabel>
          <dl className="type-meta mt-6 grid max-w-measure grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-text-muted">ease-out-editorial</dt>
            <dd>cubic-bezier(.2, .7, .1, 1)</dd>
            <dt className="text-text-muted">dur-fast</dt>
            <dd>150 ms · estados</dd>
            <dt className="text-text-muted">dur-base</dt>
            <dd>250 ms · sublinhados e setas</dd>
            <dt className="text-text-muted">dur-reveal</dt>
            <dd>500 ms · rolagem (Fase 3)</dd>
            <dt className="text-text-muted">dur-route</dt>
            <dd>200 ms · entre páginas (Fase 3)</dd>
          </dl>
          <p className="type-body-sm mt-6 max-w-measure">
            Preferência deste aparelho:{" "}
            <span className="motion-reduce:hidden">movimento completo.</span>
            <span className="hidden motion-reduce:inline">
              movimento reduzido — sem deslocamentos, só opacidade de 150 ms.
            </span>
          </p>
          <p className="mt-10">
            <IndexLink href="#topo" arrow="up">
              Topo
            </IndexLink>
          </p>
        </section>
      </div>
    </main>
  );
}

/*
 * Componentes com os estados fixados por `data-state` (repouso, hover/toque e foco), para
 * que apareçam nas capturas. Os links reais da página continuam respondendo ao ponteiro.
 */
function Components() {
  const states = [
    { name: "repouso", state: undefined },
    { name: "hover · toque", state: "hover" },
    { name: "foco", state: "focus" },
  ] as const;

  return (
    <div className="mt-10 space-y-12">
      <div>
        <p className="type-meta text-text-muted">IndexLink → ↓ ↗ ↑</p>
        <ul className="mt-4 space-y-4">
          {states.map(({ name, state }) => (
            <li
              key={name}
              className="flex flex-wrap items-baseline gap-x-8 gap-y-3"
            >
              <span className="type-meta text-text-muted w-28">{name}</span>
              <IndexLink href="#componentes" arrow="right" data-state={state}>
                Ler estudo de caso
              </IndexLink>
              <IndexLink href="#componentes" arrow="down" data-state={state}>
                Projetos selecionados (2)
              </IndexLink>
              <IndexLink
                href="#componentes"
                arrow="up-right"
                data-state={state}
              >
                GitHub
              </IndexLink>
              <IndexLink href="#topo" arrow="up" data-state={state}>
                Topo
              </IndexLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="type-meta text-text-muted">
          Button — sólido · contorno (só nos estudos de caso)
        </p>
        <ul className="mt-4 space-y-4">
          {states.map(({ name, state }) => (
            <li
              key={name}
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="type-meta text-text-muted w-28">{name}</span>
              <ButtonLink
                href="#componentes"
                variant="solid"
                data-state={state}
              >
                Ver demonstração
              </ButtonLink>
              <ButtonLink
                href="#componentes"
                variant="outline"
                data-state={state}
              >
                Ver repositório
              </ButtonLink>
            </li>
          ))}
          <li className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="type-meta text-text-muted w-28">indisponível</span>
            <span className="type-body-sm text-text-muted">
              Demo não publicada
            </span>
          </li>
        </ul>
      </div>

      <div>
        <p className="type-meta text-text-muted">
          StatusMarker — sempre com texto
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <StatusMarker status="done">Concluído</StatusMarker>
          </li>
          <li>
            <StatusMarker status="in-progress">Em desenvolvimento</StatusMarker>
          </li>
          <li>
            <StatusMarker status="planned">Planejado</StatusMarker>
          </li>
        </ul>
      </div>

      <div>
        <p className="type-meta text-text-muted">Regra · 1 px</p>
        <hr className="mt-4" />
      </div>
    </div>
  );
}
