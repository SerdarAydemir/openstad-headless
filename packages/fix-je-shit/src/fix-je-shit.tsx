import React from 'react';
import { createRoot } from 'react-dom/client';

import { FixJeShit as FixJeShitComponent } from './components/FixJeShit';
import './styles/fix-je-shit.css';
import type { FixJeShitConfig } from './types';

function loadWidget(elementId: string, config: any) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const root = createRoot(container);
  root.render(<FixJeShitComponent config={config} />);
}

(FixJeShitComponent as any).loadWidget = loadWidget;

export const FixJeShit = FixJeShitComponent;
export type { FixJeShitConfig } from './types';
