"use client";

import { Handle, Position } from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";
import type { AwsNode } from "./types";
import { awsIcons } from "./awsIcons";

export default function AwsNode({ data, selected }: NodeProps<AwsNode>) {
  return (
    <div
      style={{
        padding: "12px 20px",
        borderRadius: "8px",
        background: "white",
        minWidth: "140px",
        textAlign: "center",
        color: "red",
        border: selected ? "2px solid blue" : "1px solid #333",
      }}
    >
      <Handle type="target" position={Position.Left} />

      <div style={{ fontSize: "24px", display:"flex", justifyContent:"center" }}>
        <img
          src={awsIcons[data.type]}
          alt={data.label}
          width={32}
          height={32}
        />
      </div>
      <div>{data.label}</div>

      <div
        style={{
          fontSize: "11px",
          color: "#777",
          marginTop: "4px",
        }}
      >
        {data.category}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
