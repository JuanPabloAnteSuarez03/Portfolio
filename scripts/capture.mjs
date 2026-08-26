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
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

/** Parser mínimo de .env.local — sin dependencias nuevas solo para esto. */
async function loadDotEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  let content;
  try {
    content = await readFile(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

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

/**
 * UNIDENTAL no es un sitio de marketing estático — es una app autenticada.
 * En vez de una captura de página completa, sacamos capturas puntuales de
 * vistas específicas (galería con pie de foto, ver `Preview.mode: "gallery"`
 * en src/types/content.ts).
 *
 * Requiere UNIDENTAL_DEMO_{URL,USER,PASSWORD} en .env.local — es una
 * instancia demo personal, no producción, pero igual no van hardcodeadas
 * en este archivo (que sí se commitea).
 *
 * Nota: en una sesión sin caché, la app dispara una cascada de refetch del
 * catálogo completo (1914 productos) que satura el backend gratuito de
 * Render y deja "Cargando..." colgado en listas secundarias (clientes,
 * proveedores) hasta que esa cascada termina — de ahí las esperas largas.
 */
async function captureUnidentalGallery(browser) {
  const { UNIDENTAL_DEMO_URL, UNIDENTAL_DEMO_USER, UNIDENTAL_DEMO_PASSWORD } = process.env;
  if (!UNIDENTAL_DEMO_URL || !UNIDENTAL_DEMO_USER || !UNIDENTAL_DEMO_PASSWORD) {
    console.error(
      "→ unidental: faltan UNIDENTAL_DEMO_URL/USER/PASSWORD en .env.local — salto este target.",
    );
    return;
  }

  const outDir = path.join(ASSETS_DIR, "unidental");
  await mkdir(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE_FACTOR,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  console.log(`→ unidental: iniciando sesión en ${UNIDENTAL_DEMO_URL}`);
  await page.goto(UNIDENTAL_DEMO_URL, { waitUntil: "networkidle", timeout: 60_000 });
  await page.fill("#username", UNIDENTAL_DEMO_USER);
  await page.fill("#password", UNIDENTAL_DEMO_PASSWORD);
  await page.click("text=Ingresar");
  await page.waitForTimeout(15_000); // cold start del backend en Render (plan gratuito)

  // alertas-vencimiento primero: es liviana y no compite por backend con la
  // cascada pesada de refetch que dispara /inventario (ver nota arriba).
  await page.goto(new URL("/inventario/alertas-vencimiento", UNIDENTAL_DEMO_URL).href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page
    .waitForFunction(
      () =>
        !document.body.innerText.includes("Cargando datos") &&
        !document.body.innerText.includes("Cargando configuración"),
      { timeout: 45_000 },
    )
    .catch(() => console.log("  (timeout esperando alertas-vencimiento, sigo igual)"));
  await page.waitForTimeout(1_500);
  await page.screenshot({
    path: path.join(outDir, "alertas-vencimiento.png"),
    fullPage: true,
  });
  console.log("  ✓ alertas-vencimiento.png");

  await page.goto(new URL("/inventario", UNIDENTAL_DEMO_URL).href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  console.log("  esperando a que se asiente la cascada de refetch del catálogo...");
  await page
    .waitForFunction(
      () =>
        !document.body.innerText.includes("Cargando precios de compra") &&
        !document.body.innerText.includes("Actualizando información de stock"),
      { timeout: 90_000 },
    )
    .catch(() => console.log("  (timeout esperando, sigo igual)"));
  await page.waitForTimeout(2_000);

  await page.screenshot({ path: path.join(outDir, "inventario.png"), fullPage: true });
  console.log("  ✓ inventario.png");

  await page.goto(new URL("/ventas", UNIDENTAL_DEMO_URL).href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(2_000);
  await page.click("text=Sede Norte");
  await page.waitForTimeout(1_500);
  await page.fill('input[placeholder*="Buscar producto"]', "SUPER ETCH");
  await page.waitForTimeout(2_500);
  await page.click("text=Acido desmineralizante SUPER ETCH SDI 12 gm");
  await page.waitForTimeout(2_000);
  await page.click("text=Manual"); // el override manual es lo que vale la pena mostrar
  await page.waitForTimeout(1_500);
  await page.evaluate(() => {
    const el = [...document.querySelectorAll("*")].find(
      (e) => e.textContent?.trim() === "Control de Lotes Activo",
    );
    el?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "venta-fifo.png") });
  console.log("  ✓ venta-fifo.png");

  // "Comparar Proveedores" no tiene datos usables en este demo: de 100
  // productos con precio de compra cargado, ninguno tiene más de un
  // proveedor (confirmado vía API). "Ver tabla de precios" sí muestra
  // datos reales, así que es la vista honesta para este highlight.
  await page.goto(new URL("/compras/analisis-precios", UNIDENTAL_DEMO_URL).href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.click("text=Ver tabla de precios").catch(() => {});
  await page.waitForTimeout(6_000);
  await page.screenshot({
    path: path.join(outDir, "precios-proveedores.png"),
    fullPage: true,
  });
  console.log("  ✓ precios-proveedores.png");

  await page.goto(new URL("/caja", UNIDENTAL_DEMO_URL).href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page
    .waitForFunction(() => !document.body.innerText.includes("Verificando autenticación"), {
      timeout: 60_000,
    })
    .catch(() => console.log("  (timeout esperando auth en /caja, sigo igual)"));
  await page
    .waitForFunction(() => !document.body.innerText.includes("Cargando datos de caja"), {
      timeout: 30_000,
    })
    .catch(() => console.log("  (timeout esperando datos de caja, sigo igual)"));
  await page.waitForTimeout(1_500);
  await page.screenshot({ path: path.join(outDir, "caja.png"), fullPage: true });
  console.log("  ✓ caja.png");

  await context.close();
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

  // Si el screenshot cae a mitad del font-swap de una tipografía custom, el
  // texto se reacomoda (a veces a más líneas) después de haber calculado su
  // posición — en Camer eso hizo que el título se montara sobre el nav.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

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

const ALL_SLUGS = [...targets.map((t) => t.slug), "unidental"];

async function main() {
  await loadDotEnvLocal();

  const requested = process.argv.slice(2);
  const wanted = requested.length ? requested : ALL_SLUGS;

  const unknown = wanted.filter((s) => !ALL_SLUGS.includes(s));
  if (unknown.length > 0) {
    console.error(`No hay targets que coincidan con: ${unknown.join(", ")}\nDisponibles: ${ALL_SLUGS.join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({
    executablePath: CHROME_EXECUTABLE,
    headless: true,
  });

  try {
    for (const target of targets) {
      if (wanted.includes(target.slug)) await captureTarget(browser, target);
    }
    if (wanted.includes("unidental")) await captureUnidentalGallery(browser);
  } finally {
    await browser.close();
  }

  console.log(`\nListo. Revisa src/assets/<slug>/ antes de importarlas en projects.ts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
