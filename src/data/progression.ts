export type Character = {
  id: string;
  name: string;
  unlockLevel: number;
  perk: string;
};

export const levelThresholds = [
  0, 120, 260, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000
];

export const characters: Character[] = [
  { id: "nova", name: "Nova", unlockLevel: 1, perk: "+5% streak protection" },
  { id: "kai", name: "Kai", unlockLevel: 4, perk: "+10% speaking XP" },
  { id: "lyra", name: "Lyra", unlockLevel: 6, perk: "+10% writing XP" },
  { id: "atlas", name: "Atlas", unlockLevel: 9, perk: "Boss exam confidence boost" }
];

export const missions = [
  "Complete 3 speaking drills",
  "Correct 10 grammar mistakes",
  "Submit 1 IELTS Task 2 essay",
  "Finish workplace email simulation"
];
