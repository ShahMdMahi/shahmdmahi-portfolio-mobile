import { colors } from '@/constants/colors';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useHaptics } from '@/hooks/use-haptics';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SectionTitle } from '../ui/section-title';

export const BlogSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const haptics = useHaptics();

  const handleArticlePress = async (url: string, title: string) => {
    try {
      haptics.light();
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open article link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open article');
    }
  };

  const renderArticle = (item: typeof portfolioData.blog[0], index: number) => (
    <Animatable.View
      key={index}
      animation="fadeInUp"
      duration={600}
      delay={index * 150}
      style={styles.cardWrapper}
    >
      <Pressable
        onPress={() => handleArticlePress(item.url, item.title)}
        style={({ pressed }) => [
          styles.card,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        
        <View style={[styles.categoryBadge, { backgroundColor: item.color }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.excerpt} numberOfLines={3}>{item.excerpt}</Text>

          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>
                {new Date(item.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>{item.readTime}</Text>
            </View>
          </View>

          <View style={styles.readMore}>
            <Text style={styles.readMoreText}>Read Article</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </View>
        </View>
      </Pressable>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <SectionTitle title="Blog & Articles" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={330}
        decelerationRate="fast"
      >
        {portfolioData.blog.map((item, index) => renderArticle(item, index))}
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
  cardWrapper: {
    width: 310,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
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
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.dark,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  excerpt: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
