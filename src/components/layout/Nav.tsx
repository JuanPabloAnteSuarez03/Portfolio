import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}#projects`, label: dict.nav.projects },
    { href: `/${lang}#stack`, label: dict.nav.stack },
    { href: `/${lang}#about`, label: dict.nav.about },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="border-border bg-bg/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link
            href={`/${lang}`}
            className="text-fg hover:text-accent font-mono text-sm transition-colors"
          >
            <span className="text-accent" aria-hidden="true">
              ${" "}
            </span>
            {profile.handle}
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg-muted hover:text-fg font-mono text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher lang={lang} />
          </div>
        </nav>
      </Container>
    </header>
  );
}
