import { colors } from '@/constants/colors';
import { getNativeShadow } from '@/constants/native-styles';
import { useHaptics } from '@/hooks/use-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface GradientCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
  interactive?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  delay = 0,
  style,
  interactive = false,
}) => {
  const cardRef = useRef<any>(null);
  const haptics = useHaptics();

  const handlePress = () => {
    if (interactive) {
      haptics.light();
      if (cardRef.current) {
        cardRef.current.pulse(400);
      }
    }
  };

  const cardContent = (
    <View style={styles.card}>
      <LinearGradient
        colors={[colors.card, colors.darkLighter]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );

  return (
    <Animatable.View
      ref={cardRef}
      animation="fadeInUp"
      duration={800}
      delay={delay}
      easing="ease-out"
      style={[styles.container, style]}
    >
      {interactive ? (
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
          ]}
        >
          {cardContent}
        </Pressable>
      ) : (
        cardContent
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    borderRadius: Platform.OS === 'ios' ? 20 : 18,
    overflow: 'hidden',
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    ...getNativeShadow(10),
  },
  gradient: {
    padding: Platform.OS === 'ios' ? 24 : 20,
  },
});
