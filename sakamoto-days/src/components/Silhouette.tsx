import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SilhouetteProps {
  character: {
    name: string;
    color: string;
    rank: number;
    silhouetteDesc: string;
  };
  isRank1?: boolean;
  compact?: boolean;
}

const silhouettePaths: Record<string, string> = {
  Shishiba:
    "M50,95 L50,55 L42,55 L38,50 L32,52 L30,48 L35,42 L40,40 L45,30 C45,20 55,20 55,30 L60,40 L65,42 L70,48 L68,52 L62,50 L58,55 L50,55 L50,95 L58,95 L58,98 L42,98 L42,95 Z",
  Gaku:
    "M50,95 L50,50 L42,48 L38,42 L35,35 L38,28 C42,18 58,18 62,28 L65,35 L62,42 L58,48 L50,50 L50,95 L62,95 L62,98 L38,98 L38,95 Z M32,55 L25,65 L28,68 L35,58 Z M68,55 L75,65 L72,68 L65,58 Z",
  Nagumo:
    "M50,95 L50,50 L44,48 L42,42 L44,32 C44,22 56,22 56,32 L58,42 L56,48 L50,50 L50,95 L56,95 L56,98 L44,98 L44,95 Z M42,52 L36,58 L34,56 Z M58,52 L64,58 L66,56 Z",
  "Taro Sakamoto":
    "M50,95 L50,48 L40,46 L36,40 L38,30 C40,20 60,20 62,30 L64,40 L60,46 L50,48 L50,95 L62,95 L62,98 L38,98 L38,95 Z M36,50 L32,55 L30,60 L34,62 L38,56 Z M64,50 L68,55 L70,60 L66,62 L62,56 Z",
  Takamura:
    "M50,95 L50,48 L44,46 L42,40 L43,30 C44,20 56,20 57,30 L58,40 L56,46 L50,48 L50,95 L56,95 L56,98 L44,98 L44,95 Z M56,42 L70,25 L72,27 L58,44 Z",
};

export const Silhouette: React.FC<SilhouetteProps> = ({
  character,
  isRank1 = false,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - (compact ? 0 : 45),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const translateX = compact ? 0 : interpolate(slideIn, [0, 1], [-400, 0]);
  const opacity = compact ? 1 : interpolate(slideIn, [0, 1], [0, 1]);

  const size = compact ? 120 : 360;

  const flameGlow = isRank1 && !compact
    ? interpolate(frame % 30, [0, 15, 30], [30, 60, 30])
    : 0;

  const path =
    silhouettePaths[character.name] || silhouettePaths["Nagumo"];

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: compact ? undefined : `translateX(${translateX}px)`,
        opacity,
        position: "relative",
      }}
    >
      <svg
        viewBox="20 15 60 85"
        width={size}
        height={size}
        style={{
          filter: isRank1 && !compact
            ? `drop-shadow(0 0 ${flameGlow}px ${character.color}) drop-shadow(0 0 ${flameGlow * 2}px ${character.color}66)`
            : `drop-shadow(0 0 15px ${character.color}88)`,
        }}
      >
        <defs>
          <linearGradient
            id={`grad-${character.name.replace(/\s/g, "")}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={character.color} />
            <stop offset="100%" stopColor={`${character.color}88`} />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#grad-${character.name.replace(/\s/g, "")})`}
        />
      </svg>
      {/* Particle aura */}
      {!compact &&
        Array.from({ length: isRank1 ? 12 : 6 }).map((_, i) => {
          const angle = (i / (isRank1 ? 12 : 6)) * Math.PI * 2 + frame * 0.03;
          const radius = 140 + Math.sin(frame * 0.08 + i) * 20;
          const px = Math.cos(angle) * radius + size / 2;
          const py = Math.sin(angle) * radius + size / 2;
          const particleOpacity = interpolate(
            Math.sin(frame * 0.1 + i * 2),
            [-1, 1],
            [0.2, 0.7]
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px,
                top: py,
                width: isRank1 ? 6 : 4,
                height: isRank1 ? 6 : 4,
                borderRadius: "50%",
                background: character.color,
                opacity: particleOpacity,
                boxShadow: `0 0 8px ${character.color}`,
              }}
            />
          );
        })}
    </div>
  );
};
