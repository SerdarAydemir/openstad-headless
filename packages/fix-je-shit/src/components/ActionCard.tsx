import React from 'react';

import type { ActionCardConfig } from '../types';
import { getIconSvg } from '../utils/icons';

interface ActionCardProps {
  card: ActionCardConfig;
}

export function ActionCard({ card }: ActionCardProps) {
  return (
    <div className="fjs-card fjs-action-card">
      <div className="fjs-action-header">
        <span
          className="fjs-action-icon"
          dangerouslySetInnerHTML={{ __html: getIconSvg(card.icon) }}
        />
        <div className="fjs-action-title-row">
          <h4 className="fjs-action-title">{card.title}</h4>
          {card.priority && (
            <span className="fjs-priority-badge">Prioriteit</span>
          )}
        </div>
      </div>
      <p className="fjs-action-description">{card.description}</p>
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fjs-btn fjs-btn-primary fjs-btn-action"
        aria-label={`${card.buttonText}: ${card.title}`}>
        {card.buttonText}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="fjs-btn-icon">
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
