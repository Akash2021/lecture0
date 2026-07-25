import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface CodePanelProps {
  activeLine: number;
  appearFrame: number;
}

const codeLines = [
  "dist[source] = 0",
  "curr = min(unvisited)",
  "for neighbor of curr:",
  "  if dist[curr]+w < dist[n]:",
  "    dist[n] = dist[curr]+w",
  "return shortest path",
];

export const CodePanel: React.FC<CodePanelProps> = ({
  activeLine,
  appearFrame,
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

  const panelX = 50;
  const panelY = 780;
  const lineHeight = 28;
  const panelWidth = 340;
  const panelHeight = codeLines.length * lineHeight + 40;

  return (
    <g opacity={opacity}>
      <rect
        x={panelX}
        y={panelY}
        width={panelWidth}
        height={panelHeight}
        rx={12}
        fill="rgba(15, 15, 30, 0.9)"
        stroke="rgba(100, 116, 139, 0.3)"
        strokeWidth={1.5}
      />
      {codeLines.map((line, i) => {
        const isActive = i === activeLine;
        const yPos = panelY + 28 + i * lineHeight;

        return (
          <g key={i}>
            {isActive && (
              <rect
                x={panelX + 8}
                y={yPos - 10}
                width={panelWidth - 16}
                height={lineHeight - 2}
                rx={4}
                fill="rgba(59, 130, 246, 0.15)"
              />
            )}
            <text
              x={panelX + 20}
              y={yPos + 4}
              fill={isActive ? "#60a5fa" : "#4b5563"}
              fontSize={14}
              fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
              fontWeight={isActive ? 600 : 400}
            >
              {line}
            </text>
            {isActive && (
              <rect
                x={panelX + 8}
                y={yPos - 10}
                width={3}
                height={lineHeight - 2}
                rx={1.5}
                fill="#3b82f6"
              />
            )}
          </g>
        );
      })}
    </g>
  );
};
