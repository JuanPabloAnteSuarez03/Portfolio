"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

/**
 * Menú de navegación en móvil.
 *
 * En pantallas chicas los enlaces del nav no caben, y sin esto un visitante
 * en el celular no tiene atajo a Contacto — justo el enlace que importa
 * cuando quien abre el sitio es un reclutador.
 *
 * Se cierra al navegar, con Escape y al tocar fuera. El foco vuelve al botón
 * para que quien navega con teclado no quede perdido al final del documento.
 */
export function MobileMenu({
  items,
  openLabel,
  closeLabel,
}: {
  items: Item[];
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Red de seguridad para la navegación que no pasa por un clic en el panel
  // (atrás/adelante del navegador): el panel no debe sobrevivir al cambio.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        className="text-fg-muted hover:text-fg flex h-9 w-9 items-center justify-center rounded border border-transparent transition-colors"
      >
        {/* Dos barras que se cruzan al abrir: el mismo glifo hace de ☰ y de ✕. */}
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`bg-current absolute left-0 block h-0.5 w-5 transition-transform duration-200 ${
              open ? "top-1/2 rotate-45" : "top-1"
            }`}
          />
          <span
            className={`bg-current absolute left-0 block h-0.5 w-5 transition-transform duration-200 ${
              open ? "top-1/2 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="border-border bg-surface absolute top-16 right-0 left-0 border-b shadow-lg"
        >
          <ul className="divide-border divide-y px-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  // Los enlaces son anclas del mismo idioma (`/es#contact`), así
                  // que el pathname no cambia y el efecto de abajo no alcanza
                  // para cerrar el panel: hay que cerrarlo aquí.
                  onClick={() => setOpen(false)}
                  className="text-fg hover:text-accent block py-4 font-mono text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
