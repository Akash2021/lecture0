import { GraphData } from "./graphData";

export interface DijkstraStep {
  type: "init" | "visit" | "explore" | "relax" | "skip" | "done";
  currentNode: string;
  neighbor?: string;
  edgeFrom?: string;
  edgeTo?: string;
  oldDist?: number;
  newDist?: number;
  distances: Record<string, number>;
  visited: string[];
  previous: Record<string, string | null>;
  codeLine: number;
}

export function runDijkstra(graph: GraphData): DijkstraStep[] {
  const steps: DijkstraStep[] = [];
  const distances: Record<string, number> = {};
  const visited: string[] = [];
  const previous: Record<string, string | null> = {};

  const adjacency: Record<string, { node: string; weight: number }[]> = {};
  for (const node of graph.nodes) {
    adjacency[node.id] = [];
    distances[node.id] = Infinity;
    previous[node.id] = null;
  }
  for (const edge of graph.edges) {
    adjacency[edge.from].push({ node: edge.to, weight: edge.weight });
    adjacency[edge.to].push({ node: edge.from, weight: edge.weight });
  }

  distances[graph.startNode] = 0;

  steps.push({
    type: "init",
    currentNode: graph.startNode,
    distances: { ...distances },
    visited: [...visited],
    previous: { ...previous },
    codeLine: 0,
  });

  while (visited.length < graph.nodes.length) {
    let minDist = Infinity;
    let current = "";
    for (const node of graph.nodes) {
      if (!visited.includes(node.id) && distances[node.id] < minDist) {
        minDist = distances[node.id];
        current = node.id;
      }
    }

    if (current === "" || minDist === Infinity) break;

    steps.push({
      type: "visit",
      currentNode: current,
      distances: { ...distances },
      visited: [...visited],
      previous: { ...previous },
      codeLine: 1,
    });

    visited.push(current);

    for (const neighbor of adjacency[current]) {
      if (visited.includes(neighbor.node)) continue;

      const newDist = distances[current] + neighbor.weight;
      const oldDist = distances[neighbor.node];

      steps.push({
        type: "explore",
        currentNode: current,
        neighbor: neighbor.node,
        edgeFrom: current,
        edgeTo: neighbor.node,
        oldDist,
        newDist,
        distances: { ...distances },
        visited: [...visited],
        previous: { ...previous },
        codeLine: 2,
      });

      if (newDist < oldDist) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = current;

        steps.push({
          type: "relax",
          currentNode: current,
          neighbor: neighbor.node,
          edgeFrom: current,
          edgeTo: neighbor.node,
          oldDist,
          newDist,
          distances: { ...distances },
          visited: [...visited],
          previous: { ...previous },
          codeLine: 3,
        });
      } else {
        steps.push({
          type: "skip",
          currentNode: current,
          neighbor: neighbor.node,
          edgeFrom: current,
          edgeTo: neighbor.node,
          oldDist,
          newDist,
          distances: { ...distances },
          visited: [...visited],
          previous: { ...previous },
          codeLine: 2,
        });
      }
    }

    if (current === graph.endNode) break;
  }

  steps.push({
    type: "done",
    currentNode: graph.endNode,
    distances: { ...distances },
    visited: [...visited],
    previous: { ...previous },
    codeLine: 4,
  });

  return steps;
}

export function getShortestPath(
  previous: Record<string, string | null>,
  endNode: string
): string[] {
  const path: string[] = [];
  let current: string | null = endNode;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  return path;
}
