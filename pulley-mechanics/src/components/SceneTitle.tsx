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

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const titleX = interpolate(progress, [0, 1], [-160, 0]);
  const titleOpacity = interpolate(progress, [0, 1], [0, 1]);
  const underlineW = interpolate(progress, [0, 1], [0, 100]);

  const subOpacity = interpolate(frame - delay - 12, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 60,
        zIndex: 10,
        transform: `translateX(${titleX}px)`,
        opacity: titleOpacity,
      }}
    >
      <h1
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 42,
          fontWeight: 700,
          color: "white",
          margin: 0,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          width: `${underlineW}%`,
          height: 3,
          background: "linear-gradient(90deg, #FFD60A, #FFD60A00)",
          marginTop: 6,
          maxWidth: 350,
        }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            marginTop: 8,
            opacity: subOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
