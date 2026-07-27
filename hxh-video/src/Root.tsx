import React from "react";
import {
  Composition,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Sparkle } from "./components/Sparkle";
import { HUDCounter } from "./components/HUDCounter";

const FPS = 30;
const TOTAL_FRAMES = 1800; // 60 seconds

const FlashOverlay: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [triggerFrame - 2, triggerFrame, triggerFrame + 2, triggerFrame + 10],
    [0, 0.7, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#fff",
        opacity,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
};

const RedPulseOverlay: React.FC<{
  startFrame: number;
  endFrame: number;
  interval?: number;
}> = ({ startFrame, endFrame, interval = 40 }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame > endFrame) return null;

  const cyclePos = (frame - startFrame) % interval;
  const opacity = cyclePos < 8 ? 0.1 * (1 - cyclePos / 8) : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#cc0000",
        opacity,
        zIndex: 5,
        pointerEvents: "none",
      }}
    />
  );
};

const TimerBar: React.FC<{
  startFrame: number;
  endFrame: number;
}> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame > endFrame) return null;

  const progress = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 170,
        left: 60,
        width: 960,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 2,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: "#cc0000",
          borderRadius: 2,
          boxShadow: "0 0 10px rgba(204, 0, 0, 0.5)",
        }}
      />
    </div>
  );
};

const HxHVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Sepia filter for emotional scene (frames 1350-1710)
  const sepiaAmount = interpolate(
    frame,
    [1350, 1400, 1650, 1710],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const brightness = sepiaAmount > 0 ? 0.85 : 1;

  // Vignette intensity — stronger during emotional scenes
  const vignetteOpacity = interpolate(
    frame,
    [0, 30, 1350, 1400, 1650, 1710],
    [0.5, 0.3, 0.3, 0.75, 0.75, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // HUD counter: visible from scene 2 through scene 4, fades in scene 5
  const hudVisible = frame >= 90 && frame < 1600;
  const hudPulse = (frame >= 500 && frame < 700) || (frame >= 840 && frame < 1350);
  const hudOpacity = interpolate(frame, [1500, 1600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chapter badge fades in and out
  const badgeOpacity = interpolate(
    frame,
    [40, 60, 1650, 1710],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
      {/* === BASE VIDEO LAYER === */}
      {/* 70s source mapped to 60s output via playbackRate */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          filter: `sepia(${sepiaAmount}) brightness(${brightness})`,
        }}
      >
        <OffthreadVideo
          src={staticFile("video/HxH.mp4")}
          style={{
            width: 1080,
            height: 1920,
            objectFit: "cover",
          }}
          volume={1}
          playbackRate={70 / 60}
        />
      </div>

      {/* === ATMOSPHERIC OVERLAYS === */}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)",
          opacity: vignetteOpacity,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Top safe zone gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 200,
          background: "linear-gradient(rgba(0,0,0,0.5), transparent)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* Bottom safe zone gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
          height: 250,
          background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* === SCENE EFFECTS (no duplicate text/audio — video has it baked in) === */}

      {/* Scene 1: Hook flash */}
      <Sequence from={0} durationInFrames={90}>
        <FlashOverlay triggerFrame={10} />
      </Sequence>

      {/* Scene 2: Context — red alarm pulse */}
      <Sequence from={90} durationInFrames={210}>
        <RedPulseOverlay startFrame={0} endFrame={210} interval={35} />
      </Sequence>

      {/* Scene 4: Reveal — impact flash + timer bar */}
      <Sequence from={840} durationInFrames={510}>
        <FlashOverlay triggerFrame={5} />
        <TimerBar startFrame={0} endFrame={510} />
      </Sequence>

      {/* === PERSISTENT UI ELEMENTS === */}

      {/* HUD Countdown */}
      <div style={{ opacity: hudOpacity, zIndex: 15 }}>
        <HUDCounter visible={hudVisible} pulse={hudPulse} />
      </div>

      {/* Sparkle effects — match reference video's diamond sparkle */}
      <div style={{ zIndex: 12 }}>
        <Sparkle x={980} y={1720} size={22} delay={15} />
        <Sparkle x={960} y={1690} size={14} delay={45} />
        <Sparkle x={80} y={250} size={16} delay={90} />
        <Sparkle x={990} y={600} size={12} delay={180} />
      </div>

      {/* Chapter badge top-left */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 55,
          zIndex: 10,
          opacity: badgeOpacity,
        }}
      >
        <span
          style={{
            color: "#cc0000",
            fontSize: 15,
            fontFamily: "sans-serif",
            fontWeight: 800,
            letterSpacing: 3,
            textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            textTransform: "uppercase",
          }}
        >
          CH. 414
        </span>
      </div>
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
