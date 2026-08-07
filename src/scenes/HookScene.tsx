import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../tokens";

const Scanline: React.FC = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
    zIndex: 10,
  }} />
);

const GridOverlay: React.FC = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `linear-gradient(${COLORS.border}44 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}44 1px, transparent 1px)`,
    backgroundSize: "80px 80px",
    zIndex: 1,
  }} />
);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineProgress = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const headlineProgress = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 60 } });
  const sublineProgress = spring({ frame: frame - 50, fps, config: { damping: 18, stiffness: 80 } });

  const taglineY = interpolate(taglineProgress, [0, 1], [-40, 0]);
  const headlineY = interpolate(headlineProgress, [0, 1], [80, 0]);
  const sublineOp = interpolate(sublineProgress, [0, 1], [0, 1]);

  const accentFlicker = frame % 12 < 1 ? 0.7 : 1;
  const scanX = interpolate(frame, [0, 180], [-1920, 1920]);

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
    }}>
      <GridOverlay />
      <Scanline />

      {/* Sweeping light effect */}
      <div style={{
        position: "absolute", top: 0, left: scanX,
        width: 300, height: "100%",
        background: `linear-gradient(90deg, transparent, ${COLORS.accent}08, transparent)`,
        zIndex: 2,
      }} />

      {/* Corner accents */}
      {[
        { top: 40, left: 60 }, { top: 40, right: 60 },
        { bottom: 40, left: 60 }, { bottom: 40, right: 60 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos,
          width: 80, height: 80,
          borderTop: i < 2 ? `3px solid ${COLORS.accent}` : "none",
          borderBottom: i >= 2 ? `3px solid ${COLORS.accent}` : "none",
          borderLeft: i % 2 === 0 ? `3px solid ${COLORS.accent}` : "none",
          borderRight: i % 2 === 1 ? `3px solid ${COLORS.accent}` : "none",
          opacity: accentFlicker,
          zIndex: 5,
        }} />
      ))}

      {/* BLUE LOCK label */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        transform: `translateY(${taglineY}px)`,
        paddingTop: 120, zIndex: 5,
      }}>
        <div style={{
          background: COLORS.accent,
          color: "#000",
          fontFamily: FONT.display,
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 8,
          padding: "8px 32px",
          textTransform: "uppercase",
        }}>
          BLUE LOCK × TRANSFER MARKET 2026
        </div>
      </div>

      {/* Main headline */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 5,
      }}>
        <div style={{
          fontSize: 96,
          fontWeight: 900,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.0,
          transform: `translateY(${headlineY}px)`,
          textShadow: `0 0 60px ${COLORS.accent}88`,
          letterSpacing: -2,
        }}>
          FORGET THE<br />
          <span style={{ color: COLORS.accent }}>ANIME HYPE.</span>
        </div>

        <div style={{
          fontSize: 32,
          color: COLORS.textMuted,
          textAlign: "center",
          marginTop: 32,
          opacity: sublineOp,
          fontFamily: FONT.body,
          fontWeight: 400,
          letterSpacing: 2,
          maxWidth: 900,
          lineHeight: 1.5,
        }}>
          If a European scout looked at Isagi Yoichi's goal-to-shot ratio today —<br />
          would he <em style={{ color: COLORS.accentGold }}>actually</em> be worth millions?
        </div>

        {/* Ticker */}
        {frame > 80 && (
          <div style={{
            marginTop: 60,
            display: "flex", gap: 48,
            opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            {[
              { label: "PLAYERS RANKED", val: "6" },
              { label: "MAX VALUATION", val: "€150M" },
              { label: "METRICS USED", val: "12" },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 42, fontWeight: 900, color: COLORS.accentGold }}>{val}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, letterSpacing: 3, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 6, background: COLORS.accent,
        opacity: accentFlicker, zIndex: 10,
      }} />
    </div>
  );
};
