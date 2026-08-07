# Blue Lock Transfer Market — Remotion Video

A 60-second animated video ranking Blue Lock strikers by real-world transfer market value.

## Quick Start

```bash
npm install
npm start          # Opens Remotion Studio in browser (preview + scrub)
npm run build      # Renders full MP4 to out/bluelock.mp4
```

## Scene Structure

| Scene | Duration | Content |
|-------|----------|---------|
| Hook | 6s | Dramatic intro — "Forget the anime hype" |
| Metrics | 8s | xG, HPE%, TVI explained |
| Isagi | 7s | False-9 Raumdeuter deep dive |
| Barou | 7s | Boom-or-bust volatility profile |
| Rin | 8s | Total Striker — record fee justified |
| Ranking | 11s | Full leaderboard reveal |
| Outro | 4s | Medical verdict + CTA |

## Composition Details

- **Resolution**: 1920×1080 (Full HD)
- **FPS**: 30
- **Duration**: 60 seconds / 1800 frames
- **Total compositions**: 1 (`BlueLockTransferValue`)

## Customization

Edit `src/tokens.ts` to:
- Change player valuations / stats
- Adjust color palette
- Tweak scene durations

Each scene is a standalone `src/scenes/*.tsx` component — swap or add scenes freely.

## File Structure

```
src/
├── Root.tsx              # Remotion entry point
├── BlueLockVideo.tsx     # Main composition + scene sequencing
├── tokens.ts             # Player data, colors, scene timings
├── animations.ts         # Shared spring/interpolate helpers
├── components/
│   └── StatBar.tsx       # Stat bar + valuation badge
└── scenes/
    ├── HookScene.tsx
    ├── MetricsScene.tsx
    ├── IsagiScene.tsx
    ├── BarouScene.tsx
    ├── RinScene.tsx
    ├── RankingScene.tsx
    └── OutroScene.tsx
```
