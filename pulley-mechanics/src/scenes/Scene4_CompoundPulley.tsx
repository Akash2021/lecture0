import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PulleyWheel } from "../components/PulleyWheel";
import { Rope } from "../components/Rope";
import { LoadBox } from "../components/LoadBox";
import { ForceArrow } from "../components/ForceArrow";
import { SceneTitle } from "../components/SceneTitle";
import { Equation } from "../components/Equation";
import { MechanicalAdvantageCounter } from "../components/MechanicalAdvantageCounter";

export const Scene4_CompoundPulley: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const setupAppear = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const pullProgress = interpolate(frame, [100, 550], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lowerY = interpolate(pullProgress, [0, 1], [580, 420]);
  const handY = interpolate(pullProgress, [0, 1], [200, 600]);
  const wheelRotation = interpolate(pullProgress, [0, 1], [0, 240]);

  const ropeThreadProgress = interpolate(frame, [20, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const segmentCountOpacity = interpolate(frame, [250, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fixedY = 180;
  const radius = 38;
  const leftX = 880;
  const rightX = 1040;

  return (
    <AbsoluteFill style={{ background: "#0F1117" }}>
      <SceneTitle title="Compound Pulley" subtitle="Block and tackle — multiply your force" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling */}
        <rect x={820} y={40} width={280} height={16} rx={4} fill="#374151" />

        {/* Fixed pulleys (top) */}
        <line x1={leftX} y1={56} x2={leftX} y2={fixedY - radius - 6} stroke="#6B7280" strokeWidth={4} />
        <line x1={rightX} y1={56} x2={rightX} y2={fixedY - radius - 6} stroke="#6B7280" strokeWidth={4} />

        <g opacity={setupAppear}>
          <PulleyWheel x={leftX} y={fixedY} radius={radius} rotation={wheelRotation} color="#9CA3AF" />
          <PulleyWheel x={rightX} y={fixedY} radius={radius} rotation={-wheelRotation} color="#9CA3AF" />

          {/* Movable pulleys (bottom, move with load) */}
          <PulleyWheel x={leftX} y={lowerY} radius={radius} rotation={-wheelRotation} color="#D97706" />
          <PulleyWheel x={rightX} y={lowerY} radius={radius} rotation={wheelRotation} color="#D97706" />
        </g>

        {/* Labels */}
        <text x={leftX - 50} y={fixedY - radius - 15} fontFamily="Inter, sans-serif" fontSize={12} fill="#9CA3AF" textAnchor="middle">FIXED</text>
        <text x={rightX + 50} y={fixedY - radius - 15} fontFamily="Inter, sans-serif" fontSize={12} fill="#9CA3AF" textAnchor="middle">FIXED</text>
        <text x={leftX - 50} y={lowerY - radius - 10} fontFamily="Inter, sans-serif" fontSize={12} fill="#D97706" textAnchor="middle">MOVABLE</text>
        <text x={rightX + 50} y={lowerY - radius - 10} fontFamily="Inter, sans-serif" fontSize={12} fill="#D97706" textAnchor="middle">MOVABLE</text>

        {/* Rope threading through all 4 pulleys */}
        <Rope
          points={[
            [leftX - radius, fixedY + 10],
            [leftX - radius, lowerY],
            [leftX, lowerY + radius],
            [leftX + radius, lowerY],
            [leftX + radius, fixedY],
            [leftX, fixedY - radius],
            [rightX, fixedY - radius],
            [rightX - radius, fixedY],
            [rightX - radius, lowerY],
            [rightX, lowerY + radius],
            [rightX + radius, lowerY],
            [rightX + radius, fixedY],
            [rightX + radius + 30, fixedY],
            [rightX + radius + 30, handY],
          ]}
          progress={ropeThreadProgress}
        />

        {/* Load */}
        <LoadBox x={(leftX + rightX) / 2} y={lowerY + radius + 15} width={120} height={80} label="400 kg" />

        {/* Hand */}
        <circle cx={rightX + radius + 30} cy={handY} r={8} fill="#F5A623" opacity={0.8} />

        {/* Force arrows */}
        <ForceArrow x={rightX + radius + 60} y={handY - 20} angle={90} length={35} color="#22C55E" label="F/4" opacity={arrowOpacity} />
        <ForceArrow x={(leftX + rightX) / 2} y={lowerY + radius + 105} angle={90} length={50} color="#EF4444" label="400 kg" opacity={arrowOpacity} />

        {/* Segment count markers */}
        {segmentCountOpacity > 0 && (
          <g opacity={segmentCountOpacity}>
            {[1, 2, 3, 4].map((n, i) => {
              const sx = i < 2 ? leftX : rightX;
              const side = i % 2 === 0 ? -1 : 1;
              return (
                <g key={n}>
                  <circle cx={sx + side * (radius + 15)} cy={(fixedY + lowerY) / 2} r={12} fill="#22C55E" opacity={0.8} />
                  <text x={sx + side * (radius + 15)} y={(fixedY + lowerY) / 2 + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={12} fontWeight={700} fill="white">
                    {n}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>

      <Equation text="Effort = Load ÷ 4" delay={300} x={120} y={720} />
      <MechanicalAdvantageCounter value={4} delay={380} x={120} y={830} />

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          Number of supporting rope segments = Mechanical Advantage
        </span>
      </div>
    </AbsoluteFill>
  );
};
