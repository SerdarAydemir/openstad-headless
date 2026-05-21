import type {
  ActionCardConfig,
  Answer,
  Category,
  CategoryScore,
  FlatQuestion,
  GemeenteConfig,
  ScoreResult,
} from '../types';

/**
 * Calculate the overall Fix Score and per-category results.
 */
export function calculateScore(
  answers: Answer[],
  visibleQuestions: FlatQuestion[],
  categories: Category[],
  gemeente: GemeenteConfig | null,
  defaultActionCards: ActionCardConfig[]
): ScoreResult {
  // Only count questions that were actually shown
  const answeredVisible = visibleQuestions.filter((fq) =>
    answers.find((a) => a.questionId === fq.question.id)
  );

  const completedCount = answeredVisible.filter((fq) => {
    const answer = answers.find((a) => a.questionId === fq.question.id);
    return answer?.value === 'complete';
  }).length;

  const totalScore =
    answeredVisible.length > 0
      ? Math.round((completedCount / answeredVisible.length) * 100)
      : 0;

  // Per-category scores
  const categoryScores: CategoryScore[] = categories.map((cat) => {
    const catQuestions = visibleQuestions.filter(
      (fq) => fq.categoryId === cat.id
    );

    // If no questions in this category were visible, it's complete by default
    if (catQuestions.length === 0) {
      return { id: cat.id, label: cat.label, status: 'complete' as const };
    }

    const allComplete = catQuestions.every((fq) => {
      const answer = answers.find((a) => a.questionId === fq.question.id);
      return answer?.value === 'complete';
    });

    return {
      id: cat.id,
      label: cat.label,
      status: allComplete ? ('complete' as const) : ('incomplete' as const),
    };
  });

  // Build flags from incomplete/unknown answers
  const flags: Record<string, string> = {};
  for (const fq of visibleQuestions) {
    const answer = answers.find((a) => a.questionId === fq.question.id);
    if (answer && answer.value !== 'complete') {
      flags[fq.question.flagKey] = fq.question.flagValueOnIncomplete;
    }
  }

  // Determine which action cards should be shown
  const actionCards = gemeente?.actionCards ?? defaultActionCards;
  const activeActionCardIds: string[] = [];
  for (const card of actionCards) {
    if (flags[card.linkedToFlag]) {
      activeActionCardIds.push(card.id);
    }
  }

  return { totalScore, categoryScores, flags, activeActionCardIds };
}

/**
 * Get the score description based on the total score percentage.
 */
export function getScoreDescription(
  score: number,
  good: string,
  medium: string,
  bad: string
): string {
  if (score >= 80) return good;
  if (score >= 50) return medium;
  return bad;
}
