import React from "react";

interface RopeProps {
  points: [number, number][];
  progress?: number;
  color?: string;
  strokeWidth?: number;
}

export const Rope: React.FC<RopeProps> = ({
  points,
  progress = 1,
  color = "#F5A623",
  strokeWidth = 4,
}) => {
  if (points.length < 2) return null;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  const totalLength = points.reduce((acc, p, i) => {
    if (i === 0) return 0;
    const prev = points[i - 1];
    return acc + Math.hypot(p[0] - prev[0], p[1] - prev[1]);
  }, 0);

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={totalLength}
      strokeDashoffset={totalLength * (1 - progress)}
    />
  );
};
