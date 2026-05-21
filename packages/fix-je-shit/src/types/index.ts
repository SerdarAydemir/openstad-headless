// ============================================================
// Fix Je Shit — Runtime Types
// ============================================================

export type {
  FixJeShitConfig,
  GeneralConfig,
  BrandingConfig,
  Category,
  Question,
  QuestionOption,
  SkipCondition,
  GemeenteConfig,
  GemeenteTemplate,
  ActionCardConfig,
  HelpCardConfig,
  ContactConfig,
} from './config';

// --- Quiz State ---

export type Screen = 'landing' | 'gemeente' | 'quiz' | 'dashboard';

export type AnswerValue = 'complete' | 'incomplete' | 'unknown';

export interface Answer {
  questionId: string;
  categoryId: string;
  value: AnswerValue;
}

export interface QuizState {
  currentScreen: Screen;
  selectedGemeenteId: string | null;
  currentQuestionIndex: number;
  answers: Answer[];
  visibleQuestions: FlatQuestion[];
  showSwipeOnboarding: boolean;
}

/** Flattened question with its category info for easy iteration */
export interface FlatQuestion {
  question: import('./config').Question;
  categoryId: string;
  categoryLabel: string;
  categoryColor?: string;
  indexInCategory: number;
  totalInCategory: number;
  globalIndex: number;
}

// --- Score ---

export type CategoryStatus = 'complete' | 'incomplete';

export interface CategoryScore {
  id: string;
  label: string;
  status: CategoryStatus;
}

export interface ScoreResult {
  totalScore: number;
  categoryScores: CategoryScore[];
  flags: Record<string, string>;
  activeActionCardIds: string[];
}

// --- Swipe ---

export type SwipeDirection = 'left' | 'right' | null;

export interface SwipeState {
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  direction: SwipeDirection;
}

// --- Quiz Actions ---

export type QuizAction =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'SELECT_GEMEENTE'; gemeenteId: string }
  | { type: 'ANSWER_QUESTION'; answer: Answer }
  | { type: 'GO_BACK' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET' }
  | { type: 'DISMISS_ONBOARDING' }
  | { type: 'SET_VISIBLE_QUESTIONS'; questions: FlatQuestion[] };
