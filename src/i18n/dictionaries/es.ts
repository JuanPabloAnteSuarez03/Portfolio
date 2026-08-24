export const es = {
  nav: {
    projects: "Proyectos",
    stack: "Stack",
    about: "Sobre mí",
    contact: "Contacto",
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    switchTo: "Cambiar a español",
  },
  hero: {
    role: "Desarrollador de software",
    pitch:
      "Construyo aplicaciones web y de escritorio completas — del modelo de datos a la interfaz. Ingeniería de Sistemas en la Universidad del Valle, freelance desde 2024.",
    available: "Disponible para trabajar",
    viewProjects: "Ver proyectos",
    contactMe: "Contacto",
  },
  sections: {
    projects: "Proyectos",
    projectsLead:
      "Cuatro proyectos con cliente real. Cada uno con su caso de estudio: qué había que resolver, qué construí y por qué lo decidí así.",
    stack: "Stack",
    stackLead: "Las herramientas con las que trabajo.",
    about: "Sobre mí",
    contact: "Contacto",
    contactLead: "¿Tienes un proyecto en mente? Escríbeme.",
    sideProjects: "Otros proyectos",
    sideProjectsLead: "Trabajo personal y académico, sin caso de estudio.",
  },
  project: {
    role: "Rol",
    client: "Cliente",
    period: "Período",
    team: "Equipo",
    stack: "Stack",
    viewCase: "Ver caso de estudio",
    backToProjects: "Volver a proyectos",
    next: "Siguiente proyecto",
    previous: "Proyecto anterior",
    context: "Contexto",
    problem: "Problema",
    solution: "Solución",
    decisions: "Decisiones técnicas",
    results: "Resultados",
    learnings: "Aprendizajes",
    tradeoff: "Trade-off",
  },
  showcase: {
    pan: "Recorrer",
    panStop: "Volver arriba",
    panHint: "Pasa el mouse para recorrer el sitio",
    loadLive: "Cargar sitio en vivo",
    liveLoading: "Cargando…",
    liveSlow: "¿No carga? Ábrelo en una pestaña nueva.",
    liveBadge: "en vivo",
    openInNewTab: "Abrir en una pestaña nueva",
    newTabNote: "(abre en una pestaña nueva)",
    gallery: "Capturas",
    closeImage: "Cerrar imagen",
  },
  about: {
    education: "Formación",
    languages: "Idiomas",
    downloadCv: "Descargar CV",
  },
  contact: {
    email: "Correo",
    copy: "Copiar",
    copied: "Copiado",
    whatsapp: "WhatsApp",
    github: "GitHub",
  },
  stackGroups: {
    frontend: "Frontend",
    backend: "Backend",
    data: "Datos",
    infra: "Infraestructura",
    testing: "Testing",
    tooling: "Herramientas",
  },
  footer: {
    builtWith: "Hecho con Next.js y TypeScript.",
    sourceCode: "Código de este sitio",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La ruta que buscas no existe.",
    back: "Volver al inicio",
  },
};

/**
 * El tipo del diccionario se deriva del español: `en.ts` debe cumplirlo.
 *
 * Sin `as const` a propósito. Con él, cada cadena sería un tipo literal y el
 * inglés tendría que coincidir *palabra por palabra* con el español. Lo que
 * queremos verificar es la estructura: que no falte ni sobre ninguna clave.
 */
export type Dictionary = typeof es;
