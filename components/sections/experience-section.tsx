import { GradientCard } from '@/components/ui/gradient-card';
import { SectionTitle } from '@/components/ui/section-title';
import { colors } from '@/constants/colors';
import { portfolioData } from '@/constants/portfolio';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const ExperienceSection = React.memo(() => {
  const experiences = portfolioData.experiences;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Professional Experience"
        subtitle="Building the future, one project at a time"
      />

      <View style={styles.timeline}>
        {experiences.map((exp, index) => (
          <View key={exp.company} style={styles.timelineItem}>
            {/* Timeline Dot */}
            <View style={styles.timelineLeft}>
              <Animatable.View
                animation="zoomIn"
                duration={600}
                delay={200 + index * 100}
                style={[styles.timelineDot, { backgroundColor: exp.color }]}
              >
                <Ionicons name={exp.icon as any} size={24} color={colors.text} />
              </Animatable.View>
              {index < experiences.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>

            {/* Experience Card */}
            <View style={styles.timelineRight}>
              <GradientCard delay={300 + index * 100}>
                <View style={styles.experienceCard}>
                  <View style={styles.header}>
                    <View style={styles.headerLeft}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View style={[styles.periodBadge, { backgroundColor: exp.color + '20' }]}>
                      <Text style={[styles.period, { color: exp.color }]}>{exp.period}</Text>
                    </View>
                  </View>

                  <Text style={styles.description}>{exp.description}</Text>

                  <View style={styles.achievements}>
                    <Text style={styles.achievementsTitle}>Key Achievements:</Text>
                    {exp.achievements.map((achievement, i) => (
                      <Animatable.View
                        key={i}
                        animation="fadeInLeft"
                        duration={600}
                        delay={500 + index * 100 + i * 50}
                        style={styles.achievementItem}
                      >
                        <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                        <Text style={styles.achievementText}>{achievement}</Text>
                      </Animatable.View>
                    ))}
                  </View>
                </View>
              </GradientCard>
            </View>
          </View>
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
  timeline: {
    marginTop: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.dark,
    ...Platform.select({
      ios: {
        shadowColor: colors.glow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.borderLight,
    marginTop: 8,
  },
  timelineRight: {
    flex: 1,
  },
  experienceCard: {
    width: '100%',
  },
  header: {
    marginBottom: 12,
  },
  headerLeft: {
    marginBottom: 8,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  company: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  periodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    alignSelf: 'flex-start',
  },
  period: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  achievements: {
    marginTop: 12,
  },
  achievementsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
