import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const LoginScreen = ({ onLoginSuccess, onSignUpSuccess }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleLogin = () => {
    const phoneRegex = /^\d{10}$/;
    if (phoneRegex.test(phoneNumber)) {
      setPhoneError('');
      onLoginSuccess();
    } else {
      setPhoneError('Please enter a valid 10-digit phone number.');
    }
  };

  const handleSignUp = () => {
    onSignUpSuccess();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log In</Text>
        <Text style={styles.headerSubtitle}>Please sign in to your existing account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          placeholder="Enter your phone number"
          style={[styles.input, phoneError ? styles.inputErrorBorder : null]}
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (phoneError) setPhoneError('');
          }}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Send Code</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
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
    height: screenHeight * 0.2,
    justifyContent: 'center',
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
    height: screenHeight * 0.8,
    justifyContent: 'space-evenly',
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
    color: '#808080',
  },
  inputErrorBorder: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
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
