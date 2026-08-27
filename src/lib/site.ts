import { locales, localeTags, defaultLocale, type Locale } from "@/i18n/config";

/**
 * URL de producción. Va como `metadataBase` en el layout raíz, así todas las
 * demás rutas de metadata pueden escribirse relativas ("/es/projects/eck").
 */
export const siteUrl = "https://juanpabloante.vercel.app";

/**
 * Canonical + hreflang para una ruta, dado el idioma activo.
 *
 * `path` va SIN el segmento de idioma: "" para el home, "/projects/eck" para
 * un caso de estudio. Ser bilingüe solo sirve si el buscador sabe que
 * `/es/projects/eck` y `/en/projects/eck` son la misma página en dos idiomas.
 */
export function alternatesFor(lang: Locale, path = "") {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [localeTags[locale], `/${locale}${path}`]),
      ),
      // Sin coincidencia de idioma, el buscador manda al español.
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
