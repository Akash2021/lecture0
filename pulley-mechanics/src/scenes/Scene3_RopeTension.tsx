import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { PulleyWheel } from "../components/PulleyWheel";
import { PhysicsRope } from "../components/PhysicsRope";
import { LoadBox } from "../components/LoadBox";
import { KeyInsight } from "../components/KeyInsight";

export const Scene3_RopeTension: React.FC = () => {
  const frame = useCurrentFrame();

  const setupOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ropeProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tensionHighlight = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const diagramOpacity = interpolate(frame, [280, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyRotation = interpolate(frame, [60, 500], [0, 45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyX = 960;
  const pulleyY = 250;
  const leftBoxY = 550;
  const rightBoxY = 550;

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Rope Tension" subtitle="One rope, one tension — everywhere" />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling */}
        <line x1={860} y1={180} x2={1060} y2={180} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
        <line x1={960} y1={180} x2={960} y2={220} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />

        <g opacity={setupOpacity}>
          <PulleyWheel x={pulleyX} y={pulleyY} radius={35} rotation={pulleyRotation} label="Fixed Pulley" />

          <PhysicsRope
            progress={ropeProgress}
            highlightColor="#06D6A0"
            segments={[
              {
                points: [[pulleyX - 35, leftBoxY], [pulleyX - 35, pulleyY]],
                highlight: tensionHighlight > 0.5,
                segmentLabel: tensionHighlight > 0.5 ? "T" : undefined,
              },
              {
                points: [[pulleyX - 35, pulleyY], [pulleyX + 35, pulleyY]],
                highlight: tensionHighlight > 0.5,
              },
              {
                points: [[pulleyX + 35, pulleyY], [pulleyX + 35, rightBoxY]],
                highlight: tensionHighlight > 0.5,
                segmentLabel: tensionHighlight > 0.5 ? "T" : undefined,
              },
            ]}
          />

          {/* Left weight */}
          <LoadBox x={pulleyX - 35} y={leftBoxY} width={80} height={55} label="50N" />
          {/* Right weight */}
          <LoadBox x={pulleyX + 35} y={rightBoxY} width={80} height={55} label="50N" />
        </g>

        {/* Tension labels */}
        <g opacity={labelOpacity}>
          <text x={pulleyX - 100} y={420} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={20} fontWeight={600} fill="#06D6A0">
            T = 50N
          </text>
          <text x={pulleyX + 100} y={420} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={20} fontWeight={600} fill="#06D6A0">
            T = 50N
          </text>

          <text x={pulleyX} y={pulleyY - 60} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fill="rgba(255,255,255,0.6)">
            Same tension throughout
          </text>
        </g>

        {/* Tension diagram */}
        <g opacity={diagramOpacity} transform="translate(200, 680)">
          <rect x={0} y={0} width={400} height={160} rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={200} y={30} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={16} fontWeight={600} fill="rgba(255,255,255,0.7)">
            Key Principle
          </text>

          {/* Rope diagram */}
          <line x1={60} y1={90} x2={340} y2={90} stroke="#FFD60A" strokeWidth={4} />
          <circle cx={60} cy={90} r={6} fill="#06D6A0" />
          <circle cx={200} cy={90} r={6} fill="#06D6A0" />
          <circle cx={340} cy={90} r={6} fill="#06D6A0" />

          <text x={60} y={120} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={13} fill="#06D6A0">T</text>
          <text x={200} y={120} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={13} fill="#06D6A0">T</text>
          <text x={340} y={120} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={13} fill="#06D6A0">T</text>

          <text x={200} y={150} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={13} fill="rgba(255,255,255,0.5)">
            Tension is constant along an ideal rope
          </text>
        </g>

        {/* Right side: why this matters */}
        <g opacity={diagramOpacity} transform="translate(1300, 680)">
          <rect x={0} y={0} width={400} height={160} rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={200} y={30} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={16} fontWeight={600} fill="rgba(255,255,255,0.7)">
            Why This Matters
          </text>
          <text x={200} y={70} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={15} fill="white">
            If a rope touches a load
          </text>
          <text x={200} y={95} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={15} fill="white">
            at <tspan fill="#FFD60A">2 points</tspan>...
          </text>
          <text x={200} y={130} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={18} fontWeight={700} fill="#06D6A0">
            each point carries T
          </text>
        </g>
      </svg>

      <KeyInsight
        text="A single rope has the same tension everywhere — this is the secret to pulleys"
        highlight="same tension everywhere"
        delay={420}
      />
    </AbsoluteFill>
  );
};
