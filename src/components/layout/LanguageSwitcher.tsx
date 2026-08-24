"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Cambia el primer segmento de la ruta conservando el resto,
 * para que `/es/projects/eck` lleve a `/en/projects/eck` y no al inicio.
 */
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  function pathFor(target: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = target; // el primer segmento siempre es el idioma
    return `/${segments.join("/")}`;
  }

  return (
    <div className="border-border flex items-center rounded border font-mono text-xs">
      {locales.map((locale) => {
        const isCurrent = locale === lang;
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
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
          </Link>
        );
      })}
    </div>
  );
}
