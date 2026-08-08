import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { PulleyWheel } from "../components/PulleyWheel";
import { LoadBox } from "../components/LoadBox";
import { MACounter } from "../components/MACounter";
import { ExponentialGraph } from "../components/ExponentialGraph";
import { KeyInsight } from "../components/KeyInsight";

interface PulleyConfig {
  ma: number;
  effort: number;
  label: string;
  segments: number;
}

const configs: PulleyConfig[] = [
  { ma: 1, effort: 100, label: "1 Fixed", segments: 1 },
  { ma: 2, effort: 50, label: "1 Movable", segments: 2 },
  { ma: 4, effort: 25, label: "2 Movable", segments: 4 },
  { ma: 8, effort: 12.5, label: "3 Movable", segments: 8 },
];

export const Scene6_AddingPulleys: React.FC = () => {
  const frame = useCurrentFrame();

  const activeIndex = Math.min(
    3,
    Math.floor(
      interpolate(frame, [60, 540], [0, 4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  const graphDelay = 600;

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Adding More Pulleys" subtitle="Each movable pulley doubles the advantage" />

      {/* Four pulley system cards */}
      {configs.map((config, i) => {
        const cardDelay = 60 + i * 120;
        const opacity = interpolate(frame, [cardDelay, cardDelay + 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isActive = i <= activeIndex;
        const cardX = 100 + i * 420;
        const cardW = 380;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cardX,
              top: 180,
              width: cardW,
              opacity,
            }}
          >
            {/* Card */}
            <div
              style={{
                background: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? "rgba(0,180,216,0.3)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 16,
                padding: 24,
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                {config.label}
              </div>

              {/* Mini pulley diagram */}
              <svg width={cardW - 48} height={200}>
                {/* Ceiling */}
                <line x1={20} y1={10} x2={cardW - 68} y2={10} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />

                {/* Fixed pulley at top */}
                <PulleyWheel x={(cardW - 48) / 2} y={40} radius={18} color={isActive ? "#94A3B8" : "#475569"} />

                {/* Movable pulleys */}
                {Array.from({ length: Math.max(0, Math.log2(config.ma)) }).map((_, pi) => (
                  <PulleyWheel
                    key={pi}
                    x={(cardW - 48) / 2 + (pi % 2 === 0 ? -30 : 30)}
                    y={100 + pi * 30}
                    radius={15}
                    color={isActive ? "#00B4D8" : "#334155"}
                  />
                ))}

                {/* Load */}
                <LoadBox
                  x={(cardW - 48) / 2}
                  y={140}
                  width={60}
                  height={40}
                  label="100N"
                  opacity={isActive ? 1 : 0.4}
                />

                {/* Rope segments count */}
                <text
                  x={(cardW - 48) / 2}
                  y={195}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={12}
                  fill="rgba(255,255,255,0.4)"
                >
                  {config.segments} rope segment{config.segments > 1 ? "s" : ""}
                </text>
              </svg>

              {/* Stats */}
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  Effort needed:
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: "#00B4D8" }}>
                  {config.effort}N
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                  Pull {config.ma}m to lift 1m
                </div>
              </div>

              {/* MA badge */}
              <div
                style={{
                  marginTop: 12,
                  textAlign: "center",
                  padding: "6px 16px",
                  background: isActive ? "rgba(255,214,10,0.1)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? "rgba(255,214,10,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 8,
                  display: "inline-block",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: isActive ? "#FFD60A" : "#475569" }}>
                  MA = {config.ma}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Exponential graph */}
      <ExponentialGraph delay={graphDelay} x={300} y={720} width={500} height={260} />

      {/* Pattern explanation */}
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 760,
          opacity: interpolate(frame, [graphDelay + 40, graphDelay + 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
          The Pattern
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: "white", lineHeight: 1.8 }}>
          <span style={{ color: "#FFD60A" }}>n</span> movable pulleys →{" "}
          <span style={{ color: "#00B4D8" }}>MA = 2<sup>n</sup></span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
          Effort = 100N / 2<sup>n</sup>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
          Distance = d × 2<sup>n</sup>
        </div>
      </div>

      <KeyInsight
        text="Every additional movable pulley halves the effort — exponential power!"
        highlight="halves the effort"
        delay={750}
      />
    </AbsoluteFill>
  );
};
