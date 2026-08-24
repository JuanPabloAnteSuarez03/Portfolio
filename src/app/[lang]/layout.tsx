import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/**
 * Este ES el layout raíz del sitio (no hay `app/layout.tsx`).
 *
 * Se hace así a propósito: solo el layout raíz puede renderizar `<html>`, y
 * el atributo `lang` debe reflejar el idioma real de la página. Al ser la ruta
 * `[lang]` la más alta, `<html lang>` sale correcto sin trucos de cliente.
 * `/` redirige a `/es` desde `next.config.ts`.
 */

// Todo el sitio se prerenderiza; cualquier idioma no listado da 404 en build.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // En Next 16 `params` es una promesa.
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${fontVariables} h-full antialiased`}>
      <body className="bg-bg text-fg flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-accent sr-only rounded px-4 py-2 font-mono text-sm text-black focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
        >
          {dict.nav.skipToContent}
        </a>
        <Nav lang={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
