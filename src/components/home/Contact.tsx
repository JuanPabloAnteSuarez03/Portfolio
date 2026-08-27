import type { Dictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";

export function Contact({ dict }: { dict: Dictionary }) {
  const channels = [
    { label: dict.contact.email, value: profile.email, href: `mailto:${profile.email}` },
    { label: dict.contact.whatsapp, value: profile.phone, href: profile.whatsapp },
    { label: dict.contact.github, value: "JuanPabloAnteSuarez03", href: profile.github },
  ];

  return (
    <ul className="border-border divide-border divide-y border-y">
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            href={channel.href}
            target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="group flex flex-wrap items-center justify-between gap-3 py-5 transition-colors"
          >
            <span className="text-fg-muted font-mono text-label tracking-[0.18em] uppercase">
              {channel.label}
            </span>
            <span className="text-fg group-hover:text-accent font-mono text-sm break-all transition-colors">
              {channel.value} <span aria-hidden="true">↗</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
