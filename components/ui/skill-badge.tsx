import { colors } from '@/constants/colors';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface SkillBadgeProps {
  skill: string;
  index: number;
  icon?: React.ReactNode;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, index, icon }) => {
  return (
    <Animatable.View
      animation="zoomIn"
      duration={600}
      delay={index * 50}
      style={styles.container}
    >
      <View style={styles.badge}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.text}>{skill}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.glow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
