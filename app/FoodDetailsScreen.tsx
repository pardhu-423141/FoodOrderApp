import { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import axios from 'axios';

export default function FoodDetailsScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // for web
  const [uploading, setUploading] = useState(false);

  // Mobile image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Web file input handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result as string); // for preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Supabase
  const uploadImageAsync = async (): Promise<string | null> => {
    try {
      setUploading(true);
      let file: Blob;
      let mimeType: string;

      if (Platform.OS === 'web') {
        if (!selectedFile) throw new Error('No file selected on web.');
        file = selectedFile;
        mimeType = selectedFile.type;
      } else {
        if (!imageUri) throw new Error('No image selected on mobile.');
        const response = await fetch(imageUri);
        file = await response.blob();
        mimeType = file.type;
      }

      const ext = mimeType.split('/')[1] || 'jpg';
      const fileName = `${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from('food-images')
        .upload(fileName, file, {
          contentType: mimeType,
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('food-images')
        .getPublicUrl(fileName);

      setUploading(false);
      return publicUrlData.publicUrl;
    } catch (error) {
      setUploading(false);
      console.error('Upload failed:', error);
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

    if ((Platform.OS === 'web' && selectedFile) || (Platform.OS !== 'web' && imageUri)) {
      const uploadedUrl = await uploadImageAsync();
      if (!uploadedUrl) return; // stop if upload failed
      image_url = uploadedUrl;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/food/add/', {
        name,
        description,
        image_url,
      });

      if (response.status === 201) {
        Alert.alert('Food item added!');
        setName('');
        setDescription('');
        setImageUri(null);
        setSelectedFile(null);
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
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {Platform.OS === 'web' ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      ) : (
        <Button title="Pick Image (optional)" onPress={pickImage} />
      )}

      {uploading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
      )}

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
