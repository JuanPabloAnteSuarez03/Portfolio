"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

type Item = { src: StaticImageData; caption: string };

/**
 * Las capturas de página completa pueden ser muy altas (una tabla larga
 * puede dar 4000px+ de alto). Por eso NO se limita por altura: se limita
 * por ancho y el área de la imagen scrollea — así una captura alta se ve
 * grande y legible en vez de encogerse a una tira angosta para caber
 * entera en la pantalla.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
  closeLabel,
  prevLabel,
  nextLabel,
}: {
  items: Item[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const hasMultiple = items.length > 1;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      /*
       * `aria-modal` le dice al lector de pantalla que el fondo no existe,
       * pero no detiene al Tab: sin esto el foco se escapa a los enlaces de
       * la página que quedó detrás y el usuario pierde el diálogo de vista.
       */
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          '[data-focusable="true"]',
        );
        if (!focusable?.length) return;

        const list = Array.from(focusable);
        const current = document.activeElement as HTMLElement | null;
        const position = current ? list.indexOf(current) : -1;
        const delta = event.shiftKey ? -1 : 1;
        const next = list[(position + delta + list.length) % list.length];

        event.preventDefault();
        next.focus();
        return;
      }

      if (!hasMultiple) return;
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, items.length, hasMultiple, onClose, onIndexChange]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-100 flex flex-col bg-black/95 backdrop-blur-sm"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        data-focusable="true"
        className="text-fg hover:text-accent absolute top-4 right-4 z-10 text-3xl leading-none"
      >
        ×
      </button>

      {/*
        Único scroller: cubre las capturas altas sin recortarlas ni encogerlas.
        Va en el recorrido de tabulación porque una captura de 4000px solo se
        puede leer con teclado si esta región se puede enfocar y scrollear.
      */}
      <div
        tabIndex={0}
        aria-label={item.caption}
        data-focusable="true"
        className="min-h-0 flex-1 cursor-zoom-out overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <div className="flex flex-col items-center px-4 pt-16 pb-6 sm:px-8 sm:pt-20">
          <Image
            src={item.src}
            alt={item.caption}
            className="border-border rounded-frame w-full max-w-[1280px] border object-contain"
          />
        </div>
      </div>

      <div className="border-border bg-bg/80 flex shrink-0 flex-col items-center gap-3 border-t px-4 py-4">
        <p className="text-fg-muted text-center font-mono text-sm">{item.caption}</p>
        {hasMultiple && (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
              aria-label={prevLabel}
              data-focusable="true"
              className="text-fg-muted hover:text-fg text-2xl leading-none"
            >
              ‹
            </button>
            <span className="text-fg-muted font-mono text-xs">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % items.length)}
              aria-label={nextLabel}
              data-focusable="true"
              className="text-fg-muted hover:text-fg text-2xl leading-none"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
