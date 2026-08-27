import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { type Project, t } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function ProjectHeader({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header>
      <Link
        href={`/${lang}#projects`}
        className="text-fg-muted hover:text-accent font-mono text-sm transition-colors"
      >
        ← {dict.project.backToProjects}
      </Link>

      <h1 className="text-h2 mt-6 font-semibold">{project.name}</h1>
      <p className="text-fg-muted mt-3 max-w-2xl text-lg leading-relaxed text-pretty">
        {t(project.tagline, lang)}
      </p>

      <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
            {dict.project.client}
          </dt>
          <dd className="text-fg mt-1 text-sm">{t(project.client, lang)}</dd>
        </div>
        <div>
          <dt className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
            {dict.project.period}
          </dt>
          <dd className="text-fg mt-1 text-sm">{project.period}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
            {dict.project.role}
          </dt>
          <dd className="text-fg mt-1 text-sm leading-relaxed">
            {t(project.role, lang)}
          </dd>
        </div>
        {project.team && (
          <div className="sm:col-span-2">
            <dt className="text-fg-muted font-mono text-xs tracking-[0.18em] uppercase">
              {dict.project.team}
            </dt>
            <dd className="text-fg-muted mt-1 text-sm leading-relaxed">
              {t(project.team, lang)}
            </dd>
          </div>
        )}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech.name}>
            <Tag>{tech.name}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-4">
        {project.links.map((link) => (
          <Button
            key={link.href}
            href={link.href}
            external
            variant={link.kind === "live" ? "primary" : "secondary"}
          >
            {t(link.label, lang)} ↗
          </Button>
        ))}
      </div>
    </header>
  );
}
