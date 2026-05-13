import { ImageResponse } from "next/og";

export const alt = "Cabane 135 — Huîtres au détail & dégustation · Nieul-sur-Mer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0a1628 0%, #0f2035 50%, #163a55 100%)",
          color: "#f2ece0",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#c8a15a",
            }}
          >
            Nieul-sur-Mer · Charente-Maritime
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#00b8d9",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#00b8d9",
              }}
            />
            Ouvert · 1ᵉʳ mai 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              lineHeight: 0.9,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#f2ece0",
              display: "flex",
            }}
          >
            CABANE
          </div>
          <div
            style={{
              fontSize: 220,
              lineHeight: 0.9,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#00b8d9",
              marginTop: -20,
              display: "flex",
            }}
          >
            135
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontStyle: "italic",
              color: "#c8a15a",
              maxWidth: 700,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            Entre deux marées, sur le seuil d'un estuaire.
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(242, 236, 224, 0.55)",
              display: "flex",
            }}
          >
            by Huîtres Lebon
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
