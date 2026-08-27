"use client";

import { useEffect, useRef, useState } from "react";

const EMBED_WIDTH = 1280;
const EMBED_HEIGHT = 800;
const SLOW_TIMEOUT_MS = 6000;

/**
 * El "momento wow": carga el sitio real en un iframe, escalado desde un
 * viewport de 1280px con `ResizeObserver` (sin depender de media queries del
 * propio sitio embebido). Nunca automático — el visitante ya optó por él.
 *
 * Solo ≥768px: en móvil el layout de escritorio escalado sería ilegible, y
 * el CTA "Ver en vivo ↗" ya cubre ese camino.
 */
export function LiveEmbed({
  url,
  loadLabel,
  loadingLabel,
  slowLabel,
}: {
  url: string;
  loadLabel: string;
  loadingLabel: string;
  slowLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded">("idle");
  const [slow, setSlow] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "idle") return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? EMBED_WIDTH;
      setScale(width / EMBED_WIDTH);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [status]);

  useEffect(() => {
    if (status !== "loading") return;
    setSlow(false);
    const timeout = setTimeout(() => setSlow(true), SLOW_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [status]);

  if (status === "idle") {
    return (
      <button
        type="button"
        onClick={() => setStatus("loading")}
        className="border-border-strong text-fg-muted hover:border-accent hover:text-accent hidden w-full rounded-frame border border-dashed py-5 font-mono text-sm transition-colors md:block"
      >
        {loadLabel}
      </button>
    );
  }

  return (
    <div className="border-border bg-surface-2 rounded-frame relative hidden overflow-hidden border md:block">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: EMBED_HEIGHT * scale }}
      >
        <iframe
          src={url}
          title={url}
          width={EMBED_WIDTH}
          height={EMBED_HEIGHT}
          onLoad={() => setStatus("loaded")}
          className="absolute top-0 left-0 border-0"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        />
        {status === "loading" && (
          <div className="bg-bg/90 absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center font-mono text-sm">
            <p className="text-fg-muted">{loadingLabel}</p>
            {slow && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-fg transition-colors"
              >
                {slowLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
