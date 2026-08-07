import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useFadeIn = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useSlideUp = (delay = 0, duration = 25) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const y = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  return { y, opacity };
};

export const useCountUp = (
  target: number,
  delay = 0,
  duration = 60
) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [delay, delay + duration], [0, target], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};

export const useBarWidth = (target: number, delay = 0, duration = 45) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });
  return interpolate(progress, [0, 1], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useScaleIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });
  return interpolate(progress, [0, 1], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useGlitch = (intensity = 4) => {
  const frame = useCurrentFrame();
  if (frame % 7 === 0) return { x: (Math.random() - 0.5) * intensity, opacity: 0.9 };
  return { x: 0, opacity: 1 };
};
