import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, sideProjects } from "@/content/projects";
import { t } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/home/ProjectCard";
import { StackSection } from "@/components/home/StackSection";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Tag } from "@/components/ui/Tag";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />

      <Section
        id="projects"
        index="01"
        title={dict.sections.projects}
        lead={dict.sections.projectsLead}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              lang={lang}
              dict={dict}
            />
          ))}
        </div>
      </Section>

      <Section
        id="stack"
        index="02"
        title={dict.sections.stack}
        lead={dict.sections.stackLead}
      >
        <StackSection lang={lang} dict={dict} />
      </Section>

      <Section id="about" index="03" title={dict.sections.about}>
        <About lang={lang} dict={dict} />
      </Section>

      <Section
        index="04"
        title={dict.sections.sideProjects}
        lead={dict.sections.sideProjectsLead}
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {sideProjects.map((project) => (
            <li key={project.name}>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-surface hover:border-border-strong block h-full rounded-card border p-5 transition-colors"
              >
                <p className="text-fg font-mono text-sm">
                  {project.name} <span aria-hidden="true">↗</span>
                </p>
                <p className="text-fg-muted mt-2 text-sm">
                  {t(project.description, lang)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="contact"
        index="05"
        title={dict.sections.contact}
        lead={dict.sections.contactLead}
      >
        <Contact dict={dict} />
      </Section>
    </>
  );
}
