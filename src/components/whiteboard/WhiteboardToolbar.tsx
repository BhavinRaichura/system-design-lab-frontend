"use client"

import { useReactFlow } from "@xyflow/react";

export default function WhiteBoardToolbar() {
    const { fitView } = useReactFlow();

    return (
        <div
        style={{
            position: "absolute",
            top: "16px",
            left: "220px",
            zIndex: 10,
            display: "flex",
            gap: "8px",
        }}
        >
        <button onClick={() => fitView()}>
            Fit View
        </button>
        </div>
    );
}