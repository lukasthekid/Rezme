import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rezme – AI Resume Tailoring for Every Job";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.25)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(20,184,166,0.2)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "white",
                opacity: 0.9,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            Rezme
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Pill badge */}
          <div
            style={{
              display: "flex",
              width: "fit-content",
            }}
          >
            <div
              style={{
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 100,
                padding: "8px 20px",
                color: "#a5b4fc",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              AI-Powered
            </div>
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              margin: 0,
              maxWidth: 900,
            }}
          >
            Tailor your resume to every job in seconds.
          </h1>

          <p
            style={{
              fontSize: 26,
              color: "#94a3b8",
              margin: 0,
              maxWidth: 720,
              lineHeight: 1.5,
            }}
          >
            AI-powered resume and cover letter tailoring. More interviews, less effort.
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {["Resume Tailoring", "Cover Letters", "ATS Optimized"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#64748b",
                  fontSize: 18,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#4f46e5",
                  }}
                />
                {tag}
              </div>
            ))}
          </div>

          <span style={{ color: "#4f46e5", fontSize: 22, fontWeight: 600 }}>
            rezme.ai
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
