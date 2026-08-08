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
  height = 60,
  label = "Load",
  opacity = 1,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <defs>
        <linearGradient id={`box-grad-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
      </defs>
      <rect
        x={-width / 2}
        y={0}
        width={width}
        height={height}
        rx={4}
        fill={`url(#box-grad-${x}-${y})`}
        stroke="#6B7280"
        strokeWidth={2}
      />
      <text
        x={0}
        y={height / 2 + 5}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize={14}
        fontWeight={700}
        fill="white"
      >
        {label}
      </text>
    </g>
  );
};
