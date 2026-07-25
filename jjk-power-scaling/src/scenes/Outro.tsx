import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { characters, tierColors } from "../assets/characters";

const tiers = ["S", "A", "B", "C"] as const;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const scale = interpolate(cardScale, [0, 1], [0.8, 1]);
  const opacity = interpolate(cardScale, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          background: "#12121f",
          borderRadius: 24,
          padding: 50,
          width: "100%",
          boxShadow: "0 0 40px #7c3aed33, 0 0 80px #3b82f633",
          border: "1px solid #2a2a3e",
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            marginBottom: 40,
            textShadow: "0 0 15px #7c3aed",
          }}
        >
          Final Power Scaling
        </h2>

        {tiers.map((tier) => (
          <div
            key={tier}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                background: tierColors[tier],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#0a0a0f",
                marginRight: 16,
                flexShrink: 0,
              }}
            >
              {tier}
            </div>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 26,
                color: "white",
                fontWeight: 600,
              }}
            >
              {characters
                .filter((c) => c.tier === tier)
                .map((c) => c.name)
                .join(", ")}
            </span>
          </div>
        ))}

        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 24,
            color: "#a78bfa",
            textAlign: "center",
            marginTop: 40,
            fontWeight: 600,
          }}
        >
          Like & Subscribe for more!
        </p>
      </div>
    </div>
  );
};
