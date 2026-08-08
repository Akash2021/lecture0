import React from "react";

interface LoadBoxProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label?: string;
  opacity?: number;
}

export const LoadBox: React.FC<LoadBoxProps> = ({
  x,
  y,
  width = 80,
  height = 55,
  label = "100N",
  opacity = 1,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <defs>
        <linearGradient id={`lb-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <rect
        x={-width / 2}
        y={0}
        width={width}
        height={height}
        rx={5}
        fill={`url(#lb-${x}-${y})`}
        stroke="#475569"
        strokeWidth={2}
      />
      <text
        x={0}
        y={height / 2 + 6}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={16}
        fontWeight={700}
        fill="white"
      >
        {label}
      </text>
    </g>
  );
};
