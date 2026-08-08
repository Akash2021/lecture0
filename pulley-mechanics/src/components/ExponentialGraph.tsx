import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface ExponentialGraphProps {
  delay: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export const ExponentialGraph: React.FC<ExponentialGraphProps> = ({
  delay,
  x = 0,
  y = 0,
  width = 360,
  height = 220,
}) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame - delay, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const margin = 40;
  const plotW = width - margin * 2;
  const plotH = height - margin * 2;

  const maxPulleys = 5;
  const dataPoints = Array.from({ length: 50 }, (_, i) => {
    const pulleys = (i / 49) * maxPulleys;
    const effort = 100 / Math.pow(2, pulleys);
    return {
      px: margin + (pulleys / maxPulleys) * plotW,
      py: margin + (1 - effort / 100) * plotH,
    };
  });

  const visibleCount = Math.round(dataPoints.length * drawProgress);
  const pathD = dataPoints
    .slice(0, visibleCount)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.px} ${p.py}`)
    .join(" ");

  const tickValues = [0, 1, 2, 3, 4, 5];
  const effortTicks = [0, 25, 50, 75, 100];

  return (
    <div style={{ position: "absolute", left: x, top: y, opacity }}>
      <svg width={width} height={height}>
        {/* Grid */}
        {tickValues.map((v) => {
          const tx = margin + (v / maxPulleys) * plotW;
          return (
            <g key={`x-${v}`}>
              <line x1={tx} y1={margin} x2={tx} y2={margin + plotH} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <text x={tx} y={height - 8} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={11} fill="rgba(255,255,255,0.4)">
                {v}
              </text>
            </g>
          );
        })}
        {effortTicks.map((v) => {
          const ty = margin + (1 - v / 100) * plotH;
          return (
            <g key={`y-${v}`}>
              <line x1={margin} y1={ty} x2={margin + plotW} y2={ty} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <text x={margin - 8} y={ty + 4} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize={11} fill="rgba(255,255,255,0.4)">
                {v}N
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={margin} y1={margin} x2={margin} y2={margin + plotH} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />
        <line x1={margin} y1={margin + plotH} x2={margin + plotW} y2={margin + plotH} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />

        {/* Curve */}
        {visibleCount > 1 && (
          <path d={pathD} fill="none" stroke="#00B4D8" strokeWidth={2.5} strokeLinecap="round" />
        )}

        {/* Data point dots at integer pulleys */}
        {[1, 2, 3, 4].map((n) => {
          const effort = 100 / Math.pow(2, n);
          const px = margin + (n / maxPulleys) * plotW;
          const py = margin + (1 - effort / 100) * plotH;
          const dotOpacity = interpolate(
            frame - delay - 15 - n * 10,
            [0, 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <g key={n} opacity={dotOpacity}>
              <circle cx={px} cy={py} r={5} fill="#00B4D8" />
              <text x={px + 10} y={py - 8} fontFamily="'JetBrains Mono', monospace" fontSize={12} fontWeight={600} fill="#FFD60A">
                {Math.round(effort)}N
              </text>
            </g>
          );
        })}

        {/* Labels */}
        <text x={width / 2} y={height - 0} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={12} fill="rgba(255,255,255,0.5)">
          Movable Pulleys
        </text>
        <text x={12} y={margin - 10} fontFamily="Inter, sans-serif" fontSize={12} fill="rgba(255,255,255,0.5)">
          Effort
        </text>
      </svg>
    </div>
  );
};
