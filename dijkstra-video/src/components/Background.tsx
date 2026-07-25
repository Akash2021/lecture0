import React from "react";
import { AbsoluteFill } from "remotion";

export const Background: React.FC = () => {
  const dots: React.ReactNode[] = [];
  const spacing = 40;
  for (let x = 0; x < 1920; x += spacing) {
    for (let y = 0; y < 1080; y += spacing) {
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={1}
          fill="rgba(255,255,255,0.06)"
        />
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f1a" }}>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {dots}
      </svg>
    </AbsoluteFill>
  );
};
