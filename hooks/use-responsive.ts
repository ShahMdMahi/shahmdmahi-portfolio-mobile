import { useEffect, useState } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';

interface ResponsiveBreakpoints {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scale: number;
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const [dimensions, setDimensions] = useState<ScaledSize>(
    Dimensions.get('window')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isPortrait = height > width;
  const isLandscape = width > height;

  // Breakpoints
  const isSmall = width < 640;
  const isMedium = width >= 640 && width < 768;
  const isLarge = width >= 768 && width < 1024;
  const isXLarge = width >= 1024;

  // Device types
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const isTablet = isMobile && (isLarge || isXLarge);
  const isDesktop = Platform.OS === 'web' && isXLarge;

  // Scale factor for responsive sizing
  const baseWidth = 375; // iPhone standard width
  const scale = width / baseWidth;

  return {
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
    width,
    height,
    isPortrait,
    isLandscape,
    isMobile,
    isTablet,
    isDesktop,
    scale: Math.min(scale, 1.5), // Cap scale at 1.5x
  };
};

// Helper function for responsive sizing
export const responsiveSize = (size: number, scale: number): number => {
  return Math.round(size * scale);
};

// Helper for responsive padding/margin
export const responsiveSpacing = (
  base: number,
  scale: number,
  multiplier: number = 1
): number => {
  return Math.round(base * scale * multiplier);
};
