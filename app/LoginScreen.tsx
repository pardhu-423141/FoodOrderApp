import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const LoginScreen = ({ onCodeSent, onSignUpClick }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      onCodeSent(); // Replace with real login logic
    }
  };

  useEffect(() => {
    fetch('https://legendary-computing-machine-wrxxgx4455v525q7g-8000.app.github.dev/api/hello/')
      .then(res => res.json())
      .then(data => {
        setBackendMessage(data?.message || 'No message received');
      })
      .catch(err => {
        console.error('Backend error:', err);
        setBackendMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log In</Text>
        <Text style={styles.headerSubtitle}>
          Please sign in to your existing account
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#808080"
          style={[styles.input, emailError && styles.inputErrorBorder]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#808080"
            style={[
              styles.input,
              passwordError && styles.inputErrorBorder,
              { flex: 1 },
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        {/* Forgot Password */}
        <View>
          <Link href="/forgotpassword" style={styles.forgotPasswordText}>forgot password</Link>
        </View>
        
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={onSignUpClick}>
            <Text style={styles.signupLink}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.backendMessage}>{backendMessage}</Text>
      </View>
    </Animated.View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0B20',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    height: screenHeight * 0.2,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'System',
  },
  headerSubtitle: {
    color: '#ccc',
    fontSize: 15,
    marginTop: 8,
    fontFamily: 'System',
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    height: screenHeight * 0.8,
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
    fontFamily: 'System',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: 'System',
    color: '#333',
  },
  inputErrorBorder: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 6,
  },
  forgotPasswordText: {
    color: '#FF6D00',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'left',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#FF6D00',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'System',
  },
  signupLink: {
    fontSize: 14,
    color: '#FF6D00',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  backendMessage: {
    textAlign: 'center',
    color: 'green',
    fontSize: 13,
    marginTop: 30,
    fontFamily: 'System',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
});
