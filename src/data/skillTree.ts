export type SkillNode = {
  id: string;
  name: string;
  area: "Grammar" | "Speaking" | "Writing" | "Vocabulary";
  tier: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  unlockCost: number;
  xpReward: number;
  prerequisites: string[];
};

export const skillTree: SkillNode[] = [
  { id: "g1", name: "Sentence Basics", area: "Grammar", tier: "Beginner", unlockCost: 0, xpReward: 100, prerequisites: [] },
  { id: "v1", name: "Core 500 Words", area: "Vocabulary", tier: "Beginner", unlockCost: 0, xpReward: 120, prerequisites: [] },
  { id: "s1", name: "Sentence Repetition", area: "Speaking", tier: "Beginner", unlockCost: 0, xpReward: 120, prerequisites: [] },
  { id: "w1", name: "Sentence Correction", area: "Writing", tier: "Beginner", unlockCost: 0, xpReward: 120, prerequisites: [] },
  { id: "g2", name: "Complex Structures", area: "Grammar", tier: "Intermediate", unlockCost: 250, xpReward: 200, prerequisites: ["g1"] },
  { id: "s2", name: "AI Conversation", area: "Speaking", tier: "Intermediate", unlockCost: 300, xpReward: 220, prerequisites: ["s1", "v1"] },
  { id: "w2", name: "Paragraph Building", area: "Writing", tier: "Intermediate", unlockCost: 300, xpReward: 220, prerequisites: ["w1", "g1"] },
  { id: "v2", name: "Academic Lexicon", area: "Vocabulary", tier: "Intermediate", unlockCost: 300, xpReward: 200, prerequisites: ["v1"] },
  { id: "s3", name: "Real-Life Scenarios", area: "Speaking", tier: "Advanced", unlockCost: 500, xpReward: 350, prerequisites: ["s2", "g2"] },
  { id: "w3", name: "IELTS Essay Training", area: "Writing", tier: "Advanced", unlockCost: 500, xpReward: 360, prerequisites: ["w2", "v2"] },
  { id: "p1", name: "IELTS Speaking Simulator", area: "Speaking", tier: "Pro", unlockCost: 900, xpReward: 600, prerequisites: ["s3", "w3"] },
  { id: "p2", name: "Professional Fluency", area: "Writing", tier: "Pro", unlockCost: 900, xpReward: 600, prerequisites: ["s3", "w3", "v2"] }
];
