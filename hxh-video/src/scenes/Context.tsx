import React from "react";
import {
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AlarmOverlay } from "../components/AlarmOverlay";
import { CountdownBadge } from "../components/CountdownBadge";
import blackwhaleCorridor from "../assets/blackwhalecorridor.png";

// Voiceover narration (3-10s):
// "The Black Whale is under martial law. Tensions between the princes
//  have reached a breaking point. And Kurapika? He's running out of time."

export const Context: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow zoom on corridor
  const zoom = interpolate(frame, [0, 210], [1, 1.12], {
    extrapolateRight: "clamp",
  });

  // Corridor fade in
  const corridorOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Martial Law" text fades in at frame 30
  const textOpacity = interpolate(frame, [30, 50], [0, 1], {
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
      {/* Clock ticking SFX */}
      <Audio src={staticFile("audio/sfx/clock.mp3")} volume={0.3} />

      {/* Black Whale corridor background - full bleed with slow zoom */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${zoom})`,
          opacity: corridorOpacity,
        }}
      >
        <Img
          src={blackwhaleCorridor}
          style={{
            width: 1080,
            height: 900,
            objectFit: "cover",
          }}
        />
      </div>

      {/* Top gradient for text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 500,
          background: "linear-gradient(rgba(13,13,13,0.9), transparent)",
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

      {/* Alarm overlay pulses every 30 frames */}
      <AlarmOverlay startFrame={0} interval={30} />

      {/* Martial Law text */}
      <div
        style={{
          position: "absolute",
          top: 250,
          width: 1080,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 56,
            fontFamily: "sans-serif",
            fontWeight: 800,
            letterSpacing: 4,
            textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(204,0,0,0.3)",
          }}
        >
          MARTIAL LAW
        </span>
        <br />
        <span
          style={{
            color: "#ccc",
            fontSize: 30,
            fontFamily: "sans-serif",
            fontWeight: 500,
            letterSpacing: 2,
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          Black Whale Ship
        </span>
      </div>

      {/* Countdown stays visible */}
      <CountdownBadge visible={true} pulse={false} />
    </div>
  );
};
