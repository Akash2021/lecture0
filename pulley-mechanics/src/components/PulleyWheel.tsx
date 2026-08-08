import React from "react";

interface PulleyWheelProps {
  x: number;
  y: number;
  radius?: number;
  rotation?: number;
  color?: string;
  label?: string;
}

export const PulleyWheel: React.FC<PulleyWheelProps> = ({
  x,
  y,
  radius = 30,
  rotation = 0,
  color = "#94A3B8",
  label,
}) => {
  const spokeCount = 6;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {label && (
        <text
          x={0}
          y={-radius - 10}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize={11}
          fill={color}
          opacity={0.7}
        >
          {label}
        </text>
      )}
      <g transform={`rotate(${rotation})`}>
        <circle r={radius} fill="none" stroke={color} strokeWidth={5} />
        <circle r={radius - 3} fill="none" stroke={`${color}33`} strokeWidth={1.5} />
        {Array.from({ length: spokeCount }).map((_, i) => {
          const a = (i / spokeCount) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={Math.cos(a) * (radius - 6)}
              y2={Math.sin(a) * (radius - 6)}
              stroke={`${color}66`}
              strokeWidth={1.5}
            />
          );
        })}
        <circle r={5} fill={color} />
        <circle r={2.5} fill="#0D1B2A" />
      </g>
    </g>
  );
};
