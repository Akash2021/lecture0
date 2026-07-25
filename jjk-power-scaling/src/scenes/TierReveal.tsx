import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { getCharactersByTier } from "../assets/characters";
import { TierRow } from "../components/TierRow";

const tiers = ["S", "A", "B"];

export const TierReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: 56,
          fontWeight: 900,
          color: "white",
          marginBottom: 60,
          opacity: titleOpacity,
          textShadow: "0 0 20px #7c3aed",
        }}
      >
        Tier List
      </h2>

      {tiers.map((tier, i) => (
        <TierRow
          key={tier}
          tier={tier}
          characters={getCharactersByTier(tier)}
          delay={20 + i * 25}
        />
      ))}
    </div>
  );
};
