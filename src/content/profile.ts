import type { L } from "@/types/content";

export const profile = {
  name: "Juan Pablo Ante Suárez",
  shortName: "Juan Pablo Ante",
  /** El prompt del nav — la metáfora de terminal del sitio. */
  handle: "~/juanpablo",
  email: "juan.pablo.ante@correounivalle.edu.co",
  phone: "+57 316 255 2802",
  whatsapp: "https://wa.me/573162552802",
  github: "https://github.com/JuanPabloAnteSuarez03",
  location: { es: "Cali, Colombia", en: "Cali, Colombia" } satisfies L<string>,
  cv: {
    es: "/cv/CV-Juan-Pablo-Ante-Suarez.docx",
    en: "/cv/CV-Juan-Pablo-Ante-Suarez-EN.docx",
  } satisfies L<string>,

  education: {
    school: "Universidad del Valle",
    degree: {
      es: "Ingeniería de Sistemas",
      en: "Systems Engineering",
    } satisfies L<string>,
    status: {
      es: "Décimo semestre · graduación en diciembre de 2026",
      en: "Tenth semester · graduating December 2026",
    } satisfies L<string>,
  },

  languages: [
    {
      name: { es: "Español", en: "Spanish" },
      level: { es: "Nativo", en: "Native" },
    },
    {
      name: { es: "Inglés", en: "English" },
      level: { es: "Intermedio", en: "Intermediate" },
    },
  ] satisfies { name: L<string>; level: L<string> }[],
} as const;
