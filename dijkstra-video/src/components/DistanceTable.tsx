import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface DistanceTableProps {
  distances: Record<string, number>;
  visited: string[];
  currentNode: string;
  highlightNode?: string;
  appearFrame: number;
  nodeIds: string[];
}

export const DistanceTable: React.FC<DistanceTableProps> = ({
  distances,
  visited,
  currentNode,
  highlightNode,
  appearFrame,
  nodeIds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < appearFrame) return null;

  const fadeIn = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(fadeIn, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const rowHeight = 38;
  const headerHeight = 44;
  const tableWidth = 220;
  const tableHeight = headerHeight + nodeIds.length * rowHeight + 16;
  const tableX = 1920 - tableWidth - 50;
  const tableY = 60;

  return (
    <g opacity={opacity}>
      <rect
        x={tableX}
        y={tableY}
        width={tableWidth}
        height={tableHeight}
        rx={12}
        fill="rgba(15, 15, 30, 0.9)"
        stroke="rgba(100, 116, 139, 0.3)"
        strokeWidth={1.5}
      />
      <text
        x={tableX + tableWidth / 2}
        y={tableY + 28}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={14}
        fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
        fontWeight={700}
        letterSpacing={2}
      >
        DISTANCES
      </text>
      <line
        x1={tableX + 16}
        y1={tableY + headerHeight - 4}
        x2={tableX + tableWidth - 16}
        y2={tableY + headerHeight - 4}
        stroke="rgba(100, 116, 139, 0.2)"
        strokeWidth={1}
      />
      {nodeIds.map((nodeId, i) => {
        const rowY = tableY + headerHeight + i * rowHeight + rowHeight / 2 + 4;
        const dist = distances[nodeId];
        const distText = dist === Infinity ? "∞" : String(dist);
        const isVisited = visited.includes(nodeId);
        const isCurrent = nodeId === currentNode;
        const isHighlighted = nodeId === highlightNode;

        let rowBg = "transparent";
        if (isCurrent) rowBg = "rgba(245, 158, 11, 0.12)";
        else if (isHighlighted) rowBg = "rgba(6, 182, 212, 0.15)";

        let textColor = "#94a3b8";
        if (isCurrent) textColor = "#fbbf24";
        else if (isVisited) textColor = "#34d399";
        else if (isHighlighted) textColor = "#67e8f9";

        const distColor =
          isHighlighted ? "#67e8f9" : dist === Infinity ? "#4b5563" : "#e2e8f0";

        return (
          <g key={nodeId}>
            <rect
              x={tableX + 8}
              y={rowY - rowHeight / 2 + 2}
              width={tableWidth - 16}
              height={rowHeight - 4}
              rx={6}
              fill={rowBg}
            />
            <text
              x={tableX + 32}
              y={rowY + 2}
              textAnchor="start"
              dominantBaseline="central"
              fill={textColor}
              fontSize={18}
              fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
              fontWeight={600}
            >
              {nodeId}
            </text>
            {isCurrent && (
              <circle cx={tableX + 20} cy={rowY + 2} r={3} fill="#fbbf24" />
            )}
            <text
              x={tableX + tableWidth - 32}
              y={rowY + 2}
              textAnchor="end"
              dominantBaseline="central"
              fill={distColor}
              fontSize={18}
              fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
              fontWeight={700}
            >
              {distText}
            </text>
          </g>
        );
      })}
    </g>
  );
};
