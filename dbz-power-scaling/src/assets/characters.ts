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
  { rank: 15, name: "Raditz",     powerLevel: 1500,         color: "#8B4513", imagePath: null },
  { rank: 14, name: "Nappa",      powerLevel: 4000,         color: "#708090", imagePath: null },
  { rank: 13, name: "Ginyu",      powerLevel: 120000,       color: "#9400D3", imagePath: null },
  { rank: 12, name: "Recoome",    powerLevel: 65000,        color: "#FF4500", imagePath: null },
  { rank: 11, name: "Frieza F1",  powerLevel: 530000,       color: "#C0C0C0", imagePath: null },
  { rank: 10, name: "Frieza F4",  powerLevel: 120000000,    color: "#800080", imagePath: null },
  { rank: 9,  name: "Android 18", powerLevel: 360000000,    color: "#4169E1", imagePath: null },
  { rank: 8,  name: "Cell",       powerLevel: 900000000,    color: "#228B22", imagePath: null },
  { rank: 7,  name: "SSJ Gohan",  powerLevel: 2000000000,   color: "#FFD700", imagePath: null },
  { rank: 6,  name: "Majin Buu",  powerLevel: 3200000000,   color: "#FF69B4", imagePath: null },
  { rank: 5,  name: "Vegeta SSJ", powerLevel: 6000000000,   color: "#1E90FF", imagePath: null },
  { rank: 4,  name: "SSJ3 Goku",  powerLevel: 9000000000,   color: "#FFA500", imagePath: null },
  { rank: 3,  name: "Beerus",     powerLevel: 50000000000,  color: "#9932CC", imagePath: null },
  { rank: 2,  name: "Whis",       powerLevel: 150000000000, color: "#00CED1", imagePath: null },
  { rank: 1,  name: "Zeno",       powerLevel: 999999999999, color: "#FFD700", imagePath: null },
];

export const FRAMES_PER_CHARACTER = 150; // 5s at 30fps
