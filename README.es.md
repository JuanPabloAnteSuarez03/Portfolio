# Juan Pablo Ante — Portafolio

[English](README.md) · **Español**

Portafolio personal bilingüe (ES/EN). Next.js 16 (App Router) + TypeScript + Tailwind v4, completamente estático — 25 rutas prerenderizadas, sin runtime de servidor.

🔗 **En vivo:** https://juanpabloante.vercel.app

---

## Stack

| Aspecto | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind v4 (tokens en `@theme`, sin `tailwind.config.ts`) |
| Fuentes | `next/font/google` — Space Grotesk, Inter, JetBrains Mono, auto-hospedadas |
| Imágenes | `next/image`, imports estáticos (dimensiones y blur automáticos) |
| Imágenes OG | `next/og` (`ImageResponse`), generadas en build |
| Capturas | `playwright-core` contra el Chrome del sistema (ver `scripts/capture.mjs`) |
| Hosting | Vercel |

---

## Puesta en marcha

```bash
npm install
npm run dev          # http://localhost:3000 — `/` redirige a `/es`
npm run build        # los dos idiomas deben salir prerenderizados
npm run start        # sirve el build de producción
npx tsc --noEmit     # correr antes de cada push — ver más abajo
npm run capture      # regenera las capturas de los proyectos (manual, nunca en CI)
```

---

## Cómo está organizado

```
src/
├─ app/
│  ├─ [lang]/                    Toda página real vive bajo este segmento
│  │  ├─ layout.tsx              Layout raíz — <html lang>, generateMetadata, Nav/Footer
│  │  ├─ page.tsx                Home
│  │  ├─ not-found.tsx           404 dentro de un idioma conocido
│  │  ├─ opengraph-image.tsx     Imagen OG del home
│  │  └─ projects/[slug]/
│  │     ├─ page.tsx             Caso de estudio
│  │     └─ opengraph-image.tsx  Imagen OG por proyecto
│  ├─ not-found.tsx              404 raíz — sin layout de [lang] encima, ver gotchas
│  ├─ sitemap.ts · robots.ts
│  └─ globals.css                Tokens del sistema de diseño (Tailwind v4 @theme) + animaciones propias
├─ content/
│  ├─ projects.ts                Los 4 casos de estudio, bilingües y tipados — el contenido se edita acá
│  └─ profile.ts                 Datos personales, formación, contacto
├─ i18n/
│  ├─ config.ts                  Lista de idiomas, tags de hreflang/OG
│  └─ dictionaries/{es,en}.ts    Cadenas de interfaz
├─ components/
│  ├─ home/                      Hero, ProjectCard, StackSection, About, Contact
│  ├─ project/                   ProjectHeader, ProjectShowcase, ProjectNav
│  ├─ showcase/                  BrowserFrame, AppWindowFrame, ScreenshotPan, Gallery, Lightbox, LiveEmbed
│  ├─ layout/                    Nav, MobileMenu, LanguageSwitcher, HomeLink, Footer, ScrollProgress
│  ├─ seo/                       JSON-LD (Person, CreativeWork)
│  └─ ui/                        Button, Container, Section, Tag, Reveal, RevealGrid
├─ lib/                          cn, fonts, site (helper de metadataBase/hreflang), use-reveal-pending
└─ types/content.ts              El tipo bilingüe `L<T>` y la forma de Project/CaseStudy
```

`docs/PLAN.md` es el documento de diseño original — arquitectura, plan por fases, criterios de verificación. A esta altura es histórico (las 8 fases están terminadas), pero sigue siendo la explicación más completa del *por qué* de cada decisión.

---

## Ruteo bilingüe

`/es/...` y `/en/...` son rutas reales, no un cambio de idioma en el cliente. `/` redirige a `/es` vía `next.config.ts` (se resuelve en el CDN, sin middleware). Cada página se prerenderiza en los dos idiomas con `generateStaticParams` + `dynamicParams = false`.

**Los idiomas se mantienen sincronizados por tipos.** `en.ts` está anotado con el tipo derivado de `es.ts`: una clave faltante en inglés es un error de compilación, no un bug silencioso — correr `npx tsc --noEmit` antes de cada push. La misma disciplina aplica a `src/content/projects.ts`: todo campo que debe ser bilingüe usa el tipo `L<T>` (`{ es: string; en: string }`), así que olvidar una traducción rompe el build en vez de publicar contenido a medio traducir.

---

## Sistema de showcase

La grilla del home nunca embebe un iframe en vivo — cuatro cargas de terceros en la página de entrada arruinarían el punto de tener un portafolio rápido, y un viewport móvil aplastado dentro de una tarjeta es ilegible. En su lugar:

- **`ScreenshotPan`** — una captura de página completa dentro de un marco de navegador que se recorre sola al pasar el mouse, con container queries CSS (`translateY(calc(-100% + 100cqh))`), sin que JS mida nada. Un botón replica el gesto para táctil y teclado.
- **`Gallery` + `Lightbox`** — para lo que no tiene una URL visitable (una app autenticada, una app de escritorio): una imagen póster que abre un lightbox navegable por teclado, con un focus trap real.
- **`AppWindowFrame`** vs **`BrowserFrame`** — una barra de título de escritorio sin pastilla de URL comunica "esto no es una web" de un vistazo (se usa para la app de escritorio en PyQt6).
- **`LiveEmbed`** — el sitio real en vivo, cargado bajo demanda dentro de un iframe escalado desde un viewport de 1280px con `ResizeObserver`. Solo en la página de caso de estudio, solo en ≥768px, solo tras un clic explícito — es el momento "wow", no el default.

Las capturas se generan con `scripts/capture.mjs` (`playwright-core` contra el Chrome ya instalado en el sistema, para evitar los ~300MB de descarga de Playwright) y se commitean en `src/assets/`, nunca se generan durante el build — un build no puede depender de que el servidor de un cliente esté arriba.

---

## Efectos de scroll

- **`ScrollProgress`** — una barra de 3px color acento arriba de todo, actualizada con `scaleX` en un `requestAnimationFrame`, sin transición CSS (tiene que seguir la posición real de scroll cuadro a cuadro; una transición siempre la dejaría un paso atrás).
- **`Reveal`** — envuelve el contenido de cada `Section`; aparece con fundido y desplazamiento hacia arriba al entrar en el viewport.
- **`RevealGrid` / `RevealList`** — la misma idea para grillas de tarjetas, pero cada hijo directo tiene su propio `transition-delay` vía `:nth-child` en CSS, así los items entran en cascada en vez de que la grilla entera aparezca como un bloque. Sin div extra por item — esto es justo lo que le permite a `RevealList` renderizar un `<ul>`/`<li>` real sin romper el nesting.
- **`fade-in-up`** — una animación CSS `@keyframes` simple (sin JS, sin depender de scroll) para lo que está sobre el pliegue — el Hero, el header del caso de estudio — así no aparece de golpe apenas termina de cargar la página.

Todo está diseñado alrededor de una restricción: **nada puede quedar permanentemente invisible sin JavaScript.** Los componentes de reveal parten visibles por defecto en el servidor y en el primer render de cliente; recién en un `useLayoutEffect` —que corre antes del primer paint del navegador— deciden si hay algo que ocultar, así nunca hay un cuadro donde contenido visible salte a oculto. `prefers-reduced-motion` no necesita ninguna rama: una sola regla global fuerza `animation-duration`/`transition-duration` a `0.01ms`, y cada uno de estos efectos la hereda automáticamente.

---

## SEO y accesibilidad

- `generateMetadata` por ruta con `metadataBase`, plantilla de título, canonical + `hreflang` (`es-CO` / `en` / `x-default`), tarjetas de Open Graph y Twitter.
- Imágenes OG por proyecto generadas en build con `next/og` — sin descargar fuentes externas, para que el build nunca dependa de una red de terceros para una imagen.
- JSON-LD de `Person` y `CreativeWork`.
- `sitemap.xml` con alternativas de idioma, `robots.txt`.
- Verificado con `axe-core` en todas las páginas, en dos tamaños de viewport, después de scrollear para revelar todo el contenido diferido: **0 violaciones**.
- Pasada completa de teclado: anillos de foco visibles, orden de tabulación correcto, un focus trap real en el lightbox (incluida la región scrolleable de la imagen — una captura de 4000px de alto solo se puede leer con teclado si esa región misma puede recibir foco).

---

## Reglas de contenido

**No se inventan datos.** Todo lo que está en `src/content/projects.ts` es verificable contra los repos, los sitios en vivo o el CV. Lo que solo Juan Pablo puede aportar va en el array `pending[]` de cada proyecto, que se renderiza como una nota ámbar solo-dev — visible en `npm run dev`, ausente en producción (`PendingNote.tsx` chequea `NODE_ENV`).

El campo `role` de cada proyecto declara el alcance real del trabajo — desarrollo completo, solo backend, "landing hecho solo, diseño entregado por otra persona" — a propósito, para que el portafolio ni infle ni subestime lo que efectivamente se hizo.

---

## Detalles no obvios

**`grid-bg` usa `mask-image`, que enmascara el elemento *y* su contenido.** Siempre va en una capa absoluta vacía detrás del contenido, nunca en el contenedor propio de la sección — si no, el texto se desvanece junto con la rejilla.

**El `transition-delay` de la cascada de las grillas vive en la regla *sin* prefijo, no en la `-pending`.** Una transición CSS toma su `transition-delay` del estado final (nuevo), no del inicial — definirlo solo bajo `.reveal-grid-pending` lo pierde justo en el momento en que se quita esa clase para revelar.

**El `not-found.tsx` de la raíz no puede declarar su propio `<html>`.** Con `dynamicParams = false`, una ruta que no matchea nunca entra al segmento `[lang]`, así que Next genera un layout raíz por defecto para `/_not-found` — anidar otro `<html>` adentro produciría dos. `lang` y `<title>` se ponen del lado del cliente, en `NotFoundContent`, que también deduce el idioma del primer segmento de la URL.

---

## Verificación

```bash
npm run dev           # / debe redirigir a /es
npx tsc --noEmit       # falla si a en.ts (o a cualquier campo bilingüe) le falta una clave
npm run build          # las 25 rutas deben salir estáticas, sin marcas ƒ
```
