import React from "react";
import { Composition } from "remotion";
import { BlueLockVideo } from "./BlueLockVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BlueLockTransferValue"
      component={BlueLockVideo}
      durationInFrames={1800} // 60s at 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
