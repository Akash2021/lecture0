import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface MechanicalAdvantageCounterProps {
  value: number;
  delay: number;
  x?: number;
  y?: number;
}

export const MechanicalAdvantageCounter: React.FC<MechanicalAdvantageCounterProps> = ({
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
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 10, 15], [0.5, 1.2, 1], {
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
          fontSize: 14,
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        Mechanical Advantage
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 64,
          fontWeight: 800,
          color: "#F5A623",
          lineHeight: 1,
          textShadow: "0 0 20px rgba(245, 166, 35, 0.4)",
        }}
      >
        {displayValue}x
      </div>
    </div>
  );
};
