import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20, 70, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(
    frame % 30,
    [0, 15, 30],
    [20, 40, 20]
  );

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 72,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          textShadow: `0 0 ${glowIntensity}px #7c3aed, 0 0 ${glowIntensity * 2}px #7c3aed, 0 0 ${glowIntensity * 3}px #3b82f6`,
          lineHeight: 1.2,
        }}
      >
        JJK Power Scaling
      </h1>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 36,
          color: "#a78bfa",
          marginTop: 24,
          opacity: subtitleOpacity,
          fontWeight: 700,
        }}
      >
        Before the Final Battle
      </p>
    </div>
  );
};
