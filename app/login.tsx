import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  
  // Pre-filled email to match screenshot, but editable
  const [email, setEmail] = useState("arpit@gmail.com"); 
  const [password, setPassword] = useState("HD#729hmGkJ~!");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header / Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>Log in</Text>

          {/* Form */}
          <View style={styles.formContainer}>
            
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>YOUR EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#666"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>YOUR PASSWORD</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showPassword}
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} // Remove border from input, apply to container
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye-off-outline"} // Matching the slash icon style
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {/* Manual border line to encompass icon if needed, or stick to input border */}
              <View style={styles.separator} />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={() => router.push("/homeRouter")}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#101010",
  primary: "#EEFB73", // Lime Yellow
  textWhite: "#FFFFFF",
  textGrey: "#6B6B6B",
  label: "#5E6272",
  inputBorder: "#2C2C2E"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
    marginLeft: -8, // Align with left edge
  },
  title: {
    fontSize: 42, // Large thin title
    fontWeight: "300", // Lighter weight matches screenshot
    color: COLORS.textWhite,
    marginBottom: 50,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.label,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  input: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.inputBorder,
    marginTop: -1, // Overlap slightly
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: COLORS.primary, // The lime yellow color
    fontSize: 14,
    fontWeight: "400",
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  signupText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: "600",
  },
});