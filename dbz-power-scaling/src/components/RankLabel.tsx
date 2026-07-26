import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface RankLabelProps {
  rank: number;
  name: string;
  color: string;
  animationDelay: number;
}

const ordinalSuffix = (n: number): string => {
  const s = ["TH", "ST", "ND", "RD"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export const RankLabel: React.FC<RankLabelProps> = ({
  rank,
  name,
  color,
  animationDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({
    frame: frame - animationDelay - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const translateY = interpolate(slideUp, [0, 1], [40, 0]);
  const opacity = interpolate(slideUp, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            color,
            fontFamily: "sans-serif",
            fontStyle: "italic",
            textShadow: `2px 2px 0 rgba(0,0,0,0.15), -1px -1px 0 rgba(0,0,0,0.05)`,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {rank}
        </span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 900,
            color,
            fontFamily: "sans-serif",
            fontStyle: "italic",
            marginLeft: 2,
            textShadow: `1px 1px 0 rgba(0,0,0,0.15)`,
            lineHeight: 1,
            alignSelf: "flex-start",
            marginTop: 4,
          }}
        >
          {ordinalSuffix(rank)}
        </span>
      </div>
      <span
        style={{
          fontSize: 26,
          fontWeight: 900,
          color,
          fontFamily: "sans-serif",
          textTransform: "uppercase",
          letterSpacing: 2,
          textShadow: `1px 1px 0 rgba(0,0,0,0.1), 2px 2px 0 rgba(0,0,0,0.05)`,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: 160,
          marginTop: 2,
        }}
      >
        {name}
      </span>
    </div>
  );
};
