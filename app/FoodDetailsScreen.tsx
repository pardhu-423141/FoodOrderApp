import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase'; // your supabase client

export default function FoodDetailsScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [price, setPrice] = useState('');

  // Pick image from library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Upload image to Supabase Storage and return public URL
  const uploadImageAsync = async (uri: string) => {
  try {
    setUploading(true);

    // Convert to blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Safely extract file extension from MIME type
    const mimeType = blob.type; // e.g., "image/jpeg"
    const ext = mimeType.split('/')[1] || 'jpg'; // fallback to 'jpg'

    // Create a clean filename
    const fileName = `${Date.now()}.${ext}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('food-images')
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: false,
        contentType: mimeType,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('food-images')
      .getPublicUrl(fileName);

    setUploading(false);
    return publicUrlData.publicUrl;
  } catch (error) {
    setUploading(false);
    Alert.alert('Upload failed', (error as Error).message);
    return null;
  }
};


  const handleSubmit = async () => {
    if (!name) {
      Alert.alert('Name is required');
      return;
    }

    let image_url = '';
    if (!price || isNaN(Number(price))) {
      Alert.alert('Invalid price', 'Please enter a valid number for the price.');
      return;
    }
    if (imageUri) {
      const uploadedUrl = await uploadImageAsync(imageUri);
      if (!uploadedUrl) return; // stop if upload failed
      image_url = uploadedUrl;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/food/add/', {
      //const response = await axios.post('http://127.0.0.1:8000/', {
        name,
        description,
        image_url,
        price,
      });

      if (response.status === 201) {
        Alert.alert('Food item added!');
        setName('');
        setDescription('');
        setPrice('');
        setImageUri(null);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Failed to add food item');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Add Food Item</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={(text) => {
          // Allow only numbers and optional decimal
          const numericRegex = /^[0-9]*\.?[0-9]*$/;
          if (numericRegex.test(text)) {
            setPrice(text);
          }
        }}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Pick Image (optional)" onPress={pickImage} />

      {uploading && <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />}

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
          resizeMode="contain"
        />
      )}

      <Button title="Add Food" onPress={handleSubmit} disabled={uploading} />
    </View>
  );
}
