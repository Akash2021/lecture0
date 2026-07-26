import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character } from "../assets/characters";
import { PlaceholderAvatar } from "./PlaceholderAvatar";
import { PowerLabel } from "./PowerLabel";
import { RankLabel } from "./RankLabel";

interface CharacterBarProps {
  character: Character;
  barHeight: number;
  barWidth: number;
  animationDelay: number;
}

const AVATAR_SIZE = 260;
const RANK_AREA_HEIGHT = 120;
const BAR_AREA_TOP = 800;
const BAR_AREA_BOTTOM = 1920 - RANK_AREA_HEIGHT - 40;
const MAX_BAR_HEIGHT = BAR_AREA_BOTTOM - BAR_AREA_TOP;

export const CharacterBar: React.FC<CharacterBarProps> = ({
  character,
  barHeight,
  barWidth,
  animationDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const growSpring = spring({
    frame: frame - animationDelay,
    fps,
    config: { damping: 18, stiffness: 60, overshootClamping: false },
  });

  const slideIn = spring({
    frame: frame - animationDelay,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const clampedHeight = Math.min(barHeight, MAX_BAR_HEIGHT);
  const currentHeight = interpolate(growSpring, [0, 1], [0, clampedHeight]);
  const slideX = interpolate(slideIn, [0, 1], [200, 0]);
  const barOpacity = interpolate(slideIn, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const darkerColor = character.color + "cc";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: barWidth,
        height: 1920,
        position: "relative",
        opacity: barOpacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Avatar on top of bar */}
      <div
        style={{
          position: "absolute",
          bottom: RANK_AREA_HEIGHT + 40 + currentHeight,
          zIndex: 2,
        }}
      >
        {character.imagePath ? (
          <Img
            src={staticFile(character.imagePath)}
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              objectFit: "contain",
            }}
          />
        ) : (
          <PlaceholderAvatar
            name={character.name}
            color={character.color}
            size={AVATAR_SIZE}
          />
        )}
      </div>

      {/* Bar */}
      <div
        style={{
          position: "absolute",
          bottom: RANK_AREA_HEIGHT + 40,
          width: barWidth - 12,
          height: currentHeight,
          background: `linear-gradient(0deg, ${character.color}22 0%, ${character.color}88 30%, ${character.color} 70%, ${character.color}dd 100%)`,
          borderTop: `3px solid ${character.color}`,
          borderLeft: `1px solid ${character.color}44`,
          borderRight: `1px solid ${character.color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentHeight > 60 && (
          <PowerLabel
            powerLevel={character.powerLevel}
            animationDelay={animationDelay}
          />
        )}
      </div>

      {/* Rank + Name below bar */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: barWidth,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RankLabel
          rank={character.rank}
          name={character.name}
          color={character.color}
          animationDelay={animationDelay}
        />
      </div>
    </div>
  );
};

export { MAX_BAR_HEIGHT };
