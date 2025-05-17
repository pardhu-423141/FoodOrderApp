import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default function VerifyPage({ onVerifySuccess }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Verification</Text>
        <Text style={styles.headerSubtitle}>
          We have sent a code to your email
        </Text>
        <Text style={styles.emailText}>example@gmail.com</Text>
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.codeContainer}>
          <Text style={styles.placeholderCode}>2 0 1 5</Text>
        </View>

        <Text style={styles.resendText}>Resend in 50 sec</Text>

        <TouchableOpacity style={styles.verifyButton} onPress={onVerifySuccess}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    height: screenHeight * 0.3,
    backgroundColor: '#0E0B20',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  emailText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  placeholderCode: {
    fontSize: 32,
    color: '#000',
    letterSpacing: 15,
  },
  resendText: {
    color: '#FF6D00',
    fontSize: 14,
    marginBottom: 40,
  },
  verifyButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
