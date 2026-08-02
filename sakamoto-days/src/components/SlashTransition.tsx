import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SlashTransitionProps {
  color: string;
}

export const SlashTransition: React.FC<SlashTransitionProps> = ({ color }) => {
  const frame = useCurrentFrame();

  const slashProgress = interpolate(frame, [0, 15, 30, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (slashProgress <= 0) return null;

  const clipPercent = interpolate(slashProgress, [0, 0.5], [0, 120], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: color,
          clipPath: `polygon(${clipPercent}% 0%, ${clipPercent - 20}% 100%, ${clipPercent - 25}% 100%, ${clipPercent - 5}% 0%)`,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "white",
          clipPath: `polygon(${clipPercent - 2}% 0%, ${clipPercent - 22}% 100%, ${clipPercent - 24}% 100%, ${clipPercent - 4}% 0%)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
};
