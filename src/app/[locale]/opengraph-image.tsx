import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const alt = "World of Wood Decoration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #100d0b 0%, #0b0908 100%)",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(184,150,90,0.28)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: "#cdb079",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {t("eyebrow").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, color: "#ece5d6", lineHeight: 1 }}>
            {t("titleLine1")}
          </div>
          <div
            style={{
              fontSize: 110,
              color: "#b8965a",
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {t("titleLine2")}
          </div>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#8f887a",
            fontFamily: "Arial, sans-serif",
          }}
        >
          World of Wood Decoration — Est. 1994
        </div>
      </div>
    ),
    { ...size },
  );
}
