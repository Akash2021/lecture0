export const COLORS = {
  bg: "#050A14",
  bgCard: "#0D1826",
  bgCardLight: "#112233",
  accent: "#00D4FF",       // electric blue
  accentGold: "#FFD700",   // gold for rankings
  accentRed: "#FF3A3A",    // danger / loss
  accentGreen: "#00FF88",  // value / gain
  accentPurple: "#9B59FF", // premium tier
  text: "#FFFFFF",
  textMuted: "#7A9BB5",
  textDim: "#3A5A72",
  border: "#1A3A5A",
  borderGlow: "#00D4FF33",
};

export const FONT = {
  display: "'Arial Black', 'Impact', sans-serif",
  body: "'Arial', 'Helvetica', sans-serif",
  mono: "'Courier New', monospace",
};

// Player data used across scenes
export const PLAYERS = [
  {
    name: "Itoshi Rin",
    rank: 1,
    tier: "RECORD BREAKER",
    value: "€150M",
    valuePure: 150,
    xG: 0.91,
    pressEfficiency: 88,
    tacticalVersatility: 95,
    physicalRating: 97,
    color: "#9B59FF",
    style: "Total Striker",
    tag: "Generational Talent",
    risk: "LOW",
    summary: "Elite set-piece mastery + defensive contribution. Bidding war guaranteed.",
  },
  {
    name: "Isagi Yoichi",
    rank: 2,
    tier: "ELITE PROSPECT",
    value: "€85M",
    valuePure: 85,
    xG: 0.74,
    pressEfficiency: 82,
    tacticalVersatility: 96,
    physicalRating: 71,
    color: "#00D4FF",
    style: "Raumdeuter / False-9",
    tag: "High-IQ Schemer",
    risk: "MEDIUM",
    summary: "Metavision = elite spatial intelligence. Physical ceiling is the debate.",
  },
  {
    name: "Shidou Ryusei",
    rank: 3,
    tier: "VOLATILE ASSET",
    value: "€70M",
    valuePure: 70,
    xG: 0.88,
    pressEfficiency: 79,
    tacticalVersatility: 60,
    physicalRating: 94,
    color: "#FF3A3A",
    style: "Pure Penalty Box",
    tag: "Chaos Factor",
    risk: "HIGH",
    summary: "Explosive finisher. Disciplinary red flags crush system fit.",
  },
  {
    name: "Barou Shoei",
    rank: 4,
    tier: "BOOM OR BUST",
    value: "€55M",
    valuePure: 55,
    xG: 0.67,
    pressEfficiency: 61,
    tacticalVersatility: 48,
    physicalRating: 90,
    color: "#FFD700",
    style: "High-Volume Shooter",
    tag: "The King",
    risk: "VERY HIGH",
    summary: "Ballon d'Or ceiling, bench-warmer floor. Chemistry liability at top clubs.",
  },
  {
    name: "Nagi Seishiro",
    rank: 5,
    tier: "HIDDEN GEM",
    value: "€90M",
    valuePure: 90,
    xG: 0.79,
    pressEfficiency: 71,
    tacticalVersatility: 88,
    physicalRating: 76,
    color: "#00FF88",
    style: "Technical Orchestrator",
    tag: "Most Undervalued",
    risk: "LOW",
    summary: "Laziness is the only liability. Technique-per-euro ratio is unmatched.",
  },
  {
    name: "Chigiri Hyoma",
    rank: 6,
    tier: "BUDGET BUY",
    value: "€40M",
    valuePure: 40,
    xG: 0.61,
    pressEfficiency: 85,
    tacticalVersatility: 55,
    physicalRating: 98,
    color: "#FF8C00",
    style: "Pure Pace Merchant",
    tag: "Injury Risk",
    risk: "HIGH",
    summary: "Fastest striker alive. Hamstring history makes medicals a nightmare.",
  },
];

export const SCENE_DURATIONS = {
  hook: 180,        // 6s
  intro: 150,       // 5s
  metrics: 240,     // 8s
  isagi: 210,       // 7s
  barou: 210,       // 7s
  rin: 240,         // 8s
  ranking: 330,     // 11s
  outro: 120,       // 4s
};

export const SCENE_STARTS = Object.values(SCENE_DURATIONS).reduce(
  (acc, dur, i, arr) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + arr[i - 1]);
    return acc;
  },
  [] as number[]
);
