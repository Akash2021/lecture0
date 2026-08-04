// To add images: drop PNGs into /public/characters/ and set imagePath, e.g.:
//   imagePath: "/characters/sakamoto.png"

export interface CharacterStats {
  power: number;
  speed: number;
  technique: number;
}

export interface Character {
  rank: number;
  name: string;
  title: string;
  color: string;
  stats: CharacterStats;
  keyFeat: string;
  powerLevel: number;
  silhouetteDesc: string;
  imagePath: string | null;
}

export const characters: Character[] = [
  {
    rank: 5,
    name: "Shishiba",
    title: "The Silent Monster",
    color: "#607D8B",
    stats: { power: 88, speed: 80, technique: 78 },
    keyFeat: "Snaps necks before victims notice. Defeated Kashima and his own mentor Yotsumura.",
    powerLevel: 7800,
    silhouetteDesc: "medium build, claw hammers in both hands",
    imagePath: "/characters/shishiba.png",
  },
  {
    rank: 4,
    name: "Gaku",
    title: "The One-Man Army",
    color: "#F44336",
    stats: { power: 95, speed: 78, technique: 65 },
    keyFeat: "Destroyed an entire JAA branch solo. One of the very few to survive fighting Takamura.",
    powerLevel: 8200,
    silhouetteDesc: "large muscular figure holding a mace",
    imagePath: "/characters/gaku.jpeg",
  },
  {
    rank: 3,
    name: "Nagumo",
    title: "The Smiling Assassin",
    color: "#2196F3",
    stats: { power: 80, speed: 90, technique: 95 },
    keyFeat: "Master of disguise, blades, and firearms. Recognized as one of the Order's top two alongside Sakamoto.",
    powerLevel: 9100,
    silhouetteDesc: "slim figure in a casual stance",
    imagePath: "/characters/nagumo.png",
  },
  {
    rank: 2,
    name: "Taro Sakamoto",
    title: "The Greatest Hitman Ever",
    color: "#FFC107",
    stats: { power: 95, speed: 93, technique: 95 },
    keyFeat: "Sent Takamura flying with one kick. Turns anything into a weapon. A legend even in retirement.",
    powerLevel: 9500,
    silhouetteDesc: "stocky round build, iconic retired form",
    imagePath: "/characters/sakamoto.png",
  },
  {
    rank: 1,
    name: "Takamura",
    title: "The God of the Blade",
    color: "#FFD700",
    stats: { power: 99, speed: 95, technique: 100 },
    keyFeat: "Slashes buildings in half. Fought Nagumo, Uzuki, and Sakamoto at the same time. The absolute ceiling.",
    powerLevel: 9999,
    silhouetteDesc: "tall elderly figure with katana, slight forward lean",
    imagePath: "/characters/takamura.png",
  },
];

export const INTRO_FRAMES = 90; // 3s
export const CHAR_FRAMES = 330; // 11s per character (ranks 5-2)
export const RANK1_FRAMES = 405; // 13.5s for #1
export const OUTRO_FRAMES = 200; // ~6.7s
