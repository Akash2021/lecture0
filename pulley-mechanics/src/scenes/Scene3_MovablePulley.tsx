import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PulleyWheel } from "../components/PulleyWheel";
import { Rope } from "../components/Rope";
import { LoadBox } from "../components/LoadBox";
import { ForceArrow } from "../components/ForceArrow";
import { SceneTitle } from "../components/SceneTitle";
import { Equation } from "../components/Equation";
import { MechanicalAdvantageCounter } from "../components/MechanicalAdvantageCounter";

export const Scene3_MovablePulley: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const setupAppear = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const pullProgress = interpolate(frame, [80, 500], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyY = interpolate(pullProgress, [0, 1], [550, 350]);
  const handY = interpolate(pullProgress, [0, 1], [250, 550]);
  const wheelRotation = interpolate(pullProgress, [0, 1], [0, 180]);

  const arrowOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const anchorX = 860;
  const pullX = 1060;
  const pulleyX = 960;
  const radius = 45;

  return (
    <AbsoluteFill style={{ background: "#0F1117" }}>
      <SceneTitle title="Movable Pulley" subtitle="Pulley moves with the load — halves the effort" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling anchor points */}
        <rect x={800} y={40} width={320} height={16} rx={4} fill="#374151" />
        <line x1={anchorX} y1={56} x2={anchorX} y2={120} stroke="#6B7280" strokeWidth={4} />
        <circle cx={anchorX} cy={120} r={6} fill="#6B7280" />

        {/* Movable pulley (attached to load) */}
        <g opacity={setupAppear}>
          <PulleyWheel x={pulleyX} y={pulleyY} radius={radius} rotation={wheelRotation} />
        </g>

        {/* Load box attached to pulley */}
        <LoadBox x={pulleyX} y={pulleyY + radius + 10} width={90} height={70} label="100 kg" />

        {/* Rope: anchor -> down around pulley -> up to hand */}
        <Rope
          points={[
            [anchorX, 120],
            [anchorX, pulleyY],
            [pulleyX - radius, pulleyY],
            [pulleyX, pulleyY + radius],
            [pulleyX + radius, pulleyY],
            [pullX, pulleyY],
            [pullX, handY],
          ]}
        />

        {/* Two support segments highlight */}
        {arrowOpacity > 0 && (
          <g opacity={arrowOpacity}>
            <text x={anchorX - 30} y={pulleyY - 60} fontFamily="Inter, sans-serif" fontSize={14} fill="#22C55E" textAnchor="middle">
              Segment 1
            </text>
            <text x={pullX + 30} y={pulleyY - 60} fontFamily="Inter, sans-serif" fontSize={14} fill="#22C55E" textAnchor="middle">
              Segment 2
            </text>
          </g>
        )}

        {/* Hand */}
        <circle cx={pullX} cy={handY} r={8} fill="#F5A623" opacity={0.8} />

        {/* Force arrows */}
        <ForceArrow x={pullX + 30} y={handY - 20} angle={90} length={40} color="#22C55E" label="F/2" opacity={arrowOpacity} />
        <ForceArrow x={pulleyX} y={pulleyY + radius + 90} angle={90} length={60} color="#EF4444" label="Load" opacity={arrowOpacity} />
      </svg>

      <Equation text="Effort = Load ÷ 2" delay={200} x={120} y={700} />
      <MechanicalAdvantageCounter value={2} delay={280} x={120} y={800} />

      {/* Distance trade-off note */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 80,
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          padding: "12px 24px",
          background: "rgba(245, 166, 35, 0.08)",
          border: "1px solid rgba(245, 166, 35, 0.2)",
          borderRadius: 8,
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 20, color: "rgba(255,255,255,0.8)" }}>
          Trade-off: pull <span style={{ color: "#F5A623" }}>2x the distance</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
