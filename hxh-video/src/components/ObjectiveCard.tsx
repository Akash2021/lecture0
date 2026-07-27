import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ObjectiveCardProps {
  icon: string;
  text: string;
  bgColor: string;
  direction: "left" | "right";
  appearFrame: number;
  strikethrough?: boolean;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  icon,
  text,
  bgColor,
  direction,
  appearFrame,
  strikethrough = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  const translateX = interpolate(
    progress,
    [0, 1],
    [direction === "left" ? -1200 : 1200, 0],
    { extrapolateRight: "clamp" }
  );

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const strikeWidth = strikethrough
    ? interpolate(frame - appearFrame, [20, 40], [0, 100], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  if (frame < appearFrame) return null;

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        background: bgColor,
        borderRadius: 16,
        padding: "30px 50px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        width: 800,
        position: "relative",
        boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      <span style={{ fontSize: 52 }}>{icon}</span>
      <span
        style={{
          color: "#fff",
          fontSize: 36,
          fontFamily: "sans-serif",
          fontWeight: 800,
          position: "relative",
        }}
      >
        {text}
        {strikethrough && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${strikeWidth}%`,
              height: 4,
              backgroundColor: "#fff",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </span>
    </div>
  );
};
