import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PulleyWheel } from "../components/PulleyWheel";
import { Rope } from "../components/Rope";
import { LoadBox } from "../components/LoadBox";
import { ForceArrow } from "../components/ForceArrow";
import { SceneTitle } from "../components/SceneTitle";
import { Equation } from "../components/Equation";

export const Scene2_FixedPulley: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const setupAppear = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const pullProgress = interpolate(frame, [60, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const loadY = interpolate(pullProgress, [0, 1], [650, 350]);
  const handY = interpolate(pullProgress, [0, 1], [350, 650]);
  const wheelRotation = interpolate(pullProgress, [0, 1], [0, 200]);

  const arrowOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const equationDelay = 180;

  const highlightOpacity = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyX = 960;
  const pulleyY = 200;
  const radius = 50;

  return (
    <AbsoluteFill style={{ background: "#0F1117" }}>
      <SceneTitle title="Fixed Pulley" subtitle="Mounted to a fixed point — changes direction only" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling */}
        <rect x={800} y={40} width={320} height={16} rx={4} fill="#374151" />
        <rect x={pulleyX - 4} y={56} x2={pulleyX + 4} width={8} height={pulleyY - radius - 56} fill="#6B7280" />

        {/* Support bar */}
        <line x1={pulleyX} y1={56} x2={pulleyX} y2={pulleyY - radius - 6} stroke="#6B7280" strokeWidth={6} />

        {/* Pulley */}
        <g opacity={setupAppear}>
          <PulleyWheel x={pulleyX} y={pulleyY} radius={radius} rotation={wheelRotation} />
        </g>

        {/* Rope */}
        <Rope
          points={[
            [pulleyX - radius - 10, handY],
            [pulleyX - radius, pulleyY + 5],
            [pulleyX, pulleyY - radius],
            [pulleyX + radius, pulleyY + 5],
            [pulleyX + radius + 10, loadY],
          ]}
        />

        {/* Load */}
        <LoadBox x={pulleyX + radius + 10} y={loadY} width={90} height={70} label="100 kg" />

        {/* Hand */}
        <circle cx={pulleyX - radius - 10} cy={handY} r={8} fill="#F5A623" opacity={0.8} />

        {/* Force arrows */}
        <ForceArrow x={pulleyX - radius - 40} y={handY - 30} angle={90} length={60} color="#22C55E" label="Effort" opacity={arrowOpacity} />
        <ForceArrow x={pulleyX + radius + 40} y={loadY + 80} angle={90} length={60} color="#EF4444" label="Load" opacity={arrowOpacity} />
      </svg>

      <Equation text="Effort = Load (MA = 1)" delay={equationDelay} x={120} y={700} />

      {/* Highlight text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: highlightOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 12,
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 26, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Direction changes, but <span style={{ color: "#EF4444" }}>force stays the same</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
