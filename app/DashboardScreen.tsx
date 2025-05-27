import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DashboardScreen() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
      </View>
    </View>
  );

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
    borderRadius: 8
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontWeight: 'bold', color: '#009688' },
});
