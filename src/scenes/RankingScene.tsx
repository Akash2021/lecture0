import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT, PLAYERS } from "../tokens";

const RankCard: React.FC<{
  player: typeof PLAYERS[0];
  rank: number;
  delay: number;
}> = ({ player, rank, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 90, mass: 0.9 } });
  const x = interpolate(prog, [0, 1], [-120, 0]);
  const op = interpolate(prog, [0, 1], [0, 1]);

  const isTop = rank === 1;
  const barWidth = interpolate(frame, [delay + 10, delay + 60], [0, player.valuePure / 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      padding: "16px 24px",
      background: isTop ? `${player.color}15` : COLORS.bgCard,
      border: `1px solid ${isTop ? player.color : COLORS.border}`,
      borderLeft: `4px solid ${player.color}`,
      transform: `translateX(${x}px)`,
      opacity: op,
      marginBottom: 12,
    }}>
      {/* Rank number */}
      <div style={{
        fontSize: isTop ? 48 : 32,
        fontWeight: 900, color: player.color,
        width: 60, textAlign: "center",
        fontFamily: FONT.display,
      }}>
        {rank}
      </div>

      {/* Player info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <div style={{ fontSize: isTop ? 24 : 18, fontWeight: 900, color: COLORS.text, fontFamily: FONT.display }}>
            {player.name}
          </div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.textMuted, fontFamily: FONT.body }}>
            {player.style}
          </div>
        </div>
        {/* Value bar */}
        <div style={{
          height: 6, marginTop: 8,
          background: COLORS.bgCardLight,
          borderRadius: 3, overflow: "hidden",
          width: "100%",
        }}>
          <div style={{
            height: "100%",
            width: `${barWidth}%`,
            background: player.color,
            borderRadius: 3,
            boxShadow: `0 0 8px ${player.color}`,
          }} />
        </div>
      </div>

      {/* Tags */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.textMuted, fontFamily: FONT.body, marginBottom: 4 }}>
          {player.tag}
        </div>
        <div style={{
          fontSize: 20, fontWeight: 900, color: player.color,
          fontFamily: FONT.display,
        }}>
          {player.value}
        </div>
        <div style={{
          display: "inline-block",
          background: `${player.color}22`, border: `1px solid ${player.color}66`,
          fontSize: 10, letterSpacing: 3, color: player.color,
          padding: "3px 10px", marginTop: 4, fontFamily: FONT.body,
        }}>
          RISK: {player.risk}
        </div>
      </div>
    </div>
  );
};

export const RankingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headerY = interpolate(headerProg, [0, 1], [-60, 0]);

  // Sort by value descending, but reveal rank-order (1 = best)
  const sorted = [...PLAYERS].sort((a, b) => a.rank - b.rank);

  const undervalOp = interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{
        padding: "60px 120px 0",
        transform: `translateY(${headerY}px)`,
      }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: COLORS.accent, fontFamily: FONT.body, marginBottom: 12 }}>
          SECTION 05 — THE FINAL VERDICT
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: COLORS.text, lineHeight: 1 }}>
          TRANSFER MARKET LEADERBOARD<br />
          <span style={{ fontSize: 22, color: COLORS.textMuted, fontWeight: 400, letterSpacing: 2 }}>
            BUDGET BUY → RECORD BREAKER — RANKED BY REAL-WORLD VALUE
          </span>
        </div>
      </div>

      {/* Two-column ranking */}
      <div style={{ display: "flex", gap: 40, padding: "40px 120px 0" }}>
        <div style={{ flex: 1 }}>
          {sorted.slice(0, 3).map((p, i) => (
            <RankCard key={p.name} player={p} rank={p.rank} delay={20 + i * 30} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {sorted.slice(3).map((p, i) => (
            <RankCard key={p.name} player={p} rank={p.rank} delay={20 + (i + 3) * 30} />
          ))}

          {/* Most undervalued callout */}
          <div style={{
            marginTop: 20, opacity: undervalOp,
            background: `${COLORS.accentGreen}11`,
            border: `1px solid ${COLORS.accentGreen}66`,
            borderLeft: `4px solid ${COLORS.accentGreen}`,
            padding: "20px 24px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ fontSize: 24, color: COLORS.accentGreen }}>★</div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.accentGreen, fontFamily: FONT.body, marginBottom: 4 }}>
                MOST UNDERVALUED PICK
              </div>
              <div style={{ fontSize: 16, color: COLORS.text, fontFamily: FONT.body }}>
                <strong style={{ color: COLORS.accentGreen }}>Nagi Seishiro</strong> — Technique-per-euro ratio is unmatched at €90M.
                The only liability is effort. Fix the engine, you have a Ballon d'Or dark horse.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
