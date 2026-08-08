import React from "react";

interface ForceArrowProps {
  x: number;
  y: number;
  angle: number;
  force: number;
  maxForce?: number;
  maxLength?: number;
  color?: string;
  label?: string;
  opacity?: number;
}

export const ForceArrow: React.FC<ForceArrowProps> = ({
  x,
  y,
  angle,
  force,
  maxForce = 100,
  maxLength = 100,
  color = "#00B4D8",
  label,
  opacity = 1,
}) => {
  const length = (force / maxForce) * maxLength;
  const rad = (angle * Math.PI) / 180;
  const endX = x + Math.cos(rad) * length;
  const endY = y + Math.sin(rad) * length;
  const headSize = Math.max(8, length * 0.15);
  const h1 = rad + Math.PI + 0.4;
  const h2 = rad + Math.PI - 0.4;

  if (force <= 0) return null;

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
        points={`${endX},${endY} ${endX + Math.cos(h1) * headSize},${endY + Math.sin(h1) * headSize} ${endX + Math.cos(h2) * headSize},${endY + Math.sin(h2) * headSize}`}
        fill={color}
      />
      {label && (
        <text
          x={endX + Math.cos(rad) * 18}
          y={endY + Math.sin(rad) * 18 + 4}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize={15}
          fontWeight={600}
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
};
