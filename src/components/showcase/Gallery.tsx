"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AppWindowFrame } from "./AppWindowFrame";
import { Lightbox } from "./Lightbox";

type Item = { src: StaticImageData; caption: string };

/**
 * Póster (primera captura) que abre un `Lightbox` navegable con el resto de
 * la galería. Para lo que no tiene una URL visitable: UNIDENTAL (tras login)
 * y Presupuestos de Obra (app de escritorio, con `frame="app-window"`).
 */
export function Gallery({
  items,
  label,
  frame,
  appTitle,
  labels,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  items: Item[];
  label: string;
  frame?: "app-window";
  appTitle?: string;
  labels: { close: string; prev: string; next: string };
  sizes?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const poster = items[0];

  const posterButton = (
    <button
      type="button"
      onClick={() => setOpenIndex(0)}
      className="group relative block aspect-16/10 w-full cursor-zoom-in overflow-hidden"
    >
      <Image
        src={poster.src}
        alt={poster.caption}
        className="absolute top-0 left-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        sizes={sizes}
      />
      <span className="bg-bg/80 border-border text-fg absolute right-3 bottom-3 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur">
        {label} · {items.length}
      </span>
    </button>
  );

  return (
    <>
      {frame === "app-window" && appTitle ? (
        <AppWindowFrame title={appTitle}>{posterButton}</AppWindowFrame>
      ) : (
        <div className="border-border bg-surface-2 rounded-frame overflow-hidden border">
          {posterButton}
        </div>
      )}
      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          closeLabel={labels.close}
          prevLabel={labels.prev}
          nextLabel={labels.next}
        />
      )}
    </>
  );
}
