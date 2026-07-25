import React from "react";
import { Sequence } from "remotion";
import { characters } from "../assets/characters";
import { CharacterCard } from "../components/CharacterCard";

const FRAMES_PER_CHARACTER = 120; // 4s at 30fps

export const CharacterShowcase: React.FC = () => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
      }}
    >
      {characters.map((character, i) => (
        <Sequence
          key={character.name}
          from={i * FRAMES_PER_CHARACTER}
          durationInFrames={FRAMES_PER_CHARACTER}
        >
          <CharacterCard character={character} />
        </Sequence>
      ))}
    </div>
  );
};
