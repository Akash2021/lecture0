import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { panels } from "../assets/panels";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { CountdownBadge } from "../components/CountdownBadge";

// Voiceover narration (0-3s):
// "Everything we thought we knew about Kurapika's mission... just changed."

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Punch zoom on Kurapika's face panel
  const zoomScale = interpolate(frame, [0, 15], [3, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flash white overlay at frame 10
  const flashOpacity = interpolate(frame, [8, 10, 12, 20], [0, 0.9, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "MISSION CHANGED" title spring
  const titleScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.6 },
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Countdown appears at frame 60
  const countdownOpacity = interpolate(frame, [60, 70], [0, 1], {
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
      }}
    >
      {/* SFX: whoosh at frame 5, impact at frame 10 */}
      <Audio src={staticFile("audio/sfx/whoosh.mp3")} startFrom={0} volume={0.7} />
      {frame >= 10 && (
        <Audio src={staticFile("audio/sfx/impact.mp3")} startFrom={0} volume={0.8} />
      )}

      {/* Kurapika face panel - punch zoom */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -60%) scale(${zoomScale})`,
          transformOrigin: "center",
        }}
      >
        <PlaceholderPanel
          panel={panels.kurapikaFace}
          style={{ width: 400, height: 480 }}
        />
      </div>

      {/* Flash overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "#fff",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* "MISSION CHANGED" text */}
      {frame >= 10 && (
        <div
          style={{
            position: "absolute",
            top: 750,
            width: 1080,
            textAlign: "center",
            transform: `scale(${titleScale})`,
          }}
        >
          <span
            style={{
              color: "#cc0000",
              fontSize: 72,
              fontFamily: "sans-serif",
              fontWeight: 900,
              letterSpacing: 6,
              textShadow: "0 4px 20px rgba(204, 0, 0, 0.6), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            MISSION CHANGED
          </span>
        </div>
      )}

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 860,
          width: 1080,
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 32,
            fontFamily: "sans-serif",
            fontWeight: 600,
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          Hunter x Hunter Chapter 414
        </span>
      </div>

      {/* Countdown badge */}
      <div style={{ opacity: countdownOpacity }}>
        <CountdownBadge visible={frame >= 60} pulse={true} />
      </div>
    </div>
  );
};
