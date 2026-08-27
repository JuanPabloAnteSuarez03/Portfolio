export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Etiquetas del selector de idioma. */
export const localeNames: Record<Locale, { short: string; full: Record<Locale, string> }> = {
  es: { short: "ES", full: { es: "Español", en: "Spanish" } },
  en: { short: "EN", full: { es: "Inglés", en: "English" } },
};

/** Códigos BCP-47 para hreflang. */
export const localeTags: Record<Locale, string> = {
  es: "es-CO",
  en: "en",
};

/** OpenGraph pide `language_TERRITORY`, no el BCP-47 con guion. */
export const ogLocales: Record<Locale, string> = {
  es: "es_CO",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
