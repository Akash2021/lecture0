import React from "react";
import { Composition } from "remotion";
import { BarReveal } from "./scenes/BarReveal";
import { characters, FRAMES_PER_CHARACTER } from "./assets/characters";

const FPS = 30;
const REVEAL_DURATION = characters.length * FRAMES_PER_CHARACTER; // 15 * 105 = 1575 frames
const END_SCREEN_DURATION = 5 * FPS; // 150 frames
const FINAL_DURATION = REVEAL_DURATION + END_SCREEN_DURATION; // 1725 frames = ~57.5s

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DBZPowerScaling"
      component={BarReveal}
      durationInFrames={FINAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
