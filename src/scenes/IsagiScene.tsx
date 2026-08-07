import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT, PLAYERS } from "../tokens";
import { StatBar, ValuationBadge } from "../components/StatBar";

const player = PLAYERS.find((p) => p.name === "Isagi Yoichi")!;

export const IsagiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headerY = interpolate(headerProg, [0, 1], [-60, 0]);

  const cardProg = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 90 } });
  const cardX = interpolate(cardProg, [0, 1], [-80, 0]);
  const cardOp = interpolate(cardProg, [0, 1], [0, 1]);

  const riskOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Diagonal accent stripe */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: 600, height: "100%",
        background: `linear-gradient(135deg, transparent 40%, ${player.color}08)`,
        zIndex: 1,
      }} />

      {/* Section label */}
      <div style={{
        position: "absolute", top: 60, left: 120,
        transform: `translateY(${headerY}px)`,
        zIndex: 5,
      }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: player.color, marginBottom: 12, fontFamily: FONT.body }}>
          SECTION 02 — SYSTEM PLAYERS & TACTICAL VERSATILITY
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: COLORS.text, lineHeight: 1 }}>
          <span style={{ color: player.color }}>ISAGI YOICHI</span><br />
          <span style={{ fontSize: 32, color: COLORS.textMuted, fontWeight: 400 }}>
            THE FALSE-NINE RAUMDEUTER
          </span>
        </div>
      </div>

      {/* Left column - stats */}
      <div style={{
        position: "absolute", top: 220, left: 120,
        width: 700,
        transform: `translateX(${cardX}px)`,
        opacity: cardOp,
        zIndex: 5,
      }}>
        <div style={{
          background: COLORS.bgCard,
          border: `1px solid ${player.color}33`,
          padding: "40px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, letterSpacing: 3, color: COLORS.textMuted, marginBottom: 32, fontFamily: FONT.body }}>
            SCOUTING METRICS
          </div>
          <StatBar label="xG PER 90 MINUTES" value={player.xG} max={1} color={player.color} delay={20} suffix="xG" />
          <StatBar label="HIGH-PRESS EFFICIENCY" value={player.pressEfficiency} color={player.color} delay={35} suffix="%" />
          <StatBar label="TACTICAL VERSATILITY INDEX" value={player.tacticalVersatility} color={player.color} delay={50} suffix="/100" />
          <StatBar label="PHYSICAL CEILING RATING" value={player.physicalRating} color={player.color} delay={65} suffix="/100" />
        </div>

        {/* Analyst verdict */}
        <div style={{
          background: `${player.color}11`,
          border: `1px solid ${player.color}44`,
          borderLeft: `4px solid ${player.color}`,
          padding: "24px 28px",
          opacity: riskOp,
        }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: COLORS.textMuted, marginBottom: 10, fontFamily: FONT.body }}>
            SCOUT VERDICT
          </div>
          <div style={{ fontSize: 16, color: COLORS.text, lineHeight: 1.7, fontFamily: FONT.body }}>
            {player.summary}
          </div>
        </div>
      </div>

      {/* Right column - valuation + analysis */}
      <div style={{
        position: "absolute", top: 220, right: 120,
        width: 900,
        zIndex: 5,
      }}>
        <ValuationBadge
          value={player.value}
          tier={player.tier}
          color={player.color}
          delay={30}
        />

        {/* Key arguments */}
        {[
          {
            icon: "▲", color: COLORS.accentGreen, delay: 60,
            label: "BULL CASE",
            text: "Metavision = elite Raumdeuter spatial intelligence. Clubs like Guardiola's City pay a 40% premium for IQ-driven false-nines who don't need the ball to influence play.",
          },
          {
            icon: "▼", color: COLORS.accentRed, delay: 80,
            label: "BEAR CASE",
            text: "Physical limitations are the real debate. At 71/100 athleticism, clubs face the same risk calculus as Özil — generational vision, but can he sustain European fixture congestion?",
          },
          {
            icon: "◆", color: COLORS.accentGold, delay: 100,
            label: "MARKET SIGNAL",
            text: "Late bloomers with 90+ TVI fetch a 35% premium in current market. Isagi's €85M sits 12% below his true comparable value if physical ceiling is cleared at medical.",
          },
        ].map(({ icon, color, delay, label, text }) => {
          const prog = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 90 } });
          const op = interpolate(prog, [0, 1], [0, 1]);
          const x = interpolate(prog, [0, 1], [40, 0]);
          return (
            <div key={label} style={{
              display: "flex", gap: 20, marginTop: 28,
              opacity: op, transform: `translateX(${x}px)`,
            }}>
              <div style={{ fontSize: 24, color, marginTop: 2, minWidth: 24 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 4, color, fontFamily: FONT.body, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 15, color: COLORS.textMuted, fontFamily: FONT.body, lineHeight: 1.6 }}>{text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk indicator */}
      <div style={{
        position: "absolute", bottom: 60, right: 120,
        display: "flex", alignItems: "center", gap: 16,
        opacity: riskOp, zIndex: 5,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 3, color: COLORS.textMuted, fontFamily: FONT.body }}>
          INVESTMENT RISK
        </div>
        <div style={{
          background: `${COLORS.accentGold}22`,
          border: `1px solid ${COLORS.accentGold}`,
          color: COLORS.accentGold,
          fontSize: 14, fontWeight: 700, letterSpacing: 4,
          padding: "8px 20px", fontFamily: FONT.body,
        }}>
          {player.risk}
        </div>
      </div>
    </div>
  );
};
