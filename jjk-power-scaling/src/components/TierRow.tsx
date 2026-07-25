import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Character, tierColors } from "../assets/characters";

interface TierRowProps {
  tier: string;
  characters: Character[];
  delay: number;
}

export const TierRow: React.FC<TierRowProps> = ({
  tier,
  characters,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rowReveal = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const opacity = interpolate(rowReveal, [0, 1], [0, 1]);
  const translateY = interpolate(rowReveal, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        marginBottom: 30,
        width: "100%",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          background: tierColors[tier],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: 40,
          fontWeight: 900,
          color: "#0a0a0f",
          marginRight: 20,
          flexShrink: 0,
        }}
      >
        {tier}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {characters.map((char, i) => {
          const chipSpring = spring({
            frame: frame - delay - 8 - i * 6,
            fps,
            config: { damping: 12, stiffness: 120 },
          });

          const chipTranslateY = interpolate(chipSpring, [0, 1], [-30, 0]);
          const chipOpacity = interpolate(chipSpring, [0, 1], [0, 1]);

          return (
            <div
              key={char.name}
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                background: `${char.color}33`,
                border: `2px solid ${char.color}`,
                fontFamily: "sans-serif",
                fontSize: 24,
                fontWeight: 700,
                color: "white",
                opacity: chipOpacity,
                transform: `translateY(${chipTranslateY}px)`,
                boxShadow: `0 0 10px ${char.color}44`,
              }}
            >
              {char.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
