import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

interface FormSuccessProps {
  message: string;
  onClose?: () => void;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  return (
    <Animatable.View
      animation="bounceIn"
      duration={800}
      style={styles.container}
    >
      <Animatable.View
        animation="pulse"
        iterationCount={2}
        duration={500}
        style={styles.iconContainer}
      >
        <Ionicons name="checkmark-circle" size={64} color={colors.success} />
      </Animatable.View>
      <Text style={styles.message}>{message}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    lineHeight: 26,
  },
});
