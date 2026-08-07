import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SCENE_DURATIONS, SCENE_STARTS, COLORS } from "./tokens";
import { HookScene } from "./scenes/HookScene";
import { MetricsScene } from "./scenes/MetricsScene";
import { IsagiScene } from "./scenes/IsagiScene";
import { BarouScene } from "./scenes/BarouScene";
import { RinScene } from "./scenes/RinScene";
import { RankingScene } from "./scenes/RankingScene";
import { OutroScene } from "./scenes/OutroScene";

const SceneTransition: React.FC<{ start: number; duration: number }> = ({
  start,
  duration,
}) => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [start + duration - 10, start + duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeIn = interpolate(
    frame,
    [start, start + 8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = frame < start + 8 ? fadeIn : fadeOut;
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

// Scene definitions in order
const SCENES = [
  { key: "hook", Component: HookScene },
  { key: "intro", Component: MetricsScene },
  { key: "metrics", Component: MetricsScene },
  { key: "isagi", Component: IsagiScene },
  { key: "barou", Component: BarouScene },
  { key: "rin", Component: RinScene },
  { key: "ranking", Component: RankingScene },
  { key: "outro", Component: OutroScene },
] as const;

// Build durations array aligned with SCENE_DURATIONS keys
const DURATIONS_ARRAY = [
  SCENE_DURATIONS.hook,
  SCENE_DURATIONS.intro,
  SCENE_DURATIONS.metrics,
  SCENE_DURATIONS.isagi,
  SCENE_DURATIONS.barou,
  SCENE_DURATIONS.rin,
  SCENE_DURATIONS.ranking,
  SCENE_DURATIONS.outro,
];

export const BlueLockVideo: React.FC = () => {
  let offset = 0;
  const starts: number[] = [];
  DURATIONS_ARRAY.forEach((d) => {
    starts.push(offset);
    offset += d;
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: "Arial Black, sans-serif" }}>
      {SCENES.map(({ key, Component }, i) => (
        <Sequence key={key} from={starts[i]} durationInFrames={DURATIONS_ARRAY[i]}>
          <AbsoluteFill>
            <Component />
          </AbsoluteFill>
        </Sequence>
      ))}

      {/* Transition flash between scenes */}
      {starts.slice(1).map((start, i) => (
        <SceneTransition key={`t${i}`} start={start} duration={DURATIONS_ARRAY[i + 1]} />
      ))}
    </AbsoluteFill>
  );
};
