import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface PowerLevelCounterProps {
  powerLevel: number;
  color: string;
  delay: number;
}

export const PowerLevelCounter: React.FC<PowerLevelCounterProps> = ({
  powerLevel,
  color,
  delay,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(powerLevel * progress);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        marginTop: 12,
      }}
    >
      <span
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: 24,
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        PWR LVL
      </span>
      <span
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color,
          textShadow: `0 0 10px ${color}66`,
        }}
      >
        {displayValue.toLocaleString()}
      </span>
    </div>
  );
};
