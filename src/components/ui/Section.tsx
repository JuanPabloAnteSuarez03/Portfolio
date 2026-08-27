import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

/**
 * Sección con índice mono (`01 — PROYECTOS`) y regla fina.
 * El índice en acento es uno de los pocos lugares donde aparece el neón.
 */
export function Section({
  id,
  index,
  title,
  lead,
  children,
  className,
}: {
  id?: string;
  index?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <Container>
        <Reveal>
          {title && (
            <header className="mb-12 md:mb-16">
              <div className="border-border mb-6 flex items-center gap-4 border-b pb-4">
                {index && (
                  <span className="text-accent font-mono text-label tracking-[0.18em]">
                    {index}
                  </span>
                )}
                <span className="text-fg-muted font-mono text-label tracking-[0.18em] uppercase">
                  {title}
                </span>
              </div>
              {lead && (
                <p className="text-fg-muted max-w-2xl text-lg leading-relaxed text-balance">
                  {lead}
                </p>
              )}
            </header>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
