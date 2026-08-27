"use client";

import { useState } from "react";
import { awsComponents } from "./awsComponents";
import { AwsComponent } from "./types";

type NodePaletteProps = {
  onAddNode: (component: AwsComponent) => void;
};

export default function NodePalette({ onAddNode }: NodePaletteProps) {
  const [search, setSearch] = useState("");

  const filteredComponents = awsComponents.filter((component) =>
    component.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        width: "200px",
        padding: "16px",
        borderRight: "1px solid #ddd",
      }}
    >
      <h3>AWS Components</h3>

      <input
        type="text"
        placeholder="Search AWS services..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      {search && <button onClick={() => setSearch("")}>Clear</button>}

      {filteredComponents.length === 0 ? (
        <p>No services found</p>
      ) : (
        filteredComponents.map((component) => (
          <div
            key={component.type}
            onClick={() => onAddNode(component)}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData(
                "application/reactflow",
                JSON.stringify(component),
              );
            }}
            style={{
              padding: "8px",
              marginTop: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "grab",
            }}
          >
            {component.label}
          </div>
        ))
      )}
    </div>
  );
}
