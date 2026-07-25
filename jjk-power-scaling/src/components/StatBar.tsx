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
    config: { damping: 20, stiffness: 80 },
  });

  const width = interpolate(progress, [0, 1], [0, value]);
  const displayValue = Math.round(width);

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
          fontFamily: "sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
        }}
      >
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 16,
          borderRadius: 8,
          background: "#1f1f2e",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            borderRadius: 8,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}88`,
          }}
        />
      </div>
    </div>
  );
};
