import { create } from "zustand";

import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";

import type {
    AwsNode,
} from "@/components/whiteboard/types";

type WhiteboardState = {
  nodes: AwsNode[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  addNode: (node: AwsNode) => void;
  updateNode: (
    nodeId: string,
    data: Record<string, unknown>
  ) => void;
  deleteNode: (nodeId: string) => void;

  addEdge: (connection: Connection) => void;
};

export const useWhiteboardStore =
  create<WhiteboardState>((set) => ({
    nodes: [
      {
        id: "api-gateway",
        position: { x: 100, y: 100 },
        data: {
          label: "API Gateway",
          type: "apiGateway",
          category: "compute",
        },
        type: "aws",
      },
    ],

    edges: [],

    onNodesChange: (changes) =>
      set((state) => ({
        nodes: applyNodeChanges(
          changes,
          state.nodes
        ),
      })),

    onEdgesChange: (changes) =>
      set((state) => ({
        edges: applyEdgeChanges(
          changes,
          state.edges
        ),
      })),

    addNode: (node) =>
      set((state) => ({
        nodes: [...state.nodes, node],
      })),

    updateNode: (nodeId, data) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data,
              }
            : node
        ),
      })),

    deleteNode: (nodeId) =>
      set((state) => ({
        nodes: state.nodes.filter(
          (node) => node.id !== nodeId
        ),

        edges: state.edges.filter(
          (edge) =>
            edge.source !== nodeId &&
            edge.target !== nodeId
        ),
      })),

    addEdge: (connection) =>
      set((state) => ({
        edges: addEdge(
          connection,
          state.edges
        ),
      })),
  }));