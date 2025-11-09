import { colors } from "@/constants/colors";
import { useHaptics } from "@/hooks/use-haptics";
import { Ionicons } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

interface ResumeDownloadProps {
  resumeUrl: string;
}

export const ResumeDownload: React.FC<ResumeDownloadProps> = ({
  resumeUrl,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const haptics = useHaptics();

  const downloadResume = async () => {
    try {
      haptics.medium();
      setIsDownloading(true);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Error", "Sharing is not available on this device");
        setIsDownloading(false);
        return;
      }

      // Download the file using the new expo-file-system API
      const file = new File(Paths.cache, "shahmd_mahi_resume.pdf");

      // Download the file
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error("Download failed");
      }

      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      await file.create();
      await file.write(uint8Array);

      haptics.success();

      // Share the downloaded file
      await Sharing.shareAsync(file.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Save Resume",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      haptics.error();
      Alert.alert(
        "Download Error",
        "Failed to download resume. Please check your internet connection and try again.",
      );
      console.error("Resume download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Animatable.View animation="fadeInUp" duration={800} delay={400}>
      <Pressable
        onPress={downloadResume}
        disabled={isDownloading}
        accessible={true}
        accessibilityLabel={
          isDownloading ? "Downloading resume" : "Download resume"
        }
        accessibilityHint="Double tap to download and share resume PDF"
        accessibilityRole="button"
        accessibilityState={{ disabled: isDownloading, busy: isDownloading }}
        style={({ pressed }) => [
          styles.button,
          pressed && { transform: [{ scale: 0.97 }] },
          isDownloading && styles.buttonDisabled,
        ]}
      >
        <View style={styles.content}>
          {isDownloading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
          )}
          <Text style={styles.text}>
            {isDownloading ? "Downloading..." : "Download Resume"}
          </Text>
        </View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
