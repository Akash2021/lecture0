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
import { AlarmOverlay } from "../components/AlarmOverlay";
import { CountdownBadge } from "../components/CountdownBadge";

// Voiceover narration (3-10s):
// "The Black Whale is under martial law. Tensions between the princes
//  have reached a breaking point. And Kurapika? He's running out of time."

export const Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dark corridor background gradient
  const corridorOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Guards slide in from sides
  const guard1X = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const guard2X = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const g1Translate = interpolate(guard1X, [0, 1], [-400, 80], {
    extrapolateRight: "clamp",
  });
  const g2Translate = interpolate(guard2X, [0, 1], [1400, 700], {
    extrapolateRight: "clamp",
  });

  // "Martial Law" text fades in at frame 30 (frame 120 global = frame 30 local)
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

      {/* Dark corridor */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 30%, #0f0f0f 70%, #050505 100%)",
          opacity: corridorOpacity,
        }}
      />

      {/* Guard 1 */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: g1Translate,
        }}
      >
        <PlaceholderPanel
          panel={panels.guard1}
          style={{ width: 250, height: 420 }}
        />
      </div>

      {/* Guard 2 */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: g2Translate,
        }}
      >
        <PlaceholderPanel
          panel={panels.guard2}
          style={{ width: 250, height: 420 }}
        />
      </div>

      {/* Alarm overlay pulses every 30 frames */}
      <AlarmOverlay startFrame={0} interval={30} />

      {/* Martial Law text */}
      <div
        style={{
          position: "absolute",
          top: 350,
          width: 1080,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 48,
            fontFamily: "sans-serif",
            fontWeight: 800,
            letterSpacing: 4,
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          MARTIAL LAW
        </span>
        <br />
        <span
          style={{
            color: "#999",
            fontSize: 28,
            fontFamily: "sans-serif",
            fontWeight: 500,
            letterSpacing: 2,
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
