import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight: number;
  status: "default" | "exploring" | "path";
  appearFrame: number;
}

export const GraphEdge: React.FC<EdgeProps> = ({
  x1,
  y1,
  x2,
  y2,
  weight,
  status,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < appearFrame) return null;

  const progress = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.8 },
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len;
  const ny = dy / len;

  const nodeRadius = 32;
  const sx = x1 + nx * nodeRadius;
  const sy = y1 + ny * nodeRadius;
  const ex = x2 - nx * nodeRadius;
  const ey = y2 - ny * nodeRadius;

  const cx = (sx + ex) / 2;
  const cy = (sy + ey) / 2;

  const perpX = -ny * 12;
  const perpY = nx * 12;

  const drawEx = interpolate(progress, [0, 1], [sx, ex], { extrapolateRight: "clamp" });
  const drawEy = interpolate(progress, [0, 1], [sy, ey], { extrapolateRight: "clamp" });

  let strokeColor = "rgba(100, 116, 139, 0.5)";
  let strokeWidth = 1.8;
  let glowFilter = "";

  if (status === "exploring") {
    strokeColor = "#3b82f6";
    strokeWidth = 3;
    const pulse = interpolate(
      Math.sin((frame - appearFrame) * 0.2),
      [-1, 1],
      [0.6, 1]
    );
    glowFilter = `drop-shadow(0 0 ${6 * pulse}px ${strokeColor})`;
  } else if (status === "path") {
    strokeColor = "#f97316";
    strokeWidth = 4;
    glowFilter = "drop-shadow(0 0 8px #f97316)";
  }

  const labelOpacity = interpolate(progress, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g style={{ filter: glowFilter }}>
      <line
        x1={sx}
        y1={sy}
        x2={drawEx}
        y2={drawEy}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {progress > 0.5 && (
        <g opacity={labelOpacity}>
          <rect
            x={cx + perpX - 14}
            y={cy + perpY - 12}
            width={28}
            height={24}
            rx={6}
            fill="#1a1a2e"
            stroke="rgba(100,116,139,0.3)"
            strokeWidth={1}
          />
          <text
            x={cx + perpX}
            y={cy + perpY + 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#94a3b8"
            fontSize={14}
            fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
            fontWeight={600}
          >
            {weight}
          </text>
        </g>
      )}
    </g>
  );
};
