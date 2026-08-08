import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EquationProps {
  text: string;
  delay: number;
  x?: number;
  y?: number;
}

export const Equation: React.FC<EquationProps> = ({
  text,
  delay,
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideY = interpolate(frame - delay, [0, 15], [20, 0], {
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
        transform: `translateY(${slideY}px)`,
        padding: "12px 24px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(245, 166, 35, 0.3)",
        borderRadius: 8,
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 28,
          fontWeight: 600,
          color: "white",
          letterSpacing: 1,
        }}
      >
        {text}
      </span>
    </div>
  );
};
