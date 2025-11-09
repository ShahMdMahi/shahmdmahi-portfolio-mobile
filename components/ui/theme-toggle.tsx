import { colors } from '@/constants/colors';
import { useHaptics } from '@/hooks/use-haptics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  const haptics = useHaptics();

  return (
    <Animatable.View
      animation="bounceIn"
      duration={800}
      delay={800}
      style={styles.container}
    >
      <Pressable
        onPress={() => {
          haptics.light();
          onToggle();
        }}
        style={({ pressed }) => [
          styles.button,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.8 },
        ]}
      >
        <Animatable.View
          animation={isDark ? 'rotate' : 'pulse'}
          duration={800}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={24}
            color={isDark ? colors.primary : '#F59E0B'}
          />
        </Animatable.View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
