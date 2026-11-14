import { ArrowUpRight } from "lucide-react";
import { Pending } from "@/components/primitives/Pending";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sections } from "@/i18n/routes";

/** Perfil aprovado em E4 (CONTENT-INVENTORY §1). */
const github = {
  href: "https://github.com/rafaelzovic16-prog",
  handle: "rafaelzovic16-prog",
};

/*
 * 04 — Contato, sobre Charcoal, continuando o bloco das Competências (DESIGN-SPEC §9.8).
 * GitHub e LinkedIn em `contact-xl`, com seta ↗, identificador em mono e regra de 1 px que
 * fica Sage no hover. E-mail e WhatsApp numa área secundária. Nenhum link aparece sem o
 * endereço real: LinkedIn, e-mail e a decisão sobre o WhatsApp estão pendentes (C2).
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const id = sections.contact[locale];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="container-editorial border-rule border-t pt-24 pb-14 md:pt-40 md:pb-24"
    >
      <SectionLabel index="04" id={`${id}-titulo`}>
        {t.sections.contact}
      </SectionLabel>
      <h3 className="sr-only">{t.contact.primary}</h3>
      <ul className="border-rule mt-10 border-t md:mt-16">
        <li>
          <a
            href={github.href}
            className="interactive contact-link flex min-h-18 flex-wrap items-center gap-x-6 gap-y-2 py-4"
          >
            <span className="type-contact inline-flex items-center gap-3">
              <span className="link-underline">GitHub</span>
              <ArrowUpRight
                aria-hidden="true"
                className="link-arrow arrow-up-right shrink-0"
                size="0.6em"
                strokeWidth={1.5}
              />
            </span>
            <span className="type-meta text-text-muted">{github.handle}</span>
          </a>
        </li>
        <li className="border-rule flex min-h-18 items-center border-b py-4">
          <Pending
            item="LinkedIn"
            label={t.pending}
            className="type-contact text-text-muted"
          />
        </li>
      </ul>
      <h3 className="sr-only">{t.contact.secondary}</h3>
      <div className="type-body-sm mt-10 space-y-2">
        <Pending
          item={t.contact.email}
          label={t.pending}
          className="text-text-muted"
        />
        <Pending
          item={t.contact.whatsapp}
          label={t.pending}
          className="text-text-muted"
        />
      </div>
    </section>
  );
}
