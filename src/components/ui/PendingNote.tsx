/**
 * Lista los datos que solo Juan Pablo puede aportar.
 *
 * Se renderiza **únicamente en desarrollo**: así ve sus pendientes mientras
 * trabaja con `npm run dev`, sin riesgo de que se publiquen en producción.
 */
export function PendingNote({ items }: { items?: string[] }) {
  if (process.env.NODE_ENV === "production") return null;
  if (!items?.length) return null;

  return (
    <aside className="border-amber/40 bg-amber/5 my-8 rounded-md border border-dashed p-5">
      <p className="text-amber mb-3 font-mono text-label tracking-[0.18em] uppercase">
        Pendiente de contenido · solo visible en dev
      </p>
      <ul className="text-fg-muted list-disc space-y-1.5 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
