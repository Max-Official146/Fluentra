export type BandBreakdown = {
  taskResponse: number;
  coherence: number;
  lexicalResource: number;
  grammar: number;
  overall: number;
  feedback: string[];
};

export function estimateBandScore(input: {
  wordCount: number;
  grammarAccuracy: number;
  cohesionScore: number;
  lexicalRange: number;
}): BandBreakdown {
  const taskResponse = Math.min(9, 4 + input.wordCount / 80);
  const grammar = Math.max(4, Math.min(9, input.grammarAccuracy * 9));
  const coherence = Math.max(4, Math.min(9, input.cohesionScore * 9));
  const lexicalResource = Math.max(4, Math.min(9, input.lexicalRange * 9));

  const overall = Number(
    ((taskResponse + grammar + coherence + lexicalResource) / 4).toFixed(1)
  );

  return {
    taskResponse: Number(taskResponse.toFixed(1)),
    coherence: Number(coherence.toFixed(1)),
    lexicalResource: Number(lexicalResource.toFixed(1)),
    grammar: Number(grammar.toFixed(1)),
    overall,
    feedback: [
      "Use clearer topic sentences and linkers for higher coherence.",
      "Add less common collocations to boost lexical resource.",
      "Reduce sentence-level errors and vary clause structures."
    ]
  };
}
