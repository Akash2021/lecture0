import React from "react";
import { Img, staticFile } from "remotion";
import { PanelConfig } from "../assets/panels";

interface PlaceholderPanelProps {
  panel: PanelConfig;
  style?: React.CSSProperties;
}

export const PlaceholderPanel: React.FC<PlaceholderPanelProps> = ({
  panel,
  style,
}) => {
  if (panel.imagePath) {
    return (
      <Img
        src={staticFile(panel.imagePath)}
        style={{
          width: panel.width,
          height: panel.height,
          objectFit: "cover",
          borderRadius: 8,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: panel.width,
        height: panel.height,
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        border: "2px solid #333",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span
        style={{
          color: "#555",
          fontSize: 18,
          fontFamily: "sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {panel.label}
      </span>
    </div>
  );
};
