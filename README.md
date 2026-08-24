# Portafolio — Juan Pablo Ante Suárez

Portafolio personal bilingüe (ES/EN). Next.js 16 (App Router) + TypeScript + Tailwind v4.

El plan completo del proyecto está en **[`docs/PLAN.md`](docs/PLAN.md)** — arquitectura,
decisiones, fases y criterios de verificación. Es la referencia canónica.

## Desarrollo

```bash
npm run dev          # http://localhost:3000 — `/` redirige a `/es`
npm run build        # las rutas de ambos idiomas deben salir prerenderizadas
npm run start        # sirve el build de producción
npx tsc --noEmit     # correr antes de cada push (ver más abajo)
```

## Cómo está organizado

| Ruta | Qué contiene |
|---|---|
| `src/content/projects.ts` | Los 4 proyectos, bilingües y tipados. **Aquí se edita el contenido.** |
| `src/content/profile.ts` | Datos personales, formación, contacto |
| `src/i18n/dictionaries/` | Cadenas de interfaz en `es.ts` y `en.ts` |
| `src/app/[lang]/` | Rutas. `[lang]/layout.tsx` es el layout raíz del sitio |
| `src/app/globals.css` | Tokens del sistema de diseño (Tailwind v4 usa `@theme`, no `tailwind.config.ts`) |

## Dos cosas que conviene saber antes de tocar el código

**1. Los idiomas se mantienen sincronizados por tipos.**
`en.ts` está anotado con el tipo derivado de `es.ts`. Si agregas una clave en español
y olvidas el inglés, `npx tsc --noEmit` falla. Por eso conviene correrlo antes de cada push.

**2. `grid-bg` usa `mask-image`, que enmascara el elemento *y su contenido*.**
Siempre va en una capa absoluta vacía detrás del contenido, nunca en el contenedor
de la sección — si no, el texto se desvanece junto con la rejilla.

## Contenido pendiente

Los proyectos tienen un campo `pending[]` con los datos que solo Juan Pablo puede
aportar. Se renderizan como una nota ámbar **visible únicamente en `npm run dev`**,
nunca en producción. La regla del archivo de contenido: no se inventan datos.

## Paleta

Fondo `#0d0d0f`, acento lima `#a3e635` (12.88:1 sobre el fondo, 13.93:1 con texto negro
encima). El acento ocupa como máximo ~5% del viewport: prompt, índice de sección,
anillo de foco y un CTA.
