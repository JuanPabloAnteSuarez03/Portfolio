"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Strings = { title: string; body: string; back: string };

/**
 * Next no le pasa `params` a `not-found.tsx`, así que el idioma se deduce del
 * primer segmento de la ruta en el cliente. Por eso las cadenas llegan en los
 * dos idiomas: son 6 en total, así que el costo de mandarlas al navegador es
 * ruido comparado con tener un 404 en el idioma equivocado.
 */
export function NotFoundContent({
  strings,
}: {
  strings: Record<Locale, Strings>;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const lang = isLocale(segment) ? segment : defaultLocale;
  const text = strings[lang];

  /*
   * El layout raíz que Next genera para `/_not-found` no trae `lang` ni
   * `<title>`, y desde aquí no hay forma de declararlos en el servidor
   * (ver el comentario en `app/not-found.tsx`). Se ponen en el cliente:
   * un lector de pantalla necesita el idioma para pronunciar bien el texto.
   */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${text.title} · ${profile.shortName}`;
  }, [lang, text.title]);

  return (
    <Container className="flex flex-col items-start py-32 md:py-44">
      <p className="text-accent font-mono text-label tracking-[0.18em] uppercase">
        <span aria-hidden="true">$ </span>404
      </p>

      <h1 className="text-h2 mt-6 font-semibold">{text.title}</h1>

      <p className="text-fg-muted mt-4 max-w-xl text-lg leading-relaxed text-pretty">
        {text.body}
      </p>

      <div className="mt-10">
        <Button href={`/${lang}`}>{text.back} →</Button>
      </div>

      <Link
        href={`/${lang}#projects`}
        className="text-fg-muted hover:text-accent mt-6 font-mono text-sm transition-colors"
      >
        {lang === "es" ? "Ver proyectos" : "View projects"} →
      </Link>
    </Container>
  );
}
