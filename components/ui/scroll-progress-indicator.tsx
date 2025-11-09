import { colors } from "@/constants/colors";
import React, { useEffect } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

interface ScrollProgressIndicatorProps {
  progress: number;
}

export const ScrollProgressIndicator: React.FC<
  ScrollProgressIndicatorProps
> = ({ progress }) => {
  const width = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(width, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: width.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 47 : 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.border,
    zIndex: 1000,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    shadowColor: colors.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
