import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { type Project, t } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({
  project,
  index,
  lang,
  dict,
}: {
  project: Project;
  index: number;
  lang: Locale;
  dict: Dictionary;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="border-border bg-surface hover:border-border-strong group h-full rounded-card border transition-[border-color,box-shadow] duration-300 hover:shadow-glow">
      {/* flex-col + mt-auto en la fila de enlaces: quedan alineados al pie
          aunque las tarjetas tengan distinta cantidad de texto. */}
      <div className="flex h-full flex-col p-6 md:p-8">
        <div className="mb-5 flex items-baseline gap-3">
          <span className="text-accent font-mono text-label tracking-[0.18em]">
            {number}
          </span>
          <h3 className="text-h3 font-semibold">{project.name}</h3>
        </div>

        <p className="text-fg-muted mb-1 font-mono text-xs">
          {t(project.client, lang)} · {project.period}
        </p>

        <p className="text-fg mt-4 text-lg leading-snug text-pretty">
          {t(project.tagline, lang)}
        </p>

        <p className="text-fg-muted mt-4 text-sm leading-relaxed">
          <span className="text-fg-dim font-mono text-xs uppercase">
            {dict.project.role}:{" "}
          </span>
          {t(project.role, lang)}
        </p>

        <ul className="mt-5 mb-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech.name}>
              <Tag>{tech.name}</Tag>
            </li>
          ))}
          {project.stack.length > 5 && (
            <li>
              <Tag className="text-fg-dim">+{project.stack.length - 5}</Tag>
            </li>
          )}
        </ul>

        <div className="border-border mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5 font-mono text-sm">
          <Link
            href={`/${lang}/projects/${project.slug}`}
            className="text-accent hover:text-fg transition-colors"
          >
            {dict.project.viewCase} →
          </Link>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg transition-colors"
            >
              {t(link.label, lang)} ↗
              <span className="sr-only"> {dict.showcase.newTabNote}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
