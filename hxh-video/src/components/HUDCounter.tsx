import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface HUDCounterProps {
  visible: boolean;
  pulse: boolean;
}

export const HUDCounter: React.FC<HUDCounterProps> = ({ visible, pulse }) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  const scale = pulse
    ? interpolate(Math.sin(frame * 0.12), [-1, 1], [0.98, 1.03])
    : 1;

  const glowOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.7]
  );

  const tickRotation = interpolate(frame % 360, [0, 360], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        width: 200,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <svg
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          transform: `rotate(${tickRotation}deg)`,
        }}
        viewBox="0 0 200 200"
      >
        <circle
          cx={100}
          cy={100}
          r={90}
          fill="none"
          stroke="rgba(0, 200, 200, 0.15)"
          strokeWidth={2}
        />
        <circle
          cx={100}
          cy={100}
          r={90}
          fill="none"
          stroke="rgba(0, 200, 200, 0.6)"
          strokeWidth={2}
          strokeDasharray="8 12"
        />
        {/* Tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const inner = 78;
          const outer = 86;
          return (
            <line
              key={i}
              x1={100 + Math.cos(angle) * inner}
              y1={100 + Math.sin(angle) * inner}
              x2={100 + Math.cos(angle) * outer}
              y2={100 + Math.sin(angle) * outer}
              stroke="rgba(0, 200, 200, 0.4)"
              strokeWidth={i % 6 === 0 ? 2 : 1}
            />
          );
        })}
      </svg>

      {/* Inner glow */}
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 200, 200, ${glowOpacity * 0.1}) 0%, transparent 70%)`,
        }}
      />

      {/* Number display */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          zIndex: 1,
        }}
      >
        <span
          style={{
            color: "#00e5e5",
            fontSize: 56,
            fontFamily: "sans-serif",
            fontWeight: 900,
            textShadow: "0 0 20px rgba(0, 200, 200, 0.6)",
            lineHeight: 1,
          }}
        >
          49
        </span>
        <span
          style={{
            color: "#00c8c8",
            fontSize: 18,
            fontFamily: "sans-serif",
            fontWeight: 700,
            letterSpacing: 6,
            textShadow: "0 0 10px rgba(0, 200, 200, 0.4)",
          }}
        >
          DAYS
        </span>
      </div>
    </div>
  );
};
