import React from "react";
import { useCurrentFrame } from "remotion";

export const ScanlineOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = (frame * 4) % 1920;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      {/* Horizontal scan line */}
      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          width: "100%",
          height: 2,
          background: "rgba(255,255,255,0.06)",
        }}
      />
      {/* Subtle repeating scanlines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
        }}
      />
    </div>
  );
};
