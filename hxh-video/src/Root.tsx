import React from "react";
import { Audio, Composition, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Hook } from "./scenes/Hook";
import { Context } from "./scenes/Context";
import { BuildUp } from "./scenes/BuildUp";
import { Reveal } from "./scenes/Reveal";
import { EmotionalEnding } from "./scenes/EmotionalEnding";
import { CTA } from "./scenes/CTA";

const FPS = 30;
const TOTAL_FRAMES = 1800; // 60 seconds

const HxHVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Background music volume: 0.15 normally, swells to 0.4 during emotional ending
  // Silence window at frames 1500-1515
  const musicVolume = (() => {
    // Silence window
    if (frame >= 1500 && frame <= 1515) return 0;
    // Emotional swell (frames 1350-1410)
    if (frame >= 1350 && frame <= 1710) {
      return interpolate(frame, [1350, 1410], [0.15, 0.4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    return 0.15;
  })();

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0d0d0d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Voiceover narration */}
      <Audio src={staticFile("audio/narration.mp3")} volume={1} />

      {/* Background music */}
      <Audio src={staticFile("audio/bgmusic.mp3")} volume={musicVolume} />

      {/* Scene 1: Hook (0-3s, frames 0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <Hook />
      </Sequence>

      {/* Scene 2: Context (3-10s, frames 90-300) */}
      <Sequence from={90} durationInFrames={210}>
        <Context />
      </Sequence>

      {/* Scene 3: Build Up (10-28s, frames 300-840) */}
      <Sequence from={300} durationInFrames={540}>
        <BuildUp />
      </Sequence>

      {/* Scene 4: Reveal (28-45s, frames 840-1350) */}
      <Sequence from={840} durationInFrames={510}>
        <Reveal />
      </Sequence>

      {/* Scene 5: Emotional Ending (45-57s, frames 1350-1710) */}
      <Sequence from={1350} durationInFrames={360}>
        <EmotionalEnding />
      </Sequence>

      {/* Scene 6: CTA (57-60s, frames 1710-1800) */}
      <Sequence from={1710} durationInFrames={90}>
        <CTA />
      </Sequence>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HxHChapter414"
      component={HxHVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
