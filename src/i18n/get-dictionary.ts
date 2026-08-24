import type { Locale } from "./config";
import { es, type Dictionary } from "./dictionaries/es";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

/**
 * Síncrono a propósito: son ~120 cadenas estáticas, no hay nada que esperar.
 * Se consume solo en componentes de servidor, así que ningún diccionario
 * llega al navegador — los componentes de cliente reciben cadenas por props.
 */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
