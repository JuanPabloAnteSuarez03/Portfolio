"use client";

import { useRevealPending } from "@/lib/use-reveal-pending";
import { cn } from "@/lib/cn";

/**
 * Revela su contenido con un fundido + desplazamiento al entrar en el
 * viewport, como un solo bloque. Para grillas de tarjetas donde cada item
 * debe entrar con su propio retraso, ver `RevealGrid` / `RevealList`.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, pending } = useRevealPending<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal", pending && "reveal-pending", className)}>
      {children}
    </div>
  );
}
