import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { es } from "@/i18n/dictionaries/es";
import { en } from "@/i18n/dictionaries/en";

/**
 * 404 global.
 *
 * Con `dynamicParams = false`, una ruta que no existe ni siquiera entra al
 * segmento `[lang]`, así que no hay layout raíz encima: este archivo tiene
 * que traerse sus propios estilos y variables de fuente. Por eso tampoco
 * lleva nav ni footer — el botón de volver al inicio hace ese trabajo.
 *
 * No puede declarar su propio `<html>`: Next genera un layout raíz por
 * defecto para `/_not-found` y quedarían dos etiquetas anidadas. El `lang`
 * y el `<title>` los pone `NotFoundContent` en el cliente, que es también
 * quien deduce el idioma de la ruta.
 */
export default function NotFound() {
  return (
    <div className={`${fontVariables} bg-bg text-fg min-h-screen antialiased`}>
      <NotFoundContent
        strings={{
          es: { ...es.notFound, projects: es.nav.projects },
          en: { ...en.notFound, projects: en.nav.projects },
        }}
      />
    </div>
  );
}
