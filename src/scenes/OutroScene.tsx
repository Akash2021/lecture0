import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT, PLAYERS } from "../tokens";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(centerProg, [0, 1], [0.8, 1]);
  const op = interpolate(centerProg, [0, 1], [0, 1]);

  const ctaProg = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 100 } });
  const ctaY = interpolate(ctaProg, [0, 1], [40, 0]);
  const ctaOp = interpolate(ctaProg, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.12) * 0.05 + 1;

  return (
    <div style={{
      width: 1920, height: 1080,
      background: COLORS.bg,
      fontFamily: FONT.display,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* Background rings */}
      {[300, 500, 700].map((r, i) => (
        <div key={r} style={{
          position: "absolute",
          width: r, height: r, borderRadius: "50%",
          border: `1px solid ${COLORS.accent}${["22", "15", "08"][i]}`,
          top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${1 + i * 0.05 + (frame / 1000)})`,
        }} />
      ))}

      <div style={{ transform: `scale(${scale})`, opacity: op, textAlign: "center", zIndex: 5 }}>
        <div style={{ fontSize: 14, letterSpacing: 6, color: COLORS.accent, fontFamily: FONT.body, marginBottom: 24 }}>
          THE VERDICT IS IN
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.text, lineHeight: 1, marginBottom: 8 }}>
          WHICH EGOIST
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1 }}>
          <span style={{ color: COLORS.accentPurple }}>SURVIVES</span>
        </div>
        <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 16, fontFamily: FONT.body }}>
          THE EUROPEAN MEDICAL?
        </div>
      </div>

      {/* Summary tier list */}
      <div style={{
        display: "flex", gap: 16, marginTop: 48,
        transform: `translateY(${ctaY}px)`, opacity: ctaOp, zIndex: 5,
      }}>
        {[
          { tier: "PASSES", players: ["Rin", "Isagi", "Nagi"], color: COLORS.accentGreen },
          { tier: "RISKY", players: ["Shidou"], color: COLORS.accentGold },
          { tier: "FAILS", players: ["Barou*", "Chigiri†"], color: COLORS.accentRed },
        ].map(({ tier, players, color }) => (
          <div key={tier} style={{
            background: COLORS.bgCard,
            border: `1px solid ${color}44`,
            padding: "20px 28px",
            textAlign: "center",
            minWidth: 200,
          }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color, fontFamily: FONT.body, marginBottom: 12 }}>
              {tier}
            </div>
            {players.map((p) => (
              <div key={p} style={{ fontSize: 16, color: COLORS.text, fontFamily: FONT.display, marginBottom: 4 }}>
                {p}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, fontSize: 12, color: COLORS.textDim,
        fontFamily: FONT.body, letterSpacing: 2, zIndex: 5,
        transform: `translateY(${ctaY}px)`, opacity: ctaOp * 0.6,
      }}>
        * Barou pending psychological screening &nbsp;&nbsp; † Chigiri pending full hamstring MRI
      </div>

      {/* Like & Subscribe */}
      <div style={{
        position: "absolute", bottom: 80, zIndex: 5,
        display: "flex", gap: 24, alignItems: "center",
        transform: `scale(${pulse})`,
      }}>
        <div style={{
          background: COLORS.accent, color: "#000",
          fontSize: 16, fontWeight: 900, letterSpacing: 3,
          padding: "14px 32px",
        }}>
          SUBSCRIBE FOR MORE BREAKDOWNS
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 6, background: `linear-gradient(90deg, ${COLORS.accentPurple}, ${COLORS.accent}, ${COLORS.accentGreen})`,
      }} />
    </div>
  );
};
