// app/login.tsx
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // replace with dynamic email if you want
  const email = "arpit@liyantis.com";

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#0b0f1a", "#14121f", "#1a1428"]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topRow}>
              <Pressable
                style={styles.backWrap}
                onPress={() => {
                  // if you have a previous route
                  router.back();
                }}
              >
                <Feather name="arrow-left" size={18} color="#E6E6E6" />
              </Pressable>
            </View>

            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Using <Text style={styles.email}>{email}</Text> to login
            </Text>

            <Text style={styles.label}>YOUR PASSWORD</Text>

            <View style={styles.inputRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#6b6b6b"
                secureTextEntry={!showPassword}
                style={styles.input}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.eyeButton}
                accessibilityLabel="toggle password visibility"
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color="#9a9aa0"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                router.push("/dashboard");
              }}
            >
              <Text style={styles.primaryText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/signup")}
              style={{ marginTop: 28 }}
            >
              <Text style={styles.link}>
                Don't have an account? <Text style={styles.underline}>Sign up</Text>
              </Text>
            </TouchableOpacity>

            {/* spacer so keyboard doesn't cover */}
            <View style={{ height: 120 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 10,
    minHeight: "100%",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  subtitle: {
    color: "#5E6272",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 44,
  },
  email: { color: "#fff", fontWeight: "700" },
  label: {
    color: "#3A3D46",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 8,
    letterSpacing: 1,
  },
  inputRow: {
    position: "relative",
    marginBottom: 14,
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    paddingVertical: 12,
    color: "#FFFFFF",
    paddingRight: 46, // space for eye icon
    fontSize: 16,
    fontWeight: "600",
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: 6,
    padding: 8,
  },
  primaryButton: {
    marginTop: 34,
    backgroundColor: "#EEFB73",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryText: {
    fontWeight: "700",
    fontSize: 14,
  },
  link: {
    color: "#9a9aa0",
    textAlign: "center",
  },
  underline: { 
    textDecorationLine: "underline", 
    color: "#fff",
    fontWeight: "400",
  },
});
