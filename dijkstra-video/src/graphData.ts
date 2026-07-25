export interface NodeData {
  id: string;
  x: number;
  y: number;
}

export interface EdgeData {
  from: string;
  to: string;
  weight: number;
}

export interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
  startNode: string;
  endNode: string;
}

export const graphData: GraphData = {
  nodes: [
    { id: "A", x: 140, y: 360 },
    { id: "B", x: 380, y: 160 },
    { id: "C", x: 380, y: 560 },
    { id: "D", x: 650, y: 300 },
    { id: "E", x: 650, y: 520 },
    { id: "F", x: 920, y: 180 },
    { id: "G", x: 920, y: 460 },
    { id: "H", x: 1140, y: 340 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 5 },
    { from: "B", to: "F", weight: 10 },
    { from: "C", to: "D", weight: 8 },
    { from: "C", to: "E", weight: 3 },
    { from: "D", to: "F", weight: 2 },
    { from: "D", to: "G", weight: 6 },
    { from: "E", to: "G", weight: 1 },
    { from: "F", to: "H", weight: 3 },
    { from: "G", to: "H", weight: 5 },
  ],
  startNode: "A",
  endNode: "H",
};
