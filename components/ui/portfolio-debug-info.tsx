import { colors } from "@/constants/colors";
import { usePortfolio } from "@/contexts/portfolio-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Debug component to show portfolio data fetching status
 * Usage: Add <PortfolioDebugInfo /> to any screen during development
 */
export const PortfolioDebugInfo: React.FC = () => {
  const { cacheStatus, clearCache, refreshData, isRefreshing } = usePortfolio();

  const formatCacheAge = (ms: number | null) => {
    if (!ms) return "N/A";
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear the portfolio cache? The app will fetch fresh data from GitHub.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearCache();
            Alert.alert("Success", "Cache cleared successfully");
          },
        },
      ],
    );
  };

  const handleForceRefresh = async () => {
    try {
      await refreshData();
      Alert.alert("Success", "Portfolio data refreshed from GitHub");
    } catch (error) {
      Alert.alert("Error", "Failed to refresh portfolio data");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bug" size={20} color={colors.primary} />
        <Text style={styles.title}>Portfolio Data Status</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Cache Status:</Text>
        <Text style={styles.value}>
          {cacheStatus?.hasCachedData ? "Available" : "Empty"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Cache State:</Text>
        <Text
          style={[styles.value, cacheStatus?.isExpired && styles.expiredText]}
        >
          {cacheStatus?.isExpired ? "Expired" : "Valid"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Cache Age:</Text>
        <Text style={styles.value}>
          {formatCacheAge(cacheStatus?.cacheAge || null)}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.refreshButton]}
          onPress={handleForceRefresh}
          disabled={isRefreshing}
        >
          <Ionicons
            name={isRefreshing ? "hourglass" : "refresh"}
            size={16}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isRefreshing ? "Refreshing..." : "Force Refresh"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.clearButton]}
          onPress={handleClearCache}
        >
          <Ionicons name="trash" size={16} color="#fff" />
          <Text style={styles.buttonText}>Clear Cache</Text>
        </Pressable>
      </View>

      <Text style={styles.note}>
        💡 Data auto-refreshes every 24 hours or on pull-to-refresh
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkLight,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    fontFamily: "Inter_600SemiBold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark + "50",
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: "Inter_400Regular",
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  expiredText: {
    color: colors.warning,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  refreshButton: {
    backgroundColor: colors.primary,
  },
  clearButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
});
