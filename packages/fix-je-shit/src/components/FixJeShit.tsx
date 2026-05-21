import React from 'react';

import { QuizProvider, useQuizContext } from '../context/QuizContext';
import type { FixJeShitConfig } from '../types';
import { defaultConfig } from '../utils/defaultConfig';
import { Dashboard } from './Dashboard';
import { GemeenteSelector } from './GemeenteSelector';
import { Landing } from './Landing';
import { QuizCard } from './QuizCard';

interface FixJeShitProps {
  config?: Partial<FixJeShitConfig>;
}

function ScreenRouter() {
  const { state } = useQuizContext();

  switch (state.currentScreen) {
    case 'landing':
      return <Landing />;
    case 'gemeente':
      return <GemeenteSelector />;
    case 'quiz':
      return <QuizCard />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <Landing />;
  }
}

export function FixJeShit({ config: configOverrides }: FixJeShitProps) {
  // Deep merge overrides with default config
  const config = mergeConfig(defaultConfig, configOverrides);

  return (
    <div
      className="fjs-root"
      style={
        {
          '--fjs-primary': config.branding.primaryColor,
          '--fjs-error': config.branding.errorColor,
          '--fjs-progress': config.branding.progressColor,
          '--fjs-score-complete': config.branding.scoreCompleteColor,
          '--fjs-score-incomplete': config.branding.scoreIncompleteColor,
          '--fjs-warning': config.branding.warningColor,
          '--fjs-bg': config.branding.backgroundColor,
          '--fjs-card-bg': config.branding.cardBackground,
          ...(config.branding.fontFamily
            ? { '--fjs-font': config.branding.fontFamily }
            : {}),
        } as React.CSSProperties
      }>
      <QuizProvider config={config}>
        <ScreenRouter />
      </QuizProvider>
    </div>
  );
}

/**
 * Simple deep merge for config overrides.
 * Arrays are replaced entirely (not merged).
 */
function mergeConfig(
  base: FixJeShitConfig,
  overrides?: Partial<FixJeShitConfig>
): FixJeShitConfig {
  if (!overrides) return base;

  return {
    general: { ...base.general, ...overrides.general },
    branding: { ...base.branding, ...overrides.branding },
    categories: overrides.categories ?? base.categories,
    gemeenten: overrides.gemeenten ?? base.gemeenten,
    defaultTemplate: overrides.defaultTemplate
      ? {
          actionCards:
            overrides.defaultTemplate.actionCards ??
            base.defaultTemplate.actionCards,
          helpCards:
            overrides.defaultTemplate.helpCards ??
            base.defaultTemplate.helpCards,
        }
      : base.defaultTemplate,
  };
}
