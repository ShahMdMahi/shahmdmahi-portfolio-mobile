import { colors } from '@/constants/colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle,
  delay = 0 
}) => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        delay={delay}
        style={styles.titleContainer}
      >
        <MaskedView
          maskElement={
            <Text style={styles.title}>{title}</Text>
          }
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
          </LinearGradient>
        </MaskedView>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          style={styles.underline}
        />
      </Animatable.View>
      {subtitle && (
        <Animatable.Text
          animation="fadeIn"
          duration={1000}
          delay={delay + 200}
          style={styles.subtitle}
        >
          {subtitle}
        </Animatable.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    shadowColor: colors.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: '90%',
    lineHeight: 22,
    opacity: 0.9,
  },
});
