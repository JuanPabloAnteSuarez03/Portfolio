"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

/**
 * Captura de página completa que se recorre sola al pasar el mouse
 * (`.pan-frame`/`.pan-image` en globals.css, con `100cqh` de container query
 * para no medir nada en JS). El botón replica el gesto para táctil y teclado
 * vía la clase `.is-panned` — ver la regla hermana en globals.css.
 *
 * `prefers-reduced-motion` ya está cubierto de forma global (globals.css
 * fuerza `transition-duration: 0.01ms`), así que aquí no hay que ramificar.
 */
export function ScreenshotPan({
  image,
  alt,
  panSeconds,
  panLabel,
  panStopLabel,
  className,
}: {
  image: StaticImageData;
  alt: string;
  panSeconds: number;
  panLabel: string;
  panStopLabel: string;
  className?: string;
}) {
  const [panned, setPanned] = useState(false);

  return (
    <div
      className={cn(
        "pan-frame relative aspect-16/10 overflow-hidden [container-type:size]",
        panned && "is-panned",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        className="pan-image absolute top-0 left-0 h-auto w-full"
        style={{
          transitionProperty: "transform",
          transitionDuration: `${panSeconds}s`,
          transitionTimingFunction: "var(--ease-pan)",
        }}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <button
        type="button"
        aria-pressed={panned}
        onClick={() => setPanned((value) => !value)}
        className="border-border-strong bg-bg/80 text-fg absolute right-3 bottom-3 rounded-full border px-3 py-1.5 font-mono text-xs opacity-70 backdrop-blur transition-opacity hover:opacity-100 focus-visible:opacity-100"
      >
        {panned ? panStopLabel : panLabel}
      </button>
    </div>
  );
}
