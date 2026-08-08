import React from "react";

interface ForceArrowProps {
  x: number;
  y: number;
  angle: number;
  length: number;
  color?: string;
  label?: string;
  opacity?: number;
}

export const ForceArrow: React.FC<ForceArrowProps> = ({
  x,
  y,
  angle,
  length,
  color = "#22C55E",
  label,
  opacity = 1,
}) => {
  const rad = (angle * Math.PI) / 180;
  const endX = x + Math.cos(rad) * length;
  const endY = y + Math.sin(rad) * length;

  const headSize = 10;
  const headAngle1 = rad + Math.PI + 0.4;
  const headAngle2 = rad + Math.PI - 0.4;

  return (
    <g opacity={opacity}>
      <line
        x1={x}
        y1={y}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polygon
        points={`
          ${endX},${endY}
          ${endX + Math.cos(headAngle1) * headSize},${endY + Math.sin(headAngle1) * headSize}
          ${endX + Math.cos(headAngle2) * headSize},${endY + Math.sin(headAngle2) * headSize}
        `}
        fill={color}
      />
      {label && (
        <text
          x={endX + Math.cos(rad) * 16}
          y={endY + Math.sin(rad) * 16 + 5}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize={14}
          fontWeight={600}
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
};
