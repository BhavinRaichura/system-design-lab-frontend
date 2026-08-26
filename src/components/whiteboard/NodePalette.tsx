"use client";

import { awsComponents } from "./awsComponents";
import { AwsComponent } from "./types";

type NodePaletteProps = {
  onAddNode: (component: AwsComponent) => void;
};

export default function NodePalette({
  onAddNode,
}: NodePaletteProps) {
  return (
    <div
      style={{
        width: "200px",
        padding: "16px",
        borderRight: "1px solid #ddd",
      }}
    >
      <h3>AWS Components</h3>

      {awsComponents.map((component) => (
        <button
          key={component.type}
          onClick={() =>
            onAddNode(component)
          }
          style={{
            display: "block",
            width: "100%",
            marginTop: "8px",
            padding: "8px",
          }}
        >
          {component.label}
        </button>
      ))}
    </div>
  );
}