import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SceneTitleProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

export const SceneTitle: React.FC<SceneTitleProps> = ({
  title,
  subtitle,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const titleX = interpolate(titleProgress, [0, 1], [-200, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const underlineWidth = interpolate(titleProgress, [0, 1], [0, 100]);

  const subtitleOpacity = interpolate(frame - delay - 10, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 80,
        zIndex: 10,
        transform: `translateX(${titleX}px)`,
        opacity: titleOpacity,
      }}
    >
      <h1
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: "white",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          width: `${underlineWidth}%`,
          height: 3,
          background: "linear-gradient(90deg, #F5A623, #F5A62300)",
          marginTop: 8,
          maxWidth: 400,
        }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            marginTop: 10,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
