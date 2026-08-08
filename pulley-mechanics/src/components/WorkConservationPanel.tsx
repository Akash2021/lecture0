import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface WorkConservationPanelProps {
  force: number;
  distance: number;
  delay?: number;
}

export const WorkConservationPanel: React.FC<WorkConservationPanelProps> = ({
  force,
  distance,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const work = force * distance;

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 30,
        opacity,
        padding: "12px 20px",
        background: "rgba(13, 27, 42, 0.9)",
        border: "1px solid rgba(255, 214, 10, 0.25)",
        borderRadius: 10,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 6,
        }}
      >
        Work Conservation
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          color: "white",
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: "#00B4D8" }}>{force}N</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}> × </span>
        <span style={{ color: "#00B4D8" }}>{distance}m</span>
        <span style={{ color: "#FFD60A" }}> = {work}J</span>
      </div>
    </div>
  );
};
