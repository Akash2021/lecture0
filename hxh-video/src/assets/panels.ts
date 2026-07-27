// To add manga panels:
// 1. Drop panel images into /public/panels/
// 2. Set imagePath: "/panels/kurapika-thinking.png" for that panel
// 3. Image automatically replaces placeholder

export interface PanelConfig {
  id: string;
  label: string;
  imagePath: string | null;
  width: number;
  height: number;
}

export const panels: Record<string, PanelConfig> = {
  kurapikaFace: {
    id: "kurapika-face",
    label: "Kurapika",
    imagePath: null,
    width: 500,
    height: 600,
  },
  guard1: {
    id: "guard-1",
    label: "Guard",
    imagePath: null,
    width: 300,
    height: 500,
  },
  guard2: {
    id: "guard-2",
    label: "Guard",
    imagePath: null,
    width: 300,
    height: 500,
  },
  kurapikaThinking: {
    id: "kurapika-thinking",
    label: "Kurapika Thinking",
    imagePath: null,
    width: 700,
    height: 500,
  },
  dialogue1: {
    id: "dialogue-1",
    label: "Dialogue",
    imagePath: null,
    width: 600,
    height: 200,
  },
  dialogue2: {
    id: "dialogue-2",
    label: "Dialogue",
    imagePath: null,
    width: 600,
    height: 200,
  },
  dialogue3: {
    id: "dialogue-3",
    label: "Dialogue",
    imagePath: null,
    width: 600,
    height: 200,
  },
  gonSilhouette: {
    id: "gon-silhouette",
    label: "Gon",
    imagePath: null,
    width: 350,
    height: 600,
  },
  killuaSilhouette: {
    id: "killua-silhouette",
    label: "Killua",
    imagePath: null,
    width: 350,
    height: 600,
  },
  mangaTexture: {
    id: "manga-texture",
    label: "Manga Pattern",
    imagePath: null,
    width: 1080,
    height: 1920,
  },
};
