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

export const Scene5_MovablePulley: React.FC = () => {
  const frame = useCurrentFrame();

  const setupOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ropeProgress = interpolate(frame, [60, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tensionReveal = interpolate(frame, [160, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pullUp = interpolate(frame, [220, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxLift = interpolate(pullUp, [0, 1], [0, 100]);
  const ropePull = interpolate(pullUp, [0, 1], [0, 200]);

  const splitExplain = interpolate(frame, [430, 460], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const workCheck = interpolate(frame, [520, 550], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ceilX = 800;
  const pulleyY = 450 - boxLift;
  const pulleyRadius = 35;
  const anchorX = ceilX;
  const effortX = ceilX + 250;

  const pulleyRotation = interpolate(pullUp, [0, 1], [0, -120]);

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Movable Pulley" subtitle="The real magic begins — MA = 2" />

      <WorkConservationPanel force={50} distance={2} delay={520} />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Ceiling */}
        <line x1={700} y1={120} x2={1100} y2={120} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />

        <g opacity={setupOpacity}>
          {/* Anchor point on ceiling */}
          <circle cx={anchorX} cy={120} r={6} fill="#94A3B8" />
          <line x1={anchorX} y1={120} x2={anchorX} y2={140} stroke="rgba(255,255,255,0.4)" strokeWidth={2} />

          {/* Movable pulley (moves with load) */}
          <PulleyWheel x={ceilX} y={pulleyY} radius={pulleyRadius} rotation={pulleyRotation} label="Movable" />

          {/* Rope: anchor → down around pulley → up to effort */}
          <PhysicsRope
            progress={ropeProgress}
            segments={[
              {
                points: [
                  [anchorX, 140],
                  [anchorX, pulleyY],
                ],
                highlight: tensionReveal > 0.5,
                segmentLabel: tensionReveal > 0.5 ? "T" : undefined,
              },
              {
                points: [
                  [effortX, pulleyY],
                  [effortX, 120 - ropePull],
                ],
                highlight: tensionReveal > 0.5,
                segmentLabel: tensionReveal > 0.5 ? "T" : undefined,
              },
            ]}
          />

          {/* Rope wrapping under pulley */}
          <path
            d={`M ${anchorX} ${pulleyY} A ${pulleyRadius} ${pulleyRadius} 0 0 0 ${effortX > anchorX ? ceilX + pulleyRadius : ceilX - pulleyRadius} ${pulleyY + pulleyRadius} L ${effortX} ${pulleyY}`}
            fill="none"
            stroke={tensionReveal > 0.5 ? "#06D6A0" : "#FFD60A"}
            strokeWidth={4}
            opacity={ropeProgress}
          />

          {/* Load hanging from pulley */}
          <line x1={ceilX} y1={pulleyY + pulleyRadius} x2={ceilX} y2={pulleyY + pulleyRadius + 30} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <LoadBox x={ceilX} y={pulleyY + pulleyRadius + 30} width={90} height={60} label="100N" />

          {/* Load arrow */}
          <ForceArrow
            x={ceilX}
            y={pulleyY + pulleyRadius + 100}
            angle={90}
            force={100}
            maxLength={70}
            color="#FF6B35"
            label="100N"
            opacity={tensionReveal}
          />

          {/* Effort arrow */}
          <ForceArrow
            x={effortX}
            y={120 - ropePull - 10}
            angle={-90}
            force={50}
            maxForce={100}
            maxLength={70}
            color="#00B4D8"
            label="50N"
            opacity={tensionReveal}
          />
        </g>

        {/* Tension splitting explanation */}
        <g opacity={splitExplain} transform="translate(1200, 250)">
          <rect x={0} y={0} width={500} height={280} rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

          <text x={250} y={35} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={600} fill="rgba(255,255,255,0.7)">
            How Tension Splits the Load
          </text>

          {/* Diagram: pulley with two T arrows going up, one W arrow going down */}
          <circle cx={250} cy={130} r={25} fill="none" stroke="#94A3B8" strokeWidth={3} />
          <circle cx={250} cy={130} r={4} fill="#94A3B8" />

          {/* Left T up */}
          <line x1={225} y1={130} x2={225} y2={75} stroke="#06D6A0" strokeWidth={3} />
          <polygon points="225,75 220,85 230,85" fill="#06D6A0" />
          <text x={200} y={70} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fontWeight={600} fill="#06D6A0">T</text>

          {/* Right T up */}
          <line x1={275} y1={130} x2={275} y2={75} stroke="#06D6A0" strokeWidth={3} />
          <polygon points="275,75 270,85 280,85" fill="#06D6A0" />
          <text x={300} y={70} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fontWeight={600} fill="#06D6A0">T</text>

          {/* W down */}
          <line x1={250} y1={155} x2={250} y2={210} stroke="#FF6B35" strokeWidth={3} />
          <polygon points="250,210 245,200 255,200" fill="#FF6B35" />
          <text x={250} y={230} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fontWeight={600} fill="#FF6B35">W=100N</text>

          <text x={250} y={260} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={16} fill="white">
            <tspan fill="#06D6A0">2T</tspan> = <tspan fill="#FF6B35">W</tspan>  →  <tspan fill="#06D6A0">T</tspan> = <tspan fill="#FFD60A">50N</tspan>
          </text>
        </g>

        {/* Work conservation check */}
        <g opacity={workCheck} transform="translate(1200, 580)">
          <rect x={0} y={0} width={500} height={140} rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,214,10,0.15)" strokeWidth={1} />
          <text x={250} y={35} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={600} fill="#FFD60A">
            Work Check ✓
          </text>
          <text x={250} y={70} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={18} fill="white">
            Pull <tspan fill="#00B4D8">2m</tspan> of rope to lift <tspan fill="#FF6B35">1m</tspan>
          </text>
          <text x={250} y={100} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={18} fill="white">
            <tspan fill="#00B4D8">50N × 2m</tspan> = <tspan fill="#FF6B35">100N × 1m</tspan> = <tspan fill="#FFD60A">100J</tspan>
          </text>
          <text x={250} y={125} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={14} fill="rgba(255,255,255,0.4)">
            Half the force, double the distance
          </text>
        </g>
      </svg>

      <MACounter value={2} delay={400} x={100} y={700} />

      <KeyInsight
        text="Two rope segments share the load — each carries half, giving MA = 2"
        highlight="each carries half"
        delay={620}
      />
    </AbsoluteFill>
  );
};
