import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { GraphNode } from "./components/Node";
import { GraphEdge } from "./components/Edge";
import { DistanceTable } from "./components/DistanceTable";
import { CodePanel } from "./components/CodePanel";
import { graphData } from "./graphData";
import { runDijkstra, getShortestPath, DijkstraStep } from "./dijkstra";

const steps = runDijkstra(graphData);
const lastStep = steps[steps.length - 1];
const shortestPath = getShortestPath(lastStep.previous, graphData.endNode);
const shortestPathEdges: Array<{ from: string; to: string }> = [];
for (let i = 0; i < shortestPath.length - 1; i++) {
  shortestPathEdges.push({ from: shortestPath[i], to: shortestPath[i + 1] });
}

const INTRO_START = 0;
const INTRO_END = 90;
const GRAPH_START = 90;
const GRAPH_END = 180;
const INIT_START = 180;
const INIT_END = 270;

const STEP_DURATION = 35;
const ALGO_START = 270;
const ALGO_END = ALGO_START + steps.length * STEP_DURATION;

const PATH_START = ALGO_END;
const PATH_DURATION = 240;
const PATH_END = PATH_START + PATH_DURATION;

const OUTRO_START = PATH_END;
const TOTAL_FRAMES = OUTRO_START + 210;

export const COMPOSITION_DURATION = TOTAL_FRAMES;

const nodeMap: Record<string, { x: number; y: number }> = {};
for (const n of graphData.nodes) {
  nodeMap[n.id] = { x: n.x, y: n.y };
}

function getNodePosition(id: string) {
  return nodeMap[id] || { x: 0, y: 0 };
}

function getCurrentStep(frame: number): DijkstraStep | null {
  if (frame < ALGO_START) return steps[0];
  const idx = Math.min(
    Math.floor((frame - ALGO_START) / STEP_DURATION),
    steps.length - 1
  );
  return steps[idx];
}

function getExploringEdge(
  frame: number
): { from: string; to: string } | null {
  const step = getCurrentStep(frame);
  if (!step) return null;
  if (step.type === "explore" || step.type === "relax") {
    return { from: step.edgeFrom!, to: step.edgeTo! };
  }
  return null;
}

export const DijkstraVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentStep = getCurrentStep(frame);
  const distances = currentStep?.distances || {};
  const visited = currentStep?.visited || [];
  const currentNode = currentStep?.currentNode || "";
  const codeLine = currentStep?.codeLine ?? -1;
  const exploringEdge = getExploringEdge(frame);

  const isPathPhase = frame >= PATH_START;
  const isOutroPhase = frame >= OUTRO_START;

  const highlightNode = currentStep?.neighbor;

  const graphOffsetX = 240;
  const graphOffsetY = 160;

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill>
        <svg width={1920} height={1080}>
          {/* === INTRO === */}
          {frame >= INTRO_START && frame < GRAPH_START + 30 && (
            <g>
              {(() => {
                const titleOpacity = interpolate(
                  frame,
                  [INTRO_START, INTRO_START + 20, INTRO_END - 10, INTRO_END + 20],
                  [0, 1, 1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const titleY = interpolate(
                  frame,
                  [INTRO_START, INTRO_START + 30],
                  [460, 420],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const subtitleOpacity = interpolate(
                  frame,
                  [INTRO_START + 20, INTRO_START + 40, INTRO_END - 10, INTRO_END + 20],
                  [0, 1, 1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <>
                    <text
                      x={960}
                      y={titleY}
                      textAnchor="middle"
                      fill="white"
                      fontSize={72}
                      fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
                      fontWeight={800}
                      opacity={titleOpacity}
                      letterSpacing={-2}
                    >
                      Dijkstra's Algorithm
                    </text>
                    <text
                      x={960}
                      y={titleY + 60}
                      textAnchor="middle"
                      fill="#67e8f9"
                      fontSize={28}
                      fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
                      fontWeight={400}
                      opacity={subtitleOpacity}
                      letterSpacing={4}
                    >
                      FINDING THE SHORTEST PATH
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {/* === GRAPH EDGES === */}
          {frame >= GRAPH_START && (
            <g
              transform={`translate(${graphOffsetX}, ${graphOffsetY})`}
              opacity={interpolate(
                frame,
                [OUTRO_START - 30, OUTRO_START + 30],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}
            >
              {graphData.edges.map((edge, i) => {
                const fromPos = getNodePosition(edge.from);
                const toPos = getNodePosition(edge.to);
                const edgeAppear = GRAPH_START + i * 5;

                let edgeStatus: "default" | "exploring" | "path" = "default";

                if (
                  isPathPhase &&
                  shortestPathEdges.some(
                    (pe) =>
                      (pe.from === edge.from && pe.to === edge.to) ||
                      (pe.from === edge.to && pe.to === edge.from)
                  )
                ) {
                  const pathIdx = shortestPathEdges.findIndex(
                    (pe) =>
                      (pe.from === edge.from && pe.to === edge.to) ||
                      (pe.from === edge.to && pe.to === edge.from)
                  );
                  const revealFrame =
                    PATH_START + pathIdx * 30;
                  if (frame >= revealFrame) {
                    edgeStatus = "path";
                  }
                } else if (
                  exploringEdge &&
                  ((exploringEdge.from === edge.from &&
                    exploringEdge.to === edge.to) ||
                    (exploringEdge.from === edge.to &&
                      exploringEdge.to === edge.from))
                ) {
                  edgeStatus = "exploring";
                }

                return (
                  <GraphEdge
                    key={`${edge.from}-${edge.to}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    weight={edge.weight}
                    status={edgeStatus}
                    appearFrame={edgeAppear}
                  />
                );
              })}
            </g>
          )}

          {/* === GRAPH NODES === */}
          {frame >= GRAPH_START && (
            <g
              transform={`translate(${graphOffsetX}, ${graphOffsetY})`}
              opacity={interpolate(
                frame,
                [OUTRO_START - 30, OUTRO_START + 30],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}
            >
              {graphData.nodes.map((node, i) => {
                const nodeAppear = GRAPH_START + 30 + i * 8;

                let nodeStatus: "unseen" | "current" | "visited" | "path" =
                  "unseen";

                if (isPathPhase && shortestPath.includes(node.id)) {
                  nodeStatus = "path";
                } else if (frame >= INIT_START) {
                  if (node.id === currentNode) {
                    nodeStatus = "current";
                  } else if (visited.includes(node.id)) {
                    nodeStatus = "visited";
                  }
                }

                const dist =
                  frame >= INIT_START
                    ? distances[node.id] ?? Infinity
                    : Infinity;

                return (
                  <GraphNode
                    key={node.id}
                    id={node.id}
                    x={node.x}
                    y={node.y}
                    status={nodeStatus}
                    distance={
                      frame >= INIT_START && frame >= nodeAppear ? dist : Infinity
                    }
                    appearFrame={nodeAppear}
                  />
                );
              })}
            </g>
          )}

          {/* === DISTANCE TABLE === */}
          {frame >= INIT_START && !isOutroPhase && (
            <DistanceTable
              distances={distances}
              visited={visited}
              currentNode={currentNode}
              highlightNode={highlightNode}
              appearFrame={INIT_START}
              nodeIds={graphData.nodes.map((n) => n.id)}
            />
          )}

          {/* === CODE PANEL === */}
          {frame >= INIT_START && !isOutroPhase && (
            <CodePanel
              activeLine={codeLine}
              appearFrame={INIT_START + 15}
            />
          )}

          {/* === PATH REVEAL LABEL === */}
          {isPathPhase && (
            (() => {
              const labelOpacity = interpolate(
                frame,
                [PATH_START + 60, PATH_START + 90, OUTRO_START - 30, OUTRO_START + 10],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const totalDist = lastStep.distances[graphData.endNode];
              return (
                <g opacity={labelOpacity}>
                  <text
                    x={960}
                    y={980}
                    textAnchor="middle"
                    fill="#f97316"
                    fontSize={28}
                    fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
                    fontWeight={700}
                  >
                    Shortest Path: {shortestPath.join(" → ")}
                  </text>
                  <text
                    x={960}
                    y={1020}
                    textAnchor="middle"
                    fill="#67e8f9"
                    fontSize={22}
                    fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
                    fontWeight={600}
                  >
                    Total Distance: {totalDist}
                  </text>
                </g>
              );
            })()
          )}

          {/* === OUTRO === */}
          {isOutroPhase && (
            (() => {
              const outroProgress = spring({
                frame: frame - OUTRO_START,
                fps,
                config: { damping: 15, stiffness: 80 },
              });
              const outroOpacity = interpolate(outroProgress, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              });
              const totalDist = lastStep.distances[graphData.endNode];
              const fadeOutOpacity = interpolate(
                frame,
                [OUTRO_START + 150, OUTRO_START + 200],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <g opacity={outroOpacity * fadeOutOpacity}>
                  <text
                    x={960}
                    y={440}
                    textAnchor="middle"
                    fill="white"
                    fontSize={56}
                    fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
                    fontWeight={800}
                    letterSpacing={-1}
                  >
                    Shortest Path Found
                  </text>
                  <text
                    x={960}
                    y={510}
                    textAnchor="middle"
                    fill="#f97316"
                    fontSize={36}
                    fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
                    fontWeight={700}
                  >
                    {shortestPath.join(" → ")}
                  </text>
                  <text
                    x={960}
                    y={580}
                    textAnchor="middle"
                    fill="#67e8f9"
                    fontSize={30}
                    fontFamily="'SF Mono', 'Fira Code', 'Consolas', monospace"
                    fontWeight={600}
                  >
                    Distance: {totalDist}
                  </text>
                </g>
              );
            })()
          )}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
