import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT, PLAYERS } from "../tokens";
import { StatBar, ValuationBadge } from "../components/StatBar";

const player = PLAYERS.find((p) => p.name === "Barou Shoei")!;

const VolitileWarning: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 120 } });
  const flicker = frame % 8 < 1 ? 0.6 : 1;

  return (
    <div style={{
      opacity: interpolate(prog, [0, 1], [0, 1]) * flicker,
      transform: `scale(${interpolate(prog, [0, 1], [0.8, 1])})`,
      background: `${COLORS.accentRed}18`,
      border: `2px solid ${COLORS.accentRed}`,
      padding: "16px 28px",
      textAlign: "center",
      marginTop: 24,
    }}>
      <div style={{ fontSize: 13, letterSpacing: 5, color: COLORS.accentRed, fontFamily: FONT.body }}>
        ⚠ FINANCIAL HEALTH WARNING
      </div>
      <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8, fontFamily: FONT.body }}>
        High-volume, low-efficiency shot profile. Chemistry disruption risk at system clubs.
      </div>
    </div>
  );
};

export const BarouScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headerY = interpolate(headerProg, [0, 1], [-60, 0]);

  const leftProg = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 90 } });
  const leftX = interpolate(leftProg, [0, 1], [-80, 0]);

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Diagonal warning stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent, transparent 40px,
          ${COLORS.accentRed}06 40px, ${COLORS.accentRed}06 80px
        )`,
        zIndex: 1,
      }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 60, left: 120,
        transform: `translateY(${headerY}px)`, zIndex: 5,
      }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: COLORS.accentRed, marginBottom: 12, fontFamily: FONT.body }}>
          SECTION 03 — THE HIGH-RISK PREMIUM
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, color: COLORS.text }}>
          <span style={{ color: COLORS.accentGold }}>BAROU SHOEI</span><br />
          <span style={{ fontSize: 28, color: COLORS.textMuted, fontWeight: 400 }}>
            "THE KING" — BOOM OR BUST ASSET
          </span>
        </div>
      </div>

      {/* Left - stats */}
      <div style={{
        position: "absolute", top: 220, left: 120,
        width: 700,
        transform: `translateX(${leftX}px)`,
        opacity: interpolate(leftProg, [0, 1], [0, 1]),
        zIndex: 5,
      }}>
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.accentRed}33`, padding: "40px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, color: COLORS.textMuted, marginBottom: 32, fontFamily: FONT.body }}>
            SCOUTING METRICS
          </div>
          <StatBar label="xG PER 90 MINUTES" value={player.xG} max={1} color={COLORS.accentRed} delay={20} suffix="xG" />
          <StatBar label="HIGH-PRESS EFFICIENCY" value={player.pressEfficiency} color={COLORS.accentRed} delay={35} suffix="%" />
          <StatBar label="TACTICAL VERSATILITY INDEX" value={player.tacticalVersatility} color={COLORS.accentRed} delay={50} suffix="/100" />
          <StatBar label="PHYSICAL CEILING RATING" value={player.physicalRating} color={COLORS.accentGold} delay={65} suffix="/100" />
        </div>

        <VolitileWarning delay={100} />
      </div>

      {/* Right - analysis */}
      <div style={{ position: "absolute", top: 220, right: 120, width: 900, zIndex: 5 }}>
        <ValuationBadge value={player.value} tier={player.tier} color={COLORS.accentGold} delay={25} />

        {/* Shot efficiency chart */}
        {frame > 50 && (() => {
          const prog = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 90 } });
          return (
            <div style={{
              marginTop: 32,
              opacity: interpolate(prog, [0, 1], [0, 1]),
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, padding: "24px 28px",
            }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: COLORS.textMuted, fontFamily: FONT.body, marginBottom: 20 }}>
                SHOT EFFICIENCY PROFILE vs LEAGUE ELITE
              </div>
              {[
                { label: "Shots per 90", barou: 6.8, elite: 3.9, unit: "" },
                { label: "Conversion rate", barou: 9.8, elite: 18.2, unit: "%" },
                { label: "Big chances missed", barou: 2.1, elite: 0.8, unit: "/90" },
              ].map(({ label, barou, elite, unit }, i) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: FONT.body }}>{label}</span>
                    <div style={{ display: "flex", gap: 24 }}>
                      <span style={{ fontSize: 13, color: COLORS.accentGold, fontFamily: FONT.body }}>
                        BAROU: {barou}{unit}
                      </span>
                      <span style={{ fontSize: 13, color: COLORS.accent, fontFamily: FONT.body }}>
                        ELITE: {elite}{unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* The two futures */}
        {frame > 90 && (() => {
          const prog = spring({ frame: frame - 90, fps, config: { damping: 16, stiffness: 90 } });
          return (
            <div style={{
              display: "flex", gap: 16, marginTop: 24,
              opacity: interpolate(prog, [0, 1], [0, 1]),
            }}>
              <div style={{
                flex: 1, background: `${COLORS.accentGold}11`,
                border: `1px solid ${COLORS.accentGold}44`, padding: "20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.accentGold, fontFamily: FONT.body, marginBottom: 8 }}>
                  CEILING SCENARIO
                </div>
                <div style={{ fontSize: 13, color: COLORS.text, fontFamily: FONT.body, lineHeight: 1.6 }}>
                  Ballon d'Or. Barou as a king with system support = 30+ goals a season.
                </div>
              </div>
              <div style={{
                flex: 1, background: `${COLORS.accentRed}11`,
                border: `1px solid ${COLORS.accentRed}44`, padding: "20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.accentRed, fontFamily: FONT.body, marginBottom: 8 }}>
                  FLOOR SCENARIO
                </div>
                <div style={{ fontSize: 13, color: COLORS.text, fontFamily: FONT.body, lineHeight: 1.6 }}>
                  Luxury bench warmer. Chemistry liability at every top-5 league club.
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
