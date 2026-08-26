/**
 * Marco de aplicación de escritorio: barra de título sin URL, para
 * comunicar de inmediato "esto no es una web" (Presupuestos de Obra, PyQt6).
 */
export function AppWindowFrame({
  title,
  children,
}: {
  title: string;
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
        <span className="text-fg-muted flex-1 text-center font-mono text-xs">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
