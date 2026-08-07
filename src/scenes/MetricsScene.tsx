import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../tokens";

const MetricCard: React.FC<{
  label: string;
  definition: string;
  value: string;
  delay: number;
  color: string;
}> = ({ label, definition, value, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 100 } });
  const y = interpolate(prog, [0, 1], [50, 0]);
  const op = interpolate(prog, [0, 1], [0, 1]);

  return (
    <div style={{
      background: COLORS.bgCard,
      border: `1px solid ${color}44`,
      borderLeft: `4px solid ${color}`,
      padding: "28px 32px",
      transform: `translateY(${y}px)`,
      opacity: op,
      flex: 1,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: 4, color: COLORS.textMuted,
        fontFamily: FONT.body, marginBottom: 8, textTransform: "uppercase",
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 36, fontWeight: 900, color: color,
        fontFamily: FONT.display, marginBottom: 12,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 15, color: COLORS.textMuted,
        fontFamily: FONT.body, lineHeight: 1.6,
      }}>
        {definition}
      </div>
    </div>
  );
};

export const MetricsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleProg, [0, 1], [-50, 0]);

  const metrics = [
    {
      label: "Expected Goals / 90",
      value: "xG",
      definition: "Shot quality-adjusted scoring probability. Ignores volume, rewards elite positioning and decision-making.",
      color: COLORS.accent,
      delay: 20,
    },
    {
      label: "High-Press Efficiency",
      value: "HPE%",
      definition: "Ball recoveries in the final third per 90 mins. Separates modern forwards from legacy Shonen power-scalers.",
      color: COLORS.accentGreen,
      delay: 35,
    },
    {
      label: "Tactical Versatility Index",
      value: "TVI",
      definition: "Positional flexibility score across False-9, Raumdeuter, and traditional CF roles. Drives transfer fee multipliers.",
      color: COLORS.accentGold,
      delay: 50,
    },
    {
      label: "Baseline U-20 Market Rate",
      value: "€100M",
      definition: "2026 benchmark. Endrick, Yamal, Asane transfers reset the floor. Anything above needs generational proof.",
      color: COLORS.accentPurple,
      delay: 65,
    },
  ];

  const disclaimerOp = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "80px 120px 0",
        transform: `translateY(${titleY}px)`,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: COLORS.accent, marginBottom: 16, fontFamily: FONT.body }}>
          SECTION 01 — SCOUTING FRAMEWORK
        </div>
        <div style={{ fontSize: 68, fontWeight: 900, color: COLORS.text, lineHeight: 1 }}>
          WHY <span style={{ color: COLORS.accentRed }}>SHONEN POWER LEVELS</span><br />
          FAIL IN A DATA-DRIVEN MARKET
        </div>
      </div>

      {/* Metric cards */}
      <div style={{
        display: "flex", gap: 24,
        padding: "60px 120px",
        flex: 1,
      }}>
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Bottom callout */}
      <div style={{
        padding: "0 120px 60px",
        opacity: disclaimerOp,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ width: 3, height: 48, background: COLORS.accentGold }} />
        <div style={{
          fontSize: 18, color: COLORS.accentGold,
          fontFamily: FONT.body, fontStyle: "italic",
        }}>
          "A 2026 scout doesn't care about your Ego spark or your Metavision — they care about xG per 90 and contract duration."
        </div>
      </div>
    </div>
  );
};
