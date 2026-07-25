import React from "react";
import { Composition } from "remotion";
import { DijkstraVideo, COMPOSITION_DURATION } from "./DijkstraVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DijkstraAlgorithm"
        component={DijkstraVideo}
        durationInFrames={COMPOSITION_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
