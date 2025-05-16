import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to get started</Text>

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            placeholder="John doe"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>RE-TYPE PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              style={styles.passwordInput}
              secureTextEntry={!showRetypePassword}
              value={retypePassword}
              onChangeText={setRetypePassword}
            />
            <TouchableOpacity
              onPress={() => setShowRetypePassword(!showRetypePassword)}
            >
              <Ionicons
                name={showRetypePassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f25",
  },
  scroll: {
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  passwordContainer: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  signupButton: {
    backgroundColor: "#ff7625",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
