export type AIService = {
  name: string;
  purpose: string;
  endpointHint: string;
};

export const aiServices: AIService[] = [
  {
    name: "Pronunciation Coach",
    purpose: "Speech recognition + phoneme scoring for repetition and IELTS speaking.",
    endpointHint: "POST /api/ai/pronunciation/analyze"
  },
  {
    name: "Conversation Partner",
    purpose: "GPT-based simulation for interviews, workplace meetings, and IELTS part 3.",
    endpointHint: "POST /api/ai/conversation/respond"
  },
  {
    name: "Essay Evaluator",
    purpose: "IELTS-style band scoring with criterion-level feedback.",
    endpointHint: "POST /api/ai/writing/score"
  }
];
