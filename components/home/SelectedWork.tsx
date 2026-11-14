import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { StatusMarker } from "@/components/primitives/StatusMarker";
import { projects, type Project } from "@/content/projects";
import { htmlLang, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectPath, sections } from "@/i18n/routes";

/*
 * 01 — Trabalhos selecionados (DESIGN-SPEC §9.5). Os projetos alternam as variantes A e B:
 * - A: captura 16:10 nas colunas 1–8 e texto nas 9–12, alinhado à base;
 * - B: texto nas colunas 1–4, no topo, e captura 4:3 nas 6–12, 96 px mais abaixo.
 * No mobile: captura em largura total e depois o texto. Enquanto não há captura real, uma
 * moldura Stone com o nome do projeto e "Captura — pendente" (nunca interface simulada).
 * O índice de arquivo só existe a partir do terceiro projeto: não se aplica com dois.
 */
export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const id = sections.projects[locale];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="container-editorial pt-24 pb-28 md:pt-40 md:pb-48"
    >
      <SectionLabel index="01" id={`${id}-titulo`}>
        {t.sections.projects}
      </SectionLabel>
      <div className="mt-10 space-y-24 md:mt-16 md:space-y-40">
        {projects.map((project, i) => (
          <ProjectFeature
            key={project.slug}
            locale={locale}
            project={project}
            number={String(i + 1).padStart(2, "0")}
            variant={i % 2 === 0 ? "A" : "B"}
          />
        ))}
      </div>
    </section>
  );
}

const layouts = {
  A: {
    capture:
      "aspect-16/10 md:col-span-5 lg:col-span-8 md:row-start-1 md:col-start-1",
    text: "md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9 md:row-start-1 md:self-end",
  },
  B: {
    capture:
      "aspect-4/3 md:col-span-5 md:col-start-4 lg:col-span-7 lg:col-start-6 md:row-start-1 md:mt-24",
    text: "md:col-span-3 md:col-start-1 lg:col-span-4 md:row-start-1 md:self-start",
  },
} as const;

function ProjectFeature({
  locale,
  project,
  number,
  variant,
}: {
  locale: Locale;
  project: Project;
  number: string;
  variant: keyof typeof layouts;
}) {
  const t = getDictionary(locale);
  const layout = layouts[variant];
  const date = new Intl.DateTimeFormat(
    htmlLang[locale],
    locale === "pt"
      ? { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }
      : { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  ).format(new Date(project.status.date));

  return (
    <article className="interactive grid-editorial relative gap-y-8">
      <div
        className={`bg-placeholder col-span-4 flex items-end p-4 ${layout.capture}`}
      >
        <p
          className="type-meta"
          data-pending={`${t.work.capture} ${project.name}`}
        >
          {project.name}
          <span className="block">
            {t.work.capture} — {t.pending}
          </span>
        </p>
      </div>
      <div className={`col-span-4 ${layout.text}`}>
        <p className="type-index">{number}</p>
        <h3 className="type-h3 mt-4">
          <Link
            href={projectPath(locale, project.slug)}
            className="stretched-link"
          >
            <span className="link-underline">{project.name}</span>
          </Link>
        </h3>
        <p className="type-meta text-text-muted mt-2">
          {project.category[locale]}
        </p>
        <p className="type-body max-w-measure mt-4">
          {project.summary[locale]}
        </p>
        <p className="mt-6">
          <StatusMarker status={project.status.value}>
            {t.work.status[project.status.value]} · {t.work.statusDate}{" "}
            <time dateTime={project.status.date}>{date}</time>
          </StatusMarker>
        </p>
        <p className="type-meta mt-2">{project.stack.join(" · ")}</p>
        <p
          aria-hidden="true"
          className="type-body-sm mt-6 inline-flex items-center gap-2"
        >
          <span className="link-underline">{t.work.readCase}</span>
          <ArrowRight
            className="link-arrow arrow-right shrink-0"
            size="0.9em"
            strokeWidth={1.5}
          />
        </p>
      </div>
    </article>
  );
}
