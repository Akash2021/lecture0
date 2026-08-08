import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { KeyInsight } from "../components/KeyInsight";

export const Scene7_LimitsRealWorld: React.FC = () => {
  const frame = useCurrentFrame();

  const frictionOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const efficiencyOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const realWorldOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endCardOpacity = interpolate(frame, [450, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const efficiencyCurveProgress = interpolate(frame, [180, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0D1B2A" }}>
      <SceneTitle title="Real-World Limits" subtitle="Theory meets reality" />

      {/* Friction section */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 180,
          opacity: frictionOpacity,
          width: 800,
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 600, color: "white", marginBottom: 20 }}>
          Why Can't We Add Infinite Pulleys?
        </div>

        {/* Friction factors */}
        {["Rope bending around each pulley creates friction", "Pulley axle bearings resist rotation", "Rope weight adds up with more segments", "More rope = more stretch and energy loss"].map((text, i) => {
          const itemOpacity = interpolate(frame, [60 + i * 25, 80 + i * 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "#FF6B35",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Efficiency curve */}
      <div style={{ position: "absolute", left: 1000, top: 160, opacity: efficiencyOpacity }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
          Efficiency vs. Number of Pulleys
        </div>
        <svg width={700} height={320}>
          {/* Grid */}
          <line x1={60} y1={20} x2={60} y2={260} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <line x1={60} y1={260} x2={660} y2={260} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

          {/* Y axis labels */}
          {[100, 75, 50, 25, 0].map((v, i) => {
            const ty = 20 + (i / 4) * 240;
            return (
              <text key={v} x={50} y={ty + 4} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize={12} fill="rgba(255,255,255,0.35)">
                {v}%
              </text>
            );
          })}

          {/* X axis labels */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => {
            const tx = 60 + (v / 8) * 600;
            return (
              <text key={v} x={tx} y={280} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={12} fill="rgba(255,255,255,0.35)">
                {v}
              </text>
            );
          })}

          {/* Ideal line (stays at 100%) */}
          <line x1={60} y1={20} x2={660} y2={20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="6,4" />
          <text x={665} y={24} fontFamily="'JetBrains Mono', monospace" fontSize={11} fill="rgba(255,255,255,0.3)">ideal</text>

          {/* Real efficiency curve (drops) */}
          {(() => {
            const points = Array.from({ length: 40 }, (_, i) => {
              const pulleys = (i / 39) * 8;
              const efficiency = 100 * Math.pow(0.9, pulleys);
              return {
                x: 60 + (pulleys / 8) * 600,
                y: 20 + (1 - efficiency / 100) * 240,
              };
            });
            const visibleCount = Math.round(points.length * efficiencyCurveProgress);
            const pathD = points
              .slice(0, visibleCount)
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ");
            return visibleCount > 1 ? (
              <path d={pathD} fill="none" stroke="#FF6B35" strokeWidth={3} strokeLinecap="round" />
            ) : null;
          })()}

          {/* Sweet spot highlight */}
          {efficiencyCurveProgress > 0.5 && (
            <g>
              <rect x={120} y={25} width={230} height={60} rx={8} fill="rgba(6,214,160,0.08)" stroke="rgba(6,214,160,0.2)" strokeWidth={1} />
              <text x={235} y={55} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={13} fontWeight={600} fill="#06D6A0">
                Sweet spot: 2-4 pulleys
              </text>
              <text x={235} y={75} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={11} fill="rgba(255,255,255,0.4)">
                Good MA with acceptable friction
              </text>
            </g>
          )}

          <text x={360} y={310} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={13} fill="rgba(255,255,255,0.4)">
            Number of Pulleys
          </text>
        </svg>
      </div>

      {/* Real world examples */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 620,
          opacity: realWorldOpacity,
          display: "flex",
          gap: 40,
        }}
      >
        {[
          { name: "Construction Crane", pulleys: "4-6", ma: "16-64×", icon: "▲" },
          { name: "Sailing Ship", pulleys: "2-4", ma: "4-16×", icon: "◆" },
          { name: "Elevator", pulleys: "2-3", ma: "4-8×", icon: "■" },
          { name: "Rock Climbing", pulleys: "1-2", ma: "2-4×", icon: "●" },
        ].map((item, i) => {
          const itemDelay = 300 + i * 30;
          const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "20px 28px",
                textAlign: "center",
                width: 200,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.6 }}>{item.icon}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "white", marginBottom: 6 }}>
                {item.name}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#00B4D8" }}>
                {item.pulleys} pulleys
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#FFD60A", marginTop: 4 }}>
                MA {item.ma}
              </div>
            </div>
          );
        })}
      </div>

      {/* End card */}
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 620,
          opacity: endCardOpacity,
          width: 700,
        }}
      >
        <div
          style={{
            background: "rgba(255,214,10,0.05)",
            border: "1px solid rgba(255,214,10,0.2)",
            borderRadius: 16,
            padding: "30px 40px",
          }}
        >
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 700, color: "#FFD60A", marginBottom: 16 }}>
            Summary
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, color: "white", lineHeight: 2.2 }}>
            <div>1. Work is <span style={{ color: "#FFD60A" }}>always</span> conserved: W = F × d</div>
            <div>2. Rope tension is <span style={{ color: "#06D6A0" }}>constant</span> throughout</div>
            <div>3. Each movable pulley <span style={{ color: "#00B4D8" }}>doubles</span> mechanical advantage</div>
            <div>4. Trade-off: less force = <span style={{ color: "#FF6B35" }}>more rope</span> to pull</div>
            <div>5. Real pulleys have <span style={{ color: "#FF6B35" }}>friction limits</span></div>
          </div>
        </div>
      </div>

      <KeyInsight
        text="Pulleys are a beautiful trade — physics lets you split force, never create it"
        highlight="split force, never create it"
        delay={520}
      />
    </AbsoluteFill>
  );
};
