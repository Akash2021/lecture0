import React from "react";
import { useCurrentFrame } from "remotion";

interface AlarmOverlayProps {
  startFrame: number;
  interval: number;
}

export const AlarmOverlay: React.FC<AlarmOverlayProps> = ({
  startFrame,
  interval,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const elapsed = frame - startFrame;
  const cyclePos = elapsed % interval;
  const opacity = cyclePos < 10 ? 0.2 * (1 - cyclePos / 10) : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#cc0000",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
