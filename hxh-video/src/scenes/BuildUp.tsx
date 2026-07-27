import React from "react";
import {
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CountdownBadge } from "../components/CountdownBadge";
import kurapikaThinking from "../assets/kurapika-thinking.png";

// Voiceover narration (10-28s):
// "Think about it. The curse on Prince Woble. Beyond Netero's plan.
//  And the connection between them all. Kurapika sees it now.
//  The pieces are falling into place — and the picture is terrifying."

export const BuildUp: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow zoom on the thinking panel
  const zoom = interpolate(frame, [0, 540], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Image fade in
  const imgOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Countdown pulses at frame 300 (frame 600 global)
  const counterPulse = frame >= 300;

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
      {/* Heartbeat SFX at frame 200 (frame 500 global) */}
      {frame >= 200 && (
        <Audio src={staticFile("audio/sfx/heartbeat.mp3")} volume={0.4} />
      )}

      {/* Kurapika thinking panel - the image already has the connection
          web with THE CURSE, THE BABY, MURDERS, SUCCESSION BATTLE */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${zoom})`,
          opacity: imgOpacity,
          transformOrigin: "center",
        }}
      >
        <Img
          src={kurapikaThinking}
          style={{
            width: 1080,
            height: 820,
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 400,
          background: "linear-gradient(rgba(13,13,13,0.85), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
          height: 500,
          background: "linear-gradient(transparent, rgba(13,13,13,0.95))",
          pointerEvents: "none",
        }}
      />

      {/* Subtitle text that appears as connections are revealed */}
      <div
        style={{
          position: "absolute",
          bottom: 350,
          width: 1080,
          textAlign: "center",
          opacity: interpolate(frame, [300, 340], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          padding: "0 80px",
        }}
      >
        <span
          style={{
            color: "#e0e0e0",
            fontSize: 32,
            fontFamily: "sans-serif",
            fontWeight: 600,
            fontStyle: "italic",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            lineHeight: 1.5,
          }}
        >
          They're all connected.
        </span>
      </div>

      <CountdownBadge visible={true} pulse={counterPulse} />
    </div>
  );
};
