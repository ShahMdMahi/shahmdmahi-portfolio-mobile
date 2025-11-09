import { GradientCard } from '@/components/ui/gradient-card';
import { ResumeDownload } from '@/components/ui/resume-download';
import { SectionTitle } from '@/components/ui/section-title';
import { colors } from '@/constants/colors';
import { portfolioData } from '@/constants/portfolio';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const AboutSection = React.memo(() => {
  const { paragraphs, stats } = portfolioData.about;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="About Me"
        subtitle="Passionate developer with expertise across the entire stack"
      />

      <GradientCard delay={200}>
        {paragraphs.map((paragraph, index) => (
          <Animatable.Text
            key={index}
            animation="fadeIn"
            duration={1000}
            delay={400 + index * 200}
            style={styles.description}
          >
            {paragraph}
          </Animatable.Text>
        ))}
        <ResumeDownload resumeUrl={portfolioData.resume.url} />
      </GradientCard>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Animatable.View
            key={stat.label}
            animation="zoomIn"
            duration={600}
            delay={800 + index * 100}
            style={styles.statCard}
          >
            <View style={styles.statIconContainer}>
              <Ionicons name={stat.icon as any} size={32} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  description: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
    opacity: 0.95,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: Platform.OS === 'ios' ? 18 : 16,
    borderWidth: 1,
    borderColor: colors.border,
    width: '48%',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.glow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  statIconContainer: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: colors.darkAccent,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    textShadowColor: colors.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
