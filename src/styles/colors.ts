export const COLORS = {
  'primary-main': '#1976D2',
  'secondary-main': '#9C27B0',
  'error-main': '#D32F2F',
  'warning-main': '#ED6C02',
  'info-main': '#0288D1',
  'success-main': '#2E7D32',

  'primary-contrast': '#FFFFFF',
  'text-primary': '#000000DE',
  'grey-300': '#E0E0E0',
} as const;

export type Color = (typeof COLORS)[keyof typeof COLORS];
