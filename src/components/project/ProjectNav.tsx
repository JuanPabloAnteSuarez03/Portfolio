import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Project } from "@/types/content";

export function ProjectNav({
  prev,
  next,
  lang,
  dict,
}: {
  prev?: Project;
  next?: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="grid gap-4 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/${lang}/projects/${prev.slug}`}
          className="group border-border bg-surface hover:border-border-strong rounded-card border p-5 transition-colors"
        >
          <p className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
            ← {dict.project.previous}
          </p>
          <p className="text-fg group-hover:text-accent mt-2 font-medium transition-colors">
            {prev.name}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/${lang}/projects/${next.slug}`}
          className="group border-border bg-surface hover:border-border-strong rounded-card border p-5 text-right transition-colors"
        >
          <p className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
            {dict.project.next} →
          </p>
          <p className="text-fg group-hover:text-accent mt-2 font-medium transition-colors">
            {next.name}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
