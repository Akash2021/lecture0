import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CountdownBadgeProps {
  visible: boolean;
  pulse: boolean;
}

export const CountdownBadge: React.FC<CountdownBadgeProps> = ({
  visible,
  pulse,
}) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  const scale = pulse
    ? interpolate(Math.sin(frame * 0.15), [-1, 1], [1.0, 1.05])
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        right: 60,
        transform: `scale(${scale})`,
        background: "rgba(204, 0, 0, 0.2)",
        border: "2px solid #cc0000",
        borderRadius: 8,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#cc0000",
          boxShadow: "0 0 8px #cc0000",
        }}
      />
      <span
        style={{
          color: "#cc0000",
          fontSize: 28,
          fontFamily: "sans-serif",
          fontWeight: 800,
          letterSpacing: 2,
          textShadow: "0 0 10px rgba(204, 0, 0, 0.5)",
        }}
      >
        49 DAYS REMAINING
      </span>
    </div>
  );
};
