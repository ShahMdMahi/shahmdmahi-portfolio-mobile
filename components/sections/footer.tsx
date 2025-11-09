import { colors } from '@/constants/colors';
import { portfolioData } from '@/constants/portfolio';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={styles.content}
      >
        <Text style={styles.name}>{portfolioData.personal.name}</Text>
        <Text style={styles.tagline}>{portfolioData.personal.tagline}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            {portfolioData.footer.copyright(currentYear)}
          </Text>
          <View style={styles.builtWith}>
            <Ionicons name="heart" size={16} color={colors.accent} />
            <Text style={styles.builtText}>{portfolioData.footer.builtWithText}</Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopWidth: 1.5,
    borderTopColor: colors.borderLight,
  },
  content: {
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  divider: {
    width: '100%',
    height: 1.5,
    backgroundColor: colors.borderLight,
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
  },
  copyright: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  builtWith: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  builtText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 6,
    letterSpacing: 0.2,
  },
});
