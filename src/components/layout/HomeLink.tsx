"use client";

import type { Locale } from "@/i18n/config";
import { useRouter } from "next/navigation";
import { profile } from "@/content/profile";

/**
 * El logo del nav. El layout persiste entre esta ruta y la home (mismo
 * idioma, mismo árbol), así que Next conserva el scroll actual en vez de
 * llevarlo arriba — y ese número de píxeles suele caer sobre la sección de
 * Proyectos en la home, no sobre el Hero. "Volver al inicio" debe ser
 * literal: siempre arriba del todo, sin importar de dónde se navegue.
 */
export function HomeLink({ lang }: { lang: Locale }) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.push(`/${lang}`, { scroll: false });

    const deadline = performance.now() + 600;
    function tick() {
      window.scrollTo(0, 0);
      if (performance.now() < deadline) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <a
      href={`/${lang}`}
      onClick={handleClick}
      className="text-fg hover:text-accent font-mono text-sm transition-colors"
    >
      <span className="text-accent" aria-hidden="true">
        ${" "}
      </span>
      {profile.handle}
    </a>
  );
}
