import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="border-border mt-auto border-t py-10">
      <Container>
        <div className="text-fg-muted flex flex-col gap-4 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location[lang]}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-fg transition-colors"
            >
              {dict.contact.email}
            </a>
            <span className="text-fg-muted">{dict.footer.builtWith}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
