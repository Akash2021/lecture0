import React from "react";
import { Composition, Sequence } from "remotion";
import { Scene1_TheProblem } from "./scenes/Scene1_TheProblem";
import { Scene2_WorkConserved } from "./scenes/Scene2_WorkConserved";
import { Scene3_RopeTension } from "./scenes/Scene3_RopeTension";
import { Scene4_FixedPulley } from "./scenes/Scene4_FixedPulley";
import { Scene5_MovablePulley } from "./scenes/Scene5_MovablePulley";
import { Scene6_AddingPulleys } from "./scenes/Scene6_AddingPulleys";
import { Scene7_LimitsRealWorld } from "./scenes/Scene7_LimitsRealWorld";

const FPS = 30;

const SCENE_DURATIONS = {
  scene1: 14 * FPS,   // 0-14s: The Problem (420 frames)
  scene2: 20 * FPS,   // 14-34s: Work Conserved (600 frames)
  scene3: 20 * FPS,   // 34-54s: Rope Tension (600 frames)
  scene4: 22 * FPS,   // 54-76s: Fixed Pulley (660 frames)
  scene5: 28 * FPS,   // 76-104s: Movable Pulley (840 frames)
  scene6: 30 * FPS,   // 104-134s: Adding Pulleys (900 frames)
  scene7: 26 * FPS,   // 134-160s: Real-World Limits (780 frames)
};

const TOTAL = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

const PulleyMechanics: React.FC = () => {
  let offset = 0;
  const seq = (duration: number, children: React.ReactNode) => {
    const el = <Sequence from={offset} durationInFrames={duration} key={offset}>{children}</Sequence>;
    offset += duration;
    return el;
  };

  return (
    <>
      {seq(SCENE_DURATIONS.scene1, <Scene1_TheProblem />)}
      {seq(SCENE_DURATIONS.scene2, <Scene2_WorkConserved />)}
      {seq(SCENE_DURATIONS.scene3, <Scene3_RopeTension />)}
      {seq(SCENE_DURATIONS.scene4, <Scene4_FixedPulley />)}
      {seq(SCENE_DURATIONS.scene5, <Scene5_MovablePulley />)}
      {seq(SCENE_DURATIONS.scene6, <Scene6_AddingPulleys />)}
      {seq(SCENE_DURATIONS.scene7, <Scene7_LimitsRealWorld />)}
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PulleyMechanics"
      component={PulleyMechanics}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
