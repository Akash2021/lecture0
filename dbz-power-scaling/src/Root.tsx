import React from "react";
import { Composition } from "remotion";
import { BarReveal } from "./scenes/BarReveal";
import { characters, FRAMES_PER_CHARACTER } from "./assets/characters";

const FPS = 30;
const TOTAL_DURATION = characters.length * FRAMES_PER_CHARACTER; // 15 * 150 = 2250 frames = 75s, plus buffer
const FINAL_DURATION = TOTAL_DURATION + 5 * FPS; // 5s extra hold at end = 2400 frames = ~80s

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
