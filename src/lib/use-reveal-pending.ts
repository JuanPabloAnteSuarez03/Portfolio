"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Lógica compartida por `Reveal` y `RevealGrid`/`RevealList`: decide si un
 * elemento tiene algo que ocultar al montar (está bajo el pliegue) y, si es
 * así, lo revela cuando entra en el viewport.
 *
 * El chequeo y el `setPending(true)` corren en `useLayoutEffect` — antes del
 * primer paint del navegador — así nunca hay un cuadro pintado en visible
 * que salte a oculto. El estado inicial (`pending=false`) es siempre
 * visible: server, primer render de cliente y sin JS.
 */
export function useRevealPending<T extends HTMLElement>() {
  const ref = useRef<T>(null);
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

  return { ref, pending };
}
