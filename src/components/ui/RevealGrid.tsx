"use client";

import { useRevealPending } from "@/lib/use-reveal-pending";
import { cn } from "@/lib/cn";

/**
 * Como `Reveal`, pero para grillas: cada hijo directo entra con un pequeño
 * retraso respecto al anterior (`.reveal-grid` en globals.css, vía
 * `:nth-child`), en vez de que la grilla entera aparezca como un bloque
 * único. No envuelve cada hijo en un div propio — el retraso lo hace CSS
 * puro sobre los hijos directos —, así funciona igual con `<article>` que
 * con cualquier otro contenido, sin agregar una capa extra al layout.
 *
 * `RevealList` es la misma lógica sobre un `<ul>`, para no romper el
 * nesting cuando la grilla es una lista de `<li>`.
 */
export function RevealGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, pending } = useRevealPending<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal-grid", pending && "reveal-grid-pending", className)}>
      {children}
    </div>
  );
}

export function RevealList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, pending } = useRevealPending<HTMLUListElement>();

  return (
    <ul ref={ref} className={cn("reveal-grid", pending && "reveal-grid-pending", className)}>
      {children}
    </ul>
  );
}
