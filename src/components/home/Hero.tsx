import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      {/* Capa propia: `mask-image` enmascararía también el texto si fuera al contenedor. */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      <Container className="fade-in-load relative py-24 md:py-36">
        <p className="text-accent mb-6 font-mono text-label tracking-[0.18em] uppercase">
          <span aria-hidden="true">$ </span>
          {dict.hero.role}
        </p>

        <h1 className="text-display max-w-4xl font-semibold text-balance">
          {profile.name}
        </h1>

        <p className="text-fg-muted mt-8 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
          {dict.hero.pitch}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={`/${lang}#projects`}>{dict.hero.viewProjects}</Button>
          <Button href={`/${lang}#contact`} variant="secondary">
            {dict.hero.contactMe}
          </Button>
        </div>

        <p className="text-fg-muted mt-10 flex items-center gap-2.5 font-mono text-xs">
          <span
            className="bg-accent inline-block size-2 rounded-full"
            aria-hidden="true"
          />
          {dict.hero.available} · {profile.location[lang]}
        </p>
      </Container>
    </section>
  );
}
