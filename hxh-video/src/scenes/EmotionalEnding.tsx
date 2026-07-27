import React from "react";
import {
  interpolate,
  useCurrentFrame,
} from "remotion";
import { panels } from "../assets/panels";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { CountdownBadge } from "../components/CountdownBadge";

// Voiceover narration (45-57s):
// "But he's not alone. Not really. He has friends he trusts more
//  than himself. And that... might be enough."

export const EmotionalEnding: React.FC = () => {
  const frame = useCurrentFrame();

  // Silhouettes fade in slowly
  const silhouetteOpacity = interpolate(frame, [0, 90], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vignette
  const vignetteOpacity = interpolate(frame, [0, 60], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fade
  const textOpacity = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Silence window: frames 150-165 (global 1500-1515)
  // Music volume swell handled in Root.tsx via Audio volume prop

  // Countdown fades out
  const countdownOpacity = interpolate(frame, [200, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0d0d0d",
        position: "relative",
        overflow: "hidden",
        filter: "sepia(0.6) brightness(0.8)",
      }}
    >
      {/* Gon silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 400,
          left: 150,
          opacity: silhouetteOpacity,
        }}
      >
        <PlaceholderPanel
          panel={panels.gonSilhouette}
          style={{
            width: 300,
            height: 520,
            background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
            border: "none",
          }}
        />
      </div>

      {/* Killua silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 400,
          right: 150,
          opacity: silhouetteOpacity,
        }}
      >
        <PlaceholderPanel
          panel={panels.killuaSilhouette}
          style={{
            width: 300,
            height: 520,
            background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
            border: "none",
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
          opacity: vignetteOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Emotional text */}
      <div
        style={{
          position: "absolute",
          top: 800,
          width: 1080,
          textAlign: "center",
          opacity: textOpacity,
          padding: "0 100px",
        }}
      >
        <span
          style={{
            color: "#e0d5c0",
            fontSize: 36,
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.6,
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          He has friends he trusts more than himself...
        </span>
      </div>

      {/* Countdown fades out */}
      <div style={{ opacity: countdownOpacity }}>
        <CountdownBadge visible={true} pulse={false} />
      </div>
    </div>
  );
};
