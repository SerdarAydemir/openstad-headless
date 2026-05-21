import React, { useCallback, useState } from 'react';

import { useQuizContext } from '../context/QuizContext';
import { useSwipe } from '../hooks/useSwipe';
import type { AnswerValue } from '../types';
import { CategoryBadge } from './CategoryBadge';
import { ProgressBar } from './ProgressBar';
import { SwipeOnboarding } from './SwipeOnboarding';

export function QuizCard() {
  const {
    state,
    currentQuestion,
    progressPercent,
    answerQuestion,
    goBack,
    dismissOnboarding,
  } = useQuizContext();

  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(
    null
  );

  const handleSwipeLeft = useCallback(() => {
    if (state.showSwipeOnboarding) dismissOnboarding();
    setExitDirection('left');
    answerQuestion('incomplete');
    setTimeout(() => setExitDirection(null), 400);
  }, [answerQuestion, state.showSwipeOnboarding, dismissOnboarding]);

  const handleSwipeRight = useCallback(() => {
    if (state.showSwipeOnboarding) dismissOnboarding();
    setExitDirection('right');
    answerQuestion('complete');
    setTimeout(() => setExitDirection(null), 400);
  }, [answerQuestion, state.showSwipeOnboarding, dismissOnboarding]);

  const { handlers, cardStyle } = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    enabled: currentQuestion?.question.type === 'binary',
  });

  const handleOptionClick = useCallback(
    (value: AnswerValue) => {
      if (state.showSwipeOnboarding) dismissOnboarding();
      answerQuestion(value);
    },
    [answerQuestion, state.showSwipeOnboarding, dismissOnboarding]
  );

  if (!currentQuestion) return null;

  const {
    question,
    categoryLabel,
    categoryColor,
    indexInCategory,
    totalInCategory,
  } = currentQuestion;
  const isBinary = question.type === 'binary';

  return (
    <div className="fjs-quiz">
      {/* Swipe onboarding overlay (only on first binary question) */}
      {state.showSwipeOnboarding && isBinary && (
        <SwipeOnboarding onDismiss={dismissOnboarding} />
      )}

      <div className="fjs-quiz-container">
        <div
          className={`fjs-card fjs-quiz-card ${
            exitDirection ? `fjs-quiz-card--exit-${exitDirection}` : ''
          }`}
          style={isBinary ? cardStyle : undefined}
          {...(isBinary ? handlers : {})}>
          {/* Progress */}
          <ProgressBar
            categoryLabel={categoryLabel}
            indexInCategory={indexInCategory}
            totalInCategory={totalInCategory}
            globalPercent={progressPercent}
          />

          {/* Category badge */}
          <CategoryBadge label={categoryLabel} color={categoryColor} />

          {/* Question */}
          <h2 className="fjs-quiz-title">{question.title}</h2>

          {question.description && (
            <p className="fjs-quiz-description">{question.description}</p>
          )}

          {/* Answer options */}
          {isBinary ? (
            <BinaryOptions
              options={question.options}
              onSelect={handleOptionClick}
            />
          ) : (
            <MultiOptions
              options={question.options}
              onSelect={handleOptionClick}
            />
          )}

          {/* Swipe tip for binary questions */}
          {isBinary && (
            <p className="fjs-quiz-tip">
              Tip: swipe links/rechts of gebruik de knoppen
            </p>
          )}
        </div>

        {/* Back button */}
        <button
          className="fjs-back-btn"
          onClick={goBack}
          aria-label="Terug naar vorige vraag">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M13 16L7 10L13 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Terug
        </button>
      </div>
    </div>
  );
}

// --- Binary options (2 buttons side by side) ---

interface BinaryOptionsProps {
  options: { label: string; value: AnswerValue }[];
  onSelect: (value: AnswerValue) => void;
}

function BinaryOptions({ options, onSelect }: BinaryOptionsProps) {
  // Ensure we have exactly 2 options; first is "incomplete", second is "complete"
  const incompleteOption =
    options.find((o) => o.value === 'incomplete') || options[0];
  const completeOption =
    options.find((o) => o.value === 'complete') || options[1];

  return (
    <div className="fjs-options fjs-options--binary">
      <button
        className="fjs-btn fjs-btn-outline fjs-btn-error"
        onClick={() => onSelect(incompleteOption.value)}>
        {incompleteOption.label}
      </button>
      <button
        className="fjs-btn fjs-btn-primary"
        onClick={() => onSelect(completeOption.value)}>
        {completeOption.label}
      </button>
    </div>
  );
}

// --- Multi options (3+ buttons stacked vertically) ---

interface MultiOptionsProps {
  options: { label: string; value: AnswerValue }[];
  onSelect: (value: AnswerValue) => void;
}

function MultiOptions({ options, onSelect }: MultiOptionsProps) {
  return (
    <div className="fjs-options fjs-options--multi">
      {options.map((option, index) => (
        <button
          key={index}
          className="fjs-btn fjs-btn-outline fjs-btn-multi"
          onClick={() => onSelect(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
