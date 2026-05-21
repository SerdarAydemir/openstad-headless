import React from 'react';

import { useQuizContext } from '../context/QuizContext';

export function Landing() {
  const { config, startQuiz } = useQuizContext();
  const { general } = config;

  return (
    <div className="fjs-landing">
      <div className="fjs-card fjs-landing-card">
        <div className="fjs-landing-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="16" fill="var(--fjs-primary)" />
            <path
              d="M18 34L27 43L46 22"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="fjs-landing-title">{general.widgetTitle}</h1>

        <p className="fjs-landing-description">{general.landingDescription}</p>

        <button
          className="fjs-btn fjs-btn-primary fjs-btn-lg"
          onClick={startQuiz}
          aria-label={general.startButtonText}>
          {general.startButtonText}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="fjs-btn-icon">
            <path
              d="M7 4L13 10L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="fjs-landing-meta">{general.estimatedTime}</p>
      </div>
    </div>
  );
}
