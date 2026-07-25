import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface AvatarPlaceholderProps {
  name: string;
  color: string;
  size?: number;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  color,
  size = 200,
}) => {
  const frame = useCurrentFrame();

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const shimmerOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.8, 0.3]
  );

  const glowSize = interpolate(frame % 45, [0, 22, 45], [15, 30, 15]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle, ${color}44 0%, ${color}11 70%, transparent 100%)`,
        border: `3px solid ${color}`,
        boxShadow: `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 2}px ${color}66, inset 0 0 ${glowSize}px ${color}33`,
        position: "relative",
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
          borderRadius: "50%",
          background: `conic-gradient(from ${frame * 3}deg, transparent, ${color}${Math.round(shimmerOpacity * 255).toString(16).padStart(2, "0")}, transparent)`,
        }}
      />
      <span
        style={{
          fontSize: size * 0.35,
          fontWeight: 900,
          color: "white",
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          zIndex: 1,
          fontFamily: "sans-serif",
        }}
      >
        {initials}
      </span>
    </div>
  );
};
