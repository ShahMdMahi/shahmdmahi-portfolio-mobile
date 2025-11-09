import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

export const SectionDivider: React.FC = () => {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.line} />
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
        style={styles.dot}
      />
      <Animatable.View animation="fadeIn" duration={1000} style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: colors.borderLight,
    opacity: 0.3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 12,
    shadowColor: colors.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
