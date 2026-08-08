import React from "react";

interface PulleyWheelProps {
  x: number;
  y: number;
  radius?: number;
  rotation?: number;
  color?: string;
}

export const PulleyWheel: React.FC<PulleyWheelProps> = ({
  x,
  y,
  radius = 40,
  rotation = 0,
  color = "#9CA3AF",
}) => {
  const spokeCount = 6;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <circle
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={6}
      />
      <circle
        r={radius - 4}
        fill="none"
        stroke={`${color}44`}
        strokeWidth={2}
      />
      {Array.from({ length: spokeCount }).map((_, i) => {
        const angle = (i / spokeCount) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={Math.cos(angle) * (radius - 8)}
            y2={Math.sin(angle) * (radius - 8)}
            stroke={`${color}88`}
            strokeWidth={2}
          />
        );
      })}
      <circle r={6} fill={color} />
      <circle r={3} fill="#0F1117" />
    </g>
  );
};
