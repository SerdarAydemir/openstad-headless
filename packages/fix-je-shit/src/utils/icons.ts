/**
 * Simple icon map. Each icon is a small inline SVG string.
 * Used in action cards and help cards. Icons are 24x24.
 */
const icons: Record<string, string> = {
  digid: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="11" r="3" stroke="currentColor" stroke-width="2"/><path d="M7 19C7 16.24 9.24 14 12 14C14.76 14 17 16.24 17 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  zorgverzekering: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="2"/></svg>`,

  zorgtoeslag: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7V12L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  wonen: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10V19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19V10" stroke="currentColor" stroke-width="2"/></svg>`,

  inboedelverzekering: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" stroke="currentColor" stroke-width="2"/><path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  studie: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 9L12 3" stroke="currentColor" stroke-width="2"/></svg>`,

  studenten_ov: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M6 10H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 14H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="12" r="2" stroke="currentColor" stroke-width="2"/></svg>`,

  bankrekening: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 10H22" stroke="currentColor" stroke-width="2"/><path d="M6 14H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  werk: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" stroke="currentColor" stroke-width="2"/></svg>`,

  geldzorgen: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>`,

  hulp: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z" stroke="currentColor" stroke-width="2"/><path d="M9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.31 14.17 11.42 13 11.83V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>`,

  informatie: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>`,

  belasting: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4H20V20H4V4Z" stroke="currentColor" stroke-width="2"/><path d="M4 9H20" stroke="currentColor" stroke-width="2"/><path d="M9 9V20" stroke="currentColor" stroke-width="2"/></svg>`,

  inschrijven: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>`,

  default: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

export function getIconSvg(name: string): string {
  return icons[name] || icons.default;
}
