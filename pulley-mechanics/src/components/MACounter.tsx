import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface MACounterProps {
  value: number;
  delay: number;
  x?: number;
  y?: number;
}

export const MACounter: React.FC<MACounterProps> = ({
  value,
  delay,
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(value * progress);

  const scale = interpolate(frame - delay, [0, 8, 14], [0.5, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        Mechanical Advantage
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 72,
          fontWeight: 800,
          color: "#FFD60A",
          lineHeight: 1,
          textShadow: "0 0 24px rgba(255, 214, 10, 0.35)",
        }}
      >
        {displayValue}×
      </div>
    </div>
  );
};
