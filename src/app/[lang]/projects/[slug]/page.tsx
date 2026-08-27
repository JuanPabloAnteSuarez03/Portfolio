import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, projectsBySlug } from "@/content/projects";
import { profile } from "@/content/profile";
import { alternatesFor } from "@/lib/site";
import { t, type ProjectSlug } from "@/types/content";
import { ProjectJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealGrid } from "@/components/ui/RevealGrid";
import { PendingNote } from "@/components/ui/PendingNote";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectShowcase } from "@/components/project/ProjectShowcase";
import { ProjectNav } from "@/components/project/ProjectNav";

// Solo los 4 slugs reales se prerenderizan; cualquier otro da 404 en build.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projectsBySlug[slug as ProjectSlug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) return {};

  // El nombre solo: la plantilla del layout le agrega "· Juan Pablo Ante".
  const title = project.name;
  const description = t(project.summary, lang);
  const path = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: {
      type: "article",
      siteName: profile.shortName,
      title: `${project.name} — ${t(project.tagline, lang)}`,
      description,
      url: `/${lang}${path}`,
      locale: ogLocales[lang],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${t(project.tagline, lang)}`,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const { caseStudy } = project;
  const index = projects.findIndex((p) => p.slug === project.slug);

  return (
    <>
      <ProjectJsonLd lang={lang} slug={project.slug} />

      <Container className="pt-12 pb-16 md:pt-16 md:pb-20">
        <ProjectHeader project={project} lang={lang} dict={dict} />
        <div className="mt-10">
          <ProjectShowcase project={project} lang={lang} dict={dict} />
        </div>
      </Container>

      <Section index="01" title={dict.project.context}>
        <div className="text-fg-muted max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
          {t(caseStudy.context, lang).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section index="02" title={dict.project.problem}>
        <div className="text-fg-muted max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
          {t(caseStudy.problem, lang).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section index="03" title={dict.project.solution}>
        <div className="text-fg-muted max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
          {t(caseStudy.solution, lang).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section index="04" title={dict.project.decisions}>
        <RevealGrid className="grid gap-6 md:grid-cols-2">
          {caseStudy.decisions.map((decision) => (
            <article
              key={t(decision.title, lang)}
              className="border-border bg-surface hover:border-border-strong rounded-card border p-6 transition-colors"
            >
              <h3 className="text-fg font-display text-lg font-semibold">
                {t(decision.title, lang)}
              </h3>
              <p className="text-fg-muted mt-3 text-sm leading-relaxed">
                {t(decision.body, lang)}
              </p>
              {decision.tradeoff && (
                <p className="border-border mt-4 border-t pt-4 text-sm leading-relaxed">
                  <span className="text-accent font-mono text-xs tracking-[0.18em] uppercase">
                    {dict.project.tradeoff}:{" "}
                  </span>
                  <span className="text-fg-muted">{t(decision.tradeoff, lang)}</span>
                </p>
              )}
            </article>
          ))}
        </RevealGrid>
      </Section>

      <Section index="05" title={dict.project.results}>
        <div className="text-fg-muted max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
          {t(caseStudy.results, lang).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {caseStudy.learnings && (
        <Section index="06" title={dict.project.learnings}>
          <div className="text-fg-muted max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
            {t(caseStudy.learnings, lang).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <PendingNote items={project.pending} />
        <ProjectNav
          prev={projects[index - 1]}
          next={projects[index + 1]}
          lang={lang}
          dict={dict}
        />
      </Section>
    </>
  );
}
