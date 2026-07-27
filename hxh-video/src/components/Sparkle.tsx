import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SparkleProps {
  x: number;
  y: number;
  size?: number;
  delay?: number;
}

export const Sparkle: React.FC<SparkleProps> = ({
  x,
  y,
  size = 20,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  if (t < 0) return null;

  const cycle = t % 60;
  const scale = interpolate(cycle, [0, 15, 30, 45, 60], [0, 1, 0.3, 1, 0], {
    extrapolateRight: "clamp",
  });
  const rotation = interpolate(cycle, [0, 60], [0, 90]);
  const opacity = interpolate(cycle, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path
          d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
          fill="white"
          opacity={0.9}
        />
      </svg>
    </div>
  );
};
