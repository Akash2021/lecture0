import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PulleyWheel } from "../components/PulleyWheel";
import { Rope } from "../components/Rope";
import { LoadBox } from "../components/LoadBox";
import { SceneTitle } from "../components/SceneTitle";

export const Scene1_WhatIsAPulley: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wheelAppear = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 80 } });
  const wheelScale = interpolate(wheelAppear, [0, 1], [0, 1]);
  const wheelOpacity = interpolate(wheelAppear, [0, 1], [0, 1]);

  const ropeProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pullProgress = interpolate(frame, [120, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const loadY = interpolate(pullProgress, [0, 1], [500, 340]);
  const handY = interpolate(pullProgress, [0, 1], [300, 500]);

  const wheelRotation = interpolate(pullProgress, [0, 1], [0, 120]);

  const labelOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyX = 960;
  const pulleyY = 220;
  const radius = 45;

  return (
    <AbsoluteFill style={{ background: "#0F1117" }}>
      <SceneTitle title="What is a Pulley?" subtitle="The simplest force redirector" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling mount */}
        <rect x={pulleyX - 60} y={40} width={120} height={12} rx={4} fill="#374151" />
        <line x1={pulleyX} y1={52} x2={pulleyX} y2={pulleyY - radius - 6} stroke="#6B7280" strokeWidth={4} />

        {/* Pulley wheel */}
        <g opacity={wheelOpacity} transform={`scale(${wheelScale})`} style={{ transformOrigin: `${pulleyX}px ${pulleyY}px` }}>
          <PulleyWheel x={pulleyX} y={pulleyY} radius={radius} rotation={wheelRotation} />
        </g>

        {/* Rope */}
        {ropeProgress > 0 && (
          <Rope
            points={[
              [pulleyX - radius - 20, handY],
              [pulleyX - radius, pulleyY],
              [pulleyX, pulleyY - radius],
              [pulleyX + radius, pulleyY],
              [pulleyX + radius, loadY],
            ]}
            progress={ropeProgress}
          />
        )}

        {/* Load box */}
        {ropeProgress > 0.8 && (
          <LoadBox x={pulleyX + radius} y={loadY} label="100 kg" opacity={interpolate(ropeProgress, [0.8, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        )}

        {/* Hand/pull indicator */}
        {pullProgress > 0 && (
          <g>
            <circle cx={pulleyX - radius - 20} cy={handY} r={8} fill="#F5A623" opacity={0.8} />
            <text x={pulleyX - radius - 50} y={handY + 5} textAnchor="end" fontFamily="Inter, sans-serif" fontSize={16} fill="#F5A623">
              Pull ↓
            </text>
          </g>
        )}
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: labelOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            background: "rgba(245, 166, 35, 0.1)",
            border: "1px solid rgba(245, 166, 35, 0.3)",
            borderRadius: 12,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 32,
              fontWeight: 600,
              color: "white",
            }}
          >
            A pulley <span style={{ color: "#F5A623" }}>redirects force</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
