import { colors } from '@/constants/colors';
import { usePortfolio } from '@/contexts/portfolio-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SectionTitle } from '../ui/section-title';

export const TestimonialsSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < rating ? 'star' : 'star-outline'}
            size={16}
            color={colors.warning}
          />
        ))}
      </View>
    );
  };

  const renderTestimonial = (item: typeof portfolioData.testimonials[0], index: number) => (
    <Animatable.View
      key={index}
      animation="fadeInUp"
      duration={600}
      delay={index * 150}
      style={[styles.card, { borderLeftColor: item.color }]}
    >
      <View style={styles.header}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
      </View>

      {renderStars(item.rating)}

      <Text style={styles.text}>{item.text}</Text>

      <View style={styles.quoteIcon}>
        <Ionicons name="chatbox-ellipses" size={24} color={item.color} style={{ opacity: 0.3 }} />
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <SectionTitle title="Testimonials" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={330}
        decelerationRate="fast"
      >
        {portfolioData.testimonials.map((item, index) => renderTestimonial(item, index))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  scrollContent: {
    paddingHorizontal: 30,
    gap: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    width: 310,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.border,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: colors.textMuted,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  quoteIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
