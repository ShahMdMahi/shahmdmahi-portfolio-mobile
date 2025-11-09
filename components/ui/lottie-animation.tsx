import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface LottieAnimationProps {
  animationName: "rocket" | "success" | "loading" | "coding" | "celebration";
  size?: number;
  loop?: boolean;
  autoPlay?: boolean;
  style?: ViewStyle;
  onAnimationFinish?: () => void;
}

// Lottie JSON URLs from popular free sources
const ANIMATIONS = {
  rocket: "https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json", // Rocket launch
  success: "https://assets9.lottiefiles.com/packages/lf20_jbrw3hcz.json", // Success checkmark
  loading: "https://assets4.lottiefiles.com/packages/lf20_p8bfn5to.json", // Loading spinner
  coding: "https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json", // Coding animation
  celebration: "https://assets1.lottiefiles.com/packages/lf20_u4yrau.json", // Celebration
};

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationName,
  size = 150,
  loop = true,
  autoPlay = true,
  style,
  onAnimationFinish,
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (autoPlay && animationRef.current) {
      animationRef.current.play();
    }
  }, [autoPlay]);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <LottieView
        ref={animationRef}
        source={{ uri: ANIMATIONS[animationName] }}
        autoPlay={autoPlay}
        loop={loop}
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
