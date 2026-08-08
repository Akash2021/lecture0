import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EquationBuilderProps {
  tokens: string[];
  delay: number;
  x?: number;
  y?: number;
  fontSize?: number;
  tokenDelay?: number;
}

export const EquationBuilder: React.FC<EquationBuilderProps> = ({
  tokens,
  delay,
  x = 0,
  y = 0,
  fontSize = 36,
  tokenDelay = 8,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "baseline",
        gap: 6,
      }}
    >
      {tokens.map((token, i) => {
        const tokenStart = delay + i * tokenDelay;
        const opacity = interpolate(frame - tokenStart, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(frame - tokenStart, [0, 8], [12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize,
              fontWeight: 600,
              color: token.includes("=") ? "#FFD60A" : "white",
              opacity,
              transform: `translateY(${translateY}px)`,
              display: "inline-block",
            }}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
};
