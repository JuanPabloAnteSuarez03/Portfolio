import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { TechGroup } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

/**
 * Agrupado, sin barras de porcentaje: un "React 80%" no significa nada
 * verificable y los reclutadores técnicos lo leen como ruido.
 */
const stack: Record<TechGroup, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3", "PyQt6"],
  backend: ["Python", "Django", "Django REST Framework", "Node.js", "PHP"],
  data: ["PostgreSQL", "SQL", "SQLAlchemy", "pandas"],
  infra: ["Docker", "Kubernetes", "Linux", "Vercel", "Render", "Git"],
  testing: ["Jest", "Playwright", "Testing Library"],
  tooling: ["APIs de IA", "Claude Code", "Cursor", "TTS / STT"],
};

const order: TechGroup[] = ["frontend", "backend", "data", "infra", "testing", "tooling"];

export function StackSection({ dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {order.map((group) => (
        <div key={group}>
          <h3 className="text-accent mb-4 font-mono text-label tracking-[0.18em] uppercase">
            {dict.stackGroups[group]}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {stack[group].map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
