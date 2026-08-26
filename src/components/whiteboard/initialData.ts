import type { Node, Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "api-gateway",
    position: { x: 100, y: 100 },
    type: "aws",
    data: {
      label: "API Gateway",
      type: "apiGateway",
      category: "compute",
    },
  },
];

export const initialEdges: Edge[] = [];