import type { Project, ProjectSlug, SideProject } from "@/types/content";

import unidentalInventario from "@/assets/unidental/inventario.png";
import unidentalVentaFifo from "@/assets/unidental/venta-fifo.png";
import unidentalAlertasVencimiento from "@/assets/unidental/alertas-vencimiento.png";
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
    period: "2025",
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
            es: "Inventario por sede, con stock por lote y fecha de vencimiento",
            en: "Per-location inventory, with stock by batch and expiry date",
          },
        },
        {
          src: unidentalVentaFifo,
          caption: {
            es: "Venta con selección FIFO por lote y override manual",
            en: "Sale with FIFO batch selection and manual override",
          },
        },
        {
          src: unidentalAlertasVencimiento,
          caption: {
            es: "Alertas de vencimiento por lote",
            en: "Batch expiry alerts",
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
            en: "Cash register close",
          },
        },
      ],
    },
    preview: { mode: "gallery" },
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
          "Llevar inventario con vencimientos por lote, en dos sedes, sin un sistema que lo modele, obliga a decidir de memoria qué lote despachar. El costo aparece tarde y en forma de producto vencido.",
          "El inventario vivía antes en hojas de cálculo de Google Sheets, sin relación real entre productos, lotes y sedes.",
        ],
        en: [
          "Tracking batch-level expiry across two locations without a system that models it forces staff to decide from memory which batch to dispatch. The cost shows up late, as expired product.",
          "Inventory previously lived in Google Sheets spreadsheets, with no real relational structure between products, batches and locations.",
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
          "The React frontend we largely implemented together with a teammate, on top of the API I had already defined.",
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
            es: "El admin de Django cubrió el CRUD de catálogo desde el primer día, lo que permitió que el cliente cargara datos reales mientras el frontend todavía se construía.",
            en: "Django's admin covered catalog CRUD from day one, which let the client load real data while the frontend was still being built.",
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
    period: "Febrero 2025 — Febrero 2026",
    role: {
      es: "Desarrollo completo, construido de forma iterativa con la clienta",
      en: "Full development, built iteratively with the client",
    },
    tagline: {
      es: "App de escritorio que convierte un decreto en PDF en presupuestos de obra",
      en: "Desktop app that turns a PDF decree into construction budgets",
    },
    summary: {
      es: "Una aplicación de escritorio en PyQt6 que extrae los análisis unitarios oficiales del Decreto 1276 de 2021, los modela en base de datos y permite armar presupuestos de obra civil exportables a Excel.",
      en: "A PyQt6 desktop application that extracts the official unit-price analyses from Decree 1276 of 2021, models them in a database, and lets the user assemble civil works budgets exportable to Excel.",
    },
    highlights: {
      es: [
        "Extracción de tablas desde el PDF oficial del decreto",
        "Visor 3D de modelos BIM (IFC) optimizado para hardware modesto",
        "Arquitectura MVC: modelos, vistas y controladores separados",
        "Modelado relacional de análisis unitarios, recursos y profesionales",
        "Exportación de presupuestos a Excel con formato definido",
      ],
      en: [
        "Table extraction from the decree's official PDF",
        "3D BIM model (IFC) viewer optimized for modest hardware",
        "MVC architecture: separate models, views and controllers",
        "Relational modeling of unit analyses, resources and professionals",
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
    preview: { mode: "gallery" },
    caseStudy: {
      context: {
        es: [
          "En Colombia, los presupuestos de obra pública se construyen sobre análisis de precios unitarios oficiales. Para la Gobernación del Valle esos precios están fijados en el Decreto 1276 de 2021 — publicado como un PDF de cientos de páginas de tablas.",
          "Este proyecto fue el trabajo de grado de posgrado de una clienta, desarrollado a lo largo de aproximadamente un año como trabajo remunerado. Le ofrecí construirlo como aplicación web, pero el requerimiento de su tesis, definido por su director, era una aplicación de escritorio.",
        ],
        en: [
          "In Colombia, public works budgets are built on official unit-price analyses. For the Valle regional government those prices are set in Decree 1276 of 2021 — published as a PDF of hundreds of pages of tables.",
          "This project was a client's postgraduate thesis work, developed over roughly a year as paid work. I offered to build it as a web app, but her thesis requirement, set by her advisor, called for a desktop application.",
        ],
      },
      problem: {
        es: [
          "Los datos que se necesitan para presupuestar están atrapados en un PDF. Transcribirlos a mano para cada presupuesto es lento y propenso a errores, y esos errores se propagan a la oferta económica.",
        ],
        en: [
          "The data needed to build a budget is locked inside a PDF. Transcribing it by hand for every budget is slow and error-prone, and those errors propagate into the final bid.",
        ],
      },
      solution: {
        es: [
          "Una aplicación de escritorio que hace el recorrido completo: extrae las tablas del PDF, las normaliza y las carga en una base de datos relacional, y sobre esa base ofrece una interfaz para armar presupuestos seleccionando análisis unitarios y recursos.",
          "El resultado se exporta a Excel en el formato que la entidad espera recibir.",
          "El trabajo se hizo en reuniones quincenales de una a dos horas: la clienta explicaba las indicaciones de su director de tesis y yo traducía eso en una solución técnica concreta, iterando según los cambios que pedía el director.",
          "La aplicación también incluye un visor 3D de modelos BIM: la clienta entregaba archivos IFC (el formato estándar que exporta Revit) y la app los renderiza para inspeccionar el modelo y extraer presupuesto a partir de él.",
        ],
        en: [
          "A desktop application covering the whole path: it extracts the PDF tables, normalizes them and loads them into a relational database, then offers an interface to assemble budgets by selecting unit analyses and resources.",
          "The result exports to Excel in the format the entity expects.",
          "The work ran on biweekly one-to-two-hour meetings: the client relayed her thesis advisor's guidance, and I translated that into a concrete technical solution, iterating as the advisor requested changes.",
          "The application also includes a 3D BIM model viewer: the client provided IFC files (the standard format exported by Revit) and the app renders them to inspect the model and derive the budget from it.",
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
    period: "Mayo — Junio 2026",
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
      panSeconds: 7,
    },
    caseStudy: {
      context: {
        es: [
          "East Coast Karting, una pista de karts en New Brunswick (Canadá), necesitaba presencia web y un canal directo para recibir consultas. Un compañero llevaba la relación con el cliente en persona, en la pista; yo desarrollaba a distancia coordinando con él.",
        ],
        en: [
          "East Coast Karting, a kart track in New Brunswick, Canada, needed a web presence and a direct channel to receive enquiries. A teammate managed the client relationship in person, at the track, while I developed remotely, coordinating with him.",
        ],
      },
      problem: {
        es: [
          "El objetivo del sitio no era informar sino convertir: que quien llegue termine escribiendo. Eso vuelve al formulario de contacto la pieza crítica, no un accesorio.",
        ],
        en: [
          "The site's goal was not to inform but to convert: whoever lands should end up writing in. That makes the contact form the critical piece, not an accessory.",
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
    period: "Desde 2024",
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
      panSeconds: 9,
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
          "The SEO work ranked the site near the top of Google results for horizontal directional drilling searches in Cali.",
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
