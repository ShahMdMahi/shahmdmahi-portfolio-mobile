import { colors } from '@/constants/colors';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const OfflineIndicator: React.FC = () => {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <Animatable.View animation="slideInDown" duration={300} style={styles.container}>
      <Ionicons name="cloud-offline" size={16} color={colors.text} />
      <Text style={styles.text}>No Internet Connection</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 3,
    left: 20,
    right: 20,
    backgroundColor: colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
});
