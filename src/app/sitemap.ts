import type { MetadataRoute } from "next";
import { locales, localeTags, defaultLocale } from "@/i18n/config";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

/**
 * Las 10 rutas del sitio (2 idiomas × 5 páginas), cada una declarando sus
 * alternativas de idioma — que es lo que evita que Google trate al español y
 * al inglés como contenido duplicado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((project) => `/projects/${project.slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // El home pesa más que un caso de estudio.
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((locale) => [
              localeTags[locale],
              `${siteUrl}/${locale}${path}`,
            ]),
          ),
          "x-default": `${siteUrl}/${defaultLocale}${path}`,
        },
      },
    })),
  );
}
