# Remotion Video Project — Quick Start Guide

A reference for AI agents creating Remotion video projects in this environment. Covers setup pitfalls, rendering, and best practices learned from building three video projects.

---

## Environment Constraints

1. **Network policy blocks external downloads.** `remotion.media` is blocked — Remotion cannot download Chromium automatically.
2. **Pre-installed Chromium** is available at:
   ```
   /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
   ```
3. **TypeScript 5 only.** TypeScript 7 breaks Remotion's esbuild bundler (`Cannot read properties of undefined (reading 'readFile')`). Always install `typescript@5`.
4. **No interactive prompts.** `npx create-video` hangs on interactive input. Create the project manually instead.

---

## Project Setup (Manual)

```bash
mkdir my-video && cd my-video
npm init -y

# Install Remotion + TypeScript 5
npm install remotion @remotion/cli @remotion/bundler react react-dom
npm install -D typescript@5 @types/react @types/react-dom

# For Google Fonts (optional)
npm install @remotion/google-fonts
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### remotion.config.ts

```ts
import { Config } from "@remotion/cli/config";
Config.setImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

### package.json scripts

```json
{
  "scripts": {
    "start": "remotion studio src/index.ts",
    "build": "remotion render src/index.ts CompositionId out/video.mp4 --browser-executable=\"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell\"",
    "preview": "remotion preview src/index.ts"
  }
}
```

### Minimal src/index.ts

```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
registerRoot(RemotionRoot);
```

---

## Rendering

Always pass the browser executable flag:

```bash
npx remotion render src/index.ts <CompositionId> out/video.mp4 \
  --browser-executable="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
```

**Common render errors:**
- `Could not find composition with ID X` — Check the `id` prop in your `<Composition>` component matches exactly.
- `Cannot read properties of undefined (reading 'readFile')` — You're on TypeScript 7. Downgrade: `npm install typescript@5`.
- `403` or download errors for Chrome — You forgot the `--browser-executable` flag.

---

## Image System

For character images or any static assets:

1. Place images in `public/characters/` (create `mkdir -p public/characters/`).
2. Reference them with `staticFile()` from Remotion:
   ```tsx
   import { Img, staticFile } from "remotion";
   <Img src={staticFile("/characters/name.png")} style={{ width: 500, height: 500, objectFit: "contain" }} />
   ```
3. Use a nullable `imagePath` field in your data so you can fall back to a placeholder/silhouette when no image is available yet.

---

## Video Format: YouTube Shorts (Portrait)

```
Width:  1080
Height: 1920
FPS:    30
```

---

## Layout Best Practices

- **Use flex column layout** for full-screen cards — avoids absolute positioning gaps that are hard to debug.
- **Don't anchor info panels to `bottom`** — use natural flow or explicit `top` values.
- **Font sizes for 1080x1920 portrait:**
  - Title/Name: 72–82px
  - Subtitle: 30–36px
  - Stats/labels: 26px
  - Body text (key feat, descriptions): 32–38px
  - Small labels: 22–26px
- **Always test that text isn't clipped** at the bottom of the frame.

---

## Pacing Guidelines (for ranking/countdown videos)

| Section | Recommended Duration |
|---------|---------------------|
| Intro/title card | 2s (60 frames) |
| Character card (standard) | 8–9.5s (255–285 frames) |
| Character card (final/top rank) | 11–12s (330–360 frames) |
| Outro/CTA | 6–7s (180–200 frames) |
| Slash transition | 1.5s (45 frames) |

- Cut to the next card shortly after the last piece of info finishes animating — don't hold on a static screen.
- Add subtle continuous motion (slow zoom, pulsing glow) to prevent static frames.
- Keep outro elements (portraits, CTA) at full opacity until the last frame — no fade out.

---

## Animation Patterns

### Spring animations (most UI entrances)
```tsx
import { spring, interpolate } from "remotion";

const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });
const translateY = interpolate(progress, [0, 1], [100, 0]);
```

### Typing effect
```tsx
const typing = interpolate(frame - startFrame, [0, 60], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
const visibleChars = Math.round(text.length * typing);
```

### Slow zoom (keeps visuals alive)
```tsx
const zoom = interpolate(frame, [0, 300], [1, 1.06], { extrapolateRight: "clamp" });
```

### Pulsing glow
```tsx
const glow = interpolate(Math.sin(frame * 0.15), [-1, 1], [8, 20]);
style={{ boxShadow: `0 0 ${glow}px ${color}88` }}
```

---

## Git / Output

- `out/` is typically gitignored. Use `git add -f out/video.mp4` to force-add the rendered video.
- Commit images in `public/characters/` normally — they're not gitignored.

---

## Checklist Before First Render

- [ ] TypeScript version is 5.x (`npx tsc --version`)
- [ ] `remotion.config.ts` exists with image format and overwrite settings
- [ ] `src/index.ts` calls `registerRoot`
- [ ] Composition `id` matches what you pass to `remotion render`
- [ ] `public/` directory exists for any static assets
- [ ] Render command includes `--browser-executable` flag
