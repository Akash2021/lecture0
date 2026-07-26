import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface PowerLabelProps {
  powerLevel: number;
  animationDelay: number;
}

export const PowerLabel: React.FC<PowerLabelProps> = ({
  powerLevel,
  animationDelay,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - animationDelay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(powerLevel * progress);

  const formatted =
    displayValue >= 1_000_000_000
      ? (displayValue / 1_000_000_000).toFixed(displayValue >= 10_000_000_000 ? 0 : 1) + "B"
      : displayValue >= 1_000_000
        ? (displayValue / 1_000_000).toFixed(displayValue >= 10_000_000 ? 0 : 1) + "M"
        : displayValue >= 1_000
          ? (displayValue / 1_000).toFixed(displayValue >= 10_000 ? 0 : 1) + "K"
          : displayValue.toString();

  return (
    <span
      style={{
        fontSize: 42,
        fontWeight: 900,
        color: "white",
        fontFamily: "sans-serif",
        textShadow:
          "2px 2px 0 rgba(0,0,0,0.6), -1px -1px 0 rgba(0,0,0,0.3)",
        letterSpacing: -1,
      }}
    >
      {formatted}
    </span>
  );
};
