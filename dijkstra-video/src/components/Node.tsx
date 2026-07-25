import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NodeProps {
  id: string;
  x: number;
  y: number;
  status: "unseen" | "current" | "visited" | "path";
  distance: number;
  appearFrame: number;
}

const statusColors: Record<string, { fill: string; stroke: string; glow: string }> = {
  unseen: { fill: "#2a2a3e", stroke: "#4a4a6a", glow: "none" },
  current: { fill: "#3d3200", stroke: "#f59e0b", glow: "#f59e0b" },
  visited: { fill: "#0d3320", stroke: "#10b981", glow: "#10b981" },
  path: { fill: "#3d2200", stroke: "#f97316", glow: "#f97316" },
};

export const GraphNode: React.FC<NodeProps> = ({
  id,
  x,
  y,
  status,
  distance,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.6 },
  });

  const scale = interpolate(scaleSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < appearFrame) return null;

  const colors = statusColors[status];
  const radius = 32;
  const distText = distance === Infinity ? "∞" : String(distance);

  const glowPulse =
    status === "current"
      ? interpolate(Math.sin((frame - appearFrame) * 0.15), [-1, 1], [0.3, 0.8])
      : status === "path"
        ? 0.6
        : 0;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {glowPulse > 0 && (
        <circle
          r={radius + 12}
          fill="none"
          stroke={colors.glow}
          strokeWidth={3}
          opacity={glowPulse}
        />
      )}
      {glowPulse > 0 && (
        <circle
          r={radius + 6}
          fill={colors.glow}
          opacity={glowPulse * 0.15}
        />
      )}
      <circle
        r={radius}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={2.5}
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={24}
        fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
        fontWeight={700}
      >
        {id}
      </text>
      <text
        y={radius + 20}
        textAnchor="middle"
        dominantBaseline="central"
        fill={distance === Infinity ? "#6b7280" : "#67e8f9"}
        fontSize={16}
        fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
        fontWeight={600}
      >
        {distText}
      </text>
    </g>
  );
};
