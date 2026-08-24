import { cn } from "@/lib/cn";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-border bg-surface-2 text-fg-muted inline-flex items-center rounded border px-2 py-1 font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
