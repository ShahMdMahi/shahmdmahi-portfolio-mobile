import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ProjectGalleryProps {
  visible: boolean;
  screenshots: string[];
  projectTitle: string;
  onClose: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  visible,
  screenshots,
  projectTitle,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={500} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title} numberOfLines={1}>{projectTitle}</Text>
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessible={true}
              accessibilityLabel="Close gallery"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={28} color={colors.text} />
            </Pressable>
          </View>
        </Animatable.View>

        {/* Gallery */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.gallery}
        >
          {screenshots.map((screenshot, index) => (
            <Animatable.View
              key={index}
              animation="fadeIn"
              duration={600}
              delay={index * 100}
              style={styles.imageContainer}
            >
              <Image
                source={{ uri: screenshot }}
                style={styles.image}
                resizeMode="contain"
              />
            </Animatable.View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <Animatable.View animation="fadeInUp" duration={500} style={styles.pagination}>
          {screenshots.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </Animatable.View>

        {/* Image Counter */}
        <Animatable.View animation="fadeIn" duration={500} delay={300} style={styles.counter}>
          <Text style={styles.counterText}>
            {activeIndex + 1} / {screenshots.length}
          </Text>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.darkAccent,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: colors.card,
  },
  gallery: {
    flex: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  counter: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: colors.card + 'CC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});
