import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { type Project, t } from "@/types/content";
import { BrowserFrame } from "@/components/showcase/BrowserFrame";
import { ScreenshotPan } from "@/components/showcase/ScreenshotPan";
import { Gallery } from "@/components/showcase/Gallery";
import { LiveEmbed } from "@/components/showcase/LiveEmbed";

/**
 * Versión a ancho completo del showcase de `ProjectCard`, más el iframe en
 * vivo (`LiveEmbed`) cuando el proyecto lo permite — el "momento wow" que en
 * el home no aparece a propósito.
 */
export function ProjectShowcase({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="space-y-6">
      {project.preview.mode === "pan" && project.media.desktopFull && (
        <BrowserFrame
          url={
            project.preview.liveUrl
              ? new URL(project.preview.liveUrl).host
              : project.name
          }
          live={project.preview.embeddable}
          liveLabel={dict.showcase.liveBadge}
        >
          <ScreenshotPan
            image={project.media.desktopFull}
            alt={t(project.tagline, lang)}
            panSeconds={project.preview.panSeconds}
            panLabel={dict.showcase.pan}
            panStopLabel={dict.showcase.panStop}
            sizes="(min-width: 1024px) 1120px, 100vw"
          />
        </BrowserFrame>
      )}

      {project.preview.mode === "gallery" && project.media.gallery && (
        <Gallery
          items={project.media.gallery.map((image) => ({
            src: image.src,
            caption: t(image.caption, lang),
          }))}
          label={dict.showcase.gallery}
          frame={project.preview.frame}
          appTitle={project.preview.appTitle}
          labels={{
            close: dict.showcase.closeImage,
            prev: dict.showcase.prevImage,
            next: dict.showcase.nextImage,
          }}
          sizes="(min-width: 1024px) 1120px, 100vw"
        />
      )}

      {project.preview.mode === "pan" &&
        project.preview.embeddable &&
        project.preview.liveUrl && (
          <LiveEmbed
            url={project.preview.liveUrl}
            loadLabel={dict.showcase.loadLive}
            loadingLabel={dict.showcase.liveLoading}
            slowLabel={dict.showcase.liveSlow}
          />
        )}
    </div>
  );
}
