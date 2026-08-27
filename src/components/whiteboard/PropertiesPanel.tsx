"use client";

import type { Node } from "@xyflow/react";

type PropertiesPanelProps = {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => void;
  onDeleteNode: (nodeId: string) => void;
};

export default function PropertiesPanel({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
}: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div
        style={{
          color: "#777",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p>Select a component</p>
        <small>Click a node to view its properties</small>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "250px",
        padding: "16px",
        borderLeft: "1px solid #ddd",
      }}
    >
      <h3>Properties</h3>

      <label>Name</label>

      <input
        value={String(selectedNode.data.label)}
        onChange={(event) =>
          onUpdateNode(selectedNode.id, {
            ...selectedNode.data,
            label: event.target.value,
          })
        }
        style={{ border: "2px solid yellow", width: "auto" }}
      />

      <p>
        <strong>Type:</strong> {String(selectedNode.data.type)}
      </p>

      <p>
        <strong>Category:</strong> {String(selectedNode.data.category)}
      </p>

      <p>
        <strong>ID:</strong> {selectedNode.id}
      </p>

      <button
        onClick={() => onDeleteNode(selectedNode.id)}
        style={{
          marginTop: "20px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Delete Node
      </button>
    </div>
  );
}
