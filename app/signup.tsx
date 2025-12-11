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

export default function Signup() {
  const router = useRouter();

  // State matching the screenshot fields
  const [firstName, setFirstName] = useState("Arpit");
  const [middleName, setMiddleName] = useState("Aryan");
  const [lastName, setLastName] = useState("Gupta");
  const [email, setEmail] = useState("email@gmail.com");
  const [password, setPassword] = useState("HD#729hmGkJ~!");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    console.log("signup", { firstName, middleName, lastName, email, password });
    // router.push('/welcome')
  };

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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>Sign up</Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FIRST NAME</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                placeholderTextColor="#666"
              />
            </View>

            {/* Middle Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>MIDDLE NAME</Text>
              <TextInput
                value={middleName}
                onChangeText={setMiddleName}
                style={styles.input}
                placeholderTextColor="#666"
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>LAST NAME</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholderTextColor="#666"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>YOUR EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>YOUR PASSWORD</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye-off-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {/* Border line for password field */}
              <View style={styles.separator} />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryText}>Sign up</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>

            {/* Spacer for bottom scrolling */}
            <View style={{ height: 50 }} />
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
    paddingBottom: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
  },
  title: {
    fontSize: 42,
    fontWeight: "300", // Thin font weight matches screenshot
    color: COLORS.textWhite,
    marginBottom: 40,
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
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
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
    marginTop: -1,
  },
  eyeIcon: {
    padding: 8,
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: "600",
  },
});