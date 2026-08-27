import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { type L, type TechGroup, t } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

/**
 * Agrupado, sin barras de porcentaje: un "React 80%" no significa nada
 * verificable y los reclutadores técnicos lo leen como ruido.
 *
 * Casi todo son nombres de marca, que nunca se traducen y por eso van como
 * cadena suelta. Lo que sí es una descripción lleva la forma bilingüe.
 */
const stack: Record<TechGroup, (string | L<string>)[]> = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3", "PyQt6"],
  backend: ["Python", "Django", "Django REST Framework", "Node.js", "PHP"],
  data: ["PostgreSQL", "SQL", "SQLAlchemy", "pandas"],
  infra: ["Docker", "Kubernetes", "Linux", "Vercel", "Render", "Git"],
  testing: ["Jest", "Playwright", "Testing Library"],
  tooling: [{ es: "APIs de IA", en: "AI APIs" }, "Claude Code", "Cursor", "TTS / STT"],
};

const order: TechGroup[] = ["frontend", "backend", "data", "infra", "testing", "tooling"];

export function StackSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {order.map((group) => (
        <div key={group}>
          <h3 className="text-accent mb-4 font-mono text-label tracking-[0.18em] uppercase">
            {dict.stackGroups[group]}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {stack[group].map((tech) => {
              const label = typeof tech === "string" ? tech : t(tech, lang);
              return (
                <li key={label}>
                  <Tag>{label}</Tag>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
