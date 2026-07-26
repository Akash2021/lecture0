// To add images: drop PNGs into /public/characters/ and set imagePath, e.g.:
//   imagePath: "/characters/goku.png"

export interface Character {
  rank: number;
  name: string;
  powerLevel: number;
  color: string;
  imagePath: string | null;
}

export const characters: Character[] = [
  { rank: 15, name: "Raditz",     powerLevel: 1500,         color: "#8B4513", imagePath: "/characters/raditz.png" },
  { rank: 14, name: "Nappa",      powerLevel: 4000,         color: "#708090", imagePath: "/characters/nappa.png" },
  { rank: 13, name: "Ginyu",      powerLevel: 120000,       color: "#9400D3", imagePath: "/characters/ginyu.png" },
  { rank: 12, name: "Recoome",    powerLevel: 65000,        color: "#FF4500", imagePath: "/characters/recoome.png" },
  { rank: 11, name: "Frieza F1",  powerLevel: 530000,       color: "#C0C0C0", imagePath: "/characters/frieza-f1.png" },
  { rank: 10, name: "Frieza F4",  powerLevel: 120000000,    color: "#800080", imagePath: "/characters/frieza-f4.png" },
  { rank: 9,  name: "Android 18", powerLevel: 360000000,    color: "#4169E1", imagePath: "/characters/android18.png" },
  { rank: 8,  name: "Cell",       powerLevel: 900000000,    color: "#228B22", imagePath: "/characters/cell.png" },
  { rank: 7,  name: "SSJ Gohan",  powerLevel: 2000000000,   color: "#FFD700", imagePath: "/characters/gohan-ssj.jpeg" },
  { rank: 6,  name: "Majin Buu",  powerLevel: 3200000000,   color: "#FF69B4", imagePath: "/characters/majin-buu.png" },
  { rank: 5,  name: "Vegeta SSJ", powerLevel: 6000000000,   color: "#1E90FF", imagePath: "/characters/vegeta-ssj.png" },
  { rank: 4,  name: "SSJ3 Goku",  powerLevel: 9000000000,   color: "#FFA500", imagePath: "/characters/goku-ssj3.png" },
  { rank: 3,  name: "Beerus",     powerLevel: 50000000000,  color: "#9932CC", imagePath: "/characters/beerus.png" },
  { rank: 2,  name: "Whis",       powerLevel: 150000000000, color: "#00CED1", imagePath: "/characters/whis.png" },
  { rank: 1,  name: "Zeno",       powerLevel: 999999999999, color: "#FFD700", imagePath: "/characters/zeno.png" },
];

export const FRAMES_PER_CHARACTER = 150; // 5s at 30fps
