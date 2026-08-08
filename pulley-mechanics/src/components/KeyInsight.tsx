import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface KeyInsightProps {
  text: string;
  highlight?: string;
  delay: number;
  bottom?: number;
  color?: string;
}

export const KeyInsight: React.FC<KeyInsightProps> = ({
  text,
  highlight,
  delay,
  bottom = 60,
  color = "#FFD60A",
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideY = interpolate(frame - delay, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const parts = highlight ? text.split(highlight) : [text];

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 0,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `translateY(${slideY}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "14px 36px",
          background: `${color}10`,
          border: `1px solid ${color}40`,
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 24,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {highlight
            ? parts.map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < parts.length - 1 && (
                    <span style={{ color, fontWeight: 700 }}>{highlight}</span>
                  )}
                </React.Fragment>
              ))
            : text}
        </span>
      </div>
    </div>
  );
};
