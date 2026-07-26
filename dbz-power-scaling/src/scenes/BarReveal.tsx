import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { characters, FRAMES_PER_CHARACTER } from "../assets/characters";
import { CharacterBar, MAX_BAR_HEIGHT } from "../components/CharacterBar";

const VIEWPORT_WIDTH = 1080;
const MAX_VISIBLE_BARS = 5;
const BAR_GAP = 8;
const SIDE_PADDING = 20;

export const BarReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleCount = Math.min(
    characters.length,
    Math.floor(frame / FRAMES_PER_CHARACTER) + 1
  );

  const visibleChars = characters.slice(0, visibleCount);

  const displayCount = Math.min(visibleCount, MAX_VISIBLE_BARS);
  const barWidth =
    (VIEWPORT_WIDTH - SIDE_PADDING * 2 - BAR_GAP * (displayCount - 1)) /
    displayCount;

  const maxPower = visibleChars[visibleChars.length - 1].powerLevel;

  const scaleSpring = spring({
    frame: frame - (visibleCount - 1) * FRAMES_PER_CHARACTER,
    fps,
    config: { damping: 20, stiffness: 50 },
  });

  const displayChars = visibleChars.slice(-MAX_VISIBLE_BARS);

  const scrollOffset =
    visibleCount > MAX_VISIBLE_BARS
      ? interpolate(scaleSpring, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 0;

  const _ = scrollOffset;

  return (
    <div
      style={{
        width: VIEWPORT_WIDTH,
        height: 1920,
        background: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Thin baseline */}
      <div
        style={{
          position: "absolute",
          bottom: 139,
          left: SIDE_PADDING,
          right: SIDE_PADDING,
          height: 2,
          background: "#e0e0e0",
        }}
      />

      {/* Bars container */}
      <div
        style={{
          position: "absolute",
          left: SIDE_PADDING,
          right: SIDE_PADDING,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: BAR_GAP,
        }}
      >
        {displayChars.map((char, i) => {
          const revealIndex = characters.indexOf(char);
          const animDelay = revealIndex * FRAMES_PER_CHARACTER;

          const heightRatio = Math.log10(char.powerLevel + 1) / Math.log10(maxPower + 1);
          const barHeight = Math.max(40, heightRatio * MAX_BAR_HEIGHT);

          return (
            <CharacterBar
              key={char.name}
              character={char}
              barHeight={barHeight}
              barWidth={barWidth}
              animationDelay={animDelay}
            />
          );
        })}
      </div>
    </div>
  );
};
