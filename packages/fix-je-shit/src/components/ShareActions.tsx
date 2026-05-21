import React, { useCallback, useRef } from 'react';

import { useQuizContext } from '../context/QuizContext';

export function ShareActions() {
  const { scoreResult, selectedGemeente } = useQuizContext();
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const handleShare = useCallback(async () => {
    if (!scoreResult) return;

    const shareText = `Ik heb de Fix Je Shit check gedaan! Mijn Fix Score: ${scoreResult.totalScore}%. Check of jij alles geregeld hebt!`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fix Je Shit - Mijn resultaat',
          text: shareText,
        });
        return;
      } catch {
        // User cancelled or API not available
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Resultaat gekopieerd naar klembord!');
    } catch {
      // Final fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Resultaat gekopieerd naar klembord!');
    }
  }, [scoreResult]);

  const handleDownloadPDF = useCallback(async () => {
    // Placeholder — PDF generation will be implemented later
    alert('PDF download wordt binnenkort beschikbaar.');
  }, []);

  const handleStartFixen = useCallback(() => {
    // Scroll to the first action card
    const firstAction = document.querySelector('.fjs-action-card');
    if (firstAction) {
      firstAction.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Briefly highlight it
      firstAction.classList.add('fjs-action-card--highlight');
      setTimeout(() => {
        firstAction.classList.remove('fjs-action-card--highlight');
      }, 2000);
    }
  }, []);

  return (
    <div className="fjs-share-actions" ref={dashboardRef}>
      <button
        className="fjs-btn fjs-btn-outline fjs-btn-share"
        onClick={handleShare}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle
            cx="15"
            cy="4"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="5"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="15"
            cy="16"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 8.5L12.5 5.5M7.5 11.5L12.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Deel resultaat
      </button>

      <button
        className="fjs-btn fjs-btn-outline fjs-btn-share"
        onClick={handleDownloadPDF}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 3V13M10 13L6 9M10 13L14 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15V16C3 16.55 3.45 17 4 17H16C16.55 17 17 16.55 17 16V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Download PDF
      </button>

      <button
        className="fjs-btn fjs-btn-primary fjs-btn-lg fjs-btn-start-fixen"
        onClick={handleStartFixen}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 17L9 11L6 8L14 2L11 9L14 12L3 17Z" fill="currentColor" />
        </svg>
        Start met fixen
      </button>
    </div>
  );
}
