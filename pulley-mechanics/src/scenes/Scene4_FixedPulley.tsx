import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { PulleyWheel } from "../components/PulleyWheel";
import { PhysicsRope } from "../components/PhysicsRope";
import { LoadBox } from "../components/LoadBox";
import { ForceArrow } from "../components/ForceArrow";
import { MACounter } from "../components/MACounter";
import { WorkConservationPanel } from "../components/WorkConservationPanel";
import { KeyInsight } from "../components/KeyInsight";

export const Scene4_FixedPulley: React.FC = () => {
  const frame = useCurrentFrame();

  const setupOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ropeProgress = interpolate(frame, [50, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pullDown = interpolate(frame, [140, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxLift = interpolate(pullDown, [0, 1], [0, 150]);
  const ropeEnd = interpolate(pullDown, [0, 1], [0, 150]);

  const arrowOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const workCheckOpacity = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulleyRotation = interpolate(pullDown, [0, 1], [0, 90]);

  const pulleyX = 960;
  const pulleyY = 200;
  const boxBaseY = 550;
  const boxY = boxBaseY - boxLift;
  const effortEndY = 550 + ropeEnd;

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Fixed Pulley" subtitle="Change direction, not force" />

      <WorkConservationPanel force={100} distance={1} delay={350} />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling mount */}
        <rect x={900} y={100} width={120} height={20} rx={4} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={pulleyX} y1={120} x2={pulleyX} y2={pulleyY - 35} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />

        <g opacity={setupOpacity}>
          <PulleyWheel x={pulleyX} y={pulleyY} radius={35} rotation={pulleyRotation} />

          {/* Rope: load side goes up, effort side goes down */}
          <PhysicsRope
            progress={ropeProgress}
            segments={[
              {
                points: [
                  [pulleyX - 35, boxY],
                  [pulleyX - 35, pulleyY],
                ],
                segmentLabel: ropeProgress >= 1 ? "T" : undefined,
                highlight: true,
              },
              {
                points: [
                  [pulleyX + 35, pulleyY],
                  [pulleyX + 35, effortEndY],
                ],
                segmentLabel: ropeProgress >= 1 ? "T" : undefined,
                highlight: true,
              },
            ]}
          />

          {/* Load */}
          <LoadBox x={pulleyX - 35} y={boxY} width={90} height={60} label="100N" />

          {/* Load force arrow (down) */}
          <ForceArrow
            x={pulleyX - 35}
            y={boxY + 70}
            angle={90}
            force={100}
            maxLength={70}
            color="#FF6B35"
            label="100N"
            opacity={arrowOpacity}
          />

          {/* Effort arrow (down — pulling rope down) */}
          <ForceArrow
            x={pulleyX + 35}
            y={effortEndY}
            angle={90}
            force={100}
            maxLength={70}
            color="#00B4D8"
            label="100N"
            opacity={arrowOpacity}
          />

          {/* Person pulling down */}
          <g opacity={arrowOpacity} transform={`translate(${pulleyX + 35}, ${effortEndY + 80})`}>
            <circle cx={0} cy={0} r={14} fill="none" stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={14} x2={0} y2={50} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={28} x2={-18} y2={12} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={28} x2={18} y2={40} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={50} x2={-14} y2={75} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={50} x2={14} y2={75} stroke="#94A3B8" strokeWidth={2.5} />
          </g>

          {/* Direction change indicator */}
          <g opacity={arrowOpacity}>
            <text x={pulleyX} y={pulleyY + 80} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={16} fill="rgba(255,255,255,0.5)">
              Direction changed!
            </text>
            <text x={pulleyX} y={pulleyY + 105} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={14} fill="rgba(255,255,255,0.35)">
              Pull down to lift up
            </text>
          </g>
        </g>

        {/* Work conservation check */}
        <g opacity={workCheckOpacity} transform="translate(200, 750)">
          <rect x={0} y={0} width={500} height={120} rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={250} y={35} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={600} fill="rgba(255,255,255,0.7)">
            Work Check
          </text>
          <text x={250} y={70} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={20} fill="white">
            <tspan fill="#00B4D8">100N</tspan> × <tspan fill="#00B4D8">1m</tspan> pull = <tspan fill="#FFD60A">100J</tspan>
          </text>
          <text x={250} y={100} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fill="rgba(255,255,255,0.5)">
            Same force, same distance — no advantage
          </text>
        </g>
      </svg>

      <MACounter value={1} delay={300} x={1500} y={400} />

      <KeyInsight
        text="A fixed pulley changes direction only — mechanical advantage is just 1×"
        highlight="changes direction only"
        delay={450}
      />
    </AbsoluteFill>
  );
};
