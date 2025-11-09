import { AnimatedButton } from '@/components/ui/animated-button';
import { colors } from '@/constants/colors';
import { getNativeGlow, getNativeShadow } from '@/constants/native-styles';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useHaptics } from '@/hooks/use-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, ImageStyle, Linking, Platform, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

interface HeroSectionProps {
  onViewProjects?: () => void;
  onContactMe?: () => void;
}

export const HeroSection = React.memo<HeroSectionProps>(({ onViewProjects, onContactMe }) => {
  const { portfolioData } = usePortfolio();
  const haptics = useHaptics();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.dark, colors.darkAccent, colors.darkLight, colors.dark]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Animated Background Circles */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={5000}
          easing="ease-in-out"
          style={styles.bgCircle1}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={7000}
          easing="ease-in-out"
          style={styles.bgCircle2}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={4000}
          easing="ease-in-out"
          style={styles.bgCircle3}
        />
        
        {/* Animated Profile Circle with Glow and Image */}
        <Animatable.View
          animation="bounceIn"
          duration={1200}
          delay={200}
          style={styles.profileContainer}
        >
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={3000}
            style={styles.profileGlow}
          >
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
              style={styles.profileCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.profileInner}>
                <Image
                  source={portfolioData.personal.profileImage}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                {/* Fallback initials if image not available */}
                {/* <Text style={styles.profileInitials}>{portfolioData.personal.initials}</Text> */}
              </View>
            </LinearGradient>
          </Animatable.View>
        </Animatable.View>

        {/* Name and Title */}
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          delay={400}
          style={styles.greeting}
        >
          {portfolioData.personal.greeting}
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInUp"
          duration={1000}
          delay={600}
          style={styles.name}
        >
          {portfolioData.personal.name}
        </Animatable.Text>

        <Animatable.View
          animation="fadeIn"
          duration={1000}
          delay={800}
          style={styles.titleContainer}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          >
            <Text style={styles.title}>{portfolioData.personal.title}</Text>
          </LinearGradient>
        </Animatable.View>

        <Animatable.Text
          animation="fadeIn"
          duration={1000}
          delay={1000}
          style={styles.description}
        >
          {portfolioData.personal.description}
        </Animatable.Text>

        {/* Social Icons */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={1200}
          style={styles.socialContainer}
        >
          {portfolioData.social.links.map((social, index) => (
            <Animatable.View
              key={social.name}
              animation="bounceIn"
              duration={800}
              delay={1400 + index * 100}
            >
              <Pressable
                onPress={() => {
                  haptics.light();
                  Linking.openURL(social.url);
                }}
                style={({ pressed }) => [
                  styles.socialIcon,
                  pressed && { transform: [{ scale: 0.9 }], opacity: 0.8 },
                ]}
              >
                <Ionicons name={social.icon as any} size={26} color={social.color} />
              </Pressable>
            </Animatable.View>
          ))}
        </Animatable.View>

        {/* CTA Buttons */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={1400}
          style={styles.buttonContainer}
        >
          <AnimatedButton
            title="View Projects"
            onPress={() => onViewProjects?.()}
            variant="primary"
            icon={<Ionicons name="briefcase" size={20} color={colors.text} />}
          />
          <View style={styles.buttonSpacer} />
          <AnimatedButton
            title="Contact Me"
            onPress={() => onContactMe?.()}
            variant="outline"
            icon={<Ionicons name="send" size={20} color={colors.primary} />}
          />
        </Animatable.View>

        {/* Scroll Indicator */}
        <Animatable.View
          animation="bounce"
          iterationCount="infinite"
          duration={2000}
          delay={1600}
          style={styles.scrollIndicator}
        >
          <Ionicons name="chevron-down" size={32} color={colors.textMuted} />
        </Animatable.View>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  } as ViewStyle,
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  } as ViewStyle,
  bgCircle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: colors.glow,
    top: -width * 0.4,
    right: -width * 0.2,
    opacity: 0.25,
  } as ViewStyle,
  bgCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: colors.accent,
    bottom: -width * 0.2,
    left: -width * 0.15,
    opacity: 0.2,
  } as ViewStyle,
  bgCircle3: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: colors.purple,
    top: height * 0.4,
    right: -width * 0.15,
    opacity: 0.15,
  } as ViewStyle,
  profileContainer: {
    marginBottom: 24,
    zIndex: 10,
  } as ViewStyle,
  profileGlow: {
    ...getNativeGlow(colors.primary, 1.2),
  } as ViewStyle,
  profileCircle: {
    width: Math.min(140, width * 0.35),
    height: Math.min(140, width * 0.35),
    borderRadius: Math.min(70, width * 0.175),
    padding: 4,
  } as ViewStyle,
  profileInner: {
    width: '100%',
    height: '100%',
    borderRadius: Math.min(70, width * 0.175),
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as ViewStyle,
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: Math.min(70, width * 0.175),
  } as ImageStyle,
  profileInitials: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.text,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  } as TextStyle,
  greeting: {
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    color: colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
  } as TextStyle,
  name: {
    fontSize: Math.min(36, width * 0.1),
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  } as TextStyle,
  titleContainer: {
    borderRadius: Platform.OS === 'ios' ? 14 : 12,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 16,
    ...getNativeShadow(4),
  } as ViewStyle,
  titleGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  } as ViewStyle,
  title: {
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.3,
  } as TextStyle,
  description: {
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 24,
    marginBottom: 28,
    opacity: 0.9,
  } as TextStyle,
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    justifyContent: 'center',
  } as ViewStyle,
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...getNativeShadow(4),
  } as ViewStyle,
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 12,
  } as ViewStyle,
  buttonSpacer: {
    height: 12,
  } as ViewStyle,
  scrollIndicator: {
    position: 'absolute',
    bottom: 20,
  } as ViewStyle,
});
