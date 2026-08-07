import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../tokens";

export const StatBar: React.FC<{
  label: string;
  value: number;
  max?: number;
  color: string;
  delay?: number;
  suffix?: string;
}> = ({ label, value, max = 100, color, delay = 0, suffix = "" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });

  const width = interpolate(prog, [0, 1], [0, (value / max) * 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayVal = interpolate(frame, [delay, delay + 40], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <div style={{ fontSize: 14, color: COLORS.textMuted, fontFamily: FONT.body, letterSpacing: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color, fontFamily: FONT.display }}>
          {suffix === "xG" ? displayVal.toFixed(2) : Math.round(displayVal)}{suffix !== "xG" ? suffix : ""}
        </div>
      </div>
      <div style={{
        height: 8, background: COLORS.bgCardLight,
        borderRadius: 4, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 4,
          boxShadow: `0 0 12px ${color}88`,
        }} />
      </div>
    </div>
  );
};

export const ValuationBadge: React.FC<{
  value: string;
  tier: string;
  color: string;
  delay?: number;
}> = ({ value, tier, color, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.6 },
  });

  const scale = interpolate(prog, [0, 1], [0.5, 1]);
  const op = interpolate(prog, [0, 1], [0, 1]);

  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity: op,
      textAlign: "center",
    }}>
      <div style={{
        fontSize: 13, letterSpacing: 4, color: COLORS.textMuted,
        fontFamily: FONT.body, marginBottom: 8,
      }}>
        TRANSFER VALUATION
      </div>
      <div style={{
        fontSize: 72, fontWeight: 900, color,
        fontFamily: FONT.display,
        textShadow: `0 0 40px ${color}66`,
      }}>
        {value}
      </div>
      <div style={{
        display: "inline-block",
        background: `${color}22`,
        border: `1px solid ${color}66`,
        color, fontSize: 13, letterSpacing: 4,
        padding: "6px 20px", marginTop: 8,
        fontFamily: FONT.body,
      }}>
        {tier}
      </div>
    </div>
  );
};
