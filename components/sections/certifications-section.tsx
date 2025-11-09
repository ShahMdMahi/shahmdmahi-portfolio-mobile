import { colors } from '@/constants/colors';
import { usePortfolio } from '@/contexts/portfolio-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SectionTitle } from '../ui/section-title';

export const CertificationsSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const renderCertification = (item: typeof portfolioData.certifications[0], index: number) => (
    <Animatable.View
      key={index}
      animation="fadeInUp"
      duration={600}
      delay={index * 100}
      style={styles.cardWrapper}
    >
      <View style={[styles.card, { borderTopColor: item.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon as any} size={28} color={item.color} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.issuer}>{item.issuer}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: item.color }]}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <SectionTitle title="Certifications & Awards" />

      <View style={styles.grid}>
        {portfolioData.certifications.map((item, index) => renderCertification(item, index))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  grid: {
    gap: 16,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderTopWidth: 3,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  issuer: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
