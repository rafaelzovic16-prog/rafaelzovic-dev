import type { Locale } from "../config";
import { en } from "./en";
import { pt, type Dictionary } from "./pt";

export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
