import { AnimatedButton } from '@/components/ui/animated-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { ProjectGallery } from '@/components/ui/project-gallery';
import { SectionTitle } from '@/components/ui/section-title';
import { colors } from '@/constants/colors';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useHaptics } from '@/hooks/use-haptics';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActionSheetIOS, Alert, Linking, Platform, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const ProjectsSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const projects = portfolioData.projects;
  const haptics = useHaptics();
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const openGallery = (project: typeof projects[0]) => {
    if (project.screenshots && project.screenshots.length > 0) {
      setSelectedProject(project);
      setGalleryVisible(true);
      haptics.light();
    }
  };

  const handleLongPress = (project: typeof projects[0]) => {
    haptics.medium();
    
    const options = ['View Project', 'Share', 'Copy Link', 'Cancel'];
    const cancelButtonIndex = 3;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            Linking.openURL(project.link);
          } else if (buttonIndex === 1) {
            Share.share({
              message: `Check out ${project.title}: ${project.link}`,
              url: project.link,
            });
          } else if (buttonIndex === 2) {
            // Copy link functionality would require clipboard
            haptics.success();
          }
        }
      );
    } else {
      Alert.alert(
        project.title,
        'Choose an action',
        [
          { text: 'View Project', onPress: () => Linking.openURL(project.link) },
          {
            text: 'Share',
            onPress: () =>
              Share.share({
                message: `Check out ${project.title}: ${project.link}`,
              }),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Featured Projects"
        subtitle="Showcasing innovative solutions across various industries"
      />

      <View style={styles.projectsGrid}>
        {projects.map((project, index) => (
          <Animatable.View
            key={project.title}
            animation="fadeInUp"
            duration={800}
            delay={200 + index * 150}
          >
            <Pressable onLongPress={() => handleLongPress(project)}>
              <GradientCard delay={200 + index * 100}>
                <View style={styles.projectCard}>
                {/* Project Icon */}
                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  duration={2000}
                  delay={400 + index * 100}
                  style={[styles.projectIcon, { backgroundColor: project.color + '20' }]}
                >
                  <Ionicons name={project.icon as any} size={40} color={project.color} />
                </Animatable.View>

              {/* Project Content */}
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>

              {/* Technologies */}
              <View style={styles.technologiesContainer}>
                {project.technologies.map((tech) => (
                  <View key={tech} style={styles.techBadge}>
                    <Text style={styles.techText}>{tech}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.projectActions}>
                {project.screenshots && project.screenshots.length > 0 && (
                  <AnimatedButton
                    title="View Gallery"
                    onPress={() => openGallery(project)}
                    variant="secondary"
                    icon={<Ionicons name="images" size={18} color={colors.text} />}
                  />
                )}
                <AnimatedButton
                  title="View Details"
                  onPress={() => Linking.openURL(project.link)}
                  variant="outline"
                  icon={<Ionicons name="eye" size={18} color={colors.primary} />}
                />
              </View>
                </View>
              </GradientCard>
            </Pressable>
          </Animatable.View>
        ))}
      </View>

      {/* Project Gallery Modal */}
      {selectedProject && (
        <ProjectGallery
          visible={galleryVisible}
          screenshots={selectedProject.screenshots || []}
          projectTitle={selectedProject.title}
          onClose={() => setGalleryVisible(false)}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkLight,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  projectsGrid: {
    gap: 20,
  },
  projectCard: {
    width: '100%',
  },
  projectIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  projectDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.95,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  techBadge: {
    backgroundColor: colors.darkAccent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  techText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    flexWrap: 'wrap',
  },
});
