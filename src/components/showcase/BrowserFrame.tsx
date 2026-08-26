/**
 * Marco de navegador: puntos de ventana + pastilla mono con la URL, y un
 * badge "en vivo" opcional. Envuelve un `ScreenshotPan` para ECK/Camer/UNIDENTAL.
 */
export function BrowserFrame({
  url,
  live,
  liveLabel,
  children,
}: {
  url: string;
  live?: boolean;
  liveLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-surface-2 rounded-frame overflow-hidden border">
      <div className="border-border flex items-center gap-3 border-b px-4 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="bg-fg-dim/40 h-2.5 w-2.5 rounded-full" />
          <span className="bg-fg-dim/40 h-2.5 w-2.5 rounded-full" />
          <span className="bg-fg-dim/40 h-2.5 w-2.5 rounded-full" />
        </div>
        <span className="text-fg-dim border-border bg-bg flex-1 truncate rounded border px-3 py-1 text-center font-mono text-xs">
          {url}
        </span>
        {live && (
          <span className="text-accent flex shrink-0 items-center gap-1.5 font-mono text-xs">
            <span className="bg-accent h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            {liveLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
