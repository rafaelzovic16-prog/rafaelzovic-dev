import { ArrowDown } from "lucide-react";
import { PhotoFrame } from "@/components/primitives/PhotoFrame";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sectionHref } from "@/i18n/routes";

/*
 * Hero (DESIGN-SPEC §9.2–§9.4; D7; ajuste M1).
 * - Mobile (< 768): meta, assinatura com uma palavra por linha, H1, linha "01 Projetos" antes
 *   da foto (3 de 4 colunas, à direita) e linha "02 Sobre" depois.
 * - Tablet: texto nas colunas 1–5 e foto nas 6–8. Desktop: texto 1–7, foto 9–12, com o topo
 *   na altura de maiúsculas do display, e a faixa "Índice" na base; altura min(100svh, 880px).
 * No desktop, as linhas da assinatura não quebram: com o recuo, "Mais intenção." passa 1 px
 * das 7 colunas e avança sobre a coluna 8, nunca sobre a foto (medido em PT e EN, 1024–1440).
 * A partir do tablet, todo item tem linha e coluna explícitas: a regra da faixa ocupa a linha 4
 * inteira, e um item sem coluna definida faria o navegador criar colunas extras.
 * A ordem do HTML é a de leitura nos três casos: posicionamento e acesso aos projetos antes
 * da foto. A assinatura é um elemento visual, não um título; o H1 é o posicionamento (D7).
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const lines = t.hero.signature.split(/(?<=\.) /);

  return (
    <div className="container-editorial">
      <div className="grid-editorial lg:hero-height pt-6 md:hero-rows md:pt-16 lg:pt-28">
        <p className="type-meta col-span-4 md:col-span-5 md:col-start-1 md:row-start-1 md:mb-6 lg:col-span-7 lg:col-start-1">
          {t.hero.meta}
        </p>
        <p className="type-display col-span-4 mt-4 md:col-span-5 md:col-start-1 md:row-start-2 md:mt-0 lg:col-span-7 lg:col-start-1">
          {lines.map((line, i) => (
            <span
              key={line}
              className={`block lg:whitespace-nowrap ${i === 1 ? "lg:indent-one-column" : ""}`}
            >
              {line.split(" ").map((word, j, words) => (
                <span key={word} className="block md:inline">
                  {word}
                  {j < words.length - 1 ? " " : ""}
                </span>
              ))}{" "}
            </span>
          ))}
        </p>
        <h1 className="type-position col-span-4 mt-6 md:col-span-5 md:col-start-1 md:row-start-3 md:mt-10 lg:col-span-7 lg:col-start-1">
          {t.hero.position}
        </h1>

        <p
          aria-hidden="true"
          className="type-label hidden items-center self-end md:col-span-2 md:col-start-1 md:row-start-4 md:mt-16 md:flex md:min-h-16"
        >
          {t.hero.index}
        </p>
        <HeroIndexLink
          href={sectionHref(locale, "projects")}
          number="01"
          className="col-span-4 mt-6 md:col-span-3 md:col-start-3 md:row-start-4 md:mt-16 lg:col-span-5 lg:col-start-3"
        >
          <span className="lg:hidden">
            {t.hero.indexProjectsShort} ({projects.length})
          </span>
          <span className="hidden lg:inline">
            {t.hero.indexProjects} ({projects.length})
          </span>
        </HeroIndexLink>

        <div className="col-span-3 col-start-2 mt-8 md:col-span-3 md:col-start-6 md:row-span-2 md:row-start-2 md:align-display-cap lg:col-span-4 lg:col-start-9">
          <PhotoFrame label={`${t.hero.photo} — ${t.pending}`} />
        </div>

        <HeroIndexLink
          href={sectionHref(locale, "about")}
          number="02"
          className="col-span-4 mt-8 md:col-span-3 md:col-start-6 md:row-start-4 md:mt-16 lg:col-span-4 lg:col-start-9"
        >
          {t.sections.about}
        </HeroIndexLink>
        <div
          aria-hidden="true"
          className="border-rule hidden md:col-span-full md:row-start-4 md:block md:h-16 md:self-end md:border-t"
        />
      </div>
    </div>
  );
}

/*
 * Linha-índice do hero: no mobile, uma faixa de 56 px com regras em cima e embaixo e a seta
 * na direita; a partir do tablet, um item da faixa "Índice" (64 px).
 */
function HeroIndexLink({
  href,
  number,
  className,
  children,
}: {
  href: string;
  number: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`interactive border-rule flex min-h-14 items-center justify-between gap-4 border-y self-end md:min-h-16 md:justify-start md:border-0 ${className}`}
    >
      <span className="flex items-baseline gap-3">
        <span className="type-meta">{number}</span>
        <span className="type-body link-underline">{children}</span>
      </span>
      <ArrowDown
        aria-hidden="true"
        className="link-arrow arrow-down shrink-0"
        size="1em"
        strokeWidth={1.5}
      />
    </a>
  );
}
