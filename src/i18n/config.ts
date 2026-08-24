export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Etiquetas del selector de idioma. */
export const localeNames: Record<Locale, { short: string; full: Record<Locale, string> }> = {
  es: { short: "ES", full: { es: "Español", en: "Spanish" } },
  en: { short: "EN", full: { es: "Inglés", en: "English" } },
};

/** Códigos BCP-47 para hreflang y OpenGraph. */
export const localeTags: Record<Locale, string> = {
  es: "es-CO",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
