import { GradientCard } from '@/components/ui/gradient-card';
import { SectionTitle } from '@/components/ui/section-title';
import { SkillBadge } from '@/components/ui/skill-badge';
import { colors } from '@/constants/colors';
import { usePortfolio } from '@/contexts/portfolio-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const SkillsSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const skills = portfolioData.skills;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Skills & Expertise"
        subtitle="A comprehensive toolkit for building modern applications"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {skills.map((category, categoryIndex) => (
          <Animatable.View
            key={category.title}
            animation="slideInRight"
            duration={800}
            delay={200 + categoryIndex * 100}
          >
            <GradientCard
              delay={200 + categoryIndex * 100}
              style={styles.categoryCard}
            >
              <Animatable.View
                animation="bounceIn"
                duration={1000}
                delay={400 + categoryIndex * 100}
                style={styles.categoryHeader}
              >
                <Ionicons name={category.icon as any} size={28} color={colors.primary} />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </Animatable.View>
              <View style={styles.skillsWrapper}>
                {category.skills.map((skill, index) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={index}
                  />
                ))}
              </View>
            </GradientCard>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingVertical: 60,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  categoryCard: {
    marginRight: 16,
    width: 300,
    maxWidth: 300,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  categoryTitle: {
    marginLeft: 12,
    fontSize: Platform.OS === 'ios' ? 19 : 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    letterSpacing: 0.3,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
