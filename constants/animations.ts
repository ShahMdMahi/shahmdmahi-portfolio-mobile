import { CustomAnimation } from "react-native-animatable";

// Custom animation definitions for heavy animations
export const customAnimations = {
  // Floating animation
  float: {
    0: { transform: [{ translateY: 0 }] },
    0.5: { transform: [{ translateY: -10 }] },
    1: { transform: [{ translateY: 0 }] },
  } as CustomAnimation,

  // Rotate and scale
  rotateScale: {
    0: { transform: [{ rotate: "0deg" }, { scale: 1 }] },
    0.5: { transform: [{ rotate: "180deg" }, { scale: 1.1 }] },
    1: { transform: [{ rotate: "360deg" }, { scale: 1 }] },
  } as CustomAnimation,

  // Wiggle animation
  wiggle: {
    0: { transform: [{ rotate: "0deg" }] },
    0.25: { transform: [{ rotate: "-10deg" }] },
    0.5: { transform: [{ rotate: "10deg" }] },
    0.75: { transform: [{ rotate: "-10deg" }] },
    1: { transform: [{ rotate: "0deg" }] },
  } as CustomAnimation,

  // Glow pulse
  glowPulse: {
    0: { opacity: 1, transform: [{ scale: 1 }] },
    0.5: { opacity: 0.8, transform: [{ scale: 1.05 }] },
    1: { opacity: 1, transform: [{ scale: 1 }] },
  } as CustomAnimation,

  // Slide and fade
  slideInFade: {
    0: { opacity: 0, transform: [{ translateX: -50 }] },
    1: { opacity: 1, transform: [{ translateX: 0 }] },
  } as CustomAnimation,

  // Bounce scale
  bounceScale: {
    0: { transform: [{ scale: 0 }] },
    0.5: { transform: [{ scale: 1.2 }] },
    0.75: { transform: [{ scale: 0.9 }] },
    1: { transform: [{ scale: 1 }] },
  } as CustomAnimation,

  // Shake
  shake: {
    0: { transform: [{ translateX: 0 }] },
    0.1: { transform: [{ translateX: -10 }] },
    0.2: { transform: [{ translateX: 10 }] },
    0.3: { transform: [{ translateX: -10 }] },
    0.4: { transform: [{ translateX: 10 }] },
    0.5: { transform: [{ translateX: 0 }] },
  } as CustomAnimation,

  // Flip in
  flipIn: {
    0: { transform: [{ rotateY: "90deg" }], opacity: 0 },
    0.5: { transform: [{ rotateY: "0deg" }], opacity: 1 },
  } as CustomAnimation,

  // Swing
  swing: {
    0: { transform: [{ rotate: "0deg" }] },
    0.2: { transform: [{ rotate: "15deg" }] },
    0.4: { transform: [{ rotate: "-10deg" }] },
    0.6: { transform: [{ rotate: "5deg" }] },
    0.8: { transform: [{ rotate: "-5deg" }] },
    1: { transform: [{ rotate: "0deg" }] },
  } as CustomAnimation,

  // Zoom in rotate
  zoomInRotate: {
    0: { transform: [{ scale: 0 }, { rotate: "-180deg" }], opacity: 0 },
    1: { transform: [{ scale: 1 }, { rotate: "0deg" }], opacity: 1 },
  } as CustomAnimation,

  // Fade in down big
  fadeInDownBig: {
    0: { opacity: 0, transform: [{ translateY: -100 }] },
    1: { opacity: 1, transform: [{ translateY: 0 }] },
  } as CustomAnimation,

  // Fade in up big
  fadeInUpBig: {
    0: { opacity: 0, transform: [{ translateY: 100 }] },
    1: { opacity: 1, transform: [{ translateY: 0 }] },
  } as CustomAnimation,

  // Heart beat
  heartBeat: {
    0: { transform: [{ scale: 1 }] },
    0.14: { transform: [{ scale: 1.3 }] },
    0.28: { transform: [{ scale: 1 }] },
    0.42: { transform: [{ scale: 1.3 }] },
    0.7: { transform: [{ scale: 1 }] },
  } as CustomAnimation,
};

// Animation presets for different components
export const animationPresets = {
  heroEntry: {
    animation: "fadeInDownBig" as const,
    duration: 1200,
    delay: 0,
  },
  cardEntry: {
    animation: "fadeInUp" as const,
    duration: 800,
    delay: 200,
  },
  iconPulse: {
    animation: "pulse" as const,
    duration: 2000,
    iterationCount: "infinite" as const,
  },
  buttonHover: {
    animation: "bounceIn" as const,
    duration: 600,
    delay: 0,
  },
  listItem: {
    animation: "slideInRight" as const,
    duration: 600,
  },
  modalEntry: {
    animation: "zoomIn" as const,
    duration: 500,
  },
  badge: {
    animation: "bounceIn" as const,
    duration: 800,
  },
};

// Stagger delay calculator
export const getStaggerDelay = (
  index: number,
  baseDelay: number = 100,
): number => {
  return baseDelay * index;
};

// Get animation duration based on device performance
export const getOptimizedDuration = (baseDuration: number): number => {
  // Reduce duration slightly on slower devices
  return baseDuration;
};
