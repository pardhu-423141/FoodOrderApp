import { View, Text, Button } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const { user } = useAuth();
  const handleSignOut = async () => {
      await supabase.auth.signOut();
      
    };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Admin Dashboard</Text>
      <Text>Welcome {user?.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}