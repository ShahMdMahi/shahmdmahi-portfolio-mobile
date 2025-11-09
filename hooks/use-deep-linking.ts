import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useDeepLinking = (
  onNavigateToSection?: (section: 'about' | 'skills' | 'projects' | 'experience' | 'contact') => void
) => {
  useEffect(() => {
    // Handle deep link when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Handle deep link when app is opened from a link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onNavigateToSection]);

  const handleDeepLink = (url: string) => {
    try {
      const { hostname, path, queryParams } = Linking.parse(url);
      
      // Handle different deep link patterns
      // shahmdmahi://section/about
      // https://shahmdmahi.com/portfolio/section/projects
      
      if (path?.includes('section/')) {
        const section = path.split('section/')[1] as 'about' | 'skills' | 'projects' | 'experience' | 'contact';
        
        if (['about', 'skills', 'projects', 'experience', 'contact'].includes(section)) {
          onNavigateToSection?.(section);
        } else {
          Alert.alert('Invalid Link', 'The section you are trying to access does not exist.');
        }
      } else if (queryParams?.section) {
        const section = queryParams.section as 'about' | 'skills' | 'projects' | 'experience' | 'contact';
        
        if (['about', 'skills', 'projects', 'experience', 'contact'].includes(section)) {
          onNavigateToSection?.(section);
        }
      }
    } catch (error) {
      console.error('Deep link parsing error:', error);
      Alert.alert('Link Error', 'Unable to process the link.');
    }
  };

  // Helper function to generate deep links
  const createDeepLink = (section: string) => {
    return Linking.createURL(`section/${section}`);
  };

  return {
    createDeepLink,
    handleDeepLink,
  };
};
