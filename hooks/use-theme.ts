import { colors } from '@/constants/colors';
import { useState } from 'react';

export type Theme = 'dark' | 'light';

const lightTheme = {
  dark: '#FFFFFF',
  darkLight: '#F5F5F5',
  darkAccent: '#E8E8E8',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#4A4A4A',
  textMuted: '#8A8A8A',
  primary: '#6366F1',
  primaryLight: '#818CF8',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  shadow: '#000000',
  glow: '#6366F1',
  gradientStart: '#6366F1',
  gradientMiddle: '#8B5CF6',
  gradientEnd: '#EC4899',
};

const darkTheme = colors;

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentColors = theme === 'dark' ? darkTheme : lightTheme;

  return {
    theme,
    toggleTheme,
    colors: currentColors,
    isDark: theme === 'dark',
  };
};
