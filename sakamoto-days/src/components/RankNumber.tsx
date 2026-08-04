import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface RankNumberProps {
  rank: number;
  color: string;
}

export const RankNumber: React.FC<RankNumberProps> = ({ rank, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slamSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 150, overshootClamping: false },
  });

  const translateX = interpolate(slamSpring, [0, 1], [-600, 0]);
  const scale = interpolate(slamSpring, [0, 0.5, 1], [2, 1.15, 1]);

  const shakeX =
    frame < 15
      ? interpolate(frame, [8, 10, 12, 14], [0, -8, 6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const shakeY =
    frame < 15
      ? interpolate(frame, [8, 11, 13, 15], [0, 5, -4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        transform: `translateX(${translateX + shakeX}px) translateY(${shakeY}px) scale(${scale})`,
      }}
    >
      <span
        style={{
          fontSize: 280,
          fontWeight: 900,
          fontFamily: "Oswald, sans-serif",
          color: "transparent",
          WebkitTextStroke: `3px ${color}`,
          textShadow: `0 0 60px ${color}88, 0 0 120px ${color}44`,
          lineHeight: 1,
        }}
      >
        #{rank}
      </span>
    </div>
  );
};
