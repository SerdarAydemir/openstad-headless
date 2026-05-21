import React from 'react';

import { useQuizContext } from '../context/QuizContext';
import { getScoreDescription } from '../utils/scoreCalculator';
import { ActionCard } from './ActionCard';
import { HelpCard } from './HelpCard';
import { ScoreCircle } from './ScoreCircle';
import { ShareActions } from './ShareActions';

export function Dashboard() {
  const { config, state, scoreResult, selectedGemeente, reset } =
    useQuizContext();
  const { general } = config;

  if (!scoreResult) return null;

  const scoreDescription = getScoreDescription(
    scoreResult.totalScore,
    general.scoreDescriptionGood,
    general.scoreDescriptionMedium,
    general.scoreDescriptionBad
  );

  // Get active action cards — use gemeente custom cards, or fall back to default template
  const gemeenteActionCards =
    selectedGemeente?.actionCards ?? config.defaultTemplate.actionCards;
  const activeActionCards = gemeenteActionCards.filter((card) =>
    scoreResult.activeActionCardIds.includes(card.id)
  );

  const helpCards =
    selectedGemeente?.helpCards ?? config.defaultTemplate.helpCards;

  return (
    <div className="fjs-dashboard">
      {/* Header */}
      <header className="fjs-header">
        <span className="fjs-header-title">{general.widgetTitle}</span>
        <button className="fjs-header-action" onClick={reset}>
          Opnieuw
        </button>
      </header>

      {/* Score Card */}
      <div className="fjs-card fjs-score-card">
        <h2 className="fjs-score-title">{general.scoreTitle}</h2>

        <ScoreCircle score={scoreResult.totalScore} />

        <p className="fjs-score-description">{scoreDescription}</p>

        {/* Category summary */}
        <ul className="fjs-category-list">
          {scoreResult.categoryScores.map((cat) => (
            <li key={cat.id} className="fjs-category-item">
              <span className="fjs-category-name">{cat.label}</span>
              <span
                className={`fjs-category-status fjs-category-status--${cat.status}`}
                aria-label={
                  cat.status === 'complete' ? 'Geregeld' : 'Nog te regelen'
                }>
                {cat.status === 'complete' ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10L8.5 13.5L15 7"
                      stroke="var(--fjs-score-complete)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 5V11"
                      stroke="var(--fjs-warning)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="14" r="1" fill="var(--fjs-warning)" />
                  </svg>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Cards - What you still need to fix */}
      {activeActionCards.length > 0 && (
        <section className="fjs-section">
          <h3 className="fjs-section-title">{general.fixSectionTitle}</h3>
          {activeActionCards.map((card) => (
            <ActionCard key={card.id} card={card} />
          ))}
        </section>
      )}

      {/* Help Cards - Local gemeente resources */}
      {helpCards.length > 0 && (
        <section className="fjs-section">
          <h3 className="fjs-section-title">
            {general.helpSectionTitle.replace(
              '[gemeente]',
              selectedGemeente?.name || ''
            )}
          </h3>
          {helpCards.map((card) => (
            <HelpCard key={card.id} card={card} />
          ))}
        </section>
      )}

      {/* Share / Download / Start actions */}
      <ShareActions />

      {/* Tip */}
      {general.tipText && (
        <div className="fjs-card fjs-tip-card">
          <div className="fjs-tip-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C7.24 2 5 4.24 5 7C5 8.93 6.07 10.61 7.67 11.44C7.88 11.56 8 11.78 8 12.02V14C8 14.55 8.45 15 9 15H11C11.55 15 12 14.55 12 14V12.02C12 11.78 12.12 11.56 12.33 11.44C13.93 10.61 15 8.93 15 7C15 4.24 12.76 2 10 2Z"
                fill="var(--fjs-warning)"
              />
              <rect
                x="8.5"
                y="16"
                width="3"
                height="1.5"
                rx="0.5"
                fill="var(--fjs-warning)"
              />
            </svg>
          </div>
          <div>
            <strong>Tip</strong>
            <p className="fjs-tip-text">{general.tipText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
