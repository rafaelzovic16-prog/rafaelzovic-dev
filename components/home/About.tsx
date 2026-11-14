import { Pending } from "@/components/primitives/Pending";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sections } from "@/i18n/routes";

/*
 * 02 — Sobre (DESIGN-SPEC §9.6; D8). Rótulo nas colunas 1–3; abertura em `lead` nas 4–11;
 * corpo em duas colunas (4–7 e 8–11); "Como trabalho" com os três temas aprovados
 * (Intenção · Engenharia · Evolução). Os textos são de Rafa: até lá, ficam pendentes (C2).
 * Mobile: uma coluna.
 */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const id = sections.about[locale];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="container-editorial pt-28 pb-24 md:pt-48 md:pb-40"
    >
      <div className="grid-editorial gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <SectionLabel index="02" id={`${id}-titulo`}>
            {t.sections.about}
          </SectionLabel>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-4">
          <Pending
            item={t.about.opening}
            label={t.pending}
            className="type-lead text-text-muted"
          />
          <div className="mt-10 grid gap-y-6 lg:grid-cols-2 lg:gap-x-6">
            <Pending item={t.about.body} label={t.pending} />
          </div>

          <h3 className="type-label mt-16">{t.about.howTitle}</h3>
          <ol className="mt-6 grid gap-y-8 md:grid-cols-3 md:gap-x-5 lg:gap-x-6">
            {t.about.how.map((theme, i) => (
              <li key={theme} className="border-rule border-t pt-4">
                <p className="type-meta">{String(i + 1).padStart(2, "0")}</p>
                <p className="type-lead mt-2">{theme}</p>
                <Pending
                  item={`${t.about.statement} ${i + 1}`}
                  label={t.pending}
                  className="type-meta text-text-muted mt-3"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
