import { AboutSection } from '@/components/sections/about-section';
import { BlogSection } from '@/components/sections/blog-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { OfflineIndicator } from '@/components/ui/offline-indicator';
import { ScrollProgressIndicator } from '@/components/ui/scroll-progress-indicator';
import { SectionDivider } from '@/components/ui/section-divider';
import { colors } from '@/constants/colors';
import React, { useRef, useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const projectsRef = useRef<View>(null);
  const contactRef = useRef<View>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress = (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const scrollToProjects = () => {
    projectsRef.current?.measureLayout(
      scrollViewRef.current as any,
      (_left, top) => {
        scrollViewRef.current?.scrollTo({ y: top, animated: true });
      },
      () => {}
    );
  };

  const scrollToContact = () => {
    contactRef.current?.measureLayout(
      scrollViewRef.current as any,
      (_left, top) => {
        scrollViewRef.current?.scrollTo({ y: top, animated: true });
      },
      () => {}
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.dark}
      />
      <ScrollProgressIndicator progress={scrollProgress} />
      <OfflineIndicator />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, colors.accent]}
          />
        }
      >
        <HeroSection onViewProjects={scrollToProjects} onContactMe={scrollToContact} />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <View ref={projectsRef} collapsable={false}>
          <ProjectsSection />
        </View>
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <View ref={contactRef} collapsable={false}>
          <ContactSection />
        </View>
        <Footer />
      </ScrollView>
      
      <FloatingActionButton onPress={scrollToContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
