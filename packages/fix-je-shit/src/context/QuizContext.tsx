import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import type {
  Answer,
  FixJeShitConfig,
  FlatQuestion,
  GemeenteConfig,
  QuizAction,
  QuizState,
  ScoreResult,
  Screen,
} from '../types';
import { calculateScore } from '../utils/scoreCalculator';
import {
  buildVisibleQuestions,
  recalculateVisibleQuestions,
} from '../utils/skipLogic';

// --- Initial State ---

const initialState: QuizState = {
  currentScreen: 'landing',
  selectedGemeenteId: null,
  currentQuestionIndex: 0,
  answers: [],
  visibleQuestions: [],
  showSwipeOnboarding: true,
};

// --- Reducer ---

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.screen };

    case 'SELECT_GEMEENTE':
      return { ...state, selectedGemeenteId: action.gemeenteId };

    case 'ANSWER_QUESTION': {
      const existingIndex = state.answers.findIndex(
        (a) => a.questionId === action.answer.questionId
      );
      const newAnswers =
        existingIndex >= 0
          ? state.answers.map((a, i) =>
              i === existingIndex ? action.answer : a
            )
          : [...state.answers, action.answer];

      return { ...state, answers: newAnswers };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= state.visibleQuestions.length) {
        return { ...state, currentScreen: 'dashboard' };
      }
      return { ...state, currentQuestionIndex: nextIndex };
    }

    case 'GO_BACK': {
      if (state.currentQuestionIndex > 0) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex - 1,
        };
      }
      // If at first question, go back to gemeente selection
      return { ...state, currentScreen: 'gemeente' };
    }

    case 'DISMISS_ONBOARDING':
      return { ...state, showSwipeOnboarding: false };

    case 'SET_VISIBLE_QUESTIONS':
      return { ...state, visibleQuestions: action.questions };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// --- Context Type ---

interface QuizContextType {
  state: QuizState;
  config: FixJeShitConfig;
  dispatch: React.Dispatch<QuizAction>;
  selectedGemeente: GemeenteConfig | null;
  currentQuestion: FlatQuestion | null;
  scoreResult: ScoreResult | null;
  totalQuestions: number;
  progressPercent: number;
  startQuiz: () => void;
  selectGemeente: (id: string) => void;
  answerQuestion: (value: Answer['value']) => void;
  goBack: () => void;
  reset: () => void;
  dismissOnboarding: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

// --- Provider ---

interface QuizProviderProps {
  config: FixJeShitConfig;
  children: React.ReactNode;
}

export function QuizProvider({ config, children }: QuizProviderProps) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const selectedGemeente = useMemo(
    () =>
      config.gemeenten.find((g) => g.id === state.selectedGemeenteId) || null,
    [config.gemeenten, state.selectedGemeenteId]
  );

  // Recalculate visible questions when answers change
  const visibleQuestions = useMemo(
    () => buildVisibleQuestions(config.categories, state.answers),
    [config.categories, state.answers]
  );

  const currentQuestion = useMemo(
    () => visibleQuestions[state.currentQuestionIndex] || null,
    [visibleQuestions, state.currentQuestionIndex]
  );

  const totalQuestions = visibleQuestions.length;

  const progressPercent = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round(
      ((state.currentQuestionIndex + 1) / totalQuestions) * 100
    );
  }, [state.currentQuestionIndex, totalQuestions]);

  const scoreResult = useMemo(() => {
    if (state.currentScreen !== 'dashboard') return null;
    return calculateScore(
      state.answers,
      visibleQuestions,
      config.categories,
      selectedGemeente,
      config.defaultTemplate.actionCards
    );
  }, [
    state.currentScreen,
    state.answers,
    visibleQuestions,
    config.categories,
    selectedGemeente,
    config.defaultTemplate.actionCards,
  ]);

  // --- Actions ---

  const startQuiz = useCallback(() => {
    const questions = buildVisibleQuestions(config.categories, []);
    dispatch({ type: 'SET_VISIBLE_QUESTIONS', questions });
    dispatch({ type: 'SET_SCREEN', screen: 'gemeente' });
  }, [config.categories]);

  const selectGemeente = useCallback((id: string) => {
    dispatch({ type: 'SELECT_GEMEENTE', gemeenteId: id });
  }, []);

  const answerQuestion = useCallback(
    (value: Answer['value']) => {
      if (!currentQuestion) return;

      const answer: Answer = {
        questionId: currentQuestion.question.id,
        categoryId: currentQuestion.categoryId,
        value,
      };

      dispatch({ type: 'ANSWER_QUESTION', answer });

      // Recalculate visible questions after this answer
      const updatedAnswers = [
        ...state.answers.filter((a) => a.questionId !== answer.questionId),
        answer,
      ];
      const newVisible = recalculateVisibleQuestions(
        config.categories,
        updatedAnswers
      );
      dispatch({ type: 'SET_VISIBLE_QUESTIONS', questions: newVisible });

      // Move to next question (or dashboard)
      setTimeout(() => {
        dispatch({ type: 'NEXT_QUESTION' });
      }, 300); // Small delay for animation
    },
    [currentQuestion, state.answers, config.categories]
  );

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const dismissOnboarding = useCallback(() => {
    dispatch({ type: 'DISMISS_ONBOARDING' });
  }, []);

  const contextValue: QuizContextType = {
    state: { ...state, visibleQuestions },
    config,
    dispatch,
    selectedGemeente,
    currentQuestion,
    scoreResult,
    totalQuestions,
    progressPercent,
    startQuiz,
    selectGemeente,
    answerQuestion,
    goBack,
    reset,
    dismissOnboarding,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

// --- Hook ---

export function useQuizContext(): QuizContextType {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return ctx;
}
