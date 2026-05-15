import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";

export default function GraphView() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    axios.get("http://localhost:8000/api/graph").then((res) => {
      setGraphData(res.data);
    });
  }, []);

  return (
    <div style={{ height: "100%", background: "transparent" }}>
      <ForceGraph2D
        graphData={graphData}

        // ✅ Better spacing
        d3VelocityDecay={0.3}
        cooldownTicks={100}

        // ✅ LINKS (FIXED VISIBILITY)
        linkWidth={(link) => 2} // 🔥 make visible
        linkColor={() => "#94a3b8"} // light gray
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={() => "#94a3b8"}

        // ✅ LINK LABEL (RELATIONSHIP)
        linkCanvasObject={(link, ctx, globalScale) => {
          const label = link.label;
          if (!label) return;

          const start = link.source;
          const end = link.target;

          if (typeof start !== "object" || typeof end !== "object") return;

          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;

          const fontSize = 10 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "#e2e8f0";
          ctx.fillText(label, midX, midY);
        }}

        // ✅ NODES (CLEAN CIRCLES + ZOOM FIX)
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label =
            node.type === "user"
              ? `${node.name} (${node.role})`
              : node.name;

          // 🔥 Dynamic size (fix zoom issue)
          const size = 8 / globalScale;

          // Circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);

          // 🎨 Color
          ctx.fillStyle =
            node.type === "user" ? "#38bdf8" : "#22c55e";

          ctx.fill();

          // ✨ White border (better visibility)
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1 / globalScale;
          ctx.stroke();

          // 🏷 Label
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "#ffffff";
          ctx.fillText(label, node.x + size + 2, node.y + size / 2);
        }}

        // ✅ Draw links UNDER nodes (important)
        linkCanvasObjectMode={() => "after"}
      />
    </div>
  );
}