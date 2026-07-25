import React from "react";
import { Composition, Sequence } from "remotion";
import { Intro } from "./scenes/Intro";
import { CharacterShowcase } from "./scenes/CharacterShowcase";
import { TierReveal } from "./scenes/TierReveal";
import { Outro } from "./scenes/Outro";

const FPS = 30;
const INTRO_DURATION = 3 * FPS; // 90 frames
const SHOWCASE_DURATION = 32 * FPS; // 960 frames (8 chars × 4s)
const TIER_REVEAL_DURATION = 15 * FPS; // 450 frames
const OUTRO_DURATION = 10 * FPS; // 300 frames
const TOTAL_DURATION = INTRO_DURATION + SHOWCASE_DURATION + TIER_REVEAL_DURATION + OUTRO_DURATION; // 1800 = 60s

const JJKPowerScaling: React.FC = () => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <Intro />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={SHOWCASE_DURATION}>
        <CharacterShowcase />
      </Sequence>
      <Sequence
        from={INTRO_DURATION + SHOWCASE_DURATION}
        durationInFrames={TIER_REVEAL_DURATION}
      >
        <TierReveal />
      </Sequence>
      <Sequence
        from={INTRO_DURATION + SHOWCASE_DURATION + TIER_REVEAL_DURATION}
        durationInFrames={OUTRO_DURATION}
      >
        <Outro />
      </Sequence>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="JJKPowerScaling"
      component={JJKPowerScaling}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
