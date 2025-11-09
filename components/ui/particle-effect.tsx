import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

interface ParticleEffectProps {
  count?: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  count = 20,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <Animatable.View
          key={index}
          animation="fadeOutUp"
          duration={1000 + Math.random() * 500}
          delay={index * 30}
          style={[
            styles.particle,
            {
              left: `${Math.random() * 100}%`,
              backgroundColor: index % 2 === 0 ? colors.primary : colors.accent,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  particle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    bottom: 0,
  },
});
