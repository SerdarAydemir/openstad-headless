import React from 'react';

interface ProgressBarProps {
  categoryLabel: string;
  indexInCategory: number;
  totalInCategory: number;
  globalPercent: number;
}

export function ProgressBar({
  categoryLabel,
  indexInCategory,
  totalInCategory,
  globalPercent,
}: ProgressBarProps) {
  return (
    <div
      className="fjs-progress"
      role="progressbar"
      aria-valuenow={globalPercent}
      aria-valuemin={0}
      aria-valuemax={100}>
      <div className="fjs-progress-header">
        <span className="fjs-progress-label">
          {categoryLabel} {indexInCategory + 1} van {totalInCategory}
        </span>
        <span className="fjs-progress-percent">{globalPercent}%</span>
      </div>
      <div className="fjs-progress-track">
        <div
          className="fjs-progress-fill"
          style={{ width: `${globalPercent}%` }}
        />
      </div>
    </div>
  );
}
