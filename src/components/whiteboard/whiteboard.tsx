"use client";

import React, { useState } from "react";

import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Controls,
  MiniMap,
  MarkerType,
} from "@xyflow/react";

import type { Node, Connection } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useWhiteboardStore } from "@/store/whiteboardStore";

import NodePalette from "./NodePalette";
import AwsNode from "./AwsNode";
import PropertiesPanel from "./PropertiesPanel";

import type { AwsComponent } from "./types";
import WhiteBoardToolbar from "./WhiteboardToolbar";

const nodeTypes = {
  aws: AwsNode,
};

export function WhiteboardCanvas() {
  const nodes = useWhiteboardStore((state) => state.nodes);

  const edges = useWhiteboardStore((state) => state.edges);

  const onNodesChange = useWhiteboardStore((state) => state.onNodesChange);

  const onEdgesChange = useWhiteboardStore((state) => state.onEdgesChange);

  const addNodeToStore = useWhiteboardStore((state) => state.addNode);

  const updateNode = useWhiteboardStore((state) => state.updateNode);

  const deleteNode = useWhiteboardStore((state) => state.deleteNode);

  const addEdgeToStore = useWhiteboardStore((state) => state.addEdge);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const { screenToFlowPosition } = useReactFlow();

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onUpdateNode = (nodeId: string, data: Record<string, unknown>) => {
    updateNode(nodeId, data);

    setSelectedNode((currentNode) =>
      currentNode && currentNode.id === nodeId
        ? {
            ...currentNode,
            data,
          }
        : currentNode,
    );
  };

  const onDeleteNode = (nodeId: string) => {
    deleteNode(nodeId);
    setSelectedNode(null);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onConnect = (connection: Connection) => {
    addEdgeToStore({
      ...connection,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    });
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("application/reactflow");

    if (!data) {
      return;
    }

    const component: AwsComponent = JSON.parse(data);

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "aws",
      position,
      data: {
        label: component.label,
        type: component.type,
        category: component.category,
        icon: component.icon,
      },
    };

    addNodeToStore(newNode);
  };

  const addNode = (component: AwsComponent) => {
    const newNode = {
      id: `node-${crypto.randomUUID()}`,
      type: "aws",
      position: {
        x: 200,
        y: 200 + nodes.length * 50,
      },
      data: {
        label: component.label,
        type: component.type,
        category: component.category,
        icon: component.icon,
      },
    };

    addNodeToStore(newNode);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <NodePalette onAddNode={addNode} />

      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <WhiteBoardToolbar />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          deleteKeyCode={["Backspace", "Delete"]}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <PropertiesPanel
        selectedNode={selectedNode}
        onUpdateNode={onUpdateNode}
        onDeleteNode={onDeleteNode}
      />
    </div>
  );
}

export default function Whiteboard() {
  return (
    <ReactFlowProvider>
      <WhiteboardCanvas />
    </ReactFlowProvider>
  );
}
