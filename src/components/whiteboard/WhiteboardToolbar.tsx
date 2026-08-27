"use client";

import { useReactFlow } from "@xyflow/react";
import { useWhiteboardStore } from "@/store/whiteboardStore";

export default function WhiteBoardToolbar() {
  const { fitView } = useReactFlow();

  const nodes = useWhiteboardStore((state) => state.nodes);

  const edges = useWhiteboardStore((state) => state.edges);

  const setArchitecture = useWhiteboardStore((state) => state.setArchitecture);

  const exportArchitecture = () => {
    const architecture = {
      nodes,
      edges,
    };

    const json = JSON.stringify(architecture, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "architecture.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const importArchitecture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;

      if (typeof content !== "string") {
        return;
      }

      try {
        const architecture = JSON.parse(content);

        if (
          !Array.isArray(architecture.nodes) ||
          !Array.isArray(architecture.edges)
        ) {
          console.error("Invalid architecture file");

          return;
        }

        setArchitecture(architecture.nodes, architecture.edges);
      } catch (error) {
        console.error("Failed to parse architecture file", error);
      }
    };

    reader.readAsText(file);
  };

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
      <button onClick={() => fitView()}>Fit View</button>

      <button onClick={exportArchitecture}>Export</button>

      <label>
        Import
        <input
          type="file"
          accept=".json"
          onChange={importArchitecture}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
