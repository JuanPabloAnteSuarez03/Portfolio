"use client";

import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Cambia el primer segmento de la ruta conservando el resto,
 * para que `/es/projects/eck` lleve a `/en/projects/eck` y no al inicio.
 *
 * `[lang]` es el layout raíz, así que cambiarlo reemplaza todo el árbol de
 * la página — el navegador resetea (y a veces recorta) el scroll durante
 * ese swap sin que `<Link scroll={false}>` pueda evitarlo, porque el
 * contenido nuevo sigue reflowing (imágenes, fuentes) después del commit.
 * Se fija la posición cuadro a cuadro hasta que el layout se asienta.
 */
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const scrollYRef = useRef(0);

  function pathFor(target: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = target; // el primer segmento siempre es el idioma
    return `/${segments.join("/")}`;
  }

  function pinScroll(y: number) {
    const deadline = performance.now() + 600;
    function tick() {
      window.scrollTo(0, y);
      if (performance.now() < deadline) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function handleClick(target: Locale) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (target === lang) return;
      event.preventDefault();
      scrollYRef.current = window.scrollY;
      router.push(pathFor(target), { scroll: false });
      pinScroll(scrollYRef.current);
    };
  }

  return (
    <div className="border-border flex items-center rounded border font-mono text-xs">
      {locales.map((locale) => {
        const isCurrent = locale === lang;
        return (
          <a
            key={locale}
            href={pathFor(locale)}
            onClick={handleClick(locale)}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={localeNames[locale].full[lang]}
            className={cn(
              "px-2.5 py-1.5 transition-colors",
              isCurrent
                ? "bg-accent font-medium text-black"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {localeNames[locale].short}
          </a>
        );
      })}
    </div>
  );
}
