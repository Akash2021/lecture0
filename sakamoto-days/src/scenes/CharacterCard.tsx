import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character } from "../assets/characters";
import { RankNumber } from "../components/RankNumber";
import { Silhouette } from "../components/Silhouette";
import { StatBar } from "../components/StatBar";
import { PowerLevelCounter } from "../components/PowerLevelCounter";
import { CrownBadge } from "../components/CrownBadge";

interface CharacterCardProps {
  character: Character;
  isRank1?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isRank1 = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSlide = spring({
    frame: frame - 60,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const panelY = interpolate(panelSlide, [0, 1], [300, 0]);
  const panelOpacity = interpolate(panelSlide, [0, 1], [0, 1]);

  const featTyping = interpolate(frame - 100, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const featChars = Math.round(character.keyFeat.length * featTyping);

  const bgPulseSpeed = isRank1 ? 0.12 : 0.06;
  const bgPulse = interpolate(
    Math.sin(frame * bgPulseSpeed),
    [-1, 1],
    [0.03, 0.08]
  );

  const goldFlashOpacity =
    isRank1 && frame >= 5 && frame < 20
      ? interpolate(frame, [5, 10, 20], [0, 0.4, 0], {
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 60px 60px",
      }}
    >
      {/* Character-tinted background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 35%, ${character.color}${Math.round(bgPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 55%)`,
          zIndex: 0,
        }}
      />

      {/* Gold flash for rank 1 */}
      {goldFlashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#FFD700",
            opacity: goldFlashOpacity,
            zIndex: 5,
          }}
        />
      )}

      {/* Crown badge for #1 */}
      {isRank1 && <CrownBadge />}

      {/* Rank number — top */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <RankNumber rank={character.rank} color={character.color} />
      </div>

      {/* Character image — centered */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          marginTop: 80,
        }}
      >
        <Silhouette character={character} isRank1={isRank1} />
      </div>

      {/* Info panel — flows below image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          marginTop: 30,
          opacity: panelOpacity,
          transform: `translateY(${panelY}px)`,
          zIndex: 3,
        }}
      >
        {/* Name */}
        <h2
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.1,
            textShadow: `0 0 30px ${character.color}66`,
          }}
        >
          {character.name}
        </h2>

        {/* Title */}
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 30,
            fontWeight: 400,
            color: character.color,
            textTransform: "uppercase",
            letterSpacing: 4,
            margin: 0,
            marginTop: 8,
          }}
        >
          {character.title}
        </p>

        {/* Power level counter */}
        <PowerLevelCounter
          powerLevel={character.powerLevel}
          color={character.color}
          delay={70}
        />

        {/* Stat bars */}
        <div style={{ marginTop: 24 }}>
          <StatBar
            label="Power"
            value={character.stats.power}
            color={character.color}
            delay={80}
          />
          <StatBar
            label="Speed"
            value={character.stats.speed}
            color={character.color}
            delay={90}
          />
          <StatBar
            label="Technique"
            value={character.stats.technique}
            color={character.color}
            delay={100}
          />
        </div>

        {/* Key feat */}
        <div
          style={{
            marginTop: 24,
            padding: "18px 24px",
            background: "rgba(255,255,255,0.04)",
            borderLeft: `4px solid ${character.color}`,
            borderRadius: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            KEY FEAT
          </span>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 32,
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.5,
              margin: 0,
              marginTop: 10,
            }}
          >
            {character.keyFeat.slice(0, featChars)}
            {featChars < character.keyFeat.length && (
              <span style={{ opacity: frame % 6 < 3 ? 1 : 0 }}>|</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
