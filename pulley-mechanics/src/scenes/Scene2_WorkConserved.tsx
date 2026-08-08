import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { EquationBuilder } from "../components/EquationBuilder";
import { ForceArrow } from "../components/ForceArrow";
import { KeyInsight } from "../components/KeyInsight";

export const Scene2_WorkConserved: React.FC = () => {
  const frame = useCurrentFrame();

  const leftOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftLift = interpolate(frame, [100, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightLift = interpolate(frame, [220, 350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftBoxY = interpolate(leftLift, [0, 1], [550, 400]);
  const rightBoxY = interpolate(rightLift, [0, 1], [550, 400]);

  const resultOpacity = interpolate(frame, [380, 410], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Work is Conserved" subtitle="W = F × d — the golden rule" />

      <EquationBuilder tokens={["W", "=", "F", "×", "d"]} delay={20} x={800} y={130} fontSize={44} />

      <div
        style={{
          position: "absolute",
          left: 960,
          top: 200,
          width: 2,
          height: 500,
          background: "rgba(255,255,255,0.1)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 280,
          top: 210,
          textAlign: "center",
          opacity: leftOpacity,
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600, color: "white" }}>
          Direct Lift
        </span>
      </div>

      <svg width={960} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <g opacity={leftOpacity}>
          <rect x={440} y={leftBoxY} width={80} height={55} rx={5} fill="#475569" stroke="#64748B" strokeWidth={2} />
          <text x={480} y={leftBoxY + 34} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={14} fontWeight={700} fill="white">100N</text>

          <ForceArrow x={480} y={leftBoxY - 10} angle={-90} force={100} maxLength={80} color="#00B4D8" label="100N" />

          <line x1={560} y1={400} x2={560} y2={550} stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="4,4" />
          <text x={580} y={480} fontFamily="'JetBrains Mono', monospace" fontSize={14} fill="rgba(255,255,255,0.6)">1m</text>
        </g>

        <g opacity={resultOpacity}>
          <text x={480} y={680} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={24} fill="white">
            100N × 1m
          </text>
          <text x={480} y={720} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={28} fontWeight={700} fill="#FFD60A">
            = 100J
          </text>
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 1240,
          top: 210,
          textAlign: "center",
          opacity: rightOpacity,
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600, color: "white" }}>
          Using a Ramp
        </span>
      </div>

      <svg width={960} height={1080} style={{ position: "absolute", top: 0, left: 960 }}>
        <g opacity={rightOpacity}>
          <polygon points="200,600 700,600 700,400" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />

          {(() => {
            const bx = interpolate(rightLift, [0, 1], [260, 620]);
            const by = interpolate(rightLift, [0, 1], [560, 380]);
            return (
              <g>
                <rect x={bx - 35} y={by - 25} width={70} height={50} rx={5} fill="#475569" stroke="#64748B" strokeWidth={2} />
                <text x={bx} y={by + 5} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={13} fontWeight={700} fill="white">100N</text>
                <ForceArrow x={bx - 50} y={by} angle={-30} force={50} maxForce={100} maxLength={60} color="#00B4D8" label="50N" opacity={1} />
              </g>
            );
          })()}

          <text x={450} y={530} fontFamily="'JetBrains Mono', monospace" fontSize={14} fill="rgba(255,255,255,0.6)" transform="rotate(-22, 450, 530)">2m path</text>
        </g>

        <g opacity={resultOpacity}>
          <text x={480} y={680} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={24} fill="white">
            50N × 2m
          </text>
          <text x={480} y={720} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={28} fontWeight={700} fill="#FFD60A">
            = 100J
          </text>
        </g>
      </svg>

      <KeyInsight
        text="Nature doesn't give free energy — but it lets you trade force for distance"
        highlight="trade force for distance"
        delay={500}
      />
    </AbsoluteFill>
  );
};
