import type { Dictionary } from "./es";

/**
 * El anotado `: Dictionary` es lo que mantiene los idiomas sincronizados:
 * si falta una clave o sobra otra, `npx tsc --noEmit` falla.
 */
export const en: Dictionary = {
  nav: {
    projects: "Projects",
    stack: "Stack",
    about: "About",
    contact: "Contact",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTo: "Switch to English",
  },
  hero: {
    role: "Software developer",
    pitch:
      "I build complete web and desktop applications — from the data model to the interface. Systems Engineering at Universidad del Valle, freelancing since 2024.",
    available: "Available for work",
    viewProjects: "View projects",
    contactMe: "Contact",
  },
  sections: {
    projects: "Projects",
    projectsLead:
      "Four projects with real clients. Each with its case study: what needed solving, what I built, and why I decided it that way.",
    stack: "Stack",
    stackLead: "The tools I work with.",
    about: "About",
    contact: "Contact",
    contactLead: "Got a project in mind? Get in touch.",
    sideProjects: "Other projects",
    sideProjectsLead: "Personal and academic work, without a case study.",
  },
  project: {
    role: "Role",
    client: "Client",
    period: "Period",
    team: "Team",
    stack: "Stack",
    viewCase: "View case study",
    backToProjects: "Back to projects",
    next: "Next project",
    previous: "Previous project",
    context: "Context",
    problem: "Problem",
    solution: "Solution",
    decisions: "Technical decisions",
    results: "Results",
    learnings: "Learnings",
    tradeoff: "Trade-off",
  },
  showcase: {
    pan: "Scroll through",
    panStop: "Back to top",
    panHint: "Hover to scroll through the site",
    loadLive: "Load live site",
    liveLoading: "Loading…",
    liveSlow: "Not loading? Open it in a new tab.",
    liveBadge: "live",
    openInNewTab: "Open in a new tab",
    newTabNote: "(opens in a new tab)",
    gallery: "Screenshots",
    closeImage: "Close image",
  },
  about: {
    education: "Education",
    languages: "Languages",
    downloadCv: "Download CV",
  },
  contact: {
    email: "Email",
    copy: "Copy",
    copied: "Copied",
    whatsapp: "WhatsApp",
    github: "GitHub",
  },
  stackGroups: {
    frontend: "Frontend",
    backend: "Backend",
    data: "Data",
    infra: "Infrastructure",
    testing: "Testing",
    tooling: "Tooling",
  },
  footer: {
    builtWith: "Built with Next.js and TypeScript.",
    sourceCode: "Source code for this site",
  },
  notFound: {
    title: "Page not found",
    body: "The route you are looking for does not exist.",
    back: "Back to home",
  },
};
