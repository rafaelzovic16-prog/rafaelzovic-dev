export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

/** Português é o idioma padrão e não tem prefixo na URL. */
export const defaultLocale: Locale = "pt";

/** Valor do atributo `lang` do documento em cada idioma. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
