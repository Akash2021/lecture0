import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { characters, FRAMES_PER_CHARACTER } from "../assets/characters";
import { CharacterBar, MAX_BAR_HEIGHT } from "../components/CharacterBar";

const VIEWPORT_WIDTH = 1080;
const MAX_VISIBLE_BARS = 5;
const BAR_GAP = 8;
const SIDE_PADDING = 20;
const END_SCREEN_DURATION = 150; // 5s at 30fps

const GOD_TIER_INDEX = 11; // SSJ3 Goku onward (index in array = billions+)

const top3 = [...characters].sort((a, b) => b.powerLevel - a.powerLevel).slice(0, 3);

export const BarReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalRevealFrames = characters.length * FRAMES_PER_CHARACTER;
  const isEndScreen = frame >= totalRevealFrames;

  const visibleCount = Math.min(
    characters.length,
    Math.floor(frame / FRAMES_PER_CHARACTER) + 1
  );

  const visibleChars = characters.slice(0, visibleCount);

  const displayCount = Math.min(visibleCount, MAX_VISIBLE_BARS);
  const barWidth =
    (VIEWPORT_WIDTH - SIDE_PADDING * 2 - BAR_GAP * (displayCount - 1)) /
    displayCount;

  const maxPower = visibleChars[visibleChars.length - 1].powerLevel;

  const displayChars = visibleChars.slice(-MAX_VISIBLE_BARS);

  const godTierProgress = interpolate(
    visibleCount,
    [GOD_TIER_INDEX, characters.length],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bgGlow = interpolate(godTierProgress, [0, 1], [0, 0.15]);
  const energyPulse = Math.sin(frame * 0.05) * 0.03 * godTierProgress;

  const endScreenOpacity = isEndScreen
    ? interpolate(frame - totalRevealFrames, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 0;

  const endScreenScale = isEndScreen
    ? interpolate(
        spring({
          frame: frame - totalRevealFrames,
          fps,
          config: { damping: 14, stiffness: 80 },
        }),
        [0, 1],
        [0.85, 1]
      )
    : 0.85;

  return (
    <div
      style={{
        width: VIEWPORT_WIDTH,
        height: 1920,
        background: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic energy background for god tier */}
      {godTierProgress > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 50% 80%, rgba(255,165,0,${bgGlow + energyPulse}) 0%, rgba(148,0,211,${(bgGlow + energyPulse) * 0.6}) 40%, rgba(255,255,255,0) 70%)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Thin baseline */}
      <div
        style={{
          position: "absolute",
          bottom: 159,
          left: SIDE_PADDING,
          right: SIDE_PADDING,
          height: 2,
          background: godTierProgress > 0 ? `rgba(180,140,255,${0.3 + godTierProgress * 0.3})` : "#e0e0e0",
          zIndex: 1,
        }}
      />

      {/* Bars container */}
      {!isEndScreen && (
        <div
          style={{
            position: "absolute",
            left: SIDE_PADDING,
            right: SIDE_PADDING,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: BAR_GAP,
            zIndex: 1,
          }}
        >
          {displayChars.map((char) => {
            const revealIndex = characters.indexOf(char);
            const animDelay = revealIndex * FRAMES_PER_CHARACTER;

            const heightRatio =
              Math.log10(char.powerLevel + 1) / Math.log10(maxPower + 1);
            const barHeight = Math.max(40, heightRatio * MAX_BAR_HEIGHT);

            return (
              <CharacterBar
                key={char.name}
                character={char}
                barHeight={barHeight}
                barWidth={barWidth}
                animationDelay={animDelay}
              />
            );
          })}
        </div>
      )}

      {/* End screen */}
      {isEndScreen && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
            opacity: endScreenOpacity,
            transform: `scale(${endScreenScale})`,
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontFamily: "sans-serif",
              fontSize: 56,
              fontWeight: 900,
              color: "#1a1a2e",
              marginBottom: 60,
              textAlign: "center",
            }}
          >
            TOP 3 POWER LEVELS
          </h2>

          {top3.map((char, i) => {
            const chipDelay = spring({
              frame: frame - totalRevealFrames - 15 - i * 12,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const chipY = interpolate(chipDelay, [0, 1], [50, 0]);
            const chipOpacity = interpolate(chipDelay, [0, 1], [0, 1]);

            const medal = ["1st", "2nd", "3rd"][i];
            const medalColor = ["#FFD700", "#C0C0C0", "#CD7F32"][i];

            return (
              <div
                key={char.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 30,
                  width: "100%",
                  maxWidth: 700,
                  opacity: chipOpacity,
                  transform: `translateY(${chipY}px)`,
                  background: `linear-gradient(135deg, ${char.color}18, ${char.color}08)`,
                  borderRadius: 20,
                  padding: "20px 30px",
                  border: `3px solid ${char.color}44`,
                }}
              >
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: medalColor,
                    fontFamily: "sans-serif",
                    marginRight: 24,
                    minWidth: 80,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {medal}
                </span>
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: char.color,
                      fontFamily: "sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {char.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#333",
                    fontFamily: "sans-serif",
                  }}
                >
                  {char.powerLevel >= 1_000_000_000
                    ? (char.powerLevel / 1_000_000_000).toFixed(0) + "B"
                    : char.powerLevel.toLocaleString()}
                </span>
              </div>
            );
          })}

          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 38,
              fontWeight: 700,
              color: "#555",
              marginTop: 60,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Who did I miss for Part 2?
          </p>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#888",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Drop your picks in the comments!
          </p>
        </div>
      )}
    </div>
  );
};
