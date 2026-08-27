import { ImageResponse } from "next/og";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profile } from "@/content/profile";

export const alt = "Juan Pablo Ante Suárez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Tarjeta social del home. Mismo lenguaje visual que la de cada proyecto. */
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0f",
          borderLeft: "16px solid #a3e635",
          padding: "68px 72px",
          color: "#e8e8ec",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#a3e635", letterSpacing: 2 }}>
            $ {profile.handle}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 40,
            }}
          >
            {profile.name}
          </div>

          <div style={{ display: "flex", fontSize: 36, color: "#a1a1ac", marginTop: 18 }}>
            {dict.hero.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, background: "#26262c", marginBottom: 26 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "#71717a",
            }}
          >
            <div style={{ display: "flex" }}>
              {profile.education.school}  ·  {profile.location[locale]}
            </div>
            <div style={{ display: "flex", color: "#a1a1ac" }}>
              juanpabloante.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
