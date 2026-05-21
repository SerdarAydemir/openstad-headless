import type { Answer, Category, FlatQuestion, Question } from '../types';

/**
 * Flatten all categories and questions into an ordered list,
 * filtering out questions whose skip conditions are met.
 */
export function buildVisibleQuestions(
  categories: Category[],
  answers: Answer[]
): FlatQuestion[] {
  const visible: FlatQuestion[] = [];
  let globalIndex = 0;

  for (const category of categories) {
    const categoryQuestions = category.questions.filter(
      (q) => !shouldSkip(q, answers)
    );

    categoryQuestions.forEach((question, indexInCategory) => {
      visible.push({
        question,
        categoryId: category.id,
        categoryLabel: category.label,
        categoryColor: category.color,
        indexInCategory,
        totalInCategory: categoryQuestions.length,
        globalIndex,
      });
      globalIndex++;
    });
  }

  return visible;
}

/**
 * Check if a question should be skipped based on its skipCondition
 * and the current set of answers.
 */
function shouldSkip(question: Question, answers: Answer[]): boolean {
  if (!question.skipCondition) return false;

  const { dependsOnQuestionId, skipWhenValue } = question.skipCondition;
  const dependentAnswer = answers.find(
    (a) => a.questionId === dependsOnQuestionId
  );

  // If the dependent question hasn't been answered yet, don't skip
  if (!dependentAnswer) return false;

  return dependentAnswer.value === skipWhenValue;
}

/**
 * Recalculate visible questions after each answer.
 * This is needed because answers can enable/disable subsequent questions.
 */
export function recalculateVisibleQuestions(
  categories: Category[],
  answers: Answer[]
): FlatQuestion[] {
  return buildVisibleQuestions(categories, answers);
}
