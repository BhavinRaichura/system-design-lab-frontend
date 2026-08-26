"use client"

import {
    Handle, 
    Position
} from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";
import type { AwsNode } from "./types";

export default function AwsNode({
    data,
    selected
}: NodeProps<AwsNode>) {
    return (
    <div
      style={{
        padding: "12px 20px",
        borderRadius: "8px",
        background: "white",
        minWidth: "140px",
        textAlign: "center",
        color: "red",
        border: selected
            ? "2px solid blue"
            : "1px solid #333",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
      />

      <div style={{ fontSize: "24px" }}>
            {data.icon}
        </div>

      <div>{data.label}</div>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}

