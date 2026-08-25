#!/usr/bin/env node
/**
 * Captura páginas en vivo para el showcase del portafolio.
 *
 * Corre a mano (`npm run capture`), nunca durante el build: el build no
 * puede depender de que el servidor de un cliente esté arriba.
 *
 * Usa playwright-core contra el Chrome ya instalado en el sistema, para no
 * descargar los ~300 MB de binarios de Playwright.
 *
 * Salida por proyecto, en src/assets/<slug>/:
 *  - desktop-full.png  → página completa, usada por el paneo (ScreenshotPan)
 *  - hero.png           → recorte 16:10 superior, para card / OG / fallback estático
 */
import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

const VIEWPORT = { width: 1280, height: 800 };
const SCALE_FACTOR = 2;
const HERO_ASPECT = 16 / 10;

const CHROME_EXECUTABLE = "/usr/bin/google-chrome-stable";

/** Neutraliza AOS: lo hace innecesario forzar scroll para revelar secciones. */
async function neutralizeAos(page) {
  await page.addStyleTag({
    content: `
      [data-aos] {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }
    `,
  });
}

/**
 * Baja hasta el fondo y vuelve arriba para materializar contenido lazy
 * (imágenes, Swiper, observers de scroll). Termina en (0,0) a propósito:
 * un `fullPage` screenshot con el scroll a mitad de página descoloca los
 * elementos `position: sticky/fixed` (el header queda "flotando" donde
 * estaba el scroll en vez de quedarse arriba).
 */
async function materializeLazyContent(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

/**
 * Los iframes cross-origin (YouTube, mapas de Google, Twitter/X) solo pintan
 * su contenido si están efectivamente visibles en el momento exacto de la
 * captura — Chromium descompone el compositing de lo que queda fuera de
 * viewport. Como el screenshot de página completa se toma con el scroll en
 * (0,0) (ver `materializeLazyContent`), cualquier iframe fuera del primer
 * viewport sale en negro ahí.
 *
 * La solución: capturar cada iframe por separado con `elementHandle.screenshot()`
 * (que Playwright resuelve haciendo scroll internamente y sin tocar el
 * scroll de la página para el resto), y componerlos encima de la captura
 * completa en su posición real dentro del documento.
 */
async function captureEmbeddedFrames(page) {
  const iframes = await page.$$("iframe[src]");
  const patches = [];

  for (const iframe of iframes) {
    // Filtra antes de tocar nada: widgets ocultos (p. ej. Twitter/X sin
    // inicializar) no tienen tamaño, y `scrollIntoViewIfNeeded` se queda
    // esperando indefinidamente a que un elemento invisible "se vuelva visible".
    const initialBox = await iframe.boundingBox();
    if (!initialBox || initialBox.width === 0 || initialBox.height === 0) continue;

    // Algunos embeds (mapas de Google) se redimensionan por JS después del
    // layout inicial — hay que dejar que se asiente antes de medir, si no
    // el bounding box queda con el tamaño chico de la primera pasada.
    await iframe.scrollIntoViewIfNeeded({ timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(500);

    const box = await iframe.boundingBox();
    if (!box || box.width === 0 || box.height === 0) continue;

    // boundingBox() es relativo al viewport actual, no al documento —
    // sumamos el scroll vigente (que puede haber cambiado por el iframe
    // capturado en la iteración anterior) para anclar el parche al lugar
    // correcto dentro de la imagen de página completa.
    const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));

    const frame = await iframe.contentFrame();
    if (frame) await frame.waitForLoadState("load", { timeout: 8_000 }).catch(() => {});
    await page.waitForTimeout(2_500); // margen para que pinte tiles/miniatura

    const buffer = await iframe.screenshot();
    patches.push({
      input: buffer,
      left: Math.round((box.x + scroll.x) * SCALE_FACTOR),
      top: Math.round((box.y + scroll.y) * SCALE_FACTOR),
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  return patches;
}

const targets = [
  {
    slug: "eck",
    url: "https://eck-6c79.vercel.app",
    prep: async (page) => {
      await materializeLazyContent(page);
    },
  },
  {
    slug: "camer",
    url: "https://diegocadenaingenieria.com/",
    prep: async (page) => {
      await neutralizeAos(page);
      await materializeLazyContent(page);
      // Segunda pasada: algunos elementos AOS solo se marcan visibles al
      // cruzar el viewport durante el scroll real, no solo por CSS.
      await neutralizeAos(page);
    },
  },
];

async function captureTarget(browser, target) {
  const outDir = path.join(ASSETS_DIR, target.slug);
  await mkdir(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE_FACTOR,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  console.log(`→ ${target.slug}: cargando ${target.url}`);
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 60_000 });

  if (target.prep) await target.prep(page);

  const baseBuffer = await page.screenshot({ fullPage: true });
  const patches = await captureEmbeddedFrames(page);

  const fullPath = path.join(outDir, "desktop-full.png");
  if (patches.length > 0) {
    await sharp(baseBuffer).composite(patches).toFile(fullPath);
    console.log(`  ✓ desktop-full.png (${patches.length} iframe(s) compuesto(s))`);
  } else {
    await sharp(baseBuffer).toFile(fullPath);
    console.log(`  ✓ desktop-full.png`);
  }

  const heroPath = path.join(outDir, "hero.png");
  const heroWidthPx = VIEWPORT.width * SCALE_FACTOR;
  const heroHeightPx = Math.round(heroWidthPx / HERO_ASPECT);
  await sharp(fullPath)
    .extract({ left: 0, top: 0, width: heroWidthPx, height: heroHeightPx })
    .toFile(heroPath);
  console.log(`  ✓ hero.png`);

  await context.close();
}

async function main() {
  const requested = process.argv.slice(2);
  const selected = requested.length
    ? targets.filter((t) => requested.includes(t.slug))
    : targets;

  if (selected.length === 0) {
    console.error(
      `No hay targets que coincidan con: ${requested.join(", ")}\nDisponibles: ${targets.map((t) => t.slug).join(", ")}`,
    );
    process.exit(1);
  }

  const browser = await chromium.launch({
    executablePath: CHROME_EXECUTABLE,
    headless: true,
  });

  try {
    for (const target of selected) {
      await captureTarget(browser, target);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nListo. Revisa src/assets/<slug>/ antes de importarlas en projects.ts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
