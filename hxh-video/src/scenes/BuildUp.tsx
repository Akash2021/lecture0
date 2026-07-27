import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { panels } from "../assets/panels";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { ConnectionLines } from "../components/ConnectionLines";
import { CountdownBadge } from "../components/CountdownBadge";

// Voiceover narration (10-28s):
// "Think about it. The curse on Prince Woble. Beyond Netero's plan.
//  And the connection between them all. Kurapika sees it now.
//  The pieces are falling into place — and the picture is terrifying."

const connectionNodes = [
  { x: 250, y: 1200, label: "THE CURSE" },
  { x: 540, y: 1050, label: "PRINCE WOBLE" },
  { x: 830, y: 1200, label: "BEYOND'S PLAN" },
];

export const BuildUp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom on Kurapika thinking panel
  const zoom = interpolate(frame, [0, 540], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Dialogue bubbles stagger every 40 frames starting at frame 60
  const dialogues = [panels.dialogue1, panels.dialogue2, panels.dialogue3];

  // Countdown pulses at frame 300 (frame 600 global)
  const counterPulse = frame >= 300;

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
      {/* Heartbeat SFX at frame 200 (frame 500 global) */}
      {frame >= 200 && (
        <Audio src={staticFile("audio/sfx/heartbeat.mp3")} volume={0.4} />
      )}

      {/* Kurapika thinking - slow zoom */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        <PlaceholderPanel
          panel={panels.kurapikaThinking}
          style={{ width: 700, height: 450 }}
        />
      </div>

      {/* Dialogue bubbles */}
      {dialogues.map((panel, i) => {
        const appearAt = 60 + i * 40;
        const bubbleSpring = spring({
          frame: frame - appearAt,
          fps,
          config: { damping: 12, stiffness: 120 },
        });
        const bubbleScale = interpolate(bubbleSpring, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        });
        const yOffset = 700 + i * 90;

        if (frame < appearAt) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: yOffset,
              left: "50%",
              transform: `translateX(-50%) scale(${bubbleScale})`,
              transformOrigin: "center",
            }}
          >
            <PlaceholderPanel
              panel={panel}
              style={{ width: 500, height: 70, borderRadius: 20 }}
            />
          </div>
        );
      })}

      {/* Connection lines between concept nodes */}
      <ConnectionLines
        nodes={connectionNodes}
        appearFrame={180}
        drawDuration={180}
      />

      <CountdownBadge visible={true} pulse={counterPulse} />
    </div>
  );
};
