import { AnimatedButton } from "@/components/ui/animated-button";
import { FormSuccess } from "@/components/ui/form-success";
import { GradientCard } from "@/components/ui/gradient-card";
import { ParticleEffect } from "@/components/ui/particle-effect";
import { SectionTitle } from "@/components/ui/section-title";
import { colors } from "@/constants/colors";
import { usePortfolio } from "@/contexts/portfolio-context";
import { useHaptics } from "@/hooks/use-haptics";
import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

export const ContactSection = React.memo(() => {
  const { portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const haptics = useHaptics();

  const contactInfo = portfolioData.contact.info;

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      haptics.error();
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const isAvailable = await MailComposer.isAvailableAsync();

      if (!isAvailable) {
        haptics.error();
        Alert.alert(
          "Email Not Available",
          "Please configure an email account on your device or contact me directly.",
          [{ text: "OK" }],
        );
        return;
      }

      await MailComposer.composeAsync({
        recipients: [
          portfolioData.contact.info.find((i) => i.label === "Email")?.value ||
            "",
        ],
        subject: `Portfolio Contact: ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      });

      haptics.success();
      setIsSubmitted(true);
      setShowParticles(true);
      setTimeout(() => {
        setShowParticles(false);
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      haptics.error();
      Alert.alert("Error", "Failed to open email composer. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Get In Touch"
        subtitle="Let's discuss your next project or opportunity"
      />

      <View style={styles.content}>
        {/* Contact Info Cards */}
        <View style={styles.infoGrid}>
          {contactInfo.map((info, index) => (
            <Animatable.View
              key={info.label}
              animation="zoomIn"
              duration={600}
              delay={200 + index * 100}
              style={styles.infoCardWrapper}
            >
              <Pressable
                onPress={() => info.link && Linking.openURL(info.link)}
                disabled={!info.link}
                style={({ pressed }) => [
                  styles.infoCard,
                  pressed &&
                    info.link && { transform: [{ scale: 0.98 }], opacity: 0.9 },
                ]}
              >
                <View
                  style={[
                    styles.infoIcon,
                    { backgroundColor: info.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={info.icon as any}
                    size={24}
                    color={info.color}
                  />
                </View>
                <Text style={styles.infoLabel}>{info.label}</Text>
                <Text style={styles.infoValue} numberOfLines={2}>
                  {info.value}
                </Text>
              </Pressable>
            </Animatable.View>
          ))}
        </View>

        {/* Contact Form */}
        <GradientCard delay={600}>
          {showParticles && <ParticleEffect />}
          <View style={styles.form}>
            {isSubmitted ? (
              <FormSuccess message="Message sent successfully! I'll get back to you soon." />
            ) : (
              <>
                <Text style={styles.formTitle}>
                  {portfolioData.contact.form.title}
                </Text>

                <Animatable.View
                  animation="fadeInUp"
                  duration={600}
                  delay={700}
                  style={styles.inputContainer}
                >
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    placeholderTextColor={colors.textMuted}
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                  />
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  duration={600}
                  delay={800}
                  style={styles.inputContainer}
                >
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor={colors.textMuted}
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  duration={600}
                  delay={900}
                  style={styles.inputContainer}
                >
                  <Text style={styles.inputLabel}>Message</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Tell me about your project..."
                    placeholderTextColor={colors.textMuted}
                    value={formData.message}
                    onChangeText={(text) =>
                      setFormData({ ...formData, message: text })
                    }
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  duration={600}
                  delay={1000}
                >
                  <AnimatedButton
                    title="Send Message"
                    onPress={handleSubmit}
                    variant="primary"
                    icon={
                      <Ionicons name="send" size={20} color={colors.text} />
                    }
                    fullWidth
                  />
                </Animatable.View>
              </>
            )}
          </View>
        </GradientCard>

        {/* Social Links */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={1200}
          style={styles.socialSection}
        >
          <Text style={styles.socialTitle}>{portfolioData.social.title}</Text>
          <View style={styles.socialLinks}>
            {portfolioData.social.links.map((social, index) => (
              <Animatable.View
                key={social.name}
                animation="bounceIn"
                duration={800}
                delay={1400 + index * 100}
              >
                <Pressable
                  onPress={() => Linking.openURL(social.url)}
                  style={({ pressed }) => [
                    styles.socialLink,
                    { borderColor: social.borderColor },
                    pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 },
                  ]}
                >
                  <Ionicons
                    name={social.icon as any}
                    size={32}
                    color={social.color}
                  />
                </Pressable>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  content: {
    width: "100%",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 32,
    marginHorizontal: -6,
  },
  infoCardWrapper: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  infoCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    minHeight: 135,
    ...Platform.select({
      ios: {
        shadowColor: colors.glow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 5,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
    lineHeight: 17,
  },
  form: {
    width: "100%",
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: colors.darkAccent,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  socialSection: {
    marginTop: 48,
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  socialLink: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
