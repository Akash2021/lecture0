import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CrownBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 150, overshootClamping: false },
  });

  const scale = interpolate(popIn, [0, 1], [0, 1]);
  const opacity = interpolate(popIn, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const rotate = interpolate(popIn, [0, 0.5, 1], [-15, 5, 0]);

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        right: 80,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        zIndex: 10,
      }}
    >
      <svg width="100" height="90" viewBox="0 0 100 90">
        <polygon
          points="10,70 20,30 35,50 50,10 65,50 80,30 90,70"
          fill="#FFD700"
          stroke="#FFA000"
          strokeWidth="2"
        />
        <rect x="10" y="70" width="80" height="12" rx="3" fill="#FFD700" stroke="#FFA000" strokeWidth="2" />
        <circle cx="50" cy="35" r="4" fill="#FFA000" />
        <circle cx="30" cy="45" r="3" fill="#FFA000" />
        <circle cx="70" cy="45" r="3" fill="#FFA000" />
      </svg>
      <span
        style={{
          position: "absolute",
          bottom: -24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "Oswald, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#FFD700",
          textTransform: "uppercase",
          letterSpacing: 3,
          whiteSpace: "nowrap",
        }}
      >
        LEGENDARY
      </span>
    </div>
  );
};
