"use client";

import { useEffect, useRef } from "react";

/**
 * Línea de progreso de scroll, fija arriba del todo.
 *
 * `scaleX` en vez de `width`: no dispara layout en cada frame, solo compositing.
 * Sin transición CSS a propósito — tiene que seguir el scroll real cuadro a
 * cuadro; una transición la dejaría siempre un paso atrás de la posición real.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="bg-border/60 fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={barRef}
        className="bg-accent h-full w-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
