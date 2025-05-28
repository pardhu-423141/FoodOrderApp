import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { RelativePathString, useRouter } from 'expo-router';

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating?: number | null;
};


export default function DashboardScreen() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  const handleCheckOut = () => {
  const cartItems = Object.entries(cart).map(([id, quantity]) => ({
    id,
    quantity,
  }));
  console.log(cartItems);

  const encodedCart = encodeURIComponent(JSON.stringify(cartItems));

  router.push(`/checkout?cart=${encodedCart}` as unknown as RelativePathString);

};

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/food/items/');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (itemId: string) => {
  setCart(prev => ({ ...prev, [itemId]: 1 }));
};

const increment = (itemId: string) => {
  setCart(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
};

const decrement = (itemId: string) => {
  setCart(prev => {
    const current = prev[itemId];
    if (current > 1) {
      return { ...prev, [itemId]: current - 1 };
    } else {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    }
  });
};

const renderItem = ({ item }: { item: FoodItem }) => {
  const itemCount = cart[item.id] || 0;


    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.description}</Text>

          {item.rating != null && (
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingText}>{item.rating} / 5</Text>
            </View>
          )}

          <Text style={styles.price}>₹ {item.price}</Text>

          {itemCount === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item.id)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => decrement(item.id)}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{itemCount}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => increment(item.id)}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Food Items</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={foodItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Check Out cart" onPress={handleCheckOut}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontWeight: 'bold', color: '#009688' },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#009688',
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  counterButton: {
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterValue: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
