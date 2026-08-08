import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LoadBox } from "../components/LoadBox";
import { SceneTitle } from "../components/SceneTitle";

export const Scene1_TheProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxAppear = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 80 } });
  const boxOpacity = interpolate(boxAppear, [0, 1], [0, 1]);

  const struggle = frame > 80 ? Math.sin(frame * 0.4) * 4 : 0;
  const figureY = frame > 80 ? interpolate(frame, [80, 200], [0, -8], { extrapolateRight: "clamp" }) : 0;

  const stickX = 960;
  const stickBaseY = 520;
  const boxY = 380;

  const textOpacity = interpolate(frame, [250, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questionOpacity = interpolate(frame, [340, 370], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="The Problem" subtitle="Why is lifting heavy things so hard?" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <line x1={stickX} y1={100} x2={stickX} y2={boxY} stroke="#FFD60A" strokeWidth={3} opacity={boxOpacity} />

        <g opacity={boxOpacity}>
          <LoadBox x={stickX} y={boxY} width={100} height={70} label="100N" />
        </g>

        <g transform={`translate(${stickX + struggle}, ${stickBaseY + figureY})`} opacity={frame > 60 ? 1 : 0}>
          <circle cx={0} cy={0} r={18} fill="none" stroke="#94A3B8" strokeWidth={3} />
          <line x1={0} y1={18} x2={0} y2={70} stroke="#94A3B8" strokeWidth={3} />
          <line x1={0} y1={35} x2={-25} y2={10} stroke="#94A3B8" strokeWidth={3} />
          <line x1={0} y1={35} x2={25} y2={10} stroke="#94A3B8" strokeWidth={3} />
          <line x1={0} y1={70} x2={-18} y2={105} stroke="#94A3B8" strokeWidth={3} />
          <line x1={0} y1={70} x2={18} y2={105} stroke="#94A3B8" strokeWidth={3} />
          {frame > 120 && (
            <g opacity={0.6}>
              <text x={30} y={-5} fontFamily="Inter, sans-serif" fontSize={16} fill="#FF6B35">!</text>
              <text x={-35} y={-5} fontFamily="Inter, sans-serif" fontSize={16} fill="#FF6B35">!</text>
            </g>
          )}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 30,
            color: "white",
          }}
        >
          Lifting <span style={{ color: "#FF6B35" }}>100N</span> requires{" "}
          <span style={{ color: "#00B4D8" }}>100N</span> of effort
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: questionOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#FFD60A",
          }}
        >
          Can we do better?
        </span>
      </div>
    </AbsoluteFill>
  );
};
