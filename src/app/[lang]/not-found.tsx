import { es } from "@/i18n/dictionaries/es";
import { en } from "@/i18n/dictionaries/en";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

/** 404 dentro de un idioma — hereda el nav y el footer del layout. */
export default function NotFound() {
  return (
    <NotFoundContent
      strings={{
        es: { ...es.notFound, projects: es.nav.projects },
        en: { ...en.notFound, projects: en.nav.projects },
      }}
    />
  );
}
