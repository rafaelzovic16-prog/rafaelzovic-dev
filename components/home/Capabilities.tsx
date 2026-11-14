import Link from "next/link";
import { Pending } from "@/components/primitives/Pending";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { capabilityAreas, technologiesInUse } from "@/content/capabilities";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectPath, sections } from "@/i18n/routes";

/*
 * 03 — Competências, sobre Charcoal (DESIGN-SPEC §9.7). Colunas 1–6: as seis áreas do
 * briefing; a frase e o link de evidência de cada uma ficam pendentes até existirem (C2).
 * Colunas 8–12: registro técnico em mono, com linha pontilhada entre tecnologia e projeto.
 * "Usado em projetos" sai das stacks dos projetos; "Em estudo" é uma lista de Rafa.
 * Sem barras, níveis ou porcentagens. Mobile: lista empilhada.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const id = sections.capabilities[locale];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="container-editorial pt-20 pb-20 md:pt-32 md:pb-32"
    >
      <SectionLabel index="03" id={`${id}-titulo`}>
        {t.sections.capabilities}
      </SectionLabel>
      <div className="grid-editorial mt-10 gap-y-16 md:mt-16">
        <ul className="border-rule col-span-4 border-t md:col-span-8 lg:col-span-6">
          {capabilityAreas.map((area) => (
            <li key={area} className="border-rule border-b py-5">
              <p className="type-lead">{area}</p>
              <Pending
                item={t.capabilities.area}
                id={`${t.capabilities.area} · ${area}`}
                label={t.pending}
                className="type-meta text-text-muted mt-2"
              />
            </li>
          ))}
        </ul>
        <div className="type-meta col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <h3 className="type-label">{t.capabilities.used}</h3>
          <ul className="mt-4">
            {technologiesInUse().map(({ technology, projects }) => (
              <li key={technology} className="flex min-h-12 items-center gap-3">
                <span>{technology}</span>
                <span
                  aria-hidden="true"
                  className="border-rule flex-1 border-b border-dotted"
                />
                <span className="flex flex-wrap justify-end gap-x-3">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={projectPath(locale, project.slug)}
                      className="interactive inline-flex min-h-12 items-center"
                    >
                      <span className="link-underline">{project.name}</span>
                    </Link>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="type-label mt-12">{t.capabilities.studying}</h3>
          <Pending
            item={t.capabilities.studyingList}
            id={`${t.capabilities.studyingList} · ${t.capabilities.studying}`}
            label={t.pending}
            className="type-meta text-text-muted mt-4"
          />
        </div>
      </div>
    </section>
  );
}
