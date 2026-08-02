import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitchOpacity = interpolate(frame, [0, 15, 20, 25], [0, 0.8, 0, 0.5], {
    extrapolateRight: "clamp",
  });

  const titleSlam = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 200, overshootClamping: false },
  });

  const titleScale = interpolate(titleSlam, [0, 1], [3, 1]);
  const titleOpacity = interpolate(titleSlam, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  const shakeX =
    frame >= 25 && frame < 40
      ? interpolate(
          frame,
          [25, 27, 29, 31, 33, 35, 37, 39],
          [0, -12, 10, -8, 6, -4, 2, 0],
          { extrapolateRight: "clamp" }
        )
      : 0;

  const shakeY =
    frame >= 25 && frame < 40
      ? interpolate(
          frame,
          [25, 28, 30, 32, 34, 36, 38, 40],
          [0, 8, -6, 5, -3, 2, -1, 0],
          { extrapolateRight: "clamp" }
        )
      : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Glitch/static effect */}
      {frame < 25 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: glitchOpacity,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )`,
          }}
        />
      )}

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 100,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: 6,
            textShadow:
              "0 0 30px rgba(244,67,54,0.6), 0 0 60px rgba(244,67,54,0.3)",
            margin: 0,
          }}
        >
          TOP 5 STRONGEST
        </h1>
        <h2
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 64,
            fontWeight: 500,
            color: "#F44336",
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: 8,
            margin: 0,
            marginTop: 10,
          }}
        >
          SAKAMOTO DAYS
        </h2>
        <h3
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 40,
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: 12,
            margin: 0,
            marginTop: 5,
          }}
        >
          CHARACTERS
        </h3>
      </div>

      {/* Crosshair particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const px =
          100 + ((i * 137 + frame * 0.5) % 880);
        const py =
          100 + ((i * 211 + frame * 0.3) % 1720);
        const pOpacity = interpolate(
          Math.sin(frame * 0.05 + i * 3),
          [-1, 1],
          [0.05, 0.15]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: 16,
              height: 16,
              opacity: pOpacity,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 7,
                left: 0,
                width: 16,
                height: 2,
                background: "#F44336",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 7,
                width: 2,
                height: 16,
                background: "#F44336",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
