import { ImageResponse } from "next/og";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, projectsBySlug } from "@/content/projects";
import { profile } from "@/content/profile";
import { t, type ProjectSlug } from "@/types/content";

export const alt = "Caso de estudio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Una imagen por proyecto y por idioma, todas generadas en build.
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
}

/**
 * Tarjeta social por caso de estudio.
 *
 * Sin fuentes propias a propósito: cargarlas exigiría bajar los .ttf de
 * Google en build, y que el build dependa de una red ajena para una imagen
 * es un mal negocio. La identidad la cargan el fondo, el acento lima y el
 * glifo del prompt.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const project = projectsBySlug[slug as ProjectSlug];
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0f",
          // La franja lima al borde izquierdo es el único neón de la pieza.
          borderLeft: "16px solid #a3e635",
          padding: "68px 72px",
          color: "#e8e8ec",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#a3e635", letterSpacing: 2 }}>
            $ {profile.handle}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 40,
            }}
          >
            {project.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#a1a1ac",
              marginTop: 20,
              lineHeight: 1.35,
              maxWidth: 940,
            }}
          >
            {t(project.tagline, locale)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, background: "#26262c", marginBottom: 26 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "#71717a",
            }}
          >
            <div style={{ display: "flex" }}>
              {project.stack.slice(0, 4).map((tech) => tech.name).join("  ·  ")}
            </div>
            <div style={{ display: "flex", color: "#a1a1ac" }}>
              {dict.meta.projectsLabel}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
