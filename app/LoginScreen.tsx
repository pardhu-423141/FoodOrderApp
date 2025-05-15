import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ onLoginSuccess }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

  const handleLogin = () => {
    if (email && password) {
      onLoginSuccess();
    } else {
      Alert.alert('Login Failed', 'Please enter email and password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log In</Text>
        <Text style={styles.headerSubtitle}>Please sign in to your existing account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          placeholder="example@gmail.com"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="•••••••••"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureEntry(!secureEntry)}
          >
            <Ionicons
              name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsRow}>
          <View style={styles.rememberMe}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}>
            <Ionicons name="logo-twitter" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000' }]}>
            <Ionicons name={Platform.OS === 'ios' ? 'logo-apple' : 'logo-apple'} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  },
  headerTitle: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 6,
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 6,
    borderRadius: 3,
  },
  rememberText: {
    fontSize: 13,
    color: '#333',
  },
  forgotPassword: {
    color: '#FF6D00',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#FF6D00',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signupText: {
    fontSize: 13,
    color: '#555',
  },
  signupLink: {
    fontSize: 13,
    color: '#FF6D00',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
