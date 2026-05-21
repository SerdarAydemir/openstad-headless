// ============================================================
// Fix Je Shit — Widget Configuration Types
// ============================================================
// These types define the structure of the admin-configurable
// JSON that powers the widget. Each gemeente can have its own
// set of action cards, help cards, and contact info.
// ============================================================

export interface FixJeShitConfig {
  general: GeneralConfig;
  branding: BrandingConfig;
  categories: Category[];
  gemeenten: GemeenteConfig[];
  /** Fallback action/help cards for gemeenten without custom configuration */
  defaultTemplate: GemeenteTemplate;
}

export interface GemeenteTemplate {
  actionCards: ActionCardConfig[];
  helpCards: HelpCardConfig[];
}

export interface GeneralConfig {
  widgetTitle: string;
  landingTitle: string;
  landingDescription: string;
  startButtonText: string;
  estimatedTime: string;
  logoUrl?: string;
  tipText: string;
  gemeenteSelectTitle: string;
  gemeenteSelectPlaceholder: string;
  gemeenteSelectHelper: string;
  scoreTitle: string;
  scoreDescriptionGood: string;
  scoreDescriptionMedium: string;
  scoreDescriptionBad: string;
  fixSectionTitle: string;
  helpSectionTitle: string;
}

export interface BrandingConfig {
  primaryColor: string;
  errorColor: string;
  progressColor: string;
  scoreCompleteColor: string;
  scoreIncompleteColor: string;
  warningColor: string;
  backgroundColor: string;
  cardBackground: string;
  fontFamily?: string;
}

export interface Category {
  id: string;
  label: string;
  color?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'binary' | 'multi';
  options: QuestionOption[];
  flagKey: string;
  flagValueOnIncomplete: string;
  skipCondition?: SkipCondition;
  linkedActionCardId?: string;
}

export interface QuestionOption {
  label: string;
  value: 'complete' | 'incomplete' | 'unknown';
}

export interface SkipCondition {
  dependsOnQuestionId: string;
  skipWhenValue: 'complete' | 'incomplete' | 'unknown';
}

export interface GemeenteConfig {
  id: string;
  name: string;
  officialName?: string;
  websiteUrl?: string;
  searchTerms?: string[];
  /** Custom action cards — falls back to defaultTemplate if empty/undefined */
  actionCards?: ActionCardConfig[];
  /** Custom help cards — falls back to defaultTemplate if empty/undefined */
  helpCards?: HelpCardConfig[];
  contact?: ContactConfig;
}

export interface ActionCardConfig {
  id: string;
  linkedToFlag: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  buttonText: string;
  priority: boolean;
}

export interface HelpCardConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  buttonText: string;
}

export interface ContactConfig {
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  instagramUrl?: string;
  websiteUrl?: string;
}
