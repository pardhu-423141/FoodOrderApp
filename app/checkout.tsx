import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type CartItem = {
  id: string;
  quantity: number;
};

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating?: number | null;
};

export default function CheckoutScreen() {
  const { cart } = useLocalSearchParams();
  const router = useRouter();

  const [items, setItems] = useState<FoodItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cart && typeof cart === 'string') {
      try {
        const parsed: CartItem[] = JSON.parse(decodeURIComponent(cart));
        setCartItems(parsed);
        fetchItemsByIds(parsed.map(item => item.id));
      } catch (err) {
        console.error('Invalid cart data', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [cart]);

  const fetchItemsByIds = async (ids: string[]) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/food/items/by-ids/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      const data: FoodItem[] = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch items', err);
    } finally {
      setLoading(false);
    }
  };

  const getQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity ?? 0;
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => {
      const qty = getQuantity(item.id);
      return total + item.price * qty;
    }, 0);
  };

  const handlePay = () => {
    const total = getTotalAmount();
    router.push({
      pathname: '/paymentPage',
      params: { amount: total.toString() },
    });
  };
  console.log(handlePay);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#009688" />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Qty: {getQuantity(item.id)}</Text>
                <Text>Price: ₹ {item.price * getQuantity(item.id)}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay ₹{getTotalAmount()}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: { marginBottom: 12 },
  name: { fontWeight: 'bold' },
  payButton: {
    backgroundColor: '#009688',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
