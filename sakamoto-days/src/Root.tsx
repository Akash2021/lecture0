import React from "react";
import { Composition, Sequence, useCurrentFrame } from "remotion";
import {
  characters,
  INTRO_FRAMES,
  CHAR_FRAMES,
  RANK1_FRAMES,
  OUTRO_FRAMES,
} from "./assets/characters";
import { Intro } from "./scenes/Intro";
import { CharacterCard } from "./scenes/CharacterCard";
import { Outro } from "./scenes/Outro";
import { SlashTransition } from "./components/SlashTransition";
import { ScanlineOverlay } from "./components/ScanlineOverlay";

const FPS = 30;

const charDurations = characters.map((c) =>
  c.rank === 1 ? RANK1_FRAMES : CHAR_FRAMES
);
const TOTAL_CHAR_FRAMES = charDurations.reduce((a, b) => a + b, 0);
const TOTAL_DURATION = INTRO_FRAMES + TOTAL_CHAR_FRAMES + OUTRO_FRAMES;

const TRANSITION_DURATION = 45;

const SakamotoDays: React.FC = () => {
  const frame = useCurrentFrame();

  const bgPulseSpeed = 0.04 + (frame / TOTAL_DURATION) * 0.08;
  const bgPulse = Math.sin(frame * bgPulseSpeed) * 0.02 + 0.02;

  let charOffset = INTRO_FRAMES;
  const charSequences = characters.map((char, i) => {
    const from = charOffset;
    const duration = charDurations[i];
    charOffset += duration;

    const nextColor =
      i < characters.length - 1 ? characters[i + 1].color : "#F44336";

    return (
      <React.Fragment key={char.name}>
        <Sequence from={from} durationInFrames={duration}>
          <CharacterCard character={char} isRank1={char.rank === 1} />
        </Sequence>
        {i < characters.length - 1 && (
          <Sequence
            from={from + duration - TRANSITION_DURATION}
            durationInFrames={TRANSITION_DURATION}
          >
            <SlashTransition color={nextColor} />
          </Sequence>
        )}
      </React.Fragment>
    );
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: `radial-gradient(ellipse at 50% 50%, rgba(20,0,0,${bgPulse + 0.3}) 0%, #0a0a12 70%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {charSequences}

      <Sequence from={INTRO_FRAMES + TOTAL_CHAR_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>

      <ScanlineOverlay />
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SakamotoDays"
      component={SakamotoDays}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
