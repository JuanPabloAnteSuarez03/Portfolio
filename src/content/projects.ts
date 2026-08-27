import type { Project, ProjectSlug, SideProject } from "@/types/content";

import unidentalInventario from "@/assets/unidental/inventario.png";
import unidentalNuevoProducto from "@/assets/unidental/nuevo-producto.png";
import unidentalMovimientosStock from "@/assets/unidental/movimientos-stock.png";
import unidentalRegistrarVenta from "@/assets/unidental/registrar-venta.png";
import unidentalOrdenCompra from "@/assets/unidental/orden-compra.png";
import unidentalAlertasVencimiento from "@/assets/unidental/alertas-vencimiento.png";
import unidentalAlertasStock from "@/assets/unidental/alertas-stock.png";
import unidentalPreciosProveedores from "@/assets/unidental/precios-proveedores.png";
import unidentalCaja from "@/assets/unidental/caja.png";

import presupuestosInicialVacia from "@/assets/app_presupuestos/pantalla-inicial-vacia.png";
import presupuestosInicialAiu from "@/assets/app_presupuestos/pantalla-inicial-presupuesto-aiu.png";
import presupuestosInicial3d from "@/assets/app_presupuestos/pantalla-inicial-presupuesto-aiu-3d.png";
import presupuestosAnalisisUnitario from "@/assets/app_presupuestos/analisis-unitario.png";
import presupuestosAiu from "@/assets/app_presupuestos/aiu.png";
import presupuestosCronograma from "@/assets/app_presupuestos/cronograma.png";
import presupuestosCronogramaTablero from "@/assets/app_presupuestos/cronograma-tablero.png";
import presupuestosControlEvm from "@/assets/app_presupuestos/control-evm.png";
import presupuestosEjecucionCompras from "@/assets/app_presupuestos/ejecucion-gastos-compras.png";
import presupuestosEjecucionNomina from "@/assets/app_presupuestos/ejecucion-gastos-nomina.png";

import eckDesktopFull from "@/assets/eck/desktop-full.png";
import eckHero from "@/assets/eck/hero.png";

import camerDesktopFull from "@/assets/camer/desktop-full.png";
import camerHero from "@/assets/camer/hero.png";

/**
 * REGLA DE ESTE ARCHIVO: no se inventan datos.
 *
 * Todo lo que está escrito aquí es verificable en los repositorios, en los
 * sitios en vivo o en el CV. Lo que solo Juan Pablo sabe va en `pending[]`,
 * que se renderiza como nota ámbar únicamente en `npm run dev`.
 *
 * El orden del array es el orden en que aparecen en el sitio.
 */
export const projects: Project[] = [
  {
    slug: "unidental",
    name: "UNIDENTAL",
    client: {
      es: "Empresa de insumos dentales",
      en: "Dental supplies company",
    },
    period: { es: "2025", en: "2025" },
    role: {
      es: "Backend completo, más gran parte del frontend junto a un compañero",
      en: "Full backend, plus much of the frontend alongside a teammate",
    },
    team: { es: "2 desarrolladores", en: "2 developers" },
    tagline: {
      es: "ERP de inventario y ventas para dos sedes, con control de lotes",
      en: "Inventory and sales ERP for two locations, with batch tracking",
    },
    summary: {
      es: "Un sistema de gestión completo que reemplaza el control manual de inventario: seguimiento de lotes con vencimiento, ventas, órdenes de compra, traslados entre sedes, créditos y caja.",
      en: "A complete management system replacing manual inventory control: batch tracking with expiry, sales, purchase orders, inter-location transfers, credit accounts and cash handling.",
    },
    highlights: {
      es: [
        "Inventario multi-sede con selección FIFO de lotes y override manual",
        "Alertas de vencimiento con umbrales configurables",
        "Jerarquía de precios: sugerido › última venta › última compra › costo",
        "API REST documentada con Swagger y Redoc",
      ],
      en: [
        "Multi-location inventory with FIFO batch selection and manual override",
        "Expiry alerts with configurable thresholds",
        "Pricing hierarchy: suggested › last sale › last purchase › cost",
        "REST API documented with Swagger and Redoc",
      ],
    },
    stack: [
      { name: "Django 5.2", group: "backend" },
      { name: "Django REST Framework", group: "backend" },
      { name: "PostgreSQL", group: "data" },
      { name: "Djoser", group: "backend" },
      { name: "React 19", group: "frontend" },
      { name: "Vite", group: "frontend" },
      { name: "TailwindCSS", group: "frontend" },
      { name: "Jest", group: "testing" },
      { name: "Playwright", group: "testing" },
      { name: "Render", group: "infra" },
      { name: "Vercel", group: "infra" },
    ],
    links: [
      {
        kind: "repo-backend",
        href: "https://github.com/JuanPabloAnteSuarez03/unidental-backend",
        label: { es: "Backend", en: "Backend" },
      },
      {
        kind: "repo-frontend",
        href: "https://github.com/JuanPabloAnteSuarez03/unidental-frontend",
        label: { es: "Frontend", en: "Frontend" },
      },
      {
        kind: "docs",
        href: "https://unidental-backend.onrender.com/swagger/",
        label: { es: "Swagger", en: "Swagger" },
      },
    ],
    media: {
      gallery: [
        {
          src: unidentalInventario,
          caption: {
            es: "Inventario general: 1.914 productos, con filtros por categoría, sede y stock",
            en: "General inventory: 1,914 products, filterable by category, location and stock",
          },
        },
        {
          src: unidentalNuevoProducto,
          caption: {
            es: "Alta de producto nuevo, con generación asistida de SKU",
            en: "New product creation, with assisted SKU generation",
          },
        },
        {
          src: unidentalMovimientosStock,
          caption: {
            es: "Movimientos de stock en lote, con historial filtrable por fecha y ubicación",
            en: "Batch stock movements, with a history filterable by date and location",
          },
        },
        {
          src: unidentalRegistrarVenta,
          caption: {
            es: "Registro de venta: selección de sede, método de pago y facturación opcional",
            en: "Sale registration: location selection, payment method and optional invoicing",
          },
        },
        {
          src: unidentalOrdenCompra,
          caption: {
            es: "Orden de compra a proveedor, con precios y subtotales editables que se recalculan solos",
            en: "Purchase order to a supplier, with editable prices and subtotals that recalculate automatically",
          },
        },
        {
          src: unidentalAlertasVencimiento,
          caption: {
            es: "Alertas de vencimiento por lote, con umbrales configurables por producto",
            en: "Batch expiry alerts, with configurable per-product thresholds",
          },
        },
        {
          src: unidentalAlertasStock,
          caption: {
            es: "Alertas por nivel de stock: crítico, bajo, normal, alto y excesivo",
            en: "Stock-level alerts: critical, low, normal, high and excessive",
          },
        },
        {
          src: unidentalPreciosProveedores,
          caption: {
            es: "Comparación de precios entre proveedores",
            en: "Price comparison across suppliers",
          },
        },
        {
          src: unidentalCaja,
          caption: {
            es: "Cierre de caja",
            en: "End-of-day cash close",
          },
        },
      ],
    },
    preview: { mode: "gallery", frame: "app-window", appTitle: "Unidental" },
    caseStudy: {
      context: {
        es: [
          "UNIDENTAL distribuye insumos dentales desde dos sedes en Cali. Su operación diaria involucra productos con fecha de vencimiento, lo que hace que un error de inventario no sea solo una pérdida contable: es mercancía que se vence antes de venderse.",
        ],
        en: [
          "UNIDENTAL distributes dental supplies from two locations in Cali. Their daily operation involves products with expiry dates, which makes an inventory error more than an accounting loss: it is stock that expires before it sells.",
        ],
      },
      problem: {
        es: [
          "El problema de fondo era que UNIDENTAL no tenía su inventario sistematizado: no existía una base de datos real de la empresa, solo hojas de cálculo de Google Sheets sin relación entre productos, lotes y sedes. Cualquier pregunta — cuánto stock quedaba, en qué sede, de qué lote — dependía de revisar y cruzar esas hojas a mano.",
          "Sobre esa base, sostener el control de vencimientos por lote en dos sedes era prácticamente imposible: sin un sistema que modelara la relación entre productos, lotes y sedes, qué lote despachar quedaba a la memoria del personal, y el costo de un error aparecía tarde, en forma de producto vencido.",
        ],
        en: [
          "The underlying problem was that UNIDENTAL's inventory wasn't systematized at all: there was no real database for the company, only Google Sheets spreadsheets with no relational structure between products, batches and locations. Any question — how much stock was left, at which location, from which batch — meant manually cross-checking those sheets.",
          "On top of that, sustaining batch-level expiry control across two locations was practically impossible: without a system modeling the relationship between products, batches and locations, which batch to dispatch was left to staff memory, and the cost of a mistake showed up late, as expired product.",
        ],
      },
      solution: {
        es: [
          "Construí el backend completo en Django y DRF: catálogo con SKU y lotes, inventario por sede con actualización automática de stock, ventas y devoluciones, compras y proveedores, cuentas por cobrar y pagar, entregas y manejo de caja.",
          "El frontend en React lo implementamos en gran parte junto a un compañero, sobre la API que ya había definido.",
          "Para migrar los datos reales escribí scripts que leían las hojas de Google Sheets del cliente y poblaban la base de datos nueva.",
        ],
        en: [
          "I built the entire backend in Django and DRF: catalog with SKUs and batches, per-location inventory with automatic stock updates, sales and returns, purchases and suppliers, accounts receivable and payable, deliveries and cash management.",
          "We implemented much of the React frontend together with a teammate, on top of the API I had already defined.",
          "To migrate the real data, I wrote scripts that read the client's Google Sheets and populated the new database.",
        ],
      },
      decisions: [
        {
          title: {
            es: "Django y DRF en lugar de Node",
            en: "Django and DRF instead of Node",
          },
          body: {
            es: "El dominio es fuertemente relacional: productos, lotes, sedes, movimientos y créditos se referencian entre sí y necesitan integridad transaccional.",
            en: "The domain is strongly relational: products, batches, locations, movements and credits reference each other and need transactional integrity.",
          },
          tradeoff: {
            es: "El admin de Django fue clave durante el desarrollo: lo usamos internamente para cargar y depurar datos reales antes de que el frontend estuviera listo. Pero como el cliente no es técnico, no podía dársele acceso directo — cada operación que necesitaba terminó teniendo que construirse como interfaz real en el frontend.",
            en: "Django's admin was key during development: we used it internally to load and debug real data before the frontend was ready. But since the client isn't technical, it couldn't be handed to them directly — every operation they needed still had to be built as a real interface in the frontend.",
          },
        },
        {
          title: {
            es: "FIFO automático con override manual",
            en: "Automatic FIFO with manual override",
          },
          body: {
            es: "El sistema selecciona por defecto el lote más próximo a vencer, que es lo correcto para minimizar pérdidas.",
            en: "The system defaults to the batch closest to expiry, which is what minimizes losses.",
          },
          tradeoff: {
            es: "Pero el mostrador necesita romper esa regla cuando el cliente pide un lote específico. Automatizar sin dejar salida habría hecho que el personal buscara la forma de esquivar el sistema.",
            en: "But the counter needs to break that rule when a customer asks for a specific batch. Automating with no escape hatch would have pushed staff to work around the system.",
          },
        },
      ],
      results: {
        es: [
          "El sistema está desplegado: backend en Render, frontend en Vercel, con documentación interactiva de la API en Swagger y Redoc.",
          "Hoy tiene 1.914 productos activos en el catálogo, repartidos en dos sedes.",
        ],
        en: [
          "The system is deployed: backend on Render, frontend on Vercel, with interactive API documentation in Swagger and Redoc.",
          "It currently holds 1,914 active products in the catalog, across two locations.",
        ],
      },
    },
  },

  {
    slug: "presupuestos",
    name: "Presupuestos de Obra",
    client: {
      es: "Paula Cadena — trabajo de posgrado, Universidad del Valle",
      en: "Paula Cadena — postgraduate work, Universidad del Valle",
    },
    period: { es: "Febrero 2025 — Febrero 2026", en: "February 2025 — February 2026" },
    role: {
      es: "Desarrollo completo, construido de forma iterativa con la clienta",
      en: "Full development, built iteratively with the client",
    },
    tagline: {
      es: "App de escritorio que convierte un proyecto de Revit en presupuesto de obra",
      en: "Desktop app that turns a Revit project into a construction budget",
    },
    summary: {
      es: "Una aplicación de escritorio en PyQt6 que automatiza el paso de un proyecto de Revit a un presupuesto de obra civil completo — materiales, mano de obra, impuestos y estampillas incluidos —, cruzando el modelo BIM con los análisis unitarios oficiales del Decreto 1276 de 2021.",
      en: "A PyQt6 desktop application that automates turning a Revit project into a complete civil-works budget — materials, labor, taxes and stamp levies included — by cross-referencing the BIM model with the official unit-price analyses from Decree 1276 of 2021.",
    },
    highlights: {
      es: [
        "Extracción de presupuesto a partir del modelo BIM (IFC) de Revit, con visor 3D optimizado para hardware modesto",
        "Cálculo de AIU (Administración, Imprevistos y Utilidad): impuestos, estampillas y demás cargos, no solo materiales",
        "Extracción de tablas desde el PDF oficial del decreto de precios unitarios",
        "Arquitectura MVC: modelos, vistas y controladores separados",
        "Exportación de presupuestos a Excel con formato definido",
      ],
      en: [
        "Budget extraction from the Revit BIM model (IFC), with a 3D viewer optimized for modest hardware",
        "AIU calculation (Administration, Contingency, Profit): taxes, stamp levies and other charges, not just materials",
        "Table extraction from the decree's official unit-price PDF",
        "MVC architecture: separate models, views and controllers",
        "Budget export to Excel in a defined format",
      ],
    },
    stack: [
      { name: "Python", group: "backend" },
      { name: "PyQt6", group: "frontend" },
      { name: "SQLAlchemy", group: "backend" },
      { name: "PostgreSQL", group: "data" },
      { name: "pandas", group: "data" },
      { name: "tabula-py", group: "data" },
      { name: "pdfminer.six", group: "data" },
      { name: "PyPDF2", group: "data" },
      { name: "openpyxl", group: "data" },
      { name: "ifcopenshell", group: "data" },
      { name: "PyVista / VTK", group: "frontend" },
    ],
    links: [
      {
        kind: "repo",
        href: "https://github.com/JuanPabloAnteSuarez03/Tesis-Paula-Cadena",
        label: { es: "Código", en: "Code" },
      },
    ],
    media: {
      gallery: [
        {
          src: presupuestosInicialVacia,
          caption: {
            es: "Pantalla inicial, sin presupuesto cargado",
            en: "Initial screen, with no budget loaded",
          },
        },
        {
          src: presupuestosInicialAiu,
          caption: {
            es: "Presupuesto cargado con análisis de AIU",
            en: "Budget loaded with AIU analysis",
          },
        },
        {
          src: presupuestosInicial3d,
          caption: {
            es: "Presupuesto y AIU con el modelo 3D del proyecto cargado",
            en: "Budget and AIU with the project's 3D model loaded",
          },
        },
        {
          src: presupuestosAnalisisUnitario,
          caption: {
            es: "Detalle de un análisis unitario",
            en: "Detail of a unit-price analysis",
          },
        },
        {
          src: presupuestosAiu,
          caption: {
            es: "Cálculo de Administración, Imprevistos y Utilidad (AIU)",
            en: "Administration, Contingency and Profit (AIU) calculation",
          },
        },
        {
          src: presupuestosCronograma,
          caption: {
            es: "Cronograma de obra",
            en: "Project schedule",
          },
        },
        {
          src: presupuestosCronogramaTablero,
          caption: {
            es: "Cronograma en vista de tablero",
            en: "Schedule in board view",
          },
        },
        {
          src: presupuestosControlEvm,
          caption: {
            es: "Control de ejecución con valor ganado (EVM)",
            en: "Execution tracking with earned value management (EVM)",
          },
        },
        {
          src: presupuestosEjecucionCompras,
          caption: {
            es: "Ejecución de gastos: compras",
            en: "Expense execution: purchases",
          },
        },
        {
          src: presupuestosEjecucionNomina,
          caption: {
            es: "Ejecución de gastos: nómina",
            en: "Expense execution: payroll",
          },
        },
      ],
    },
    preview: {
      mode: "gallery",
      frame: "app-window",
      appTitle: "Presupuestos de Obra",
    },
    caseStudy: {
      context: {
        es: [
          "El requisito central de la tesis era automatizar el paso de un proyecto de Revit a un presupuesto de obra: partir de un modelo BIM y llegar a un formato manejable, parecido a una hoja de cálculo, con el que calcular rápido el presupuesto y los costos completos de la obra.",
          "En Colombia, esos presupuestos se construyen además sobre análisis de precios unitarios oficiales. Para la Gobernación del Valle esos precios están fijados en el Decreto 1276 de 2021 — publicado como un PDF de cientos de páginas de tablas.",
          "Este proyecto fue el trabajo de grado de posgrado de una clienta, desarrollado a lo largo de aproximadamente un año como trabajo remunerado. Le ofrecí construirlo como aplicación web, pero el requerimiento de su tesis, definido por su director, era una aplicación de escritorio.",
        ],
        en: [
          "The thesis's core requirement was to automate turning a Revit project into a construction budget: starting from a BIM model and arriving at a manageable, spreadsheet-like format to quickly calculate the full budget and costs of the works.",
          "In Colombia, those budgets are also built on official unit-price analyses. For the Valle regional government those prices are set in Decree 1276 of 2021 — published as a PDF of hundreds of pages of tables.",
          "This project was a client's postgraduate thesis work, developed over roughly a year as paid work. I offered to build it as a web app, but her thesis requirement, set by her advisor, called for a desktop application.",
        ],
      },
      problem: {
        es: [
          "Ir de un modelo de Revit a un presupuesto confiable no tenía un camino corto: había que calcular el costo completo de la obra, que no son solo los materiales — también entran la mano de obra, los impuestos y las estampillas —, y automatizar ese recorrido entero, no una parte, era el requisito central de la tesis.",
          "Para calcular esos costos con precisión hacía falta, además, el catálogo oficial de precios unitarios de la Gobernación del Valle, y ese catálogo estaba atrapado en un PDF de cientos de páginas: transcribirlo a mano para cada presupuesto era lento y propenso a errores que se propagaban a la oferta económica.",
        ],
        en: [
          "Going from a Revit model to a reliable budget had no shortcut: the full cost of the works had to be calculated, and that is not just materials — labor, taxes and stamp levies all count too. Automating that whole path, not one part of it, was the thesis's central requirement.",
          "Calculating those costs accurately also required the Valle regional government's official unit-price catalog, and that catalog was locked inside a PDF of hundreds of pages: transcribing it by hand for every budget was slow and error-prone, with errors that propagated into the final bid.",
        ],
      },
      solution: {
        es: [
          "El núcleo de la aplicación es leer el modelo BIM del proyecto: la clienta entregaba archivos IFC (el formato estándar que exporta Revit), la app los renderiza en un visor 3D para inspeccionarlos, y a partir de ahí arma el presupuesto — cruzándolo con los análisis unitarios oficiales y calculando también el AIU (Administración, Imprevistos y Utilidad), que es donde entran los impuestos, las estampillas y demás cargos que no son material directo.",
          "Esos análisis unitarios oficiales salen del Decreto 1276 de 2021: la app extrae sus tablas del PDF, las normaliza y las carga en una base de datos relacional, para que estén disponibles al armar cada presupuesto.",
          "El resultado se exporta a Excel en el formato que la entidad espera recibir.",
          "El trabajo se hizo en reuniones quincenales de una a dos horas: la clienta explicaba las indicaciones de su director de tesis y yo traducía eso en una solución técnica concreta, iterando según los cambios que pedía el director.",
        ],
        en: [
          "The core of the application is reading the project's BIM model: the client provided IFC files (the standard format exported by Revit), the app renders them in a 3D viewer for inspection, and from there assembles the budget — cross-referencing it with the official unit-price analyses and also calculating the AIU (Administration, Contingency and Profit), which is where taxes, stamp levies and other charges that aren't direct material cost come in.",
          "Those official unit-price analyses come from Decree 1276 of 2021: the app extracts its PDF tables, normalizes them and loads them into a relational database, so they're available when assembling each budget.",
          "The result exports to Excel in the format the government agency expects.",
          "The work ran on biweekly one-to-two-hour meetings: the client relayed her thesis advisor's guidance, and I translated that into a concrete technical solution, iterating as the advisor requested changes.",
        ],
      },
      decisions: [
        {
          title: {
            es: "Arquitectura MVC estricta",
            en: "Strict MVC architecture",
          },
          body: {
            es: "Modelos, vistas y controladores en carpetas separadas, con un modelo por entidad del dominio: análisis unitario, recurso, presupuesto, profesional.",
            en: "Models, views and controllers in separate folders, with one model per domain entity: unit analysis, resource, budget, professional.",
          },
          tradeoff: {
            es: "En un proyecto que creció durante un año con requisitos que iban apareciendo, separar la lógica de la interfaz fue lo que permitió agregar vistas nuevas sin romper las existentes.",
            en: "In a project that grew over a year with requirements emerging along the way, separating logic from interface is what allowed adding new views without breaking existing ones.",
          },
        },
        {
          title: {
            es: "Varias librerías de PDF en lugar de una",
            en: "Several PDF libraries instead of one",
          },
          body: {
            es: "El proyecto usa tabula-py, pdfminer.six y PyPDF2 en conjunto.",
            en: "The project uses tabula-py, pdfminer.six and PyPDF2 together.",
          },
          tradeoff: {
            es: "Ninguna librería sola extrae bien tablas de un PDF gubernamental: tabula (sobre Java) acierta en las tablas regulares, mientras que la extracción de texto plano resuelve los casos que rompen la detección de tablas.",
            en: "No single library extracts government-PDF tables well: tabula (on Java) handles regular tables, while plain-text extraction covers the cases that break table detection.",
          },
        },
        {
          title: {
            es: "Optimizar el render 3D en vez de cambiar de stack",
            en: "Optimizing the 3D render instead of switching stacks",
          },
          body: {
            es: "El visor IFC (ifcopenshell + PyVista/VTK) corría fluido en mi máquina de trabajo, pero el computador de la clienta no tenía GPU para mover la cantidad de polígonos de un modelo BIM completo.",
            en: "The IFC viewer (ifcopenshell + PyVista/VTK) ran smoothly on my own machine, but the client's computer had no GPU capable of handling a full BIM model's polygon count.",
          },
          tradeoff: {
            es: "La parte más difícil del proyecto no fue el render en sí, sino reducir la cantidad de polígonos y aplicar optimizaciones hasta que corriera fluido en hardware modesto. Fue una decisión consciente: en C++ el rendimiento habría sido mejor de entrada, pero la clienta quería Python y una aplicación de escritorio, así que el problema se resolvió optimizando dentro de esas restricciones en vez de cambiar de lenguaje.",
            en: "The hardest part of the project wasn't the rendering itself, but reducing the polygon count and applying optimizations until it ran smoothly on modest hardware. It was a deliberate choice: C++ would have performed better out of the box, but the client wanted Python and a desktop app, so the problem was solved by optimizing within those constraints rather than switching languages.",
          },
        },
      ],
      results: {
        es: [
          "La tesis fue aprobada y la clienta se graduó de su posgrado.",
          "Según la clienta, sigue usando la aplicación en su trabajo actualmente.",
        ],
        en: [
          "The thesis was approved and the client graduated from her postgraduate program.",
          "According to the client, she still uses the application in her work today.",
        ],
      },
    },
    pending: [
      "El código del visor IFC vive en la rama `excel` del repo, no en `main` (60 commits adelante / 38 atrás, con bastante ruido: xlsx/csv de prueba, PRUEBAS/, etc.) — pendiente decidir merge limpio vs. cherry-pick. El repo también tiene un comando para generar instalador — evaluar alojarlo como demo descargable en el portafolio.",
    ],
  },

  {
    slug: "eck",
    name: "ECK",
    client: {
      es: "East Coast Karting (ECK), pista de karts en New Brunswick, Canadá",
      en: "East Coast Karting (ECK), a kart track in New Brunswick, Canada",
    },
    period: { es: "Mayo — Junio 2026", en: "May — June 2026" },
    role: {
      es: "Desarrollo prácticamente completo del landing, diseño incluido",
      en: "Practically the entire landing page, design included",
    },
    team: {
      es: "Un compañero en Canadá llevó los requerimientos y la comunicación con el cliente en persona, en la pista; yo me coordinaba con él, no directamente con el cliente",
      en: "A teammate in Canada handled requirements and client communication in person, at the track; I coordinated with him, not directly with the client",
    },
    tagline: {
      es: "Landing page para una empresa de karting, con formulario de contacto",
      en: "Landing page for a karting company, with a contact form",
    },
    summary: {
      es: "Un landing page en React para una empresa de karting canadiense, con una API serverless que gestiona el envío del formulario de contacto por correo.",
      en: "A React landing page for a Canadian karting company, with a serverless API handling contact-form email delivery.",
    },
    highlights: {
      es: [
        "Interfaz en React desplegada en Vercel",
        "API serverless en Node para el formulario de contacto",
        "Panel de administración con sesión JWT para gestionar el horario de walk-in",
        "Envío de correo con configuración por variables de entorno",
      ],
      en: [
        "React interface deployed on Vercel",
        "Serverless Node API for the contact form",
        "JWT-authenticated admin panel to manage the walk-in schedule",
        "Email delivery configured through environment variables",
      ],
    },
    stack: [
      { name: "React", group: "frontend" },
      { name: "Node.js", group: "backend" },
      { name: "JWT", group: "backend" },
      { name: "Vercel KV", group: "data" },
      { name: "Vercel", group: "infra" },
    ],
    links: [
      {
        kind: "live",
        href: "https://eck-6c79.vercel.app",
        label: { es: "Ver en vivo", en: "View live" },
      },
      {
        kind: "repo",
        href: "https://github.com/JuanPabloAnteSuarez03/ECK",
        label: { es: "Código", en: "Code" },
      },
    ],
    media: {
      desktopFull: eckDesktopFull,
      hero: eckHero,
    },
    preview: {
      mode: "pan",
      embeddable: true,
      liveUrl: "https://eck-6c79.vercel.app",
      panSeconds: 18,
    },
    caseStudy: {
      context: {
        es: [
          "East Coast Karting, una pista de karts en New Brunswick (Canadá), necesitaba presencia web y un canal directo para recibir consultas. Un compañero llevaba la relación con el cliente en persona, en la pista; yo desarrollaba a distancia coordinando con él.",
        ],
        en: [
          "East Coast Karting, a kart track in New Brunswick, Canada, needed a web presence and a direct channel to receive inquiries. A teammate managed the client relationship in person, at the track, while I developed remotely, coordinating with him.",
        ],
      },
      problem: {
        es: [
          "El objetivo del sitio no era informar sino convertir: que quien llegue termine escribiendo. Eso vuelve al formulario de contacto la pieza crítica, no un accesorio.",
        ],
        en: [
          "The site's goal was not to inform but to convert: whoever lands on it should end up getting in touch. That makes the contact form the critical piece, not an accessory.",
        ],
      },
      solution: {
        es: [
          "Diseñé el landing desde cero, partiendo de los componentes de una plantilla de Create React App que encontré y me gustó, y desarrollé una función serverless en el mismo despliegue de Vercel que recibe el formulario y envía el correo, con las credenciales fuera del código.",
        ],
        en: [
          "I designed the landing from scratch, starting from the components of a Create React App template I found and liked, and built a serverless function in the same Vercel deployment that receives the form and sends the email, with credentials kept out of the code.",
        ],
      },
      decisions: [
        {
          title: {
            es: "API serverless en el mismo despliegue",
            en: "Serverless API in the same deployment",
          },
          body: {
            es: "El envío de correo vive como función en `/api`, dentro del mismo proyecto de Vercel que el frontend.",
            en: "Email delivery lives as a function under `/api`, inside the same Vercel project as the frontend.",
          },
          tradeoff: {
            es: "Evita mantener y pagar un servidor aparte para lo único que el sitio necesita del backend, y mantiene las credenciales SMTP fuera del navegador.",
            en: "It avoids maintaining and paying for a separate server for the only thing the site needs from a backend, and keeps SMTP credentials out of the browser.",
          },
        },
        {
          title: {
            es: "Vercel KV para el horario en vez de una base de datos aparte",
            en: "Vercel KV for the schedule instead of a separate database",
          },
          body: {
            es: "El panel `/admin-eck` (sesión JWT en cookie httpOnly) guarda el horario semanal de walk-in — con overrides por día, hasta 4 franjas horarias — en Vercel KV.",
            en: "The `/admin-eck` panel (JWT session in an httpOnly cookie) stores the weekly walk-in schedule — with per-day overrides, up to 4 time slots — in Vercel KV.",
          },
          tradeoff: {
            es: "Un solo registro clave-valor es suficiente para un horario que el dueño edita ocasionalmente; una base de datos relacional habría sido sobreingeniería para este alcance.",
            en: "A single key-value record is enough for a schedule the owner edits occasionally; a relational database would have been over-engineering for this scope.",
          },
        },
      ],
      results: {
        es: ["El sitio está en producción en Vercel."],
        en: ["The site is live in production on Vercel."],
      },
    },
    pending: [
      "El formulario sí llega al correo de la empresa (confirmado) — falta volumen exacto, si se puede saber.",
    ],
  },

  {
    slug: "camer",
    name: "Camer",
    client: {
      es: "Diego Cadena Ingeniería S.A.S",
      en: "Diego Cadena Ingeniería S.A.S",
    },
    period: { es: "Desde 2024", en: "Since 2024" },
    role: {
      es: "Desarrollo e implementación completa del sitio, con mantenimiento ocasional desde entonces",
      en: "Full site development and implementation, with occasional maintenance since then",
    },
    team: {
      es: "El diseño lo entregó una diseñadora gráfica en Illustrator",
      en: "The design was delivered by a graphic designer in Illustrator",
    },
    tagline: {
      es: "Sitio corporativo para una firma de perforación horizontal dirigida",
      en: "Corporate site for a horizontal directional drilling firm",
    },
    summary: {
      es: "Sitio corporativo multipágina implementado fielmente a partir de un diseño en Illustrator, con formulario de contacto funcional, SEO estructurado y dominio propio en producción.",
      en: "A multi-page corporate site implemented faithfully from an Illustrator design, with a working contact form, structured SEO and its own domain in production.",
    },
    highlights: {
      es: [
        "Maquetación fiel al diseño entregado, responsive",
        "Formulario de contacto en PHP con PHPMailer",
        "SEO estructurado: Schema.org, sitemap y robots.txt",
        "En producción con dominio propio",
      ],
      en: [
        "Faithful, responsive implementation of the delivered design",
        "PHP contact form with PHPMailer",
        "Structured SEO: Schema.org, sitemap and robots.txt",
        "Live in production on its own domain",
      ],
    },
    stack: [
      { name: "HTML5", group: "frontend" },
      { name: "CSS3", group: "frontend" },
      { name: "JavaScript", group: "frontend" },
      { name: "Bootstrap 5", group: "frontend" },
      { name: "PHP 8", group: "backend" },
      { name: "PHPMailer", group: "backend" },
    ],
    links: [
      {
        kind: "live",
        href: "https://diegocadenaingenieria.com/",
        label: { es: "Ver en vivo", en: "View live" },
      },
      {
        kind: "repo",
        href: "https://github.com/JuanPabloAnteSuarez03/Camer",
        label: { es: "Código", en: "Code" },
      },
    ],
    media: {
      desktopFull: camerDesktopFull,
      hero: camerHero,
    },
    preview: {
      mode: "pan",
      embeddable: true,
      liveUrl: "https://diegocadenaingenieria.com/",
      panSeconds: 18,
    },
    caseStudy: {
      context: {
        es: [
          "Diego Cadena Ingeniería S.A.S es una firma de perforación horizontal dirigida que no tenía sitio web — este fue su primer sitio, no un rediseño. Una diseñadora gráfica preparó el diseño completo en Illustrator; mi trabajo fue convertirlo en un sitio real y funcionando.",
        ],
        en: [
          "Diego Cadena Ingeniería S.A.S is a horizontal directional drilling firm that had no website — this was their first site, not a redesign. A graphic designer prepared the full design in Illustrator; my job was turning it into a real, working site.",
        ],
      },
      problem: {
        es: [
          "Un diseño en Illustrator no dice cómo debe comportarse el sitio cuando la pantalla cambia de tamaño, ni qué pasa cuando alguien envía el formulario. Esas decisiones hay que tomarlas al implementar, sin traicionar el diseño.",
        ],
        en: [
          "An Illustrator file does not say how the site should behave when the screen resizes, nor what happens when someone submits the form. Those decisions get made during implementation, without betraying the design.",
        ],
      },
      solution: {
        es: [
          "Implementé el sitio multipágina respetando el diseño entregado, con formulario de contacto funcional en PHP y trabajo de SEO técnico: datos estructurados Schema.org, sitemap y robots.txt.",
        ],
        en: [
          "I implemented the multi-page site faithful to the delivered design, with a working PHP contact form and technical SEO work: Schema.org structured data, sitemap and robots.txt.",
        ],
      },
      decisions: [
        {
          title: {
            es: "PHP y PHPMailer en vez de un servicio externo",
            en: "PHP and PHPMailer instead of an external service",
          },
          body: {
            es: "El formulario de contacto se resuelve en el mismo hosting del sitio.",
            en: "The contact form is handled on the site's own hosting.",
          },
          tradeoff: {
            es: "El hosting del cliente ya soportaba PHP, así que resolverlo ahí evitó sumarle una suscripción mensual a un negocio que solo necesita recibir correos de contacto.",
            en: "The client's hosting already supported PHP, so solving it there avoided adding a monthly subscription to a business that only needs to receive contact emails.",
          },
        },
        {
          title: {
            es: "SEO estructurado desde el inicio",
            en: "Structured SEO from the start",
          },
          body: {
            es: "Datos estructurados Schema.org de negocio local, sitemap y robots.txt.",
            en: "Schema.org local-business structured data, sitemap and robots.txt.",
          },
          tradeoff: {
            es: "Para una firma de ingeniería especializada, aparecer en búsquedas del servicio exacto vale más que cualquier otra optimización: el volumen de búsqueda es bajo pero la intención es altísima.",
            en: "For a specialized engineering firm, ranking for the exact service matters more than any other optimization: search volume is low but intent is very high.",
          },
        },
      ],
      results: {
        es: [
          "El sitio está en producción bajo el dominio propio de la empresa.",
          "El SEO posicionó el sitio arriba en los resultados de Google para búsquedas de perforación horizontal dirigida en Cali.",
          "El cliente sigue en contacto: pide ajustes ocasionales, y recientemente encargó una ronda de mantenimiento enfocada en mejorar el posicionamiento, ya entregada.",
        ],
        en: [
          "The site is live in production under the company's own domain.",
          "The SEO work put the site near the top of Google results for horizontal directional drilling searches in Cali.",
          "The client stays in touch: occasional change requests, and recently commissioned a maintenance round focused on improving search ranking, already delivered.",
        ],
      },
    },
  },
];

export const projectsBySlug = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
) as Record<ProjectSlug, Project>;

/** Proyectos secundarios: solo enlace, sin caso de estudio. */
export const sideProjects: SideProject[] = [
  {
    name: "Interspeaker",
    description: {
      es: "Proyecto con integración de voz y APIs de IA.",
      en: "Project integrating voice and AI APIs.",
    },
    tech: ["JavaScript"],
    repo: "https://github.com/JuanPabloAnteSuarez03/Interspeaker",
  },
  {
    name: "Monetra",
    description: {
      es: "Aplicación web de gestión financiera.",
      en: "Web application for financial management.",
    },
    tech: ["JavaScript"],
    repo: "https://github.com/JuanPabloAnteSuarez03/Monetra",
  },
  {
    name: "IARecetas",
    description: {
      es: "Generador de recetas asistido por inteligencia artificial.",
      en: "AI-assisted recipe generator.",
    },
    tech: ["JavaScript"],
    repo: "https://github.com/JuanPabloAnteSuarez03/IARecetas",
  },
  {
    name: "Secop-Diego-Cadena",
    description: {
      es: "Herramienta de análisis sobre datos de contratación pública (SECOP).",
      en: "Analysis tool over Colombian public procurement data (SECOP).",
    },
    tech: ["Python"],
    repo: "https://github.com/JuanPabloAnteSuarez03/Secop-Diego-Cadena",
  },
];
