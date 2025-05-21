import { View, Text, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DashboardScreen() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Dashboard!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
