# Portafolio — Juan Pablo Ante Suárez

## Contexto

Juan Pablo es estudiante de décimo semestre de Ingeniería de Sistemas (Univalle, graduación diciembre 2026) y desarrollador freelance desde 2024. Hoy su trabajo solo existe como repositorios sueltos en GitHub y un CV en Word: no hay un lugar que muestre **qué construyó, para quién y por qué lo resolvió así**. Eso importa ahora porque está a un año de graduarse y buscando oportunidades — incluidas internacionales (ya trabajó para un cliente en Canadá).

El objetivo es un portafolio bilingüe, desplegado en Vercel, donde cada proyecto tenga su propio caso de estudio y una forma **atractiva** de ver el resultado real — su queja explícita fue que "un link a la página" se siente pobre.

**Restricción central de honestidad:** su rol fue distinto en cada proyecto. El portafolio debe reflejarlo con precisión — ni inflado ni subestimado. No se inventan métricas.

---

## Los 4 proyectos y su encuadre real

| # | Proyecto | Qué es | Su rol real (confirmado por él) |
|---|---|---|---|
| 01 | **UNIDENTAL** | ERP de inventario/ventas para empresa de insumos dentales. Django 5.2 + DRF + PostgreSQL / React 19 + Vite + Tailwind. Multi-sede, lotes FIFO, alertas de vencimiento, órdenes de compra, créditos, caja, reportes. | **Backend completo**, más gran parte del frontend implementado junto a un compañero. |
| 02 | **Presupuestos de Obra** (Tesis Paula Cadena) | App de **escritorio PyQt6** (MVC) para presupuestos de obra civil: extrae análisis unitarios del PDF del Decreto 1276/2021 de la Gobernación (tabula-py/pdfminer/PyPDF2), modela en PostgreSQL vía SQLAlchemy, y exporta presupuestos a Excel (openpyxl). Feb–Oct 2025. | **Desarrollo completo**, construido iterativamente con la clienta durante ~1 año. Trabajo remunerado. **Resultado real: tesis aprobada, la clienta se graduó de su posgrado.** |
| 03 | **ECK** | Landing page para empresa de karting en Canadá. React (CRA) + API serverless Node para formulario de contacto. Vercel. | **Desarrollo prácticamente completo del landing.** Requerimientos y comunicación con el cliente los llevó un compañero. |
| 04 | **Camer** (Diego Cadena Ingeniería S.A.S) | Sitio corporativo para firma de perforación horizontal dirigida. HTML/CSS/JS + Bootstrap 5.3, AOS/Swiper/Isotope, PHP 8 + PHPMailer, SEO con Schema.org + sitemap. En producción en diegocadenaingenieria.com. | **Desarrollo completo del sitio, él solo.** Una diseñadora gráfica entregó el diseño en Illustrator y él lo maquetó pixel-perfect e implementó backend de contacto, SEO y despliegue. El tercer crédito del README (Juan Camilo) le cedió el encargo, no desarrolló. |

Orden deliberado: UNIDENTAL y la tesis van primero porque son los de mayor profundidad técnica. Camer va último por ser el de menor complejidad técnica, no por el rol — ahí trabajó solo, y el crédito compartido del README refleja quién le pasó el encargo y quién diseñó, no quién programó.

**Nota de encuadre para Camer:** "maquetar un diseño ajeno" se cuenta como una fortaleza, no como una disculpa — fidelidad al diseño, SEO estructurado (Schema.org, sitemap, robots), formulario funcional en PHP y un sitio en producción con dominio propio. Trabajar bien contra el archivo de una diseñadora es exactamente lo que se espera en un equipo real.

Debajo, una lista compacta de "Otros proyectos" enlazando Interspeaker, Monetra, IARecetas y Secop-Diego-Cadena, sin caso de estudio.

---

## Decisiones ya tomadas

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4. Node v26 y Chrome ya están instalados localmente.
- **Estilo:** oscuro/techie, metáfora de terminal (`~/juanpablo` en el nav).
- **Acento:** verde lima `#a3e635` — verificado **12.88:1** sobre el fondo `#0d0d0f` y **13.93:1** con texto negro encima.
- **Idioma:** bilingüe ES/EN. Español por defecto.
- **Deploy:** Vercel, subdominio gratis `juanpabloante.vercel.app`.

---

## Arquitectura

### Rutas bilingües: segmento `/[lang]`, no contexto de cliente

`/es/...` y `/en/...` como rutas reales, con `/` → `/es` vía `redirects()` en `next.config.ts` (sin middleware, se resuelve en el CDN).

**Por qué:** poder mandarle a un reclutador canadiense `/en/projects/eck` y que abra en inglés *es el punto entero* de ser bilingüe. Un contexto de cliente da una sola URL, indexa un solo idioma y produce parpadeo de hidratación. Con `generateStaticParams` + `dynamicParams = false` todo el sitio se prerenderiza estático.

Los segmentos de ruta quedan en inglés (`/es/projects/eck`) — localizarlos exige carpetas duplicadas para una ganancia SEO despreciable en 4 páginas.

### Contenido tipado y sincronizado entre idiomas

`src/content/projects.ts` con datos, no JSX. El truco de sincronización: `en.ts` importa el tipo derivado de `es.ts`, así **una clave faltante en inglés es un error de compilación**, no un bug silencioso.

```ts
export type L<T> = Record<'es' | 'en', T>;

export type Decision = {
  title: L<string>;
  body: L<string>;
  tradeoff?: L<string>;   // "elegí X sobre Y porque…" — esto es lo que lo hace leer senior
};

export type Project = {
  slug: 'unidental' | 'presupuestos' | 'eck' | 'camer';
  name: string;                 // marca, nunca se traduce
  client: L<string>;
  period: string;
  role: L<string>;              // el encuadre honesto de la tabla de arriba
  team?: L<string>;
  tagline: L<string>;           // ≤70 chars, va en la card
  highlights: L<string[]>;
  stack: Tech[];
  links: ProjectLink[];
  media: Media;                 // imports estáticos → dimensiones + blur automáticos
  preview: Preview;             // 'pan' | 'gallery' | 'app-window'
  caseStudy: CaseStudy;         // contexto → problema → solución → decisiones → resultados
  pending?: string[];           // TODOs visibles solo en dev
};
```

Los diccionarios se consumen **solo en componentes de servidor**; los de cliente reciben las 2–5 cadenas que necesitan como props. Así ningún diccionario viaja al navegador.

### Sistema de diseño (Tailwind v4 usa `@theme` en CSS, ya no `tailwind.config.ts`)

| Token | Hex | Contraste vs fondo | Uso |
|---|---|---|---|
| `bg` | `#0d0d0f` | — | fondo |
| `surface` | `#131316` | — | cards |
| `border` | `#26262c` | — | hairlines |
| `fg` | `#e8e8ec` | 15.89 | texto |
| `fg-muted` | `#a1a1ac` | 7.59 | secundario |
| `fg-dim` | `#71717a` | 4.02 | ⚠ solo decorativo, nunca texto real |
| **`accent`** | **`#a3e635`** | **12.88** | prompt, índices de sección, focus ring, CTA |
| `accent-strong` | `#65a30d` | 6.29 | hover de CTA |
| `cyan` | `#22d3ee` | 10.74 | acento secundario: enlaces, badge "en vivo" |

**Regla de disciplina:** el neón ocupa como máximo ~5% del viewport — glifo del prompt, índice de sección (`01 —`), anillo de foco, un CTA. Verde lima en bloques grandes sobre negro cansa la vista.

Tipografías vía `next/font/google` (auto-hospedadas, sin request a terceros, sin CLS): **Space Grotesk** para títulos, **Inter** para cuerpo, **JetBrains Mono** para el prompt, tags de tecnología, URLs e índices.

---

## La solución al problema que él planteó: cómo mostrar cada proyecto

Verifiqué que los tres sitios en vivo **no envían `X-Frame-Options` ni CSP restrictiva** — el iframe es técnicamente posible. Aun así, la recomendación es un híbrido:

**En la grilla del home → solo capturas. Nunca un iframe.**
Cuatro embeds serían 4 cargas de terceros (1–3 MB y JS ajeno en el hilo principal): el portafolio se sentiría lento, que es exactamente el mensaje contrario. Además en móvil un iframe muestra el layout móvil del sitio aplastado dentro de una card, ilegible. Y si un cliente rediseña o se cae, el portafolio se rompe solo. La captura es un artefacto estable **de su trabajo, en el momento en que lo entregó**.

**El componente central — `ScreenshotPan`:** una captura de página completa dentro de un marco de navegador, que **se recorre sola al pasar el mouse**, revelando el sitio entero en 6–9 segundos. El truco es puro CSS con container queries:

```
translateY(calc(-100% + 100cqh))
```

`100cqh` es el alto del marco y `-100%` el alto propio de la imagen, así el paneo llega exacto al final **sin medir nada en JS**, para cualquier altura de captura.

| Situación | Comportamiento |
|---|---|
| Mouse (`@media (hover:hover) and (pointer:fine)`) | recorre al pasar encima, vuelve al soltar |
| Táctil | sin hover; un botón **"Recorrer"** en el marco lo activa |
| Teclado | ese mismo botón es un `<button aria-pressed>` real |
| `prefers-reduced-motion` | salta entre inicio y final sin animar |

La regla de hover va dentro de `@media (hover:hover)` en CSS, no con el `hover:` de Tailwind — este último se dispara al mantener pulsado en táctil y deja las cards trabadas a media animación.

**Tres variantes de marco** (este detalle es el que hace que el portafolio se sienta cuidado):
- `BrowserFrame` — tres puntos + pastilla mono con la URL + badge "en vivo" → ECK, Camer, UNIDENTAL.
- `AppWindowFrame` — barra de título de aplicación de escritorio, sin URL → **Presupuestos de Obra (PyQt6)**. Comunica de inmediato "esto no es una web, es software de escritorio".
- `Gallery` + `Lightbox` — capturas con pie de foto → pantallas autenticadas de UNIDENTAL.

**El iframe en vivo sí aparece, pero solo en la página de detalle**, detrás de un botón explícito ("Cargar sitio en vivo · ~1.5 MB"), solo en ≥768px, escalado con `ResizeObserver` desde un viewport de 1280px. Es el momento "wow", y para entonces el visitante ya optó por él. El CTA "Ver en vivo ↗" siempre está presente como camino principal.

**Capturas — `scripts/capture.mjs`**, ejecutado a mano con `npm run capture`, **nunca durante el build** (el build no puede depender de que el servidor de un cliente esté arriba). Usa `playwright-core` + el Chrome ya instalado (evita descargar 300 MB de binarios).

Detalle crítico que descubrí: **el sitio de Camer usa AOS**, que deja las secciones en `opacity:0` hasta que se hace scroll — una captura ingenua saldría medio vacía. El script inyecta CSS que neutraliza AOS/Swiper y hace scroll programático para materializar todo antes de disparar.

Las imágenes finales van commiteadas en `src/assets/` e importadas estáticamente (no en `public/`): así Next obtiene dimensiones y `blurDataURL` automáticos → **CLS cero**.

**UNIDENTAL** está detrás de login, así que va como galería de 5–6 capturas autenticadas que él proveerá, cada una con un pie que nombre la parte difícil ("Selección FIFO por lote con override manual", "Comparación de proveedores"), más el Swagger de la API como evidencia técnica.

**Presupuestos de Obra** no está desplegado en ningún lado: capturas de la app PyQt6 corriendo, dentro del `AppWindowFrame`, más el flujo PDF → base de datos → Excel explicado visualmente.

---

## Estructura de la página de detalle

Header (nombre, cliente, **rol**, período, equipo, stack, enlaces) → Showcase → `01 Contexto` → `02 Problema` → `03 Solución` → `04 Decisiones técnicas` → `05 Resultados` → `06 Aprendizajes` (opcional) → anterior/siguiente.

**`04 Decisiones técnicas` es la sección que separa un portafolio de una lista de links.** Cada decisión lleva una línea explícita de *trade-off*: por qué eligió X sobre Y. Ejemplos que ya se sostienen con lo verificado:
- *"Django + DRF sobre Node porque el modelo de inventario es fuertemente relacional y el admin de Django cubrió el CRUD de catálogo desde el día uno."*
- *"FIFO automático con override manual, porque el mostrador necesita romper la regla cuando el cliente pide un lote específico."*
- *"PyQt6 de escritorio en vez de web, porque la herramienta debía funcionar sin internet y leer archivos locales del cliente."* ← **confirmar con él**
- *"PHP + PHPMailer en lugar de un servicio externo porque el hosting del cliente ya lo soportaba y evitaba un costo mensual."*

**Contenido que solo él puede aportar.** No se inventan datos: cualquier campo desconocido entra en `pending[]` y se renderiza como una nota ámbar punteada **visible solo en `npm run dev`**, omitida en producción. Así ve sus pendientes mientras trabaja sin riesgo de publicarlos.

---

## Plan de trabajo por fases

**Fase 0 — Fundación (½ día).** Copiar este plan a `docs/PLAN.md` dentro del proyecto (ver "Persistencia" abajo). Mover el CV a `public/cv/` (el scaffolder de Next rechaza carpetas no vacías), scaffold, `git init`, tokens de color en `globals.css`, fuentes, primitivos de UI. **Desplegar el cascarón vacío a Vercel de inmediato** para que la URL exista y todo push siguiente sea previsualizable.

**Fase 1 — Sesión de contenido (contigo).** Me explicas cada proyecto — cómo se construyó, qué fue lo difícil, qué decidiste y por qué — y yo destilo qué es relevante. Todo lo derivable de los repos, sitios en vivo y CV ya lo escribo yo antes de esta sesión, así solo llenamos los huecos reales.

**Fase 2 — Rutas + i18n (½ día).** `[lang]`, diccionarios, `Nav` con el prompt `~/juanpablo`, selector de idioma, `Footer`. *Resultado visible: cascarón bilingüe navegable.*

**Fase 3 — Home estático (1 día).** Hero, Stack, Sobre mí, Contacto — con contenido real del CV. Cards con imagen fija, sin interacción todavía. *Resultado visible: one-pager honesto y ya compartible.*

**Fase 4 — Capturas (½ día).** `scripts/capture.mjs` contra ECK y Camer; capturas manuales de UNIDENTAL (con tu login) y de la app PyQt6; optimizar y commitear.

**Fase 5 — Showcase (1 día).** `BrowserFrame`, `AppWindowFrame`, `ScreenshotPan`, `Gallery`, `Lightbox`. *Resultado visible: ahora sí parece un portafolio.*

**Fase 6 — Páginas de detalle (1½ días).** Los 4 casos de estudio completos en español, `LiveEmbed` para ECK y Camer.

**Fase 7 — SEO y accesibilidad (½ día).** `generateMetadata` con `hreflang`, imágenes OG generadas por proyecto con `ImageResponse`, JSON-LD `Person`, sitemap, robots, pasada con axe y teclado.

**Fase 8 — Inglés y lanzamiento (½ día).** Completar `en.ts` (TypeScript lista cada hueco), revisar, desplegar.

≈ 6 días de trabajo enfocado. **Hay algo presentable desde la Fase 3.**

---

## Archivos críticos

- `src/content/projects.ts` — los 4 proyectos, bilingües y tipados
- `src/app/globals.css` — tokens del sistema de diseño (`@theme` de Tailwind v4)
- `src/components/showcase/ScreenshotPan.tsx` — el paneo por container queries
- `src/components/showcase/{BrowserFrame,AppWindowFrame}.tsx` — las variantes de marco
- `src/app/[lang]/projects/[slug]/page.tsx` — la página de caso de estudio
- `scripts/capture.mjs` — pipeline de capturas (con el fix de AOS)

## Verificación

```fish
npm run dev          # / debe redirigir a /es
npx tsc --noEmit     # aquí falla si a en.ts le falta una clave — correr antes de cada push
npm run build        # las 10 rutas (2 idiomas × 5 páginas) deben salir prerenderizadas, sin marcas ƒ
```

- Ver código fuente de `/en/projects/unidental`: el texto en inglés debe estar en el HTML (prueba que es estático, no intercambio en cliente) y `<html lang="en">`.
- Paneo con mouse en escritorio; botón "Recorrer" en un teléfono real; con "reducir movimiento" activo del sistema, nada se anima.
- Lighthouse móvil en incógnito: Performance ≥95, Accesibilidad 100, SEO 100, CLS 0.
- Pegar `/es/projects/camer` en WhatsApp → debe salir la previsualización OG correcta.
- Tabular por toda la página: el anillo de foco lima visible en todo momento.

## Persistencia entre sesiones

Este plan queda guardado en **tres** lugares, para que ninguna sesión futura tenga que reconstruirlo:

1. `/home/jpant/.claude/plans/linear-nibbling-lerdorf.md` — donde vive ahora (nombre autogenerado, poco memorable).
2. **`docs/PLAN.md` dentro del proyecto** — la copia canónica, commiteada a git en la Fase 0. Es la que importa: viaja con el repo y cualquier sesión de Claude Code abierta en esta carpeta la encuentra sola.
3. Una nota en la memoria del proyecto que apunta a `docs/PLAN.md`, para que se recuerde de entrada en sesiones nuevas.

A medida que avancemos, `docs/PLAN.md` se va marcando con las fases completadas — así funciona también como registro de progreso, no solo como plan inicial.

## Extra fuera de alcance, recomendado

El proyecto de tesis **también debería entrar al CV** — un año de trabajo remunerado con un resultado verificable (tesis aprobada, clienta graduada) es más fuerte que varios de los bullets actuales. Es una edición de 5 minutos al `.docx` que ya actualizamos.
