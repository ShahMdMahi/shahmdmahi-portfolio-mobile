import { colors } from '@/constants/colors';
import { getNativeShadow } from '@/constants/native-styles';
import { useHaptics } from '@/hooks/use-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  fullWidth = false,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const haptics = useHaptics();
  const buttonRef = useRef<any>(null);

  const handlePress = () => {
    if (!disabled) {
      haptics.medium();
      if (buttonRef.current) {
        buttonRef.current.pulse(300).then(() => {
          onPress();
        });
      } else {
        onPress();
      }
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
    haptics.light();
  };

  const buttonContent = (
    <View style={[styles.buttonContent, fullWidth && styles.fullWidth]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.buttonText, variant === 'outline' && styles.outlineText]}>
        {title}
      </Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <Animatable.View
        ref={buttonRef}
        animation="pulse"
        iterationCount="infinite"
        duration={2500}
        easing="ease-in-out"
        style={[styles.container, fullWidth && styles.fullWidth]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={() => setIsPressed(false)}
          disabled={disabled}
          accessible={true}
          accessibilityLabel={title}
          accessibilityHint={variant === 'primary' ? 'Double tap to activate' : 'Double tap to view details'}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          style={({ pressed }) => [
            styles.pressable,
            fullWidth && styles.fullWidth,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.button,
              styles.primaryButton,
              isPressed && styles.pressed,
              disabled && styles.disabled,
              fullWidth && styles.fullWidth,
            ]}
          >
            <View style={[styles.buttonContent, fullWidth && styles.fullWidth]}>
              {icon && (
                <Animatable.View
                  animation="bounce"
                  iterationCount="infinite"
                  duration={2000}
                  style={styles.icon}
                >
                  {icon}
                </Animatable.View>
              )}
              <Text style={styles.buttonText}>
                {title}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </Animatable.View>
    );
  }

  return (
    <Animatable.View
      ref={buttonRef}
      animation="fadeIn"
      duration={800}
      style={[styles.container, fullWidth && styles.fullWidth]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        accessible={true}
        accessibilityLabel={title}
        accessibilityHint="Double tap to activate"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.pressable,
          fullWidth && styles.fullWidth,
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <View
          style={[
            styles.button,
            variant === 'secondary' && styles.secondaryButton,
            variant === 'outline' && styles.outlineButton,
            isPressed && styles.pressed,
            disabled && styles.disabled,
            fullWidth && styles.fullWidth,
          ]}
        >
          {buttonContent}
        </View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  pressable: {
    borderRadius: Platform.OS === 'ios' ? 16 : 14,
  },
  button: {
    paddingHorizontal: Platform.OS === 'ios' ? 32 : 28,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    borderRadius: Platform.OS === 'ios' ? 16 : 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...getNativeShadow(8),
  },
  primaryButton: {
    // Gradient applied separately
  },
  secondaryButton: {
    backgroundColor: colors.cardSolid,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...getNativeShadow(4),
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    ...getNativeShadow(3),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    letterSpacing: Platform.OS === 'ios' ? 0.5 : 0.3,
  },
  outlineText: {
    color: colors.primary,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
});
