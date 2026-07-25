import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character, tierColors } from "../assets/characters";
import { AvatarPlaceholder } from "./AvatarPlaceholder";
import { StatBar } from "./StatBar";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-1080, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${translateX}px)`,
        padding: 60,
      }}
    >
      {character.imagePath ? (
        <Img
          src={staticFile(character.imagePath)}
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `3px solid ${character.color}`,
            boxShadow: `0 0 20px ${character.color}, 0 0 40px ${character.color}66`,
            objectFit: "cover",
          }}
        />
      ) : (
        <AvatarPlaceholder name={character.name} color={character.color} />
      )}

      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: 64,
          fontWeight: 900,
          color: "white",
          marginTop: 30,
          textShadow: `0 0 20px ${character.color}`,
        }}
      >
        {character.name}
      </h2>

      <div
        style={{
          padding: "8px 24px",
          borderRadius: 20,
          background: tierColors[character.tier],
          fontFamily: "sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: "#0a0a0f",
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        {character.tier} Tier
      </div>

      <div style={{ width: "100%", maxWidth: 500 }}>
        <StatBar
          label="Power"
          value={character.stats.power}
          color={character.color}
          delay={10}
        />
        <StatBar
          label="Speed"
          value={character.stats.speed}
          color={character.color}
          delay={16}
        />
        <StatBar
          label="Technique"
          value={character.stats.technique}
          color={character.color}
          delay={22}
        />
        <StatBar
          label="Cursed Energy"
          value={character.stats.cursedEnergy}
          color={character.color}
          delay={28}
        />
        <StatBar
          label="Battle IQ"
          value={character.stats.battleIQ}
          color={character.color}
          delay={34}
        />
      </div>
    </div>
  );
};
