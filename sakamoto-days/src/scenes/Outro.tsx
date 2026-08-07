import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { characters } from "../assets/characters";
import { Silhouette } from "../components/Silhouette";

const sorted = [...characters].sort((a, b) => a.rank - b.rank);

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* CTA text — above lineup */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: "center",
          marginBottom: 80,
        }}
      >
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: "white",
            textTransform: "uppercase",
            letterSpacing: 3,
            margin: 0,
          }}
        >
          Agree? Drop YOUR
        </p>
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: "#F44336",
            textTransform: "uppercase",
            letterSpacing: 3,
            margin: 0,
          }}
        >
          ranking below
        </p>
      </div>

      {/* Lineup */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-end",
        }}
      >
        {sorted.map((char, i) => {
          const popIn = spring({
            frame: frame - 10 - i * 10,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const scale = interpolate(popIn, [0, 1], [0, 1]);
          const charOpacity = interpolate(popIn, [0, 1], [0, 1]);

          return (
            <div
              key={char.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: charOpacity,
                transform: `scale(${scale})`,
              }}
            >
              <Silhouette character={char} compact />
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: char.color,
                  marginTop: 10,
                  textShadow: `0 0 10px ${char.color}44`,
                }}
              >
                #{char.rank}
              </span>
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  textAlign: "center",
                  maxWidth: 120,
                }}
              >
                {char.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
