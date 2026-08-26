"use client";

import { ReactFlow, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NodePalette from "./NodePalette";
import AwsNode from "./AwsNode";

import { AwsComponent } from "./types";

const initialNodes = [
  {
    id: "api-gateway",
    position: { x: 100, y: 100 },
    data: { label: "API Gateway" },
  },
  {
    id: "lambda",
    position: { x: 400, y: 100 },
    data: { label: "Lambda" },
  },
];

const initialEdges = [
  {
    id: "test1",
    source: "api-gateway",
    target:"lambda"
  }
]

const nodeTypes = {
  aws: AwsNode,
}

export default function Whiteboard() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (connection) => {
    console.log("connection: ", connection)
    setEdges((currentEdges) => 
      addEdge(connection, currentEdges)
    );
  };

  const addNode = (component: AwsComponent) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "aws",
      position: {
        x: 200,
        y:  200 + nodes.length * 50,
      },
      data: {
        label: component.label,
        type: component.type,
        category: component.category,
      },
    };

    setNodes((currentNodes) => [
      ...currentNodes,
      newNode,
    ]);
  };

  return (
    <div style={{ width: "100%", height: "100vh", color:"red", display: "flex" }}>
      <button onClick={addNode}>
        Add Node
      </button>

      <NodePalette onAddNode={addNode} />

      <div style={{flex: 1}}>

        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>

    </div>
  );
}