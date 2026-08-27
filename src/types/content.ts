import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";

/**
 * Cualquier valor que deba existir en ambos idiomas.
 * Si falta una clave, TypeScript lo marca en compilación — no es un bug silencioso.
 */
export type L<T> = Record<Locale, T>;

/** Extrae el idioma activo de un valor bilingüe. */
export function t<T>(value: L<T>, lang: Locale): T {
  return value[lang];
}

export type TechGroup =
  | "frontend"
  | "backend"
  | "data"
  | "infra"
  | "testing"
  | "tooling";

export type Tech = {
  name: string;
  group: TechGroup;
};

export type ProjectLink = {
  kind: "live" | "repo" | "repo-frontend" | "repo-backend" | "docs";
  href: string;
  label: L<string>;
};

export type Media = {
  /** Captura de página completa, usada por el paneo. */
  desktopFull?: StaticImageData;
  /** Recorte 16:10 superior: póster de tarjeta, imagen OG y respaldo sin movimiento. */
  hero?: StaticImageData;
  mobileFull?: StaticImageData;
  gallery?: { src: StaticImageData; caption: L<string> }[];
};

/**
 * Cómo se muestra el proyecto:
 *  - `pan`        → captura recorrible dentro de un marco de navegador
 *  - `app-window` → captura dentro de un marco de app de escritorio (PyQt6)
 *  - `gallery`    → galería con pies de foto (para lo que está tras login)
 */
export type Preview =
  | { mode: "pan"; embeddable: boolean; liveUrl?: string; panSeconds: number }
  | { mode: "app-window"; appTitle: string; panSeconds: number }
  | { mode: "gallery"; frame?: "app-window"; appTitle?: string };

export type Decision = {
  title: L<string>;
  body: L<string>;
  /** "elegí X sobre Y porque…" — esto es lo que hace que el caso lea senior. */
  tradeoff?: L<string>;
};

export type CaseStudy = {
  context: L<string[]>;
  problem: L<string[]>;
  solution: L<string[]>;
  decisions: Decision[];
  results: L<string[]>;
  learnings?: L<string[]>;
};

export type ProjectSlug = "unidental" | "presupuestos" | "eck" | "camer";

export type Project = {
  slug: ProjectSlug;
  /** Nombre de marca — nunca se traduce. */
  name: string;
  client: L<string>;
  /** Bilingüe: los nombres de mes y "Desde"/"Since" sí se traducen. */
  period: L<string>;
  /** El encuadre honesto del rol. Ni inflado ni subestimado. */
  role: L<string>;
  team?: L<string>;
  /** ≤70 caracteres, va en la tarjeta. */
  tagline: L<string>;
  summary: L<string>;
  highlights: L<string[]>;
  stack: Tech[];
  links: ProjectLink[];
  media: Media;
  preview: Preview;
  caseStudy: CaseStudy;
  /** Datos que solo Juan Pablo puede aportar. Visibles solo en `npm run dev`. */
  pending?: string[];
};

/** Proyectos secundarios: solo enlace, sin caso de estudio. */
export type SideProject = {
  name: string;
  description: L<string>;
  tech: string[];
  repo: string;
  live?: string;
};
