import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from "remotion";
import { COLORS, FONT, PLAYERS } from "../tokens";
import { StatBar, ValuationBadge } from "../components/StatBar";

const player = PLAYERS.find((p) => p.name === "Itoshi Rin")!;

const HeatmapZone: React.FC<{
  label: string; x: number; y: number; w: number; h: number;
  intensity: number; delay: number;
}> = ({ label, x, y, w, h, intensity, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } });
  const alpha = interpolate(prog, [0, 1], [0, intensity]);

  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      width: `${w}%`, height: `${h}%`,
      background: `${player.color}`,
      opacity: alpha,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {prog > 0.5 && (
        <div style={{
          fontSize: 11, color: "#fff", fontFamily: FONT.body,
          letterSpacing: 2, textAlign: "center", padding: "4px",
          opacity: interpolate(prog, [0.5, 1], [0, 1]),
        }}>
          {label}
        </div>
      )}
    </div>
  );
};

export const RinScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headerY = interpolate(headerProg, [0, 1], [-60, 0]);
  const rightProg = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 90 } });

  const recordPulse = Math.sin(frame * 0.15) * 0.1 + 1;

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Purple ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", right: 300,
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${player.color}15 0%, transparent 70%)`,
        transform: "translate(50%, -50%)",
        zIndex: 1,
      }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 60, left: 120,
        transform: `translateY(${headerY}px)`, zIndex: 5,
      }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: player.color, marginBottom: 12, fontFamily: FONT.body }}>
          SECTION 04 — THE COMPLETE PACKAGE
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, color: COLORS.text }}>
          <span style={{ color: player.color }}>ITOSHI RIN</span><br />
          <span style={{ fontSize: 28, color: COLORS.textMuted, fontWeight: 400 }}>
            THE TOTAL STRIKER — RECORD BREAKER TIER
          </span>
        </div>
        {/* Record fee badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          marginTop: 20, transform: `scale(${recordPulse})`,
          transformOrigin: "left center",
        }}>
          <div style={{
            background: player.color,
            color: "#000", fontSize: 13, fontWeight: 900,
            letterSpacing: 4, padding: "8px 20px",
          }}>
            ★ WORLD RECORD CANDIDATE ★
          </div>
        </div>
      </div>

      {/* Left - heatmap */}
      <div style={{
        position: "absolute", top: 240, left: 120,
        width: 420, height: 480,
        zIndex: 5,
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: COLORS.textMuted, marginBottom: 16, fontFamily: FONT.body }}>
          2026 SCOUTING HEATMAP
        </div>
        {/* Soccer pitch outline */}
        <div style={{
          position: "relative", width: "100%", height: "100%",
          border: `1px solid ${COLORS.border}`,
          background: COLORS.bgCard,
        }}>
          {/* Pitch lines */}
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: COLORS.border }} />
          <div style={{ position: "absolute", left: "15%", right: "15%", top: "15%", bottom: "15%", border: `1px solid ${COLORS.border}` }} />
          <div style={{ position: "absolute", left: "25%", right: "25%", top: "30%", bottom: "30%", border: `1px solid ${COLORS.border}` }} />

          <HeatmapZone label="BOX FINISH" x={30} y={65} w={40} h={25} intensity={0.7} delay={30} />
          <HeatmapZone label="SET PIECE" x={0} y={30} w={30} h={30} intensity={0.5} delay={50} />
          <HeatmapZone label="FLOW STATE" x={25} y={45} w={50} h={30} intensity={0.45} delay={70} />
          <HeatmapZone label="PRESS" x={0} y={55} w={35} h={35} intensity={0.35} delay={90} />

          <div style={{
            position: "absolute", bottom: 8, right: 8,
            fontSize: 10, color: COLORS.textMuted, fontFamily: FONT.body, letterSpacing: 2,
          }}>
            ▲ ATTACKING END
          </div>
        </div>
      </div>

      {/* Right - stats & valuation */}
      <div style={{
        position: "absolute", top: 220, left: 580, right: 120,
        opacity: interpolate(rightProg, [0, 1], [0, 1]),
        zIndex: 5,
      }}>
        <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
          <div style={{ flex: 1, background: COLORS.bgCard, border: `1px solid ${player.color}33`, padding: "32px" }}>
            <div style={{ fontSize: 13, letterSpacing: 3, color: COLORS.textMuted, marginBottom: 28, fontFamily: FONT.body }}>
              ELITE METRICS
            </div>
            <StatBar label="xG PER 90" value={player.xG} max={1} color={player.color} delay={20} suffix="xG" />
            <StatBar label="PRESS EFFICIENCY" value={player.pressEfficiency} color={player.color} delay={35} suffix="%" />
            <StatBar label="TACTICAL VERSATILITY" value={player.tacticalVersatility} color={player.color} delay={50} suffix="/100" />
            <StatBar label="PHYSICAL RATING" value={player.physicalRating} color={player.color} delay={65} suffix="/100" />
          </div>

          <div style={{ width: 340 }}>
            <ValuationBadge value={player.value} tier={player.tier} color={player.color} delay={20} />
          </div>
        </div>

        {/* Why record fee */}
        {[
          {
            delay: 80,
            title: "SET PIECE MASTERY",
            text: "Rin's direct free-kick conversion rate (14.3%) dwarfs the Bundesliga average (6.1%). Dead ball specialists add €15-20M to market value in current bidding wars.",
          },
          {
            delay: 100,
            title: "DEFENSIVE CONTRIBUTION",
            text: "Rare combination: 4.2 press triggers per 90 + 88% press efficiency. Only Lewandowski-era Müller matches this at peak. Clubs pay generational premium for complete forwards.",
          },
          {
            delay: 120,
            title: "FLOW STATE = PEAK CONSISTENCY",
            text: "Rin's 'flow state' mirrors Mbappé's momentum-based performance spikes — 73% goal contribution rate in decisive matches. Scouting data confirms top-8 historical percentile.",
          },
        ].map(({ delay, title, text }) => {
          const prog = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 90 } });
          return (
            <div key={title} style={{
              display: "flex", gap: 16, marginBottom: 16,
              opacity: interpolate(prog, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(prog, [0, 1], [30, 0])}px)`,
            }}>
              <div style={{ width: 4, background: player.color, minHeight: 60 }} />
              <div>
                <div style={{ fontSize: 11, letterSpacing: 4, color: player.color, fontFamily: FONT.body, marginBottom: 4 }}>
                  {title}
                </div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, fontFamily: FONT.body, lineHeight: 1.6 }}>
                  {text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
