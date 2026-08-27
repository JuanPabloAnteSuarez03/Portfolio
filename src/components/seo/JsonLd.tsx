import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { t } from "@/types/content";
import { siteUrl } from "@/lib/site";

/**
 * Datos estructurados `Person` para el home.
 *
 * Es lo que permite que un buscador entienda de quién es el sitio — nombre,
 * formación, perfiles — en vez de inferirlo del texto. Solo se declara lo que
 * ya está en el CV o en los repos: aquí tampoco se inventan datos.
 *
 * `dangerouslySetInnerHTML` es la forma correcta de emitir JSON-LD: React
 * escaparía las comillas si el JSON fuera un hijo de texto normal. El
 * contenido no viene de entrada del usuario, es nuestro propio contenido
 * tipado, y se sanea `<` para cerrar la vía de inyección de etiquetas.
 */
export function PersonJsonLd({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${siteUrl}/${lang}`,
    email: profile.email,
    telephone: profile.phone,
    jobTitle: dict.hero.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cali",
      addressCountry: "CO",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    knowsLanguage: profile.languages.map((language) => language.name.en),
    sameAs: [profile.github],
    knowsAbout: [
      ...new Set(projects.flatMap((project) => project.stack.map((tech) => tech.name))),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * `CreativeWork` por proyecto, enlazado a su autor. Le da al buscador el
 * cliente, el período y el stack sin que tenga que adivinarlos del cuerpo.
 */
export function ProjectJsonLd({
  lang,
  slug,
}: {
  lang: Locale;
  slug: string;
}) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: t(project.tagline, lang),
    description: t(project.summary, lang),
    url: `${siteUrl}/${lang}/projects/${project.slug}`,
    inLanguage: lang,
    author: {
      "@type": "Person",
      name: profile.name,
      url: `${siteUrl}/${lang}`,
    },
    keywords: project.stack.map((tech) => tech.name).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
