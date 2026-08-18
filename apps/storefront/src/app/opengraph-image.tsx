import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "KrishiVeda Direct - Agricultural Marketplace"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "48px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌾</div>
        <h1
          style={{
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          KrishiVeda Direct
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#d1fae5",
            marginTop: 16,
            maxWidth: 800,
            fontWeight: 500,
          }}
        >
          Direct-to-Farmer Agricultural eCommerce & Supply Marketplace
        </p>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: 32,
            fontSize: 20,
            color: "#a7f3d0",
          }}
        >
          <span>🌱 Certified Hybrid Seeds</span>
          <span>•</span>
          <span>🧪 Bio-Fertilizers</span>
          <span>•</span>
          <span>🚜 Farm Equipment</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
