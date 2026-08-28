import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";

const bio: Record<Locale, string[]> = {
  es: [
    "Estudio Ingeniería de Sistemas en la Universidad del Valle y trabajo como desarrollador freelance desde 2024. En ese tiempo he construido software para empresas reales: un ERP de inventario, una herramienta de presupuestos de obra, y sitios corporativos en producción.",
    "Me interesa el trabajo donde hay que entender bien el problema antes de escribir código — hablar con quien va a usar el sistema, entender cómo trabaja hoy, y recién ahí decidir la solución técnica.",
  ],
  en: [
    "I study Systems Engineering at Universidad del Valle and have worked as a freelance developer since 2024. In that time I have built software for real businesses: an inventory ERP, a construction budgeting tool, and corporate sites in production.",
    "I am drawn to work where the problem has to be understood before the code gets written — talking to whoever will use the system, understanding how they work today, and only then deciding the technical solution.",
  ],
};

export function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        {bio[lang].map((paragraph) => (
          <p key={paragraph} className="text-fg-muted text-lg leading-relaxed text-pretty">
            {paragraph}
          </p>
        ))}
        <div className="pt-4">
          <Button href={profile.cv[lang]} variant="secondary" external>
            {dict.about.downloadCv} ↓
          </Button>
        </div>
      </div>

      <dl className="space-y-8">
        <div>
          <dt className="text-accent mb-3 font-mono text-label tracking-[0.18em] uppercase">
            {dict.about.education}
          </dt>
          <dd className="text-fg">{profile.education.degree[lang]}</dd>
          <dd className="text-fg-muted text-sm">{profile.education.school}</dd>
          <dd className="text-fg-muted mt-1 font-mono text-xs">
            {profile.education.status[lang]}
          </dd>
        </div>

        <div>
          <dt className="text-accent mb-3 font-mono text-label tracking-[0.18em] uppercase">
            {dict.about.languages}
          </dt>
          {profile.languages.map((language) => (
            <dd key={language.name[lang]} className="text-fg-muted text-sm">
              <span className="text-fg">{language.name[lang]}</span> ·{" "}
              {language.level[lang]}
            </dd>
          ))}
        </div>
      </dl>
    </div>
  );
}
