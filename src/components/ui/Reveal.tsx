"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Revela su contenido con un fundido + desplazamiento al entrar en el
 * viewport. El estado inicial es SIEMPRE visible — server, primer render de
 * cliente y sin JS — para no penalizar SEO ni accesibilidad; recién en
 * `useLayoutEffect` (antes del primer paint) se decide si hay algo que
 * ocultar. Así nunca hay un cuadro pintado en visible que salte a oculto.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    // Ya visible al montar (o encima del viewport): nada que revelar.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setPending(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPending(false);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", pending && "reveal-pending", className)}>
      {children}
    </div>
  );
}
