import React from "react";
import {
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import kurapikaShip from "../assets/kurapika-ship.png";

// Voiceover narration (57-60s):
// "Drop your prediction below. Chapter 415 breakdown coming soon."

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image fade in
  const imgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle zoom on background
  const zoom = interpolate(frame, [0, 90], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Subscribe button pulse
  const btnPulse = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.95, 1.05]
  );

  // Overlay text spring
  const textSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.3, 1], {
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
      {/* Notification ping SFX at frame 40 (1750 global) */}
      {frame >= 40 && (
        <Audio src={staticFile("audio/sfx/ping.mp3")} volume={0.6} />
      )}

      {/* CTA background image - Kurapika looking at ship */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          opacity: imgOpacity,
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={kurapikaShip}
          style={{
            width: 1080,
            height: 1920,
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 50%, rgba(13,13,13,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 300,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
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
              fontSize: 52,
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
        <div style={{ textAlign: "center", padding: "0 100px" }}>
          <span
            style={{
              color: "#ccc",
              fontSize: 22,
              fontFamily: "sans-serif",
              fontWeight: 500,
              textShadow: "0 2px 6px rgba(0,0,0,0.8)",
            }}
          >
            Chapter 415 breakdown dropping soon — Follow now
          </span>
        </div>
      </div>
    </div>
  );
};
