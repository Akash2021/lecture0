import React from "react";
import { Composition, Sequence } from "remotion";
import { Scene1_WhatIsAPulley } from "./scenes/Scene1_WhatIsAPulley";
import { Scene2_FixedPulley } from "./scenes/Scene2_FixedPulley";
import { Scene3_MovablePulley } from "./scenes/Scene3_MovablePulley";
import { Scene4_CompoundPulley } from "./scenes/Scene4_CompoundPulley";
import { Scene5_RealWorld } from "./scenes/Scene5_RealWorld";

const FPS = 30;

const SCENE1_FRAMES = 300;  // 10s
const SCENE2_FRAMES = 600;  // 20s
const SCENE3_FRAMES = 750;  // 25s
const SCENE4_FRAMES = 750;  // 25s
const SCENE5_FRAMES = 300;  // 10s

const TOTAL = SCENE1_FRAMES + SCENE2_FRAMES + SCENE3_FRAMES + SCENE4_FRAMES + SCENE5_FRAMES;

const TRANSITION = 20;

const PulleyMechanics: React.FC = () => {
  let offset = 0;

  const scenes = [
    { Component: Scene1_WhatIsAPulley, duration: SCENE1_FRAMES },
    { Component: Scene2_FixedPulley, duration: SCENE2_FRAMES },
    { Component: Scene3_MovablePulley, duration: SCENE3_FRAMES },
    { Component: Scene4_CompoundPulley, duration: SCENE4_FRAMES },
    { Component: Scene5_RealWorld, duration: SCENE5_FRAMES },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: "#0F1117",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {scenes.map(({ Component, duration }, i) => {
        const from = offset;
        offset += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration + TRANSITION}>
            <Component />
          </Sequence>
        );
      })}

      {/* Blueprint grid overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </div>
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
