import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// next/font auto-hospeda las fuentes: sin request a Google en runtime y sin CLS.
// `latin` cubre á é í ó ú ñ ü, suficiente para español e inglés.

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`;
