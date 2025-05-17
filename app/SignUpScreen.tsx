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

interface Props {
  onSignUpComplete: () => void;
}

const SignUpScreen: React.FC<Props> = ({ onSignUpComplete }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [retypePasswordFocused, setRetypePasswordFocused] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
    retypePassword: "",
  });

  const handleSignUp = () => {
    const newErrors = {
      name: "",
      phone: "",
      password: "",
      retypePassword: "",
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (password !== retypePassword) {
      newErrors.retypePassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onSignUpComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to get started</Text>

        <View style={styles.form}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            placeholder="John Doe"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput
            placeholder="Enter 10 digit phone number"
            placeholderTextColor="#999"
            style={styles.input}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              style={[
                styles.input,
                styles.passwordInput,
                passwordFocused && styles.inputFocused,
              ]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <Text style={styles.label}>RE-TYPE PASSWORD</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              style={[
                styles.input,
                styles.passwordInput,
                retypePasswordFocused && styles.inputFocused,
              ]}
              secureTextEntry={!showRetypePassword}
              value={retypePassword}
              onChangeText={(text) => {
                setRetypePassword(text);
                setErrors((prev) => ({ ...prev, retypePassword: "" }));
              }}
              onFocus={() => setRetypePasswordFocused(true)}
              onBlur={() => setRetypePasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowRetypePassword(!showRetypePassword)}
            >
              <Ionicons
                name={showRetypePassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {errors.retypePassword ? (
            <Text style={styles.errorText}>{errors.retypePassword}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
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
    marginBottom: 4,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
    marginBottom: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#ff7625",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
});
