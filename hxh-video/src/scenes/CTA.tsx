import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Voiceover narration (57-60s):
// "Drop your prediction below. Chapter 415 breakdown coming soon."

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text spring
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  // Subscribe button pulse
  const btnPulse = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.95, 1.05]
  );

  // Sub text fade
  const subTextOpacity = interpolate(frame, [20, 40], [0, 1], {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Notification ping SFX at frame 40 (1750 global) */}
      {frame >= 40 && (
        <Audio src={staticFile("audio/sfx/ping.mp3")} volume={0.6} />
      )}

      {/* Manga panel texture background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)",
        }}
      />

      {/* Main CTA text */}
      <div
        style={{
          transform: `scale(${textScale})`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 56,
            fontFamily: "sans-serif",
            fontWeight: 900,
            lineHeight: 1.3,
            textShadow: "0 4px 12px rgba(0,0,0,0.8)",
          }}
        >
          Drop your prediction{" "}
          <span role="img" aria-label="point down">
            {"👇"}
          </span>
        </span>
      </div>

      {/* Subscribe button */}
      <div
        style={{
          transform: `scale(${btnPulse})`,
          backgroundColor: "#cc0000",
          borderRadius: 12,
          padding: "18px 60px",
          boxShadow: "0 4px 20px rgba(204, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 28,
            fontFamily: "sans-serif",
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          SUBSCRIBE
        </span>
      </div>

      {/* Follow text */}
      <div style={{ opacity: subTextOpacity, textAlign: "center", padding: "0 100px" }}>
        <span
          style={{
            color: "#999",
            fontSize: 24,
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          Chapter 415 breakdown dropping soon — Follow now
        </span>
      </div>
    </div>
  );
};
