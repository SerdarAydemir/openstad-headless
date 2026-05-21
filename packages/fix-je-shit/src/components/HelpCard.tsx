import React from 'react';

import type { HelpCardConfig } from '../types';
import { getIconSvg } from '../utils/icons';

interface HelpCardProps {
  card: HelpCardConfig;
}

export function HelpCard({ card }: HelpCardProps) {
  return (
    <div className="fjs-card fjs-help-card">
      <div className="fjs-help-header">
        <span
          className="fjs-help-icon"
          dangerouslySetInnerHTML={{ __html: getIconSvg(card.icon) }}
        />
        <h4 className="fjs-help-title">{card.title}</h4>
      </div>
      <p className="fjs-help-description">{card.description}</p>
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fjs-btn fjs-btn-outline fjs-btn-help"
        aria-label={`${card.buttonText}: ${card.title}`}>
        {card.buttonText}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="fjs-btn-icon">
          <path
            d="M6 4L10 8L6 12"
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
