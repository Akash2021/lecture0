import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface StatBarProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  color,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const width = interpolate(progress, [0, 1], [0, value]);
  const displayValue = Math.round(width);

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: "Oswald, sans-serif",
          fontSize: 26,
          fontWeight: 600,
          color: "rgba(255,255,255,0.8)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 22,
          borderRadius: 9,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            borderRadius: 9,
            background: `linear-gradient(90deg, ${color}44, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};
