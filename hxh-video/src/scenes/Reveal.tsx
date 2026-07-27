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
import { CountdownBadge } from "../components/CountdownBadge";
import kurapikaReveal from "../assets/kurapika-reveal.png";

// Voiceover narration (28-45s):
// "It was never about defeating the princes. That was the wrong objective.
//  Kurapika's real mission — the one that changes everything — is finding
//  the cursed child. And he has 49 days to do it."

export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal image scales in
  const revealSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const revealScale = interpolate(revealSpring, [0, 1], [0.8, 1], {
    extrapolateRight: "clamp",
  });
  const revealOpacity = interpolate(revealSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Timer bar depleting across bottom
  const timerProgress = interpolate(frame, [0, 510], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom text fade at frame 260 (frame 1100 global)
  const bottomTextOpacity = interpolate(frame, [260, 290], [0, 1], {
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
      }}
    >
      {/* Impact SFX at frame 20 and frame 120 */}
      {frame >= 20 && (
        <Audio src={staticFile("audio/sfx/impact.mp3")} volume={0.7} />
      )}
      {frame >= 120 && (
        <Audio src={staticFile("audio/sfx/impact.mp3")} volume={0.7} />
      )}

      {/* Reveal image - old priority vs new objective */}
      <div
        style={{
          transform: `scale(${revealScale})`,
          opacity: revealOpacity,
        }}
      >
        <Img
          src={kurapikaReveal}
          style={{
            width: 960,
            height: 650,
            objectFit: "cover",
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Timer bar */}
      <div
        style={{
          position: "absolute",
          bottom: 170,
          left: 60,
          width: 960,
          height: 6,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 3,
        }}
      >
        <div
          style={{
            width: `${timerProgress * 100}%`,
            height: "100%",
            backgroundColor: "#cc0000",
            borderRadius: 3,
            boxShadow: "0 0 10px rgba(204, 0, 0, 0.5)",
          }}
        />
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          width: 1080,
          textAlign: "center",
          opacity: bottomTextOpacity,
          padding: "0 80px",
        }}
      >
        <span
          style={{
            color: "#ccc",
            fontSize: 28,
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          49 days. One objective. Everything changes.
        </span>
      </div>

      <CountdownBadge visible={true} pulse={true} />
    </div>
  );
};
