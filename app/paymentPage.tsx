import { useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentPage() {
  const { amount } = useLocalSearchParams();

  const handlePaymentOption = (method: string) => {
    Alert.alert(`${method} Selected`, `Proceeding to pay ₹${amount} via ${method}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Payment Method</Text>
      <Text style={styles.amount}>Amount to Pay: ₹{amount}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#5f259f' }]}
        onPress={() => handlePaymentOption('PhonePe')}
      >
        <Text style={styles.buttonText}>📱 Pay with PhonePe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#34a853' }]}
        onPress={() => handlePaymentOption('Google Pay')}
      >
        <Text style={styles.buttonText}>💳 Pay with Google Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0033cc' }]}
        onPress={() => handlePaymentOption('Paytm')}
      >
        <Text style={styles.buttonText}>🏦 Pay with Paytm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  amount: { fontSize: 18, marginBottom: 24 },
  button: {
    width: '90%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
