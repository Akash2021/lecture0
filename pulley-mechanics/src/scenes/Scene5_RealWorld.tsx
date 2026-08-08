import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const applications = [
  { icon: "🏗️", label: "Construction Cranes", desc: "Lifting tons of steel" },
  { icon: "🛗", label: "Elevators", desc: "Counterweight systems" },
  { icon: "⛵", label: "Sailing Rigging", desc: "Controlling heavy sails" },
  { icon: "🏋️", label: "Cable Machines", desc: "Adjustable resistance" },
];

export const Scene5_RealWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#0F1117" }}>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 48, fontWeight: 700, color: "white", margin: 0 }}>
          Real World Applications
        </h1>
        <div style={{ width: 200, height: 3, background: "#F5A623", margin: "12px auto 0" }} />
      </div>

      {/* Application cards */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {applications.map((app, i) => {
          const cardSpring = spring({
            frame: frame - 30 - i * 15,
            fps,
            config: { damping: 10, stiffness: 80 },
          });

          const scale = interpolate(cardSpring, [0, 1], [0.3, 1]);
          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
          const translateY = interpolate(cardSpring, [0, 1], [60, 0]);

          return (
            <div
              key={app.label}
              style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 340,
                padding: "40px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: 72, marginBottom: 16 }}>{app.icon}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {app.label}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                }}
              >
                {app.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* End card */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 48px",
            background: "linear-gradient(135deg, rgba(245,166,35,0.15), rgba(245,166,35,0.05))",
            border: "1px solid rgba(245,166,35,0.4)",
            borderRadius: 16,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
            }}
          >
            Pulleys: Simple Machines, <span style={{ color: "#F5A623" }}>Big Impact</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
