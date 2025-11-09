import { colors } from '@/constants/colors';
import { useHaptics } from '@/hooks/use-haptics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'send',
}) => {
  const haptics = useHaptics();

  return (
    <Animatable.View
      animation="bounceIn"
      duration={800}
      delay={1000}
      style={styles.container}
    >
      <Pressable
        onPress={() => {
          haptics.medium();
          onPress();
        }}
        onPressIn={() => haptics.light()}
        style={({ pressed }) => [
          styles.button,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.9 },
        ]}
        accessible={true}
        accessibilityLabel="Contact me"
        accessibilityHint="Double tap to scroll to the contact section"
        accessibilityRole="button"
      >
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
        >
          <Ionicons name={icon as any} size={28} color={colors.text} />
        </Animatable.View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
