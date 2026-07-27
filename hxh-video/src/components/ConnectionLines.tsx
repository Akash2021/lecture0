import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface NodePoint {
  x: number;
  y: number;
  label: string;
}

interface ConnectionLinesProps {
  nodes: NodePoint[];
  appearFrame: number;
  drawDuration: number;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  nodes,
  appearFrame,
  drawDuration,
}) => {
  const frame = useCurrentFrame();

  if (frame < appearFrame) return null;

  const elapsed = frame - appearFrame;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
      }}
    >
      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        const next = nodes[i + 1];
        const lineStart = i * (drawDuration / (nodes.length - 1));
        const lineEnd = lineStart + drawDuration / (nodes.length - 1);

        const progress = interpolate(elapsed, [lineStart, lineEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const dx = next.x - node.x;
        const dy = next.y - node.y;

        return (
          <line
            key={i}
            x1={node.x}
            y1={node.y}
            x2={node.x + dx * progress}
            y2={node.y + dy * progress}
            stroke="#cc0000"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(204, 0, 0, 0.6))" }}
          />
        );
      })}

      {nodes.map((node, i) => {
        const nodeAppear = i * (drawDuration / nodes.length);
        const nodeOpacity = interpolate(elapsed, [nodeAppear, nodeAppear + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <g key={`node-${i}`} opacity={nodeOpacity}>
            <circle
              cx={node.x}
              cy={node.y}
              r={40}
              fill="rgba(204, 0, 0, 0.15)"
              stroke="#cc0000"
              strokeWidth={2}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#fff"
              fontSize={14}
              fontFamily="sans-serif"
              fontWeight={700}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
