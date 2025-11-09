import { Platform } from "react-native";
import { colors } from "./colors";

// Native shadow styles for iOS and Android
export const getNativeShadow = (elevation: number = 4) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: 0.25 + elevation * 0.02,
      shadowRadius: elevation * 1.5,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation: elevation,
    };
  }
  return {};
};

// Native glow effect for important elements
export const getNativeGlow = (
  color: string = colors.primary,
  intensity: number = 1,
) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5 * intensity,
      shadowRadius: 15 * intensity,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation: 8 * intensity,
    };
  }
  return {};
};

// Platform-specific border radius
export const getNativeBorderRadius = (
  size: "small" | "medium" | "large" | "xlarge",
) => {
  const radii = {
    small: Platform.OS === "ios" ? 12 : 10,
    medium: Platform.OS === "ios" ? 16 : 14,
    large: Platform.OS === "ios" ? 20 : 18,
    xlarge: Platform.OS === "ios" ? 28 : 24,
  };
  return radii[size];
};

// Platform-specific spacing
export const getNativeSpacing = (size: "xs" | "sm" | "md" | "lg" | "xl") => {
  const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  return spacing[size];
};

// Native card style
export const getNativeCardStyle = () => ({
  borderRadius: getNativeBorderRadius("large"),
  backgroundColor: colors.card,
  ...getNativeShadow(6),
  overflow: "hidden" as const,
});

// Native button style
export const getNativeButtonStyle = (
  variant: "primary" | "secondary" = "primary",
) => ({
  borderRadius: getNativeBorderRadius("medium"),
  paddingHorizontal: Platform.OS === "ios" ? 24 : 20,
  paddingVertical: Platform.OS === "ios" ? 14 : 12,
  ...getNativeShadow(4),
  ...(variant === "primary" ? getNativeGlow(colors.primary, 0.8) : {}),
});

// Native pressable states
export const getPressableConfig = () => ({
  activeOpacity: 0.7,
  pressRetentionOffset: { top: 10, left: 10, bottom: 10, right: 10 },
});
