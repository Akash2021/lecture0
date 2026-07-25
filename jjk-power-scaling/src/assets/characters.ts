export interface CharacterStats {
  power: number;
  speed: number;
  technique: number;
}

export interface Character {
  name: string;
  tier: "S" | "A" | "B" | "C";
  stats: CharacterStats;
  color: string;
  imagePath: string | null;
}

export const characters: Character[] = [
  {
    name: "Gojo",
    tier: "S",
    stats: { power: 98, speed: 97, technique: 100 },
    color: "#9333ea",
    imagePath: null,
  },
  {
    name: "Sukuna",
    tier: "S",
    stats: { power: 100, speed: 96, technique: 99 },
    color: "#dc2626",
    imagePath: null,
  },
  {
    name: "Yuta",
    tier: "A",
    stats: { power: 92, speed: 88, technique: 94 },
    color: "#2563eb",
    imagePath: null,
  },
  {
    name: "Geto",
    tier: "A",
    stats: { power: 82, speed: 80, technique: 96 },
    color: "#16a34a",
    imagePath: null,
  },
  {
    name: "Kashimo",
    tier: "A",
    stats: { power: 90, speed: 91, technique: 85 },
    color: "#d97706",
    imagePath: null,
  },
  {
    name: "Hakari",
    tier: "B",
    stats: { power: 85, speed: 83, technique: 80 },
    color: "#db2777",
    imagePath: null,
  },
  {
    name: "Yuji",
    tier: "B",
    stats: { power: 84, speed: 86, technique: 72 },
    color: "#ea580c",
    imagePath: null,
  },
  {
    name: "Takaba",
    tier: "C",
    stats: { power: 60, speed: 65, technique: 55 },
    color: "#64748b",
    imagePath: null,
  },
];

export const tierColors: Record<string, string> = {
  S: "#fbbf24",
  A: "#3b82f6",
  B: "#10b981",
  C: "#6b7280",
};

export const getCharactersByTier = (tier: string): Character[] =>
  characters.filter((c) => c.tier === tier);
