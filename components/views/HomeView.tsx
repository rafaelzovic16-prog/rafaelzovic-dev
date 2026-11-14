import { About } from "@/components/home/About";
import { Capabilities } from "@/components/home/Capabilities";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contentId, SiteHeader } from "@/components/layout/SiteHeader";
import { Surface } from "@/components/primitives/Surface";
import { otherLocale, type Locale } from "@/i18n/config";
import { homePath } from "@/i18n/routes";

/**
 * Home (DESIGN-SPEC §9), igual em PT e EN. Bone: hero, Projetos e Sobre. Charcoal: Competências,
 * Contato e rodapé, num único bloco escuro contínuo (D3): o corte de cor acontece uma vez só.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const alternateHref = homePath(otherLocale(locale));

  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} />
      <main id={contentId[locale]}>
        <Hero locale={locale} />
        <SelectedWork locale={locale} />
        <About locale={locale} />
        <Surface tone="dark" data-block="charcoal">
          <Capabilities locale={locale} />
          <Contact locale={locale} />
        </Surface>
      </main>
      <SiteFooter locale={locale} alternateHref={alternateHref} />
    </>
  );
}
