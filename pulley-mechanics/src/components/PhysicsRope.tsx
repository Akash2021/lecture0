import React from "react";

interface Segment {
  points: [number, number][];
  tension?: number;
  highlight?: boolean;
  segmentLabel?: string;
}

interface PhysicsRopeProps {
  segments: Segment[];
  progress?: number;
  baseColor?: string;
  highlightColor?: string;
  strokeWidth?: number;
}

export const PhysicsRope: React.FC<PhysicsRopeProps> = ({
  segments,
  progress = 1,
  baseColor = "#FFD60A",
  highlightColor = "#06D6A0",
  strokeWidth = 4,
}) => {
  return (
    <g>
      {segments.map((seg, si) => {
        if (seg.points.length < 2) return null;
        const d = seg.points
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
          .join(" ");

        const totalLen = seg.points.reduce((acc, p, i) => {
          if (i === 0) return 0;
          const prev = seg.points[i - 1];
          return acc + Math.hypot(p[0] - prev[0], p[1] - prev[1]);
        }, 0);

        const color = seg.highlight ? highlightColor : baseColor;

        const midX =
          seg.points.reduce((a, p) => a + p[0], 0) / seg.points.length;
        const midY =
          seg.points.reduce((a, p) => a + p[1], 0) / seg.points.length;

        return (
          <g key={si}>
            <path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLen}
              strokeDashoffset={totalLen * (1 - progress)}
              opacity={seg.highlight ? 1 : 0.8}
            />
            {seg.segmentLabel && progress >= 1 && (
              <g>
                <rect
                  x={midX - 18}
                  y={midY - 10}
                  width={36}
                  height={20}
                  rx={4}
                  fill="#0D1B2A"
                  stroke={highlightColor}
                  strokeWidth={1}
                  opacity={0.9}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={11}
                  fontWeight={700}
                  fill={highlightColor}
                >
                  {seg.segmentLabel}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
